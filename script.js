function moveFocus(currentInput) {
    const value = currentInput.value;

    if (value >= '1' && value <= '9') {
        let nextInput = currentInput.nextElementSibling || 
                        currentInput.closest('.sub-container').nextElementSibling?.querySelector('input');
        
        nextInput?.focus();
    } else if (value === '0') {
        currentInput.value = '';
    }
}
function isValid(board, row, col, num) {
    if (num === 0) return true; // 0 is treated as empty

    // Check row, column, and 3x3 box in a single loop
    for (let i = 0; i < 9; i++) {
        // Cheking row
        if (i !== col && board[row][i] === num) return false;
        // Checking column
        if (i !== row && board[i][col] === num) return false;
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        const boxCol = Math.floor(col / 3) * 3 + (i % 3);
        if ((boxRow !== row || boxCol !== col) && board[boxRow][boxCol] === num) return false;
    }
    return true;
}
function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) return { row, col };
        }
    }
    return null;
}
function showBoard(board) {
    document.querySelectorAll('input').forEach((input, index) => {
        input.value = board[Math.floor(index / 9)][index % 9] || '';
    });
}
// Function to simulate the delay and allow UI updates
async function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true;

    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            showBoard(board);

            await new Promise(resolve => setTimeout(resolve, 50));

            if (await solveSudoku(board)) return true;

            board[row][col] = 0;
            showBoard(board);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    return false;
}
function checkUserEnter(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0 && !isValid(board, row, col, board[row][col])) {
                return true;
            }
        }
    }
    return false;
}
async function SolveSudoku() {
    var button = document.getElementById("button");
    if (button.innerHTML == "SOLVED :)"|| button.innerHTML=="NO SOLUTION :(") {
        button.innerHTML = "RESET :|";
        return ;
    }
    else if(button.innerHTML == "RESET :|" ){
        document.querySelectorAll('input').forEach(input => input.value = '');
        button.innerHTML = "SOLVE";
        return ;
    }
    let arr = [];
    let inputs = document.querySelectorAll('input');

    inputs.forEach((input, index) => {
        let value = parseInt(input.value) || 0;
        if (index % 9 === 0) arr.push([]);
        arr[arr.length - 1].push(value);
    });

    if (checkUserEnter(arr)) return alert('Enter Valid Values');

    const result = await solveSudoku(arr);

    document.getElementById("button").innerHTML = result ? "SOLVED :)" : "NO SOLUTION :(";
}
    