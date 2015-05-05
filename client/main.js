var Task = Backbone.Model.extend({
	idAttribute : 'key',
	urlRoot : '/task',
});

var Tasks = Backbone.Collection.extend({
	model : Task,
	url : '/task'
});

var TasksView = Backbone.View.extend({
	events : {
		'click button#create' : 'onCreate',
	},
	initialize : function() {
		this.listenTo(this.collection, 'add', this.onAdd.bind(this));
	},
	onAdd : function(task) {
		$('<li>').text(task.get('title')).appendTo(this.$('ul'));
	},
	onCreate : function() {
		var task = new Task({
			title : this.$('input').val()
		});
		task.save().done(function() {
			this.collection.add(task);
			this.$('input').val('');
		}.bind(this));
	},
});

var tasks = new Tasks();
var tasksView = new TasksView({
	el : 'div#tasks',
	collection : tasks,
});
tasks.fetch();
