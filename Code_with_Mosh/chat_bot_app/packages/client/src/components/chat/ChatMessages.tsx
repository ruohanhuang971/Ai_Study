// render list of messages

import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
    content: string;
    role: 'user' | 'bot';
};

type Props = {
    messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
    // reference to form
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    // make sure only trimmed text gets copied to clipboard
    const onCopyMessage = (e: React.ClipboardEvent): void => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            e.preventDefault();
            e.clipboardData.setData('text/plain', selection);
        }
    };

    // execute scroll when the message array changes
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
                <div
                    key={index}
                    onCopy={onCopyMessage}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    className={`px-3 py-1 rounded-xl ${
                        message.role === 'user'
                            ? 'bg-blue-600 text-white self-end'
                            : 'bg-gray-100 text-black self-start'
                    }`}
                >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;
