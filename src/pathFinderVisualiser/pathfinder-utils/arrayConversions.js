export function convert1Dto2DArray(OneDArray, ROWS, COLS) {
    const twoDArray = [];
    for (let i = 0; i < ROWS; i++) {
        const oneDRow = [];
        for (let j = 0; j < COLS; j++) {
            const { col, row } = OneDArray[i * ROWS + j];
            if (i === row && j === col) {
                oneDRow.push(OneDArray[i * ROWS + j]);
            }
        }
        twoDArray.push(oneDRow);
    }
    return twoDArray;
}

export function convert2Dto1DArray(TwoDArray) {
    const OneDArray = [];
    for (let i = 0; i < TwoDArray.length; i++) {
        for (let j = 0; j < TwoDArray[i].length; j++) {
            OneDArray.push(TwoDArray[i][j]);
        }
    }
    return OneDArray;
}
