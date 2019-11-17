var csv = "Deutsch;1;main|\
Englisch;1;lang|\
Franzoesisch;1;lang|\
Spanisch;1;lang|\
Latein;1;lang|\
Musik;1;art|\
Kunst;1;art|\
DS;1;art|\
Politikwissenschaften;2;social|\
Geschichte;2;social|\
Erdkunde;2;social|\
Psychologie;2;social|\
Philosophie;2;social|\
Mathematik;3;main|\
Physik;3;sci|\
Chemie;3;sci|\
Biologie;3;sci|\
Informatik;3;rdm|\
Zusatzkurs;4;rdm|\
Sport;4;main|\
Sporttheorie;4;rdm";

class Kursliste {
  constructor () {
    this.kurse_list = [];

    // create array with sub arrays for each course
    var arr1 = csv.split("|");
    var arr2 = [];
    for (var i = 0; i < arr1.length; i++) {
      arr2.push(arr1[i].split(";"));
    }

    // create 'Kurs' object for every subarray and pass arguments
    for (var i = 0; i < arr2.length; i++) {
      this.kurse_list.push(new Kurs(arr2[i][0], arr2[i][1], arr2[i][2]));
    }
  }

  toggle(pFach, pSemster) {
    for (kurs of this.kurse_list) {
      if (pFach == kurs.fach) {
        kurs.toggle(pSemster);
        return;
      }
    }
  }

  log() {
    // log status of each semester of each course to the console
    for (kurs of this.kurse_list) {
      var output = kurs.fach + ": ";
      for (var i = 0; i < kurs.semester_list.length; i++) {
        output += kurs.semester_list[i].status() + ", ";
      }
      console.log(output);
    }
  }

  get () {
    return this.kurse_list;
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
    this.selected = false;
  }

  status () {
  // return status of the semester
    return this.selected;
  }
}
