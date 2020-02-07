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

  var th_list = ["Fächer", "Q1|Q2", "Q3|Q4", "1. LK", "2. LK", "3. PF (schriftlich)", "4. PF (mündlich)", "5. PK"] // list of headers
  var tr_th = document.createElement("TR"); // row of headers
  for (var i = 0; i < th_list.length; i++) {
    var th = document.createElement("TH"); // header element
    th.innerHTML = th_list[i]; // add header to header element
    tr_th.appendChild(th); // append header element to row of headers
  }
  tbl.appendChild(tr_th);

  // create tablerows for each Kurs
  for (kurs of kurse) {

    var tr = document.createElement("TR"); // table row element
    tr.class = "faecher";
    tr.id = kurs;
      td = document.createElement("TD"); // table cell element with course name
      td.class = "tdfaecher";
      td.innerHTML = kurs;
      tr.appendChild(td);  // append course name to row

      // create buttons for semester 1/2 and 3/4
      for (var i = 1; i <= 4; i+=2) {
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

      // add LK radio buttons
      for(var i = 1; i <= 2; i++) {
        td = document.createElement("TD");
        td.class = "lk lk" + i;
          radio = document.createElement("INPUT");
          radio.type = "radio";
          radio.className = "tblradio lkradio " + kurs;
          radio.name = "radio_lk" + i;
          radio.id = kurs + "_lk" + i;
          radio.value = kurs;
          //debugging
          radio.onclick = function () {
            LKRadioButton(this.id);
          };
          td.appendChild(radio);
        tr.appendChild(td);
      }

      // add PF radio buttons
      for (var i = 3; i <= 5; i++) {
        td = document.createElement("TD");
        td.class = "pf pf" + i;
          radio = document.createElement("INPUT");
          radio.type = "radio";
          radio.className = "tblradio pfradio " + kurs;
          radio.name = "radio_pf" + i;
          radio.id = kurs + "_pf" + i;
          radio.value = kurs;
          //debugging
          radio.onclick = function () {
            PFRadioButton(this.id);
          };
          td.appendChild(radio);
        tr.appendChild(td);
      }


    tbl.appendChild(tr); // append table row to table
  }

  div.appendChild(tbl);
  body.appendChild(div);
}
