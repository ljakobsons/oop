class Triangle:
    def __init__(self, a, b, c, color="transparent"):
        self.a = a
        self.b = b
        self.c = c
        self.color = color
        self.valid = self.isValid()

    def perimeter(self):
        if not self.valid:
            raise ValueError("Triangle is not valid")

        return self.a + self.b + self.c

    def area(self):
        if not self.valid:
            raise ValueError("Triangle is not valid")

        p = self.perimeter() / 2
        return (p * (p - self.a) * (p - self.b) * (p - self.c)) ** 0.5

    def showSides(self):
        print(f"Sides: {self.a}, {self.b}, {self.c}")

    def showColor(self, color):
        print(f"Color: {color}")

    def isValid(self):
        if (
            self.a + self.b > self.c
            and self.a + self.c > self.b
            and self.b + self.c > self.a
        ):
            return True
        else:
            return False


class straightTriangle(Triangle):
    def __init__(self, a, b, c, color="transparent"):
        super().__init__(a, b, c, color)
        self.valid = self.isValid()

    def isValid(self):
        if super().isValid() and self.a ** 2 + self.b**2 == self.c**2:
            return True
        else:
            return False


triangles = [
    Triangle(3, 4, 5, "red"),
    Triangle(5, 12, 13),
    Triangle(8, 15, 17, "green"),
]

for triangle in triangles:
    if triangle.color == "green":
        print(
            f"""
i = {triangles.index(triangle)}
a = {triangle.a}
b = {triangle.b}
c = {triangle.c}
valid = {triangle.valid}
"""
        )
