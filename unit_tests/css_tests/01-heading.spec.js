
describe('h1 ', function() {

  before(function(done) { frame = quixote.createFrame(options, done); });
  after(function() { frame.remove(); });
  
  beforeEach(function() {

    var html = '<h1>A heading</h1>';

    frame.reset();
    frame.add(html);
    elementList = frame.getAll('h1');

    elementListLength = elementList.length();
  });

  it('By default h1 should be brand red colour', function() {
          
    for(i = 0; i < elementListLength; i++){

      var element = elementList.at(i);
      var rawStyle = getRawStyle(element,'color');
      rawStyle = getHex(rawStyle);

      assert.equal(rawStyle,'#E10A0A', "colour should be red on mobile");

      frame.resize(768,500);
      rawStyle = getRawStyle(element,'color');
      rawStyle = getHex(rawStyle);
      assert.equal(rawStyle,'#E10A0A', "colour should be red on tablet");


      frame.resize(1200,500);
      rawStyle = getRawStyle(element,'color');
      rawStyle = getHex(rawStyle);
      assert.equal(rawStyle,'#E10A0A', "colour should be red on desktop");
    }
  });

});