// http://stackoverflow.com/a/4025958
exports.arraysEqual = function(arr1, arr2) {
	if(arr1.length !== arr2.length)
		return false;
    
	for(var i = arr1.length; i--;) {
		if(arr1[i] !== arr2[i])
			return false;
	}
	return true;
};