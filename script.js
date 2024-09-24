let operaçãoAtual = '';
let historico = [];
const tamanhoMaximoDisplay = 12; 

function add_numero(numero) {
    const display = document.getElementById('display');
    
    
    if (display.value.length < tamanhoMaximoDisplay) {
        if (display.value === '0') {
            display.value = numero;
        } else {
            display.value += numero;
        }
    }
}

function add_operacao(operacao) {
    const display = document.getElementById('display');
    
    
    if (display.value.length < tamanhoMaximoDisplay) {
        if (operaçãoAtual) {
            display.value = display.value.slice(0, -1) + operacao;
        } else {
            display.value += operacao;
        }
        operaçãoAtual = operacao;
    }
}

function calcular() {
    const display = document.getElementById('display');
    const expressao = display.value;

    try {
        
        if (!/^[0-9+\-*/(). ]+$/.test(expressao)) {
            throw new Error("Entrada Inválida");
        }

        const resultado = eval(expressao);

        if (!isNaN(resultado)) {
            display.value = resultado.toFixed(2);
            const agora = new Date();
            const dataHora = agora.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            historico.push({ dataHora, expressao });
            if (historico.length > 4) {
                historico.shift();
            }
            atualizarHistorico();
        } else {
            throw new Error("Resultado não é um número");
        }

    } catch (error) {
        display.value = 'Entrada Inválida';
        console.error(error);
    }
}

function limpar() {
    const display = document.getElementById('display');
    display.value = '0';
    operaçãoAtual = '';
}

function atualizarHistorico() {
    const tabela = document.querySelector('#historicoTabela tbody');
    tabela.innerHTML = '';
    historico.forEach(item => {
        const linha = document.createElement('tr');

        const celulaDataHora = document.createElement('td');
        celulaDataHora.textContent = item.dataHora;

        const celulaExpressao = document.createElement('td');
        celulaExpressao.textContent = item.expressao;

        linha.addEventListener('click', () => {
            const display = document.getElementById('display');
            display.value = item.expressao;
        });

        linha.appendChild(celulaDataHora);
        linha.appendChild(celulaExpressao);

        tabela.appendChild(linha);
    });
}
