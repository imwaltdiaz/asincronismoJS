function sum(num1, num2){
  return num1 + num2;
}

function calc(num1, num2, callback){
  return callback(num1, num2);
}

function date(callback) {
  console.log(new Date);
  setTimeout(function (){
    let date = new Date;
    callback(date)
  }, 3000)
}
//El primer valor es lo que vas a pasar y el segundo valor del timeout es el tiempo

function printDate(dateNow) {
  console.log(dateNow)
}

date(printDate);

