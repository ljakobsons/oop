import csv

with open("3_stunda/dati_100.csv", "r", encoding="utf-8") as f:
    data = csv.reader(f, delimiter=",", quotechar='"')
    next(data)
    for row in data:
        print(row)
