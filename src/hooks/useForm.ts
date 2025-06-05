import { useState } from "react";

export const useForm = <T extends Record<string, string>>(initialState: T): [
  T,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void
] => {
  const [values, setValues] = useState<T>(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return [values, handleInputChange, reset];
};
