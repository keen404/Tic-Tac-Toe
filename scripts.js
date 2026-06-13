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
    let gameIsStart = false;
    
    const winPattern = [[0,1,2],[3,4,5],[6,7,8], //แนวนอน
        [0,3,6], [1,4,7], [6,7,8], //แนวตั้ง
        [0,4,8], [6,4,2] //แนวทะแยง    
    ]

    const logicToBindButton = (index) => {
        if (!isSquareTaken(index) && gameIsOver === false && gameIsStart  !== false) {
            playerMarkOnBoard(index);
            checkTies();
            checkWinner();
            changeTurn();
        }
    }
 
    const playerMarkOnBoard = (boardIndex) => {
            board.updateBoard(boardIndex, activePlayer.mark);
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
        const currentBoard = board.getBoard();
        for (const pattern of winPattern) {
            if (gameIsOver) {
                break;
            }
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

    const getGameState = () => {
        return gameIsOver;
    }

    const restart = () => {
        activePlayer = player1;
        board.resetBoard();
        gameIsOver = false;
    }

    const start = () => {
        gameIsStart = true;
    }

    const chagePlayerName = (player , newName) => {
        if (player === 'player1') {
            player1.name = newName;
        }
        else if (player === 'player2')
        {
            player2.name = newName;
        }
    }


    return {playerMarkOnBoard,
        checkTies,checkWinner,
        getActivePlayer,
        declareWinner,
        changeTurn,
        logicToBindButton,
        getGameState,
        restart,
        start,
        chagePlayerName};
})();

const domControl = (function () { // UI interactive and Display Only
    const boardInstance = gameBoard;
    const gameControl = gameController;
    const squaresArr = document.querySelectorAll(".square");
    let elementIdDisplayName = "";
    let player = ""


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

    const bindGameBoardEvent = () => {
        const gameBoard = document.querySelector(".gameBoard");
        const board = boardInstance.getBoard();

        gameBoard.addEventListener('click', (event) => {
            let target = event.target;
            if (target.getAttribute("class") === "square"){
                gameControl.logicToBindButton(target.getAttribute("data-index"));
                displayArrayToDom();
            }
        })
    }

    const bindResetEventBtn = () => {
        const btns = document.querySelector("#btns");

        btns.addEventListener('click', (event) => {
            let target = event.target;
            switch(target.id){
                case 'start-btn':
                    gameControl.start();
                    break;

                case 'restart-btn':
                    gameControl.restart();
                    displayArrayToDom();
                    break;
            }
        })
    }


    const changeName = () => {
        const changeNameBtn = document.querySelector("#change-btn");
        const newName = document.querySelector("#name");
        
        const dialog = document.querySelector("#playerName");


        //
        changeNameBtn.addEventListener('click', function (event) {
            const displayElement = document.querySelector(`#${elementIdDisplayName}`);
            event.preventDefault();
            displayElement.textContent = newName.value;
            gameControl.chagePlayerName(player, newName.value);
            dialog.close();
        });
    }

    const openChangeNameDialog = () => {
        const btns = document.querySelector("#display-player");
        const dialog = document.querySelector("#playerName");
        btns.addEventListener('click', (event) => {
            let target = event.target;
            switch(target.id) { 
                case 'btn-name1':
                    changeName();
                    elementIdDisplayName = "display-name1";
                    player = "player1"
                    break;
                case 'btn-name2':
                    changeName();
                    elementIdDisplayName = "display-name2";
                    player = "player2"
                    break;
            }
        }) 
    }

    addCustomAttributesToBoard();
    bindGameBoardEvent();
    bindResetEventBtn();
    openChangeNameDialog();
    return {};
})(); 