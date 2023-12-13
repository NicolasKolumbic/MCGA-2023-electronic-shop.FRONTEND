import Shopping from "@/components/pages/shopping";
import styles from "./styles.module.css";
import Navbar from "../../components/shared/navbar";

const ShoppingPage = () => {
    
    return <>
        <div className={styles["shopping-container"]}>
            <main>
                <header>
                    <Navbar />
                </header>
                <Shopping />
            </main>
        </div>
    </>
}


export default ShoppingPage;