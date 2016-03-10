"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
(function(exports) {

//Clase Medida -constructor
exports.Medida = function Medida(valor,tipo) {

  this.valor = valor;
  this.xrgxp = XRegExp;
  // this.tipo = "";
  this.ca = XRegExp('(?<value> ^\\s*([-+]?\\d+(?:\\.\\d+)?(?:\\s*e\\s?[-+]?\\d+)?)\\s*?º?)\\s* # valor   \n\
                    (?<units>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?) |             # celsisu \n\
                    (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|         # fahrenheit \n\
                    (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))\\s*)                             # kelvin  \n\
                    ((?<to> (?:\\s*to)?\\s*)                                                   # to \n\
                    (?<units2>    ((?:([Cc])(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|            # celsisu \n\
                    (?:([Ff])(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|         # fahrenheit \n\
                    (?:([Kk])(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?))))?\\s*$                          # kelvin ', 'x');

  if (tipo != undefined) {
    console.log("hay tipo");
    this.tipo = tipo;
  }

}

Medida.prototype.tipoMedida = {  
    f:'Fahrenheit', k:'Kelvin', c:'Celsius'
  };

Medida.prototype.match = function(evaluate) {
   return this.xrgxp.exec(evaluate, this.ca);
}


//Calculo de la conversion de temperaturas
Medida.prototype.calculate = function(original, convertir) {

  var tipoMedida = this.tipoMedida;
  var match = this.match(original);
  if (match) {
    var destino = convertir;
    var numero = match.value,
        tipo   = match.units.charAt(0).toLocaleLowerCase().trim();
    if(match.units2)
        var destino = match.units2.charAt(0).toLocaleLowerCase().trim();
        console.log(tipoMedida[tipo]);

    try {
      var source = eval( 'new ' + tipoMedida[tipo] + '(' + numero + ')') ;  // new Fahrenheit(32)
      var target = eval( 'source.to' + tipoMedida[destino] + '()'); // "toCelsius"
      return target.valor + "" + target.tipo; // "0 Celsius"
    }
    catch(err) {

      return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '" \n ' + err;
    }
  }
  else
    return "Introduzca una temperatura valida: 330e-1 F to C";
}

/** Medida.prototype.calculate = function(original) {
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
} **/

//Variable a usar en el main para comenzar la conversion

})(this)
