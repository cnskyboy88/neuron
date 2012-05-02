KM.define(['./model'], function(K, require){


function sortWithModelID(model){
	return model.id;
};


var 

Model = require('./model'),

ModelList = K.Class({
	initialize: function(){
		var self = this;
		
		self._models = [];
		
		
		
	},
	
	sync: function(){
		
	},
	
	// sorter: sortWithModelID,
	// model: Model,
	
	add: function(model){
	
		
	
		// make sure every model has a global unique id
		if(!model.id){
			model.id = K.guid();
		}
	
		this._models.push(model);
	},
	
	sort: function(sorter){
		var self = this,
			sorter = self.get('sorter');
		
		self._models.sort(function(a, b){
			return sorter(b) - sorter(b);
		});
	}
});


/**
 * there are two different ways to 
 */

K.Class.setAttrs(ModelList, {
	sorter: {
		getter: function(v){
			return v || this.sorter || sortWithModelID;
		}
	},
	
	
	/**
	 * constructor of model
	 */
	model: {
		getter: function(v){
			return v || this.model || Model;
		}
	}
});


});