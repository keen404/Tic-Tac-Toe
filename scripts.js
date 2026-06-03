function player(name, mark) {
  return { name, mark };
}

const gameBoard = (function() { // Display Board and State Only(ข้อมูลที่เก็บไว้ในobjectนั้น)
    const board = Array(9).fill("");

    const getBoard = () => board;
    
    const updateBoard = (index, mark) => {
            board[index] = mark;
    };

    const resetBoard = () => {
        board.fill("");
    };
    return {getBoard, updateBoard, resetBoard}
})();

const displayDom = (function () { // UI interactive and Display Only
    const board = gameBoard;
    const squaresArr = document.querySelectorAll(".square");
    
    const displayArrayToDom = () => {
        const currentBoard = board.getBoard();
        squaresArr.forEach((node, index) => {
            node.textContent = currentBoard[index];
        })
    }

    return {displayArrayToDom};
})(); 

const gameController = (function() { // Controll Logic Only
    const board = gameBoard;
    const domControll = displayDom;
    const player1 = player("Player1", "X");
    const player2 = player("Player2", "O");
    const scoreToBeWinner = 3; // 3 Square in a row
    let activePlayer = player1;
    let gameIsOver = false;

    const winPattern = [[0,1,2],[3,4,5],[6,7,8], //แนวนอน
        [0,3,6], [1,4,7], [6,7,8], //แนวตั้ง
        [0,4,8], [6,4,2] //แนวทะแยง    
    ]

    const playerMarkOnBoard = (boardIndex) => {
        if (!isSquareTaken(boardIndex) === true){
            board.updateBoard(boardIndex, activePlayer.mark)
            return true;
        }
        else {
            return false;
        }
    }

    const playRound = () => {
        while (!gameIsOver) {
            // get User mark
            if (!playerMarkOnBoard(playerChoice) === true) {
                continue;
            }
            else {
                playerMarkOnBoard(playerChoice);
                domControll.displayArrayToDom();
                checkTies();
                checkWinner();
                changeTurn();
            }

        }
    }

    const checkTies = () => {
        const currentBoard = board.getBoard();
        let countEmptySqure = 0;
        for (const index of currentBoard){
            if (index === ''){    
                countEmptySqure++;
            }
        }
        if (countEmptySqure <= 0) {
            return true;
        }
        else {
            return false;
        }
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

            if (player1Score === scoreToBeWinner || player2Score === scoreToBeWinner) {
                gameIsOver = true;
                declareWinner(activePlayer.name);
            }
        }
    };

    const declareWinner = (winner) => {
        console.log(`The winner is ${winner}`);
    };

    const changeTurn = () => {
        activePlayer = activePlayer !== player1 ? player1 : player2; 
        
    };

    const isSquareTaken = (index) => {
        if (board.getBoard()[index] === "") {
            return false;
        }
        else {
            return true;
        }
    }

    return {playRound};
})();

