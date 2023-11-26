import styles from './button.module.scss';
import { Props } from './types';


const Button = ({type, label, design}: Props) => {

    const cssClasses = design.split(' ').map((cssClass: string) => styles[cssClass]).join(' ');

    return <>
        <button type={type}
        className={`${styles["btn"]} ${cssClasses}`}>
            {label}
        </button>
    </>
}

export default Button;