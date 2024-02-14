'use client';
import Brand from "../../shared/brand";
import Button from "../../shared/button";
import TextBox from "../../shared/textbox";
import styles from "./signUp.module.css";
import Link from "next/dist/client/link";
import React, { useState, FormEvent } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { redirect } from 'next/navigation';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user:{accessToken:string} = userCredential.user as unknown as {accessToken:string};
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            redirect('/category-managment');
        } catch (error) {
            console.log(error);
        }
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
        <Link href={"/login"}>Login</Link>
        </form>
    </>
};

export default SignUp;