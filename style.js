const WinnningCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const GameBoard = (() => { //gameboard shown before, during, and after player chooses move
  let gameboard = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  const GetGameboard  = () => gameboard;

  function CheckCombinations(user_combinations){
    for(const combo of WinnningCombo){
      for(let i=0; i<combo.length;i++){
        if(user_combinations.includes(combo[i])){
          if(i == 2){
            return true;
          }
        }
        else {
          break;
        }
      }
  }
  return false;
}

  function GameEnd(){ //TUPLE USED FOR IF GAME ENDS AND WHO WON
    let combinations = [];
    for(let i = 0; i < gameboard.length; i++){ 
      if(gameboard[i] == "O"){ //check for O's
        combinations.push(i)
      }
    }

    if(CheckCombinations(combinations)){
      return [true, 'O']; //if o wins alert for tuple
    }
    
    combinations = []
    for(let i=0; i < gameboard.length;i++){ 
      if(gameboard[i] == "X"){ //check for O's
        combinations.push(i);
      }
    }

    if(CheckCombinations(combinations)){
      return [true, 'X']; //if X wins alert in a tuple
    }

    let counter = 0;
    for(const square of gameboard){ 
      if(square == -1){ //check for O's
        counter++; 
      }
    }
    if(counter == 0) {
      return [true, 'T']; 
    }

    return [false, -1];
  }

  function NewGameBoard(board) { //creates a new gameboard     everytime creates the innner html object
    for(i=0; i<gameboard.length;i++){ //two steps: add class list disabled and make listeners for each button
      board.innerHTML += `
        <button class="space" data-space="${i}" data-value="-1">space${i}</button> 
      `;
    }

    let buttonMove = document.querySelector('.board-div');
    //adding event listners to multiple elements 
    //1. simple
    /*buttonMove.forEach((move) => {
      move.addEventListener('click', PlayerController.PlayerMove(buttonMove, GameBoard.GetGameboard));
    });
    */
    //2. as function
    /*buttonMove.addEventListener('click', () => {
      PlayerController.PlayerMove(buttonMove, GameBoard.GetGameboard());
    });
    */
    //3. event delegation
    buttonMove.addEventListener('click', (e) => {
      if(e.target.classList.contains('space')) {
        PlayerController.PlayerMove(e.target, GameBoard.GetGameboard());
      }
    });
    return board;
  }

  return {GetGameboard, NewGameBoard, GameEnd};
  
})();

const PlayerController = (() => { //what each player chooses 
  
  function PlayerMove(buttonMove, gameboard, player_1, player_2) {

    if(GameFlow.GetPlayerTurn() == 1){
      let move = buttonMove.dataset.value = "X";
      buttonMove.innerHTML = `${move}`;
      gameboard.splice(buttonMove.dataset.space, 1, move);
      buttonMove.setAttribute('disabled', true);
      buttonMove.classList.add('noHover');
      GameFlow.DialogPopup()
      GameFlow.SwitchPlayer();
    }
    else {
      let move = buttonMove.dataset.value = "O";
      buttonMove.innerHTML = `${move}`;
      gameboard.splice(buttonMove.dataset.space, 1, move);
      buttonMove.setAttribute('disabled', true);
      buttonMove.classList.add('noHover');
      GameFlow.DialogPopup();
      GameFlow.SwitchPlayer();
    }
    
    let gameEnded = GameBoard.GameEnd().at(0);
    let whoWon = GameBoard.GameEnd().at(1);
    if(gameEnded) {
      switch(whoWon) {
        case "O":
          console.log("player 1 won");
          break;
        case "X":
          console.log("player 2 won");
          break;
        case "T":
          console.log("nobody won");
          break;
      }
    }

    console.log(GameBoard.GetGameboard());

    return;
  }

  return {PlayerMove};

})();

const GameFlow = (() => { //what moderates our game

  let playerTurn = 1;
  let popupDiv = document.createElement('H1');
  let user_1;
  let user_2;

  const GetPlayerTurn  = () => playerTurn;

  function StartGame(player_1, player_2){
    startForm.remove();
    user_1 = player_1;
    user_2 = player_2;

    let board = document.createElement("div");
    board.classList.add('board-div');
    document.body.append(board);
    board = GameBoard.NewGameBoard(board);
    DialogPopup();
    SwitchPlayer();
  }

  async function DialogPopup(){ 
    switch(playerTurn){
          case 1:
            popupDiv.innerHTML = `
              ${user_1}'s turn 
            `;
            //playerTurn = 2; instead handle inside a WaitForPlayer
            break;
          case 2: 
            popupDiv.innerHTML = `
              ${user_2}'s turn
            `;
            //playerTurn = 1;
            break;
        };
        dialogPopup.append(popupDiv);
        dialogPopup.showModal();

        await WaitForPopup(dialogPopup);
  }

  function WaitForPopup(dialog, delay = 800){
    return new Promise ((resolve) => {
      setTimeout(() => {
        dialog.close();
        resolve();
      }, delay)
    });
  }

  function SwitchPlayer() {
    if(playerTurn == 1){
      playerTurn = 2;
      return;
    }
    else {
      playerTurn = 1;
      return;
    }
  }

  return {GetPlayerTurn, StartGame, DialogPopup, SwitchPlayer};

})();

const startForm = document.querySelector("form");
document.body.appendChild(startForm); //form needs to be associated to the browsing context
const dialogPopup = document.querySelector("#turn-popup");

//beginning the funtionality of tic tac toe
startForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;
  console.log(player1, player2);
  startForm.remove();
  
  GameFlow.StartGame(player1, player2);
});

//in tic-tac-toe we will have 9 item array with null spots of -1. GameBoard is global inside an iife as other globals are, the only other one we'd
//need is the playerController im assuming player one plays after the other on same input!

//retired methods: 

/* 
while(!GameBoard.GameEnd().at(0)){ //begin game loop
        switch(playerTurn){
          case 1:
            popupDiv.innerHTML = `
              ${player_1}'s turn 
            `;
            //playerTurn = 2; instead handle inside a WaitForPlayer
            break;
          case 2: 
            popupDiv.innerHTML = `
              ${player_2}'s turn
            `;
            //playerTurn = 1;
            break;
        };
        dialogPopup.append(popupDiv);
        dialogPopup.show();

        await WaitForPopup(popupDiv.parentElement);
        //put in await for popup
        //here we would need to wait for user to click a square
        return;
    }
*/