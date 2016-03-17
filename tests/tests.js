var expect = chai.expect

describe('Medida', function() {
  describe('Constructor', function () {
    it ('debería aceptar dos parámetros (valor, tipo)',function() {
      var med = new Medida(24,'k');
      expect(med.valor+med.tipo).to.equal('24k');
    });
    it ('el tipo debería ser opcional',function() {
      var med = new Medida(24);
      expect(med.valor).to.equal(24);
    });
    it ('debería contener los tipos de medida a los que se pueden convertir',function() {
      var med = new Medida(24);
      expect(med.tipoMedida['k'] +" "+ med.tipoMedida['f'] +" "+ med.tipoMedida['c']).to.equal('Kelvin Fahrenheit Celsius');
    });
  });

  describe('#match', function() {
    it ('debería analizar la entrada y obtener el valor, unidad origen y unidad destino',function() {
      var med = new Medida(24);
      var aux = med.match("32c to k");
      expect(aux.value +" "+ aux.units +" "+ aux.units2).to.equal('32 c  k');
    });
  });

  describe('#calculate', function() {
    it("deberia retornar un string", function(){
      expect(medida.calculate("32","c")).to.be.a("string");
    });

    it("32C k deberia ser 305.15K", function(){
      expect(medida.calculate("32c","k")).to.deep.equal('305.15K');
    });

    it("0C to fah deberia ser 32F",function(){
      expect(medida.calculate("0C to fah")).to.deep.equal('32F');
    });

    it("273.15Kelvin c deberia ser 0C",function(){

      expect(medida.calculate("273.15Kelvin c")).to.deep.equal('0C');
    });

    it("45Fa Fahrenheit deberia ser 45F",function(){
      expect(medida.calculate("45Fa Fahrenheit")).to.deep.equal('45F');
    });

    it("45w no se acepta",function(){
      expect(medida.calculate("45W")).to.deep.equal("Introduzca una temperatura valida: 330e-1 F to C");
    });

    it("tem43c no se acepta",function(){
      expect(medida.calculate("tem43c")).to.deep.equal("Introduzca una temperatura valida: 330e-1 F to C");
    });

    it("Espacios en blanco no importan.0     C to kel 273.15K",function() {
      expect(medida.calculate("0    C to kel")).to.deep.equal('273.15K');
    });

    it("Se acepta notacion cientifica. -1.2e-3 f Cels",function() {
      expect(medida.calculate("-1.2e-3 f Cels")).to.deep.equal("-17.778444444444442C");
    });

    
  });

});
