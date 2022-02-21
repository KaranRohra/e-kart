import React from "react";
import { Button, Table } from "react-bootstrap";
import "static/styles/compare-products/compare.css";
import ProductSalesGraph from "components/products/sales-graph/ProductSalesGraph";

function CompareProducts() {
    return (
        <div oncontextmenu="return false" className="snippet-body body-custom">
            <div className="container-fluid">
                <div className="table-responsive-custom">
                    <Table bordered className="table-custom bg-light">
                        <thead className="thead-custom">
                            <tr className="simple-head">
                                <th width="20%" className="th-custom bg-light">
                                    <div className="bg-white h-100 w-100"></div>
                                </th>
                                {Array.from(Array(3)).map((_, i) => (
                                    <th width="20%" className="th-custom bg-light">
                                        <div className="mb-2">
                                            <div style={{ width: 180, height: 90 }} className="border border-dark">
                                                <img
                                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                    variant="top"
                                                    src="https://m.media-amazon.com/images/I/61WNxdAeAoL._AC_SS350_.jpg"
                                                    alt="ProductImage"
                                                />
                                            </div>
                                            <span className="d-block text-custom-truncate ml-1">
                                                Lenovo IdeaPad Slim 5i 11th Gen Intel Core i5 8th Gen Intel Core i5 8th
                                                Gen Intel Core i5 8th Gen Intel Core i5 8th Gen Intel Core i5
                                            </span>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6 className="mb-0">₹ 68,500.00</h6>
                                                <Button>Add to cart</Button>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array(10)
                                .fill(0)
                                .map((_, index) => (
                                    <tr className="tr-custom">
                                        <th scope="row">Processor Name</th>
                                        <td className="base-item">Core i5</td>
                                        <td>Core i5</td>
                                        <td>Core i7</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
                <div className="">
                    <hr />
                    <ProductSalesGraph />
                </div>
            </div>
        </div>
    );
}

export default CompareProducts;
