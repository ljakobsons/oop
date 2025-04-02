First_Name = ["Jānis", "Juris", "Andris", "Kārlis", "Pēteris"]

with open("vardi.txt", "w", encoding="utf-8") as f:
    for vards in First_Name:
        f.write(vards + "\n")

