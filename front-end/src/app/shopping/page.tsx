import Shopping from "@/components/pages/shopping";
import styles from "./styles.module.css";

const ShoppingPage = () => {
    return <>
        <div className={styles["shopping-container"]}>
            <main>
                <Shopping />
            </main>
        </div>
    </>
}


export default ShoppingPage;