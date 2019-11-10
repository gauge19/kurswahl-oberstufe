function randint(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function MyFunc() {
  var h1 = document.getElementById("heading1");
  h1.style.color = "blue";
  h1.innerHTML = "CLICK MOTHAFUCKA!";
}

function SemButton(id) {
  id = "#" + id;
  if ($(id).css("background-color") == "rgb(0, 128, 0)") {
    $(id).css("background-color", "grey");
  } else {
    $(id).css("background-color", "green");
  }

}

function SelAllButton(className) {
  className = "." + className;
  if (true) {

  }
}
