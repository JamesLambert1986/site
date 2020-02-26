/*
$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('Pattern', cleanup)

  // #UT-Vmpatterns1
  QUnit.test('on page load should have a svg added if one not already present', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<div class="pattern" id="pattern"></div>');
    
    var patternID = window.Vmpatterns.getPatternID($("#pattern"));

    assert.ok(patternID == 'pattern-1', 'a svg is added');
  })

  // #UT-Vmpatterns2
  QUnit.test('should show the second pattern when a class of pattern--2 is added to element', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<div class="pattern pattern--2" id="pattern"></div>');
    
    var patternID = window.Vmpatterns.getPatternID($("#pattern"));

    assert.ok(patternID == 'pattern-2', 'a svg is added');
  })

  // #UT-Vmpatterns3
  QUnit.test('should show the third pattern when a class of pattern--3 is added to element', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<div class="pattern pattern--3" id="pattern"></div>');
    
    var patternID = window.Vmpatterns.getPatternID($("#pattern"));

    assert.ok(patternID == 'pattern-3', 'a svg is added');
  })


  
})
*/