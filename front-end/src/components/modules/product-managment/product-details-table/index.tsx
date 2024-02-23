import { Props } from "./types"

import styles from './product-details-table.module.css';

const ProductDetailsTabla = ({features}: Props) => {

    return <>
        <table className={styles["product-details-table"]}>
            <caption>Características</caption>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                Object.keys(features).map((key: string) =>(
                    <tr key={key}>
                        <td>
                            {key}
                        </td>
                        <td>
                            {features[key]}
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </>
}

export default ProductDetailsTabla;