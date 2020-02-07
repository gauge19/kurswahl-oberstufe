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

  $("#demo").html(prev + text);
}

function SemButton(id) {
  // updates color of button when clicked
  // updates status of uneven semester (1 or 3) as well as the following (2 or 4) so that they can only be selected in pairs

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
  console.log("btn_info: " + btn_info);
  kursliste.toggle(btn_info[0], btn_info[1]); // tell kursliste to update status of clicked button/semester
  kursliste.toggle(btn_info[0], btn_info[1]+1); // tell kursliste to update status of following button/semester
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

  var btn_info = orig_id.split("_"); // will be ['course_name', 'lkX']
  btn_info[0] = btn_info[0];
  btn_info[1] = parseInt(btn_info[1].slice(2)); // turn 'lk4' into 4
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

function validate() {
  $("#demo").html(""); // reset output
  var valid = true;

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

    // check if (at least) one science has been selected for 4 semesters or 2 semesters plus 4 semsters biology

    // checks if bio has been selected for 4 semesters
    var count_bio = 0;
    for (kurs of kursliste.kurse_list) {
      if (kurs.fach == "Biologie") {
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_bio += 1;
          }
        }
        break;
      }
    }
    console.log("bio: " + count_bio);

    b = false;
    for (kurs of kursliste.kurse_list) {
      if (kurs.kategorie == "sci") {
        var count_sci = 0;
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_sci += 1;
          }
        }
        // either (4x bio + 2x sci) or (4x sci)
        if (count_sci == 4 || (count_sci == 2 && count_bio == 4)) {
          b = true;
          break;
        }
      }
    }
    if (!b) {
      log_demo("Mindestens eine Naturwissenschaft (Physik oder Chemie) muss 4 Semester durchgängig belegt werden. Sofern nur Biologie durchgängig belegt wird, müssen noch 2 weitere Semester einer anderen Naturwissenschaft belegt werden.");
    }

    // if PE is a PF, Sporttheorie must be selected for at least 2 semesters
    for (pfkurs of kursliste.pfs()) {
      if (pfkurs.fach == "Sport") {

        // count semesters for Sporttheorie
        for (kurs of kursliste.kurse_list) {
          if (kurs.fach == "Sporttheorie") {
            var count_theorie = 0;
            for (sem of kurs.semester_list) {
              if (sem.status()) {
                count_theorie += 1;
              }
            }
            break;
          }
        }
        console.log("PF Sport, Theorie: " + count_theorie);
        if (count_theorie < 2) {
          log_demo("Wennn Sport ein Prüfungsfach ist, muss Sporttheorie min. 2 Semester belegt werden.");
        }

      }
    }

    // check if 6 courses in the 2. Aufgabenfeld have been selected
    var count_2nd = 0;
    for (kurs of kursliste.kurse_list) {
      if (kurs.aufgabenfeld == 2) {
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_2nd += 1;
          }
        }
      }
    }
    if (count_2nd < 6) {
      log_demo("Es müssen mindestens 6 Semester im 2. Aufgabenfeld belegt werden.");
    }

    // check if 2 courses in an art class have been selected (DS, Kunst, Musik)
    var count_art = 0;
    for (kurs of kursliste.kurse_list) {
      if (kurs.kategorie == "art") {
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_art += 1;
          }
        }
      }
    }
    if (count_art < 2) {
      log_demo("Es müssen mindestens 2 Semester in künstlerischen Fächern (DS, Musik, Kunst) belegt werden.");
    }

    // check if Geschichte has been selected in sem 3 & 4
    for (kurs of kursliste.kurse_list) {
      if (kurs.fach == "Geschichte") {
        if (kurs.semester_list[2].status() == false || kurs.semester_list[3].status() == false) {
          log_demo("Geschichte muss mindestens im 3. und 4. Semester belegt werden.");
          break;
        }
      }
    }

    // -----------------------------------------------------------------------------------------------
    // check specific PF requierements

    // Math, German, Language or Science at least one of the LKs
    b = false;
    for (kurs of [kursliste.lk1, kursliste.lk2]) {

      if (kurs.fach == "Deutsch" || kurs.fach == "Mathe") {
          b = true;
          break;
      }

      // check if a langauge is PF (and has been selected for 4 sems)
      else if (kurs.kategorie == "lang") {
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

      // check if a science is PF (and has been selected for 4 sems)
      else if (kurs.kategorie == "sci" ||kurs.kategorie == "bio") {
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
      log_demo("Eines der Leistungskursfächer muss Mathe, Deutsch, eine fortgesetzte Fremdsprache oder eine Naturwissenschaft sein.");
    }

    // 2 of German, Math or Language in PFs
    var count_b = 0;
    for (kurs of kursliste.pfs()) {

      if (kurs.fach == "Deutsch" || kurs.fach == "Mathe") {
          count_b += 1;
      }

      // check if a langauge is PF (and has been selected for 4 sems)
      else if (kurs.kategorie == "lang") {
        var count_lang = 0;
        for (sem of kurs.semester_list) {
          if (sem.status()) {
            count_lang += 1;
          }
        }
        if (count_lang == 4) {
          count_b += 1;
        }
      }

    }

    if (count_b < 2) {
      log_demo("Zwei der Prüfungsfächer müssen Mathe, Deutsch oder eine Fremdsprache sein.");
    }

    // All Aufgabenfelder have to be represented in the PFs
    felder = [false, false, false];
    for (aufgabenfeld of [1, 2, 3]) {
      for (kurs of kursliste.pfs()) {
        if (kurs.aufgabenfeld == aufgabenfeld) {
          felder[aufgabenfeld-1] = true;
          break;
        }
      }
    }

    for (feld of felder) {
      if (!feld) {
        log_demo("Alle drei Aufgabenfelder müssen unter den Prüfungsfächern vertreten sein.");
      }
    }

    // Max. 1 of DS, Musik, Kunst, Sport in PFs
    var count_b = 0;
    for (kurs of kursliste.pfs()) {

      if (kurs.fach == "Musik" || kurs.fach == "Kunst" || kurs.fach == "DS" || kurs.fach == "Sport") {
          count_b += 1;
      }
    }
    if (count_b > 1) {
      log_demo("Höchstens eines der Fächer Sport, Kunst, Musik oder Darstellendes Spiel (DS) darf unter den Prüfungsfächern vertreten sein.");
    }

  }

  if ($("#demo").html() == "") {
    $("#demo").html("Herzlichen Glückwunsch, deine Kurswahl erfüllt alle Anforderungen!");
  }

}

var kursliste = new Kursliste();
createTable();
