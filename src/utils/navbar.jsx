import React from "react";

const NavBar = () => (
    <div className="bg-danger py-2 px-2">
        <span>
            <a
                className="btn-sm text-decoration-none bg-danger rounded-0 text-light"
                href="https://github.com/dipeshpatil/algorithms-visualiser"
            >
                <i className="fab text-light fa-github"></i>
                &nbsp; Source Code
            </a>
            <a
                className="btn-sm text-decoration-none bg-danger rounded-0 text-light"
                href="https://linkedin.com/in/dipesh-patil"
            >
                <i className="fab text-light fa-linkedin"></i>
                &nbsp; Dipesh Patil
            </a>
        </span>
    </div>
);

export default NavBar;
