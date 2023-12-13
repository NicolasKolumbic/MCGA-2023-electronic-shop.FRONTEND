import Brand from "../brand";
import Button from "../button";
import styles from "./navbar.module.css";

const Navbar = () => {
    return <>
        <nav className={styles["navbar"]}>
            <div style={{width: '200px'}}>
                <Brand />
            </div>
            
            <ul className={styles["navbar__list"]}>
                <li className={styles["navbar__username"]}>
                    Lionel Messi
                </li>
                <li className={styles["navbar__list__item"]}>
                    <Button design="btn outline-platinum" type={"button"} label={"Cerrar Sesión"} />
                </li>
            </ul>
        </nav>
    </>
}

export default Navbar;