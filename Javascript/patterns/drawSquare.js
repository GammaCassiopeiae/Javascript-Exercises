function drawSquare(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        row += '*';
    }
    console.log(row);
}
drawSquare(5);
