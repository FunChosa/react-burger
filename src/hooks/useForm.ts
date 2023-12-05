import { useState } from "react";
export function useForm(inputValues: {
  name?: string;
  email?: string;
  password?: string;
  resetToken?: string;
}) {
  const [values, setValues] = useState(inputValues);
  const [isChanged, setIsChanged] = useState(false);
  const handleChange = (event: { target: { value: string; name: string } }) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setIsChanged(true);
  };
  return { values, handleChange, setValues, isChanged, setIsChanged };
}
