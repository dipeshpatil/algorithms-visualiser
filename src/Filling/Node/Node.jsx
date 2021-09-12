import React from "react";

import "./Node.css";

export default class Node extends React.Component {
  render() {
    const {
      row,
      col,
      onNodeClick,
      isFilled,
      isEmpty,
      isBoundary,
      onNodeOver,
      backgroundColor,
      onNodeOut,
    } = this.props;

    const nodeProperties = isFilled
      ? backgroundColor
      : isEmpty
      ? "node-empty"
      : isBoundary
      ? "node-boundary"
      : "";

    return (
      <div
        id={`f-node-${row}-${col}`}
        className={`${nodeProperties} f-node`}
        onClick={() => onNodeClick(row, col)}
        onMouseOver={() => onNodeOver(row, col)}
        onMouseOut={() => onNodeOut(row, col)}
      />
    );
  }
}
