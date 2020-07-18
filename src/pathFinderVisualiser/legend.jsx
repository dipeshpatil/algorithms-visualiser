import React from "react";

const Legend = () => (
    <div id="legend" className="container-fluid">
        <div className="row bg-dark p-2 rounded">
            <div className="col-6">
                <div className="row">
                    <div className="col-2">
                        <div className="legend legend-start"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-light legend-label">
                            Start Node
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-wall"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-light legend-label">Wall Node</div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-visited"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-light legend-label">
                            Visited Node
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-2">
                        <div className="legend legend-finish"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-light legend-label">
                            Finish Node
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-path"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-light legend-label">Path Node</div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-shortest-path"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-light legend-label">
                            Shortest Path
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Legend;
