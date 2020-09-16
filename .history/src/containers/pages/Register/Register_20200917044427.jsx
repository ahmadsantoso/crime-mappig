import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { useStoreActions } from "easy-peasy";
import Button from "../../../component/atoms/Button";
import { FormErrorMessage, useToast } from "@chakra-ui/core";

const Register = () => {
    const history = useHistory();
    const toast = useToast();
    const [submit, setSubmit] = useState(false);
    const { register, errors, handleSubmit } = useForm();

    const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

    const isRegister = async (data2, e) => {
        setSubmit(true);
        const registerData = { email: data2.emailInput, password: data2.passwordInput };
        const res = await axios.post("https://ancient-spire-87228.herokuapp.com/api/operator/register", registerData);
        console.log(registerData);

        const data = await res.data;

        console.log(data);
        // const result = await res.data;

        // if (result.status) {
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
                <p className="auth-title">Register</p>
                <form onSubmit={handleSubmit(isRegister)}>
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

export default Register;