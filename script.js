let isPLayer1Turn = true
let player1 = {
    id: 1,
    colorClassName: 'player-1-colors',
    name: 'Player One',
    mainColor: 'rgba(255,0,0,1)',
    altColor: 'rgba(0,0,255,1)',
    token: 'X'
}

let player2 = {
    id: 2,
    colorClassName: 'player-2-colors',
    name: 'Player Two',
    mainColor: 'rgba(255,255,0,1)',
    altColor: 'rgba(0,255,255,1)',
    token: 'O'
}

let clicks = 0
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
    '<i class="fa fa-music"></i>',
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
    '<i class="fa fa-glass"></i>'
]

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
    let startIndex = getRandomNumber(0, playerTokens.length - 1)
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

const playerOnboarding = () =>
{
    document.querySelector('.main').style.display = "none"

    randomOptions()
    selectionOptionOne()

    let options = document.querySelectorAll('.onboarding-option')
    options.forEach(option =>
    {
        option.addEventListener('click', selectOption)
    })
    let acceptButton = document.querySelector('.onboard-accept')
    acceptButton.addEventListener('click', acceptChoices)
}

const selectionOptionOne = () =>
{

}

function selectOption()
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

const makePlayerAI = () =>
{

}

const changeOnboardingForPlayerTwo = () =>
{
    onboardPlayer = 2
    randomOptions()
    let labels = document.querySelectorAll('.onboard-label')
    labels[0].innerHTML = 'Type a name for Player 2'
    labels[1].innerHTML = 'Choose a color for Player 2'
    labels[2].innerHTML = 'Choose a symbol for Player 2'
    labels[3].innerHTML = 'Player 2 is human!'
    let aiSection = document.querySelector('.aiSection')
    aiSection.style.display = "none"

}

const endOnboardingBeginGame = () =>
{
    document.querySelector('.main').style.display = "flex"
    document.querySelector('.onboarding-parent').style.display = "none"
    resetBoard()
    setHoverColor('player-1-colors-hover')
}

const customizePlayer = (playerObject, selectedOptions) =>
{
    playerObject.name = document.querySelector('#playerName').value == "" ? player1.name : document.querySelector('#playerName').value
    playerObject.mainColor = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('background-color');
    playerObject.altColor = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('color');
    createNewStyles(playerObject.colorClassName,playerObject.mainColor, playerObject.altColor)
    createNewStyles(playerObject.colorClassName+'-hover',playerObject.mainColor, playerObject.altColor)
    playerObject.token = selectedOptions[1].innerHTML
}

const acceptChoices = () =>
{
    let selectedOptions = document.querySelectorAll('.selected-option')

    if (selectedOptions.length == 3 && onboardPlayer == 1)
    {
        customizePlayer(player1, selectedOptions)
        document.querySelector('#playerName').value = ""
        if (selectedOptions[2].innerHTML == "Human")
        {
            selectedOptions.forEach(option =>
            {
                option.classList.remove('selected-option')
            })
            changeOnboardingForPlayerTwo()
        }
        else
        {
            onboardPlayer = 3
            selectedOptions.forEach(option =>
            {
                option.classList.remove('selected-option')
            })
            makePlayerAI()
        }

    }
    else if (selectedOptions.length == 2 && onboardPlayer == 2)
    {
        customizePlayer(player2, selectedOptions)
        document.querySelector('#playerName').value = ""
        // player2Name = document.querySelector('#playerName').value == "" ? player2Name : document.querySelector('#playerName').value
        // player2Color = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('background-color');
        // let player2AltColor = window.getComputedStyle(selectedOptions[0], null).getPropertyValue('color');
        // createNewStyles('player2colors',player2Color, player2AltColor)
        // player2Token = selectedOptions[1].innerHTML
        endOnboardingBeginGame()
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
    if (checkBoard(player1.token))
    {
        document.querySelector('.status').innerHTML = `${player1.name} wins!!!`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.resetButton').style.display = "block"
        gameInProgress = false
        explodeConfetti()
    }
    else if (checkBoard(player2.token))
    {
        document.querySelector('.status').innerHTML = `${player2.name} wins!!!`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.resetButton').style.display = "block"
        gameInProgress = false
        explodeConfetti()
    }
    else if (clicks >= 9)
    {
        // draw and no winner
        document.querySelector('.status').innerHTML = `No winner`
        document.querySelector('.status').style.backgroundColor = "yellow"
        document.querySelector('.resetButton').style.display = "block"
        gameInProgress = false
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
            this.innerHTML = player1.token
            this.classList.add('player-1-colors')
            isPLayer1Turn = false
            document.querySelector('.status').innerHTML = `${player2.name}'s turn`
            document.querySelector('.status').style.backgroundColor = player2.color
            setHoverColor('player-2-colors-hover')
        }
        else
        {
            this.innerHTML = player2.token
            this.classList.add('player-2-colors')
            isPLayer1Turn = true
            document.querySelector('.status').innerHTML = `${player1.name}'s turn`
            document.querySelector('.status').style.backgroundColor = player1.color
            setHoverColor('player-1-colors-hover')
        }
        clicks++
        console.log(clicks)
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
    document.querySelector('.status').innerHTML = `${player1.name}'s turn`
    document.querySelector('.status').style.backgroundColor = player1.color
    isPLayer1Turn = true
    document.querySelector('.resetButton').style.display = "none"
    resetConfetti()
    clicks = 0
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

// const keyDown = event =>
// {
//     if (event.key == 'x')
//     {
//         explodeConfetti()
//         setTimeout(resetConfetti, 5000)
//     }
// }

const setHoverColor = newColorClass =>
{
    gameBoardArray.forEach(square => {
        square.newClass = newColorClass
    })
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
        squareDiv.newClass = "player-1-colors-hover"
        squareDiv.addEventListener('mouseover', addClass)
        squareDiv.addEventListener('mouseout', removeClass)
        squareDiv.addEventListener('click', squareClicked)
        boardDiv.append(squareDiv)
    }

    prepareConfetti()
    resetConfetti()
    // document.addEventListener('keyup', keyDown)
    playerOnboarding()
}

buildBoard()