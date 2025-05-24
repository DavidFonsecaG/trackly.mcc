import { useState } from "react";

interface useFormProps {
    email: string,
    password: string,
}

type UseFormReturn = [
  useFormProps,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void
];

export const useForm = (initialState: useFormProps): UseFormReturn => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return [values, handleInputChange, reset];
};