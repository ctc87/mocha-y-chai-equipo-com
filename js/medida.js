"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Medida -constructor
exports.Medida = function Medida(valor,tipo) {
  this.valor = valor;
  this.tipo = "";
  this.ca = XRegExp('(?<value> ^\\s*([-+]?\\d+(?:\\.\\d+)?(?:\\s*e\\s?[-+]?\\d+)?)\\s*?º?)\\s* # valor   \n\
                    (?<units>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?) |      # celsisu \n\
                    (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?) |  # fahrenheit \n\
                    (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))\\s*)                      # kelvin  \n\
                    ((?<to> (?:\\s*to)?\\s*)                                             # to \n\
                    (?<units2>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?) |      # celsisu \n\
                    (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?) |  # fahrenheit \n\
                    (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))))?\\s*$                       # kelvin ', 'x');

  if (tipo != undefined) {
    console.log("hay tipo");
    this.tipo = tipo;
  }

}

//Calculo de la conversion de temperaturas
Medida.prototype.calculate = function(original) {
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

//Variable a usar en el main para comenzar la conversion
exports.medida = new Medida("0c");

})(this)
