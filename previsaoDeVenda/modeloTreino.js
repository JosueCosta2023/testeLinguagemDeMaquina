let model;

async function treinar() {
    await tf.ready();

    model = ml5.neuralNetwork({ task: 'regression', debug: true });

    // 🔥 Aqui usamos a lista de dados para alimentar o modelo
    //   Importada via excopo global pela simplicidade do projeto.
    //  Em projeto mais complexos utiliza-se o import para importar variaveis de outros arquivos js
    dadosDeTreinamento.forEach((dado) => {
        model.addData(dado.entrada, dado.saida);
    });

    model.normalizeData();

    model.train({ epochs: 50 }, () => {
        console.log('Treinamento concluído!');
        alert('Modelo treinado com sucesso!');
    });
}

async function prever() {
    await tf.ready();

    if (!model) {
        alert("Por favor, treine o modelo primeiro!");
        return;
    }

    const dia = parseInt(document.getElementById('dia').value);
    const clima = parseInt(document.getElementById('clima').value);

    if (isNaN(dia) || isNaN(clima)) {
        alert("Por favor, selecione dia e clima.");
        return;
    }

    try {
        const resultado = await model.predict({ dia, clima });
        document.getElementById('resultado').innerText =
            `📈 Previsão: Aproximadamente ${resultado[0].value.toFixed(0)} sorvetes serão vendidos hoje!`;
    } catch (err) {
        console.error("Erro na previsão:", err);
    }
}
