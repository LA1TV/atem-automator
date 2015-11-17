var events = require('events');

var Input = function(id, name, enabled, initialState) {
	this._id = id;
	this._name = name;
	this._enabled = !!enabled;
	this._initialState = !!initialState;
	this._active = !!initialState;
	this._resolvedState = !!initialState;
	this._emitter = new events.EventEmitter();
};

Input.prototype.getId = function() {
	return this._id;
};

Input.prototype.getEmitter = function() {
	return this._emitter;
}

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
		this._emitter.emit("resolvedStateChanged", this._resolvedState);
	}
}

Input.prototype.getName = function() {
	return this._name;
}

Input.prototype.setName = function(name) {
	this._name = name;
}

Input.prototype.getInitialState = function() {
	return this._initialState;
}

Input.prototype.getResolvedState = function() {
	return this._resolvedState;
}

Input.prototype.isActive = function() {
	return this._active;
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
	this._emitter.emit("stateChanged", active);
	if (this._enabled) {
		this._emitter.emit("resolvedStateChanged", this._resolvedState);
	}
};

module.exports = Input;