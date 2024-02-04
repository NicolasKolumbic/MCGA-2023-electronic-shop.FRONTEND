import { DropdownItem } from "@/models/dropdown-item"
import { Props } from "./types"
import styles from "./dropdown.module.css";
import { FormEvent } from "react";


const Dropdown = ({items, value, id, label, change}: Props) => {

    const changeHandler = (event: FormEvent<HTMLSelectElement>) => {
        const currentValue = event.currentTarget.value;
        if(change) {
            change(currentValue);
        }
    };

    return <>
        <div className={styles["droppdown"]}>
            <label className={styles["label"]} htmlFor={id}>{label}</label>
            <select id={id} className={styles["control"]} onChange={changeHandler} value={value}>
                {
                    items.map((item: DropdownItem) => 
                        <option key={item.key} value={item.value}>
                            {item.key}
                        </option>
                    )
                }
            </select>
        </div>
    </>
}

export default Dropdown;