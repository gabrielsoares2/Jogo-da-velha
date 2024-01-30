const tabuleiro = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function vezDoJogador(linha, coluna) {
    const celula = tabuleiro[linha][coluna];
    if (celula && celula.value === "") {
        celula.value = "X";
    }

    vezDaMaquina();
    verificarJogo();
}

function iniciarTabuleiro() {
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            const classeCelula = `linha${i + 1}-espaço${j + 1}`;
            const input = document.querySelector(`.${classeCelula}`);
            input.addEventListener('click', () => vezDoJogador(i, j));

            tabuleiro[i][j] = input;
        }
    }
}

iniciarTabuleiro();