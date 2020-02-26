$(function () {
  'use strict'

  const cleanup = {
    beforeEach: function () {

    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };

  QUnit.module('Internal link', cleanup)

  // #UT-VMGA1
  QUnit.test('on click should return an object containing {"eventCategory":"Internal link", "eventAction":"Click", "eventLabel":"A basic link"}', function (assert) {
    assert.expect(3)
    $('#qunit-fixture').append('<p><a href="/a-page" id="UT-VMGA1-link" title="a title" aria-label="an aria label">A basic link</a></p>');
    var $link = $('#UT-VMGA1-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventCategory == "Internal link", 'the correct event category returned (returned: ' + action.eventCategory+')')
    assert.ok(action.eventAction == "Click", 'the correct event action returned (returned: ' + action.eventAction+')')
    assert.ok(action.eventLabel == "A basic link", 'the correct event action returned (returned: ' + action.eventLabel+')')
  })

  // #UT-VMGA2
  QUnit.test('on click should return an event label that matches the text of the link (including hidden text).', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<a href="/a-page" id="UT-VMGA2-link" title="Test">A basic link <span class="sr-only">with hidden context</span> </a>');
    var $link = $('#UT-VMGA2-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventLabel == "A basic link with hidden context", 'the correct event action returned (returned: ' + action.eventLabel+')')
  })

  QUnit.module('Anchor link', cleanup)

  // #UT-VMGA3
  QUnit.test('on click will return the event category of "Anchor link".', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<a href="#inside-page" id="UT-VMGA3-link" title="Test">Anchor link</a>')
    var $link = $('#UT-VMGA3-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventCategory == "Anchor link", 'the correct event category returned (returned: ' + action.eventCategory+')')
  })

  QUnit.module('Button', cleanup)

  // #UT-VMGA4
  QUnit.test('on click will return the event category of "Button".', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<button id="UT-VMGA4-button">Button</button>')
    var $link = $('#UT-VMGA4-button');
    var action = window.Vmga.action($link);

    assert.ok(action.eventCategory == "Button", 'the correct event category returned (returned: ' + action.eventCategory+')')
  })

  QUnit.module('External link', cleanup)

  // #UT-VMGA5
  QUnit.test('on click will return the event category of "External link".', function (assert) {
    assert.expect(2)
    $('#qunit-fixture').append('<a href="http://www.externallink.co.uk" id="UT-VMGA5-link">External link (http)</a><p><a href="https://www.externallink.co.uk" id="UT-VMGA5-link2">External link (https)</a>')
    var $link = $('#UT-VMGA5-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventCategory == "External link", 'the correct event category returned (returned: ' + action.eventCategory+')')

    // Run the same test on https protocal
    $('#UT-VMGA5').appendTo('#qunit-fixture');
    var $link2 = $('#UT-VMGA5-link2');
    var action2 = window.Vmga.action($link2);
    assert.ok(action2.eventCategory == "External link", 'the correct event category returned (returned: ' + action.eventCategory+')')
  })

  // #UT-VMGA6
  QUnit.test('on click will return the link address within the event label.', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<a href="http://www.externallink.co.uk" id="UT-VMGA6-link">External link</a>');
    var $link = $('#UT-VMGA6-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventLabel.includes("href="), 'event label contains the href attribute')
  })

  QUnit.module('PDF link', cleanup)

  // #UT-VMGA7
  QUnit.test('on click will return the event category of "PDF link".', function (assert) {
    assert.expect(2)
    $('#qunit-fixture').append('<a href="/file.pdf" id="UT-VMGA7-link">PDF link</a><a href="http://www.externallink.co.uk/file.pdf" id="UT-VMGA7-link2">External PDF link</a>');
    var $link = $('#UT-VMGA7-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventCategory == "PDF link", 'the correct event category returned (returned: ' + action.eventCategory+')')

    // Run the test on an external link
    var $link2 = $('#UT-VMGA7-link2');
    var action2 = window.Vmga.action($link2);
    assert.ok(action2.eventCategory == "PDF link", 'the correct event category returned (returned: ' + action2.eventCategory+')')
  })

  // #UT-VMGA8
  QUnit.test('on click will return the link address within the event label.', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<a href="/file.pdf" id="UT-VMGA8-link">PDF link</a>');
    var $link = $('#UT-VMGA8-link');
    var action = window.Vmga.action($link);

    assert.ok(action.eventLabel.includes("href="), 'event label contains the href attribute')
  })

  QUnit.module('Internal Link, External link or button', cleanup)

  // #UT-VMGA9
  QUnit.test('with a class attribute on click should return the class attribute appeneded to the event label.', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<p><a href="/a-page" id="UT-VMGA9-link" title="a title" aria-label="an aria label" class="btn btn-primary">A basic link</a></p>');
    
    var action = window.Vmga.action($('#UT-VMGA9-link'));

    assert.ok(action.eventLabel.includes('[class="btn btn-primary"]'), 'event label contains the class attribute')
  })

  // #UT-VMGA10
  QUnit.test('on click within a header should contain "- header" within the event label.', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<header><a href="/a-page" id="UT-VMGA10-link" title="a title" aria-label="an aria label" class="btn btn-primary">A basic link</a></header>');
    
    var action = window.Vmga.action($('#UT-VMGA10-link'));

    assert.ok(action.eventLabel.includes(' - header'), 'event label contains the " - header"')
  })

  // #UT-VMGA11
  QUnit.test('on click within a footer should contain "- footer" within the event label.', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<footer><a href="/a-page" id="UT-VMGA11-link" title="a title" aria-label="an aria label" class="btn btn-primary">A basic link</a></footer>');
    
    var action = window.Vmga.action($('#UT-VMGA11-link'));

    assert.ok(action.eventLabel.includes(' - footer'), 'event label contains the " - footer"')
  })

  // #UT-VMGA12
  QUnit.test('with a data attribute of data-toggle on click should contain the data-toggle attribute within the event label', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<p><a href="/a-page" id="UT-VMGA12-link" title="a title" aria-label="an aria label" class="btn btn-primary" data-toggle="collapse">A collapse link</a></p>');
    
    var action = window.Vmga.action($('#UT-VMGA12-link'));

    assert.ok(action.eventLabel.includes('[data-toggle="collapse"]'), 'event label contains the data-toggle attribute')
  })

  // #UT-VMGA13
  QUnit.test('with a data attribute of data-trigger on click should contain the data-trigger attribute within the event label', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<p><a href="/a-page" id="UT-VMGA13-link" title="a title" aria-label="an aria label" class="btn btn-primary" data-trigger="scrollto" data-trigger-selector="#div">A collapse link</a></p>');
    
    var action = window.Vmga.action($('#UT-VMGA13-link'));

    assert.ok(action.eventLabel.includes('[data-trigger="scrollto"]'), 'event label contains the data-trigger attribute')
  })

  // #UT-VMGA14
  QUnit.test('with a data attribute of data-trigger-selector on click should contain the data-trigger-selector attribute within the event label', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<p><a href="/a-page" id="UT-VMGA14-link" title="a title" aria-label="an aria label" class="btn btn-primary" data-trigger="scrollto" data-trigger-selector="#div">A collapse link</a></p>');
    
    var action = window.Vmga.action($('#UT-VMGA14-link'));

    assert.ok(action.eventLabel.includes('[data-trigger-selector="#div"]'), 'event label contains the data-trigger-selector attribute')
  })

  QUnit.module('Form', cleanup)

  // #UT-VMGA15
  QUnit.test('on submit should return an object containing {"eventCategory":"Form", "eventAction":"Submit", "eventLabel":"/form-process"}', function (assert) {
    assert.expect(3)
    $('#qunit-fixture').append('<form id="UT-VMGA15-form" action="/process-form"><input type="text" id="UT-VMGA20-input" class="form-control" /><button>Submit</button></form>');

    var $link = $('#UT-VMGA15-form');
    var action = window.Vmga.action($link);

    assert.ok(action.eventCategory == "Form", 'the correct event category returned (returned: ' + action.eventCategory+')')
    assert.ok(action.eventAction == "Submit", 'the correct event action returned (returned: ' + action.eventAction+')')
    assert.ok(action.eventLabel == "http://localhost:9876/process-form", 'the correct event action returned (returned: ' + action.eventLabel+')')
  })

})