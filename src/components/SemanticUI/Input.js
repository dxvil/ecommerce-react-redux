import { Message } from "semantic-ui-react";
import React from "react";
import "./Input.css";
export const RenderInput = ({
  input,
  label,
  type,
  fName,
  meta: { touched, error, warning },
}) => {
  const inputStyles = () => {
    if ((touched && error) || warning) {
      return "ui input input__auth error";
    } else if (touched) {
      return "ui input input__auth focus";
    } else {
      return "ui input input__auth";
    }
  };

  return (
    <>
      <div className={inputStyles()}>
        <input {...input} placeholder={label} type={type} />
      </div>
      <div className="input_invalid">
        {touched &&
          ((error && (
            <Message negative>
              {fName} {error}
            </Message>
          )) ||
            (warning && (
              <Message negative>
                {fName} {error}
              </Message>
            )))}
      </div>
    </>
  );
};
