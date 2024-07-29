from python.conexao import criar_conexao

con = criar_conexao()

def listaPizzas():
    try:
        cursor = con.cursor()
        sql = "select * from pizzas"
        cursor.execute(sql)
        pizzas = cursor.fetchall()
    except:
        pizzas = 'Erro'
    return pizzas


def listaMiniPizza():
    try:
        cursor = con.cursor()
        sql = "select * from miniPizza"
        cursor.execute(sql)
        miniPizza = cursor.fetchall()
    except:
        miniPizza = 'Erro'
    return miniPizza


def listaBebidas():
    try:
        cursor = con.cursor()
        sql = "select * from bebidas"
        cursor.execute(sql)
        bebidas = cursor.fetchall()
    except:
        bebidas = 'Erro'
    return bebidas