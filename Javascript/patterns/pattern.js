function drawDiagonal(size) {
    let radius = size;
    for (let i = 0; i < size * 3 - 1; i++) {
        let row = '';
        if(i % 2 !== 0){
            for (let j = 0; j <= i / 2; j++)
                row += ' ';
            for (let k = i / 3 + 1; k < size - 2; k++)
                row += '*';
        } else {
            for (let l = 0; l < i / 2; l++)
                row += ' ';
            for (let m = i / 3 + 1; m <= size - 1; m++)
                row += '*';
        }
        console.log(row);
    }
}
drawDiagonal(5);
