var InputBase = require("./input-base");
var util = require("util");
var helpers = require("./helpers");

var VirtualInput = function(id, name, inputs) {
	InputBase.call(this, id, name);
	this._inputs = [];
	this._active = null;
	var self = this;
	this._onStateChanged = function() {
		self._calculate();
	}
	this.setInputs(inputs);
};
util.inherits(VirtualInput, InputBase);

VirtualInput.prototype.getInputs = function() {
	return this._inputs;
};

VirtualInput.prototype.setInputs = function(inputs) {
	if (helpers.arraysEqual(inputs, this._inputs)) {
		// no change
		return;
	}

	// remove event listeners from old inputs
	for (var i=0; i<this._inputs.length; i++) {
		var input = this._inputs[i];
		input.getEmitter().removeListener("stateChanged", this._onStateChanged);
	}
	// add event listeners to new inputs
	for (var i=0; i<inputs.length; i++) {
		var input = inputs[i];
		var self = this;
		input.getEmitter().on("stateChanged", this._onStateChanged);
	}
	this._inputs = inputs;
	// update state
	this._calculate();
};

VirtualInput.prototype.isActive = function() {
	return this._active;
};

// if any of the inputs are active then this virtual input
// should also be active
VirtualInput.prototype._calculate = function() {
	var active = false;
	for (var i=0; i<this._inputs.length; i++) {
		var input = this._inputs[i];
		if (input.isActive()) {
			active = true;
			break;
		}
	}
	if (this._active === active) {
		// no change
		return;
	}
	this._active = active;
	if (this.active !== null) {
		// emit event if changing, not initializing
		this._emitter.emit("stateChanged", active);
	}
};

module.exports = VirtualInput;