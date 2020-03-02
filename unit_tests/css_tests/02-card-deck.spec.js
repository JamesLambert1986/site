describe('Card title', function() {

  before(function(done) { frame = quixote.createFrame(options, done); });
  after(function() { frame.remove(); });
  
  beforeEach(function() {

    var html = '<h5 class="card-title">Special title treatment</h5>';

    frame.reset();
    frame.add(html);
    elementList = frame.getAll('.card-title');

    elementListLength = elementList.length();
  });

  it('should have double the amount of spacing bottom on desktop', function() {
          
    for(i = 0; i < elementListLength; i++){

      var element = elementList.at(i);
      frame.resize(1200,500);

      rawStyle = getRawStyle(element,'margin-bottom');
      assert.equal(rawStyle,'24px', "margin bottom should be 1.5rem");
    }
  });

});