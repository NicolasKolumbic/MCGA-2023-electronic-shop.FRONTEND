'use client';
import { useAppSelector } from "@/stores";
import Brand from "../brand";
import Button from "../button";
import styles from "./navbar.module.css";
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from "@/core/auth-api";

const Navbar = () => {

    const router = useRouter();
    const userEmail = useAppSelector((state) => state.user.email);
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        logout({}).then(() => {
            router.push("/login");
        });
    }

    return <>
        <nav className={styles["navbar"]}>
            <div className={"flex"}>
                <div style={{width: '200px'}} className="mr-3">
                    <Brand />
                </div>
                <ul className={styles["navbar__list"]}>
                    <li>
                        <a href="/product-managment">Productos</a>
                    </li>
                    <li>
                        <a href="/category-managment">Categorías</a>
                    </li>
                </ul>
            </div>
            <ul className={styles["navbar__list"]}>
                <li className={styles["navbar__username"]}>
                    {userEmail}
                </li>
                <li className={styles["navbar__list__item"]}>
                    <Button design="btn outline-platinum" type={"button"} label={"Cerrar Sesión"} click={handleLogout} />
                </li>
            </ul>
        </nav>
    </>
}

export default Navbar;