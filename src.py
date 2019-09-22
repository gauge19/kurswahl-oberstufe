import csv


class Kurs(object):
    def __init__(self, name, af, kat):
        self.name = name
        self.aufgabenfeld = af
        self.kategorie = kat  # main, lang, art, social, sci, rdm
        self.semester = [False, False, False, False]
        self.leistungskurs = False

    def wählen(self, q1, q2, q3, q4):
        """" True wenn Fach für das Semester gewählt wird, False wenn nicht """
        self.semester = [q1, q2, q3, q4]

    def set_leistungskurs(self):
        self.leistungskurs = True

    def get_name(self):
        return self.name

    def get_kategorie(self):
        return self.kategorie

    def get_aufgabenfeld(self):
        return self.aufgabenfeld


def check_kurswahl(kurswahl):
    """ takes list 'kurswahl' and checks for requirements """


def get_kurse():
    kurse = []

    with open('kurse.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=';')
        line_count = 0
        for row in csv_reader:
            # print(row)
            kurse.append(Kurs(row[0], row[1], row[2]))
            line_count += 1
        # print(f'Processed {line_count} lines.')

    return kurse


kurse = get_kurse()
