from python.conexao import criar_conexao

con = criar_conexao()

def listaPizzas():
    cursor = con.cursor()
    sql = "select * from pizzas"
    cursor.execute(sql)
    pizzas = cursor.fetchall()
    return pizzas


def listaMiniPizza():
    cursor = con.cursor()
    sql = "select * from miniPizza"
    cursor.execute(sql)
    miniPizza = cursor.fetchall()
    return miniPizza


def listaBebidas():
    cursor = con.cursor()
    sql = "select * from bebidas"
    cursor.execute(sql)
    bebidas = cursor.fetchall()
    return bebidas