/*JavaScript for Fifteen Puzzle
Extra Feature: End-of_Game Notification 
Extra Feature: Move Count/ Time Elapsed
Extra Feature: Multiple Backgrounds
Extra Feature: Music
*/

//globally declared variables
let gamePiece;
let notify;
let timer;
let spaceY;
let spaceX;
let backgroundurls = []
backgroundurls.push("url(https://monkeyshinegames.com/wp-content/uploads/2018/11/400px-logo-pop.png)");
backgroundurls.push("url(https://vignette.wikia.nocookie.net/winniethepooh/images/3/3d/Wheel-peace-sign-3-400px.png/revision/latest?cb=20130509210107)");
backgroundurls.push("url(https://kabusiki-okuribito.com/wp-content/uploads/2019/02/icon_400px.png)");
backgroundurls.push("url(https://openlab.citytech.cuny.edu/sli-eportfolio/files/2015/05/Apr-30-color-composition-400-by-4001.gif)");
let bgindex = Math.floor(Math.random()*4);
let startTime 
let endTime;
let timediff;
let move;

function start() {
  let puzzleArea = document.getElementById("puzzlearea");
  gamePiece = puzzleArea.getElementsByTagName("div"); //retrieve element within puzzlearea

  for (
    let i = 0;
    i < gamePiece.length;
    i++ //applies features to each puzzle piece
  ) {
    gamePiece[i].className = "puzzlepiece"; //setting up the puzzle piece code

    gamePiece[i].style.left = (i % 4) * 100 + "px"; //calculates the position for puzzle pieces from the left of the screen

    gamePiece[i].style.top = parseInt(i / 4) * 100 + "px"; //calculates the position for puzzle pieces from the top of the screen

    gamePiece[i].style.backgroundImage = backgroundurls[bgindex];

    gamePiece[i].style.backgroundPosition =
      "-" + gamePiece[i].style.left + " " + "-" + gamePiece[i].style.top;
    //calculates the position of the background picture so in moves in relation to the puzzle pieces

    gamePiece[i].onmouseover =
      function () //aplies features when mouse moves over puzzle pieces

      {
        if (checkMove(parseInt(this.innerHTML))) {
          //checks whenever a move is made

          this.style.border = "3px solid red"; //changes to red when a puzzle piece is near an empty space

          this.style.color = "#006600"; //text color changes to green when a puzzle piece is near an empty space

          this.style.textDecoration = "underline"; //underlines the number of the puzzle piece piece

        }
      };

    gamePiece[i].onmouseout =
      function () //activates whenever mouse moves out of puzzle piece

      {
        this.style.border = "2px solid black"; //reverts to its original size border

        this.style.color = "#000000"; //reverts to original text color

        this.style.textDecoration = "none"; //reverts to original text state
      };

    gamePiece[i].onclick =
      function () //activates when mouse clicks on a puzzle piece

      {
        if (checkMove(parseInt(this.innerHTML))) {
          //checks whether or not the puzzle piece can move into an empty space

          swap(this.innerHTML - 1); //moves into an empty space if true

          if (finish()) {
            //checks when the all the 15 pieces are in its right space

            win(); //alerts the player that they have won the game
          }

          return;
        }
      };
  }

  let shuffle = document.getElementById("shufflebutton"); //initializes the shuffle button

  spaceX = "300px";
  spaceY = "300px";

  shuffle.onclick =
    function () //activates whenever the shuffle button is clicked

    {
      starttimer();
      
      for (let i = 0; i < 300; i++) {
        let rand = parseInt(Math.random() * 100) % 4; //generates a random number for shuffling each piece

        if (rand == 0) {
          let temp = up(spaceX, spaceY);

          if (temp != -1) {
            swap(temp);
          }
        }

        if (rand == 1) {
          let temp = down(spaceX, spaceY);

          if (temp != -1) {
            swap(temp);
          }
        }

        if (rand == 2) {
          let temp = left(spaceX, spaceY);

          if (temp != -1) {
            swap(temp);
          }
        }

        if (rand == 3) {
          let temp = right(spaceX, spaceY);

          if (temp != -1) {
            swap(temp);
          }
        }
      }
      move = 0;
    };
};

function checkMove(position) {
  // returns true whenever a piece can be moved into an empty space

  if (left(spaceX, spaceY) == position - 1) {
    return true;
  }

  if (down(spaceX, spaceY) == position - 1) {
    return true;
  }

  if (up(spaceX, spaceY) == position - 1) {
    return true;
  }

  if (right(spaceX, spaceY) == position - 1) {
    return true;
  }
}

function Notify() {
  //notifies the user

  notify--; //decrements the value of

  if (notify == 0) {
    //if the value reaches the end then

    let body = document.getElementsByTagName("body"); //retrieves body element in html

    body[0].style.backgroundImage = "none"; //reverts to original page background

    alert("Winner! ... Shuffle and Play Again \n" + "Moves: " + move + "\nTime: "+ Math.floor(timediff/60) + ":" + (timediff%60)); //tells the user that they have won the game

    let para = document.getElementsByClassName("explanation");
    para[0].style.visibility = "visible"; //reverts visiblity to its original state

    return;
  } else notify % 2;

  {
    let body = document.getElementsByTagName("body");

    body[0].style.backgroundImage =
      "url('https://th.bing.com/th/id/OIP.8_74zmoQ-DQjaUAmlKapowHaEK?pid=ImgDet&rs=1')";
    //sets background pic to show user that they had completed the puzzle
  }

  timer = setTimeout(Notify, 200); //notifies the user for 2 secs
}

function win() {
  //notifies user that they have won

  endtimer();
  console.log(move);

  let body = document.getElementsByTagName("body");

  body[0].style.backgroundImage =
    "url('https://th.bing.com/th/id/OIP.8_74zmoQ-DQjaUAmlKapowHaEK?pid=ImgDet&rs=1')";

  notify = 10; //initializes notify variable

  timer = setTimeout(Notify, 200);

  let para = document.getElementsByClassName("explanation");
  para[0].style.visibility = "hidden"; //hides text when user is being notified
}

function finish() {
  //checks when the game reaches its end

  let flag = true;

  for (
    let i = 0;
    i < gamePiece.length;
    i++ //for each puzzle piece
  ) {
    let top = parseInt(gamePiece[i].style.top);

    let left = parseInt(gamePiece[i].style.left);

    if (left != (i % 4) * 100 || top != parseInt(i / 4) * 100) {
      //checks if each piece matches its left and top position

      flag = false;

      break;
    }
  }

  return flag;
}

function left(x, y) {
  //calculates how far to the left a puzzlepiece should position

  let cordX = parseInt(x);

  let cordY = parseInt(y);

  if (cordX > 0) {
    for (let i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.left) + 100 == cordX &&
        parseInt(gamePiece[i].style.top) == cordY
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

function right(x, y) {
  //calculates how far to the right a puzzlepiece should position
  let cordX = parseInt(x);

  let cordY = parseInt(y);

  if (cordX < 300) {
    for (let i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.left) - 100 == cordX &&
        parseInt(gamePiece[i].style.top) == cordY
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

function up(x, y) {
  //calculates how far up a puzzlepiece should position
  let cordX = parseInt(x);

  let cordY = parseInt(y);

  if (cordY > 0) {
    for (let i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.top) + 100 == cordY &&
        parseInt(gamePiece[i].style.left) == cordX
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

function down(x, y) {
  //calculates how far down a puzzlepiece should position

  let cordX = parseInt(x);

  let cordY = parseInt(y);

  if (cordY < 300) {
    for (let i = 0; i < gamePiece.length; i++) {
      if (
        parseInt(gamePiece[i].style.top) - 100 == cordY &&
        parseInt(gamePiece[i].style.left) == cordX
      ) {
        return i;
      }
    }
  } else {
    return -1;
  }
}

function swap(position) {
  //moves the puzzle piece by switching position with an empty space
  move = move + 1;

  console.log(move);

  let temp = gamePiece[position].style.top;

  gamePiece[position].style.top = spaceY;

  spaceY = temp;

  temp = gamePiece[position].style.left;

  gamePiece[position].style.left = spaceX;

  spaceX = temp;
}

function imageselected(){
  var select = document.getElementById("Bg");
  bgindex = select.selectedIndex;
  start();
}

function starttimer() {
  startTime = new Date();
  console.log("timerstart");
};

function endtimer() {
 
  endTime = new Date();
  console.log("timerend");
  timediff = endTime - startTime; //in ms
  // strip the ms
  timediff = timediff/1000;

  // get seconds 
  timediff = Math.round(timediff);

  console.log(timediff + " seconds");
}

