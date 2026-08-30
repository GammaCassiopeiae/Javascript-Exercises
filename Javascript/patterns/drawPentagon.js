function drawHollowOctagonDiagonalWithSpaces(size) {
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
            for (let m = i + 1; m <= size - 1; m++)
                row += '*';
        }
        console.log(row);
    }
}
drawHollowOctagonDiagonalWithSpaces(5);
function drawEquilateralTriangle(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
//  comment
drawEquilateralTriangle(5);
function drawEquilateralTriangle(size) {
    let row = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j <= i; j++)
            row += '*';
        console.log(row);
    }
}
drawEquilateralTriangle(5);

for (let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
        if (i === 0 || i === 4 || j === 0 || j === 4) {
            process.stdout.write('*');
        } else {
            process.stdout.write(' ');
        }
    }
    console.log();
}

