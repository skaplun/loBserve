
	
	
$(function(){

	arr = [2];
	O = {};

	function log(){
		console.log(1)
	}

	Observer = (function(){

		function observe (obj, callback){
			Object.observe(obj, function(changes){
				callback()
			})
		}
		
	var local = window._
	// delete window._;
	
	// for(method in local){
		// method = local.mixin(local.method, function(){
		// console.log(1)
		// })
	// }
	for(method in local){
		O[method] = local.mixin({method : log});
	}
	console.log(O)
	return O;

	})();
	
	a = Observer.map(arr, function(v){
		return v+1
	})
	console.log(a)
	// b = Observer.map(arr, function(v){
		// return v+1
	// })
	// console.log(a)
	


});