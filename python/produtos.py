from python.conexao import criar_conexao

con = criar_conexao()

def listaPizzas():
    try:
        cursor = con.cursor()
        sql = "select * from pizzas"
        cursor.execute(sql)
        pizzas = cursor.fetchall()
        cursor.close()
    except:
        pizzas = 'Erro'
    return pizzas


def listaMiniPizza():
    try:
        cursor = con.cursor()
        sql = "select * from miniPizza"
        cursor.execute(sql)
        miniPizza = cursor.fetchall()
        cursor.close()
    except:
        miniPizza = 'Erro'
    return miniPizza


def listaBebidas():
    try:
        cursor = con.cursor()
        sql = "select * from bebidas"
        cursor.execute(sql)
        bebidas = cursor.fetchall()
        cursor.close()
    except:
        bebidas = 'Erro'
    return bebidas