var events = require('events');
var arraysEqual = require('./helpers').arraysEqual;

var Rule = function(id, priority, inputs, cameras) {
	this._id = id;
	this._priority = priority;
	this._inputs = inputs;
	this._cameras = cameras;
	this._emitter = new events.EventEmitter();
};

Rule.prototype.getEmitter = function() {
	return this._emitter;
}

Rule.prototype.getId = function() {
	return this._id;
};

Rule.prototype.getPriority = function() {
	return this._priority;
};

Rule.prototype.setPriority = function(priority) {
	if (this._priority === priority) {
		// not changed
		return;
	}
	this._priority = priority;
	this._emitter.emit("priorityChanged", priority);
}

Rule.prototype.getInputs = function() {
	return this._inputs;
};

Rule.prototype.setInputs = function(inputs) {
	if (arraysEqual(inputs, this._inputs)) {
		return;
	}
	this._inputs = inputs;
	this._emitter.emit("inputsChanged", inputs);
};

Rule.prototype.getCameras = function() {
	return this._cameras;
};

Rule.prototype.setCameras = function(cameras) {
	if (arraysEqual(cameras, this._cameras)) {
		return;
	}
	this._cameras = cameras;
	this._emitter.emit("camerasChanged", cameras);
};

module.exports = Rule;