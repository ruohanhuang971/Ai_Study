import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

type FormData = {
   prompt: string;
};

const ChatBot = () => {
   // register input field, handle form submission
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = (data: FormData) => {
      console.log(data);
      reset();
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      // checks if user press enter -> submit form
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault(); // prevent newline after hitting enter
         handleSubmit(onSubmit)(); // explicitly calls function returned by handleSubmit
      }
   };

   return (
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
   );
};

export default ChatBot;
