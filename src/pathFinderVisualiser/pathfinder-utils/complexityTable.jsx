import React from "react";

const ComplexityTable = () => (
    <div id="complexityTableP">
        <table className="table-bordered table table-striped text-center rounded-b mt-2  table-light">
            <thead>
                <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-primary">Dijkstras</td>
                    <td>O(E + V&times;LogV)</td>
                    <td>O(V)</td>
                </tr>
                <tr>
                    <td className="text-primary">BFS</td>
                    <td>
                        O(V + E) = O(b<sup>d</sup>)
                    </td>
                    <td>
                        O(V) = O(b<sup>d</sup>)
                    </td>
                </tr>
                <tr>
                    <td className="text-primary">A* Search</td>
                    <td>O(E)</td>
                    <td>O(V)</td>
                </tr>
                <tr>
                    <td className="text-primary">Bi-Directional Search</td>
                    <td>
                        O(b<sup>d/2</sup>)
                    </td>
                    <td>
                        O(b<sup>d/2</sup>)
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ComplexityTable;
