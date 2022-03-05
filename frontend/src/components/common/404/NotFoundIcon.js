import React from "react";

function NotFoundIcon(props) {
    const notFoundImage =
        "https://rukminim1.flixcart.com/www/100/100/promos/23/08/2020/c5f14d2a-2431-4a36-b6cb-8b5b5e283d4f.png?q=90";
    return (
        <div className="ms-3 text-center" style={{ width: "100%" }}>
            <div style={{ display: "inline-block", marginTop: 150 }}>
                <img src={notFoundImage} alt="Not Found" />
                <h3>{props.title}</h3>
                <p className="text-secondary">{props.detailText}</p>
                <a href={props.redirectUrl} className="btn btn-primary">
                    {props.btnText}
                </a>
            </div>
        </div>
    );
}

export default NotFoundIcon;
