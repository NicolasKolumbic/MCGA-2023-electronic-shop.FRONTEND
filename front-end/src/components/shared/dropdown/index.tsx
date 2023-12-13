import { DropdownItem } from "@/models/dropdown-item"
import { Props } from "./types"
import styles from "./dropdown.module.css";


const Dropdown = ({items, value, id}: Props) => {


    return <>
        <div className={styles["dropdown"]}>
            <label htmlFor={id}></label>
            <select id={id} className={styles["control"]}>
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