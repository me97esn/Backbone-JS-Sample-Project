/*
 * @hellocreation
 */
$(function() {
	/**
	 * Model
	 */
	Tour = Backbone.Model.extend({});
	Year = Backbone.Model.extend({});

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

	var ActivityListView = Backbone.View.extend({
		el: $('#activityListView'),
		activityListTemplate: $("#activityListTmpl").template(),
		render: function() {
			console.log("calling the render!");
			var self = this;
			$.tmpl(self.activityListTemplate, self.model).appendTo(self.el.find('#activityList'));
			// this.el.fadeOut(0, function() {
			// 	$('#activityList').empty();

			// 	console.log("model: " + self.model);

			// // $.tmpl(self.tourDetailTemplate, self.model).appendTo(self.el);

			// 	$.tmpl(self.activityListTemplate, self.model.toArray()).appendTo(self.el.find('#activityList'));
			// 	self.el.fadeIn(500);
			// });
			return this;
		},
	});

	//tour list view
	var TourListView = Backbone.View.extend({
		el: $('#tourListView'),
		tourListTemplate: $("#tourListTmpl").template(),
		render: function() {
			var self = this;

			console.log("model: " + self.model);

			// $.tmpl(self.tourDetailTemplate, self.model).appendTo(self.el);

			this.el.fadeOut(0, function() {
				$('#tourList').empty();
				$.tmpl(self.tourListTemplate, self.model.toArray()).appendTo(self.el.find('#tourList'));
				self.el.fadeIn(500);
			});
			return this;
		},
	});

	//tour list view
	var TourDetailView = Backbone.View.extend({
		el: $('#tourDetailView'),
		events: {
			"click .contact": "contactBtnClick",
		},
		tourDetailTemplate: $("#tourDetailTmpl").template(),
		render: function() {
			var self = this;
			console.log("model: " + self.model);

			$.tmpl(self.tourDetailTemplate, self.model).appendTo(self.el);

			return this;
		},
		contactBtnClick: function() {
			alert('Thank you for contacting us');
		}
	});

	//controller
	var Application = Backbone.Controller.extend({
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

		listActivities: function(){
			console.log("listActivities function")
			console.log(this._year.get('activityCollection'));
			var view = new ActivityListView({
				model: this._year.get('activityCollection')
			});
			console.log(view);
			view.render();
			
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
