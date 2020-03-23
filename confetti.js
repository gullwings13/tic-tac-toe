// Used by the program, don't edit these
let allConfetti = []
let fadeFallTimeOut

// confetti will be random colors picked from below array, add or remove any colors you want
let colors = ["green","rgba(0,0,255,1)","#ff0000"]

// adjust this to be the element where you want the confetti to start at.
// leave it as is if you just want it to center in the window
// let centerOnElement = document.querySelector('#exampleID')
let centerOnElement = document.body

// adjust these to center it on the item
// since i am using the whole screen i get the whole width and divide by two
// if you change the centerOnElement to an element that is 100 by 100px
// you would change these both to 50 to center the confetti start position
let adjustTop = window.innerHeight/2
let adjustLeft = window.innerWidth/2


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
    // radius controls the initial spread
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
        confetti.style.left = (getOffset(centerOnElement).left + adjustLeft) + "px"
        confetti.style.top = (getOffset(centerOnElement).top + adjustTop) + "px"
        confetti.style.opacity = "100%"
        confetti.style.transform = 'rotate3d(0)'
        confetti.style.transitionTimingFunction = "ease-out"
        confetti.style.backgroundColor = 'black'
    })
}



// Call prepare confetti when page loads
prepareConfetti()

// call explode when you want it to go off
// explodeConfetti()


// call reset confetti before you can use it again (like maybe when a new game starts)
//resetConfetti()
