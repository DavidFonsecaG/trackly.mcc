interface SubmitButtonProps {
    text: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
    text,
}) => {
    return (
        <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-primary p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
            {text}
        </button>
    );
};

export default SubmitButton;