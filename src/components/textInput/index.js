import React from "react";
import { Input } from "./styled";

function TextInput({ title }) {
  return (
    <div>
      <Input label={title} color="secondary" variant="outlined" type="number" />
    </div>
  );
}

export default TextInput;
