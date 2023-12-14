import AddProduct from "@/components/modules/product-managment/add-product";

const ProductManagmentPage = () => {

    

    return <>
        <div>
            <form>
                <fieldset>
                    <legend>Nuevo Producto</legend>
                    <AddProduct />
                </fieldset>
            </form>
        </div>
    </>
};

export default ProductManagmentPage;