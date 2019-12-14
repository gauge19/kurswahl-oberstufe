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
  $("#demo").html("");

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
  }
  // checks if one PF/LK each is selected
  if (kursliste.pf3 == undefined || kursliste.pf4 == undefined || kursliste.pf5 == undefined || kursliste.lk1 == undefined || kursliste.lk2 == undefined) {
    log_demo("Es muss jeweils ein Prüfungsfach bzw. Leistungskurs ausgewählt werden.");
  }
  // checks if PFs are the same subject
  else if (kursliste.pf3 == kursliste.pf4 || kursliste.pf3 == kursliste.pf5 || kursliste.pf4 == kursliste.pf5) {
    log_demo("Prüfungsfächer müssen unterschiedlich sein!");
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
  }


}

var kursliste = new Kursliste();
