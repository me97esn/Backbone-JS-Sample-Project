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
	Expense = Backbone.Model.extend({});



	YearCollection = Backbone.Collection.extend({
		model: Year,
		comparator: function(item) {
			return item.get('yearfield');
		}
	});

	ActivityCollection = Backbone.Collection.extend({
		model: Activity,
		comparator: function(item) {
			console.log('::: sorting the collection by name');
			return item.get('name');
		}
	});

	var ActivityListView = Backbone.View.extend({
		el: $('#activityList'),
		activityListTemplate: $("#activityListTmpl").template(),
		render: function() {
			console.log("+ Rendering the ActivityListView");
			var self = this;

			$('#activityList').empty();
			$.tmpl(self.activityListTemplate, self.model.toJSON()).appendTo(self.el);

			return this;
		},
	});

	var ExpenseListView = Backbone.View.extend({
		// el: "#expenseInActivity" + self.model.get('id'),
		expenseListTemplate: $("#expenseListTmpl").template(),
		render: function() {
			var self = this;
			console.log("++ Rendering the ExpenseListView with data: " + self.model);
			// Hide all others
			$.tmpl(
				self.expenseListTemplate, 
				self.model.get('expenseCollection') )
			.appendTo(self.el)
			.show( 'blind', null, 500 );
			
			return this;
		},
	});

	var BudgetEntryListView = Backbone.View.extend({
		// el: '#budgetEntryList',
		template: $("#budgetEntryListTmpl").template(),
		events: { "change input": "amountChanged" }, 
		
		render: function() {
			var self = this;
			
			console.log("el: " + self.el);			
			console.log("+++ Rendering the BudgetEntryListView with data: " + self.model.get('budgetEntryCollection'));
			$('#budgetEntryList').empty();
			$.tmpl(
				self.template, 
				self.model.get('budgetEntryCollection') )
			.appendTo(self.el);
			return this;
		},
		amountChanged: function(evt){
			$.ajax({
					url: "http://localhost:8080/BackEnd/rest/year/"+theYear+".json",
					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got years from file: " + data);
						//create Tour collect and Set Data
						self._year = new Year(data);
						self.listActivities();

					},
					 error: function(jqXHR, textStatus, errorThrown) {
					    console.log(jqXHR.status);
					    console.log(textStatus);
					    console.log(errorThrown);
					}
				});
			// TODO re-read the data and reload the views
			// listActivities();
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
			"expense/:expense_id": "expense",
			"activity/:activity_id": "activity",
			"y/:theYear(/activity/:activity_id)(/expense/:expense_id)":"yearActivity",
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

		yearActivity: function(theYear, activity_id, expense_id){
			console.log("theYear:" + theYear + ", activity_id: " + activity_id);
			this.year(theYear);
			if(activity_id){
				this.activity(activity_id);
			}else{
				this._activity = null;
			}
			if(expense_id){
				this.expense(expense_id);
			}
		},

		year: function(theYear){
			var self = this;
			// TODO read the _years collection and display the current year.
			self._currentYear = parseInt(theYear)
			self._activity = null;
			$.ajax({
					// url: 'data/year'+theYear+'.json',
					url: "http://localhost:8080/BackEnd/rest/year/"+theYear+".json",

					// url: "http://172.29.194.195:8080/DemoProject/webresources/demo2.entity.yearobj/1",

					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got years from file: " + data);
						//create Tour collect and Set Data
						self._year = new Year(data);
						self.listActivities();

					},
					 error: function(jqXHR, textStatus, errorThrown) {
					    console.log(jqXHR.status);
					    console.log(textStatus);
					    console.log(errorThrown);
					}
				});
			self.redrawYearHeader();
		},

		expense: function(expense_id){
			var self = this;

			console.log("Get the budgetEntry "+ expense_id +" with rest...");
			
			$.ajax({
					url: 'http://localhost:8080/BackEnd/rest/expense/'+expense_id+'.json',
					// url: 'data/expense'+expense_id+'.json',
					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got expense from file: " + data);
						self._expense = new Expense(data)
						self.listActivities();

					},
					error: function(jqXHR, textStatus, errorThrown) {
					    console.log(jqXHR.status);
					    console.log(textStatus);
					    console.log(errorThrown);
					}
				});
		},
		
		activity: function(activity_id){
			var self = this;
			console.log("Get the activity "+ activity_id +" with rest...");
			$.ajax({
					url: 'http://localhost:8080/BackEnd/rest/activity/'+activity_id+'.json',
					// url: 'data/activity'+activity_id+'.json',

					dataType: 'json',
					data: {},
					success: function(data) {
						console.log("Got activity from file: " + data);
						// TODO detta ska inte sparas i enb variable, eller så måste den tömmas vid tex year()
						self._activity = new Activity(data);
						self.listActivities(  );

					}
				});
			self.redrawYearHeader();
		},

		listActivities: function( expense ){
			console.log(" this._year.get('activityCollection'): " +  this._year.get('activityCollection'));
			console.log(" new ActivityCollection( this._year.get('activityCollection')): " + new ActivityCollection( this._year.get('activityCollection')));

			var view = new ActivityListView({
				model: new ActivityCollection( this._year.get('activityCollection'))
			});
			view.render();
			if(this._activity){
				console.log("list expenses...");
				var view2 = new ExpenseListView({
					model: this._activity,
					el: "#expenseInActivity" + this._activity.get('id')
				});

				view2.render();
			}
			console.log("expense: " + expense);
			if(this._expense != null){

				var view3 = new BudgetEntryListView({
					el: "#budgetEntryInExpense" + this._expense.get('id'),
					model: this._expense
				});

				view3.render();
			}
		},

		listExpenses: function( expense ){
			console.log("listExpenses, expense: " + expense);

			var view3 = new BudgetEntryListView({
				el: "#budgetEntryInExpense" + expense.get('id'),
				model: expense
			});

			view3.render();
		},
	});

	//instantiate Application object
	app = new Application();
	Backbone.history.start();
});
