const WinnningCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const GameBoard = (() => { //gameboard shown before, during, and after player chooses move
  let gameboard = ["X", "X", "X", -1, -1, -1, -1, -1, -1];

  const GetGameboard  = () => gameboard;

  function ShowGameBoard() {
    console.log(gameboard[0], gameboard[1], gameboard[2]);
    console.log("---------")
    console.log(gameboard[3], gameboard[4], gameboard[5]);
      console.log("---------")
    console.log(gameboard[6], gameboard[7], gameboard[8]);
  }

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

  function GameEnd(){
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

  return {GetGameboard, ShowGameBoard, GameEnd};
  
})();

const PlayerController = ((gameBoard) => { //what eacg player chooses 
  let playerInput = -1;

  
  
  
})();

const GameFlow = ((gameboard) => { //what moderates our game
  function Intro(){
    const playGameButton = document.addEventListener();
  }

  function StartGame(){
    while(!gameboard.GameEnd()){
        //take in user inputs

        gameboard.ShowGameBoard();
    }
  }
})();

const userGameboard = GameBoard;
userGameboard.ShowGameBoard();
const i = userGameboard.GameEnd();

console.log(i);


//in tic-tac-toe we will have 9 item array with null spots of -1. GameBoard is global inside an iife as other globals are, the only other one we'd
//need is the playerController im assuming player one plays after the other on same input!
