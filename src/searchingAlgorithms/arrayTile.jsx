import React from "react";

const ArrayTile = ({ idx, val, type }) =>
    type === "binarySearch" ? (
        <div className="b-array-bar" key={idx}>
            {`${val}`}
            <br />
            <span>{`${idx}`}</span>{" "}
        </div>
    ) : (
        <div className="l-array-bar" key={idx}>
            {`${val}`}
            <br />
            <span>{`${idx}`}</span>{" "}
        </div>
    );

export default ArrayTile;
