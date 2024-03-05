const tabela = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let dificuldade = document.getElementById('cabecalho-dificuldade');
let pontuacaoVitoria = document.getElementById('v');
let pontuacaoDerrota = document.getElementById('d');
let celula;
let jogador;
let resultado = document.getElementById('res');
const corVitoria = "#3559E0";
const corDerrota = "#D24545";
const corDaCelula = "white";

function pontoVitoria(){
    pontuacaoVitoria.value = parseFloat(pontuacaoVitoria.value) + 0.5;
}

function pontoDerrota(){
    pontuacaoDerrota.value = parseFloat(pontuacaoDerrota.value) + 0.5;
}

function iniciarJogo () {

    dificuldade.disabled = true;
    
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
    
        if (todasCelulasPreenchidas()) {
            resultado.innerHTML = "Empate";
            reiniciarJogo();
        } else {
            vezDaMaquina();
        }
    }

    verificarJogo();

};

function todasCelulasPreenchidas() {
    for (let l = 0; l < 3; l++) {
        for (let c = 0; c < 3; c++) {
            if (tabela[l][c].value === "") {
                return false;
            }
        }
    }
    return true;
}

function vezDaMaquina(){

    if(dificuldade.value === "Fácil"){
        vezDaMaquinaFacil();
    } else if(dificuldade.value === "Difícil"){
        vezDaMaquinaDifícil();
    } else if(dificuldade.value === "Impossível"){
        vezDaMaquinaImpossível();
    }
    
};

function vezDaMaquinaFacil(){

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

            maquina();
            verificarJogo();

            return;
            
        }

};

function vezDaMaquinaDifícil(){
    
    let disponivel = [];

    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            if(tabela[l][c].value === ""){
                disponivel.push({linha: l, coluna: c});
            }
        }
    }

        if(disponivel.length === 8){

            let aleatorio = disponivel[Math.floor(Math.random() * disponivel.length)];
            celula = tabela[aleatorio.linha][aleatorio.coluna];

            maquina();
            verificarJogo();

            return;
            
        }

        if(disponivel.length === 6){

            verificarJogadaVencedora();
            verificarJogadaBloqueio();

            let jogadaVitoriosa = verificarJogadaVencedora("O");
            let jogadaBloqueio = verificarJogadaBloqueio("O");
        
            if (jogadaVitoriosa && jogadaVitoriosa.value === "") {
                celula = jogadaVitoriosa;
            } else if (jogadaBloqueio && jogadaBloqueio.value === "") {
                celula = jogadaBloqueio;
            } else {
                let aleatorio = disponivel[Math.floor(Math.random() * disponivel.length)];
                celula = tabela[aleatorio.linha][aleatorio.coluna];
            }

            maquina();
            verificarJogo();

            return;

        }

        if(disponivel.length <= 4){

            verificarJogadaVencedora();
            verificarJogadaBloqueio();

            let jogadaVitoriosa = verificarJogadaVencedora("O");
            let jogadaBloqueio = verificarJogadaBloqueio("O");
        
            if (jogadaVitoriosa && jogadaVitoriosa.value === "") {
                celula = jogadaVitoriosa;
            } else if (jogadaBloqueio && jogadaBloqueio.value === "") {
                celula = jogadaBloqueio;
            } else {
                let aleatorio = disponivel[Math.floor(Math.random() * disponivel.length)];
                celula = tabela[aleatorio.linha][aleatorio.coluna];
            }

            maquina();
            verificarJogo();

            return;
        }
};

function vezDaMaquinaImpossível(){
    
    let disponivel = [];

    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            if(tabela[l][c].value === ""){
                disponivel.push({linha: l, coluna: c});
            }
        }
    }

        if(disponivel.length === 8){

            if(tabela[1][1].value === "X"){
                
                let aleatorio = [tabela[0][0], tabela[0][2], tabela[2][0], tabela[2][2]];

                let quinas = Math.floor(Math.random() * aleatorio.length);

                let aleatorioQuinas = aleatorio[quinas];

                celula = aleatorioQuinas;

                maquina();
                verificarJogo();

                return;
            }

            if(tabela[0][0].value === "X" || tabela[0][2].value === "X" || tabela[2][0].value === "X" || tabela[2][2].value === "X"){
                
                let jogada = tabela[1][1];

                celula = jogada;

                maquina();
                verificarJogo();

                return;
            }

            if(tabela[0][1].value === "X" || tabela[1][0].value === "X" || tabela[2][1].value === "X" || tabela[1][2].value === "X"){

                let jogada = tabela[1][1];

                celula = jogada;

                maquina();
                verificarJogo();

                return;

            }   
        }

        if(disponivel.length === 6){

            verificarJogadaVencedora();
            verificarJogadaBloqueio();

            let jogadaVitoriosa = verificarJogadaVencedora("O");
            let jogadaBloqueio = verificarJogadaBloqueio("O");
        
            if (jogadaVitoriosa && jogadaVitoriosa.value === "") {
                celula = jogadaVitoriosa;
            } else if (jogadaBloqueio && jogadaBloqueio.value === "") {
                celula = jogadaBloqueio;
            } else {
                let aleatorio = disponivel[Math.floor(Math.random() * disponivel.length)];
                celula = tabela[aleatorio.linha][aleatorio.coluna];
            }

            maquina();
            verificarJogo();

            return;

        }

        if(disponivel.length <= 4){

            verificarJogadaVencedora();
            verificarJogadaBloqueio();

            let jogadaVitoriosa = verificarJogadaVencedora("O");
            let jogadaBloqueio = verificarJogadaBloqueio("O");
        
            if (jogadaVitoriosa && jogadaVitoriosa.value === "") {
                celula = jogadaVitoriosa;
            } else if (jogadaBloqueio && jogadaBloqueio.value === "") {
                celula = jogadaBloqueio;
            } else {
                let aleatorio = disponivel[Math.floor(Math.random() * disponivel.length)];
                celula = tabela[aleatorio.linha][aleatorio.coluna];
            }

            maquina();
            verificarJogo();

            return;
        }
};

function verificarJogo(){

    for(let l = 0; l < 3; l++){
        if(tabela[l][0].value === "X" && tabela[l][1].value === "X" && tabela[l][2].value === "X"){
            linha();
            desativarInputs();
            reiniciarJogo();
            pontoVitoria();
            return;
        } else if(tabela[l][0].value === "O" && tabela[l][1].value === "O" && tabela[l][2].value === "O"){
            linha();
            desativarInputs();
            reiniciarJogo();
            pontoDerrota();
            return;
        }
    }

    for(let c = 0; c < 3; c++){
        if(tabela[0][c].value === "X" && tabela[1][c].value === "X" && tabela[2][c].value === "X"){
            coluna();
            desativarInputs();
            reiniciarJogo();
            pontoVitoria();
            return;
        } else if(tabela[0][c].value === "O" && tabela[1][c].value === "O" && tabela[2][c].value === "O"){
            coluna();
            desativarInputs();
            reiniciarJogo();
            pontoDerrota();
            return;
        }
    }

    if(tabela[0][0].value === "X" && tabela[1][1].value === "X" && tabela[2][2].value === "X"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        pontoVitoria();
        return;
    } else if (tabela[0][2].value === "X" && tabela[1][1].value === "X" && tabela[2][0].value === "X"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        pontoVitoria();
        return;
    } else if (tabela[0][0].value === "O" && tabela[1][1].value === "O" && tabela[2][2].value === "O"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        pontoDerrota();
        return;
    } else if (tabela[0][2].value === "O" && tabela[1][1].value === "O" && tabela[2][0].value === "O"){
        diagonal();
        desativarInputs();
        reiniciarJogo();
        pontoDerrota();
        return;
    }

};

function linha(){
    if(tabela[0][0].value === "X" && tabela[0][1].value === "X" && tabela[0][2].value === "X") {
        tabela[0][0].style.backgroundColor = corVitoria;
        tabela[0][1].style.backgroundColor = corVitoria;
        tabela[0][2].style.backgroundColor = corVitoria;
        tabela[0][0].style.color = corDaCelula;
        tabela[0][1].style.color = corDaCelula;
        tabela[0][2].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[1][0].value === "X" && tabela[1][1].value === "X" && tabela[1][2].value === "X") {
        tabela[1][0].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[1][2].style.backgroundColor = corVitoria;
        tabela[1][0].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[1][2].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[2][0].value === "X" && tabela[2][1].value === "X" && tabela[2][2].value === "X") {
        tabela[2][0].style.backgroundColor = corVitoria;
        tabela[2][1].style.backgroundColor = corVitoria;
        tabela[2][2].style.backgroundColor = corVitoria;
        tabela[2][0].style.color = corDaCelula;
        tabela[2][1].style.color = corDaCelula;
        tabela[2][2].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][0].value === "O" && tabela[0][1].value === "O" && tabela[0][2].value === "O") {
        tabela[0][0].style.backgroundColor = corDerrota;
        tabela[0][1].style.backgroundColor = corDerrota;
        tabela[0][2].style.backgroundColor = corDerrota;
        tabela[0][0].style.color = corDaCelula;
        tabela[0][1].style.color = corDaCelula;
        tabela[0][2].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[1][0].value === "O" && tabela[1][1].value === "O" && tabela[1][2].value === "O") {
        tabela[1][0].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[1][2].style.backgroundColor = corDerrota;
        tabela[1][0].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[1][2].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[2][0].value === "O" && tabela[2][1].value === "O" && tabela[2][2].value === "O") {
        tabela[2][0].style.backgroundColor = corDerrota;
        tabela[2][1].style.backgroundColor = corDerrota;
        tabela[2][2].style.backgroundColor = corDerrota;
        tabela[2][0].style.color = corDaCelula;
        tabela[2][1].style.color = corDaCelula;
        tabela[2][2].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    }
};

function coluna(){
    if(tabela[0][0].value === "X" && tabela[1][0].value === "X" && tabela[2][0].value === "X") {
        tabela[0][0].style.backgroundColor = corVitoria;
        tabela[1][0].style.backgroundColor = corVitoria;
        tabela[2][0].style.backgroundColor = corVitoria;
        tabela[0][0].style.color = corDaCelula;
        tabela[1][0].style.color = corDaCelula;
        tabela[2][0].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][1].value === "X" && tabela[1][1].value === "X" && tabela[2][1].value === "X") {
        tabela[0][1].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[2][1].style.backgroundColor = corVitoria;
        tabela[0][1].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[2][1].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][2].value === "X" && tabela[1][2].value === "X" && tabela[2][2].value === "X") {
        tabela[0][2].style.backgroundColor = corVitoria;
        tabela[1][2].style.backgroundColor = corVitoria;
        tabela[2][2].style.backgroundColor = corVitoria;
        tabela[0][2].style.color = corDaCelula;
        tabela[1][2].style.color = corDaCelula;
        tabela[2][2].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][0].value === "O" && tabela[1][0].value === "O" && tabela[2][0].value === "O") {
        tabela[0][0].style.backgroundColor = corDerrota;
        tabela[1][0].style.backgroundColor = corDerrota;
        tabela[2][0].style.backgroundColor = corDerrota;
        tabela[0][0].style.color = corDaCelula;
        tabela[1][0].style.color = corDaCelula;
        tabela[2][0].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[0][1].value === "O" && tabela[1][1].value === "O" && tabela[2][1].value === "O") {
        tabela[0][1].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[2][1].style.backgroundColor = corDerrota;
        tabela[0][1].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[2][1].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[0][2].value === "O" && tabela[1][2].value === "O" && tabela[2][2].value === "O") {
        tabela[0][2].style.backgroundColor = corDerrota;
        tabela[1][2].style.backgroundColor = corDerrota;
        tabela[2][2].style.backgroundColor = corDerrota;
        tabela[0][2].style.color = corDaCelula;
        tabela[1][2].style.color = corDaCelula;
        tabela[2][2].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    }
};

function diagonal(){
    if(tabela[0][0].value === "X" && tabela[1][1].value === "X" && tabela[2][2].value === "X"){
        tabela[0][0].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[2][2].style.backgroundColor = corVitoria;
        tabela[0][0].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[2][2].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][2].value === "X" && tabela[1][1].value === "X" && tabela[2][0].value === "X"){
        tabela[0][2].style.backgroundColor = corVitoria;
        tabela[1][1].style.backgroundColor = corVitoria;
        tabela[2][0].style.backgroundColor = corVitoria;
        tabela[0][2].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[2][0].style.color = corDaCelula;
        resultado.innerHTML = "Você ganhou";
    } else if(tabela[0][0].value === "O" && tabela[1][1].value === "O" && tabela[2][2].value === "O"){
        tabela[0][0].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[2][2].style.backgroundColor = corDerrota;
        tabela[0][0].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[2][2].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    } else if(tabela[0][2].value === "O" && tabela[1][1].value === "O" && tabela[2][0].value === "O"){
        tabela[0][2].style.backgroundColor = corDerrota;
        tabela[1][1].style.backgroundColor = corDerrota;
        tabela[2][0].style.backgroundColor = corDerrota;
        tabela[0][2].style.color = corDaCelula;
        tabela[1][1].style.color = corDaCelula;
        tabela[2][0].style.color = corDaCelula;
        resultado.innerHTML = "Você perdeu";
    }
};

function verificarJogadaVencedora(bolinha){
    for(let l = 0; l < 3; l++){
        if(tabela[l][0].value === "O" && tabela[l][1].value === "O" && tabela[l][2].value === ""){
            return tabela[l][2];
        } else if(tabela[l][0].value === "O" && tabela[l][2].value === "O" && tabela[l][1].value === ""){
            return tabela[l][1];
        } else if(tabela[l][1].value === "O" && tabela[l][2].value === "O" && tabela[l][0].value === ""){
            return tabela[l][0];
        }
    }

    for(let c = 0; c < 3; c++){
        if(tabela[0][c].value === "O" && tabela[1][c].value === "O" && tabela[2][c].value === ""){
            return tabela[2][c];
        } else if(tabela[0][c].value === "O" && tabela[2][c].value === "O" && tabela[1][c].value === ""){
            return tabela[1][c];
        } else if(tabela[1][c].value === "O" && tabela[2][c].value === "O" && tabela[0][c].value === ""){
            return tabela[0][c];
        }
    }

    if(tabela[0][0].value === "O" && tabela[1][1].value === "O" && tabela[2][2].value === ""){
        return tabela[2][2];
    } else if(tabela[1][1].value === "O" && tabela[2][2].value === "O" && tabela[0][0].value === ""){
        return tabela[0][0];
    } else if(tabela[0][0].value === "O" && tabela[2][2].value === "O" && tabela[1][1].value === ""){
        return tabela[1][1];
    } else if(tabela[0][2].value === "O" && tabela[1][1].value === "O" && tabela[2][0].value === ""){
        return tabela[2][0];
    } else if(tabela[0][2].value === "O" && tabela[2][0].value === "O" && tabela[1][1].value === ""){
        return tabela[1][1];
    } else if(tabela[1][1].value === "O" && tabela[2][0].value === "O" && tabela[0][2].value === ""){ 
        return tabela[0][2];
    }

    return null;

};

function verificarCasaVitoria(){
    celula = verificarJogadaVencedora("O");
}

function verificarCasaBloqueio(){
    celula = verificarJogadaVencedora("O");
}

function verificarJogadaBloqueio(bolinha){
    for(let l = 0; l < 3; l++){
        if(tabela[l][0].value === "X" && tabela[l][1].value === "X" && tabela[l][2].value === ""){
            return tabela[l][2];
        } else if(tabela[l][0].value === "X" && tabela[l][2].value === "X" && tabela[l][1].value === ""){
            return tabela[l][1];
        } else if(tabela[l][1].value === "X" && tabela[l][2].value === "X" && tabela[l][0].value === ""){
            return tabela[l][0];
        }
    }

    for(let c = 0; c < 3; c++){
        if(tabela[0][c].value === "X" && tabela[1][c].value === "X" && tabela[2][c].value === ""){
            return tabela[2][c];
        } else if(tabela[0][c].value === "X" && tabela[2][c].value === "X" && tabela[1][c].value === ""){
            return tabela[1][c];
        } else if(tabela[1][c].value === "X" && tabela[2][c].value === "X" && tabela[0][c].value === ""){
            return tabela[0][c];
        }
    }

    if(tabela[0][0].value === "X" && tabela[1][1].value === "X" && tabela[2][2].value === ""){
        return tabela[2][2];
    } else if(tabela[1][1].value === "X" && tabela[2][2].value === "X" && tabela[0][0].value === ""){
        return tabela[0][0];
    } else if(tabela[0][0].value === "X" && tabela[2][2].value === "X" && tabela[1][1].value === ""){
        return tabela[1][1];
    } else if(tabela[0][2].value === "X" && tabela[1][1].value === "X" && tabela[2][0].value === ""){
        return tabela[2][0];
    } else if(tabela[0][2].value === "X" && tabela[2][0].value === "X" && tabela[1][1].value === ""){
        return tabela[1][1];
    } else if(tabela[1][1].value === "X" && tabela[2][0].value === "X" && tabela[0][2].value === ""){ 
        return tabela[0][2];
    }

    return null;
};

function reiniciarJogo(){
    let reiniciar = document.getElementById("reiniciar");
    reiniciar.removeAttribute("disabled");
    dificuldade.removeAttribute("disabled");
};

function novoJogo(){

    dificuldade.disabled = true;

    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            tabela[l][c].value = "";
            tabela[l][c].removeAttribute("disabled");
            tabela[l][c].style.backgroundColor = corDaCelula;
            tabela[l][c].style.color = "black";
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

function maquina(){
    celula.value = "O";
    celula.setAttribute('disabled', true);
    celula.style.opacity = "1";
};