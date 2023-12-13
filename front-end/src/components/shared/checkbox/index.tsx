import { Props } from "./types";
import styles from "./checkbox.module.css";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Checkbox = ({id, name, checked, text}: Props) => {

    return <>
        <label htmlFor={id} className={styles["checkbox"]}>
            <span>
                <MdOutlineCheckBox />
            </span>
            <span>
                <MdOutlineCheckBoxOutlineBlank />
            </span>
            {text}
            <input type="checkbox" name={name} id={id} checked={checked} className={styles["checkbox__control"]} />
        </label>
    </>
}

export default Checkbox;