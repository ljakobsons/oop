let threshold = 3

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let targetLetter = "S"

let score = 0;
let lives = 3;

let message = document.getElementById('message')


function generateGrid() {
    let grid = document.getElementById('gameGrid')

    for (let i = 0; i < 4 * 4; i++) {
        let tile = document.createElement("div")
        tile.classList.add("tile")
        grid.append(tile)
    }

    return;
}

function genRandLetter() {
    let letter = null

    while (letter == null | letter == targetLetter) {
        letter = alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    return letter
}

function generateLetters() {
    let tiles = document.getElementsByClassName("tile")

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML = genRandLetter()
    }

    for (let j = 0; j < threshold; j++) {
        let availableTiles = Array.from(tiles).filter(tile => tile.innerHTML != targetLetter)

        if (availableTiles.length === 0) break; // Exit if no available tiles

        let tile = availableTiles[Math.floor(Math.random() * availableTiles.length)]
        tile.innerHTML = targetLetter
    }

    return tiles
}

function deductLife() {
    lives--
    let lifeIndicator = document.getElementById('lives')
    lifeIndicator.innerHTML = ""
    for (let i = 0; i < lives; i++) {
        lifeIndicator.innerHTML += "❤️"
    }
}

async function gameSequence() {
    let tiles = generateLetters()

    let correctCount = 0

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener("mousedown", () => {
            if (tiles[i].innerHTML == targetLetter) {
                tiles[i].classList.add("correct")
                correctCount++
                if (correctCount == threshold) {
                    score++
                    let scoreIndicator = document.getElementById('score')
                    scoreIndicator.innerHTML = score
                    return;
                }
            } else if (tiles[i].innerHTML != targetLetter) {
                tiles[i].classList.add("incorrect")
                deductLife()
                if (lives == 0) {
                    return;
                }
            }
        });
    }

    let targetIndicator = document.getElementById('target')
    targetIndicator.innerHTML = targetLetter
}

document.addEventListener("DOMContentLoaded", () => {
    generateGrid()

    gameSequence();

    while (lives > 0) {
        gameSequence();
    }

    grid.styles.display = "none"
    message.innerHTML = "Game Over!"
    return;
})