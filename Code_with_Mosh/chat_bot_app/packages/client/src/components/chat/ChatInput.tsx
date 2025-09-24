// input form
import type { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';

export type ChatFormData = {
    prompt: string;
};

type Props = {
    onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
    // register input field, handle form submission
    const { register, handleSubmit, reset, formState } =
        useForm<ChatFormData>();

    // notify there is a new prompt
    const submit = handleSubmit((data) => {
        reset({ prompt: '' });
        onSubmit(data);
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        // checks if user press enter -> submit form
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // prevent newline after hitting enter
            submit(); // explicitly calls function returned by handleSubmit
        }
    };

    return (
        <form
            onSubmit={submit} // function that will be called if form is valid
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
        >
            <textarea
                // spread object to add all properties to text area
                {...register('prompt', {
                    required: true,
                    validate: (data) => data.trim().length > 0, // string only whitespace is invalid
                })}
                autoFocus
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

export default ChatInput;
