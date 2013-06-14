/*
 * @hellocreation
 */
$(function() {
	/**
	 * Model
	 */
	Tour = Backbone.Model.extend({});
	Year = Backbone.Model.extend({});
	Activity = Backbone.Model.extend({});

	/**
	 * Collection
	 */
	TourCollection = Backbone.Collection.extend({
		model: Tour,

		//If you define a comparator, it will be used to maintain the collection in sorted order.
		comparator: function(item) {
			return item.get('pid');
		}
	});

	YearCollection = Backbone.Collection.extend({
		model: Year,
	});

	ActivityCollection = Backbone.Collection.extend({
		model: Activity,
	});

	var ActivityListView = Backbone.View.extend({
		el: $('#activityList'),
		activityListTemplate: $("#activityListTmpl").template(),
		render: function() {
			console.log("calling the render!");
			var self = this;
			$('#activityList').empty();
			$.tmpl(self.activityListTemplate, self.model).appendTo(self.el);

			return this;
		},
	});

	var ExpenseListView = Backbone.View.extend({
		// el: "#expenseInActivity" + self.model.get('id'),
		expenseListTemplate: $("#expenseListTmpl").template(),
		render: function() {
			var self = this;
			console.log("calling the render of ExpenseListView with data: " + self.model);

			$.tmpl(
				self.expenseListTemplate, 
				self.model.get('expenseCollection') )
			.appendTo(self.el);
			return this;
		},
	});

	//controller
	var Application = Backbone.Router.extend({
		_tourListView: null,
		//store local tourlist object
		_tourDetailView: null,
		//store local tourdetail object
		_year: null,
		//store local tours collection
		_currentYear: null,

		routes: {
			"": "tourList",
			"tourDetail/:id": "tourDetail",
			"year/:year": "year",
			"activity/:activity_id": "activity",
			"y/:theYear(/:activity_id)":"yearActivity",
		},

		/*
		 * Constructor
		 */
		initialize: function(options) {
			this.year(2012);

			return this;
		},
		
		redrawYearHeader: function(){
			var self = this;
			// TODO read the _years collection and display the current year.
			$('#currentYear').text(""+self._currentYear)
		},

		yearActivity: function(theYear, activity_id){
			console.log("theYear:" + theYear + ", activity_id: " + activity_id);
			this.year(theYear);
			this.activity(activity_id);
		},

		year: function(theYear){
			var self = this;
			// TODO read the _years collection and display the current year.
			self._currentYear = parseInt(theYear)
			$.ajax({
					url: 'data/year'+theYear+'.json',
					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got years from file: " + data);
						//create Tour collect and Set Data
						self._year = new Year(data);
						self.listActivities();

					}
				});
			self.redrawYearHeader();
		},

		activity: function(activity_id){
			var self = this;
			console.log("Get the activity "+ activity_id +" with rest...");
			$.ajax({
					url: 'data/activity'+activity_id+'.json',
					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got activity from file: " + data);
						// TODO detta ska inte sparas i enb variable, eller så måste den tömmas vid tex year()
						self._activity = new Activity(data);
						self.listActivities( new Activity(data) );

					}
				});
			self.redrawYearHeader();
		},

		listActivities: function(){
			console.log("listActivities function")
			console.log(this._year.get('activityCollection'));
			var view = new ActivityListView({
				model: this._year.get('activityCollection')
			});
			console.log(view);
			view.render();
			if(this._activity != null){
				console.log("list expenses...");
				var view2 = new ExpenseListView({
					model: this._activity,
					el: "#expenseInActivity" + this._activity.get('id')
				});

				view2.render();
			}


			
		},

		
		tourList: function() {
			this._tourListView = new TourListView({
				model: this._tours
			});
			this._tourListView.render();
		},

		tourDetail: function(id) {
			this._tourDetailView = new TourDetailView({
				model: this._tours.at(id)
			});
			this._tourDetailView.render();
		}
	});

	//instantiate Application object
	app = new Application();
	Backbone.history.start();
});
