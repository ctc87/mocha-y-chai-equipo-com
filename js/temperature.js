"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Temperatura con herencia de Medida -constructor
function Temperatura(valor,tipo) {
    Medida.call(this,valor,tipo);
}

Temperatura.prototype = Object.create(Medida.prototype);
Temperatura.prototype.constructor = Temperatura;

//Clase Celsius con herencia de Temperatura -constructor
function Celsius(valor,tipo) {
  Temperatura.call(this,valor,tipo);
}

Celsius.prototype = Object.create(Temperatura.prototype)
Celsius.prototype.constructor = Celsius;

//Sobreescribiendo calculate de Temperatura
Celsius.prototype.calculate = function(m,num) {
  this.valor = m[1];
  this.tipo = m[2];
  var result = ["","",""];

  result[0] = num ;
  result[0] = result[0]+" C";
  result[1] = (num * 9/5)+32;
  result[1] = result[1]+" F";
  result[2] = (num + 273.15) ;
  result[2] = result[2]+" K";
  return result;
}

//Clase Fahrenheit con herencia de Temperatura -constructor
function Fahrenheit(valor,tipo) {
  Temperatura.call(this,valor,tipo);
}

Fahrenheit.prototype = Object.create(Temperatura.prototype)
Fahrenheit.prototype.constructor = Fahrenheit;

//Sobreescribiendo calculate de Temperatura
Fahrenheit.prototype.calculate = function(m,num) {
  this.valor = m[1];
  this.tipo = m[2];
  var result = ["","",""];

  result[0] = (num - 32)*5/9;
  result[0]= result[0]+" C";
  result[1] = num;
  result[1] = result[1]+" F";
  result[2] = ((num - 32)*5/9)+273.15;
  result[2] = result[2]+" K";

  return result;
}

//Clase Kelvin con herencia de Temperatura -constructor
function Kelvin(valor,tipo) {
  Temperatura.call(this,valor,tipo);
}

Kelvin.prototype = Object.create(Temperatura.prototype)
Kelvin.prototype.constructor = Kelvin;

//Sobreescribiendo calculate de Temperatura
Kelvin.prototype.calculate = function(m,num) {
  this.valor = m[1];
  this.tipo = m[2];
  var result = ["","",""];

  result[0] = (num - 273.15);
  result[0]= result[0]+" C";
  result[1] = ((num - 273.15)/(5/9))+32;
  result[1] = result[1]+" F";
  result[2] = num ;
  result[2] = result[2]+" K";
  return result;
}

exports.Temperatura = Temperatura;
exports.Celsius = Celsius;
exports.Fahrenheit = Fahrenheit;
exports.Kelvin = Kelvin;

})(this)
