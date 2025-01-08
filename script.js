const grid = document.querySelector('.grid');
let wordRow = [];
let wordCell = [];
const wordSolution = 'FUDER'
console.log('Palavra:', wordSolution)

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

window.addEventListener('DOMContentLoaded', () => {
    createGrid();
});

window.addEventListener('keypress', (e) => {
    if (/[A-Z]/.test(e.key.toUpperCase())) {
        if (e.key.length == 1) {
            wordCell.push(e.key.toUpperCase());
            document.querySelector(`.row-${wordRow.length} > .cell-${wordCell.length - 1}`).textContent = e.key.toUpperCase();
        }
    }
    if (wordCell.length == 5) {
        wordRow.push(wordCell);
        console.log(wordCell)
        checkWord(wordCell);
        wordCell = [];
    }
})

const checkWord = (word) => {
    let solucao = wordSolution.split('')
    for (let i = 0; i < 5; i++){
        let letra = word[i]
        let posicao = solucao.indexOf(letra)
        if(posicao == -1){
            console.log('letra', letra, 'nao existe na palavra')
        } else {
            if(letra == solucao[i]){
                pintarCerto(wordRow, i)
            } else {
                pintarQuase(wordRow, i)
            }
            solucao[posicao] = "#"
        }
    }
}

const pintarCerto = (x, y) => {
    document.querySelector(`.row-${x.length - 1} > .cell-${y}`).classList.add('correct');
}
const pintarQuase = (x, y) => {
    document.querySelector(`.row-${x.length - 1} > .cell-${y}`).classList.add('misplaced');
}