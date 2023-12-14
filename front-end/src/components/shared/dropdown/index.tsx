import { DropdownItem } from "@/models/dropdown-item"
import { Props } from "./types"
import styles from "./dropdown.module.css";
import { FormEvent } from "react";


const Dropdown = ({items, value, id, change}: Props) => {

    const changeHandler = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        if(change) {
            change(value);
        }
    };


    return <>
        <div className={styles["dropdown"]}>
            <label htmlFor={id}></label>
            <select id={id} className={styles["control"]} onChange={changeHandler}>
                {
                    items.map((item: DropdownItem) => 
                        <option key={item.key} value={item.value} selected={item.value === value}>
                            {item.key}
                        </option>
                    )
                }
            </select>
        </div>
    </>
}

export default Dropdown;