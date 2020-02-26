$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('On page load', cleanup)

  // #UT-VMHelpers1
  QUnit.test('the class of js-enabled is added', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<div id="body">Body</div>');
    window.Vmhelpers.addhelpers("#body");
    
    assert.ok($('#body').hasClass('js-enabled'), 'the correct class is added to the body');
  })

  // #UT-VMHelpers2
  QUnit.test('the class of animate is added after a short delay', function (assert) {

    assert.expect(1)
    
    var done = assert.async()

    $('#qunit-fixture').append('<div id="body">Body</div>');
    window.Vmhelpers.addhelpers("#body");
    

    setTimeout(function () {
      assert.ok($('#body').hasClass('animate'), 'the correct class is added to the body');
      done()
    }, 500)
  })

  
})