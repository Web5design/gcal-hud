require(['require', 'mocha'], function(require, mocha) {
  mocha.setup('bdd');
  var tests = [
    // 'tests/modelTests',
    // 'tests/viewTests'
  ];

  require(tests, function() {
    mocha.run();
  });
});