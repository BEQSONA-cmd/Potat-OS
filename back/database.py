import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("UPDATE users SET username = 'beqa' WHERE id = 1")
conn.commit()

conn.close()