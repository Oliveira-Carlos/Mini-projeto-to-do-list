// HTML Elements
// Botão para abrir o modal
const btnAbrirModal = document.getElementById("btn-abrir-modal");

// Botão para fechar o modal
const btnFecharModal = document.getElementById("fechar-modal");

// Campo de busca
const inputBusca = document.getElementById("busca");

// Overlay do modal
const overlay = document.getElementById("overlay");

// Botão de submit para criar nova tarefa
const submitCriarNovaTarefa = document.getElementById("submit-criar-nova-tarefa");

// FUNCTIONS
// Abre o modal para criar nova tarefa.
function abrirModal() {
    const criarTarefa = document.getElementById("criar-tarefa");
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

// Fecha o modal de criação de nova tarefa.
function fecharModal() {
    const criarTarefa = document.getElementById("criar-tarefa");
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

// Busca todas as tarefas do servidor e insere na lista.
function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao buscar tarefas');
            }
            return res.json();
        })
        .then(data => {
            inserirTarefas(data);
        })
        .catch(error => console.error('Erro:', error));
}

// Insere tarefas na lista de tarefas do HTML.
function inserirTarefas(listaDeTarefas) {
    const lista = document.getElementById("lista"); // referencia ao elemento com id 'lista'
    lista.innerHTML = ""; // Limpa a lista antes de inserir
    listaDeTarefas.forEach(tarefa => {
        const li = document.createElement('li');
        const h5 = document.createElement('h5');
        h5.textContent = tarefa.titulo;

        const p = document.createElement('p');
        p.textContent = tarefa.descricao;

        const div = document.createElement('div');
        div.classList.add('actions');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-6 h-6 text-gray-800 dark:text-white');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>';
        svg.addEventListener('click', () => deletarTarefa(tarefa.id));

        div.appendChild(svg);
        li.appendChild(h5);
        li.appendChild(p);
        li.appendChild(div);

        lista.appendChild(li);
    });
}

// Cria uma nova tarefa e a envia para o servidor.
function novaTarefa(event) {
    event.preventDefault();
    event.stopPropagation();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    let tarefa = {
        titulo: titulo,
        descricao: descricao
    };

    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao criar tarefa');
            }
            return res.json();
        })
        .then(data => {
            fecharModal();
            buscarTarefas();

            const form = document.querySelector("#criar-tarefa form");
            form.reset();
        })
        .catch(error => console.error('Erro:', error));
}

// Deleta uma tarefa do servidor.
function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao deletar tarefa');
            }
            return res.json();
        })
        .then(res => {
            alert("Tarefa deletada");
            buscarTarefas();
        })
        .catch(error => console.error('Erro:', error));
}

// Pesquisa tarefas na lista de tarefas visível.
function pesquisarTarefa() {
    const lis = document.querySelectorAll("ul li");
    const query = inputBusca.value.toLowerCase();

    lis.forEach(li => {
        const title = li.querySelector('h5').innerText.toLowerCase();
        if (!title.includes(query)) {
            li.classList.add("oculto");
        } else {
            li.classList.remove("oculto");
        }
    });
}

// Desafio lançado pelo professor, alterar a função para pesquisar pela descrição ao invés do titulo.
// function pesquisarTarefa() {
//     const lis = document.querySelectorAll("ul li");
//     const query = inputBusca.value.toLowerCase();

//     lis.forEach(li => {
//         const descricao = li.querySelector('p').innerText.toLowerCase();
//         if (!descricao.includes(query)) {
//             li.classList.add("oculto");
//         } else {
//             li.classList.remove("oculto");
//         }
//     });
// }


// EVENTOS

// Carrega as tarefas ao iniciar a aplicação.
buscarTarefas();

// Evento para abrir o modal de criar nova tarefa.
btnAbrirModal.addEventListener("click", abrirModal);

// Evento para fechar o modal de criar nova tarefa.
btnFecharModal.addEventListener("click", fecharModal);

// Evento para fechar o modal ao clicar no overlay.
overlay.addEventListener("click", fecharModal);

// Evento para pesquisar tarefas ao digitar no campo de busca.
inputBusca.addEventListener("keyup", pesquisarTarefa);

// Evento para criar uma nova tarefa ao submeter o formulário.
submitCriarNovaTarefa.addEventListener("submit", novaTarefa);
