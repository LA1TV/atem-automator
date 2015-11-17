var Camera = function(id, enabled) {
	this._id = id;
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

module.exports = Camera;