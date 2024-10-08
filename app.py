from flask import Flask, render_template, url_for, request, session, redirect, jsonify
from python.produtos import listaPizzas, listaMiniPizza, listaBebidas
import os

app = Flask(__name__)
app.secret_key = os.urandom(24) 

@app.route('/')
def home():
    " página principal "
    pizzas = listaPizzas()
    return render_template('index.html', pizzas=pizzas)


@app.route('/limparCarrinho', methods=['POST'])
def limparCarrinho():
    session.pop('carrinho')
    return jsonify({'status': 'ok', 'mensagem': 'limpou o carrinho'}), 200


@app.route('/carrinhoAdd', methods=['POST'])
def carrinhoAdd():
    dados = request.get_json()
    carrinho = session.get('carrinho', [])
    if dados not in carrinho:
        carrinho.append(dados)
    session['carrinho'] = carrinho
    return jsonify({'status': 'ok', 'dados': dados}), 200


@app.route('/carrinhoRemove', methods=['POST'])
def carrinhoRemove():
    dados = request.get_json()
    carrinho = session.get('carrinho', [])
    carrinho = [item for item in carrinho if item['nome'] != dados['nome'] and item['preco'] != dados['preco']]
    session['carrinho'] = carrinho
    return jsonify({'status': 'ok', 'dados': dados}), 200


@app.route('/carrinho')
def carrinho():
    " mostra o carrinho "
    itens = session.get('carrinho', [])
    return render_template('carrinho.html', itens=itens)


@app.route('/pizzas')
def pizzas():
    " página das mini pizzas "
    pizzas = listaPizzas()
    if pizzas == 'Erro':
        return 'ERRO ao carregar a página'
    else:
        return render_template('pizzas.html', pizzas=pizzas)


@app.route('/miniPizzas')
def miniPizzas():
    " página das mini pizzas "
    minipizza = listaMiniPizza()
    if minipizza == 'Erro':
        return 'ERRO ao carregar a sessão Mini Pizzas'
    else:
        return render_template('miniPizzas.html', minipizza=minipizza)


@app.route('/brotinho')
def brotinho():
    " página das mini pizzas "
    return render_template('brotinho.html')


@app.route('/bebidas')
def bebidas():
    " página das mini pizzas "
    bebidas = listaBebidas()
    if bebidas == 'Erro':
        return 'ERRO ao carregar a sessão Bebidas'
    else:
        return render_template('bebidas.html', bebidas=bebidas)

if __name__ == '__main__':
    app.run(debug=True)