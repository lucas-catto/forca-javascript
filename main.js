
const palavras         = ["javascript", "bootstrap", "programacao"];
let   tentativasUsadas = 0;
let   botoes           = document.getElementById("botoes");
let   letras           = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let   palavraSecreta,
    palavraOculta;
let jogando;


function iniciarJogo () {
    
    botoes.innerHTML = "";
    
    for (let i = 0; i < letras.length; i++) {
        botoes.innerHTML += `<button id='btn-${letras[i]}' class='btn btn-light me-1 mb-1' onclick="checarLetra('${letras[i]}')">${letras[i]}</button>`;
    }

    jogando          = true;
    tentativasUsadas = 0;
    palavraSecreta   = palavras[Math.floor(Math.random() * palavras.length)];
    
    console.log(palavraSecreta);
    
    palavraOculta    = '';

    for (let i = 0; i < palavraSecreta.length; i++) {
        palavraOculta += '_ ';
    }
    document.querySelector('h2').innerHTML = palavraOculta;
    document.getElementById('btn-reiniciar').classList.add('d-none');
    desenharForca (tentativasUsadas);
}

iniciarJogo();


function checarLetra (letra) {

    if (!jogando) return;

    let btn   = document.getElementById('btn-' + letra);
    let achou = false;

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] == letra.toLowerCase()) {
            achou         = true;
            palavraOculta = trocaLetra(palavraOculta, letra, i);
        }
    }

    document.querySelector('h2').innerHTML = palavraOculta;

    btn.classList.remove('btn-light');
    btn.classList.add(achou ? 'btn-primary' : 'btn-danger');

    if (!achou) {
        tentativasUsadas++;
        desenharForca (tentativasUsadas);
    }

    checarJogo();
}

function checarJogo () {
    if (tentativasUsadas == 6) {
        Swal.fire({
            icon:  'error',
            title: 'Oops...',
            text:  'Você perdeu!!!'
        });
        jogando = false;
        document.getElementById('btn-reiniciar').classList.remove('d-none');
    }
    
    let listaTexto  = palavraOculta.split(" ");
    let novaPalavra = listaTexto.join("");
    
    if (palavraSecreta == novaPalavra.toLowerCase()) {
        Swal.fire({
            icon:  'success',
            title: 'Aeeeeeeee',
            text:  'Você ganhou!!!'
        });
        jogando = false;
        document.getElementById('btn-reiniciar').classList.remove('d-none');
    }
}

function trocaLetra (textoOriginal, letra, posicao) {
    
    let listaTexto      = textoOriginal.split(" ");
    listaTexto[posicao] = letra;
    let novoTexto       = listaTexto.join(" ");

    return novoTexto;
}
