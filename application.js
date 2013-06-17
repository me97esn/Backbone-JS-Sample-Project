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
                    self.model.get('expenseCollection'))
                    .appendTo(self.el)
                    .hide()
                    .fadeIn();
            return this;
        },
    });

    var BudgetEntryListView = Backbone.View.extend({
        // el: '#budgetEntryList',
        template: $("#budgetEntryListTmpl").template(),
        render: function() {
            var self = this;

            console.log("el: " + self.el);
            console.log("Rendering the BudgetEntryListView with data: " + self.model);
            $('#budgetEntryList').empty();
            $.tmpl(
                    self.template,
                    self.model.get('budgetentryCollection'))
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
            "expense/:expense_id": "expense",
            "activity/:activity_id": "activity",
            "y/:theYear(/activity/:activity_id)(/expense/:expense_id)": "yearActivity",
        },
        /*
         * Constructor
         */
        initialize: function(options) {
            this.year(2012);

            return this;
        },
        redrawYearHeader: function() {
            var self = this;
            // TODO read the _years collection and display the current year.
            $('#currentYear').text("" + self._currentYear)

        },
        yearActivity: function(theYear, activity_id, expense_id) {
            console.log("theYear:" + theYear + ", activity_id: " + activity_id);
            this.year(theYear);
            if (activity_id) {
                this.activity(activity_id);
            }
            if (expense_id) {
                this.expense(expense_id);
            }
        },
        year: function(theYear) {
            var self = this;
            // TODO read the _years collection and display the current year.
            self._currentYear = parseInt(theYear)
            $.ajax({
                url: 'data/year' + theYear + '.json',
                // url: "http://localhost:8080/BackEnd/rest/year/1.json",
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
        expense: function(expense_id) {
            var self = this;
            console.log("Get the budgetEntry " + expense_id + " with rest...");
            $.ajax({
                url: 'data/expense' + expense_id + '.json',
                dataType: 'json',
                data: {},
                success: function(data) {
                    console.log("Got expense from file: " + data);
                    // TODO detta ska inte sparas i enb variable, eller så måste den tömmas vid tex year()
                    self.listActivities(new Expense(data));

                }
            });
        },
        activity: function(activity_id) {
            var self = this;
            console.log("Get the activity " + activity_id + " with rest...");
            $.ajax({
                url: 'data/activity' + activity_id + '.json',
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
        listActivities: function(expense) {
            console.log("listActivities function")
            console.log(this._year.get('activityCollection'));
            var view = new ActivityListView({
                model: this._year.get('activityCollection')
            });
            console.log(view);
            view.render();
            if (this._activity != null) {
                console.log("list expenses...");
                var view2 = new ExpenseListView({
                    model: this._activity,
                    el: "#expenseInActivity" + this._activity.get('id')
                });

                view2.render();
            }
            console.log("expense: " + expense);
            if (expense != null) {

                var view3 = new BudgetEntryListView({
                    el: "#budgetEntryInExpense" + expense.get('id'),
                    model: expense
                });

                view3.render();
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
