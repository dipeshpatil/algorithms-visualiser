import React from "react";

const ProblemStatement = () => (
    <div className="mt-2">
        <br />
        Given a 2D board and a word, find if the word exists in the grid.
        <br />
        <br />
        The word can be constructed from letters of sequentially adjacent cell,
        where "adjacent" cells are those horizontally or vertically neighboring.
        The same letter cell may not be used more than once.
        <br />
        <br />
        <b>Example:</b>
        <br />
        <br />
        <pre>
            <b>board</b> = [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;['A','B','C','E'],
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;['S','F','C','S'],
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;['A','D','E','E']
            <br />
            ]
            <br />
            <br />
            Given word = "<b>ABCCED</b>", return <b>true</b> <br />
            Given word = "<b>SEE</b>", return <b>true</b> <br />
            Given word = "<b>ABCB</b>", return <b>false</b>
        </pre>
    </div>
);

export default ProblemStatement;
