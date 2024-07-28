document.addEventListener("DOMContentLoaded", eventos) 


function eventos() {
    atualizaTotal()

    const qtd = document.getElementsByClassName('qtd')
    for (var i = 0; i < qtd.length; i++) {
        qtd[i].addEventListener("change", atualizaTotal)
    }

    clickRemove()

    const btn_finalizar = document.getElementById('finalizar')
    btn_finalizar.addEventListener("click", () => {
        alert('Ops, Infelizmente estamos fexados!')
    })
}

function clickRemove() {
    const btnRemover = document.getElementsByClassName('remover')
    for (var i = 0; i < btnRemover.length; i++){
        btnRemover[i].addEventListener("click", removerDoCarrinho)
    }
}

function removerDoCarrinho(event) {
    const btn = event.target
    const div = btn.parentElement
    const nome = div.getElementsByTagName('h3')[0].innerText
    const preco = div.getElementsByTagName('span')[0].innerText

    const dados = {'nome': nome, 'preco': preco}

    fetch('/carrinhoRemove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .catch(error => console.error('Error:', error))

    div.remove()

    atualizaTotal()
}

function atualizaTotal() {
    let total = 0

    const produtos = document.getElementsByClassName('carrinho-container')
    for (var i = 0; i < produtos.length; i++) {
        const preco = produtos[i].getElementsByTagName('span')[0].innerText
        const quant = produtos[i].getElementsByClassName('qtd')[0].value
        total += +preco * +quant
    }

    total = total.toFixed(2)

    document.getElementById('total').innerText = total
}