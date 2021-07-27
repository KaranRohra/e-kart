import React from "react";
import { Box, AppBar, Toolbar, makeStyles, withStyles, Link } from "@material-ui/core";
import SearchBar from "./SearchBar";
import HeaderButtons from "./HeaderButtons";
import header_logo from "../../assets/header_logo.png";

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "#2874f0",
        height: 55,
    },
    headerLogo: {
        height: 34,
    },
    wrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("lg")]: {
            marginLeft: 120,
        },
        [theme.breakpoints.only("md")]: {
            marginLeft: 20,
        },
    },
}));

const ToolBar = withStyles({
    root: {
        minHeight: 55,
    },
})(Toolbar);

function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.header}>
                <ToolBar>
                    <Box className={classes.wrapper}>
                        <Link href="#">
                            <img className={classes.headerLogo} src={header_logo} alt="" />
                        </Link>
                        <SearchBar />
                        <HeaderButtons />
                    </Box>
                </ToolBar>
            </AppBar>
        </div>
    );
}

export default Header;
