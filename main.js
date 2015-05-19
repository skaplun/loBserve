

loBserve = (function () {

	var local = window._
	delete window._
	
	function cb (changes) {
		changes.forEach(function(change){
			var obj, type = change.type, key;
			if(type === 'add'){
				obj = change.object[change.name], key = Object.keys(obj)[0]
				if(key in this.actions){
					this.actions[key][type](this.calledMethods[this.calledMethods.length - 1]);
					// this.calledMethods.pop();
				}
			}
		}.bind(this))
	}
	
	function loBserve (arr, actions) {
		this.arr = arr
		this.actions = actions;
		this.calledMethods = [];
		
		Object.observe(this.calledMethods, cb.bind(this))
	}
	
	loBserve.prototype = mix(local);
	
	loBserve.prototype.update = function(prop, val){
		var obj = {};
		obj[prop] = val;
		this.calledMethods.push(obj)
	}
	
	function mix (target) {
		var obj = {}
		
		for(prop in target){
			(function (propClone) {
				obj[propClone] = function(){
					var val = target[propClone]( this.arr, arguments[0]);
					this.update(propClone, val)
					return val
				}

			}(prop));
			
		}		
		return obj
	}
	
	return loBserve
	

})();

arr = [1, 3];

hey = {
	a : function(){
		console.log(arguments);
	}
}

a = new loBserve(arr, {
	'map' : {
		'add' : hey.a
	}
});

b = a.map(function(v){
		return v+1
	})
c  = a.map(function(v){
		return v+2
	})

console.log(b) // [2, 4];
console.log(c) // [3, 5];

// hey.a called with {map : b} as arguments
// hey.a called with {map : c} as arguments


// console.log(b);
