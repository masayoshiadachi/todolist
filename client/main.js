var Task = Backbone.Model.extend({
	idAttribute : 'key',
	urlRoot : '/task',
});

var Tasks = Backbone.Collection.extend({
	model : Task,
	url : '/task'
});

var tasks = new Tasks();
tasks.fetch().done(function() {
	tasks.each(function(task) {
		$('<li>').text(task.get('title')).appendTo($('ul#tasks'));
	});
});
