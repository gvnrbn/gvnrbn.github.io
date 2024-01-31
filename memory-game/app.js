const cardArray = [
    {
        name:'rj',
        img: 'images/rj.png'
    },
    {
        name:'tata',
        img: 'images/tata.png'
    },
    {
        name:'koya',
        img: 'images/koya.png'
    },
    {
        name:'chimmy',
        img: 'images/chimmy.png'
    },
    {
        name:'shooky',
        img: 'images/shooky.png'
    },
    {
        name:'mang',
        img: 'images/mang.png'
    },
    {
        name:'rj',
        img: 'images/rj.png'
    },
    {
        name:'tata',
        img: 'images/tata.png'
    },
    {
        name:'koya',
        img: 'images/koya.png'
    },
    {
        name:'chimmy',
        img: 'images/chimmy.png'
    },
    {
        name:'shooky',
        img: 'images/shooky.png'
    },
    {
        name:'mang',
        img: 'images/mang.png'
    }
]

// sort randomnly
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid') //picks the whole <div id = "grid"></div>
const resultDisplay = document.querySelector('#result') 
const puntajeDisplay = document.querySelector('#puntaje') 
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
let intentos = 0

function createBoard(){
    for (let i=0; i<cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/blank.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}

function flipCard(){    
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    // console.log('clicked',cardId)
    // console.log(cardsChosen)
    this.setAttribute('src', cardArray[cardId].img)
    if(cardsChosen.length == 2){
        setTimeout(checkMatch,400)
        intentos++
    }

}

function checkMatch(){
    const cards = document.querySelectorAll('img')
    const optioOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if(optioOneId == optionTwoId){
        // alert('You have clicked the same image!')
        emptyChoice()
        cards[optioOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        return
    }

    if (cardsChosen[0] == cardsChosen[1])
    {
        // alert('You found a match!')
        cards[optioOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optioOneId].removeEventListener('click',flipCard)
        cards[optionTwoId].removeEventListener('click',flipCard)
        cardsWon.push(cardsChosen)
    }else {
        cards[optioOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }
    resultDisplay.textContent = intentos
    emptyChoice()

    if(cardsWon.length == (cardArray.length/2)){
        resultDisplay.textContent = 'Ganaste en '+intentos+' intentos!'
        puntajeDisplay.textContent = calcScore() +'%'
    }
    
}

function calcScore(){
    if(intentos == 6) return 100
    return Math.floor(100*6/intentos)
}
function emptyChoice(){
    cardsChosen = []
    cardsChosenIds = []
}
createBoard()