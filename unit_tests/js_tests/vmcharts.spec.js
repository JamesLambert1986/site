$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  const barchart = '<div class="container--chart"><div class="chart__key row"><span class="key__title h6">Key</span><span class="key__btn body" data-chartid="testchart" data-index="1" role="button">Cash</span> <span class="key__btn body" data-chartid="testchart" data-index="2" role="button">Savings</span> <span class="key__btn key__btn--clear body" role="button" data-chartid="testchart" data-index="all">Clear all</span></div><div class="chart__wrapper "><div class="chart " id="testchart"><div class="chart__inner"><div class="chart__y-axis"><div class="group" style="--percent: 0%;" data-percent="0"><span class="chart__label">0</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£5k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£10k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£15k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£20k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£25k</span></div></div><div class="chart__x-axis"><div class="chart__guidelines"><div class="guideline" style="--percent: 0%;" data-percent="0"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div></div><ul class="list-unstyled"><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 80%;" tabindex="1" data-percent="80"><span data-tooltip=""><span class="text-nowrap">1st June 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£2000</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 52%;" tabindex="1" data-percent="52"><span data-tooltip=""><span class="text-nowrap">1st June 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£1300</strong></span></div><span class="chart__label">June</span><span class="marker"></span> </li><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 52%;" tabindex="1" data-percent="52"><span data-tooltip=""><span class="text-nowrap">1st July 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£13k</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 64%;" tabindex="1" data-percent="64"><span data-tooltip=""><span class="text-nowrap">1st July 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£13k</strong></span></div><span class="chart__label">July</span><span class="marker"></span></li><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 56.00000000000001%;" tabindex="1" data-percent="56.00000000000001"><span data-tooltip=""><span class="text-nowrap">1st August 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£13k</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 96%;" tabindex="1" data-percent="96"><span data-tooltip=""><span class="text-nowrap">1st August 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£13k</strong></span></div><span class="chart__label">August</span><span class="marker"></span></li><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 56.00000000000001%;" tabindex="1" data-percent="56.00000000000001"><span data-tooltip=""><span class="text-nowrap">1st September 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£13k</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 16%;" tabindex="1" data-percent="16"><span data-tooltip=""><span class="text-nowrap">1st September 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£13k</strong></span></div><span class="chart__label">September</span><span class="marker"></span> </li></ul><!-- y-axis lines added here --> <!-- target lines added here --><svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none"><path fill="none" d="M 25,20 L 75,48 L 125,43.99999999999999 L 175,43.99999999999999 "></path></svg><svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none"><path fill="none" d="M 25,48 L 75,36 L 125,4 L 175,84 "></path></svg></div><div class="chart__x-axis--mobile"><span class="chart__label"></span><span class="chart__label"></span></div></div></div></div></div>';
  const linechart = '<div class="container--chart chart--line"><div class="chart__key row"><span class="key__title h6">Key</span><span class="key__btn body" data-chartid="testchart" data-index="1" role="button">Cash</span> <span class="key__btn body" data-chartid="testchart" data-index="2" role="button">Savings</span> <span class="key__btn key__btn--clear body" role="button" data-chartid="testchart" data-index="all">Clear all</span></div><div class="chart__wrapper "><div class="chart " id="testchart"><div class="chart__inner"><div class="chart__y-axis"><div class="group" style="--percent: 0%;" data-percent="0"><span class="chart__label">0</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£5k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£10k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£15k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£20k</span></div><div class="group" style="--percent: 20%;" data-percent="20"><span class="chart__label">£25k</span></div></div><div class="chart__x-axis"><div class="chart__guidelines"><div class="guideline" style="--percent: 0%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div><div class="guideline" style="--percent: 20%;" data-percent="20"></div></div><ul class="list-unstyled"><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 80%;" tabindex="1" data-percent="80"><span data-tooltip=""><span class="text-nowrap">1st June 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£2000</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 52%;" tabindex="1" data-percent="52"><span data-tooltip=""><span class="text-nowrap">1st June 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£1300</strong></span></div><span class="chart__label">June</span><span class="marker"></span> </li><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 52%;" tabindex="1" data-percent="52"><span data-tooltip=""><span class="text-nowrap">1st July 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£13k</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 64%;" tabindex="1" data-percent="64"><span data-tooltip=""><span class="text-nowrap">1st July 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£13k</strong></span></div><span class="chart__label">July</span><span class="marker"></span></li><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 56.00000000000001%;" tabindex="1" data-percent="56.00000000000001"><span data-tooltip=""><span class="text-nowrap">1st August 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£13k</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 96%;" tabindex="1" data-percent="96"><span data-tooltip=""><span class="text-nowrap">1st August 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£13k</strong></span></div><span class="chart__label">August</span><span class="marker"></span></li><li class="group"><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 56.00000000000001%;" tabindex="1" data-percent="56.00000000000001"><span data-tooltip=""><span class="text-nowrap">1st September 2018</span><br><span class="text-nowrap">Cash</span><br><strong>£13k</strong></span></div><div class="data tooltip tooltip--center tooltip--top tooltip--short" style="--percent: 16%;" tabindex="1" data-percent="16"><span data-tooltip=""><span class="text-nowrap">1st September 2018</span><br><span class="text-nowrap">Savings</span><br><strong>£13k</strong></span></div><span class="chart__label">September</span><span class="marker"></span> </li></ul><!-- y-axis lines added here --> <!-- target lines added here --><svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none"><path fill="none" d="M 25,20 L 75,48 L 125,43.99999999999999 L 175,43.99999999999999 "></path></svg><svg viewBox="0 0 200 100" class="line" preserveAspectRatio="none"><path fill="none" d="M 25,48 L 75,36 L 125,4 L 175,84 "></path></svg></div><div class="chart__x-axis--mobile"><span class="chart__label"></span><span class="chart__label"></span></div></div></div></div></div>';


  QUnit.module('Chart', cleanup)

  // #UT-VMCharts1
  QUnit.test('on load on an older browser', function (assert) {

    assert.expect(1)
    var done = assert.async();

    $('#qunit-fixture').append(barchart);

    window.Vmcharts.compatible_view('#testchart');
    var passtest = true;

    var datatotal = $('#testchart .data').length;
    $('#testchart .data').each(function(index){

      var $this = $(this);
      var styleattr = $this.attr('style');

      if(!styleattr.includes('height:'))
        passtest = false;

      if (index === datatotal - 1)
        done()
    });

    assert.ok(passtest, 'the data bars have a height set to it');
  })

  // #UT-VMCharts2
  QUnit.test('with the class of chart--line on load on an older browser', function (assert) {

    assert.expect(1)
    var done = assert.async();

    $('#qunit-fixture').html('')
    $('#qunit-fixture').append(linechart);

    window.Vmcharts.compatible_view('#testchart');
    var passtest = true;

    var datatotal = $('#testchart .data').length;
    $('#testchart .data').each(function(index){

      var $this = $(this);
      var styleattr = $this.attr('style');

      if(styleattr.includes('height:'))
        passtest = false;

      if(!styleattr.includes('bottom:'))
        passtest = false;

      if (index === datatotal - 1)
        done()
    });

    assert.ok(passtest, 'the data bars have a bottom set to it');
  })
  


  // #UT-VMCharts3
  QUnit.test('load on an older browser', function (assert) {

    assert.expect(1)
    var done = assert.async();

    $('#qunit-fixture').html('')
    $('#qunit-fixture').append(linechart);

    window.Vmcharts.compatible_view('#testchart');
    var passtest = true;

    var datatotal = $('#testchart .chart__y-axis .group').length;
    $('#testchart .chart__y-axis .group').each(function(index){

      var $this = $(this);
      var styleattr = $this.attr('style');

      if(!styleattr.includes('height:'))
        passtest = false;

      if(styleattr.includes('bottom:'))
        passtest = false;

      if (index === datatotal - 1)
        done()
    });

    assert.ok(passtest, 'the Y-Axis labels have a height set to it');
  })


  // #UT-VMCharts4
  QUnit.test('load on an older browser', function (assert) {

    assert.expect(1)
    var done = assert.async();

    $('#qunit-fixture').html('')
    $('#qunit-fixture').append(linechart);

    window.Vmcharts.compatible_view('#testchart');
    var passtest = true;

    var datatotal = $('#testchart .chart__x-axis .guideline').length;
    $('#testchart .chart__x-axis .guideline').each(function(index){

      var $this = $(this);
      var styleattr = $this.attr('style');

      if(!styleattr.includes('height:'))
        passtest = false;

      if(styleattr.includes('bottom:'))
        passtest = false;

      if (index === datatotal - 1)
        done()
    });

    assert.ok(passtest, 'the guidelines have a height set to it');
  })



  // #UT-VMCharts5
  QUnit.test('on data set change the data-set attribute is updated', function (assert) {

    assert.expect(1)

    $('#qunit-fixture').append(barchart);

    window.Vmcharts.setDataSet('testchart','2');
    
    assert.ok($('#testchart').attr('data-set') == '2', 'the correct data set is applied');
  })
})