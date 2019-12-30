let isPLayer1Turn = true
let player1Name = 'Bob'
let player2Name = 'Ken'
let player1Color = 'rgba(255,0,0,1)'
let player2Color = 'rgba(0,255,0,1)'
let player1Token = 'X'
let player2Token = 'O'
let gameBoardArray = []
let gameInProgress = true
let allConfetti = []
let confettiColors = [
    'rgba(28, 141, 255, 1)',
    'rgba(34, 204, 28, 1)',
    'rgba(215, 38, 61, 1)',
    'rgba(95, 45, 142, 1)',
    'rgba(242, 193, 78, 1)']

let fadeFallTimeOut
let onboardPlayer = 1

function addClass(event)
{
    this.classList.add(event.currentTarget.newClass)
}

function removeClass(event)
{
    this.classList.remove(event.currentTarget.newClass)
}

const checkForWin = () =>
{
    if (checkBoard(player1Token))
    {
        document.querySelector('.status').innerHTML = `${player1Name} wins!!!`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.resetButton').style.display = "block"
        gameInProgress = false
        explodeConfetti()
    }
    else if (checkBoard(player2Token))
    {
        document.querySelector('.status').innerHTML = `${player2Name} wins!!!`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.resetButton').style.display = "block"
        gameInProgress = false
        explodeConfetti()
    }
}

//   Game Board
//
//     0|1|2
//     3|4|5
//     6|7|8

const checkBoard = playerToken =>
{
    let gba = gameBoardArray
    let pt = playerToken

    if (gba[0].innerHTML == pt && gba[1].innerHTML == pt && gba[2].innerHTML == pt) //1
    {
        return true
    }
    else if (gba[3].innerHTML == pt && gba[4].innerHTML == pt && gba[5].innerHTML == pt) //2
    {
        return true
    }
    else if (gba[6].innerHTML == pt && gba[7].innerHTML == pt && gba[8].innerHTML == pt) //3
    {
        return true
    }
    else if (gba[0].innerHTML == pt && gba[3].innerHTML == pt && gba[6].innerHTML == pt) //4
    {
        return true
    }
    else if (gba[1].innerHTML == pt && gba[4].innerHTML == pt && gba[7].innerHTML == pt) //5
    {
        return true
    }
    else if (gba[2].innerHTML == pt && gba[5].innerHTML == pt && gba[8].innerHTML == pt) //6
    {
        return true
    }
    else if (gba[0].innerHTML == pt && gba[4].innerHTML == pt && gba[8].innerHTML == pt) //6
    {
        return true
    }
    else if (gba[6].innerHTML == pt && gba[4].innerHTML == pt && gba[2].innerHTML == pt) //7
    {
        return true
    }
    else if (gba[0] == pt && gba[1] == pt && gba[2] == pt) //8
    {
        return true
    }
    else
    {
        return false
    }
}

function squareClicked() // avoid arrow function to make use of the this property
{
    if (this.innerHTML == '' && gameInProgress)
    {
        if (isPLayer1Turn)
        {
            this.innerHTML = player1Token
            isPLayer1Turn = false
            document.querySelector('.status').innerHTML = `${player2Name}'s turn`
            document.querySelector('.status').style.backgroundColor = player2Color
        }
        else
        {
            this.innerHTML = player2Token
            isPLayer1Turn = true
            document.querySelector('.status').innerHTML = `${player1Name}'s turn`
            document.querySelector('.status').style.backgroundColor = player1Color
        }

        checkForWin()
    }
}

const resetBoard = () =>
{
    gameBoardArray.forEach(square =>
    {
        square.innerHTML = ""
    })
    gameInProgress = true
    document.querySelector('.status').innerHTML = `${player1Name}'s turn`
    document.querySelector('.status').style.backgroundColor = player1Color
    isPLayer1Turn = true
    document.querySelector('.resetButton').style.display = "none"
    resetConfetti()
}

const prepareConfetti = () =>
{
    let amountOfConfetti = 60
    for (let i = 0; i < amountOfConfetti; i++)
    {
        let newConfetti = document.createElement('div')
        newConfetti.classList.add('confetti')
        allConfetti.push(newConfetti)
        document.body.append(newConfetti)
    }
}

// from stack overflow: https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element

function getOffset(el)
{
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

const explodeConfetti = () =>
{
    resetConfetti()
    let radius = 200
    allConfetti.forEach(confetti =>
    {
        confetti.style.display = 'block'
        confetti.style.left = getOffset(confetti).left + Math.random() * (radius * 2) - radius + "px"
        confetti.style.top = getOffset(confetti).top + Math.random() * (radius * 2) - radius + "px"
        let rotateValue = Math.random() * 360 + 360
        let translateValue = Math.random() * (radius * 2) - radius
        confetti.style.transform = ' translate3d(0,0,' + translateValue + 'px)' + ' rotate3d(1, 1, 1, ' + rotateValue + 'deg)'
        confetti.style.backgroundColor = confettiColors[Math.round(Math.random() * (confettiColors.length - 1))]
    })
    fadeFallTimeOut = setTimeout(fallAndFadeConfetti, 200)
}

const fallAndFadeConfetti = () =>
{
    allConfetti.forEach(confetti =>
    {
        confetti.style.transition = "3s"
        confetti.style.transitionTimingFunction = "ease-in"
        confetti.style.top = getOffset(confetti).top + Math.random() * 1000 + 1000 + "px"
        confetti.style.opacity = "0%"
        let rotateValue = Math.random() * 360 + 360
        confetti.style.transform = 'rotate3d(1, 1, 1, ' + rotateValue + 'deg)'
    })
}

const resetConfetti = () =>
{
    clearTimeout(fadeFallTimeOut)
    allConfetti.forEach(confetti =>
    {
        confetti.style.transition = '0.2s'
        confetti.style.display = 'none'
        confetti.style.left = (getOffset(gameBoardArray[4]).left + 50) + "px"
        confetti.style.top = (getOffset(gameBoardArray[4]).top + 50) + "px"
        confetti.style.opacity = "100%"
        confetti.style.transform = 'rotate3d(0)'
        confetti.style.transitionTimingFunction = "ease-out"
        confetti.style.backgroundColor = 'black'
    })
}

const keyDown = event =>
{
    if (event.key == 'x')
    {
        explodeConfetti()
        setTimeout(resetConfetti, 5000)
    }
}

function selectOption()
{
    for (let i = 0; i < this.parentElement.children.length; i++)
    {
        this.parentElement.children[i].classList.remove('selected-option')
    }
    this.classList.add('selected-option')

}

const makePlayerAI = () =>
{

}

const changeOnboardingForPlayerTwo = () =>
{
    let labels = document.querySelectorAll('.onboard-label')
    console.log("labels.length:" + labels.length)
    labels[0].innerHTML = 'Type a name for Player 2'
    labels[1].innerHTML = 'Choose a color for Player 2'
    labels[2].innerHTML = 'Choose a symbol for Player 2'
    labels[3].innerHTML = 'Player 2 is human!'
    let aiSection = document.querySelector('.aiSection')
    aiSection.style.display = "none"
    onboardPlayer = 2

}

const beginGame = () =>
{
    document.querySelector('.main').style.display = "flex"
    document.querySelector('.onboarding-parent').style.display = "none"
    resetBoard()
}

const createNewStyles = (nameOfNewClass, backgroundColor, selectionBorder) => {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.${nameOfNewClass} { background-color: ${backgroundColor}; }\n
                        .${nameOfNewClass}Selection { outline-offset: 5px;
                        outline: 5px dashed ${backgroundColor}; }`
    document.getElementsByTagName('head')[0].appendChild(style);
}


const acceptChoices = () =>
{
    let selectedOptions = document.querySelectorAll('.selected-option')

    if (selectedOptions.length == 3 && onboardPlayer == 1)
    {
        player1Name = document.querySelector('#playerName').value
        document.querySelector('#playerName').value = ""
        player1Color = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('background-color');
        player1Token = selectedOptions[1].innerHTML
        if (selectedOptions[2].innerHTML == "Human")
        {
            console.log(player1Name + " " + player1Color + " " + player1Token + " Human")
            selectedOptions.forEach(option =>
            {
                option.classList.remove('selected-option')
            })
            changeOnboardingForPlayerTwo()
        }
        else
        {
            onboardPlayer = 3
            console.log(player1Name + " " + player1Color + " " + player1Token + " AI")
            selectedOptions.forEach(option =>
            {
                option.classList.remove('selected-option')
            })
            makePlayerAI()
        }

    }
    else if (selectedOptions.length == 2 && onboardPlayer == 2)
    {
        player2Name = document.querySelector('#playerName').value
        document.querySelector('#playerName').value = ""
        player2Color = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('background-color');
        player2Token = selectedOptions[1].innerHTML
        console.log(player2Name + " " + player2Color + " " + player2Token + " Human")
        beginGame()
    }
}

const randomOptions = () =>
{
    createNewStyles()
}



const playerOnboarding = () =>
{
    document.querySelector('.main').style.display = "none"

    randomOptions()

    let options = document.querySelectorAll('.onboarding-option')
    options.forEach(option =>
    {
        option.addEventListener('click', selectOption)
    })
    let acceptButton = document.querySelector('.onboard-accept')
    acceptButton.addEventListener('click', acceptChoices)
}

const buildBoard = () =>
{
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('main')
    document.body.append(mainDiv)

    let statusDiv = document.createElement('div')
    statusDiv.classList.add('status')
    mainDiv.append(statusDiv)
    statusDiv.innerHTML = "PlayerOne's turn"

    let resetButtonDiv = document.createElement('div')
    resetButtonDiv.classList.add('resetDiv')

    let resetButton = document.createElement('button')
    resetButton.innerHTML = "Reset"
    resetButton.style.display = "none"
    resetButton.classList.add('resetButton')
    resetButton.addEventListener('click', resetBoard)

    resetButtonDiv.append(resetButton)
    mainDiv.append(resetButtonDiv)

    let boardDiv = document.createElement('div')
    boardDiv.classList.add('board')
    mainDiv.append(boardDiv)

    for (let i = 0; i < 9; i++)
    {
        let squareDiv = document.createElement('div')
        squareDiv.classList.add('square')
        squareDiv.id = i
        gameBoardArray.push(squareDiv)
        squareDiv.newClass = "grey"
        squareDiv.addEventListener('mouseover', addClass)
        squareDiv.addEventListener('mouseout', removeClass)
        squareDiv.addEventListener('click', squareClicked)
        boardDiv.append(squareDiv)
    }



    prepareConfetti()
    resetConfetti()
    document.addEventListener('keyup', keyDown)
    playerOnboarding()
}

buildBoard()