import csv


class Kurs(object):
    def __init__(self, name, category):
        self.name = name
        self.category = category
        self.semester = [False, False, False, False]
        self.leistungskurs = False

    def wählen(self, q1, q2, q3, q4):
        """" True wenn Fach für das Semester gewählt wird, False wenn nicht """
        self.semester = [q1, q2, q3, q4]

    def set_leistungskurs(self):
        self.leistungskurs = True


def get_kurse():
    kurse = []

    with open('kurse.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=';')
        line_count = 0
        for row in csv_reader:
            #print(row)
            kurse.append(Kurs(row[0], row[1]))
            line_count += 1
        #print(f'Processed {line_count} lines.')

    return kurse

kurse = get_kurse()
