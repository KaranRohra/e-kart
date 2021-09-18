import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "components/home/products/ProductCard";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function ProductCarousel(props) {
    return (
        <div className="bg-secondary">
            <div className="border-bottom border-light">
                <h3 className="ps-4 pt-3 text-light">Recently Viewed</h3>
            </div>
            <Carousel
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                responsive={responsive}
                centerMode={true}
                draggable={false}
                className="p-3"
            >
                {props.products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </Carousel>
        </div>
    );
}

export default ProductCarousel;
