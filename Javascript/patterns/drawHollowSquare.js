function drawHollowSquare(size) {
    for (let i = 1; i <= size; i++) {
        let row = '';
        for (let j = 0; j < size; j++) {
            if(i === 1 || i === size || j === i - 1 || j === i - 1)
                row += '*';
            else
                row += ' ';
        }
        console.log(row);
    }
}
drawHollowSquare(5);
