var Task = Backbone.Model.extend({
	idAttribute : 'key',
	urlRoot : '/task',
});

var Tasks = Backbone.Collection.extend({
	model : Task,
	url : '/task'
});

var TaskView = Backbone.View.extend({
	className : 'task',
	template : _.template($('#template-task').html()),
	events : {
		'click a' : 'onDelete',
		'change input' : 'onEdit',
	},
	render : function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	onDelete : function(ev) {
		this.model.destroy();
		ev.preventDefault();
	},
	onEdit : function(ev) {
		this.model.set('done', this.$el.find('input').prop('checked'));
		this.model.save();
		ev.preventDefault();
	},
});

var TasksView = Backbone.View.extend({
	events : {
		'click button#create' : 'onCreate',
	},
	initialize : function() {
		this.listenTo(this.collection, 'add', this.onAdd.bind(this));
		this.listenTo(this.collection, 'remove', this.onRemove.bind(this));
	},
	onAdd : function(task) {
		var taskView = new TaskView({
			model : task
		});
		this.$('#list').append(taskView.render().$el);
	},
	onRemove : function() {
		this.$('#list').empty();
		this.collection.each(function(task) {
			var taskView = new TaskView({
				model : task
			});
			this.$('#list').append(taskView.render().$el);
		});
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
