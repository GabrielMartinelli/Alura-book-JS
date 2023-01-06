const btnBotao = document.querySelectorAll("[data-categoria]")

btnBotao.forEach(btn => btn.addEventListener('click', () => acoesBotoes(btn.dataset.categoria) ))

function acoesBotoes(categoria){
    let livrosCategoria

    if (categoria == 'ordenar'){
        livrosCategoria = ordenarLivros(livrosCategoria)
    }else if (categoria == 'disponiveis'){
        livrosCategoria = filtraLivrosDisponiveis(livrosCategoria)
        somarLivrosDisponiveis(livrosCategoria)
    }else{
        livrosCategoria = filtrarLivros(livrosCategoria, categoria)
    }

}

function filtrarLivros(livrosCategoria, categoria) {
    livrosCategoria = livros.filter(livro => livro.categoria == categoria)
    criaLivros(livrosCategoria)
}

function somarLivrosDisponiveis(livrosCategoria) {
    valorTotalDisponiveis = livrosCategoria.reduce((acc, atual) => acc + atual.preco, 0).toFixed(2)
    criaLivros(livrosCategoria)
    mensagemPrecoLivrosDisponiveis.innerHTML =
        `
        <div class="livros__disponiveis">
          <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotalDisponiveis}</span></p>
        </div>
        `
}

function filtraLivrosDisponiveis(livrosCategoria) {
    livrosCategoria = livros.filter(livro => livro.quantidade > 0)
    return livrosCategoria
}

function ordenarLivros(livrosCategoria) {
    livrosCategoria = livros.sort((a, b) => a.preco - b.preco)
    criaLivros(livrosCategoria)
}

