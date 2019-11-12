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
  if ($(id).css("background-color") == "rgb(0, 128, 0)") {
    $(id).css("background-color", "grey");
  } else {
    $(id).css("background-color", "green");
  }

  var btn_info = orig_id.split("_"); // will be ['course_name', 'semester']
  btn_info[0] = capitalize(btn_info[0]);
  btn_info[1] = parseInt(btn_info[1][1]-1); // turn 'q2' into 2
  console.log("btn_info: " + btn_info);
  kursliste.toggle(btn_info[0], btn_info[1]);
  kursliste.log();
}

var kursliste = new Kursliste();
