const body = document.querySelector('body');

const screens = document.querySelectorAll('.screen');
const startButton = document.querySelector('#start');

const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');

const board = document.querySelector('#board');

const colors = ['pink', 'red', 'yellow', 'blue', 'purple']
const buttonTextContent = ['ок', 'так тримати', 'спробуй ще', 'непогано', 'неперевершено']

let time = 0;
let score = 0;

let start;

// const params = new URLSearchParams(window.location.search)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
};

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 70);

    const {width, height} = board.getBoundingClientRect();

    const x = getRandomNumber(50, width - 50 - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle');

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    // circle.style.backgroundColor = colors[getRandomNumber(0, colors.length)]
    circle.style.backgroundColor = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`

    board.append(circle);
};
 
function setTimer(time) {
    timeElement.textContent = `00:${time}`;
};

function createButton() {
    const button = document.createElement('button');
    button.classList.add('buttonColor')

    button.innerHTML = `${buttonTextContent[getRandomNumber(0, buttonTextContent.length)]}! <strong>спробувати ще раз<strong>`

    board.append(button);

    button.addEventListener('click', () => {
        window.location.href = './index.html'
    })
}

function finishGame() {
    timeElement.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    createButton()
};

function startGame() {
    start = setInterval(decreaseTime, 1000);
    createRandomCircle();
};

function decreaseTime() {
    if(time === 0) {
        finishGame();
        clearInterval(start)
    } else {
        let currentTime = --time;
    
        if(currentTime < 10) currentTime = `0${currentTime}`;
        setTimer(currentTime);
    };
};



body.addEventListener('click', (e) => {
    if(e.target === startButton) {
        e.preventDefault();
        screens[0].classList.add('up');
    } else if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.dataset.time);
        console.log(time);
        screens[1].classList.add('up');

        startGame()
    } else if(e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

