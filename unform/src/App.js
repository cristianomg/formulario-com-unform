import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import "./App.css";
import * as Yup from "yup";

import Input from "./components/form/input";

function App() {
  const formRef = useRef(null);
  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("O nome é obrigatório"),
        email: Yup.string()
          .email("Digite um email válido")
          .required("O e-mail é obrigatório"),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, "No minimo 3 caracteres")
            .required("A cidade é obrigatória"),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
        console.log(err);
      }
    }
  }

  const initialData = {
    email: "cristiano@gmail.com",
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input type="text" name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Scope path="address">
          <Input type="text" name="street" />
          <Input type="text" name="neighborhood" />
          <Input type="text" name="city" />
          <Input type="text" name="uf" />
          <Input type="text" name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
