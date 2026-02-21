function drawTwentyFour() {
    let row1 = ' * * * * * ';
    let row2 = '  * * * * * *  ';
    let row3 = '   * * * * * * *  ';
    console.log(row1 + '\n' + row2 + '\n' + row3);
}
drawTwentyFour();

function drawHollow(size) {
    for (let i = 0; i < size; i++) {
        let row = '';
        if(i === 0 || i === size - 1){
            for (let j = 0; j <= i; j++)
                row += ' ';
            for (let k = i; k < size; k++)
                row += '*';
        } else {
            for (let l = 0; l < i; l++)
                row += ' ';
            row += '*';
            for (let m = i + 4; m <= size - 1; m++)
                row += '*';
        }
        console.log(row);
    }
}
drawHollow(5);
function drawSixteen() {
    let row1 = ' * * * * * ';
    let row2 = '  * * * * * *  ';
    let row3 = '   * * * * * * *  ';
    console.log(row1 + '\n' + row2 + '\n' + row3);
}
drawSixteen();
function drawForty() {
    let row1 = ' * * * * * ';
    let row2 = '  * * * * * *  ';
    let row3 = '   * * * * * * *  ';
    console.log(row1 + '\n' + row2 + '\n' + row3);
}
drawForty();
