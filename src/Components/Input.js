import React, { useState } from "react";

const Input = ({ onSendMessage }) => {
  const [textInputs, setTextInputs] = useState("");

  function onChange(e) {
    setTextInputs(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setTextInputs("");
    onSendMessage(textInputs);
  }

  return (
    <div className="Input">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)} //kod bilo kakvog unosa mijenjamo podatke
          value={textInputs}
          type="text"
          placeholder="Enter your message and press ENTER"
        />
        <button className="Button"></button>
      </form>
    </div>
  );
};

export default Input;