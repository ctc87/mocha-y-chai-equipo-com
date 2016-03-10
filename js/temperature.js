"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Temperatura con herencia de Medida -constructor
exports.Temperatura = function Temperatura(valor,tipo) {
    Medida.call(this,valor,tipo);
}

Temperatura.prototype = Object.create(Medida.prototype);
Temperatura.prototype.constructor = Temperatura;

//Clase Celsius con herencia de Temperatura -constructor
exports.Celsius = function Celsius(valor,tipo) {
  Temperatura.call(this,valor,tipo);
}

Celsius.prototype = Object.create(Temperatura.prototype)
Celsius.prototype.constructor = Celsius;

Temperatura.prototype.toCelsius = function() {}; 		//Prototipo de la funcion toCelsius();
Temperatura.prototype.toFahrenheit = function() {}; 		//Prototipo de la funcion toFahrenheit();
Temperatura.prototype.toKelvin = function() {}; 		//Prototipo de la funcion toKelvin();

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

//Definición de los métodos

Celsius.prototype.toCelsius = function(){
	return this;
}

Celsius.prototype.toFahrenheit = function(){
	var resultado = (this.valor * 9/5)+32;
	return new Fahrenheit(resultado, "F");
}

Celsius.prototype.toKelvin = function(){
	var resultado = (this.valor + 273.15);
	return new Kelvin(resultado, "K");
}

//Clase Fahrenheit con herencia de Temperatura -constructor
exports.Fahrenheit = function Fahrenheit(valor,tipo) {
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

Fahrenheit.prototype.toFahrenheit = function(){
	return this;
}

Fahrenheit.prototype.toCelsius = function(){
	var resultado = (this.valor - 32)*5/9;
	return new Fahrenheit(resultado, "F");
}

Fahrenheit.prototype.toKelvin = function(){
	var resultado = ((this.valor - 32)*5/9)+273.15;
	return new Kelvin(resultado, "K");
}

//Clase Kelvin con herencia de Temperatura -constructor
exports.Kelvin = function Kelvin(valor,tipo) {
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

Kelvin.prototype.toKelvin = function(){
	return this;
}

Kelvin.prototype.toCelsius = function(){
	var resultado = (this.valor - 273.15);
	return new Fahrenheit(resultado, "C");
}

Kelvin.prototype.toFahrenheit = function(){
	var resultado = ((this.valor - 273.15)/(5/9))+32;
	return new Kelvin(resultado, "F");
}

})(this)
