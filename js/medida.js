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


})(this)
