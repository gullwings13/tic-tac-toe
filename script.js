let isPLayer1Turn = true
let player1 = {}
let player2 = {}

const buildPlayers = () =>
{
    player1 = {
        id: 1,
        colorClassName: 'player-1-colors',
        chosenName: 'Player One',
        mainColor: 'rgba(255,0,0,1)',
        altColor: 'rgba(0,0,255,1)',
        token: 'X',
        ai: false,
        aiLevel: 0,
        opponent: player2
    }

    player2 = {
        id: 2,
        colorClassName: 'player-2-colors',
        chosenName: 'Player Two',
        mainColor: 'rgba(255,255,0,1)',
        altColor: 'rgba(0,255,255,1)',
        token: 'O',
        ai: false,
        aiLevel: 0,
        opponent: player1
    }

    player1.opponent = player2
    player2.opponent = player1
}

buildPlayers()

let turns = 0
let gameBoardArray = []
let gameInProgress = true
let allConfetti = []

let fadeFallTimeOut
let onboardPlayer = 1
let colorStartAngle = getRandomNumber(0, 360)

let playerTokens = [
    '<i class="fa fa-leaf"></i>',
    '<i class="fa fa-circle"></i>',
    '<i class="fa fa-heart"></i>',
    '<i class="fa fa-times"></i>',
    '<i class="fa fa-star"></i>',
    '<i class="fab fa-itunes-note"></i>',
    '<i class="fa fa-snowflake-o"></i>',
    '<i class="fa fa-headphones"></i>',
    '<i class="fa fa-camera"></i>',
    '<i class="fa fa-align-justify"></i>',
    '<i class="fa fa-video-camera"></i>',
    '<i class="fa fa-adjust"></i>',
    '<i class="fa fa-circle-o"></i>',
    '<i class="fa fa-question-circle"></i>',
    '<i class="fa fa-arrows"></i>',
    '<i class="fa fa-smile-o"></i>',
    '<i class="fa fa-code"></i>',
    '<i class="fa fa-globe"></i>',
    '<i class="fa fa-bolt"></i>',
    '<i class="fa fa-money"></i>',
    '<i class="fa fa-beer"></i>',
    '<i class="fa fa-gamepad"></i>',
    '<i class="fa fa-frown-o"></i>',
    '<i class="fa fa-diamond"></i>',
    '<i class="fa fa-genderless"></i>',
    '<i class="fa fa-paint-brush"></i>',
    '<i class="fa fa-glass"></i>',
    '<i class="fab fa-angular"></i>',
    '<i class="fab fa-apple"></i>',
    '<i class="fab fa-canadian-maple-leaf"></i>',
    '<i class="fab fa-chrome"></i>',
    '<i class="fab fa-firefox-browser"></i>',
    '<i class="fab fa-internet-explorer"></i>',
    '<i class="fab fa-jedi-order"></i>',
    '<i class="fab fa-empire"></i>',
    '<i class="fab fa-itch-io"></i>',
    '<i class="fab fa-gitlab"></i>',
    '<i class="fab fa-rebel"></i>',
    '<i class="fab fa-xbox"></i>',
    '<i class="fab fa-playstation"></i>'
]

let startIndex = getRandomNumber(0, playerTokens.length - 1)
let colors = []

// Color helper functions from here:
// https://github.com/kirupa/kirupa/blob/master/animations/hsla_complementary_color.htm

function getRandomColor(h)
{
    // var h = [0, 360];
    var s = [80, 100];
    var l = [40, 60];
    var a = [1, 1];

    let hue = getRandomNumber(h[0], h[1]);
    let saturation = getRandomNumber(s[0], s[1]);
    let lightness = getRandomNumber(l[0], l[1]);
    let alpha = getRandomNumber(a[0] * 100, a[1] * 100) / 100;

    return {
        h: hue,
        s: saturation,
        l: lightness,
        a: alpha,
        hslaValue: getHSLAColor(hue, saturation, lightness, alpha),
        hslaComplimentValue: getHSLAColor(hue - 180, saturation, lightness, alpha)
    }
}

function getRandomNumber(low, high)
{
    let r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}

function getHSLAColor(h, s, l, a)
{
    return `hsl(${h}, ${s}%, ${l}%, ${a})`;
}

const createNewStyles = (nameOfNewClass, backgroundColor, fontColor) =>
{
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.${nameOfNewClass} { background-color: ${backgroundColor}; color: ${fontColor}`
    document.getElementsByTagName('head')[0].appendChild(style);
}

const randomOptions = () =>
{
    let playerFactor = onboardPlayer - 1 // when player = 1 playerfactor 0, when player = 2, playerfactor = 1
    let base = 180 * playerFactor // base = 0 when player = 1, base = 180 when player = 2
    let color1 = getRandomColor([colorStartAngle + base, colorStartAngle + base]) // random but alway seperate colors
    let color2 = getRandomColor([colorStartAngle + 60 + base, colorStartAngle + 60 + base]) // random but alway seperate colors
    let color3 = getRandomColor([colorStartAngle + 120 + base, colorStartAngle + 120 + base]) // random but alway seperate colors

    createNewStyles('color1', color1.hslaValue, color1.hslaComplimentValue)
    createNewStyles('color2', color2.hslaValue, color2.hslaComplimentValue)
    createNewStyles('color3', color3.hslaValue, color3.hslaComplimentValue)

    colors.push(color1.hslaValue)
    colors.push(color2.hslaValue)
    colors.push(color3.hslaValue)
    colors.push(color1.hslaComplimentValue)
    colors.push(color2.hslaComplimentValue)
    colors.push(color3.hslaComplimentValue)

    let symbols = document.querySelectorAll('.symbol-option')
    symbols.forEach(symbol =>
    {
        symbol.innerHTML = playerTokens[startIndex]
        startIndex++
        if (startIndex > playerTokens.length - 1)
        {
            startIndex = 0
        }
    })

    setOptionColorClass('color1')
}

const redoOnboarding = () =>
{
    player1.ai = false
    player2.ai = false
    resetBoard()
    onboardPlayer = 1
    changeOnboardingForPlayerOne()
    playerOnboarding()

}

const playerOnboarding = () =>
{
    document.querySelector('.onboarding-parent').style.display = "flex"
    document.querySelector('.main').style.display = "none"

    randomOptions()

    let options = document.querySelectorAll('.onboarding-option')
    options.forEach(option =>
    {
        option.addEventListener('click', selectOption)
    })
    let acceptButton = document.querySelector('.onboard-accept')
    acceptButton.addEventListener('click', acceptChoices)
    selectionOptionOne()
}

const selectionOptionOne = () =>
{
    let sections = document.querySelectorAll('.onboard-section')
    sections.forEach(section =>
    {
        section.firstElementChild.classList.add('selected-option')
    })
}

function selectOption() // avoid fat arrow to make use of this keyword in this function
{
    for (let i = 0; i < this.parentElement.children.length; i++)
    {
        this.parentElement.children[i].classList.remove('selected-option')
    }
    this.classList.add('selected-option')

    if (this.classList.contains('color-option'))
    {
        setOptionColorClass(this.classList[2])
    }
}

const setOptionColorClass = colorClass =>
{
    let symbolOptions = document.querySelectorAll('.symbol-option')

    symbolOptions.forEach(option =>
    {
        option.classList.remove('color1')
        option.classList.remove('color2')
        option.classList.remove('color3')
        option.classList.add(colorClass)
    })

    let aiOptions = document.querySelectorAll('.ai-option')

    aiOptions.forEach(option =>
    {
        option.classList.remove('color1')
        option.classList.remove('color2')
        option.classList.remove('color3')
        option.classList.add(colorClass)
    })
}

const changeOnboardingForPlayerOne = () =>
{
    randomOptions()
    let labels = document.querySelectorAll('.onboard-label')
    document.querySelector('#playerName').placeholder = "Player 1 Name"
    labels[0].innerHTML = 'Player 1 color'
    labels[1].innerHTML = 'Player 1 decal'
    labels[2].innerHTML = 'Player 1 type'
    selectionOptionOne()
}

const changeOnboardingForPlayerTwo = () =>
{
    onboardPlayer = 2
    randomOptions()
    let labels = document.querySelectorAll('.onboard-label')
    document.querySelector('#playerName').placeholder = "Player 2 Name"
    labels[0].innerHTML = 'Player 2 color'
    labels[1].innerHTML = 'Player 2 decal'
    labels[2].innerHTML = 'Player 2 type'
    selectionOptionOne()
}

const setHoverColor = newColorClass =>
{
    gameBoardArray.forEach(square =>
    {
        if (square.innerHTML == "")
        {
            square.newClass = newColorClass
        }
    })
}

const endOnboardingBeginGame = () =>
{
    document.querySelector('.main').style.display = "flex"
    document.querySelector('.onboarding-parent').style.display = "none"
    setHoverColor('player-1-colors-hover')
    resetBoard()
}

const customizePlayer = (playerObject, selectedOptions) =>
{
    playerObject.chosenName = document.querySelector('#playerName').value == "" ? `Player ${playerObject.id}` : document.querySelector('#playerName').value
    playerObject.mainColor = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('background-color');
    playerObject.altColor = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('color');
    createNewStyles(playerObject.colorClassName, playerObject.mainColor, playerObject.altColor)
    createNewStyles(playerObject.colorClassName + '-hover', playerObject.mainColor, playerObject.altColor)
    playerObject.token = selectedOptions[1].innerHTML
}

const removeSelection = selectedOptions =>
{
    selectedOptions.forEach(option =>
    {
        option.classList.remove('selected-option')
    })
}

const acceptChoices = () =>
{
    let selectedOptions = document.querySelectorAll('.selected-option')

    if (selectedOptions.length == 3 && onboardPlayer == 1)
    {
        customizePlayer(player1, selectedOptions)
        //console.log(selectedOptions)
        document.querySelector('#playerName').value = ""
        if (selectedOptions[2].classList.contains('human'))
        {
            removeSelection(selectedOptions)
            changeOnboardingForPlayerTwo()
        }
        else
        {
            player1.ai = true;
            if (selectedOptions[2].classList.contains('ai0'))
            {
                player1.aiLevel = 0
            }
            else if (selectedOptions[2].classList.contains('ai1'))
            {
                player1.aiLevel = 1
            }
            removeSelection(selectedOptions)
            changeOnboardingForPlayerTwo()
        }

    }
    else if (selectedOptions.length == 3 && onboardPlayer == 2)
    {
        customizePlayer(player2, selectedOptions)
        document.querySelector('#playerName').value = ""
        if (selectedOptions[2].classList.contains('human'))
        {
            removeSelection(selectedOptions)
            endOnboardingBeginGame()
        }
        else
        {
            player2.ai = true
            if (selectedOptions[2].classList.contains('ai0'))
            {
                player2.aiLevel = 0
            }
            else if (selectedOptions[2].classList.contains('ai1'))
            {
                player2.aiLevel = 1
            }
            removeSelection(selectedOptions)
            endOnboardingBeginGame()
        }

    }
}

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
    if (checkBoard(player1.token, gameBoardArray))
    {
        document.querySelector('.status').innerHTML = `${player1.chosenName} wins!!!`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.reset-button').style.display = "block"
        document.querySelector('.play-again-button').style.display = "block"
        gameInProgress = false
        setHoverColor('none')
        explodeConfetti()
    }
    else if (checkBoard(player2.token, gameBoardArray))
    {
        document.querySelector('.status').innerHTML = `${player2.chosenName} wins!!!`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.reset-button').style.display = "block"
        document.querySelector('.play-again-button').style.display = "block"
        gameInProgress = false
        setHoverColor('none')
        explodeConfetti()
    }
    else if (turns >= 9)
    {
        // draw and no winner
        document.querySelector('.status').innerHTML = `No winner`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.reset-button').style.display = "block"
        document.querySelector('.play-again-button').style.display = "block"
        gameInProgress = false
        setHoverColor('none')

    }
}

//   Game Board
//
//     0|1|2
//     3|4|5
//     6|7|8

const checkBoard = (playerToken) =>
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

const minimax = (depth, isMaximizing, playerObject) =>
{
    let openSpaces = gameBoardArray.filter(square =>
    {
        return square.innerHTML == ""
    })

    let result = checkBoard(playerObject.token)
    let resultOpponent = checkBoard(playerObject.opponent.token)
    if (result)
    {
        if (isMaximizing)
        {
            return 1
        }
        else
        {
            return -1
        }
    }
    else if (resultOpponent)
    {
        if (isMaximizing)
        {
            return -1
        }
        else
        {
            return 1
        }
    }
    else if (openSpaces.length <= 0)
    {
        console.log(depth)
        return 0
    }
    else if( depth > 4)
    {
        return 0
    }

    if (isMaximizing)
    {

        let bestScore = -Infinity
        openSpaces.forEach(space =>
        {
            space.innerHTML = playerObject.token
            let score = minimax(depth + 1, false, playerObject.opponent)
            space.innerHTML = ""
            if (score > bestScore)
            {
                bestScore = score
            }
            // if(space.id == 2)
            // {
            //     console.log("this score:"+score)
            // }
        })
        return bestScore
    }
    else
    {
        // console.log(playerObject.chosenName)
        let bestScore = Infinity
        openSpaces.forEach(space =>
        {
            space.innerHTML = playerObject.token
            let score = minimax(depth + 1, true, playerObject.opponent)
            space.innerHTML = ""
            if (score < bestScore)
            {
                bestScore = score
            }
            // if(space.id == 2)
            // {
            //     console.log("op score:"+score)
            // }
        })
        return bestScore
    }
}

const aiTurn = (playerObject) =>
{

    let openSpaces = gameBoardArray.filter(square =>
    {
        return square.innerHTML == ""
    })

    if (playerObject.aiLevel == 0)  // ai-easy
    {
        let randomIndex = Math.floor(Math.random() * openSpaces.length)
        processTurn(openSpaces[randomIndex], playerObject)
        console.log("AI Selected: " + openSpaces[randomIndex].id)
        prepareBoardFor(playerObject.opponent)
    }
    else if (playerObject.aiLevel == 1) // ai-hard - uses minimax
    {
        // from the coding train : https://www.youtube.com/watch?v=trKjYdBASyQ
        let bestScore = -Infinity
        let bestMove

        openSpaces.forEach(space =>
        {
            space.innerHTML = playerObject.token
            let score = minimax(0, false, playerObject.opponent)
            space.innerHTML = ""
            if (score > bestScore)
            {
                bestScore = score
                bestMove = space
            }
            console.log("AI rated position " + space.id + " as score " + score)
        })

        console.log("AI Selected: " + bestMove.id)

        processTurn(bestMove, playerObject)
        prepareBoardFor(playerObject.opponent)
    }

    if (playerObject.opponent.ai == true && gameInProgress == true)
    {
        aiTurn(playerObject.opponent)
    }

}

const processTurn = (squareClicked, playerObject) =>
{
    //console.log(squareClicked)
    squareClicked.innerHTML = playerObject.token
    squareClicked.classList.add(playerObject.colorClassName)
    isPLayer1Turn = !isPLayer1Turn
    turns++
    checkForWin()
}

const prepareBoardFor = forPlayerObject =>
{
    if (gameInProgress)
    {
        // console.log("prepare board for " + forPlayerObject.chosenName + "with color:" + forPlayerObject.mainColor)
        let status = document.querySelector('.status')
        status.innerHTML = `${forPlayerObject.chosenName}'s turn`
        status.style.backgroundColor = forPlayerObject.mainColor
        setHoverColor(forPlayerObject.colorClassName + '-hover')
    }

}

function squareClicked() // avoid arrow function to make use of the this property
{
    if (this.innerHTML == '' && gameInProgress)
    {

        if (isPLayer1Turn)
        {

            processTurn(this, player1)
            isPLayer1Turn = false
            prepareBoardFor(player2)
            //turns++
            //checkForWin()
            if (player2.ai && gameInProgress)
            {
                aiTurn(player2)
            }
        }
        else
        {
            processTurn(this, player2)
            isPLayer1Turn = true
            prepareBoardFor(player1)
            //turns++
            //checkForWin()
            if (player1.ai && gameInProgress)
            {
                aiTurn(player1)
            }

        }

    }
}

const resetBoard = () =>
{
    gameBoardArray.forEach(square =>
    {
        square.innerHTML = ""
        square.classList.remove('player-1-colors')
        square.classList.remove('player-2-colors')
        square.newClass = 'player-1-colors-hover'
    })
    gameInProgress = true
    document.querySelector('.status').innerHTML = `${player1.chosenName}'s turn`
    document.querySelector('.status').style.backgroundColor = player1.mainColor
    isPLayer1Turn = true
    document.querySelector('.reset-button').style.display = "none"
    document.querySelector('.play-again-button').style.display = "none"
    resetConfetti()
    turns = 0
    startIndex = getRandomNumber(0, playerTokens.length - 1)
    if (player1.ai == true)
    {
        aiTurn(player1)
    }
}

const prepareConfetti = () =>
{
    let amountOfConfetti = 60
    let confetti = document.createElement('div')
    for (let i = 0; i < amountOfConfetti; i++)
    {
        let newConfetti = document.createElement('div')
        newConfetti.classList.add('confetti')
        allConfetti.push(newConfetti)
        confetti.append(newConfetti)
    }
    document.body.append(confetti)
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
        confetti.style.backgroundColor = colors[Math.round(Math.random() * (colors.length - 1))]
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

const buildBoard = () =>
{
    let mainParentDiv = document.createElement('div')
    mainParentDiv.classList.add('main-parent')
    document.body.append(mainParentDiv)

    let mainDiv = document.createElement('div')
    mainDiv.classList.add('main')
    mainParentDiv.append(mainDiv)

    let statusDiv = document.createElement('div')
    statusDiv.classList.add('status')
    mainDiv.append(statusDiv)
    statusDiv.innerHTML = "PlayerOne's turn"

    let scoreDiv = document.createElement('div')
    scoreDiv.classList.add('score-parent')
    mainDiv.append(scoreDiv)

    let scorep1Div = document.createElement('div')
    scorep1Div.classList.add('score', 'score-p1')
    scoreDiv.append(scorep1Div)

    let scorep2Div = document.createElement('div')
    scorep2Div.classList.add('score', 'score-p2')
    scoreDiv.append(scorep2Div)

    let boardDiv = document.createElement('div')
    boardDiv.classList.add('board')
    mainDiv.append(boardDiv)

    for (let i = 0; i < 9; i++)
    {
        let squareDiv = document.createElement('div')
        squareDiv.classList.add('square')
        squareDiv.id = i
        gameBoardArray.push(squareDiv)
        squareDiv.newClass = "player-1-colors-hover"
        squareDiv.addEventListener('mouseover', addClass)
        squareDiv.addEventListener('mouseout', removeClass)
        squareDiv.addEventListener('click', squareClicked)
        boardDiv.append(squareDiv)
    }

    let resetButtonDiv = document.createElement('div')
    resetButtonDiv.classList.add('resetDiv')

    let resetButton = document.createElement('button')
    resetButton.innerHTML = "Reset"
    resetButton.style.display = "none"
    resetButton.classList.add('reset-button')
    resetButton.addEventListener('click', redoOnboarding)

    let playAgainButton = document.createElement('button')
    playAgainButton.innerHTML = "Play Again"
    playAgainButton.style.display = "none"
    playAgainButton.classList.add('play-again-button')
    playAgainButton.addEventListener('click', resetBoard)

    resetButtonDiv.append(resetButton)
    resetButtonDiv.append(playAgainButton)
    mainDiv.append(resetButtonDiv)

    prepareConfetti()
    resetConfetti()
    // document.addEventListener('keyup', keyDown)
    playerOnboarding()
}

buildBoard()

//////////
// Bugs
// Hover while AI playing
// same icon for player1 and 2
//
//
//
//
//
//
//
// Bugs

