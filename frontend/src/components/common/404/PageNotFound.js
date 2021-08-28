import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "static/styles/pageNotFound.css";

function PageNotFound() {
    const history = useHistory();
    React.useEffect(() => {
        document.body.style.backgroundColor = "#0d6efd";
        return () => {
            document.body.style.backgroundColor = "#fff";
        };
    }, []);

    return (
        <div className="page-not-found">
            <div className="main">
                <h1 className="page-not-found-h1">
                    4 <span className="style"> 0</span> 4
                    <div className="blink typing">
                        <p className="page-not-found-p">
                            Unfortunately the page you are looking for has been moved or deleted
                        </p>
                        <Button
                            onClick={() => history.push("/")}
                            variant="secondary"
                            className="mt-2"
                            style={{ width: 200, height: 50, fontSize: 20 }}
                        >
                            Go To Home
                        </Button>
                    </div>
                </h1>
            </div>
        </div>
    );
}

export default PageNotFound;
