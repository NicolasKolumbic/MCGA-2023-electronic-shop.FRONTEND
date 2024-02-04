
import { ChangeEvent } from "react";
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked  } from "react-icons/md";
import { Props } from "./types";

import styles from "./radio-button.module.css";

const RadioButton = ({id, name, checked, text, change}: Props) => {

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        if(change) {
            change(currentValue);
        }
    };

    return <>
        <label htmlFor={id} className={styles["radio-button"]}>
            <input type="radio" name={name} id={id} className={styles["radio-button__control"]} value={text} onChange={changeHandler} checked={checked} />
            <span>
                <MdOutlineRadioButtonChecked size={25}  />
            </span>
            <span>
                <MdOutlineRadioButtonUnchecked size={25}  />
            </span>
            {text}          
        </label>
    </>
}

export default RadioButton;