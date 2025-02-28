class kubs:
    def __init__(self, garums, krasa):
        if garums <= 0:
            print("Mala nedrīkst būt īsaka vai vienāda ar 0")
            return None

        self.garums = garums
        self.krasa = krasa
        print("Kubs izveidots")

    def tilpums(self):
        return self.garums**3

    def iznicinat(self):
        del self
        print("Kubs iznicināts")


kubg = kubs(10, "zaļa")
kubr = kubs(1, "sarkana")

print(f"kubg krasa - {kubg.krasa}, tilp - {kubg.tilpums()}")
print(f"kubr malas garums - {kubr.garums}")

kubr.iznicinat()
print(kubg.garums)


class bloks(kubs):
    def __init__(self, garums, krasa, skaits):
        super().__init__(garums, krasa)

        skaits = max(1, skaits)
        skaits = min(4, skaits)
        self.skaits = skaits

        self.nosaukums = f"{krasa}{skaits}"
        self.forma = f"{(skaits//4)+1}{(skaits%4)+1}"
        self.derigums = self.irDerigs()

    def tilpums(self):
        return self.garums**3 * self.skaits

    def iznicinat(self):
        del self
        print("Bloks iznicināts")

    def irDerigs(self):
        return True
