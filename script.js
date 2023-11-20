// Array para armazenar os produtos
const produtos = [];
// Variável para controlar o ID dos produtos
let id = 0;
// Variável para armazenar o ID encontrado durante a atualização
let foundId;

// Elementos do DOM
const btnCadastrar = document.querySelector("#cadastrar");
const btnNovoProduto = document.querySelector("#new-product");
const btnAtualizar = document.querySelector("#update");

// Adiciona event listeners aos botões
btnCadastrar.addEventListener("click", cadastrarProduto);
btnNovoProduto.addEventListener("click", toggleFormInsert);
btnAtualizar.addEventListener("click", updateProduct);

// Função para cadastrar um novo produto
function cadastrarProduto() {
  // Incrementa o ID
  id += 1;
  // Obtém os valores dos inputs
  const nome = getInputValue("#nome");
  const preco = getInputValue("#preco");
  const quantidade = getInputValue("#quantidade");

  // Cria um objeto produto e o adiciona ao array de produtos
  const produto = {
    id,
    nome,
    preco,
    quantidade,
  };
  produtos.push(produto);

  // Esconde o formulário de inserção e atualiza a lista de produtos
  toggleFormInsert();
  listarProdutos();
}

// Função auxiliar para obter o valor de um input com base no seletor
function getInputValue(selector) {
  return document.querySelector(selector).value;
}

// Função para listar os produtos na tabela
function listarProdutos() {
  // Obtém o corpo da tabela
  const tbodyProdutos = document.querySelector("#tbody-produtos");
  // Limpa o corpo da tabela
  clearTable(tbodyProdutos);

  // Adiciona uma linha na tabela para cada produto no array
  produtos.forEach((produto) => {
    tbodyProdutos.innerHTML += createTableRow(produto);
  });
}

// Função para limpar o corpo da tabela
function clearTable(tableBody) {
  tableBody.innerHTML = "";
}

// Função para criar uma linha na tabela com as informações do produto
function createTableRow(produto) {
  return `
    <tr>
      <td>${produto.nome}</td>
      <td>${produto.preco}</td>
      <td>${produto.quantidade}</td> 
      <td><button class="btn-delete" onclick="deleteProduct(${produto.id})">Excluir</button></td>
      <td><button class="btn-update" onclick="getInfoProduct(${produto.id})">Atualizar</button></td>
    </tr>
  `;
}

// Função para excluir um produto com base no ID
function deleteProduct(id) {
  const index = produtos.findIndex((produto) => produto.id === id);
  if (index !== -1) {
    produtos.splice(index, 1);
  }

  // Atualiza a lista de produtos na tabela
  listarProdutos();
}

// Função para alternar a visibilidade do formulário de inserção
function toggleFormInsert() {
  toggleFormVisibility("#form-insert");
}

// Função para alternar a visibilidade do formulário de atualização
function toggleFormUpdate() {
  toggleFormVisibility("#form-update");
}

// Função para alternar a visibilidade de um formulário com base no seletor
function toggleFormVisibility(selector) {
  const form = document.querySelector(selector);
  form.classList.toggle("display-none");
  form.classList.toggle("display-flex");
}

// Função para obter informações do produto e preencher o formulário de atualização
function getInfoProduct(id) {
  foundId = id;
  toggleFormUpdate();

  // Encontra o produto no array com base no ID
  const produto = produtos.find((p) => p.id === id);
  if (produto) {
    // Preenche o formulário de atualização com as informações do produto
    setFormValues("#nomeUpdate", produto.nome);
    setFormValues("#precoUpdate", produto.preco);
    setFormValues("#quantidadeUpdate", produto.quantidade);
  }
}

// Função auxiliar para definir valores em inputs com base no seletor
function setFormValues(selector, value) {
  document.querySelector(selector).value = value;
}

// Função para atualizar as informações de um produto
function updateProduct() {
  // Encontra o índice do produto no array com base no ID
  const index = produtos.findIndex((produto) => produto.id === foundId);
  if (index !== -1) {
    // Atualiza as informações do produto
    produtos[index].nome = getInputValue("#nomeUpdate");
    produtos[index].preco = getInputValue("#precoUpdate");
    produtos[index].quantidade = getInputValue("#quantidadeUpdate");

    // Esconde o formulário de atualização
    toggleFormUpdate();
  }

  // Atualiza a lista de produtos na tabela
  listarProdutos();
}
