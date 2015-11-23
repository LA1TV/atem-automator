var InputBase = require("./input-base");
var util = require("util");

var Input = function(id, name, enabled, initialState) {
	InputBase.call(this, id, name);
	this._enabled = !!enabled;
	this._initialState = !!initialState;
	this._active = !!initialState;
	this._resolvedState = !!initialState;
};
util.inherits(Input, InputBase);

Input.prototype.isEnabled = function() {
	return this._enabled;
}

Input.prototype.setEnabled = function(enabled) {
	enabled = !!enabled;

	if (enabled === this._enabled) {
		// no change
		return;
	}
	var oldResolvedState = this._resolvedState;
	this._resolvedState = enabled ? this._active : this._initialState;
	this._enabled = enabled;
	
	if (oldResolvedState !== this._resolvedState) {
		this._emitter.emit("stateChanged", this._resolvedState);
	}
}

Input.prototype.getInitialState = function() {
	return this._initialState;
}

Input.prototype.getInternalState = function() {
	return this._active;
}

Input.prototype.isActive = function() {
	return this._resolvedState;
};

Input.prototype.setActive = function(active) {
	active = !!active;
	if (this._active === active) {
		// no change
		return;
	}
	this._active = active;
	if (this._enabled) {
		this._resolvedState = active;
	}
	this._emitter.emit("internalStateChanged", active);
	if (this._enabled) {
		this._emitter.emit("stateChanged", this._resolvedState);
	}
};

module.exports = Input;