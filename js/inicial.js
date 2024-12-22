document.addEventListener('DOMContentLoaded', function () {
    const vagasEstacionamento = 20;
    const veiculoForm = document.getElementById('veiculoForm');
    const clienteExistenteRadio = document.getElementById('clienteExistente');
    const clienteSelectContainer = document.getElementById('clienteSelectContainer');
    const clienteSelect = document.getElementById('clienteSelect');
    const nomeInput = document.getElementById('nome');
    const placaInput = document.getElementById('placa');
    const tipoInput = document.getElementById('tipo');
    const corInput = document.getElementById('cor');
    const dataInput = document.getElementById('data');
    const voltarButton = document.createElement('button');

    voltarButton.textContent = 'Voltar ao Formulario';
    voltarButton.style.display = 'none'; // Inicialmente escondido
    voltarButton.addEventListener('click', function () {
        clienteExistenteRadio.checked = false; // Desmarcar o rádio "Já sou cliente"
        veiculoForm.style.display = 'block'; // Mostra o formulário
        clienteSelectContainer.style.display = 'none'; // Oculta o select
        voltarButton.style.display = 'none'; // Oculta o botão de voltar
    });

    clienteSelectContainer.appendChild(voltarButton);

    // Função para carregar os clientes armazenados no select
    function carregarClientes() {
        let entries = JSON.parse(localStorage.getItem('clientes')) || [];
        clienteSelect.innerHTML = '<option value="" disabled selected hidden>Escolha um Cliente</option>'; // Limpa o select

        entries.forEach((entry, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = entry.nome;
            clienteSelect.appendChild(option);
        });
    }

    // Quando o rádio "Já sou cliente" é selecionado
    clienteExistenteRadio.addEventListener('change', function () {
        if (this.checked) {
            veiculoForm.style.display = 'none'; // Oculta o formulário
            clienteSelectContainer.style.display = 'block'; // Mostra o select
            voltarButton.style.display = 'block'; // Mostra o botão de voltar
            carregarClientes(); // Carrega os clientes no select
        }
    });

    // Quando um cliente é selecionado no select
    clienteSelect.addEventListener('change', function () {
        let entries = JSON.parse(localStorage.getItem('clientes')) || [];
        let selectedCliente = entries[this.value];

        nomeInput.value = selectedCliente.nome;
        placaInput.value = selectedCliente.placa;
        tipoInput.value = selectedCliente.tipo;
        corInput.value = selectedCliente.cor;
        veiculoForm.style.display = 'block'; // Mostra o formulário novamente
        clienteSelectContainer.style.display = 'none'; // Oculta o select
        voltarButton.style.display = 'none'; // Oculta o botão de voltar
    });

    // Função para cadastrar um novo veículo
    function cadastrar() {
        event.preventDefault();
        let inputNome = nomeInput.value;
        let inputPlaca = placaInput.value;
        let inputTipo = tipoInput.value;
        let inputCor = corInput.value;
        let inputTime = dataInput.value;

        if (!inputNome || !inputPlaca || !inputTipo || !inputCor || !inputTime) {
            Swal.fire({
                title: "Erro",
                text: "Por favor, preencha todos os campos.",
                icon: "error"
            });
            return;
        }

        if (inputPlaca.length !== 7) {
            Swal.fire({
                title: "A placa do carro deve ter exatamente 7 caracteres.",
                icon: "info"
            });
            return;
        }

        let entries = JSON.parse(localStorage.getItem('entries')) || [];

        // Verifica se a placa já está cadastrada
        let placaExistente = entries.some(entry => entry.placa === inputPlaca);
        if (placaExistente) {
            alert('Já existe um veículo cadastrado com essa placa.');
            return;
        }

        if (entries.length >= vagasEstacionamento) {
            alert('Todas as vagas do estacionamento já foram preenchidas.');
            return;
        }

        entries.push({ nome: inputNome, placa: inputPlaca, tipo: inputTipo, cor: inputCor, time: inputTime });
        localStorage.setItem('entries', JSON.stringify(entries));

        ArmazenarRegistro(); 
        atualizarVagas(); 
    }

    // Função para armazenar os registros na tabela
    function ArmazenarRegistro() {
        let tabela = document.getElementById('resultado');
        tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os novos registros

        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach((entry, index) => {
            let novaLinha = tabela.insertRow();

            novaLinha.insertCell(0).innerText = entry.nome;
            novaLinha.insertCell(1).innerText = entry.placa;
            novaLinha.insertCell(2).innerText = entry.tipo;
            novaLinha.insertCell(3).innerText = entry.cor;
            novaLinha.insertCell(4).innerText = entry.time;

            let deleteCell = novaLinha.insertCell(5);
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = function () {
                deletarRegistro(index);
            };

            deleteCell.appendChild(deleteButton);
        });
    }

    // Função para deletar um registro
    function deletarRegistro(index) {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));

        ArmazenarRegistro(); 
        atualizarVagas(); 
    }

    // Função para atualizar o número de vagas disponíveis
    function atualizarVagas() {
        const totalVagas = 20;
        let vagasArmazenadas = JSON.parse(localStorage.getItem('entries')) || [];
        let vagasOcupadas = vagasArmazenadas.length;
        let vagasDisponiveis = totalVagas - vagasOcupadas;

        document.getElementById('vagasOcupadas').textContent = `${vagasOcupadas}`;
        document.getElementById('vagasDisponiveis').textContent = `${vagasDisponiveis}`;
    }

    // Inicializa a página carregando os registros e atualizando as vagas
    window.onload = function () {
        ArmazenarRegistro();
        atualizarVagas();
    }

    // Expondo as funções globais para uso nos botões de deletar e editar
    window.cadastrar = cadastrar;
    window.deletarRegistro = deletarRegistro;
});
