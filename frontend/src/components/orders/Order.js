import React from "react";
import ProductView from "components/orders/ProductView";
import OrderFilter from "components/orders/OrderFilter";
import { getOrdersAPI } from "services/apis/orders";
import SkeletonLoader from "components/common/spinners/SkeletonLoader";
import { Container } from "react-bootstrap";
import Header from "components/header/Header";

function Order() {
    const [loading, setLoading] = React.useState(false);
    const [orders, setOrders] = React.useState([]);
    const [filterList, setFilterList] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        const fetchOrders = async () => {
            const response = await getOrdersAPI();
            setOrders(response.data);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    return (
        <>
            <Header />
            {loading ? (
                <SkeletonLoader />
            ) : (
                <Container style={{ display: "flex" }} className="pt-5 ps-5">
                    <OrderFilter filterList={filterList} setFilterList={setFilterList} />
                    <ProductView orders={orders} filterList={filterList} />
                </Container>
            )}
        </>
    );
}

export default Order;
