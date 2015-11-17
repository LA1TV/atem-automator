var Input = require("../src/input");
var Camera = require("../src/camera");
var Rule = require("../src/rule");

exports.setUp = function(callback) {
	this.input1 = new Input(150, "Studio 1 Mic Live", true, true);
	this.input2 = new Input(150, "Studio 2 Mic Live", true, false);
	this.disabledInput = new Input(150, "Door Input Which Is Broken", false, true);
	this.inputs = [this.input1, this.input2, this.disabledInput];
	this.camera1 = new Camera(1, true);
	this.camera2 = new Camera(2, true);
	this.disabledCamera = new Camera(3, false);
	this.cameras = [this.camera1, this.camera2, this.disabledCamera];
	this.rule = new Rule(2, this.inputs, this.cameras);
	callback();
};

exports.canBeInstansiated = function(test) {
	test.expect(1);
	test.ok(this.rule);
	test.done();
};

exports.initialisedWithCorrectInfo = function(test) {
	test.expect(3);
	test.strictEqual(this.rule.getPriority(), 2);
	test.strictEqual(this.rule.getInputs(), this.inputs);
	test.strictEqual(this.rule.getCameras(), this.cameras);
	test.done();
};

exports.hasEventEmitter = function(test) {
	test.expect(1);
	test.ok(this.rule.getEmitter());
	test.done();
};

exports.priorityCanBeChanged = function(test) {
	test.expect(1);
	this.rule.setPriority(99);
	test.strictEqual(this.rule.getPriority(), 99);
	test.done();
};

exports.inputsCanBeChanged = function(test) {
	test.expect(1);
	var newInputs = [this.input1];
	this.rule.setInputs(newInputs);
	test.strictEqual(this.rule.getInputs(), newInputs);
	test.done();
};

exports.camerasCanBeChanged = function(test) {
	test.expect(1);
	var newCameras = [this.camera1];
	this.rule.setCameras(newCameras);
	test.strictEqual(this.rule.getCameras(), newCameras);
	test.done();
};

exports.priorityChangedEventFired = function(test) {
	test.expect(2);
	
	var count = 0
	this.rule.getEmitter().on("priorityChanged", function(inputs) {
		test.ok(true);
		if (++count === 2) {
			test.done();
		}
	});

	// should be no event
	this.rule.setPriority(2);
	// event
	this.rule.setPriority(1);
	// event
	this.rule.setPriority(5);
	// no event
	this.rule.setPriority(5);
};

exports.inputsChangedEventFired = function(test) {
	test.expect(2);
	
	var count = 0
	this.rule.getEmitter().on("inputsChanged", function(inputs) {
		test.ok(true);
		if (++count === 2) {
			test.done();
		}
	});

	// should be no event
	this.rule.setInputs(this.inputs);
	// should be an event because order changed and this is taken into consideration
	this.rule.setInputs([this.input2, this.input1, this.disabledInput]);
	// no event
	this.rule.setInputs([this.input2, this.input1, this.disabledInput]);
	// event
	this.rule.setInputs([this.input2, this.input1]);
};

exports.camerasChangedEventFired = function(test) {
	test.expect(2);
	
	var count = 0
	this.rule.getEmitter().on("camerasChanged", function(inputs) {
		test.ok(true);
		if (++count === 2) {
			test.done();
		}
	});

	// should be no event
	this.rule.setCameras(this.cameras);
	// should be an event because order changed and this is taken into consideration
	this.rule.setCameras([this.camera2, this.camera1, this.disabledCamera]);
	// no event
	this.rule.setCameras([this.camera2, this.camera1, this.disabledCamera]);
	// event
	this.rule.setCameras([this.camera1, this.camera2]);
};