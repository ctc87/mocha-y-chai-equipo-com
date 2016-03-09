"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Medida -constructor
function Medida() {
  this.valor = 0;
}

//Clase Temperatura con herencia de Medida -constructor
function Temperatura() {
    Medida.call(this);
    this.ca = XRegExp('(?<value> ^\\s*([-+]?\\d+(?:\\.\\d+)?(?:\\s*e\\s?[-+]?\\d+)?)\\s*?º?)\\s* # valor   \n\
  (?<units>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?) |      # celsisu \n\
  (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?) |  # fahrenheit \n\
  (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))\\s*)                      # kelvin  \n\
  ((?<to> (?:\\s*to)?\\s*)                                             # to \n\
  (?<units2>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?) |      # celsisu \n\
  (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?) |  # fahrenheit \n\
  (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))))?\\s*$                       # kelvin ', 'x'); 
}

Temperatura.prototype = Object.create(Medida.prototype);
Temperatura.prototype.constructor = Temperatura;

//Calculo de la conversion de temperaturas
Temperatura.prototype.calculate = function(original) {
  var celsius = new Celsius();
  var fahrenheit = new Fahrenheit();
  var kelvin = new Kelvin();
  var result = ["","","",""];
  var m = new Array();
  var temp = original.value;
  var match = XRegExp.exec(temp, this.ca);

  if (match) {
    m[2] = match.units.trim()[0]; //unidadesr
    m[1] = match.value.trim(); // valor
    var regexp2 = /^([-+]?\d+(?:\.\d+)?)(?:e\s?)?([-+]?\d+)?$/
    var numtemp = m[1].match(regexp2);
    numtemp[1] = parseFloat(numtemp[1]);

    if (undefined != numtemp[2]){
      numtemp[2] = parseFloat(numtemp[2]);
      var num = numtemp[1]*Math.pow(10, numtemp[2]);
    }
    else{
      var num = parseFloat(numtemp[1]);
    }
    var type = m[2];
    if (m[2] == 'c' || m[2] == 'C') {
      result = celsius.calculate(m,num);
    }
    else {
      if (m[2] == 'f' || m[2] == 'F') {
        result = fahrenheit.calculate(m,num);
      }
      else {
        result = kelvin.calculate(m,num);
      }
    }
    if(match.units2) {
      result[3] = match.units2;
    }
    return result;
    
  } else {
    return undefined;
  }
}

//Clase Celsius con herencia de Temperatura -constructor
function Celsius() {
  Temperatura.call(this);

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
function Fahrenheit() {
  Temperatura.call(this);

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
function Kelvin() {
  Temperatura.call(this);

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

//Variable a usar en el main para comerzar la conversion
exports.temperatura = new Temperatura();
})(this)
