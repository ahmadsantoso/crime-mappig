import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import { useStoreActions } from "easy-peasy";
import Button from "../../../component/atoms/Button";
import { FormErrorMessage, FormControl, useToast } from "@chakra-ui/core";

const Register = () => {
    const history = useHistory();
    const toast = useToast();
    const [submit, setSubmit] = useState(false);
    const { register, errors, handleSubmit } = useForm();

    const isAuth = useStoreActions((actions) => actions.operator.setCurrentOperator);

    const isRegister = async (data2, e) => {
        setSubmit(true);
        const registerData = { email: data2.emailInput, password: data2.passwordInput };
        try {
            const res = await axios.post("https://ancient-spire-87228.herokuapp.com/api/operator/signup", registerData);
            console.log(registerData);
            const data = await res;
            console.log(data);
            setSubmit(false);
            isAuth(true);
            Cookie.set("token", data.data.accessToken);
            toast({
                title: "Register successfuly",
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
            e.target.reset();
            history.push("/Login");
        }
        catch {
            setSubmit(false);
            toast({
                title: "Register Failed",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <p className="auth-title">Register</p>
                <form onSubmit={handleSubmit(isRegister)}>
                    <FormControl isInvalid={errors.emailInput}>
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
                    </FormControl>
                    <FormControl isInvalid={errors.passwordInput}>
                        <input
                            className="input"
                            id="password"
                            placeholder="Password"
                            type="password"
                            name="passwordInput"
                            ref={register({
                                required: true,
                                minLength: 6,
                            })}
                        />
                        <FormErrorMessage>
                            {errors.passwordInput?.type === "required" &&
                                "Password Required"}
                            {errors.confirmPassword?.type === "minLength" &&
                                "Password minimal 6 charachter"}
                        </FormErrorMessage>
                    </FormControl>
                    <div className="auth-button">
                        {!submit ? (
                            <Button type="submit"
                                title="Create Account"
                            />
                        ):(
                            <Button loading type="submit"
                                title="Create Account"
                            />
                        )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;