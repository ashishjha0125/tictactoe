const box=document.querySelectorAll('.box');
const reset=document.querySelector('.reset');
const msg=document.querySelector('.msg');
const msgcontainer=document.querySelector('.msg-container'); 
const winnerPatterns=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



   
//handle player turns
// Initialize the current player
// X starts first, then O, and it alternates
// Add click event listeners to each box
// When a box is clicked, it should display the current player's symbol

let currentPlayer = 'X';
for (let b of box) {
    b.addEventListener('click', function () {
        if (currentPlayer == 'X') {
            b.style.color = 'black';
            b.innerHTML = 'X';
            currentPlayer = 'O';
            
        } else if (currentPlayer === 'O') {
            b.style.color = 'red';
            b.innerHTML = 'O';
            currentPlayer = 'X';
        }
         b.style.pointerEvents = "none"; // it disables the boxes after clicking
         checkWinner()
    });
    
}

// Reset the game
// When the reset button is clicked, it should clear all boxes and reset the current player to 'X'
// Also, it should enable the boxes again for new clicks
reset.addEventListener('click',()=>{
   for(let b of box){
        b.innerHTML = '';
        b.style.color = 'black';
         b.style.pointerEvents = "auto"; // it enables the boxes again
        b.style.backgroundColor = "#edd382"; // Reset background color
   }

    reset.innerHTML='Reset Game';
          msgcontainer.classList.add("hide");
          msg.innerHTML = '';
 

});


//show winner
const winner=(winner)=>{
 
  msgcontainer.classList.remove("hide");
  msg.innerHTML=` 🎉 ${winner} is the winner`;
 reset.innerHTML='Play Again';
  for(let b of box){
        b.style.pointerEvents = "none"; // it disables the boxes after winner is declared
  }
 triggerDropEffect();
}


// Check for a winner
function checkWinner(){

   for(let pattern of winnerPatterns){
        let pattern0=box[pattern[0]].innerHTML;
        let pattern1=box[pattern[1]].innerHTML;
        let pattern2=box[pattern[2]].innerHTML;
    if(  pattern0!="" && pattern1!="" && pattern2!=""){
      if( pattern0==pattern1 && pattern1==pattern2 && pattern0==pattern2){
           box[pattern[0]].style.backgroundColor = "#e7e7e7";
            box[pattern[1]].style.backgroundColor = "#e7e7e7";
            box[pattern[2]].style.backgroundColor = "#e7e7e7";
       winner(pattern0);
       return;
       
      }
    }

    }
    let draw=true;
    for(let b of box){
      if(b.innerHTML===""){
        draw=false;
        break;  
    }
    

}
if(draw==true){
      msgcontainer.classList.remove("hide");
  msg.innerHTML=` 😐 It's a draw!`;
 reset.innerHTML='Play Again';
 for(let b of box){
        b.style.pointerEvents = "none"; // it disables the boxes after winner is declared
  }
    }
   
  }


function triggerDropEffect() {
  const container = document.getElementById("drop-container");
  container.innerHTML = ""; // Clear any previous emojis

  const emojis = ["🎉", "✨", "🎊", "🥳", "🔥"];
  for (let i = 0; i < 30; i++) {
    const drop = document.createElement("div");
    drop.classList.add("drop");
    drop.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDuration = `${1 + Math.random() * 2}s`;
    container.appendChild(drop);
  }

  // Optional: Remove all drops after animation ends
  setTimeout(() => {
    container.innerHTML = "";
  }, 3000);
}
