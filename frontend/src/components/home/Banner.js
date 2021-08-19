import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner() {
    const images = [
        "https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50",
        "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
        "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
        "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
    ];

    return (
        <Carousel className="p-3">
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <Link to="/">
                        <img className="d-block w-100" src={image} alt={`${index} slide`} />
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Banner;
