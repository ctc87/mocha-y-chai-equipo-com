"use strict"; /** Use ECMAScript 5 strict mode in browsers that support it */

(function(exports) {
/** Variables globales */
var arrayResults = []


/** cambiando opacidad de las fotos textos  */

function lastChildOpaciti(nodoLlamador, opacity, opacity2) {
    nodoLlamador.childNodes[3].style.opacity = opacity;
    nodoLlamador.childNodes[1].style.opacity = opacity2;
}

/* función que comprueba si un elmento es visible con la propiedad display */
function isVisible(elemento) {
    if($(elemento).is(":visible"))
        return true;
    else
        return false;
}

/**  función para mostrar y ocultar tags además de cambiar el subrayado*/
function ocultarMostrarTags(focus) {
/** si el focus viene de als imagenes le asignamos el valor correspondiente*/
        if((focus == "img1") || (focus == "img2")) {
            if(focus == "img1") {
                focus = document.getElementById("e2");

            } else {
                focus = document.getElementById("e3");
            }
        }
        $(focus).addClass("subrayado");
        $(focus).parent().siblings("li").children("a").removeClass("subrayado"); /** acceso mediante familia */
        if(focus.id == "e1") {
            $(".contendeorImagenesEnlace").show(500);
            $(".conversorDeTemperatura").hide(500);
            $(".conversorDeTemperaturaTest").hide(500);
        }
        if(focus.id == "e2") {
            $(".contendeorImagenesEnlace").hide(500);
            $(".conversorDeTemperatura").show(500);
            $(".conversorDeTemperaturaTest").hide(500);
        }
        if(focus.id == "e3") {
            // window.open("../tests/index.html");
            $(".contendeorImagenesEnlace").hide(500);
            $(".conversorDeTemperatura").hide(500);
            $(".conversorDeTemperaturaTest").show(500);
        }
}



function addEventInput(input) {
    var input =document.getElementsByClassName(input);
    input[0].addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {   /** 13 es retorno de carro */
            if (input[0].validity.patternMismatch == false) { /** comprobando si coicide con el atributo pattern */
                arrayResults = medida.calculate(this); /* global calculate */
                selectChangeInput(arrayResults, "left");
            }
        }
    });

    input[0].addEventListener('keyup', function (e) {
        if (input[0].validity.patternMismatch == false) { /** comprobando si coicide con el atributo pattern */
            var value = this.value;
            value = value.toString();
            var tTemp = value.charAt(value.length - 1);
            arrayResults = medida.calculate(this); /* global calculate */
            inputChangeSelect(tTemp, "left",  arrayResults[3]);
            selectChangeInput(arrayResults, "left");
        }
    });

    input[1].addEventListener('keyup', function (e) {
        if (input[1].validity.patternMismatch == false) { /** comprobando si coicide con el atributo pattern */
            var value = this.value;
            value = value.toString();
            var tTemp = value.charAt(value.length - 1);
            arrayResults = medida.calculate(this); /* global calculate */
            inputChangeSelect(tTemp, "right", arrayResults[3]) ;
            selectChangeInput(arrayResults, "right");
        }
    });

    input[1].addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {   /** 13 es retorno de carro */
            if (input[1].validity.patternMismatch == false) { /** comprobando si coicide con el atributo pattern */
                arrayResults = medida.calculate(this);
                selectChangeInput(arrayResults, "right");
            }
        }
    });
}


function addventSelect(select) {
    var select = document.getElementsByClassName(select);
    select[0].addEventListener('change', function () {
       selectChangeInput(arrayResults,"right");
    });
    select[1].addEventListener('change', function () {
       selectChangeInput(arrayResults,"left");
    });

}

function inputChangeSelect(char, direction, cond) {
    if(cond) {
        char = cond;
        if(direction == "right")
            direction = "left";
        else
            direction = "right";
    }
    var select;
    if (direction == "left") {
    select = document.getElementsByClassName("select")[0];
    } else {
    select = document.getElementsByClassName("select")[1];
    }
    switch(char.toLowerCase()) {
        case 'c' :
            select.value = "Grado Celsius";
        break;
        case 'f' :
            select.value = "Grado Fahrenheit";
        break;
        case 'k' :
            select.value = "Grado Kelvin";
        break;
    }
}


    /** arr = [c ,f, k]  */
function selectChangeInput(arr, direction) {
    if(arr.length > 1) {
        var char = arr[0].charAt(arr[0].length - 1).toLocaleLowerCase();
        var selectValue;
        var input;
        if(direction == "left") {
            input = document.getElementsByClassName("InputTemperatura")[1];
            selectValue = document.getElementsByClassName("select")[1].value;
        }
        else if(direction == "right") {
            input = document.getElementsByClassName("InputTemperatura")[0];
            selectValue = document.getElementsByClassName("select")[0].value;
        }
        if(selectValue == "Grado Celsius") {
            input.value = arr[0];
        } else if (selectValue == "Grado Fahrenheit") {
            input.value = arr[1];
        } else if (selectValue == "Grado Kelvin") {
            input.value = arr[2];
        }
    }
}


/** función principal de js */

exports.main = function main() {
    var opaco = false;
    var x = document.getElementsByClassName("contendeorImagen");
    for(var i = 0; i < x.length; i++) {
        x[i].addEventListener("mouseenter", function() {
            lastChildOpaciti(this, '1', '-1');
        } , false);
        x[i].addEventListener("mouseleave", function() {
            lastChildOpaciti(this, '-1', '1');
        } , false);
    }
     $(document).ready(function() {
	    $(".menuHEader li a").on( "click", function() {
	        ocultarMostrarTags(this);
	    });
	    $(".imagen1").on( "click", function() {
	        ocultarMostrarTags("img1");
	    });
	    $(".imagen2").on( "click", function() {
	        ocultarMostrarTags("img2");
	    });

     });
     addEventInput('InputTemperatura');
     addventSelect('select');
}
   })(this)
