import Brand from "../../shared/brand";
import Button from "../../shared/button";
import TextBox from "../../shared/textbox";
import styles from "./login.module.css";


const Login = () => {
    return <>
        <form className={styles.login}>
            <Brand />
            <fieldset>
                <div>
                    <TextBox type={"text"} id={"email"} label={"Email"} design={"dark"} />
                </div>
                <div>
                    <TextBox type={"password"} id={"password"} label={"Contraseña"} design={"dark"}/>
                </div>
                <Button type={"submit"} label={"Iniciar Sesión"} design="cerulean fluid" />
            </fieldset>
        </form>
    </>
};

export default Login;