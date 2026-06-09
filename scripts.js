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



const gameController = (function() { // Controll Logic Only
    const board = gameBoard;
    const player1 = player("Player1", "X");
    const player2 = player("Player2", "O");
    const scoreToBeWinner = 3; // 3 Square in a row
    let activePlayer = player1;
    let gameIsOver = false;
    
    const winPattern = [[0,1,2],[3,4,5],[6,7,8], //แนวนอน
        [0,3,6], [1,4,7], [6,7,8], //แนวตั้ง
        [0,4,8], [6,4,2] //แนวทะแยง    
    ]

    const logicToBindButton = (index) => {
        if (playerMarkOnBoard(index) !== false) {
            checkTies();
            checkWinner();
            changeTurn();
        }
    }
 
    const playerMarkOnBoard = (boardIndex) => {
        if (isSquareTaken(boardIndex) === true){
            return false;
        }
        else {
            board.updateBoard(boardIndex, activePlayer.mark);
            return boardIndex;
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
                return true;
            }
            else {
                return false;
            }
        }
    };

    const getActivePlayer = () => {
        if (activePlayer === undefined) {
            return null
        }
        return activePlayer;
    }

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

    return {playerMarkOnBoard, checkTies,checkWinner,getActivePlayer, declareWinner, changeTurn,logicToBindButton};
})();

const domControl = (function () { // UI interactive and Display Only
    const boardInstance = gameBoard;
    const gameControl = gameController;
    const squaresArr = document.querySelectorAll(".square");

    const displayArrayToDom = () => {
        const currentBoard = boardInstance.getBoard();
        squaresArr.forEach((node, index) => {
            node.textContent = currentBoard[index];
        })
    }

    const addCustomAttributesToBoard = () => {
        const squares = document.querySelectorAll(".square");
        let index = 0;
        for (const square of squares) {
            square.setAttribute("data-index", index);
            index++;
        }
    }

     const bindEvent = () => {
        const gameBoard = document.querySelector(".gameBoard");
        const board = boardInstance.getBoard();

        gameBoard.addEventListener('click', (event) => {
            console.log(event.target);
            let target = event.target;
            let square = target.getAttribute("class")
            if (target.getAttribute("class") === "square"){
                if(gameControl.checkWinner() === false) {
                    displayArrayToDom();
                    gameControl.logicToBindButton(target.getAttribute("data-index"));
                    displayArrayToDom();
                }
            }
        })
    }


    addCustomAttributesToBoard();
    bindEvent();
    return {};
})(); 