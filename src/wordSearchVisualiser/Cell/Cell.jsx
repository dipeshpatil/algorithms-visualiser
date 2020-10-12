import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {
    render() {
        const { row, col, val, found } = this.props;

        const extraClass = found ? "found-cell" : "default-cell";

        return (
            <div id={`cell-${row}-${col}`} className={`ws-cell ${extraClass}`}>
                {val}
            </div>
        );
    }
}
