import React from "react";
import "static/styles/skeleton.css";

function SkeletonLoader() {
    return (
        <section>
            <aside>
                <div className="info__box">
                    <div className="left_box">
                        <p className="shinny info__text_one"></p>
                        <p className="shinny info__text_two"></p>
                        <p className="shinny info__text_three"></p>
                    </div>
                    <div className="right_box">
                        <div className="shinny image"></div>
                    </div>
                </div>

                <div className="info__box">
                    <div className="left_box">
                        <p className="shinny info__text_one"></p>
                        <p className="shinny info__text_two"></p>
                        <p className="shinny info__text_three"></p>
                    </div>
                    <div className="right_box">
                        <div className="shinny image"></div>
                    </div>
                </div>

                <div className="info__box">
                    <div className="left_box">
                        <p className="shinny info__text_one"></p>
                        <p className="shinny info__text_two"></p>
                        <p className="shinny info__text_three"></p>
                    </div>
                    <div className="right_box">
                        <div className="shinny image"></div>
                    </div>
                </div>
            </aside>
        </section>
    );
}

export default SkeletonLoader;
