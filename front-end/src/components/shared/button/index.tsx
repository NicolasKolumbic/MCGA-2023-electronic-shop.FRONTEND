"use client";
import styles from './button.module.css';
import { Props } from './types';


const Button = ({type, label, design, click}: Props) => {

    const cssClasses = design.split(' ').map((cssClass: string) => styles[cssClass]).join(' ');

    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        if(click) {
            click(event);
        } 
    }

    return <>
        <button type={type}
        className={`${styles["btn"]} ${cssClasses}`}
        onClick={(event: React.MouseEvent<HTMLElement>) => clickHandler(event)}>
            {label}
        </button>
    </>
}

export default Button;