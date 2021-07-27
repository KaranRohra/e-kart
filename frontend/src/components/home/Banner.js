import React from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";
import { bannerData } from "../../constants/data";

const useStyles = makeStyles({
    banner: {
        padding: 10,
        backgroundColor: "#f0f2f5",
    },
    bannerImage: {
        width: "100%",
        height: 280,
    },
});
function Banner() {
    const classes = useStyles();
    return (
        <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            className={classes.banner}
            navButtonsProps={{
                style: {
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: 0,
                },
            }}
        >
            {bannerData.map((image, index) => (
                <img key={index} src={image} alt="" className={classes.bannerImage} />
            ))}
        </Carousel>
    );
}

export default Banner;
