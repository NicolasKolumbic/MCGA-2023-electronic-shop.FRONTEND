'use client';
import { ChangeEvent, useEffect, useState, FocusEvent } from "react";
import { Props } from "./types";

import styles from "./input.module.css";
import { GoAlert } from "react-icons/go";
import { Validation } from "@/hooks/abstractions/validation.interface";
import { FormControl } from "@/hooks/models/form-control";

const TextBox = ({ type, value, label, id, design, control, change }: Props) => {

    const [fieldValue, setfieldValue] = useState('');
    const [htmlControl, setHtmlControl] = useState<FormControl | undefined>(undefined);

    useEffect(() => {
        if (value) {
            setfieldValue(value);
        }
        if(!htmlControl && control) {
            control.currentValue = value ?? '';
            setHtmlControl(control)
        }
    }, [value, control])

    const validate = (value: string) => {
        if(htmlControl) {
            htmlControl.currentValue = value;
            htmlControl.validate();
            setHtmlControl(htmlControl);
        }   
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setfieldValue(event.target.value);
        validate(event.target.value);
        if(change) {
            change(event.target.value);
        }
    }

    const bluHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
        validate(event.target.value);
    }

    const cssClasses = design.replace(/\s+/g, ' ').split(' ').map((cssClass) => styles[cssClass]);
    const isInvalidCSS = htmlControl?.isInvalid ? `${styles["input-field__container"]} ${styles["has-error"]}` : styles["input-field__container"];

    return <>
        <div className={cssClasses.join(' ')}>   
            <div className={isInvalidCSS}>
                <label htmlFor={id} className={styles['label']}>{label}</label>
                <input  
                    type={type}
                    value={fieldValue}
                    className={styles['input']}
                    id={id}  
                    onChange={changeHandler}
                    onBlur={bluHandler}           
                />
            </div>
            <ul className={styles["error-message"]}>
                {
                    htmlControl?.validations.map((validation: Validation) => (
                        validation.isInvalid ? 
                        <li key={validation.name} 
                            className={styles["error-message__item"]}>
                                    <GoAlert color="var(--error)" size={20} className="mr-3" />
                                    {validation.errorMessage}
                        </li>
                        :
                        null 
                    ))
                }
                
            </ul>
        </div>
    </>
};

export default TextBox;