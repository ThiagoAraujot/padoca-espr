const produtos = [];
let id = 0;

const btnCadastrar = document.querySelector("#cadastrar");
const btnNovoProduto = document.querySelector("#new-product");

btnCadastrar.addEventListener("click", cadastrarProduto);
btnNovoProduto.addEventListener("click", toggleFormInsert);

function cadastrarProduto() {
  id += 1;
  const nome = document.querySelector("#nome").value;
  const preco = document.querySelector("#preco").value;
  const quantidade = document.querySelector("#quantidade").value;

  const produto = {
    id,
    nome,
    preco,
    quantidade,
  };

  produtos.push(produto);

  toggleFormInsert();
  listarProdutos();
}

function listarProdutos() {
  const tbodyProdutos = document.querySelector("#tbody-produtos");
  tbodyProdutos.innerHTML = "";
  for (let i = 0; i < produtos.length; i++) {
    tbodyProdutos.innerHTML += `
        <tr>
          <td>${produtos[i].nome}</td>
          <td>${produtos[i].preco}</td>
          <td>${produtos[i].quantidade}</td> 
          <td><button onclick="deleteProduct(${produtos[i].id})">Excluir</button></td>
        </tr> 
    `;
  }
}

function deleteProduct(id) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].id === id) {
      produtos.splice(i, 1);
      break;
    }
  }

  listarProdutos();
}
function toggleFormInsert() {
  const formInsert = document.querySelector("#form-insert");

  formInsert.classList.toggle("display-none");
  formInsert.classList.toggle("display-flex");
}
