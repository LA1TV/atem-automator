var main = require("../src/main")

exports.entryPointFound = function(test){
	test.expect(1);
	test.ok(main);
	test.done();
};