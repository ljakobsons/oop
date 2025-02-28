let threshold = 3

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let targetLetter = "S"

function generateGrid() {
    let grid = document.getElementById('gameGrid')

    for (let i = 0; i < 4 * 4; i++) {
        let tile = document.createElement("div")
        tile.classList.add("tile")
        grid.append(tile)
    }
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
        let tile = tiles[Math.floor(Math.random() * tiles.length)]

        while (tile.innerHTML == targetLetter) {
            tile = tiles[Math.floor(Math.random() * alphabet.length)]
        }

        tile.innerHTML = targetLetter
    }

    return tiles
}

function gameSequence() {
    let tiles = generateLetters()

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener("mousedown", (e) => {
            if (tiles[i].innerHTML == targetLetter) {
                tiles[i].classList.add("correct")
            } else if (tiles[i].innerHTML != targetLetter) {
                tiles[i].classList.add("incorrect")
            }
        });
    }

    let targetIndicator = document.getElementById('target')
    targetIndicator.innerHTML = targetLetter
}

document.addEventListener("DOMContentLoaded", () => {

    gameSequence(generateGrid())
})