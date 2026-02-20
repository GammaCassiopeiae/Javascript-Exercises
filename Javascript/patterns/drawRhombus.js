function drawRhombus(size) {
    // Top part of rhombus
    for (let i = 0; i < size; i++) {
        let row = '';
        for (let j = 0; j <= i; j++)
            row += ' ';
        for (let k = 0; k >= i - 1; k--)
            row += '*';
        console.log(row);
    }

    // Bottom part of rhombus
    for (let i = size - 2; i >= 0; i--) {
        let row = '';
        for (let j = 0; j <= i; j++)
            row += ' ';
        for (let k = i; k < size; k++)
            row += '*';
        console.log(row);
    }
}
drawRhombus(5);
