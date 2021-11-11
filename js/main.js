'use strict'

//localstorage so trabalha com string, para enviar para la, precisa trasnformar os objetos da array em strings.
//a mesma coisa para pegar os dados do localstorage para a aplicação, preciso converter pra array de novo.
//get - pegar / set - enviar
//JSON.parse converte string para JSON(array)   /   JSON.strindfy converte para string
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; //Se tiver algum item ja armazenado no localStorage chamado todoList, usar ele, se nao, usar um vazio para começar a armazenar os novos dados.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));


//cria uma label com o nome da tarefa, status e indice e acopla como filho de todoList que esta no html.
const criarItem = (tarefa, status='', indice) => {
    const item = document.createElement('label'); //cria label e acompla a variavel item
    item.classList.add('todo__item'); //adiciona a classe todo__item a label criada 
    item.innerHTML = ` 
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}


//Função que ativa com o click do botão X de determinada tarefa.
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

//Os novos itens não aparecem la tela graças a função criarItem, e sim graças a essa, que percorre a array do banco e cria os itens na tela baseado no que tem la.
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach( (item, indice) => criarItem (item.tarefa, item.status, indice)); //pega os itens do banco e exibe na tela usando a função criarItem
}

//Verifica se a tecla pressionada é o Enter e se for, envia para o banco (atraves do push) a tarefa e status.
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}


const inserirItemClick = () => {
    var newItem = document.getElementById('newItem');
    const texto = newItem.value;
    const banco = getBanco();
    banco.push({'tarefa': texto, 'status': ''});
    setBanco(banco);
    atualizarTela();
    newItem.value = '';
}


//Remove o item do banco atraves do indice dele. Essa função ativa no click do X de determinado indice.
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

//Atualiza o checked dos itens.
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

//Ativa os clicks. Se for no botao X roda a função removerItem e deleta a tarefa, se for no checkbox roda a função de atualziar o checkbox.
const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

//Adiciona os "ouvidores de eventos"
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('btn').addEventListener('click', inserirItemClick);

//Atualiza a tela, essa função precisa rodar toda vez.
atualizarTela();