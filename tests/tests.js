var expect = chai.expect
describe('Pruebas del conversor de temperatura', function(){

  it("Array de tamaño 3", function(){
    this.value = "32C"
    expect(temperatura.calculate(this)).to.have.lengthOf(3);
  });

  it("32C deberia ser 32C, 89.6F, 305.15K", function(){
    this.value = "32C"
    expect(temperatura.calculate(this)).to.deep.equal([ '32 C', '89.6 F', '305.15 K' ]);
  });

  it("0C deberia ser 0C, 32F, 273.15K",function(){
    this.value = "0C"
    expect(temperatura.calculate(this)).to.deep.equal([ '0 C', '32 F', '273.15 K' ]);
  });

  it("273.15K deberia ser 0C, 32F, 273.15K",function(){
    this.value = "273.15K"
    expect(temperatura.calculate(this)).to.deep.equal([ '0 C', '32 F', '273.15 K' ]);
  });
  
  it("45F deberia ser 0C, 45F, 273.15K",function(){
    this.value = "45F"
    expect(temperatura.calculate(this)).to.deep.equal([ "7.222222222222222 C", '45 F', "280.3722222222222 K" ]);
  });

  it("45w no se acepta",function(){
    this.value = "45W"
    expect(temperatura.calculate(this)).to.deep.equal(undefined);
  });

  it("tem43c no se acepta",function(){
    this.value = "tem43c"
    expect(temperatura.calculate(this)).to.deep.equal(undefined);
  });

  it("Espacios en blanco no importan.0     C deberia ser 0C, 32F, 273.15K",function(){
    this.value = "0    C"
    expect(temperatura.calculate(this)).to.deep.equal([ '0 C', '32 F', '273.15 K' ]);
  });

  it("Se acepta notacion cientifica. -1.2e-3 f",function(){
    this.value = "-1.2e-3 f"
    expect(temperatura.calculate(this)).to.deep.equal([ "-17.778444444444442 C", "-0.0012 F", "255.37155555555555 K" ]);
  });
});
