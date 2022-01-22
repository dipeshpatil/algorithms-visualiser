const config = {
  pathfinder: {
    rows: parseInt(JSON.parse(localStorage.getItem("pathfinder_rows") ?? null)),
    cols: parseInt(JSON.parse(localStorage.getItem("pathfinder_cols") ?? null)),
  },
};

export default config;
