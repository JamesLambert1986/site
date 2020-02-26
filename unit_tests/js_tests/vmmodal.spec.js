$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('Modal', cleanup)

  // #UT-VMModal1
  QUnit.test('on open the class .modal--active is added the html element', function (assert) {

    assert.expect(2)
    
    $('#qunit-fixture').append('<div id="modal-1" class="modal pb-0" role="dialog" aria-labelledby="modal-1-modal-title" aria-describedby="modal-1-modal-description"><span id="modal-1-modal-title" class="sr-only">Modal Example</span><span id="modal-1-modal-description" class="sr-only">An example of how a modal will look</span><a href="#example_close" class="modal__overlay" data-modal-close="" tabindex="-1"></a><div class="modal__inner"><a href="#example_close" class="btn-modal-close" data-icon="/public/svg/ui.svg#close" data-icon-medium="" data-icon-block="" data-modal-close="" aria-label="Close modal" tabindex="1"><div class="svg__wrapper svg__wrapper--medium svg__wrapper--fill"><svg class="d-block"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/public/svg/ui.svg#close"></use></svg></div></a></div></div>');

    window.Vmmodal.open('#modal-1');

    assert.ok($('html').hasClass('modal--active'), 'html element has the correct class');


    window.Vmmodal.close('#modal-1');

    assert.ok(!$('html').hasClass('modal--active'), 'html element has the correct class removed');
  })

  // #UT-VMModal2
  QUnit.test('on close the class .modal--active is removed from the html element', function (assert) {

    assert.expect(2)
    
    $('#qunit-fixture').append('<div id="modal-1" class="modal pb-0" role="dialog" aria-labelledby="modal-1-modal-title" aria-describedby="modal-1-modal-description"><span id="modal-1-modal-title" class="sr-only">Modal Example</span><span id="modal-1-modal-description" class="sr-only">An example of how a modal will look</span><a href="#example_close" class="modal__overlay" data-modal-close="" tabindex="-1"></a><div class="modal__inner"><a href="#example_close" class="btn-modal-close" data-icon="/public/svg/ui.svg#close" data-icon-medium="" data-icon-block="" data-modal-close="" aria-label="Close modal" tabindex="1"><div class="svg__wrapper svg__wrapper--medium svg__wrapper--fill"><svg class="d-block"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/public/svg/ui.svg#close"></use></svg></div></a></div></div>');

    window.Vmmodal.open('#modal-1');

    assert.ok($('html').hasClass('modal--active'), 'html element has the correct class');

    window.Vmmodal.close('#modal-1');

    assert.ok(!$('html').hasClass('modal--active'), 'html element has the correct class removed');
  })
  
})