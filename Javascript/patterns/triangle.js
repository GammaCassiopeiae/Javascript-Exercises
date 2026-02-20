function drawEquilateralTriangle(size) {
    for (let i = 0; i < size; i++) {
        let row = '';
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
drawEquilateralTriangle(5);
