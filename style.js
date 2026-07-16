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

  function NewGameBoard(board) { //creates a new gameboard everytime creates the innner html object
    for(i=0; i<gameboard.length;i++){ //two steps: add class list disabled and make listeners for each button
      board.innerHTML += `
        <button class="space" data-space="${i}" data-value="-1">space${i}</button> 
      `;

      const buttonMove = board.querySelectorAll('.space');
      buttonMove.document.addEventListener('click', () => {
        PlayerMove(buttonMove, GameBoard.GetGameboard());
      });
    }
    return board;
  }

  return {GetGameboard, NewGameBoard ,GameEnd};
  
})();

const PlayerController = (() => { //what each player chooses 
  
  function PlayerMove(buttonMove, gameboard) {

    if(GameFlow.GetPlayerTurn == 1){
      buttonMove.classList.add('disabled');
      let move = buttonMove.dataset.value = "X";
      buttonMove.innerHTML = `${move}`;
      gameboard.splice(buttonMove.dataset.space, 1, move);
    }
    else {
      buttonMove.classList.add('disabled');
      let move = buttonMove.dataset.value = "O";
      buttonMove.innerHTML = `${move}`;
      gameboard.splice(buttonMove.dataset.space, 1, move);
    }

    return;
  }

  return {PlayerMove};

})();

const GameFlow = (() => { //what moderates our game
  let playerTurn = 1;

  const GetPlayerTurn  = () => playerTurn;

  function StartGame(player_1, player_2){
    event.preventDefault()
    startForm.remove(); 
    let playerTurn = 1;
    
    let board = document.createElement("div");
    board.classList.add("board-div");
    board = GameBoard.NewGameBoard(board);
    document.body.append(board);

    while(GameBoard.GameEnd()){ //begin game loop
        let popupDiv = document.createElement('H1');
        switch(playerTurn){
          case 1:
            popupDiv.innerHTML = `
              ${player_1}'s turn 
            `;
            turn = 2;
            break;
          case 2: 
            popupDiv.innerHTML = `
              ${player_2}'s turn
            `;
            turn = 1;
            break;
        };
        dialogPopup.append(popupDiv);
        dialogPopup.show();
        
        //put in await for popup

        await PlayerController.WaitForPlayer(); //pass to player

        //here we would need to wait for user to click a square
        return;
    }
  }
  
  return {GetPlayerTurn, StartGame};

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