function drawInvertedEquilateralTriangle(size) {
    for (let i = size - 1; i >= 0; i--) {
        let row = '';
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
drawInvertedEquilateralTriangle(5);
