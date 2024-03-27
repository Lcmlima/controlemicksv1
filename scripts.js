document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('equipamentoForm');
    const listaEquipamentos = document.getElementById('listaEquipamentos');
    const downloadButton = document.getElementById('downloadButton');

    // Função para adicionar o equipamento à lista
    function adicionarEquipamento(event) {
        event.preventDefault();

        const codigoPatrimonio = document.getElementById('codigoPatrimonio').value;
        const responsavel = document.getElementById('responsavel').value;
        const equipamento = document.getElementById('equipamento').value;

        // Verifica se todos os campos estão preenchidos
        if (!codigoPatrimonio || !responsavel || !equipamento) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Cria um novo item de lista
        const novoItem = document.createElement('li');
        novoItem.textContent = `Código Patrimônio: ${codigoPatrimonio}, Responsável: ${responsavel}, Equipamento: ${equipamento}`;

        // Adiciona o botão de remoção
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.className = 'remove';
        botaoRemover.addEventListener('click', function () {
            listaEquipamentos.removeChild(novoItem);
            atualizarLinkDownload();
        });
        novoItem.appendChild(botaoRemover);

        // Adiciona o novo item à lista
        listaEquipamentos.appendChild(novoItem);

        // Limpa os campos do formulário
        form.reset();

        // Atualiza o link de download
        atualizarLinkDownload();
    }

    // Função para atualizar o link de download
    function atualizarLinkDownload() {
        const listaEquipamentosFormatada = Array.from(listaEquipamentos.children)
            .map(item => item.textContent.replace('Remover', ''))
            .join('\n');

        const blob = new Blob([listaEquipamentosFormatada], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'equipamentos.txt';

        // Remove qualquer link de download existente
        const linksAnteriores = document.querySelectorAll('.download-link');
        linksAnteriores.forEach(link => link.remove());

        // Adiciona o novo link de download
        link.className = 'download-link';
        downloadButton.parentNode.insertBefore(link, downloadButton.nextSibling);
    }

    // Adiciona o ouvinte de evento para a submissão do formulário
    form.addEventListener('submit', adicionarEquipamento);

    // Adiciona o ouvinte de evento para o botão de download
    downloadButton.addEventListener('click', atualizarLinkDownload);
});
