var events = require('events');

var InputBase = function(id, name, enabled) {
	this._id = id;
	this._name = name;
	this._enabled = !!enabled;
	this._emitter = new events.EventEmitter();
};

InputBase.prototype.getId = function() {
	return this._id;
};

InputBase.prototype.getEmitter = function() {
	return this._emitter;
}

InputBase.prototype.getName = function() {
	return this._name;
}

InputBase.prototype.setName = function(name) {
	this._name = name;
}

InputBase.prototype.isActive = function() {
	throw "Not implemented!";
};

module.exports = InputBase;