import React, { useEffect, useRef } from "react";

import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
    console.log(inputRef.current.value);
  }, [fieldName, registerField]);

  return (
    <div>
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />;
      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </div>
  );
}
