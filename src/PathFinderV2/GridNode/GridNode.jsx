import React from "react";

import "./GridNode.scss";

const GridNode = ({
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
      id={`gridNode-${row}-${col}`}
      className={`gridNode ${extraClassName} `}
      onClick={() => onNodeClick(row, col)}
      onMouseOver={() => onNodeOver(row, col)}
      onMouseOut={() => onNodeOut(row, col)}
    ></div>
  );
};

export default GridNode;
