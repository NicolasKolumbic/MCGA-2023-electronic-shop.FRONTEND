import Login from "@/components/pages/login";
import styles from "./login.module.css";
import Image from "next/image";

const LoginPage = () => {
    
    return <>
        <div className={styles['login-page']}>
            <div>   
                <Login />
            </div>
            <footer className={styles['login-footer']}>
                <div className="d-flex">
                    <div>
                        <h4>
                            Modelos Computacionales de Gestión Administrativa <strong>2023</strong>
                        </h4>
                    </div>
                    <Image src={'image/uai.svg'} alt={"Logo Universidad Abierta Interamericana"} width={298} height={40} />
                </div>
            </footer>
        </div>
    </>
}


export default LoginPage;