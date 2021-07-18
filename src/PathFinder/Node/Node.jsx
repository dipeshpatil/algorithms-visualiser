import React from "react";

import "./Node.scss";

const Node = ({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  onNodeClick,
  onNodeOver,
  onNodeOut,
}) => {
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
};

export default Node;
