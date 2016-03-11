var expect = chai.expect
describe('Pruebas del conversor de temperatura', function(){

  it("La función calculate deberia retornar un string", function(){
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
