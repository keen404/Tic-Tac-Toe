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


    const playRound = () => {
        board.updateBoard(0, activePlayer.mark);
        checkWinner();
        changeTurn();

        board.updateBoard(3, activePlayer.mark);
        checkWinner();
        changeTurn();

        board.updateBoard(1, activePlayer.mark);
        checkWinner();
        changeTurn();

        board.updateBoard(4, activePlayer.mark);
        checkWinner();
        changeTurn();

        board.updateBoard(2, activePlayer.mark);
        checkWinner();
        changeTurn();
        board.updateBoard(5, activePlayer.mark);
        checkWinner();
        changeTurn();

        
    }

    const checkWinner = () => {
        for (const pattern of winPattern) {
            if (gameIsOver) {
                break;
            }
            const currentBoard = board.getBoard();
            let player1Score = 0;
            let player2Score = 0;

            for (const index of pattern) {
                if (currentBoard[index] === 'X') {
                    player1Score++;
                }
                else if (currentBoard[index] === 'O') {
                    player2Score++;
                }
            }

            if (player1Score === 3 || player2Score === 3) {
                gameIsOver = true;
                declareWinner(activePlayer.name);
            }
        }
    };

    const declareWinner = (winner) => {
        console.log(`The winner is ${winner}`);
    };
        // play round
        // activePlayer.mark กับ index ส่งไป อัพเดตบอร์ด
        // changeTurn
    //check winner

    const changeTurn = () => {
        activePlayer = activePlayer !== player1 ? player1 : player2; 
        
    };



    return {playRound};
})();