const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const goodie = document.getElementById("goodie")
const goodiesCollected = document.getElementById("goodies-value")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")
const gameContainer = document.getElementById("game")
const background = document.getElementById("background")
const gameOver = document.getElementById("gameOver")
const startScreen = document.getElementById("startScreen")
const possibleImages = ["bildmarke.png", "ring.png", "halskette.png", "armkette.png", "ohrring.png"]

let gameLoopInterval = 0

const startGame = () => {
  gameOver.style.display = "none";
  background.classList.add("bg-animation")
  rock.classList.add("rock-animation")
  goodie.classList.add("goodie-animation")
  startScreen.style.display = "none"
  resetScore()
  startGameLoop()
}

const resetScore = () => {
  score.innerText = 0
  goodiesCollected.innerText = 0
}

const jump = () => {
  dino.classList.add("jump-animation")
  setTimeout(() => {
    dino.classList.remove("jump-animation")
  }, 500)
}

const dieAnimation = () => {
  dino.classList.add("dino-dies")
  return new Promise(resolve => setTimeout(() => {
    dino.classList.remove("dino-dies")
    resolve()
  }, 500));

}

document.addEventListener('click', (event) => {
  if (!gameLoopInterval) {
    startGame()
  }
  else {
    if (!dino.classList.contains('jump-animation')) {
      jump()
    }
  }

})

const stopGame = async () => {
  await dieAnimation()
  const scoreNumber = Number(score.innerText)
  const highscoreNumber = Number(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber
    gameOver.style.display = "block";
  }
  background.classList.remove("bg-animation")
  rock.classList.remove("rock-animation")
  goodie.classList.remove("goodie-animation")

  startScreen.style.display = "block"
  gameLoopInterval = clearInterval(gameLoopInterval)
}

const randomizeGoodieAnimation = (goodieLeft) => {
  const max = 3;
  const min = 1;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  if (goodieLeft === 550) {
    goodie.style.animationName = "goodie" + random;
  }
};

const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino)
      .getPropertyValue('top'))
    const rockLeft = parseInt(window.getComputedStyle(rock)
      .getPropertyValue('left'))
    const goodieLeft = parseInt(window.getComputedStyle(goodie)
      .getPropertyValue('left'))
    const goodieTop = parseInt(window.getComputedStyle(goodie)
      .getPropertyValue('top'))

    score.innerText = Number(score.innerText) + 1

    randomizeGoodieAnimation(goodieLeft)

    if (rockLeft < 0) {
      rock.style.display = 'none'
    } else {
      rock.style.display = ''
    }
    if (goodieLeft < 0) {
      goodie.style.display = 'none'
    } else {
      goodie.style.display = ''
    }

    if (goodieLeft < 50 && dinoTop < (goodieTop + 50)) {
      goodie.style.display = 'none'
      goodiesCollected.innerText = Number(goodiesCollected.innerText) + 1;
      goodie.style.backgroundImage = 'url("assets/graphics/' + possibleImages[Math.floor(Math.random() * possibleImages.length)] + '")';
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 50) {
      stopGame()
    }
  }, 50)

}
