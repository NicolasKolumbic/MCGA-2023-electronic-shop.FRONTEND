'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Shopping from '../shopping';
import Brand from '@/components/shared/brand';
import Button from '@/components/shared/button';
import styles from "./home.module.css";

export const HomePage = () => {

    const router = useRouter();

    useEffect(() => {
        
    })

    return <div>
        <nav className={styles["navbar"]}>
            <div className={"flex"}>
                <div style={{width: '200px'}} className="mr-3">
                    <Brand />
                </div>
            </div>
            <ul className={styles["navbar__list"]}>
                <li className={styles["navbar__list__item"]}>
                    <Button design="btn outline-platinum" label={"Iniciar sesión"} link='/login' />
                </li>
            </ul>
        </nav>
        <Shopping />
    </div>

};

export default HomePage;