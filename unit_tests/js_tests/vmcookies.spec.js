$(function () {
  'use strict'
  const cleanup = {
    beforeEach: function () {
      
    },
    afterEach: function () { 

      $('#qunit-fixture').html('')
    }
  };
  
  QUnit.module('Cookies', cleanup)

  // #UT-VMCookies1
  QUnit.test('on page load can be read to get the stored version', function (assert) {

    assert.expect(1)
    
    let version = "1.0";
    window.Vmcookies.create_cookie(version);
    // TO DO - Move this into a callable function
    let stored_version = window.Vmcookies.cookie_value("ePrivacy");

    assert.ok(stored_version == version, 'the version number is corrct');
  })
      
})
