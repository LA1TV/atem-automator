var arraysEqual = require("../src/helpers").arraysEqual;

exports.arraysEqualExists = function(test) {
	test.expect(1);
	test.ok(arraysEqual);
	test.done();
};

exports.arraysEqualWorks = function(test) {
	test.expect(5);
	test.strictEqual(arraysEqual([], []), true);
	test.strictEqual(arraysEqual([], [1]), false);
	test.strictEqual(arraysEqual([1, 2, 3], [1, 2, 3]), true);
	test.strictEqual(arraysEqual([1, 2, 3], [3, 2, 1]), false);
	test.strictEqual(arraysEqual([1, 2, 3], [1, 2]), false);
	test.done();
};