import React, { useState } from "react";

// export const TextInput = ({
//   // value,
//   onChange,
// }: {
//   // value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => {
export const TextInput = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const onBlur = () => {
    onChange(value);
  };

  return (
    <input type="text" value={value} onChange={handleChange} onBlur={onBlur} />
  );
};
