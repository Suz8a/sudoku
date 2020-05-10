import React from "react";
import { Input } from "./styled";

function TextInput({ title, onInput }) {
  return (
    <div>
      <Input
        label={title}
        color="secondary"
        variant="outlined"
        type="number"
        onInput={onInput}
      />
    </div>
  );
}

export default TextInput;
