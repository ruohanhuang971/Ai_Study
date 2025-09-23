import axios from 'axios';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import React, { useRef, useState, type KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   // create conversationID UUID
   // ref store values that doesn't cause rerender
   const conversationId = useRef(crypto.randomUUID());

   // display conversation
   const [messages, setMessages] = useState<Message[]>([]);

   // register input field, handle form submission
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      // prev tells react to get the latest version of the message array
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

      reset();
      const { data } = await axios.post<ChatResponse>('/api/v1/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      // checks if user press enter -> submit form
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault(); // prevent newline after hitting enter
         handleSubmit(onSubmit)(); // explicitly calls function returned by handleSubmit
      }
   };

   return (
      <div>
         <div className="flex flex-col gap-3 mb-10">
            {messages.map((message, index) => (
               <p
                  key={index}
                  className={`px-3 py-1 rounded-xl ${
                     message.role === 'user'
                        ? 'bg-blue-600 text-white self-end'
                        : 'bg-gray-100 text-black self-start'
                  }`}
               >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
               </p>
            ))}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)} // function that will be called if form is valid
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
         >
            <textarea
               // spread object to add all properties to text area
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0, // string only whitespace is invalid
               })}
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything"
               maxLength={1000}
            />
            <Button
               disabled={!formState.isValid} // disables button if form is not valid
               className="rounded-full w-9 h-9"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
