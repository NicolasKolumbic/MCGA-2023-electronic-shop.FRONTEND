import Filters from "@/components/modules/shopping/filters";
import styles from "./shopping.module.css";


const Shopping = () => {

    return <>
        <div className={styles["shopping-page"]}>
            <aside>
               <Filters />
            </aside>
            <section>
                <article>

                </article>
            </section>
        </div>
    </>
}

export default Shopping;