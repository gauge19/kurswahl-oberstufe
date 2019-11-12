class Kursliste {
  constructor () {
    this.kurse_list = [];

    // for i in kurse --> new Kurs(fach, aufgabenfeld, kategorie)
  }
}

class Kurs {
  constructor (fach, aufgabenfeld, kategorie) {
    this.fach = fach;
    this.aufgabenfeld = aufgabenfeld;
    this.kategorie = kategorie;

    this.semester_list = [new Semester(), new Semester(), new Semester(), new Semester()];
  }

  select (index) {
    // select indexed semester
    this.semester_list[index].select();
  }

  unselect (index) {
  // unselect indexed semester
    this.semester_list[index].unselect();
  }

  get (index) {
  // return indexed semester, starting with 0
    return this.semester_list[index];
  }

  toggle (index) {
  // change status of (indexed) semester
    if (this.get(index).status()) {
      // if semester status is 'selected', unselect it
      this.unselect(index);
    } else if (!this.get(index).status()) {
      // if semester status is 'unselected', select it
      this.select(index);
    }
  }
}

class Semester {
  constructor () {
    this.selected = false;
  }

  select () {
    this.selected = true;
  }

  unselect () {
    this.selected = false:
  }

  status () {
  // return status of the semester
    return this.selected;
  }
}
