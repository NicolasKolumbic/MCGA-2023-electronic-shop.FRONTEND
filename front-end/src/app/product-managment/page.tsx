import TextBox from "@/components/shared/textbox";
import styles from "./styles.module.css";
import ProductDetail from "@/components/modules/product-managment/product-detail";

const ProductManagmentPage = () => {

    return <>
        <div>
            <form>
                <fieldset>
                    <legend>Nuevo Producto</legend>
                    <TextBox type={"text"} id={"productName"} label={"Nombre de producto"} design="light" />
                    <TextBox type={"text"} id={"price"} label={"Precio"} design="light" />
                </fieldset>
            </form>
        </div>
    </>
};

export default ProductManagmentPage;