import React from "react";
import { makeStyles, InputBase, IconButton, Box } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { themeColor } from "../colors";

const useStyles = makeStyles((theme) => ({
    search: {
        backgroundColor: "#fff",
        marginLeft: 10,
        width: "40%",
        display: "flex",
        height: 35,
    },
    searchIcon: {
        padding: theme.spacing(1, 1),
        color: themeColor,
    },
    inputRoot: {
        fontSize: "unset",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 2),
    },
}));

function SearchBar() {
    const classes = useStyles();
    return (
        <Box className={classes.search} boxShadow={2}>
            <InputBase
                placeholder="Search for products, brands and many more"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
            />
            <IconButton className={classes.searchIcon}>
                <Search />
            </IconButton>
        </Box>
    );
}

export default SearchBar;
