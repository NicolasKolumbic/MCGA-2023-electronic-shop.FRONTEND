import { FormControl } from "@/hooks/models/form-control";
import { ChangeEvent, useEffect, useState, FocusEvent, KeyboardEvent, useRef, ClipboardEvent } from "react";
import { Props } from "./types";

import styles from "./input-number.module.css";
import { Validation } from "@/hooks/abstractions/validation.interface";
import { GoAlert } from "react-icons/go";
import { InputNumberValidationBuilder } from "../pattern/input-number-validation-builder/input-number-validation-builder";

export const InputNumber = ({ value, label, id, design, control, decimalPoint, onlyIntegers , change }: Props) => {

    const inputControl = useRef<HTMLInputElement>(null);

    const [fieldValue, setfieldValue] = useState('');
    const [htmlControl, setHtmlControl] = useState<FormControl | undefined>(undefined);


    useEffect(() => {
        if (value && !fieldValue) {
            setfieldValue(formatValue(value, true));
        }
        if(!htmlControl && control) {
            control.currentValue = value ?? '';
            setHtmlControl(control)
        }
    }, [value, htmlControl])

    const setValidatedValue = (value: string, position: number) => {
        setfieldValue(value);
        if(htmlControl) {
            htmlControl.currentValue = value;
            htmlControl.validate();
            setHtmlControl(htmlControl);
        } 
        setTimeout(() => {
            inputControl.current!.focus();
            inputControl.current!.setSelectionRange(position, position);
        },0)
    }

    const formatValue = (value: string, isEncodeThousandsSeparator: boolean) => {
        if(value && value.toString().trim()) {
            if(isEncodeThousandsSeparator) { 
                const num = onlyIntegers ? parseInt(value) : parseFloat(value);      
                return new Intl.NumberFormat("EN-us").format(num);
            } else {
                return value.toString().replace(/\,/g,"");
            }
        } else {
            return '';
        }
    } 

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(change) {
            change(formatValue(fieldValue, false));
        }
    }

    const keypressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const element = inputControl.current!;
        const inputNumberValidator = new InputNumberValidationBuilder(
            fieldValue,
            event.key,
            element.selectionStart!,
            element.selectionEnd!,
            onlyIntegers !== undefined,
            decimalPoint
        );  

        inputNumberValidator.validate(setValidatedValue);         
    }

    const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
        setfieldValue(formatValue(fieldValue, true));
    }

    const focusHandler = (event: FocusEvent<HTMLInputElement>) => {
        setfieldValue(formatValue(fieldValue, false));
    };

    const pasteHandler = async (event: ClipboardEvent<HTMLInputElement>) => {
        const copiedValue = await navigator.clipboard.readText();
        const currentTarget = event.target as HTMLInputElement;
        
        const inputNumberValidator = new InputNumberValidationBuilder(
            copiedValue,
            event.type,
            currentTarget.selectionStart!,
            currentTarget.selectionEnd!,
            onlyIntegers !== undefined,
            decimalPoint
        ); 

        inputNumberValidator.validate(setValidatedValue);
        if(change) {
            change(formatValue(inputNumberValidator.value, false));
        }      
    };


    const cssClasses = design.replace(/\s+/g, ' ').split(' ').map((cssClass) => styles[cssClass]);
    const isInvalidCSS = htmlControl?.isInvalid ? `${styles["input-field__container"]} ${styles["has-error"]}` : styles["input-field__container"];

    return <>
        <div className={cssClasses.join(' ')}>   
            <div className={isInvalidCSS}>
                <label htmlFor={id} className={styles['label']}>{label}</label>
                <input  
                    type="text"
                    ref={inputControl}
                    value={fieldValue}
                    className={styles['input']}
                    id={id}  
                    onChange={(event: ChangeEvent<HTMLInputElement>) => changeHandler(event)}
                    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => keypressHandler(event)}
                    onBlur={(event:FocusEvent<HTMLInputElement>) => blurHandler(event) }
                    onFocus={(event:FocusEvent<HTMLInputElement>) => focusHandler(event) }   
                    onPaste={(event: ClipboardEvent<HTMLInputElement>) => pasteHandler(event)}        
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
}