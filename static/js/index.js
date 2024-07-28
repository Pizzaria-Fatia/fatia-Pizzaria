document.addEventListener("DOMContentLoaded", eventos) 

function eventos() {
    // conteúdo dinamico
    const link = document.getElementsByClassName('nav-link')

    for (var i = 0; i < link.length; i++) {
        link[i].addEventListener("click", (event) => {
            event.preventDefault()
            const elemento = event.target

            const section = elemento.getAttribute('data-section')
            carregarSessao(section)
        })
    }

    /* produtos */
    clickProduto()
}


function clickProduto() {
    const produto = document.getElementsByClassName('produto')
    for (var i = 0; i < produto.length; i++) {
        produto[i].addEventListener("click", mostrar_detalhes)
    }
}

function carregarSessao(section) {
    const conteiner = document.getElementsByClassName('catalogo')[0]
    fetch(`/${section}`)
        .then(response => response.text())
        .then(html => {
            conteiner.innerHTML = html;
            const sections = document.getElementsByClassName('section');
            for(var i = 0; i < sections.length; i++) {
                sections[i].style.display = 'none'
            };
            document.getElementById(section).style.display = 'flex';
            clickProduto()
        })
        .catch(error => console.error('Erro ao carregar a seção:', error));
        
}

function mostrar_detalhes(event) {
    let btn = event.currentTarget
    let nome = btn.getElementsByClassName('nome-produto')[0].innerText
    let preco = btn.getElementsByClassName('preco-produto')[0].innerText
    let img = btn.getElementsByTagName('img')[0].src
    let ex = document.getElementsByClassName('detalhes')
    for (var i = 0; i < ex.length; i++) {
        ex[i].remove()
    }
    const catalogo = document.getElementsByClassName('section')[0]
    let detalhes = document.createElement('div')
    if (catalogo.classList.contains('pizzas')){
        detalhes.innerHTML = `
        <span class="material-symbols-outlined fexar-detalhes">close</span>
        <div>
            <img src="${img}" alt="calabresa">
            <div class="conteudo">
                <div class="dados">
                    <h3>Pizza de <span class="nome-produto">${nome}</span></h3>
                    <p>R$ <span class="preco-produto">${preco}</span> un.</p>
                    <button class="adicionar-carrinho"><span class="material-symbols-outlined">shopping_cart</span></button>
                </div>
                <form action="" class="borda">
                    <h4>Selecione a borda</h4>
                    <label for="chedar"><input class="opcao" type="checkbox" name="chedar" id="chedar"> Chedar</label>
                    <label for="catupiry"><input class="opcao" type="checkbox" name="catupiry" id="catupiry"> Catupiry</label>
                </form>
            </div>
        </div>
        `
    } else {
        detalhes.innerHTML = `
        <span class="material-symbols-outlined fexar-detalhes">close</span>
        <div>
            <img src="${img}" alt="calabresa">
            <div class="conteudo">
                <div class="dados">
                    <h3>Pizza de <span class="nome-produto">${nome}</span></h3>
                    <p>R$ <span class="preco-produto">${preco}</span> un.</p>
                    <button class="adicionar-carrinho"><span class="material-symbols-outlined">shopping_cart</span></button>
                </div>
            </div>
        </div>
        `
    }
    detalhes.classList.add('detalhes')
    let fexar = detalhes.getElementsByClassName('fexar-detalhes')[0]
    fexar.addEventListener("click", () => {
        detalhes.remove()
    })

    if (catalogo.classList.contains('pizzas')) {
        const opcoes = detalhes.getElementsByClassName('opcao')
        for (var i = 0; i < opcoes.length; i++) {
            opcoes[i].addEventListener('change', function () {
                if (this.checked) {
                    for (var i = 0; i < opcoes.length; i++) {
                        if (opcoes[i] !== this) {
                            opcoes[i].checked = false;
                        }
                    };
                }
            });
        }
    }

    let adicionar = detalhes.getElementsByClassName('adicionar-carrinho')[0]
    adicionar.addEventListener("click", adicionarAoCarrinho)

    catalogo.append(detalhes)
}

function adicionarAoCarrinho(event) {
    const catalogo = document.getElementsByClassName('section')[0]
    const btn = event.target
    const div = btn.parentElement.parentElement.parentElement
    const img = div.getElementsByTagName('img')[0].src
    const nome = div.getElementsByClassName('nome-produto')[0].innerText
    let preco = div.getElementsByClassName('preco-produto')[0].innerText
    preco = +preco
    let borda = null
    if (catalogo.classList.contains('pizzas')) {
        const opcoes = div.getElementsByClassName('opcao')
        for (var i = 0; i < opcoes.length; i++) {
            if (opcoes[i].checked) {
                borda = opcoes[i].parentElement.innerText
                preco += 5
            }
        }
    }
    preco = preco.toFixed(2)

    const dados = {'nome': nome, 'img': img, 'preco': preco, 'borda': borda, 'quantidade': 1}

    fetch('/carrinhoAdd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .catch(error => console.error('Error:', error))

    div.parentElement.remove();
    
    alert('Adicionado ao carrinho')
}




// const btnAdicionar = document.getElementsByClassName('carrinho-add')
    // for (var i = 0; i < btnAdicionar.length; i++) {
    //     btnAdicionar[i].addEventListener("click", adicionarAoCarrinho)
    // }
    
    // const btnRemover = document.getElementsByClassName('btn-remover')
    // for (var i = 0; i < btnRemover.length; i++) {
    //     btnRemover[i].addEventListener("click", removerProduto)
    // }

    // const qtdProduto = document.getElementsByClassName('qtd-produto')
    // for (var i = 0; i < qtdProduto.length; i++) {
    //     qtdProduto[i].addEventListener("change", atualizarTotal)
    // }

    // const btnFinalizarPedido = document.getElementById('finalizar-pedido')
    // btnFinalizarPedido.addEventListener('click', finalizarPedido)

// function atualizarTotal() {
//     let totalPedido = 0
//     let totItens = 0
//     const produtosNoCarrinho = document.getElementsByClassName('produto-carrinho')
//     for (var i = 0; i < produtosNoCarrinho.length; i++) {
//         const precoProduto = produtosNoCarrinho[i].getElementsByClassName('preco-produto-carrinho')[0].innerText
//         const qtdProduto = produtosNoCarrinho[i].getElementsByClassName('qtd-produto')[0].value

//         totItens += +qtdProduto

//         totalPedido += precoProduto * qtdProduto
//     }
//     totalPedido = totalPedido.toFixed(2)
//     document.getElementById('tota-pedido').innerText = totalPedido
//     document.getElementById('qtd-itens').innerText = totItens
// }

// function adicionarAoCarrinho(event) {
//     const butao = event.target
//     const dadosProduto = butao.parentElement.parentElement
//     const nome = dadosProduto.getElementsByClassName("nome-produto")[0].innerText
//     const tamanho = dadosProduto.getElementsByClassName("tamanho-produto")[0].innerText
//     const preco = dadosProduto.getElementsByClassName("preco-produto")[0].innerText

//     const nomeProdutoCarrinho = document.getElementsByClassName('nome-produto-carrinho')
//     for (var i = 0; i < nomeProdutoCarrinho.length; i++) {
//         if (nomeProdutoCarrinho[i].innerText == nome) {
//             nomeProdutoCarrinho[i].parentElement.getElementsByClassName('qtd-produto')[0].value++
//             atualizarTotal()
//             return
//         }
//     }

//     let novoProduto = document.createElement("div")
//     novoProduto.classList.add("item-n-carrinho")

//     novoProduto.innerHTML = 
//     `
//         <div class="produto-carrinho">
//             <div>
//                 <h4 class="nome-produto-carrinho">${nome}</h4>
//                 <p class="tamanho-produto-carrinho">${tamanho}</p>
//                 <p>Quantidade: <input type="number" name="qtd" value="1" min="1" class="qtd-produto"></p>
//                 <p>R$ <span class="preco-produto-carrinho">${preco}</span></p>
//             </div>
//             <button class="btn-remover">remover</button>
//         </div>
//     `

//     const containerCarrinho = document.getElementById("container-carrinho")
//     containerCarrinho.append(novoProduto)
//     atualizarTotal()
//     novoProduto.getElementsByClassName('qtd-produto')[0].addEventListener("change", atualizarTotal)
//     novoProduto.getElementsByClassName('btn-remover')[0].addEventListener("click", removerProduto)
// }

// function removerProduto(event) {
//     event.target.parentElement.remove()
//     atualizarTotal()
// }

// function finalizarPedido(event) {
//     const btn = event.target
//     const infos = btn.parentElement.parentElement
//     const elementNome = infos.getElementsByClassName('nome-produto-carrinho')
//     const elementQtd = infos.getElementsByClassName('qtd-produto')
//     const elementPreco = infos.getElementsByClassName('preco-produto-carrinho')
//     const elementTamanho = infos.getElementsByClassName('tamanho-produto-carrinho')
//     const total = document.getElementById('tota-pedido').innerText
//     let dados = []
//     for(var i = 0; i < elementNome.length; i++) {
//         let nome = elementNome[i].innerText
//         let Qtd = elementQtd[i].value
//         let preco = elementPreco[i].innerText
//         let tamanho = elementTamanho[i].innerText
//         dados.push({'nome': nome, 'quantidade': Qtd,'preco': preco, 'tamanho': tamanho})
//     }
//     let mensagem = "Olá gostaria de fazer um pedido:\n\n"
//     for(var i = 0; i < dados.length; i++) {
//         let produto = dados[i]
//         mensagem += `${produto['quantidade']}x ${produto['nome']} ${produto['tamanho']} R$${produto['preco']} \n`
//     }
//     mensagem += `\nTotal: R$${total}`

//     const msgCod = encodeURIComponent(mensagem)
//     window.location.href = `https://wa.me/5561984464789/?text=${msgCod}`
// }

/* produtos */
