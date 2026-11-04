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
tables = [table[0] for table in tables if table[1]]
print(tables)
parts = os.listdir("parts")
print(parts)

# Dodaj potem try/except

for filename in parts:
    num = int(filename[0:3])
    if not num in tables:
        with open(f"parts/{filename}", 'r') as f:
            cursor.execute(f.read())
            cursor.execute(f"INSERT INTO migrations (ID, applied) VALUES ({num}, 1)")
mydb.commit()
cursor.close()