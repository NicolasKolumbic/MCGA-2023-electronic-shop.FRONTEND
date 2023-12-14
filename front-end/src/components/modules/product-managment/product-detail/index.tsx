"use client";
import Button from "@/components/shared/button";
import TextBox from "@/components/shared/textbox";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import { Props } from "./types";

interface Row {
    name: string;
    key: string;
    value: string;
    isValid: boolean;
}

const ProductDetail = ({update, features}: Props) => {

    const row = {
        name: 'characteristic-name-1',
        key: '',
        value: '',
        isValid: false
    }

    const [items, setItems] : [Row[], (item: Row[]) => void]= useState([row]);

    const clickAddHandler = (index: number) => {
       const updated = [
            ...items,
            {
                name: 'characteristic-name-'+(index + 2),
                key: '',
                value: '',
                isValid: false
            }
       ]

       setItems(updated);
    };

    const clickLessHandler = (index: number) => {
        let rows = items;
        if (rows.length > 1) {
            rows = rows.filter((item: any, index: number) => index < (rows.length - 1));
            setItems([
                ...rows
            ]);
        }

    };

    const valueChangeHandler = (name: string, value: string) => {
        const updatedItems = items.map((row: Row) => {
            if(row.name === name) {
                row.value = value;
            }
            row.isValid = !!(row.key && row.value);
            return row;
        });
        setItems([
            ...updatedItems
        ])
        emit(updatedItems);
    }

    const keyChangeHandler = (name: string, key: string) => {
        const updatedItems = items.map((row: Row) => {
            if(row.name === name) {
                row.key = key;
            }
            row.isValid = !!(row.key && row.value);
            return row;
        });
        setItems([
            ...updatedItems
        ])
        emit(updatedItems);
    }

    const emit = (items: Row[]) => {
        if(update){
            update(
                items
                .filter((row: Row) => row.isValid)
                .map((row: Row) => {
                    return {
                        key: row.key,
                        value: row.value
                    }
                })
            );
        } 
    }

    return <>
        <div>
            <table>
                <thead></thead>
                <tbody>
                    {
                        items.map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="pr-2">
                                    <TextBox type={"text"}
                                     id={"characteristic-name-" + (index + 1)}
                                     label={"Nombre de característica " + (index + 1)}
                                     design="light"
                                     change={(value: string) => keyChangeHandler("characteristic-name-" + (index + 1), value)} />
                                </td>
                                <td className="pr-2">
                                    <TextBox type={"text"}
                                     id={"characteristic-value-" + (index + 1)}
                                     label={"Valor de característica " + (index + 1)}
                                     design="light" 
                                     change={(value: string) => valueChangeHandler("characteristic-name-" + (index + 1), value)} />
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {
                                            (items.length === index + 1)
                                                ?
                                                <>
                                                    <Button type={"button"} label={<FaPlus />} design={"prussian"} click={(event: React.MouseEvent) => clickAddHandler(index)} />
                                                    <Button type={"button"} label={<FaMinus />} design={"prussian"} click={(event: React.MouseEvent) => clickLessHandler(index)} />
                                                </>
                                                :
                                                null
                                        }
                                    </div>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>
}

export default ProductDetail;