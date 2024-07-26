import React from "react";
import "./inputField.css";

const InputField = ({ label, inputType, inputName, maxLength, minLength, min, pattern, title }) => {
  return (
    <div className="inputField mt-4">
      <div className="wave-group">
        <input
          required
          type={inputType}
          name={inputName}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          pattern={pattern}
          title={title}
          className="input bg-light"
        />
        <span className="bar"></span>
        <label className="label">
          {label.split(" ").map((char, index) => (
            <span
              className="label-char"
              style={{ "--index": index }}
              key={index}
            >
              {char}
            </span>
          ))}
        </label>
      </div>
    </div>
  );
};

export default InputField;
