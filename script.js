function limpar() {
    document.getElementById("display").value = "0"; // Reseta para "0" ao limpar
    document.getElementById("history").textContent = "";  // Limpa também o histórico
}

function calcular() {
    let displayValue = document.getElementById("display").value;

    try {
        let result = eval(displayValue);
        if (result === Infinity) {
            document.getElementById("display").value = "Infinity";
        } else {
            document.getElementById("display").value = result.toFixed(2);
        }
        document.getElementById("history").textContent = displayValue + " = " + result.toFixed(2);
    } catch (error) {
        document.getElementById("display").value = "Erro";
    }
}

function add_numero(numero) {
    let display = document.getElementById("display");
    let history = document.getElementById("history");

    // Limpa o histórico sempre que um número é adicionado
    history.textContent = "";

    // Se o último caractere foi um resultado (indicado por "=") ou se é "0", substitui o valor
    if (display.value === "0" || display.value.includes("=")) {
        display.value = numero;  // Substitui o valor anterior
    } else {
        display.value += numero;  // Adiciona o número normalmente
    }
}

function add_operacao(operacao) {
    let display = document.getElementById("display");
    let displayValue = display.value;
    let ultimoCaractere = displayValue[displayValue.length - 1];

    // Se o último caractere é uma operação, substitui
    if (['+', '-', '*', '/'].includes(ultimoCaractere)) {
        display.value = displayValue.slice(0, -1) + operacao; // Troca a última operação
    } else {
        display.value += operacao;  // Adiciona nova operação
    }
}
