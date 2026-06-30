const GameBoard = (() => { //gameboard shown before, during, and after player chooses move
  let gameboard = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  const GetGameboard  = () => gameboard;

  function ShowGameBoard() {
    console.log(gameboard[0], gameboard[1], gameboard[2]);
    console.log("---------")
    console.log(gameboard[3], gameboard[4], gameboard[5]);
      console.log("---------")
    console.log(gameboard[6], gameboard[7], gameboard[8]);
  }

  return {GetGameboard, ShowGameBoard};
  
})();

const PlayerController = (() => { //what eacg player chooses 
  let playerInput = -1;
  

})();

const GameFlow = (() => { //what moderates our game
  function StartGame(){
    
  }
})();

const userGameboard = GameBoard;
userGameboard.ShowGameBoard();



//in tic-tac-toe we will have 9 item array with null spots of -1. GameBoard is global inside an iife as other globals are, the only other one we'd
//need is the playerController im assuming player one plays after the other on same input!
