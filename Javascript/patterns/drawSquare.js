function drawSquare(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        row += '*';
    }
    console.log(row);
}
drawSquare(5);
function drawEquilateralTriangle(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
drawEquilateralTriangle(5);
