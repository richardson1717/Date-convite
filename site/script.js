// --- FUNÇÃO DA CHUVA DE EMOJIS (DEDO DO MEIO) ---
let documentoContainer = document.getElementById('chuva-container');
if (!documentoContainer) {
    documentoContainer = document.createElement('div');
    documentoContainer.id = 'chuva-container';
    document.body.appendChild(documentoContainer);
}

function criarEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji-queda');
    emoji.innerText = '🖕'; 
    
    emoji.style.left = Math.random() * 100 + 'vw';
    const duracao = Math.random() * 3 + 3;
    emoji.style.animationDuration = duracao + 's';
    emoji.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    emoji.style.opacity = Math.random() * 0.4 + 0.4;

    documentoContainer.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, duracao * 1000);
}

setInterval(criarEmoji, 250);


// --- LÓGICA DE COMPORTAMENTO DAS TELAS ---
const tela1 = document.getElementById('tela1');
const tela2 = document.getElementById('tela2');
const tela3 = document.getElementById('tela3');
const tela4 = document.getElementById('tela4');

const btnSim = document.getElementById('btn-sim');
const btnNao = document.getElementById('btn-nao');
const tituloConvite = document.getElementById('titulo-convite');

// Frases exatas presentes nas tuas imagens quando ela tenta recusar
const frasesNao = [
    "não aceito não como resposta",
    "clica no sim pfvrr",
    "para de tentar clicar em não",
    "anda logo aceitaa"
];
let contadorNao = 0;

function fugirBotao() {
    if (!btnNao.classList.contains('fugitivo')) {
        btnNao.classList.add('fugitivo');
    }

    const larguraBotao = btnNao.offsetWidth;
    const alturaBotao = btnNao.offsetHeight;

    const maxX = window.innerWidth - larguraBotao - 20;
    const maxY = window.innerHeight - alturaBotao - 20;

    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    btnNao.style.left = `${randomX}px`;
    btnNao.style.top = `${randomY}px`;

    tituloConvite.innerText = frasesNao[contadorNao % frasesNao.length];
    contadorNao++;
}

btnNao.addEventListener('mouseover', fugirBotao);
btnNao.addEventListener('touchstart', (e) => {
    e.preventDefault();
    fugirBotao();
});

btnSim.addEventListener('click', () => {
    btnNao.classList.remove('fugitivo');
    btnNao.style.position = 'static';
    
    tela1.classList.remove('active');
    tela2.classList.add('active');
});

const btnAvancarData = document.getElementById('btn-avancar-data');
const inputData = document.getElementById('data-date');
const inputHora = document.getElementById('hora-date');

try {
    const hoje = new Date().toISOString().split('T')[0];
    inputData.min = hoje;
    inputData.value = hoje;
} catch(e) {
    console.log("Erro ao definir data automática");
}

btnAvancarData.addEventListener('click', () => {
    if (!inputData.value) {
        alert("Escolha um dia aí!");
        return;
    }
    tela2.classList.remove('active');
    tela3.classList.add('active');
});

const opcoesCards = document.querySelectorAll('.opcao-card');
const btnAvancarLocal = document.getElementById('btn-avancar-local');
let localSelecionado = "";

opcoesCards.forEach(card => {
    card.addEventListener('click', () => {
        opcoesCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        localSelecionado = card.getAttribute('data-local');
        
        btnAvancarLocal.classList.remove('disabled');
        btnAvancarLocal.removeAttribute('disabled');
    });
});

btnAvancarLocal.addEventListener('click', () => {
    if (!localSelecionado) return;

    const dataFormatada = inputData.value.split('-').reverse().join('/');
    const horaFormatada = inputHora.value;

    document.getElementById('resumo-data').innerText = dataFormatada;
    document.getElementById('resumo-hora').innerText = `${horaFormatada}h`;
    document.getElementById('resumo-local').innerText = localSelecionado;

    tela3.classList.remove('active');
    tela4.classList.add('active');

    // --- ENVIO AUTOMÁTICO PARA O SEU WHATSAPP ---
    const numeroWhats = "5588981460375"; 
    const textoMensagem = `Mendigo, Tá aqui: \n\n Data: ${dataFormatada}\n Hora: ${horaFormatada}h\n Destino: ${localSelecionado}\n\n Cuida`;
    
    setTimeout(() => {
        const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(textoMensagem)}`;
        window.open(url, '_blank');
    }, 1500);
});