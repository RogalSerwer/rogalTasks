import mysql.connector
import os
import time

# SQL data
DATABASE = os.getenv("DATABASE")
HOST = "db"
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("PASSWORD")

time.sleep(5)
mydb = mysql.connector.connect(
    host=HOST, port=3306, user=USER, password=PASSWORD, database=DATABASE
)
cursor = mydb.cursor()
cursor.execute("SHOW TABLES")
tables = cursor.fetchall()
tableFound = False
for table in tables:
    if table[0]=="migrations":
        tableFound = True
        break;

if not tableFound:
    with open("migrationInit.sql") as f:
        init = f.read()
        cursor.execute(init)

cursor.execute("SELECT * FROM migrations;")
tables = cursor.fetchall()
print(tables);
cursor.close()