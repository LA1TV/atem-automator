var Input = require("../src/input");

exports.setUp = function(callback) {
	this.input = new Input(150, "Studio 1 Mic Live", true, false);
	callback();
};

exports.canBeInstansiated = function(test) {
	test.expect(1);
	test.ok(this.input);
	test.done();
};

exports.initialisedWithCorrectInfo = function(test) {
	test.expect(6);
	test.strictEqual(this.input.getId(), 150);
	test.strictEqual(this.input.isEnabled(), true);
	test.strictEqual(this.input.getInternalState(), false);
	test.strictEqual(this.input.getInitialState(), false);
	test.strictEqual(this.input.isActive(), false);
	test.strictEqual(this.input.getName(), "Studio 1 Mic Live");
	test.done();
};

exports.nameCanBeChanged = function(test) {
	test.expect(1);
	this.input.setName("Another Name");
	test.strictEqual(this.input.getName(), "Another Name");
	test.done();
};

exports.canBeMadeActiveAndInactive = function(test) {
	test.expect(2);
	this.input.setActive(false);
	test.strictEqual(this.input.getInternalState(), false);
	this.input.setActive(true);
	test.strictEqual(this.input.getInternalState(), true);
	test.done();
};

exports.hasEventEmitter = function(test) {
	test.expect(1);
	test.ok(this.input.getEmitter());
	test.done();
};

exports.stateChangeEventFired = function(test) {
	test.expect(2);
	
	var expecting = [true, false];
	this.input.getEmitter().on("stateChanged", function(active) {
		test.strictEqual(active, expecting.shift());
		if (expecting.length === 0) {
			test.done();
		}
	});

	this.input.setActive(true);
	// should be no event for this
	this.input.setActive(true);
	this.input.setActive(false);
	// should be no event for this
	this.input.setActive(false);
};

exports.internalStateChangeEventFired = function(test) {
	test.expect(2);
	
	var expecting = [true, false];
	this.input.getEmitter().on("internalStateChanged", function(active) {
		test.strictEqual(active, expecting.shift());
		if (expecting.length === 0) {
			test.done();
		}
	});

	this.input.setActive(true);
	// should be no event for this
	this.input.setActive(true);
	// should be no event for this
	this.input.setEnabled(false);
	this.input.setActive(false);
	// should be no event for this
	this.input.setActive(false);
	// should be no event for this
	this.input.setEnabled(true);
};

exports.stateIsCorrect = function(test) {
	test.expect(4);
	
	this.input.setActive(true);
	test.strictEqual(this.input.isActive(), true);
	this.input.setActive(false);
	test.strictEqual(this.input.isActive(), false);
	this.input.setActive(true);
	test.strictEqual(this.input.isActive(), true);
	this.input.setEnabled(false);
	// resolved state should now be false as it should be the initial
	// state given that the input is now disabled
	test.strictEqual(this.input.isActive(), false);
	test.done();
};

exports.stateChangeEventFiredCorrectlyWhenEnabledAndDisabled = function(test) {
	test.expect(6);
	
	var expecting = [true, false, true, false, true, false];
	this.input.getEmitter().on("stateChanged", function(active) {
		test.strictEqual(active, expecting.shift());
		if (expecting.length === 0) {
			test.done();
		}
	});

	this.input.setActive(true);
	// should be no event for this
	this.input.setActive(true);
	this.input.setActive(false);
	// should be no event for this
	this.input.setActive(false);
	this.input.setActive(true);
	// this should cause event
	this.input.setEnabled(false);

	// should be no event for these
	this.input.setActive(false);
	this.input.setActive(true);

	// should result in an event
	this.input.setEnabled(true);
	// should result in an event
	this.input.setActive(false);

	// should be no events
	this.input.setEnabled(false);
	this.input.setEnabled(true);
};