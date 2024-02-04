import { Props } from "./types";
import styles from "./checkbox.module.css";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Checkbox = ({id, name, checked, text}: Props) => {

    return <>
        <label htmlFor={id} className={styles["checkbox"]}>
            <input type="checkbox" name={name} id={id} className={styles["checkbox__control"]} />
            <span>
                <MdOutlineCheckBox size={25} />
            </span>
            <span>
                <MdOutlineCheckBoxOutlineBlank size={25} />
            </span>
            {text}
            
        </label>
    </>
}

export default Checkbox;