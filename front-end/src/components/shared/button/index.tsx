"use client";
import styles from './button.module.css';
import { Props } from './types';

const Button = ({type, label, design, link, icon, click}: Props) => {

    const cssClasses = design.split(' ').map((cssClass: string) => styles[cssClass]).join(' ');

    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        if(click) {
            click(event);
        } 
    }

    return <>
        {link ?
        <a href={link}
        className={`inline-flex ${styles["btn"]} ${cssClasses}`}
        onClick={(event: React.MouseEvent<HTMLElement>) => clickHandler(event)}>
            {icon ? <span className="pr-2">{icon}</span>: null}
            {label}
        </a>
        :
        <button type={type}
        className={`${styles["btn"]} ${cssClasses}`}
        onClick={(event: React.MouseEvent<HTMLElement>) => clickHandler(event)}>
            <span className="inline-flex align-middle">
                {icon ? <span className="pr-2">{icon}</span>: null}
                {label}
            </span>
        </button>
        }
    </>
}

export default Button;