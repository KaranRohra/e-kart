import React from "react";
import { Box, Grid, Button, makeStyles, Badge } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { themeColor } from "../colors";

const useStyles = makeStyles((theme) => ({
    login: {
        backgroundColor: "white",
        color: themeColor,
        padding: theme.spacing(0.5, 5, 0.5, 5),
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "2px",
    },
    more: {
        fontSize: "18px",
        textTransform: "none",
        color: "white",
    },
    cart: {
        fontSize: "18px",
        textTransform: "none",
        color: "white",
    },
    wrapper: {
        [theme.breakpoints.up("lg")]: {
            marginLeft: 150,
        },
        [theme.breakpoints.only("md")]: {
            marginLeft: 80,
        },
        [theme.breakpoints.down("sm")]: {
            marginLeft: 20,
        },
    },
}));

function HeaderButtons() {
    const classes = useStyles();
    return (
        <Box className={classes.wrapper}>
            <Grid container justifyContent="center" alignItems="center" spacing={5}>
                <Grid item>
                    <Button disableElevation variant="contained" className={classes.login}>
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={classes.more}>More</Button>
                </Grid>
                <Grid item>
                    <Button
                        startIcon={
                            <Badge badgeContent={4} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        }
                        className={classes.cart}
                    >
                        Cart
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HeaderButtons;
