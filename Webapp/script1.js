const checked_color = "rgb(40, 181, 38)";
const unchecked_color = "rgb(188, 190, 194)";

function randint(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function capitalize([firstLetter, ...rest]) {
  return [firstLetter.toLocaleUpperCase(), ...rest].join('');
}
function log_demo(text) {
  console.log(text);

  var prev;
  if ($("#demo").html() == "") {
    prev = "";
  } else {
    prev = $("#demo").html() + "<br>";
  }

  $("#demo").html(prev+ text);
}

function SemButton(id) {
  var orig_id = id;
  id = "#" + id;
  if ($(id).css("background-color") == checked_color) {
    $(id).css("background-color", unchecked_color);
  } else {
    $(id).css("background-color", checked_color);
  }

  var btn_info = orig_id.split("_"); // will be ['course_name', 'semester']
  btn_info[0] = btn_info[0];
  btn_info[1] = parseInt(btn_info[1][1]-1); // turn 'q2' into 2
  // console.log("btn_info: " + btn_info);
  kursliste.toggle(btn_info[0], btn_info[1]); // tell kursliste to update status of clicked button/semester
  // kursliste.log(); // ouptput kursliste to console
}

function PFRadioButton(id) {
  var orig_id = id;
  id = "#" + id;

  var btn_info = orig_id.split("_"); // will be ['course_name', 'pfX']
  btn_info[0] = btn_info[0];
  btn_info[1] = parseInt(btn_info[1].slice(2)); // turn 'pf4' into 4
  //console.log("info: " + btn_info);

  // find course by name of the subject
  var kurs;
  for (i of kursliste.kurse_list) {
    if (i.fach == btn_info[0]) {
      kurs = i;
      break;
    }
  }

  // assign kurs to the corresponding variable in kursliste
  if (btn_info[1] == 3) {
    kursliste.pf3 = kurs;
  } else if (btn_info[1] == 4) {
    kursliste.pf4 = kurs;
  } else if (btn_info[1] == 5) {
    kursliste.pf5 = kurs;
  }
}

function LKRadioButton(id) {
  var orig_id = id;
  id = "#" + id;

  var btn_info = orig_id.split("_"); // will be ['course_name', 'pfX']
  btn_info[0] = btn_info[0];
  btn_info[1] = parseInt(btn_info[1].slice(2)); // turn 'pf4' into 4
  //console.log("info: " + btn_info);

  // find course by name of the subject
  var kurs;
  for (i of kursliste.kurse_list) {
    if (i.fach == btn_info[0]) {
      kurs = i;
      break;
    }
  }

  if (btn_info[1] == 1) {
    kursliste.lk1 = kurs;
  } else if (btn_info[1] == 2) {
    kursliste.lk2 = kurs;
  }
}

function Ausgabe() {
  $("#demo").html(""); // reset output
  var valid = true;

  //console.log("lk1: " + kursliste.lk1.fach);
  //console.log("lk2: " + kursliste.lk2.fach);

  var count_sem = 0; // number of selected semesters. has to be min. 40
  for (kurs of kursliste.kurse_list) {
    //console.log("reviewing " + kurs.fach);
    for (semester of kurs.semester_list) {
      //console.log("..." + semester.status());
      if (semester.status() == true) {
        count_sem += 1;
      }
    }
  }

  // checks if min. amount was selected
  if (count_sem < 40) {
    log_demo("Es müssen mindestens 40 Kurse gewählt werden! Aktuelle Anzahl: " + count_sem);
    valid = false;
  }

  // checks if one PF/LK each is selected
  if (kursliste.pf3 == undefined || kursliste.pf4 == undefined || kursliste.pf5 == undefined || kursliste.lk1 == undefined || kursliste.lk2 == undefined) {
    log_demo("Es muss jeweils ein Prüfungsfach bzw. Leistungskurs ausgewählt werden.");
    valid = false;
  }
  // checks if PFs or LKs are the same subject
  else if (kursliste.pf3 == kursliste.pf4 || kursliste.pf3 == kursliste.pf5 ||
           kursliste.pf4 == kursliste.pf5 || kursliste.lk1 == kursliste.pf3 ||
           kursliste.lk1 == kursliste.pf4 || kursliste.lk1 == kursliste.pf5 ||
           kursliste.lk2 == kursliste.pf3 || kursliste.lk2 == kursliste.pf4 ||
           kursliste.lk2 == kursliste.pf5 || kursliste.lk1 == kursliste.lk2) {
    log_demo("Prüfungsfächer und LKs müssen unterschiedlich sein!");
    valid = false;
  }

  // check LKs/PFs if all four semesters are selected
  var b = true;
  for (kurs of kursliste.kurse_list) {
    if (kurs == kursliste.lk1) {
      for (semester of kurs.semester_list) {
        if (!semester.status()) {
          b = false;
          break;
        }
      }
    } else if (kurs == kursliste.lk2) {
      for (semester of kurs.semester_list) {
        if (!semester.status()) {
          b = false;
          break;
        }
      }
    } else if (kurs == kursliste.pf3) {
      for (semester of kurs.semester_list) {
        if (!semester.status()) {
          b = false;
          break;
        }
      }
    } else if (kurs == kursliste.pf4) {
      for (semester of kurs.semester_list) {
        if (!semester.status()) {
          b = false;
          break;
        }
      }
    } else if (kurs == kursliste.pf5) {
      for (semester of kurs.semester_list) {
        if (!semester.status()) {
          b = false;
          break;
        }
      }
    }

  }
  if (!b) {
    log_demo("Gewählte LKs und Prüfungsfächer müssen jeweils 4 Semester belegt werden.");
    valid = false;
  }

  // ------------------------------------------------------------------------------------
  // if entry is valid, check for specific course requierements

  if (valid) {

    // check if (at least) one language has been selected for 4 semesters
    b = false;
    for (kurs of kursliste.kurse_list) {
      if (kurs.kategorie == "lang") {
        var count_lang = 0;
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_lang += 1;
          }
        }
        if (count_lang == 4) {
          b = true;
          break;
        }
      }
    }
    if (!b) {
      log_demo("Mindestens eine Fremdsprache (Spanisch/Franzoesisch oder Englisch) muss 4 Semester durchgängig belegt werden.");
    }

    // check if math, german and PE have been selected for 4 semesters
    for (kurs of kursliste.kurse_list) {
      var count_main = 0;
      if (kurs.kategorie == "main") {
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_main += 1;
          }
        }
        if (count_main != 4) {
          log_demo("Mathe, Deutsch und Sport müssen jeweils 4 Semester durchgängig belegt werden.");
          break;
        }
      }
    }

    // check if (at least) one science has been selected for 4 semesters
    b = false;
    for (kurs of kursliste.kurse_list) {
      if (kurs.kategorie == "sci") {
        var count_sci = 0;
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_sci += 1;
          }
        }
        if (count_sci == 4) {
          b = true;
          break;
        }
      }
    }
    if (!b) {
      log_demo("Mindestens eine Naturwissenschaft (Physik oder Chemie) muss 4 Semester durchgängig belegt werden.");
    }

    // es kann bspw. Semester 1 und 3 ausgewählt werden, ohne 2 und 4
    // Lösung: 2 Knöpfe, Sem 1&2, Sem 3&4 --> Lösen Aktionen für beide Semester aus

  }

}

var kursliste = new Kursliste();
