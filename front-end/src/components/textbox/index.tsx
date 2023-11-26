'use client';
import { ChangeEvent, useState } from "react";
import { Props } from "./types";

import styles from "./input.module.scss";

const TextBox = ({ type, value, label, id }: Props) => {

    const [fieldValue, setfieldValue] = useState('');

    if (value) {
        setfieldValue(value);
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setfieldValue(event.target.value);
    }

    return <>
        <div className={styles['input-field']}>   
            <div>
                <label htmlFor={id}>{label}</label>
                <input  
                    type={type}
                    value={fieldValue}
                    id={id}  
                    onChange={changeHandler}           
                />
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
    </>
};

export default TextBox;