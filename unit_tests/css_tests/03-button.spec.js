describe('Button', function() {

  before(function(done) { frame = quixote.createFrame(options, done); });
  after(function() { frame.remove(); });
  
  beforeEach(function() {

    var html = '<a href="#" class="btn btn-primary">Go somewhere</a>';

    frame.reset();
    frame.add(html);
    element = frame.get('.btn-primary');

  });

  it('should stand out and look clickable', function() {
          

    assert.equal(getRawStyle(element,'height'),'38px', "have a large clickable area");
    assert.equal(getHex(getRawStyle(element,'background-color')),'#007BFF', "be a bright colour");
    assert.equal(getHex(getRawStyle(element,'color')),'#FFFFFF', "still have readable text color");

  });
});