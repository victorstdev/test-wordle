const grid = document.querySelector('.grid');
let wordRow = [];
let wordCell = [];

const fetchWord = async () => {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=5');
        const data = await response.json();
        return data[0].toUpperCase();
    } catch (error) {
        console.error('Error fetching word:', error);
        return 'ERROR';
    }
};

let targetWord = '';

fetchWord().then(word => {
    targetWord = word;
    console.log('Target word:', targetWord);
});

const createGrid = () => {
    const rows = 6;
    const cols = 5;
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row-' + i);
        row.classList.add('row');
        grid.appendChild(row);
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell-' + j);
            cell.classList.add('cell');
            row.appendChild(cell);
        }
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    createGrid();
});

window.addEventListener('keypress', (e) => {
    if(/[A-Z]/.test(e.key.toUpperCase())){
        if(e.key.length == 1){
            wordCell.push(e.key.toUpperCase());
            document.querySelector(`.row-${wordRow.length} > .cell-${wordCell.length-1}`).textContent = e.key.toUpperCase();
        }
    }
    if(wordCell.length == 5){
        wordRow.push(wordCell);
        console.log(wordCell)
        checkWord(wordCell);
        wordCell = [];
    }
})

const checkWord = (word) => {
    let solution = targetWord.split('');
    for(let i = 0; i < word.length; i++){
        if(word[i] == solution[i]){
            document.querySelector(`.row-${wordRow.length-1} > .cell-${i}`).classList.add('correct');
            solution[i] = '';
        }else if(solution.includes(word[i])){
            document.querySelector(`.row-${wordRow.length-1} > .cell-${i}`).classList.add('misplaced');
        }
    }
}