import React from 'react';


export default function Button(props) {
  return (
    <button
      className={props.className || "button"}
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}