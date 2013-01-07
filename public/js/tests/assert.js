// simple assert function
define([], function() {
  return function(expr, msg) {
    if (!expr) throw new Error(msg || 'failed');
  };
});