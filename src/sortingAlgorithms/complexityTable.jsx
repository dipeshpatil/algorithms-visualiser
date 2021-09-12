import React from "react";

const ComplexityTable = () => (
  <div id="complexityTable">
    <table className="table-bordered table table-striped text-center rounded-b mt-2 shadowT table-dark">
      <thead>
        <tr>
          <th>Algorithm</th>
          <th colSpan="2">Time</th>
          <th>Space</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Case: </td>
          <td className="text-success table-success">Best</td>
          <td className="text-danger table-danger">Worst</td>
          <td></td>
        </tr>
        <tr>
          <td className="text-warning">Heap Sort</td>
          <td>N&times;Log N</td>
          <td>N&times;Log N</td>
          <td>1</td>
        </tr>
        <tr>
          <td className="text-warning">Merge Sort</td>
          <td>N&times;Log N</td>
          <td>N&times;Log N</td>
          <td>N</td>
        </tr>
        <tr>
          <td className="text-warning">Quick Sort</td>
          <td>N&times;Log N</td>
          <td>
            N<sup>2</sup>
          </td>
          <td>Log N</td>
        </tr>
        <tr>
          <td className="text-warning">Bubble Sort</td>
          <td>N</td>
          <td>
            N<sup>2</sup>
          </td>
          <td>1</td>
        </tr>
        <tr>
          <td className="text-warning">Insertion Sort</td>
          <td>N</td>
          <td>
            N<sup>2</sup>
          </td>
          <td>1</td>
        </tr>
        <tr>
          <td className="text-warning">Selection Sort</td>
          <td>
            N<sup>2</sup>
          </td>
          <td>
            N<sup>2</sup>
          </td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ComplexityTable;
