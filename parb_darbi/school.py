from datetime import datetime, timedelta


class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Čau es esmu {self.name}!")


class Student(Person):
    def __init__(self, name, student_id, age=None):
        super().__init__(name)
        self.student_id = student_id
        self.grades = []
        self.age = age

    def greet(self):
        print(f"Čau es esmu {self.name}! Mans studenta ID ir {self.student_id}.")

    def update_student_age(self, age):
        self.age = age

    def update_student_id(self, student_id):
        self.student_id = student_id


class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

    def greet(self):
        print(f"Čau es esmu {self.name}! Es mācu {self.subject}.")

    def update_teacher_subject(self, subject):
        self.subject = subject


class Library:
    def __init__(self):
        self.books = []

    def remove_book(self, book):
        self.books.remove(book)

    def add_book(self, book):
        self.books.append(book)

    def list_books(self):
        for book in self.books:
            print(book)


class Course:
    def __init__(self, name, students: list):
        self.name = name
        self.students = students

    def add_student(self, student):
        self.students.append(student)

    def list_students(self):
        for student in self.students:
            print(student.name)

    def list_students_with_grades(self):
        for student in self.students:
            for grade in student.grades:
                print(
                    f"{student.name} ir ieguvis atzīmi {grade.grade} kursā {grade.course.name}"
                )

    def remove_student(self, student):
        self.students.remove(student)


class School:
    def __init__(self, courses: list):
        self.courses = courses

    def remove_course(self, course):
        self.courses.remove(course)

    def list_courses_with_teachers(self):
        for course in self.courses:
            print(f"{course.name} māca {course.teacher.name}")


class Grade:
    def __init__(self, student, course, grade):
        self.student = student
        self.course = course
        self.grade = grade

    def display_grade(self):
        print(
            f"{self.student.name} ir ieguvis atzīmi {self.grade} kursā {self.course.name}"
        )

    def update_grade(self, new_grade):
        self.grade = new_grade


class Exam:
    def __init__(self, course, date: datetime):
        self.course = course
        self.date = date

    def schedule_exam(self):
        print(f"Eksāmens {self.course.name} notiks {self.date.strftime('%d.%m.%Y')}.")


class Attendance:
    def __init__(self, student, course, present=False):
        self.student = student
        self.course = course
        self.present = present

    def mark_attendance(self):
        self.present = True

    def update_attendance_status(self, status):
        self.present = status


maikls = Person("Maikls")
maikls.greet()

matematika1 = Course("Matemātika I", [])

eksamens = Exam(
    matematika1,
    datetime.now()
    + timedelta(days=7),  # 7 dienas no šī brīža (simulējot īstus skolas apsākļus)
)
eksamens.schedule_exam()

maikls_attendance = Attendance(maikls, matematika1)
maikls_attendance.mark_attendance()

biblioteka = Library()
biblioteka.add_book("Matematika I")
biblioteka.add_book("Matematika II")
biblioteka.add_book("Matematika III")
