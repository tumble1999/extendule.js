var CreateApp = (function(verbose) {
	'use strict';
	var output;
	var plugins = {};
	
	function RegisterPlugin(i, p) {
		if(i in plugins) return;
		plugins[i] = p;
		if(verbose) console.log("Setup plugin: " + i);
	}
	
	function Setup(s){
		'use strict';
		var set = function(k,v) {
			if(!(k in s)) return;
			s[k] = v;
		};
		var get = function(k) {
			if(k) return s[k];
			return Object.assign({},s);
		};
		RegisterPlugin("SETTINGS",{get,set});
	}
	
	function GetMain(b,m) {
		var f = m.unshift();
		if(m.length == 0) return GetMainFunc(b[f], m);
		return b[f];
	}
	
	function CreateApp(a) {
		if(a.settings) Setup(a.settings);
		if(a.plugins) {
			a.plugins(RegisterPlugin);
			if(!a.main) return;
			var main = GetMain(this,a.main);
			setTimeout(main,0);
			return plugins;
		}
		return {};
	}
	return CreateApp;
})(EXTENDULEJS_VERBOSE||false);