'use client';
import Brand from "../../shared/brand";
import Button from "../../shared/button";
import TextBox from "../../shared/textbox";
import styles from "./login.module.css";
import Link from "next/link";
import React, { ChangeEvent, useState, FormEvent } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const singIn = async () =>{
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user:{accessToken:string} = userCredential.user as unknown as {accessToken:string};
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            location.href = '/category-managment';
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit =  (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        singIn();
    }

    return <>
        <form className={styles.login} onSubmit={handleSubmit}>
            <Brand />
            <fieldset>
                <div>
                    <TextBox type={"text"} id={"email"} label={"Email"} design={"dark"} change={setEmail}/>
                </div>
                <div>
                    <TextBox type={"password"} id={"password"} label={"Contraseña"} design={"dark"} change={setPassword}/>
                </div>
                <Button type={"submit"} label={"Iniciar Sesión"} design="cerulean fluid" />
            </fieldset>
        <Link href={"/signUp"}>Sign Up</Link>
        </form>
    </>
};

export default Login;