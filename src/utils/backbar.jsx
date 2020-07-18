import React from "react";
import { NavLink } from "react-router-dom";

const BackBar = () => (
    <div className="bg-secondary py-2">
        <NavLink to="/">
            <span className="text-light ml-3">
                <i className="fas fa-arrow-left"></i> Back
            </span>
        </NavLink>
    </div>
);

export default BackBar;
