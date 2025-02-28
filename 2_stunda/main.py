import csv

with open("2_stunda/Dalibnieki.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)

    agesum = 0
    totaldrivers = 0

    cars = {}
    totalcars = 0

    for row in reader:
        if reader.line_num == 1:
            continue

        split = row[0].split(";")
        if 0 <= 8 < len(split) and split[8] != "":
            agesum += int(split[8])
            totaldrivers += 1

        if 0 <= 3 < len(split) and split[3] != "":
            if split[3] not in cars:
                cars[split[3]] = 1
            else:
                cars[split[3]] += 1
            totalcars += 1

    print(f"Vidējais vecums: {round(agesum / totaldrivers)}")
    print(f"Kopējais autovadītāju skaits: {totaldrivers}")
    print(f"Kopējais auto skaits: {totalcars}")
    vw_avg = cars.get("VW", 0) / totalcars
    print(f"VW auto īpatsvars: {round(vw_avg * 100)}%")
