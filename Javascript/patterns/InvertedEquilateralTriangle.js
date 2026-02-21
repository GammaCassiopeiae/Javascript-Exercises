function drawInvertedEquilateralTriangle(size) {
    for (let i = size - 1; i >= 0; i--) {
        let row = '';
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
drawInvertedEquilateralTriangle(5);
function drawEquilateralTriangle(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
drawEquilateralTriangle(5);
