$(document).ready(function () {
    // Função para carregar as tarefas
    function loadTasks() {
        $.get('http://localhost:3000/api/task', function (tasks) {  
            // Limpa as listas de tarefas antes de popular
            $('#todo-tasks').empty();
            $('#doing-tasks').empty();
            $('#done-tasks').empty();

            // Adiciona as tarefas nas respectivas colunas
            tasks.forEach(function (task) {
                // Buscar o nome do usuário pelo ID
                $.get(`http://localhost:3000/api/user/${task.user_id}`, function (user) {
                    // Adiciona o nome do usuário à tarefa
                    let taskElement = `<div class="task-card" data-id="${task.id}">
                        <p><strong>Descrição:</strong> ${task.description}</p>
                        <p><strong>Setor:</strong> ${task.sector}</p>
                        <p><strong>Prioridade:</strong> ${task.priority}</p>
                        <p><strong>Usuário:</strong> ${user.name}</p>  <!-- Exibe o nome do usuário -->
                        <p><strong>Status:</strong> ${task.status}</p>
                        <div class="status-buttons">
                            <button class="btn btn-outline-primary status-btn" data-status="A fazer" ${task.status === 'A fazer' ? 'disabled' : ''}>A Fazer</button>
                            <button class="btn btn-outline-warning status-btn" data-status="Fazendo" ${task.status === 'Fazendo' ? 'disabled' : ''}>Fazendo</button>
                            <button class="btn btn-outline-success status-btn" data-status="Feito" ${task.status === 'Feito' ? 'disabled' : ''}>Feito</button>
                        </div>
                        <button class="btn btn-secondary edit-btn">Editar</button>
                        <button class="btn btn-danger delete-btn">Excluir</button>
                    </div>`;

                    if (task.status === 'A fazer') {
                        $('#todo-tasks').append(taskElement);
                    } else if (task.status === 'Fazendo') {
                        $('#doing-tasks').append(taskElement);
                    } else {
                        $('#done-tasks').append(taskElement);
                    }
                });
            });
        });
    }

    // Chama a função de carregamento de tarefas quando a página é carregada
    loadTasks();

    // Evento de clique no botão de status (A Fazer, Fazendo, Feito)
    $(document).on('click', '.status-btn', function () {
        var taskId = $(this).closest('.task-card').data('id');
        var newStatus = $(this).data('status');

        // Envia a requisição PUT para atualizar o status da tarefa
        $.ajax({
            url: `http://localhost:3000/api/task/${taskId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ status: newStatus }),
            success: function () {
                // Atualiza a lista de tarefas após a mudança de status
                loadTasks();
            },
            error: function (err) {
                console.error('Erro ao atualizar o status:', err);
            }
        });
    });

    // Evento de clique no botão de editar tarefa
    $(document).on('click', '.edit-btn', function () {
        var taskId = $(this).closest('.task-card').data('id');
        console.log('Editando tarefa com ID:', taskId);
    
        // Requisição para obter os dados da tarefa
        $.get(`http://localhost:3000/api/task/${taskId}`, function (task) {
            console.log('Dados da tarefa recebidos:', task);
    
            // Preenche os campos do modal de edição
            $('#taskDescription').val(task.description);
            $('#taskSector').val(task.sector);
            $('#taskPriority').val(task.priority);
            $('#taskUser').val(task.user_id);  // Usando a ID do usuário
            $('#taskStatus').val(task.status);
            $('#editTaskForm').data('taskId', task.id);
    
            // Exibe o modal de edição
            $('#editTaskModal').modal('show');
        }).fail(function () {
            console.error("Erro ao obter os dados da tarefa");
        });
    });
    
    // Evento de submit no formulário de edição
    $('#editTaskForm').on('submit', function (e) {
        e.preventDefault();  // Evita o envio padrão do formulário
    
        // Obtém o ID da tarefa a ser atualizada
        var taskId = $(this).data('taskId');
        console.log('Atualizando tarefa com ID:', taskId);
    
        // Cria o objeto com os dados atualizados
        var updatedTask = {
            description: $('#taskDescription').val(),
            sector: $('#taskSector').val(),
            priority: $('#taskPriority').val(),
            user_id: $('#taskUser').val(),  // Usando o ID do usuário
            status: $('#taskStatus').val()
        };
    
        // Envia a requisição PUT para atualizar a tarefa
        $.ajax({
            url: `http://localhost:3000/api/task/${taskId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedTask),
            success: function () {
                console.log('Tarefa atualizada com sucesso!');
                // Atualiza a lista de tarefas ou fecha o modal
                $('#editTaskModal').modal('hide');
            },
            error: function (err) {
                console.error('Erro ao atualizar a tarefa:', err);
            }
        });
    });
    
    

    // Evento de submit no formulário de edição
    $('#editTaskForm').on('submit', function (e) {
        e.preventDefault();
        var taskId = $(this).data('taskId');
        var updatedTask = {
            description: $('#taskDescription').val(),
            sector: $('#taskSector').val(),
            priority: $('#taskPriority').val(),
            user_id: $('#taskUser').val(),  // Enviar o ID do usuário no campo `user_id`
            status: $('#taskStatus').val()
        };

        // Envia a requisição PUT para atualizar a tarefa
        $.ajax({
            url: `http://localhost:3000/api/task/${taskId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedTask),
            success: function () {
                // Atualiza as tarefas e fecha o modal
                loadTasks();
                $('#editTaskModal').modal('hide');
            },
            error: function (err) {
                console.error('Erro ao editar a tarefa:', err);
            }
        });
    });

    // Evento de clique no botão de excluir tarefa
    $(document).on('click', '.delete-btn', function () {
        var taskId = $(this).closest('.task-card').data('id');
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Essa tarefa será excluída!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://localhost:3000/api/task/${taskId}`,
                    type: 'DELETE',
                    success: function () {
                        // Atualiza a lista de tarefas após a exclusão
                        loadTasks();
                    },
                    error: function (err) {
                        console.error('Erro ao excluir a tarefa:', err);
                        loadTasks();
                    }
                });
            }
        });
    });
});
