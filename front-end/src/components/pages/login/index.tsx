'use client';
import Brand from "../../shared/brand";
import Button from "../../shared/button";
import TextBox from "../../shared/textbox";
import styles from "./login.module.css";
import { useRouter } from 'next/navigation'
import React, { useState, FormEvent } from "react";
import { useLoginMutation } from "../../../core/auth-api";
import { useAppDispatch, useAppSelector } from "@/stores";
import { User } from "@/models/user";
import { useForm } from "@/hooks/form";
import { Form } from "@/hooks/form.interface";
import { required } from "@/hooks/validators/required";
import { setUser } from "@/stores/users";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<Form>(useForm({
        name: 'login-form',
        controls: [
            {
                name: 'email',
                validations: [
                    required(),
                ]
            },
            {
                name: 'password',
                validations: [
                    required()
                ]
            }
        ]}));

    const loginHandler = async () => {
        const user = new User(email, password);
        login(user).then((res: any) => {
            if(!res.error) {
                const email = res.data.body;
                dispatch(setUser(email))
            }
            router.push("/product-managment")
        })
    }

    const handleSubmit =  (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginHandler();
    }

    return <>
        <form className={styles.login} onSubmit={handleSubmit}>
            <Brand />
            <fieldset>
                <div className="mb-6">
                    <TextBox type={"text"} id={"email"} label={"Email"} design={"dark"} control={form.control("email")} change={setEmail}/>
                </div>
                <div>
                    <TextBox type={"password"} id={"password"} label={"Contraseña"} design={"dark"} control={form.control("password")} change={setPassword}/>
                </div>
                <Button type={"submit"} label={"Iniciar Sesión"} design="cerulean fluid" />
                <Button label="Registrarme" link="/signUp" design={"outline-white fluid"} />
            </fieldset>
            
        </form>
    </>
};

export default Login;