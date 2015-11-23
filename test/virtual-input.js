var VirtualInput = require("../src/virtual-input");
var Input = require("../src/input");

exports.setUp = function(callback) {
	this.motionInput = new Input(140, "Mic Live", true, false);
	this.micInput = new Input(141, "Motion Detected", true, false);
	this.inputs = [this.motionInput, this.micInput];
	this.virtualInput = new VirtualInput(200, "Motion Detected or Mic Live", this.inputs);
	callback();
};

exports.canBeInstansiated = function(test) {
	test.expect(1);
	test.ok(this.virtualInput);
	test.done();
};

exports.initialisedWithCorrectInfo = function(test) {
	test.expect(4);
	test.strictEqual(this.virtualInput.getId(), 200);
	test.strictEqual(this.virtualInput.isActive(), false);
	test.strictEqual(this.virtualInput.getName(), "Motion Detected or Mic Live");
	test.strictEqual(this.virtualInput.getInputs(), this.inputs);
	test.done();
};

exports.nameCanBeChanged = function(test) {
	test.expect(1);
	this.virtualInput.setName("Another Name");
	test.strictEqual(this.virtualInput.getName(), "Another Name");
	test.done();
};

exports.hasEventEmitter = function(test) {
	test.expect(1);
	test.ok(this.virtualInput.getEmitter());
	test.done();
};

exports.stateChangeEventFired = function(test) {
	test.expect(4);
	
	var expecting = [true, false, true, false];
	this.virtualInput.getEmitter().on("stateChanged", function(active) {
		test.strictEqual(active, expecting.shift());
		if (expecting.length === 0) {
			test.done();
		}
	});

	// event
	this.motionInput.setActive(true);
	// event
	this.motionInput.setActive(false);
	// event
	this.micInput.setActive(true);
	this.motionInput.setActive(true);
	this.micInput.setActive(false);
	// event
	this.motionInput.setActive(false);
};

exports.stateIsCorrect = function(test) {
	test.expect(4);
	test.strictEqual(this.virtualInput.isActive(), false);
	this.motionInput.setActive(true);
	test.strictEqual(this.virtualInput.isActive(), true);
	this.micInput.setActive(true);
	test.strictEqual(this.virtualInput.isActive(), true);
	this.motionInput.setActive(false);
	this.micInput.setActive(false);
	test.strictEqual(this.virtualInput.isActive(), false);
	test.done();
};

exports.inputsCanBeChanged = function(test) {
	test.expect(2);
	var newInputs = [this.micInput];
	this.virtualInput.setInputs(newInputs);
	test.strictEqual(this.virtualInput.getInputs(), newInputs);
	newInputs = [];
	this.virtualInput.setInputs(newInputs);
	test.strictEqual(this.virtualInput.getInputs(), newInputs);
	test.done();
};

exports.stateRemainsCorrectWhenInputsChange = function(test) {
	test.expect(4);
	
	var expecting = [true, false, true, false];
	this.virtualInput.getEmitter().on("stateChanged", function(active) {
		test.strictEqual(active, expecting.shift());
		if (expecting.length === 0) {
			test.done();
		}
	});

	// event
	this.motionInput.setActive(true);
	var newInputs = [this.micInput];
	// event
	this.virtualInput.setInputs(newInputs);
	// event
	this.virtualInput.setInputs(this.inputs);
	// event
	this.motionInput.setActive(false);
	this.virtualInput.setInputs([]);
};