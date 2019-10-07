function randint(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function car(name, color, year, maxspeed) {
  this.name = name;
  this.color = color;
  this.age = 2019-year;
  this.maxspeed = maxspeed;

  this.get_name = function (){
    return this.name;
  }
  this.set_name = function (name) {
    this.name = name;
  }
}

function MyFunc() {
  var h1 = document.getElementById("heading1");
  h1.style.color = "blue";
  h1.innerHTML = "CLICK MOTHAFUCKA!";
}

var x = randint(10);
if (x > 5){
  document.write("x is greater than 5, x: " + x);
} else {
  document.write("x is smaller than 5, x: " + x);
}

document.write("<br />")

var car1 = new car ("Corolla", "green", 1974, randint(250));
document.write(car1.age + ", " + car1.color + " " + car1.name + ", Topspeed: " + car1.maxspeed);

document.write("<br />")

car1.set_name("Toyota Corolla");
document.write(car1.get_name());
