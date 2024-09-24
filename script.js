let historico = [];

// Adiciona um número ao visor
function add_numero(num) {
    const display = document.getElementById("display");
    if (display.value === "0") {
        display.value = num; // Se o visor está em 0, substitui pelo número
    } else {
        display.value += num; // Adiciona o número ao visor
    }
}

// Adiciona uma operação ao visor
function add_operacao(op) {
    const display = document.getElementById("display");
    if (!display.value.endsWith(" ") && display.value !== "0") {
        display.value += " " + op + " "; // Adiciona operação ao visor
    }
}

// Limpa o visor
function limpar() {
    document.getElementById("display").value = "0"; // Reseta o visor
}

// Calcula a operação atual
function calcular() {
    const display = document.getElementById("display");
    try {
        const resultado = eval(display.value); // Avalia a expressão
        const operacaoCompleta = display.value + " = " + resultado; // Monta a operação completa
        historico.push(operacaoCompleta); // Adiciona ao histórico
        atualizar_historico(); // Atualiza a tabela do histórico
        display.value = resultado; // Exibe o resultado no visor
    } catch (error) {
        display.value = "ERROR"; // Se ocorrer erro, exibe ERROR
    }
}

// Atualiza o histórico na tabela
function atualizar_historico() {
    const historicoTabela = document.getElementById("historicoTabela").getElementsByTagName("tbody")[0];
    historicoTabela.innerHTML = ""; // Limpa a tabela atual
    historico.forEach((item, index) => {
        const row = historicoTabela.insertRow(); // Cria uma nova linha
        const cell = row.insertCell(0); // Cria uma nova célula
        cell.textContent = item; // Adiciona o item do histórico à célula
        cell.classList.add("historico-item"); // Adiciona a classe para estilização
        cell.onclick = () => selecionar_historico(index); // Define a função para selecionar o histórico
    });
}

// Seleciona um item do histórico e o coloca no visor
function selecionar_historico(index) {
    const itemHistorico = historico[index]; // Ex: "21:08:11 9 * 3 = 27"

    // Extraindo apenas a operação
    const partes = itemHistorico.split(" = ")[0].trim(); // Obtém a parte antes do '='

    // Atualiza o visor com a operação
    document.getElementById("display").value = partes; 
}
