function createTable() {
  var body = document.getElementsByTagName("body")[0];

  var div = document.createElement("DIV");
  div.id = "div1";

  // console.log(kurse);
  var kurse = [];
  for (kurs of kursliste.get()) {
    kurse.push(kurs.fach);
  }

  var tbl = document.createElement("TABLE"); // table element

  var th_list = ["Fächer", "Q1", "Q2", "Q3", "Q4", "Select/Unselect All", "3. PF (schriftlich)", "4. PF (mündlich)", "5. PK"] // list of headers
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
      td.innerHTML = kurs;
      tr.appendChild(td);  // append course name to row

      for (var i = 1; i <= 4; i++) { // create buttons for each semester
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
        console.log($(this).attr("id") + " selall");
        if ($(this).css("background-color") == "rgb(128, 128, 128)") {
          $("." + $(this).attr("id")).css("background-color", "green");
        } else {
          $("." + $(this).attr("id")).css("background-color", "grey");
        }
      };
      td.appendChild(btn);
      tr.appendChild(td);

      /*
      // add PF buttons
      for (var i = 3; i <= 5; i++) {
        td = document.createElement("TD");
        td.class = "pf pf" + i;
          btn = document.createElement("BUTTON");
          btn.type = "button";
          btn.className = "tablebtn pfbtn " + kurs;
          btn.id = kurs + "_pf" + i;
          btn.onclick = function () {
            PFButton(this.id);
          };
          td.appendChild(btn);
        tr.appendChild(td);
      }*/

      // add PF radio buttons
      for (var i = 3; i <= 5; i++) {
        td = document.createElement("TD");
        td.class = "pf pf" + i;
          radio = document.createElement("INPUT");
          radio.type = "radio";
          radio.className = "tblradio pfradio " + kurs;
          radio.name = "radio_pf" + i;
          radio.id = kurs + "_" + radio.name;
          radio.value = kurs;
          //debugging
          radio.onclick = function () {
            console.log("radio: " + this.id);
          };
          td.appendChild(radio);
        tr.appendChild(td);
      }


    tbl.appendChild(tr); // append table row to table
  }

  div.appendChild(tbl);
  body.appendChild(div);
}

function testCSV() {
  console.log(parseInt(document.getElementById("deutsch_q2").id.split("_")[1][1]));

}

createTable();
