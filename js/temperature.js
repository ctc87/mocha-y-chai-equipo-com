"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Temperatura con herencia de Medida -constructor
exports.Temperatura = function Temperatura(valor,tipo) {
    Medida.call(this,valor,tipo);
}

Temperatura.prototype = Object.create(Medida.prototype);
Temperatura.prototype.constructor = Temperatura;

//Clase Celsius con herencia de Temperatura -constructor
exports.Celsius = function Celsius(valor) {
  Temperatura.call(this,valor,"C");
}

Celsius.prototype = Object.create(Temperatura.prototype)
Celsius.prototype.constructor = Celsius;

Temperatura.prototype.toCelsius = function() {}; 		//Prototipo de la funcion toCelsius();
Temperatura.prototype.toFahrenheit = function() {}; 		//Prototipo de la funcion toFahrenheit();
Temperatura.prototype.toKelvin = function() {}; 		//Prototipo de la funcion toKelvin();



Celsius.prototype.toCelsius = function(){
	return this;
}

Celsius.prototype.toFahrenheit = function(){
	var resultado = (this.valor * 9/5)+32;
	return new Fahrenheit(resultado);
}

Celsius.prototype.toKelvin = function(){
	var resultado = (this.valor + 273.15);
	return new Kelvin(resultado);
}

//Clase Fahrenheit con herencia de Temperatura -constructor
exports.Fahrenheit = function Fahrenheit(valor) {
  Temperatura.call(this,valor, "F");
}

Fahrenheit.prototype = Object.create(Temperatura.prototype)
Fahrenheit.prototype.constructor = Fahrenheit;



Fahrenheit.prototype.toFahrenheit = function(){
	return this;
}

Fahrenheit.prototype.toCelsius = function(){
	var resultado = (this.valor - 32)*5/9;
	return new Celsius(resultado);
}

Fahrenheit.prototype.toKelvin = function(){
	var resultado = ((this.valor - 32)*5/9)+273.15;
	return new Kelvin(resultado);
}

//Clase Kelvin con herencia de Temperatura -constructor
exports.Kelvin = function Kelvin(valor) {
  Temperatura.call(this,valor,"K");
}

Kelvin.prototype = Object.create(Temperatura.prototype)
Kelvin.prototype.constructor = Kelvin;


Kelvin.prototype.toKelvin = function(){
	return this;
}

Kelvin.prototype.toCelsius = function(){
	var resultado = (this.valor - 273.15);
	return new Celsius(resultado);
}

Kelvin.prototype.toFahrenheit = function(){
	var resultado = ((this.valor - 273.15)/(5/9))+32;
	return new Fahrenheit(resultado);
}

})(this)
