import React from "react";
import { NavLink } from "react-router-dom";

import "./bootstrap.min.css";

export default class IndexTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container mt-2">
                <div className="text-center text-dark">So Far Implemented</div>
                <table className="table table-striped table-light mt-2">
                    <thead>
                        <tr>
                            <th scope="col">Latest Visualiser</th>
                            <th scope="col">Category</th>
                            <th scope="col">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pathfinding Visualiser</td>
                            <td>Pathfinding</td>
                            <td>
                                <NavLink to="/pathfinder">
                                    <code>/pathfinder</code>
                                </NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>Rat In A Maze</td>
                            <td>Backtracking</td>
                            <td>
                                <NavLink to="/rat-in-a-maze">
                                    <code>/rat-in-a-maze</code>
                                </NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>Sorting Visualiser</td>
                            <td>Sorting</td>
                            <td>
                                <NavLink to="/sorting">
                                    <code>/sorting</code>
                                </NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>N Queens Problem</td>
                            <td>Backtracking</td>
                            <td>
                                <NavLink to="/n-queens-problem">
                                    <code>/n-queens-problem</code>
                                </NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>Binary Search</td>
                            <td>Searching</td>
                            <td>
                                <NavLink to="/binary-search">
                                    <code>/binary-search</code>
                                </NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>Linear Search</td>
                            <td>Searching</td>
                            <td>
                                <NavLink to="/linear-search">
                                    <code>/linear-search</code>
                                </NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center text-muted">
                    Happy Visualisation Day!
                </div>
            </div>
        );
    }
}
