import { useState } from "react";
export function useForm(inputValues: Record<string, string>) {
  const [values, setValues] = useState(inputValues);
  const [isChanged, setIsChanged] = useState(false);
  const handleChange = (event: { target: { value: string; name: string } }) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setIsChanged(true);
  };
  return { values, handleChange, setValues, isChanged, setIsChanged };
}
