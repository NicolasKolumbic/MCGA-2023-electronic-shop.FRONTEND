'use client';
import { ChangeEvent, useEffect, useState } from "react";
import { Props } from "./types";

import styles from "./input.module.css";

const TextBox = ({ type, value, label, id, design, change }: Props) => {

    const [fieldValue, setfieldValue] = useState('');

    useEffect(() => {
        if (value) {
            setfieldValue(value);
        }
    }, [value])

   

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setfieldValue(event.target.value);
        if(change) {
            change(event.target.value);
        }
    }

    const cssClasses = design.replace(/\s+/g, ' ').split(' ').map((cssClass) => styles[cssClass]);

    return <>
        <div className={cssClasses.join(' ')}>   
            <div className={styles["input-field__container"]}>
                <label htmlFor={id} className={styles['label']}>{label}</label>
                <input  
                    type={type}
                    value={fieldValue}
                    className={styles['input']}
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