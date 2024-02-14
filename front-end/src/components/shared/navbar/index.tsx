'use client';
import { auth } from "@/components/pages/firebase";
import Brand from "../brand";
import Button from "../button";
import styles from "./navbar.module.css";
import { signOut } from "firebase/auth";

const Navbar = () => {

        const handleLogout = async () => {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            location.href = '/login';
        }

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
                    <Button design="btn outline-platinum" type={"button"} label={"Cerrar Sesión"} click={handleLogout} />
                </li>
            </ul>
        </nav>
    </>
}

export default Navbar;