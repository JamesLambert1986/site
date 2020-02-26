$(function () {
  'use strict'

  const cleanup = {
    beforeEach: function () {

    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };

  QUnit.module('Form', cleanup)

  // #UT-VMForms1
  QUnit.test('on submit detect required fields are not filled in', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="text" name="input" required=""></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(!submit, 'the form comes back with an error')
  })

  // #UT-VMForms2
  QUnit.test('on submit detect required fields are filled', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="text" name="input" required="" value="test"></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(submit, 'the form does not come back with an error')
  })

  // NOTE:  We could add more test cases for valid or invlaid email address
  //        but we are not introducing our own validation. We are using a 
  //        stndard set of rules and therefore we don't need to test further.
  // #UT-VMForms3
  QUnit.test('on submit detect email fields are invalid', function (assert) {
    
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="email" name="input" value="test" /></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(!submit, 'the form comes back with an error')
  })

  // #UT-VMForms4
  QUnit.test('on submit detect email fields are valid', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="email" name="input" value="test@domain.com" /></form>');
    let $form = $('#form');
    let submit = window.Vmforms.validate($form);

    assert.ok(submit, 'the form does not come back with an error')
  })
  // #UT-VMForms5
  QUnit.test('on submit detect checkbox fields are invalid', function (assert) {
    
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="checkbox" class="custom-control-input" id="customCheck2" value="test" required=""></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(!submit, 'the form comes back with an error')
  })

  // #UT-VMForms6
  QUnit.test('on submit detect checkbox fields are valid', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="checkbox" class="custom-control-input" id="customCheck2" value="test" required="" checked="checked"></form>');
    let $form = $('#form');
    let submit = window.Vmforms.validate($form);

    assert.ok(submit, 'the form does not come back with an error')
  })


  // #UT-VMForms7
  QUnit.test('on submit detect radio button fields are invalid', function (assert) {
    
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><div class="form-group"><input type="radio" id="radio-2" name="radio-group" class="custom-control-input" required=""><input type="radio" id="radio-3" name="radio-group" class="custom-control-input"></form>');

    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(!submit, 'the form comes back with an error')
  })

  // #UT-VMForms8
  QUnit.test('on submit detect radio button fields are valid', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><div class="form-group"><input type="radio" id="radio-2" name="radio-group" class="custom-control-input" required=""><input type="radio" id="radio-3" name="radio-group" class="custom-control-input" checked="checked"></form>');

    let $form = $('#form');
    let submit = window.Vmforms.validate($form);

    assert.ok(submit, 'the form does not come back with an error')
  })

  // #UT-VMForms9
  QUnit.test('on submit detect confirm password mismatch throws an error', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="password" class="form-control" name="password-1" id="password-1" required=""><input type="password" class="form-control" name="password-2" id="password-2" data-match="#password-1"></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(!submit, 'the form comes back with an error')
  })

  // #UT-VMForms10
  QUnit.test('on submit detect confirm password mismatch throws an error', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><input type="password" class="form-control" name="password-1" id="password-1" value="test" required=""><input type="password" class="form-control" name="password-2" id="password-2" data-match="#password-1" value="test"></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(submit, 'the form does not come back with an error')
  })


  // #UT-VMForms11
  QUnit.test('on submit detect any selects with the value of -1', function (assert) {
    assert.expect(1)
    $('#qunit-fixture').append('<form id="form"><select class="custom-select" id="dropdown-select-1"><option value="-1">Open this select menu</option><option value="1">One</option><option value="2">Two</option></select></form>');
    let $form = $('#form');
    var submit = window.Vmforms.validate($form);

    assert.ok(!submit, 'the form does come back with an error')
  })


  // #UT-VMForms12
  QUnit.test('on submit the alert box is unhidden if one is present', function (assert) {
    assert.expect(2)
    $('#qunit-fixture').append('<form id="form"><div class="alert-msg alert--danger" id="alert" role="alert" aria-hidden="true"><p class="alert__summary"><a href="" data-icon="/public/svg/ui.svg#down">Link</a></p></div><div class="form-group"><label for="text-1">Label to test <span class="error" aria-hidden="true">Error Message</span><span class="hint">Label hint text</span></label><input type="text" class="form-control" name="text-1" id="text-1" placeholder="Placeholder text" required></div></form>');

    let $form = $('#form');
    let $alert = $('#alert');
    var submit = window.Vmforms.validate($form,true);

    assert.ok(!submit, 'the form comes back with an error')
    assert.ok($alert.attr('aria-hidden') == 'false', 'the aria hidden attribute is set to false')
  })

  // #UT-VMForms13
  QUnit.test('on submit update the alert summary', function (assert) {
    assert.expect(2)
    $('#qunit-fixture').append('<form id="form"><div class="alert-msg alert--danger" id="alert" role="alert" aria-hidden="true"><p class="alert__summary"><a href="" data-icon="/public/svg/ui.svg#down">Link</a></p></div><div class="form-group"><label for="text-1">Label to test <span class="error" aria-hidden="true">Error Message</span><span class="hint">Label hint text</span></label><input type="text" class="form-control" name="text-1" id="text-1" placeholder="Placeholder text" required></div></form>');

    let $form = $('#form');
    let $summary = $form.find('.alert__summary').first();
    var submit = window.Vmforms.validate($form,true);
    let summarytext = $summary.text()
    assert.ok(!submit, 'the form comes back with an error')
    assert.ok(summarytext.includes('Error Message'), 'summary text updated with the label text')
  })


  QUnit.module('Radio button', cleanup)

  // #UT-VMForms14
  QUnit.test('on click make hidden fields required if are now visible', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('#qunit-fixture').append('<form id="form"><div class="custom-control custom-radio custom-radio--inline"><input type="radio" id="customRadioInline3" name="customRadioInline2" value="yes" class="custom-control-input option-1" required=""><label class="custom-control-label btn btn-tertiary" for="customRadioInline3">Yes</label><input type="radio" id="customRadioInline4" name="customRadioInline2" value="no" class="custom-control-input option-2"><label class="custom-control-label btn btn-tertiary" for="customRadioInline4">No</label><div class="option-content option-1-content"><div class="form-group form-group--bordered form-group--error" id="error1"><label for="text-input-hidden1" data-invalid-feedback="Error message goes here">Text input</label><input type="text" class="form-control" name="text-input-hidden1" id="text-input-hidden1" data-required="true"></div></div></div></form>');

    $('#customRadioInline3').trigger('click');

    setTimeout(function () {
      const requiredset = $('#text-input-hidden1').is('[required]')
      assert.ok(requiredset, 'field has the required attribute set')
      done()
    }, 10)
  })



  QUnit.module('Stepper', cleanup)

  // #UT-VMForms15
  QUnit.test('on click of the plus button increases the value by the step amount', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('#qunit-fixture').append('<div class="form-group form-group--stepper"><label for="sort-1-1">Stepper</label><span class="form-control stepper__minus" id="stepper__minus" role="presentation">-</span><input type="number" class="form-control" step="0.5" min="-10" max="10" name="sort-1-1" id="step__amount" required=""><span class="form-control stepper__plus" id="stepper__plus"  role="presentation">+</span></div>');

    const amount = $('#step__amount').val();
    const step = $('#step__amount').attr('step');

    $('#stepper__plus').trigger('click');

    setTimeout(function () {
      const new_amount = $('#step__amount').val();

      assert.ok(amount + step == new_amount, 'the amount is correct');
      done()
    }, 10)
  })

  // #UT-VMForms16
  QUnit.test('on click of the minus button decreases the value by the step amount', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('#qunit-fixture').append('<div class="form-group form-group--stepper"><label for="sort-1-1">Stepper</label><span class="form-control stepper__minus" id="stepper__minus" role="presentation">-</span><input type="number" class="form-control" step="0.5" min="-10" max="10" name="sort-1-1" id="step__amount" required=""><span class="form-control stepper__plus" id="stepper__plus"  role="presentation">+</span></div>');

    const amount = $('#step__amount').val();
    const step = $('#step__amount').attr('step');

    $('#stepper__minus').trigger('click');

    setTimeout(function () {
      const new_amount = $('#step__amount').val();

      assert.ok(amount - step == new_amount, 'the amount is correct');
      done()
    }, 10)
  })

  // #UT-VMForms17
  QUnit.test('on click of the plus button does not increase the amount when the max is already been reached', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('#qunit-fixture').append('<div class="form-group form-group--stepper"><label for="sort-1-1">Stepper</label><span class="form-control stepper__minus" id="stepper__minus" role="presentation">-</span><input type="number" class="form-control" step="0.5" min="-10" max="10" name="sort-1-1" id="step__amount" value="10" required=""><span class="form-control stepper__plus" id="stepper__plus"  role="presentation">+</span></div>');

    const amount = $('#step__amount').val();

    $('#stepper__plus').trigger('click');

    setTimeout(function () {
      const new_amount = $('#step__amount').val();

      assert.ok(amount == new_amount, 'the amount is correct');
      done()
    }, 10)
  })


  // #UT-VMForms18
  QUnit.test('on click of the minus button does not decrease the amount when the max is already been reached', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('#qunit-fixture').append('<div class="form-group form-group--stepper"><label for="sort-1-1">Stepper</label><span class="form-control stepper__minus" id="stepper__minus" role="presentation">-</span><input type="number" class="form-control" step="0.5" min="-10" max="10" name="sort-1-1" id="step__amount" value="-10" required=""><span class="form-control stepper__plus" id="stepper__plus"  role="presentation">+</span></div>');

    const amount = $('#step__amount').val();

    $('#stepper__minus').trigger('click');

    setTimeout(function () {
      const new_amount = $('#step__amount').val();

      assert.ok(amount == new_amount, 'the amount is correct');
      done()
    }, 10)
  })



})