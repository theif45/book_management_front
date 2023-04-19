import React from "react";

const PromiseStudy = () => {
    const a = new Promise((resolve, reject) => {
        console.log("promise call");
        if (1 == 2) {
            resolve(); // normal return
        } else {
            throw new Error("error!!!");
        }
    });

    const clickHandler = () => {
        a.then(() => {
            console.log("first then call");
            return new Promise((resolve, reject) => {
                if (1 == 2) {
                    resolve("return!!!");
                } else {
                    reject(new Error("second error!!!"));
                }
            });
        })
            .then(b)
            .catch((error) => console.log(error));
    };

    const b = (str) => {
        console.log(str);
    };

    return (
        <div>
            <button onClick={clickHandler}>버튼</button>
        </div>
    );
};

export default PromiseStudy;
