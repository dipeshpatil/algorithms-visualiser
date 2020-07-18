import React from "react";

const Legend = () => (
    <div id="legend" className="mt-2 mb-2">
        <div id="legendRow" className="row p-2">
            <div className="col-6">
                <div className="row">
                    <div className="col-2">
                        <div className="legend legend-start"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-dark font-weight-bold legend-label">Source</div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-wall"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-dark font-weight-bold legend-label">Wall</div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-visited"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-dark font-weight-bold legend-label">Visited</div>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-2">
                        <div className="legend legend-finish"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-dark font-weight-bold legend-label">
                            Destination
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-path"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-dark font-weight-bold legend-label">Path</div>
                    </div>

                    <div className="col-2">
                        <div className="legend legend-shortest-path"></div>
                    </div>
                    <div className="col-10">
                        <div className="text-dark font-weight-bold legend-label">
                            Shortest Path
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Legend;
