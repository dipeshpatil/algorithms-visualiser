import React from "react";

import "./Node.css";

export default class Node extends React.Component {
    render() {
        const {
            row,
            col,
            isFinish,
            isStart,
            isWall,
            onNodeClick,
            onNodeOver,
            onNodeOut,
        } = this.props;

        const extraClassName = isFinish
            ? "node-finish"
            : isStart
            ? "node-start"
            : isWall
            ? "node-wall"
            : "";

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName} `}
                onClick={() => onNodeClick(row, col)}
                onMouseOver={() => onNodeOver(row, col)}
                onMouseOut={() => onNodeOut(row, col)}
            ></div>
        );
    }
}
