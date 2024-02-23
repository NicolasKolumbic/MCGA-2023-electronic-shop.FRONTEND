import { DropdownItem } from "@/models/dropdown-item"
import { Props } from "./types"
import styles from "./dropdown.module.css";
import { FormEvent, useEffect, useState } from "react";


const Dropdown = ({items, value, id, label, change}: Props) => {

    const [currentValue, setCurrentValue] = useState<DropdownItem>({
        key: "Seleccione una categoría...",
        value: "DEFAULT"
    })

    const changeHandler = (event: FormEvent<HTMLSelectElement>) => {
        const item = items.find((item: DropdownItem ) => item.value === event.currentTarget.value);
        if(item) {
            setCurrentValue(item)
        }
        
        if(change) {
            change(event.currentTarget.value);
        }
    };

    useEffect(() => {
        if(value) {
            const selectedValue = items.find((item: DropdownItem ) => item.key === value);
            if(selectedValue) {
                setCurrentValue(selectedValue);
            }   
        }

    }, [value])

    return <>
        <div className={styles["droppdown"]}>
            <label className={styles["label"]} htmlFor={id}>{label}</label>
            <select id={id} className={styles["control"]} onChange={changeHandler} value={currentValue.value}>
                <option value="DEFAULT" disabled>Seleccione una categoría...</option>
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