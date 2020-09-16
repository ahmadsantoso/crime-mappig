import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { useStoreActions } from "easy-peasy";
import Button from "../../../component/atoms/Button";
import { FormErrorMessage, useToast } from "@chakra-ui/core";


const Login = () => {
  const history = useHistory();
  const toast = useToast();
  const [submit, setSubmit] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

  const isLogin = async (data, e) => {
    setSubmit(true);
    const { emailInput, passwordInput } = data;
    console.log(data);
    const response = await fetch("https://ancient-spire-87228.herokuapp.com/api/operator/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });
    const result = await response.json();
    console.log(result)
    // try{
    // const result = await response.json();
    // console.log(result)
    // history.push("/Dashboard");
    // }catch(error){
    //   console.log(error);
    // }
    // if {(result.status) {
    //   setSubmit(false);
    //   isAuth(true);
    //   Cookie.set("token", result.token);
    //   toast({
    //     title: "Sign In successfuly",
    //     status: "success",
    //     position: "top",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   e.target.reset();
    //   history.push("/Dashboard");
    // }
    // else {
    //   setSubmit(false);
    //   toast({
    //     title: "Sign In Fail",
    //     status: "error",
    //     position: "top",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Welcome</p>
        <form onSubmit={handleSubmit(isLogin)}>
          <input
            className="input"
            id="email"
            placeholder="Email"
            type="text"
            name="emailInput"
            ref={register({
              required: true,
              pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <FormErrorMessage>
            {errors.emailInput?.type === "required" && "Email required"}
            {errors.emailInput?.type === "pattern" &&
              "Your input must be an email"}
          </FormErrorMessage>
          <input
            className="input"
            id="password"
            placeholder="Password"
            type="password"
            name="passwordInput"
            ref={register({
              required: true,
              })}
          />
          <FormErrorMessage>
            {errors.passwordInput?.type === "required" &&
              "Password Required"}
          </FormErrorMessage>
          <div className="auth-button">       
            <Button type="submit"
              title="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
