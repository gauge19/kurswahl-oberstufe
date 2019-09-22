import tkinter, src
from tkinter import *

FONTTYPE = "Bitstream Vera Sans Mono"
FONTSIZE = 11
FONT = (FONTTYPE, FONTSIZE)
RELIEF = GROOVE


class MainWindow(Frame):

    class LKWindows():
        """ öffnet zu Beginn um Leistungskurse auszuwählen """
        def __init__(self, mother):
            self.mother = mother
            self.w = Toplevel(self.mother)
            self.w.title("Leistungskurs Auswahl")
            
            """-------------------------------------------------------------"""

            # Liste mit allen wählbaren Kursen
            self.names = []
            for item in self.mother.unselected:
                self.names.append(item.name)

            # Variablen für das erste Dropdown-Menu
            self.dd1_var = StringVar(self.w)
            self.dd1_var.set(self.names[0])

            # Dropdown-Menu 1
            self.dd1 = OptionMenu(self.w, self.dd1_var, *self.names).grid(row=1, columnspan=3)

            # Variablen für das zweite Dropdown-Menu
            self.dd2_var = StringVar(self.w)
            self.dd2_var.set(self.names[1])

            # Dropdown-Menu 1
            self.dd2 = OptionMenu(self.w, self.dd2_var, *self.names).grid(row=2, columnspan=3)

            # Knopf um Auswahl zu bestätigen
            self.auswahl_b = Button(self.w, text="Leistungskurse auswaehlen", font=FONT, command=self.action_b1).grid(row=3, columnspan=3, pady=30)

            # Textfeld um mögliche Fehlermeldungen auszugeben
            self.output_var = StringVar(self.w)
            self.output = Label(self.w, textvariable=self.output_var, font=FONT).grid(row=4, columnspan=3)

        def action_b1(self):
            """ Aktion des Bestätigen-Knopfes """
            if self.dd1_var.get() != self.dd2_var.get():

                lk1 = self.dd1_var.get()
                for item in self.mother.unselected:
                    if item.get_name() == lk1:
                        lk1 = item
                        break

                lk1.set_leistungskurs()
                lk1.wählen(True, True, True, True)
                self.mother.unselected.remove(lk1)
                self.mother.selected.append(lk1)

                lk2 = self.dd2_var.get()
                for item in self.mother.unselected:
                    if item.get_name() == lk2:
                        lk2 = item
                        break

                lk2.set_leistungskurs()
                lk2.wählen(True, True, True, True)
                self.mother.unselected.remove(lk2)
                self.mother.selected.append(lk2)

                self.w.destroy()
            else:
                # sollten die ausgewählten Kurse identisch sein, wird eine Fehlermeldung ausgegeben
                print("Leistungskurse können nicht dieselben sein")
                self.output_var.set("Leistungskurse können nicht dieselben sein")

    def __init__(self, *args):

        self.unselected = src.get_kurse() # all courses will be added, since none of them have been selected yet
        self.selected = []

        Frame.__init__(self, *args)
        self.grid()
        self.createWidgets()

    def createWidgets(self):
        header = Label(self, text="KURSWAHL", font=(FONTTYPE, FONTSIZE+3))
        header.grid(row=0, column=0, columnspan=3)

        lk = self.LKWindows(self) # öffne das LK-Auswahl-Fenster



root = Tk()
main = MainWindow(root)
root.mainloop()