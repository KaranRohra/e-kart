import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { navData } from "../../constants/data";

const useStyles = makeStyles({
    nav: {
        marginTop: 50,
        textAlign: "center",
    },
    navItem: {
        padding: 15,
    },
    navItemImage: {
        width: 64,
    },
    navItemText: {
        fontSize: 14,
    },
});

function NavBar() {
    const classes = useStyles();

    return (
        <Grid container justifyContent="space-evenly" className={classes.nav}>
            {navData.map((item, index) => (
                <Grid item key={index} className={classes.navItem}>
                    <img src={item.url} alt="" className={classes.navItemImage} />
                    <Typography className={classes.navItemText}>{item.text}</Typography>
                </Grid>
            ))}
        </Grid>
    );
}

export default NavBar;
