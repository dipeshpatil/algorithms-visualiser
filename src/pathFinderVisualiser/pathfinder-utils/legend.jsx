import React from "react";

const borderStyles = { border: "1px solid #f0f0f0" };

const Legend = () => (
    <div id="legend" className="bg-dark shadowT rounded">
        <div id="legendRow" className="row p-2">
            <div className="col-6">
                <div className="row">
                    <div className="col-2">
                        <div
                            style={borderStyles}
                            className="legend mt-1 legend-start"
                        ></div>
                    </div>
                    <div className="col-10 nmt-5">
                        <div className="text-light font-weight-bold legend-label">
                            Source
                        </div>
                    </div>

                    <div className="col-2">
                        <div
                            style={borderStyles}
                            className="legend mt-1 legend-wall"
                        ></div>
                    </div>
                    <div className="col-10 nmt-5">
                        <div className="text-light font-weight-bold legend-label">
                            Wall
                        </div>
                    </div>

                    <div className="col-2">
                        <div
                            style={borderStyles}
                            className="legend mt-1 legend-visited"
                        ></div>
                    </div>
                    <div className="col-10 nmt-5">
                        <div className="text-light font-weight-bold legend-label">
                            Visited
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-2">
                        <div
                            style={borderStyles}
                            className="legend mt-1 legend-finish"
                        ></div>
                    </div>
                    <div className="col-10 nmt-5">
                        <div className="text-light font-weight-bold legend-label">
                            Destination
                        </div>
                    </div>

                    <div className="col-2">
                        <div
                            style={borderStyles}
                            className="legend mt-1 legend-path"
                        ></div>
                    </div>
                    <div className="col-10 nmt-5">
                        <div className="text-light font-weight-bold legend-label">
                            Node
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Legend;
