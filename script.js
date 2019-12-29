let isPLayer1Turn = true
let player1Token = 'X'
let player2Token = 'O'
//let gameBoardArray = [['','',''],['','',''],['','','']]
let gameBoardArray = []

function addGreyClass()
{
    this.classList.add('grey')
}

function removeGreyClass()
{
    this.classList.remove('grey')
}

function checkForWin()
{
    if(checkBoard(player1Token))
    {
        document.querySelector('.status').innerHTML = 'Player 1 Wins!'
    }
    else if (checkBoard(player2Token))
    {
        document.querySelector('.status').innerHTML = 'Player 2 Wins!'
    }
}

//   0|1|2
//   3|4|5
//   6|7|8

function checkBoard(playerToken)
{
    let gba = gameBoardArray
    let pt = playerToken

    console.log(gba[0].innerHTML + " " + gba[1] + " " + gba[2])
    if(gba[0].innerHTML == pt && gba[1].innerHTML == pt && gba[2].innerHTML == pt) //1
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
}

// function updateGameBoardArray(element)
// {
//     //console.log( element.id.split("_")[0])
//     // console.log( element.id.split("_")[1])
//     // console.log( element.id.split("_")[2])
//
//     let x = element.id.split("_")[1]
//     let y = element.id.split("_")[2]
//
//     gameBoardArray[x][y] = element.innerHTML
//     console.log(gameBoardArray)
// }

function squareClicked()
{
    //console.log('this.innerHTML:' + this.innerHTML)
    if (this.innerHTML == '')
    {
        if (isPLayer1Turn)
        {
            this.innerHTML = player1Token
            // updateGameBoardArray(this)
            isPLayer1Turn = false
            document.querySelector('.status').innerHTML = 'Player 2 Turn'
        }
        else
        {
            this.innerHTML = player2Token
            // updateGameBoardArray(this)
            isPLayer1Turn = true
            document.querySelector('.status').innerHTML = 'Player 1 Turn'
        }
        checkForWin()
    }
}

const buildBoard = () =>
{
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('main')
    document.body.append(mainDiv)


    let statusDiv = document.createElement('div')
    statusDiv.classList.add('status')
    mainDiv.append(statusDiv)
    statusDiv.innerHTML = "Player one's turn"

    let boardDiv = document.createElement('div')
    boardDiv.classList.add('board')
    mainDiv.append(boardDiv)



    for (let i = 0; i < 9; i++)
    {
        // for (let j = 1; j <= 3; j++)
        // {
            let squareDiv = document.createElement('div')
            squareDiv.classList.add('square')
            // squareDiv.id = j+"_"+i
            squareDiv.id = i
            gameBoardArray.push(squareDiv)
            squareDiv.addEventListener('mouseover', addGreyClass)
            squareDiv.addEventListener('mouseout', removeGreyClass)
            squareDiv.addEventListener('click', squareClicked)
            boardDiv.append(squareDiv)
        // }
    }
}

buildBoard()

