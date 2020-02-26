$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('Data icon attribute is set', cleanup)

  // #UT-VMSvg1
  QUnit.test('on a inline link the svg should be appened to the link (right of the text)', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down">Jump down the page</a>');
    
    var $icon = $('#icon');
    var pos = window.Vmsvg.getpos($icon);

    assert.ok(pos == 'right', 'svg position set to right');
  })

  // #UT-VMSvg2
  QUnit.test('on a button the svg should be prepended to the button (left of the text)', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="/a-button" id="icon" class="btn btn-tertiary" data-icon="/public/svg/ui.svg#play">Tertiary CTA</a>');
    
    var $icon = $('#icon');
    var pos = window.Vmsvg.getpos($icon);

    assert.ok(pos == 'left', 'svg position set to left');
  })

  // #UT-VMSvg3
  QUnit.test('and a data-icon-right attribute is set on a button or link the svg should be appened to the link (right of the text)', function (assert) {

    assert.expect(2)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-right>Jump down the page</a>');
    $('#qunit-fixture').append('<a href="/a-button" id="icon2" class="btn btn-tertiary" data-icon="/public/svg/ui.svg#play" data-icon-right>Tertiary CTA</a>');
    
    var $icon = $('#icon');
    var pos = window.Vmsvg.getpos($icon);

    assert.ok(pos == 'right', 'svg position set to right');

    var $icon2 = $('#icon');
    var pos2 = window.Vmsvg.getpos($icon2);

    assert.ok(pos2 == 'right', 'svg position set to right');
  })

  // #UT-VMSvg4
  QUnit.test('and a data-icon-left attribute is set on a button or link the svg should be prepened to the link (left of the text)', function (assert) {

    assert.expect(2)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-left>Jump down the page</a>');
    $('#qunit-fixture').append('<a href="/a-button" id="icon2" class="btn btn-tertiary" data-icon="/public/svg/ui.svg#play" data-icon-left>Tertiary CTA</a>');
    
    var $icon = $('#icon');
    var pos = window.Vmsvg.getpos($icon);

    assert.ok(pos == 'left', 'svg position set to left');

    var $icon2 = $('#icon');
    var pos2 = window.Vmsvg.getpos($icon2);

    assert.ok(pos2 == 'left', 'svg position set to left');
  })
  
  // #UT-VMSvg5
  QUnit.test('and a data-icon-small attribute is set on a button or link the svg__wrapper should have a class of svg__wrapper--small', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-small>Jump down the page</a>');
    
    var $icon = $('#icon');
    var size = window.Vmsvg.getsvgsize($icon);

    assert.ok(size == 'svg__wrapper--small', 'svg size class is correct');

  })
  // #UT-VMSvg6
  QUnit.test('and a data-icon-medium attribute is set on a button or link the svg__wrapper should have a class of svg__wrapper--medium', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-medium>Jump down the page</a>');
    
    var $icon = $('#icon');
    var size = window.Vmsvg.getsvgsize($icon);

    assert.ok(size == 'svg__wrapper--medium', 'svg size class is correct');

  })
  // #UT-VMSvg7
  QUnit.test('and a data-icon-large attribute is set on a button or link the svg__wrapper should have a class of svg__wrapper--large', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-large>Jump down the page</a>');
    
    var $icon = $('#icon');
    var size = window.Vmsvg.getsvgsize($icon);

    assert.ok(size == 'svg__wrapper--large', 'svg size class is correct');

  })
  // #UT-VMSvg8
  QUnit.test('and a data-icon-x-large attribute is set on a button or link the svg__wrapper should have a class of svg__wrapper--x-large', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-x-large>Jump down the page</a>');
    
    var $icon = $('#icon');
    var size = window.Vmsvg.getsvgsize($icon);

    assert.ok(size == 'svg__wrapper--x-large', 'svg size class is correct');

  })

  // #UT-VMSvg9
  QUnit.test('with an icon from the ui.svg file an extra class of svg__wrapper--fill is set', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down">Jump down the page</a>');
    
    var $icon = $('#icon');
    var svgclass = window.Vmsvg.getsvgclass($icon);

    assert.ok(svgclass == 'svg__wrapper--fill', 'svg class is correct');
  })
  
  // #UT-VMSvg10
  QUnit.test('with a reference to a svg symbol created on inline to the page an extra class of svg__wrapper--fill is set', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="#down">Jump down the page</a>');
    
    var $icon = $('#icon');
    var svgclass = window.Vmsvg.getsvgclass($icon);

    assert.ok(svgclass == 'svg__wrapper--fill', 'svg class is correct');
  })

  // #UT-VMSvg11
  QUnit.test('and a data-icon-block attribute is set on a button or link the svg should have a class of d-block', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-block>Jump down the page</a>');
    
    var $icon = $('#icon');
    var display = window.Vmsvg.getsvgdisplay($icon);

    assert.ok(display == 'd-block', 'svg class is correct');

  })
  // #UT-VMSvg12
  QUnit.test('and a data-icon-title attribute is set on a button or link the svg should have a title element', function (assert) {

    assert.expect(1)
    
    $('#qunit-fixture').append('<a href="#down" id="icon" data-icon="/public/svg/ui.svg#down" data-icon-title="Title">Jump down the page</a>');
    
    var $icon = $('#icon');
    var title = window.Vmsvg.getsvgtitle($icon);

    assert.ok(title == '<title>Title</title>', 'svg title is correct');

  })
})