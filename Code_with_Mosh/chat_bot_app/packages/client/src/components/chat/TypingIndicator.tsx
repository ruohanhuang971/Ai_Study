const TypingIndicator = () => {
    return (
        <div className="flex gap-1 p-3 bg-gray-100 rounded-xl self-start">
            <Dot />
            <Dot className="[animation-delay:0.2s]" />
            <Dot className="[animation-delay:0.4s]" />
        </div>
    );
};

type DotProps = {
    className?: string;
};

// reusable code for loading dots
const Dot = ({ className }: DotProps) => (
    <div
        className={`w-2 h-2 rounded-full bg-gray-800 animate-pulse ${className}`}
    ></div>
);

export default TypingIndicator;
