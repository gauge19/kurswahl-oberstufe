const checked_color = "rgb(40, 181, 38)";
const unchecked_color = "rgb(188, 190, 194)";

function randint(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function capitalize([firstLetter, ...rest]) {
  return [firstLetter.toLocaleUpperCase(), ...rest].join('');
}

function MyFunc() {
  var h1 = document.getElementById("heading1");
  h1.style.color = "blue";
  h1.innerHTML = "CLICK MOTHAFUCKA!";
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

function PFButton(id) {
  var orig_id = id;
  id = "#" + id;

  console.log(id);
}

var kursliste = new Kursliste();
