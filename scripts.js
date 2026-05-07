function player(name, mark) {
  return { name, mark };
}

const gameBoard = (function() {
    const board = Array(9).fill("");

    const getBoard = () => board;
    
    const updateBoard = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
        }
        else {
            console.log("That blcok already taken!");
        }
    };

    const resetBoard = () => {
        board.fill("");
    };
    return {getBoard, updateBoard, resetBoard}
})();

const gameController = (function() {
    const board = gameBoard;
    const player1 = player("Player1", "X");
    const player2 = player("Player2", "O");
    let activePlayer = player1;
    let gameIsOver = false;
    const winPattern = [[0,1,2],[3,4,5],[6,7,8], //แนวนอน
        [0,3,6], [1,4,7], [6,7,8], //แนวตั้ง
        [0,4,8], [6,4,2] //แนวทะแยง    
    ]

    console.log(player1.mark);

    const changeTurn = () => {
        activePlayer = activePlayer !== player1 ? player1 : player2; 
        console.log(activePlayer);
    };



    return {changeTurn}
})();