$(document).ready(function() {
    // Função para enviar o formulário
    $('#uploadForm').on('submit', function(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('titulo', $('#titulo').val());
        formData.append('descricao', $('#descricao').val());
        formData.append('file', $('#file')[0].files[0]);

        $.ajax({
            url: 'http://localhost:3000/documentos/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                $('#response').text('Arquivo enviado com sucesso!');
                loadDocuments(); // Recarrega a lista de documentos após o upload
            },
            error: function(xhr, status, error) {
                $('#response').text('Erro ao enviar o arquivo. Código: ' + xhr.status + ' - ' + error);
            }
        });
    });

    // Função para carregar e exibir a lista de documentos
    function loadDocuments() {
        $.ajax({
            url: 'http://localhost:3000/documentos',
            type: 'GET',
            success: function(documents) {
                $('#documentList').empty();
                documents.forEach(function(doc) {
                    $('#documentList').append(
                        '<li>' +
                        '<strong>Título:</strong> ' + doc.titulo + '<br>' +
                        '<strong>Descrição:</strong> ' + doc.descricao + '<br>' +
                        '<a href="http://localhost:3000/documentos/download/' + doc.id + '" target="_blank">Visualizar PDF</a>' +
                        '</li>'
                    );
                });
            },
            error: function(xhr, status, error) {
                $('#documentList').text('Erro ao carregar os documentos.');
            }
        });
    }

    // Carrega a lista de documentos ao carregar a página
    loadDocuments();
});
