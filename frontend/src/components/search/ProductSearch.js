import BoxSpinner from "components/common/spinners/BoxSpinner";
import MultiProductView from "components/products/multi-product/MultiProductView";
import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { getProductsBySearchAPI } from "services/apis/products";

function ProductSearch() {
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { value } = useParams();

    React.useEffect(() => {
        const callAPI = async () => {
            const response = await getProductsBySearchAPI({
                search: value,
                pageNo: 1,
            });
            setProducts(response.data);
            setIsLoading(false);
        };
        callAPI();
    }, [value]);
    return (
        <Container>
            {isLoading ? <BoxSpinner message="Get best match for you..." /> : <MultiProductView products={products} />}
        </Container>
    );
}

export default ProductSearch;
