$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('Font size setting', cleanup)

  // #UT-VMScale1
  QUnit.test('is set to very small (9px)', function (assert) {

    assert.expect(4)
    
    $('#qunit-fixture').append('<div id="modal-1" class="modal pb-0" role="dialog" aria-labelledby="modal-1-modal-title" aria-describedby="modal-1-modal-description"><span id="modal-1-modal-title" class="sr-only">Modal Example</span><span id="modal-1-modal-description" class="sr-only">An example of how a modal will look</span><a href="#example_close" class="modal__overlay" data-modal-close="" tabindex="-1"></a><div class="modal__inner"><a href="#example_close" class="btn-modal-close" data-icon="/public/svg/ui.svg#close" data-icon-medium="" data-icon-block="" data-modal-close="" aria-label="Close modal" tabindex="1"><div class="svg__wrapper svg__wrapper--medium svg__wrapper--fill"><svg class="d-block"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/public/svg/ui.svg#close"></use></svg></div></a></div></div>');

    var fontsizes = window.Vmscale.setfontsize(9);

    assert.ok(fontsizes.fontSize == 2.8125, 'the correct base font size is returned for mobile');
    assert.ok(fontsizes.SMfontSize == 1.1719, 'the correct base font size is returned for tablet');
    assert.ok(fontsizes.MDfontSize == 0.7031, 'the correct base font size is returned for desktop');
    assert.ok(fontsizes.LGfontSize == 0.625, 'the correct base font size is returned for larger desktop');
  })
  // #UT-VMScale2
  QUnit.test('is set to small (12px)', function (assert) {

    assert.expect(4)
    
    $('#qunit-fixture').append('<div id="modal-1" class="modal pb-0" role="dialog" aria-labelledby="modal-1-modal-title" aria-describedby="modal-1-modal-description"><span id="modal-1-modal-title" class="sr-only">Modal Example</span><span id="modal-1-modal-description" class="sr-only">An example of how a modal will look</span><a href="#example_close" class="modal__overlay" data-modal-close="" tabindex="-1"></a><div class="modal__inner"><a href="#example_close" class="btn-modal-close" data-icon="/public/svg/ui.svg#close" data-icon-medium="" data-icon-block="" data-modal-close="" aria-label="Close modal" tabindex="1"><div class="svg__wrapper svg__wrapper--medium svg__wrapper--fill"><svg class="d-block"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/public/svg/ui.svg#close"></use></svg></div></a></div></div>');

    var fontsizes = window.Vmscale.setfontsize(12);

    assert.ok(fontsizes.fontSize == 3.75, 'the correct base font size is returned for mobile');
    assert.ok(fontsizes.SMfontSize == 1.5625, 'the correct base font size is returned for tablet');
    assert.ok(fontsizes.MDfontSize == 0.9375, 'the correct base font size is returned for desktop');
    assert.ok(fontsizes.LGfontSize == 0.8333, 'the correct base font size is returned for larger desktop');
  })
  // #UT-VMScale3
  QUnit.test('is set to large (20px)', function (assert) {

    assert.expect(4)
    
    $('#qunit-fixture').append('<div id="modal-1" class="modal pb-0" role="dialog" aria-labelledby="modal-1-modal-title" aria-describedby="modal-1-modal-description"><span id="modal-1-modal-title" class="sr-only">Modal Example</span><span id="modal-1-modal-description" class="sr-only">An example of how a modal will look</span><a href="#example_close" class="modal__overlay" data-modal-close="" tabindex="-1"></a><div class="modal__inner"><a href="#example_close" class="btn-modal-close" data-icon="/public/svg/ui.svg#close" data-icon-medium="" data-icon-block="" data-modal-close="" aria-label="Close modal" tabindex="1"><div class="svg__wrapper svg__wrapper--medium svg__wrapper--fill"><svg class="d-block"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/public/svg/ui.svg#close"></use></svg></div></a></div></div>');

    var fontsizes = window.Vmscale.setfontsize(20);

    assert.ok(fontsizes.fontSize == 6.25, 'the correct base font size is returned for mobile');
    assert.ok(fontsizes.SMfontSize == 2.6042, 'the correct base font size is returned for tablet');
    assert.ok(fontsizes.MDfontSize == 1.5625, 'the correct base font size is returned for desktop');
    assert.ok(fontsizes.LGfontSize == 1.3889, 'the correct base font size is returned for larger desktop');
  })
  // #UT-VMScale4
  QUnit.test('is set to very large (24px)', function (assert) {

    assert.expect(4)
    
    $('#qunit-fixture').append('<div id="modal-1" class="modal pb-0" role="dialog" aria-labelledby="modal-1-modal-title" aria-describedby="modal-1-modal-description"><span id="modal-1-modal-title" class="sr-only">Modal Example</span><span id="modal-1-modal-description" class="sr-only">An example of how a modal will look</span><a href="#example_close" class="modal__overlay" data-modal-close="" tabindex="-1"></a><div class="modal__inner"><a href="#example_close" class="btn-modal-close" data-icon="/public/svg/ui.svg#close" data-icon-medium="" data-icon-block="" data-modal-close="" aria-label="Close modal" tabindex="1"><div class="svg__wrapper svg__wrapper--medium svg__wrapper--fill"><svg class="d-block"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/public/svg/ui.svg#close"></use></svg></div></a></div></div>');

    var fontsizes = window.Vmscale.setfontsize(24);

    assert.ok(fontsizes.fontSize == 7.5, 'the correct base font size is returned for mobile');
    assert.ok(fontsizes.SMfontSize == 3.125, 'the correct base font size is returned for tablet');
    assert.ok(fontsizes.MDfontSize == 1.875, 'the correct base font size is returned for desktop');
    assert.ok(fontsizes.LGfontSize == 1.6667, 'the correct base font size is returned for larger desktop');
  })

  
})