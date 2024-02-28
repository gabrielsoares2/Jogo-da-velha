const tabela = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let celula;
let jogador;
let maquina;
let resultado = document.getElementById('res');
const corVitoria = "lightblue";
const corDerrota = "lightcoral";
const corDaCelula = "white";

function iniciarJogo () {
    
    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            const celulas = `celula-${l * 3 + c + 1}`;
            const classeCelula = document.getElementById(celulas);

            classeCelula.addEventListener('click', () => vezDoJogador(l, c));

            tabela[l][c] = classeCelula;
            tabela[l][c].style.backgroundColor = corDaCelula;
            tabela[l][c].removeAttribute("disabled");
            classeCelula.setAttribute('readonly', true);
        };
    };

    let inicio = document.getElementById('iniciar');
    inicio.setAttribute('disabled', true);
};

function vezDoJogador(linha, coluna){
    
    celula = tabela[linha][coluna];
    if(celula.value === ""){
        celula.value = "X";
        celula.setAttribute('disabled', true);
        celula.style.opacity = "1";
    

        vezDaMaquina();
        verificarJogo();
    }
};

function vezDaMaquina(){

    let disponivel = [];

    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            if(tabela[l][c].value === ""){
                disponivel.push({linha: l, coluna: c});
            }
        }
    }

    if(disponivel.length > 0){
        let aleatorio = disponivel[Math.floor(Math.random() * disponivel.length)];

        celula = tabela[aleatorio.linha][aleatorio.coluna];

        celula.value = "O";
        celula.setAttribute('disabled', true);
        celula.style.opacity = "1";
    }

};

function verificarJogo(){

    for(let l = 0; l < 3; l++){
        if(tabela[l][0].value === "X" && tabela[l][1].value === "X" && tabela[l][2].value === "X"){
            linha();
            desativarInputs();
            reiniciarJogo();
            return;
        } else if(tabela[l][0].value === "O" && tabela[l][1].value === "O" && tabela[l][2].value === "O"){
            linha();
            desativarInputs();
            reiniciarJogo();
            return;
        }
    }

    for(let c = 0; c < 3; c++){
        if(tabela[0][c].value === "X" && tabela[1][c].value === "X" && tabela[2][c].value === "X"){
            coluna();
            desativarInputs();
            reiniciarJogo();
            return;
        } else if(tabela[0][c].value === "O" && tabela[1][c].value === "O" && tabela[2][c].value === "O"){
            coluna();
            desativarInputs();
            reiniciarJogo();
            return;
        }
    }

    if(tabela[0][0].value === "X" && tabela[1][1].value === "X" && tabela[2][2].value === "X"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        return;
    } else if (tabela[0][2].value === "X" && tabela[1][1].value === "X" && tabela[2][0].value === "X"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        return;
    } else if (tabela[0][0].value === "O" && tabela[1][1].value === "O" && tabela[2][2].value === "O"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        return;
    } else if (tabela[0][2].value === "O" && tabela[1][1].value === "O" && tabela[2][0].value === "O"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        return;
    }

    if(tabela[0][0].value !== "" && tabela[0][1].value !== "" && tabela[0][2].value !== "" && tabela[1][0].value !== "" && tabela[1][1].value !== "" && tabela[1][2].value !== "" && tabela[2][0].value !== "" && tabela[2][1].value !== "" && tabela[2][2].value !== ""){
        resultado.innerHTML = "Empate";
        reiniciarJogo();
    }

};

function linha(){
    if(tabela[0][0].value === "X" && tabela[0][1].value === "X" && tabela[0][2].value === "X") {
        tabela[0][0].style.backgroundColor = corVitoria;
        tabela[0][1].style.backgroundColor = corVitoria;
        tabela[0][2].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[1][0].value === "X" && tabela[1][1].value === "X" && tabela[1][2].value === "X") {
        tabela[1][0].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[1][2].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[2][0].value === "X" && tabela[2][1].value === "X" && tabela[2][2].value === "X") {
        tabela[2][0].style.backgroundColor = corVitoria;
        tabela[2][1].style.backgroundColor = corVitoria;
        tabela[2][2].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][0].value === "O" && tabela[0][1].value === "O" && tabela[0][2].value === "O") {
        tabela[0][0].style.backgroundColor = corDerrota;
        tabela[0][1].style.backgroundColor = corDerrota;
        tabela[0][2].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[1][0].value === "O" && tabela[1][1].value === "O" && tabela[1][2].value === "O") {
        tabela[1][0].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[1][2].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[2][0].value === "O" && tabela[2][1].value === "O" && tabela[2][2].value === "O") {
        tabela[2][0].style.backgroundColor = corDerrota;
        tabela[2][1].style.backgroundColor = corDerrota;
        tabela[2][2].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    }
};

function coluna(){
    if(tabela[0][0].value === "X" && tabela[1][0].value === "X" && tabela[2][0].value === "X") {
        tabela[0][0].style.backgroundColor = corVitoria;
        tabela[1][0].style.backgroundColor = corVitoria;
        tabela[2][0].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][1].value === "X" && tabela[1][1].value === "X" && tabela[2][1].value === "X") {
        tabela[0][1].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[2][1].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][2].value === "X" && tabela[1][2].value === "X" && tabela[2][2].value === "X") {
        tabela[0][2].style.backgroundColor = corVitoria;
        tabela[1][2].style.backgroundColor = corVitoria;
        tabela[2][2].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][0].value === "O" && tabela[1][0].value === "O" && tabela[2][0].value === "O") {
        tabela[0][0].style.backgroundColor = corDerrota;
        tabela[1][0].style.backgroundColor = corDerrota;
        tabela[2][0].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[0][1].value === "O" && tabela[1][1].value === "O" && tabela[2][1].value === "O") {
        tabela[0][1].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[2][1].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[0][2].value === "O" && tabela[1][2].value === "O" && tabela[2][2].value === "O") {
        tabela[0][2].style.backgroundColor = corDerrota;
        tabela[1][2].style.backgroundColor = corDerrota;
        tabela[2][2].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    }
};

function diagonal(){
    if(tabela[0][0].value === "X" && tabela[1][1].value === "X" && tabela[2][2].value === "X"){
        tabela[0][0].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[2][2].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][2].value === "X" && tabela[1][1].value === "X" && tabela[2][0].value === "X"){
        tabela[0][2].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[2][0].style.backgroundColor = corVitoria;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][0].value === "O" && tabela[1][1].value === "O" && tabela[2][2].value === "O"){
        tabela[0][0].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[2][2].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[0][2].value === "O" && tabela[1][1].value === "O" && tabela[2][0].value === "O"){
        tabela[0][2].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[2][0].style.backgroundColor = corDerrota;
        resultado.innerHTML = "Você perdeu";
    }
};

function reiniciarJogo(){
    let reiniciar = document.getElementById("reiniciar");
    reiniciar.removeAttribute("disabled");
};

function novoJogo(){
    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            tabela[l][c].value = "";
            tabela[l][c].removeAttribute("disabled");
            tabela[l][c].style.backgroundColor = corDaCelula;
        }
    }

    resultado.innerHTML = "Resultado";

    let reiniciar = document.getElementById("reiniciar");
    reiniciar.setAttribute("disabled", true)
};

function desativarInputs(){
    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            tabela[l][c].setAttribute('disabled', true);
        }
    }
};