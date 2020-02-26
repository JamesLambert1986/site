$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };

  QUnit.module('Links and buttons with [data-toggle="collapse"]', cleanup)


  // #UT-VMCollapse1
  QUnit.test('on page load items should have the class collapsed added to them', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<a href="#UT-VMCollapse1-div" class="btn btn-link" data-toggle="collapse" aria-expanded="false">Link should have the collapsed class</a><div id="UT-VMCollapse1-div" class="collapse" style=""><p>Some content</p></div>');
    
    // TO DO - Move this into a callable function
    window.Vmcollapse.onload();

    assert.ok($('[href="#UT-VMCollapse1-div"]').hasClass('collapsed'), 'the second tab link has the collapsed class');
  })
  
  // Tabs
  QUnit.module('Tabs', cleanup)

  // #UT-VMCollapse2
  QUnit.test('on page load should have the first tab shown', function (assert) {
    assert.expect(2)
    $('#qunit-fixture').append('<ul class="tabs flex-column flex-sm-row" role="tablist"><li class="tab"><a href="#tab-UT-VMCollapse2-tab1" class="tab__target" role="tab" data-toggle="collapse" aria-controls="tab-UT-VMCollapse2-tab1"><span class="tab__title" id="tab-UT-VMCollapse2-tab1-title">Tab 1</span></a></li><li class="tab"><a href="#tab-UT-VMCollapse2-tab2" class="tab__target" role="tab" data-toggle="collapse" aria-controls="tab-UT-VMCollapse2-tab2"><span class="tab__title" id="tab-UT-VMCollapse2-tab2-title">Tab 2</span></a></li></ul><div id="tab-UT-VMCollapse2-tab1" class="tabpanel collapse" data-parent="#UT-VMCollapse2" role="tabpanel" aria-labelledby="tab-UT-VMCollapse2-tab1-title"><div class="tabpanel__body text-center"><p>Tab Content 1</p></div></div><div id="tab-UT-VMCollapse2-tab2" class="tabpanel collapse" data-parent="#UT-VMCollapse2" role="tabpanel" aria-labelledby="tab-UT-VMCollapse2-tab2-title"><div class="tabpanel__body text-center"><p>Tab Content 2</p></div></div>');
    
    window.Vmcollapse.onload();

    // Results
    assert.ok(!$('[href="tab-UT-VMCollapse2-tab1"]').hasClass('collapsed'), 'Tab link does not have the collapsed class');
    assert.ok($('#tab-UT-VMCollapse2-tab1').hasClass('show'), 'Tab has the show class');
  })

  // #UT-VMCollapse3
  QUnit.test('should show the content as soon as a link is clicked', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('#qunit-fixture').append('<div id="parent"><ul class="tabs flex-column flex-sm-row" role="tablist"><li class="tab"><a href="#tab-tab1" class="tab__target" role="tab" data-toggle="collapse" aria-controls="tab-tab1"><span class="tab__title" id="tab-tab1-title">Tab 1</span></a></li><li class="tab"><a href="#tab-tab2" id="link2" class="tab__target" role="tab" data-toggle="collapse" aria-controls="tab-tab2"><span class="tab__title" id="tab-tab2-title">Tab 2</span></a></li></ul><div id="tab-tab1" class="tabpanel collapse" data-parent="#parent" role="tabpanel" aria-labelledby="tab-tab1-title"><div class="tabpanel__body text-center"><p>Tab Content 1</p></div></div><div id="tab-tab2" class="tabpanel collapse" data-parent="#parent" role="tabpanel" aria-labelledby="tab-tab2-title"><div class="tabpanel__body text-center"><p>Tab Content 2</p></div></div></div>');

    window.Vmcollapse.onload();

    var $tab_panel = $('#tab-tab2');

    assert.ok(!$tab_panel.hasClass('show'), 'does not have class "show" before being clicked')
    $tab_panel.one('show.bs.collapse', function () {
      
      setTimeout(function () {
        assert.ok($tab_panel.hasClass('show'), 'has class "show"')
        done()
      }, 100)
    })

    $('#link2').trigger("click")
  })


  // #UT-VMCollapse4
  QUnit.test('should not allow tab links to be clicked when the tabpanel is open', function (assert) {
    assert.expect(2)
    
    $('#qunit-fixture').append('<div id="UT-VMCollapse4" class="container   "><ul class="tabs flex-column flex-sm-row" role="tablist"><li class="tab"><a href="#tab-UT-VMCollapse4-tab1" class="tab__target" role="tab" data-toggle="collapse" aria-controls="tab-UT-VMCollapse4-tab1"><span class="tab__title" id="tab-UT-VMCollapse4-tab1-title">Tab 1</span></a></li><li class="tab"><a href="#tab-UT-VMCollapse4-tab2" class="tab__target" role="tab" data-toggle="collapse" aria-controls="tab-UT-VMCollapse4-tab2"><span class="tab__title" id="tab-UT-VMCollapse4-tab2-title">Tab 2</span></a></li></ul><div id="tab-UT-VMCollapse4-tab1" class="tabpanel collapse" data-parent="#UT-VMCollapse4" role="tabpanel" aria-labelledby="tab-UT-VMCollapse4-tab1-title"><div class="tabpanel__body text-center"><p>Tab Content 1</p></div></div><div id="tab-UT-VMCollapse4-tab2" class="tabpanel collapse" data-parent="#UT-VMCollapse4" role="tabpanel" aria-labelledby="tab-UT-VMCollapse4-tab2-title"><div class="tabpanel__body text-center"><p>Tab Content 2</p></div></div></div>')

    window.Vmcollapse.onload();

    var $link = $('[href="#tab-UT-VMCollapse4-tab1"]');
    var $tab_panel = $('#tab-UT-VMCollapse4-tab1');

    
    assert.ok($tab_panel.hasClass('show'), 'has class "show" before being clicked')
    
    var eventFired = false;
    var done = assert.async()


    $tab_panel.on('hide.bs.collapse', function () {
      eventFired = true;
    })
    $link.trigger('click');

    setTimeout(function () {
      assert.ok(!eventFired, 'show event did not fire')
      done()
    }, 1)
  })
 
  
})
