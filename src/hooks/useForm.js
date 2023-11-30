import { useState } from "react";
export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [isChanged, setIsChanged] = useState(false);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setIsChanged(true);
  };
  return { values, handleChange, setValues, isChanged, setIsChanged };
}
