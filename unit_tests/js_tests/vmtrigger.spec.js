$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('An element with the data-trigger attribute', cleanup)

  // #UT-VMTrigger1
  QUnit.test('which is a button is clicked, the trigger is triggered', function (assert) {

    assert.expect(2)
    
    var done = assert.async()

    $('#qunit-fixture').append('<button id="button" class="btn btn-primary" data-trigger="click" data-trigger-selector="#trigger-link">Trigger link</button><a href="#read-more-btn" id="trigger-link" class="btn btn-link collapsed" data-toggle="collapse" aria-expanded="false">Reveal some content</a><div id="read-more-btn" class="collapse" style=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>');
    

    assert.ok($('#trigger-link').hasClass('collapsed'), 'the collapsed class is set before trigger');
    $('#button').trigger('click');
    
    setTimeout(function () {

      assert.ok(!$('#trigger-link').hasClass('collapsed'), 'the collapsed class is removed');
      done()
    }, 100)
  })

  // #UT-VMTrigger2
  QUnit.test('which is a select is changed, the trigger is triggered', function (assert) {

    assert.expect(2)
    
    var done = assert.async()

    $('#qunit-fixture').append('<div class="form-group"><label for="dropdown-select-2">Select dropdown <span class="invalid-feedback">Error message goes here</span></label><select class="custom-select" id="dropdown-select-2" name="dropdown-select-2" data-trigger="click" data-trigger-selector="#select-trigger"><option value="-1" selected="">Open this select menu</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></div><a href="#read-more-select" id="select-trigger" class="btn btn-link collapsed" data-toggle="collapse" aria-expanded="false">Reveal some content</a><div id="read-more-select" class="collapse"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>');

    assert.ok($('#select-trigger').hasClass('collapsed'), 'the collapsed class is set before trigger');
    $('#dropdown-select-2').trigger('change');
    
    setTimeout(function () {

      assert.ok(!$('#select-trigger').hasClass('collapsed'), 'the collapsed class is removed');
      done()
    }, 100)
  })

  // #UT-VMTrigger3
  QUnit.test('which is a select is clicked, the trigger is NOT triggered', function (assert) {

    assert.expect(2)
    
    var done = assert.async()

    $('#qunit-fixture').append('<div class="form-group"><label for="dropdown-select-2">Select dropdown <span class="invalid-feedback">Error message goes here</span></label><select class="custom-select" id="dropdown-select-2" name="dropdown-select-2" data-trigger="click" data-trigger-selector="#select-trigger"><option value="-1" selected="">Open this select menu</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></div><a href="#read-more-select" id="select-trigger" class="btn btn-link collapsed" data-toggle="collapse" aria-expanded="false">Reveal some content</a><div id="read-more-select" class="collapse"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>');

    assert.ok($('#select-trigger').hasClass('collapsed'), 'the collapsed class is set before trigger');
    $('#dropdown-select-2').trigger('click');
    
    setTimeout(function () {

      assert.ok($('#select-trigger').hasClass('collapsed'), 'the collapsed class is NOT removed');
      done()
    }, 100)
  })

  // #UT-VMTrigger4
  QUnit.test('with a trigger of select-collapse is triggered aslong as the value equals 2', function (assert) {

    assert.expect(4)
  
    $('#qunit-fixture').append('<div class="form-group"><label for="dropdown-select-1">Select dropdown <span class="invalid-feedback">Error message goes here</span></label><select class="custom-select" id="dropdown-select-1" name="dropdown-select-1" data-trigger="select-collapse" data-trigger-selector="#more-form" data-show-if="2"><option value="-1" selected="">Open this select menu</option><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></select></div><div id="more-form" class="collapse"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>');
    
    assert.ok(!$('#more-form').hasClass('show'), 'the collapsed class is set before trigger');

    $('#dropdown-select-1').change();
    assert.ok(!$('#more-form').hasClass('show'), 'the show class is NOT set');

    $('#dropdown-select-1').val('1').change();
    assert.ok(!$('#more-form').hasClass('show'), 'the show class is NOT set');

    $('#dropdown-select-1').val('2').change();
    assert.ok($('#more-form').hasClass('show'), 'the show class is set');
  })

  // #UT-VMTrigger5
  QUnit.test('with a trigger of collapse the selector given become collapsed (closed)', function (assert) {

    assert.expect(2)
    
    var done = assert.async()

    $('#qunit-fixture').append('<button id="button" class="btn btn-primary" data-trigger="collapse" data-trigger-selector="#read-more-btn">Trigger link</button><a href="#read-more-btn" id="trigger-link" class="btn btn-link collapsed" data-toggle="collapse" aria-expanded="false">Reveal some content</a><div id="read-more-btn" class="collapse show" style=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>');
    

    assert.ok($('#read-more-btn').hasClass('show'), 'the show class is set before trigger');
    $('#button').trigger('click');
    
    setTimeout(function () {

      assert.ok(!$('#read-more-btn').hasClass('show'), 'the show class is removed');
      done()
    }, 100)
  })
  

  // #UT-VMTrigger6
  QUnit.test('with a trigger of show the selector given become shown', function (assert) {

    
    assert.expect(2)
    
    var done = assert.async()

    $('#qunit-fixture').append('<button id="button" class="btn btn-primary" data-trigger="show" data-trigger-selector="#read-more-btn">Trigger link</button><a href="#read-more-btn" id="trigger-link" class="btn btn-link collapsed" data-toggle="collapse" aria-expanded="false">Reveal some content</a><div id="read-more-btn" class="collapse" style=""><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>');
    

    assert.ok(!$('#read-more-btn').hasClass('show'), 'the show class is NOT set before trigger');
    $('#button').trigger('click');
    
    setTimeout(function () {

      assert.ok($('#read-more-btn').hasClass('show'), 'the show class is set');
      done()
    }, 100)
  })

})