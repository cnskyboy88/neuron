/**
 * module  model
 * object manager, add or remove object members. 
 */

KM.define(function(K){

function escapeHTML(string){
	return string.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;')
				 .replace(/</g, '&lt;')
				 .replace(/>/g, '&gt;')
				 .replace(/"/g, '&quot;')
				 .replace(/'/g, '&#x27;')
				 .replace(/\//g,'&#x2F;');
};


var 

Model = K.Class({

	Implements: 'events attrs',
	
	initialize: function(initial, options){
		this._model = initial || {};
		
		// unique id 
		this.id = K.guid();
		
		this.set(options);
	},
	
	/**
	 * @interface
	 */
	sync: function(type, callback){
		
	},
	
	/**
	 * sync with 
	 */
	// sync: function(){
		
		// new Ajax().send()...
	// },
	
	/**
	 * update the value of a specified key associated with the model
	 * @return {boolean} whether the key is successfully updated
	 
	 <code>
	 1. 
	 update('username', 'kael');
	 
	 2.
	 update({
	 	username: 'kael',
	 	email: 'i@kael.me'
	 });
	 
	 </code>
	 
	 */
	update: K._overloadSetter(function(key, value){
		var self = this,
			validators = self.get('validators'),
			validator = validators[key],
			pass = true;
		
		if(!validator || (pass = !!validator(value)) ){
			self._model[key] = value;
		}
		
		
		self.fire('update', {
			key: key,
			value: value,
			valid: pass
		});
		
		// self.fire( pass ? 'update' : 'error', {
		//	key: key,
		//	value: value
		// });
		
		return pass;
	}),
		
	/**
	 * remove a key
	 * example:
	 <code>
	 	.remove('name');
	 	.remove('name', 'gender');
	 </code>
	 */
	remove: function(/* item1, item2, ... */){
		var self = this,
			model = self._model,
			args = K.makeArray(arguments);
		
		args.forEach(function(key){
			delete model[key];
		});
		
		self.fire('remove', {
			remove: args
		});
	},
	
	fetch: function(key){
		var model = this._model;
	
		return arguments.length ? K.isString(key) ? model[key] : null : K.clone(model);
	},
	
	escape: function(key){
		var value = this.fetch(key);
		
		return escapeHTML(value ? '' + value : '');
	} // ,
	
	// serialize: function(){
		
	// }
}),


ATTRS = {
	validators: {
	
		// so that we could add validator rules after initilization
		setter: function(rules){
			return K.mix(this.get('validators'), rules);
		},

		getter: function(v){
			return v || {};
		}
	},
	
	id: {
		getter: function(){
			return this.id;
		}
	}
};


K.Class.setAttrs(Model, ATTRS);



return Model;


});