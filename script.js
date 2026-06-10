const API_URL = 'http://localhost:3000/eventos';

let eventos = [];
let eventoSelecionado = null;

function toggleModal(id, show) {
    const modal = document.getElementById(id);

    if (show) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');

    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');

    }

}

async function carregarEventos() {
    try {

        const response =
            await fetch(`${API_URL}/listar`);

        if (!response.ok) {
            throw new Error();
        }

        eventos =
            await response.json();
        renderizarEventos();

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar eventos');

    }
}

function renderizarEventos() {

    const grid =
        document.getElementById('grid-eventos');
    grid.innerHTML = '';
    document.getElementById('count-ativos').innerText =
        eventos.length;

    const capacidade =
        eventos.reduce((acc, item) => {

            return acc + Number(item.capacidade_maxima);

        }, 0);

    document.getElementById('count-capacidade').innerText =
        capacidade;

    if (eventos.length > 0) {

        document.getElementById('next-event').innerText =
            eventos[0].titulo;

    }

    eventos.forEach(evento => {
        grid.innerHTML += `
        
            <div class="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                <div class="flex justify-between items-center">
                    <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                        ${evento.status}
                    </span>
                    <span class="text-sm text-gray-500">
                        ${formatarData(evento.data_evento)}
                    </span>
                </div>

                <div>

                    <h2 class="text-2xl font-bold">
                        ${evento.titulo}
                    </h2>
                    <p class="text-gray-500 mt-2">
                        ${evento.descricao || ''}
                    </p>

                </div>

                <p class="text-gray-500">
                     ${evento.local}
                </p>

                <p class="text-gray-500">
                    ${evento.capacidade_maxima}
                </p>

                <div class="flex gap-2">

                    <button
                        onclick="abrirEdicao(${evento.id})"
                        class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl w-full"
                    >
                        Editar
                    </button>

                    <button
                        onclick="excluirEvento(${evento.id})"
                        class="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl w-full"
                    >
                        Excluir
                    </button>

                </div>

            </div>
        
        `;

    });

}

function formatarData(data) {
    return new Date(data)
        .toLocaleDateString('pt-BR');

}

document
    .getElementById('formCadastro')
    .addEventListener('submit', cadastrarEvento);

async function cadastrarEvento(e) {

    e.preventDefault();

    const novoEvento = {

        titulo:
            document.getElementById('titulo').value,

        descricao:
            document.getElementById('descricao').value,

        data_evento:
            document.getElementById('data_evento').value,

        local:
            document.getElementById('local').value,

        capacidade_maxima:
            Number(
                document.getElementById('capacidade_maxima').value
            ),

        status:
            document.getElementById('status').value

    };

    try {

        const response =
            await fetch(`${API_URL}/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoEvento)

            });

        if (!response.ok) {
            throw new Error();
        }

        alert('Evento cadastrado');

        document
            .getElementById('formCadastro')
            .reset();

        toggleModal('modalCadastro', false);
        carregarEventos();

    } catch (error) {
        console.log(error);
        alert('Erro ao cadastrar');

    }

}

function abrirEdicao(id) {

    const evento =
        eventos.find(item => item.id == id);

    eventoSelecionado = id;

    document.getElementById('editTitulo').value =
        evento.titulo;

    document.getElementById('editDescricao').value =
        evento.descricao;

    document.getElementById('editDataEvento').value =
        evento.data_evento.split('T')[0];

    document.getElementById('editLocal').value =
        evento.local;

    document.getElementById('editCapacidadeMaxima').value =
        evento.capacidade_maxima;

    document.getElementById('editStatus').value =
        evento.status;

    document.getElementById('btn-excluir').onclick =
        () => excluirEvento(id);

    toggleModal('modalDetalhes', true);

}

async function salvarEdicao() {

    const eventoAtualizado = {

        titulo:
            document.getElementById('editTitulo').value,

        descricao:
            document.getElementById('editDescricao').value,

        data_evento:
            document.getElementById('editDataEvento').value,

        local:
            document.getElementById('editLocal').value,

        capacidade_maxima:
            Number(
                document.getElementById('editCapacidadeMaxima').value
            ),

        status:
            document.getElementById('editStatus').value

    };

    try {
        console.log(eventoAtualizado);
        const response =
            await fetch(
                `${API_URL}/atualizar/${eventoSelecionado}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventoAtualizado)
                }
            )

        const data = await response.json();

        

        if (!response.ok) {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Erro ao atualizar evento');
            }
            return;
        }

        if (data.status === "ENCERRADO") {
            alert('Evento encerrado e inscrições finalizadas');

        } else {
            alert('Evento atualizado');

        }

        toggleModal('modalDetalhes', false);
        carregarEventos();

    } catch (error) {
        console.log(error);
        alert('Erro ao atualizar');

    }

}


async function excluirEvento(id) {
    const confirmar =
        confirm('Deseja excluir este evento?');

    if (!confirmar) {
        return;
    }

    try {
        const response =
            await fetch(
                `${API_URL}/excluir/${id}`,
                {
                    method: 'DELETE'
                }
            );
        const data =
            await response.json();

        if (!response.ok) {
            if (data.error === "Evento não encontrado") {
                alert("Evento não encontrado");

            } else if (data.error === "Evento já aconteceu e não pode ser excluído") {
                alert("Evento já aconteceu e não pode ser excluído");

            } else if (data.error === "Evento possui participantes e não pode ser excluído") {
                alert("Evento possui participantes e não pode ser excluído");

            } else {
                alert("Erro ao excluir evento");
            }
            return;

        }
        alert('Evento excluído');
        toggleModal('modalDetalhes', false);
        carregarEventos();

    } catch (error) {
        console.log(error);
        alert('Erro ao excluir evento');

    }

}


carregarEventos();