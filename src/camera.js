var Camera = function(id, name, enabled) {
	this._id = id;
	this._name = name;
	this._enabled = !!enabled;
};

Camera.prototype.getId = function() {
	return this._id;
};

Camera.prototype.isEnabled = function() {
	return this._enabled;
}

Camera.prototype.setEnabled = function(enabled) {
	this._enabled = !!enabled;
}

Camera.prototype.getName = function() {
	return this._name;
}

Camera.prototype.setName = function(name) {
	this._name = name;
}

module.exports = Camera;