const gps = require("gpstime");

// >REV002041663724+1099304-0748281400000032;ID=AVENGERS<

let a = gps.wnTowToUtcTimestamp(2045, 55772);
let date = new Date(a);

console.log(date);
console.log(date.getUTCDate());
console.log(date.getUTCMonth() + 1);
console.log(date.getUTCFullYear());

let fecha = `${date.getUTCDate()}-${date.getUTCMonth() +
	1}-${date.getUTCFullYear()} `;
let hora = `${date.getUTCHours()}:${date.getMinutes()}`;
console.log(hora);
console.log(fecha);
