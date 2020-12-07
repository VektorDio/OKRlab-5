let close = document.getElementById('close');
let open = document.getElementById('open');
let start = document.getElementById('start');
let btnReload = document.getElementById('reload');
let message = document.getElementById('messasge').innerHTML;
let stop = document.getElementById('stop');
let txt = "";
let interval;
let amountOfDivs = 2;

//Старт программы
open.addEventListener(`click`, () => {
 document.getElementById(`work`).style.display = "block";
 document.getElementById('anim').innerHTML = `
  <div id="block1"></div>
  <div id ="block2"></div >`;
 randomDivGeneration(amountOfDivs);
})

//Закрытие окна программы 
close.addEventListener(`click`, () => {
 document.getElementById('work').style.display = "none";
 clearAnim();
 localStorage.setItem('key', txt);
 document.getElementById('rrbar').innerHTML = txt;
 clearInterval(interval);
 start.disabled = false;
})

//Очистка поля
function clearAnim() {
 document.getElementById(`anim`).innerHTML = "";
}

//Генерация случайного числа
function random(min, max) {
 const num = Math.floor(Math.random() * (max - min + 1)) + min;
 return num;
}

//Генераия случайных дивов
function randomDivGeneration(numbOfDivs) {
 let anim = document.getElementById('anim');
 let count = 1;
 for (let i = 0; i < numbOfDivs; i++) {
  let div = document.createElement(`div`);
  div.id = `div${count}`;
  div.className = `SomeDiv`;
  anim.appendChild(div);
  div.style.left = random(20, document.getElementById(`anim`).offsetWidth - 55) + `px`
  if (count % 2 == 0) {
   document.getElementById(`div${count}`).style.top = document.getElementById(`anim`).offsetHeight - 64 + `px`
  }
  else {
   document.getElementById(`div${count}`).style.top = 0 + `px`
  }
  count++;
 }
}

//Старт анимации
start.addEventListener('click', () => {
start.style.display = "none";
stop.style.display = "inline";
 txt += "Start button clicked " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
 document.getElementById('messasge').innerHTML = 'Start button clicked';
 let speedX1 = random(-10, -20)
 let speedY1 = random(-10, -20)
 let speedX2 = random(-10, -20)
 let speedY2 = random(-10, -20)

 interval = setInterval(() => {
  let div1 = document.getElementById('div1');
  let div2 = document.getElementById('div2');

//Коллизия с стенкой
  if (parseInt(div1.style.top, 10) + speedY1 <= 0) {
   speedY1 = - speedY1
   txt += "Yellow circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
   document.getElementById('messasge').innerHTML = 'Yellow circle touched wall';
  } else {
   if (parseInt(div1.style.top, 10) + speedY1 >= document.getElementById(`anim`).offsetHeight - 46) {
    speedY1 = - speedY1
    txt += "Yellow circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
    document.getElementById('messasge').innerHTML = 'Yellow circle touched wall';
   }
  }

//Коллизия с стенкой
  if (parseInt(div1.style.left, 10) + speedX1 <= 0) {
   speedX1 = - speedX1
   txt += "Yellow circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
   document.getElementById('messasge').innerHTML = 'Yellow circle touched wall';
  } else {
   if (parseInt(div1.style.left, 10) + speedX1 >= document.getElementById(`anim`).offsetWidth - 46) {
    speedX1 = - speedX1
    txt += "Yellow circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
    document.getElementById('messasge').innerHTML = 'Yellow circle touched wall';
   }
  }

//Коллизия с стенкой
  if (parseInt(div2.style.top, 10) + speedY2 <= 0) {
   speedY2 = - speedY2
   txt += "Red circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
   document.getElementById('messasge').innerHTML = 'Red circle touched wall';
  } else {
   if (parseInt(div2.style.top, 10) + speedY2 >= document.getElementById(`anim`).offsetHeight - 31) {
    speedY2 = - speedY2
    txt += "Red circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
    document.getElementById('messasge').innerHTML = 'Red circle touched wall';
   }
  }

//Коллизия с стенкой
  if (parseInt(div2.style.left, 10) + speedX2 <= 0) {
   speedX2 = - speedX2
   txt += "Red circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
   document.getElementById('messasge').innerHTML = 'Red circle touched wall';
  } else {
   if (parseInt(div2.style.left, 10) + speedX2 >= document.getElementById(`anim`).offsetWidth - 31) {
    speedX2 = - speedX2
    txt += "Red circle touched wall " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
    document.getElementById('messasge').innerHTML = 'Red circle touched wall';
   }
  }

//Коллизия
  if (parseInt(div2.style.left, 10) >= parseInt(div1.style.left, 10)
   &&
   parseInt(div2.style.left, 10) <= parseInt(div1.style.left, 10) + 25 //15
   &&
   parseInt(div2.style.top, 10) >= parseInt(div1.style.top, 10)
   &&
   parseInt(div2.style.top, 10) <= parseInt(div1.style.top) + 25 //15
  ) {
   txt += "Circles touched " + new Date().getMinutes() +":"+ new Date().getSeconds() +" <br />";
   document.getElementById('messasge').innerHTML = 'Circles touched';
   clearInterval(interval);
   stopped();
 }

 //Перемещение
  div1.style.left = parseInt(div1.style.left, 10) + speedX1 + `px`
  div1.style.top = parseInt(div1.style.top, 10) + speedY1 + `px`
  div2.style.left = parseInt(div2.style.left, 10) + speedX2 + `px`
  div2.style.top = parseInt(div2.style.top, 10) + speedY2 + `px`
 }, 50)

})

//Остановка анимации
stop.addEventListener('click', () => {
  stop.style.display = "none";
  start.style.display = "inline";
  clearInterval(interval);
  stopped();
})

//Остановка программы
function stopped() {
 start.disabled = false;
 start.style.display = 'none';
 btnReload.style.display = 'inline ';
 stop.style.display = "none";
 btnReload.addEventListener('click', () => {
  txt += "Button reload clicked " + new Date().getMinutes() +":"+ new Date().getSeconds();
  document.getElementById('messasge').innerHTML = "Reload activated"
  div1.style.left = random(0, document.getElementById(`anim`).offsetWidth) - 64 + `px`
  div2.style.left = random(0, document.getElementById(`anim`).offsetWidth) - 64 + `px`
  div1.style.top = document.getElementById(`anim`).offsetHeight - 64 + `px`
  div2.style.top = 0 + `px`
  btnReload.style.display = 'none';
  start.style.display = 'inline ';
 });
}
