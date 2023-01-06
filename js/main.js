let livros = []
const urlAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
const elementoLivros = document.getElementById('livros')
const mensagemPrecoLivrosDisponiveis = document.getElementById('valor_total_livros_disponiveis')

async function getBuscarLivrosDaAPI() {
    try{
        const res = await fetch(urlAPI)
        livros = await res.json()
        let livrosComDesconto = aplicarDesconto(livros)
        criaLivros(livrosComDesconto)
        
    }catch(erro){
        console.log(erro)

    }
}

function criaLivros(listaDelivros){
    mensagemPrecoLivrosDisponiveis.innerHTML = ''
    elementoLivros.innerHTML = ''
    listaDelivros.forEach(livro => {
        let disponibilidade = livro.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel'
        elementoLivros.innerHTML += `<div class="livro">
        <img class="${disponibilidade}" src=${livro.imagem} alt="${livro.imagem}" />
        <h2 class="livro__titulo"> ${livro.titulo} </h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>`
    })
}

function aplicarDesconto(livros){
    const desconto = 0.3
    const listaLivrosNova = livros.map(livro => {
        return{...livro, preco: livro.preco - (livro.preco * desconto)}
    })
    return listaLivrosNova
}

getBuscarLivrosDaAPI()

