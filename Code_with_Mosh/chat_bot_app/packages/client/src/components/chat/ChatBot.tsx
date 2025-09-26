import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import messageSound from '../../assets/sounds/message.mp3';
import notifSound from '../../assets/sounds/notif.mp3';

// audio objects
const messageAudio = new Audio(messageSound);
messageAudio.volume = 0.2;

const notifAudio = new Audio(notifSound);
notifAudio.volume = 0.2;

type ChatResponse = {
    message: string;
};

const ChatBot = () => {
    // create conversationID UUID
    // ref store values that doesn't cause rerender
    const conversationId = useRef(crypto.randomUUID());

    // display conversation
    const [messages, setMessages] = useState<Message[]>([]);

    // typing indicator
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

    // keep track of error to display to user
    const [error, setError] = useState('');

    const onSubmit = async ({ prompt }: ChatFormData) => {
        try {
            // prev tells react to get the latest version of the message array
            setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

            setIsBotTyping(true);
            setError('');
            messageAudio.play();

            const { data } = await axios.post<ChatResponse>('/api/v1/chat', {
                prompt,
                conversationId: conversationId.current,
            });

            setMessages((prev) => [
                ...prev,
                { content: data.message, role: 'bot' },
            ]);
            notifAudio.play();
        } catch (error) {
            console.error(error);
            setError('Something went wrong, try again later.');
        } finally {
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
                <ChatMessages messages={messages} />
                {isBotTyping && <TypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    );
};

export default ChatBot;
