import Brand from "../brand";
import Button from "../button";
import TextBox from "../textbox";
import styles from "./login.module.css";


const Login = () => {
    return <>
        <form className={styles.login}>
            <Brand />
            <fieldset>
                <div>
                    <TextBox type={"text"} id={"email"} label={"Email"} />
                </div>
                <div>
                    <TextBox type={"password"} id={"password"} label={"Contraseña"} />
                </div>
                <Button type={"button"} label={"Iniciar Sesión"} design="cerulean fluid" />
            </fieldset>
        </form>
    </>
};

export default Login;