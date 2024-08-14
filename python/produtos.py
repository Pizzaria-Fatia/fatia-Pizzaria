from python.conexao import criar_conexao, fexar_conexão


def listaPizzas():
    try:
        con = criar_conexao()
        cursor = con.cursor()
        sql = "select * from pizzas"
        cursor.execute(sql)
        pizzas = cursor.fetchall()
        cursor.close()
        fexar_conexão(con)
    except:
        pizzas = 'Erro'
    return pizzas


def listaMiniPizza():
    try:
        con = criar_conexao()
        cursor = con.cursor()
        sql = "select * from miniPizza"
        cursor.execute(sql)
        miniPizza = cursor.fetchall()
        cursor.close()
        fexar_conexão(con)
    except:
        miniPizza = 'Erro'
    return miniPizza


def listaBebidas():
    try:
        con = criar_conexao()
        cursor = con.cursor()
        sql = "select * from bebidas"
        cursor.execute(sql)
        bebidas = cursor.fetchall()
        cursor.close()
        fexar_conexão(con)
    except:
        bebidas = 'Erro'
    return bebidas