function capitalize([firstLetter, ...rest]) {
  return [firstLetter.toLocaleUpperCase(), ...rest].join('');
}

function createTable() {
  var body = document.getElementsByTagName("body")[0];

  var div = document.createElement("DIV");
  div.id = "div1";

  var kurse =
  ["deutsch",
  "englisch",
  "französisch",
  "spanisch",
  "latein",
  "musik",
  "kunst",
  "ds",
  "pw",
  "geschichte",
  "erdkunde",
  "psychologie",
  "philosophie",
  "mathematik",
  "physik",
  "chemie",
  "biologie",
  "informatik",
  "zusatzkurs",
  "sport",
  "sporttheorie"]; // list of courses

  var tbl = document.createElement("TABLE"); // table element

  var th_list = ["Fächer", "Q1", "Q2", "Q3", "Q4", "Select/Unselect All"] // list of headers
  var tr_th = document.createElement("TR"); // row of headers
  for (var i = 0; i < th_list.length; i++) {
    var th = document.createElement("TH"); // header element
    th.innerHTML = th_list[i]; // add header to header element
    tr_th.appendChild(th); // append header element to row of headers
  }
  tbl.appendChild(tr_th);


  for (kurs of kurse) {
    var tr = document.createElement("TR"); // table row element
    tr.class = "faecher";
    tr.id = kurs;
      td = document.createElement("TD"); // table cell element with course name
      td.class = "tdfaecher";
      td.innerHTML = capitalize(kurs);
      tr.appendChild(td);  // append course name to row
      for (var i = 1; i < th_list.length-1; i++) { // create buttons for each semester
        td = document.createElement("TD"); // create table cell
        td.class = "tdfaecher";
          btn = document.createElement("BUTTON"); // create button
          btn.type = "button";
          btn.className  = "tablebtn semesterb " + kurs;
          btn.id = kurs + "_q" + (i);
          btn.onclick = function () { // call button function with id when clicked
            // console.log(this.id);
            SemButton(this.id);
          };
          td.appendChild(btn); // append button to table cell
        tr.appendChild(td); // append table cell to table row
      }
      td = document.createElement("TD"); // table cell element with select all button
      td.class = "tdfaecher";
      btn = document.createElement("BUTTON"); // create button
      btn.type = "button";
      btn.className  = "tablebtn selall " + kurs;
      btn.id = kurs;
      btn.onclick = function () { // call button function with id when clicked
        // console.log(this.id);
        console.log($(this).attr("id"));
        if ($(this).css("background-color") == "rgb(128, 128, 128)") {
          $("." + $(this).attr("id")).css("background-color", "green");
        } else {
          $("." + $(this).attr("id")).css("background-color", "grey");
        }
      };
      td.appendChild(btn);
      tr.appendChild(td);

    tbl.appendChild(tr); // append table row to table
  }

  div.appendChild(tbl);
  body.appendChild(div);
}

function Ausgabe() {
  var buttons = document.getElementsByClassName("semesterb");
  for (btn of buttons) {
    var bgcolor = getComputedStyle(btn).backgroundColor;
    var output;
    if (bgcolor == "rgb(128, 128, 128)") {
      output = "false";
    } else {
      output = "true";
    }
    console.log(btn.id + ": " + output);
  }
}

createTable();
