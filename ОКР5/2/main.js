const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const image1 = document.getElementById('pict1');
const image2 = document.getElementById('pict2');

let close = document.getElementById('close');
let open = document.getElementById('open');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let btnReload = document.getElementById('reload');
let message = document.getElementById('messasge').innerHTML;
let txt = "";
let isOn = false;

//Старт программы
open.addEventListener(`click`, () => {
 document.getElementById(`work`).style.display = "block";
 firstStart();
})

//Закрытие программы
close.addEventListener(`click`, () => {
 document.getElementById('rrbar').innerHTML = '';
 document.getElementById('work').style.display = "none";
 document.getElementById(`anim`).innerHTML = "";
 localStorage.setItem('key', txt);
 document.getElementById('rrbar').innerHTML = txt;
 isOn = false;
 start.disabled = false;
})

//Старт анимации
start.addEventListener('click', () => {
  start.style.display = "none";
  stop.style.display = "inline";
 txt += "Start pressed " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
 document.getElementById('messasge').innerHTML = 'Start pressed';
 isOn = true;
 loop()
})

//Остановка анимации
stop.addEventListener('click', () => {
  stop.style.display = "none";
  start.style.display = "inline";
  isOn = false;
  stopped();
})


function stopped() {
  stop.style.display = "none";
 start.style.display = 'none';
 btnReload.style.display = 'inline ';
 btnReload.addEventListener('click', () => {
  txt += "Reload activated " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
  document.getElementById('messasge').innerHTML = "Reload activated"
  btnReload.style.display = 'none';
  start.style.display = 'inline ';
  circles = [];
  let position = 30;
  let color = 'yellow';
  while (circles.length < 2) {
   let size = 35;
   if ((circles.length + 1) % 2 == 0) {
    position = height - size - 40;
    color = 'red';
    size = 75;
   }
   let ball = new Circle(
    random(0 + size, width - size),
    position,
    random(10, 10),
    random(10, 10),
    color,
    size
   );
   circles.push(ball);
  }
  firstStart();
 }
 );
}

//Генерация случайного числа
function random(min, max) {
 const num = Math.floor(Math.random() * (max - min + 1)) + min;
 return num;
}

//Определяем класс кругов
function Circle(x, y, velX, velY, color, size) {
 this.x = x;
 this.y = y;
 this.velX = velX;
 this.velY = velY;
 this.color = color;
 this.size = size;
}

//Определяем метод рисовки
Circle.prototype.draw = function () {
  ctx.beginPath();
   ctx.fillStyle=this.color;
   ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
   ctx.fill();
};

//Коллизия со стенками и перемещение
Circle.prototype.update = function () {
 if ((this.x + this.size) >= width + 10) {
  txt += "Circle touched right side " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
  document.getElementById('messasge').innerHTML = "Cricle touched right side"
  this.velX = -(this.velX);
 }
 if ((this.x - this.size) <= -10) {
  txt += "Circle touched left side " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
  document.getElementById('messasge').innerHTML = "Circle touched left side"
  this.velX = -(this.velX);
 }
 if ((this.y + this.size) >= height + 10) {
  txt += "Circle touched top side " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
  document.getElementById('messasge').innerHTML = "Circle touched top side"
  this.velY = -(this.velY);
 }
 if ((this.y - this.size) <= -10) {
  txt += "Circle touched bottom side " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
  document.getElementById('messasge').innerHTML = "Circle touched bottom side"
  this.velY = -(this.velY);
 }
 this.x += this.velX;
 this.y += this.velY;
};

//Коллизия кругов
Circle.prototype.collisionDetect = function () {
 for (let j = 0; j < circles.length; j++) {
  if (!(this === circles[j])) {
   const dx = this.x - circles[j].x;
   const dy = this.y - circles[j].y;
   const distance = Math.sqrt(dx * dx + dy * dy) * 2;
   if (distance < circles[j].size * 2) {
    txt += "Circle touched each other " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
    document.getElementById('messasge').innerHTML = "Circle touched each other"
    isOn = false;
   }
  }
 }
};

let circles = [];
let position = 30;
let color = 'yellow';
while (circles.length < 2) {
 let size = 35;
 if ((circles.length + 1) % 2 == 0) {
  position = height - size - 40;
  color = 'red';
  size = 75;
 }
 let ball = new Circle(
  random(0 + size, width - size),
  position,
  random(10, 10),
  random(10, 10),
  color,
  size
 );
 circles.push(ball);
}

//Зацикливаем анимацию
function loop() {
 ctx.drawImage(image1, 0, 0, width, height / 2);
 ctx.drawImage(image2, 0, height / 2, width, height / 2)
 for (let i = 0; i < circles.length; i++) {
  circles[i].draw();
  if (isOn) {
   circles[i].update();
  }
  circles[i].collisionDetect();
 }
 if (isOn) {
  requestAnimationFrame(loop);
 }
}

//Первый запуск анимации
function firstStart() {
 ctx.drawImage(image1, 0, 0, width, height / 2);
 ctx.drawImage(image2, 0, height / 2, width, height / 2)
 for (let i = 0; i < circles.length; i++) {
  circles[i].draw();
  if (isOn) {
   circles[i].update();
  }
  circles[i].collisionDetect();
 }
}
