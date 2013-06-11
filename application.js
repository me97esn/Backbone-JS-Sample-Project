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

	//tour list view
	var TourListView = Backbone.View.extend({
		el: $('#tourListView'),
		tourListTemplate: $("#tourListTmpl").template(),
		render: function() {
			var self = this;
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
			this.el.fadeOut(0, function() {
				self.el.empty();
				$.tmpl(self.tourDetailTemplate, self.model).appendTo(self.el);
				self.el.fadeIn(500);
			});
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
		_tours: null,
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
			var self = this;
			self._currentYear = 2013;
			self.yearList();
			$.ajax({
					url: 'data/years.json',
					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got years from file: " + data);
						//create Tour collect and Set Data
						self._years = new YearCollection(data);
						// TODO set the current year
						self.yearList();
					}
				});


			if (this._tourListView === null) {
				$.ajax({
					url: 'data/data.json',
					dataType: 'json',
					data: {},
					success: function(data) {
						//create Tour collect and Set Data
						self._tours = new TourCollection(data);
						self.tourList();
					}
				});
				return this;
			}
			return this;
		},

		yearList: function(){
			var self = this;
			// TODO read the _years collection and display the current year.
			console.log("setting the year to " + self._currentYear);
			$('#nextYear').attr('href', '#year/' + (self._currentYear+1))
			$('#prevYear').attr('href', '#year/' + (self._currentYear-1))
			$('#currentYear').text(""+self._currentYear)
		},


		year: function(theYear){
			var self = this;
			// TODO read the _years collection and display the current year.
			self._currentYear = parseInt(theYear)
			this.yearList();
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
