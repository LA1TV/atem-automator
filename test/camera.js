var Camera = require("../src/camera");

exports.setUp = function(callback){
	this.camera = new Camera(100, "Studio 1 Cam", true);
	callback();
};

exports.canBeInstansiated = function(test){
	test.expect(1);
	test.ok(this.camera);
	test.done();
};

exports.hasCorrectIdAndEnabled = function(test){
	test.expect(3);
	test.strictEqual(this.camera.getId(), 100);
	test.strictEqual(this.camera.getName(), "Studio 1 Cam");
	test.strictEqual(this.camera.isEnabled(), true);
	test.done();
};

exports.canBeDisabledAndEnabled = function(test){
	test.expect(2);
	this.camera.setEnabled(false);
	test.strictEqual(this.camera.isEnabled(), false);
	this.camera.setEnabled(true);
	test.strictEqual(this.camera.isEnabled(), true);
	test.done();
};

exports.nameCanBeChanged = function(test) {
	test.expect(1);
	this.camera.setName("Another Name");
	test.strictEqual(this.camera.getName(), "Another Name");
	test.done();
};