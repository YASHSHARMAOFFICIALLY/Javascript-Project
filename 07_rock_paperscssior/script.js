document.getElementById("startBtn").onclick = () => {
    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("message").innerText = "Game Started! Choose your move.";
    document.getElementById("startBtn").style.display = "none";
    
};
let playerScore = 0;
let computerScore = 0;
const choices = ["rock", "paper", "scissors"];
function computerChoice(){
    return choices[Math.floor(Math.random()*3)]
}
function playerRound(player){
    const comp = computerChoice();
    document.getElementById("playerPick").innerText = player;
    document.getElementById("computerPick").innerText = comp;

    if (player === comp) {
        return "Draw!";
    }

    if (
        (player === "rock" && comp === "scissors") ||
        (player === "paper" && comp === "rock") ||
        (player === "scissors" && comp === "paper")
    ) {
        playerScore++;
        document.getElementById("playerScore").innerText = playerScore;
        message.textContent = '🎉 You Win!';
        message.style.color = '#4ade80';
        return winr
    } else {
        computerScore++;
        document.getElementById("computerScore").innerText = computerScore;
        return "Computer wins!";
    }
}

document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => {
        const result = playerRound(btn.id);
        document.getElementById("message").innerText = result;
    });
});
