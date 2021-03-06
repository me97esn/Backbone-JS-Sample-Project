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
    var dragId;

    YearCollection = Backbone.Collection.extend({
        model: Year,
        comparator: function(item) {
            return item.get('yearfield');
        }
    });

    ActivityCollection = Backbone.Collection.extend({
        model: Activity,
        comparator: function(item) {
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
            $.tmpl(self.activityListTemplate, self.model.toJSON())
                    // .hide()
                    .appendTo(self.el);
            // .show( 'blind', 500 );
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
                    self.model.get('expenseCollection'))
                    .hide()
                    .appendTo(self.el)
                    .show('blind', 500);

            return this;
        },
    });

    var BudgetEntryListView = Backbone.View.extend({
        // el: '#budgetEntryList',
        template: $("#budgetEntryListTmpl").template(),
        events: {
            "change input": "amountChanged",
        },
        render: function() {
            var self = this;
            console.log("el: " + self.el);
            console.log("+++ Rendering the BudgetEntryListView with data: " + self.model.get('budgetEntryCollection'));
            $('#budgetEntryList').empty();

            // if ($(self.el).is(":empty"))
            // {
            //     $.tmpl(self.template,
            //             self.model.get('budgetEntryCollection'))
            //             .hide()
            //             .appendTo(self.el)
            //             .show('blind', 500);
            // }
            // else {
            //     $(self.el).empty()
            // }


            $.tmpl(
                    self.template,
                    self.model.get('budgetEntryCollection'))
                    .hide()
                    .appendTo(self.el)
                    .show('blind', 500);

            $(".budgetEntry-title").draggable({revert: false, cursor: 'move', start: handleDrag});
            $(".budgetEntry").droppable({tolerance: 'touch', drop: handleDrop});
            $(".activity").droppable({tolerance: 'touch', over: handleOverActivity});
            $(".expenseRow").droppable({tolerance: 'touch', over: handleOverExpense});


            return this;
        },
        amountChanged: function(evt) {
            self = this;
            var field = $(evt.currentTarget);
            var data = {};
            data['amount'] = field.val();

            data['id'] = field.attr('budgetEntryId');
            console.log('updating the amount of id ' + data['id']);
            $.ajax({
                url: "http://localhost:8080/BackEnd/rest/budgetEntry/" + data['id'] + ".json",
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(data) {
                    console.log("Updated successfully: " + data);
                    app.changeAmountInAllDivs();
                    //create Tour collect and Set Data
                    // self._year = new Year(data);
                    // self.listActivities();

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
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
            "year/:year": "changeYear",
            "expense/:expense_id": "expense",
            "activity/:activity_id": "activity",
            "y/:theYear(/activity/:activity_id)(/expense/:expense_id)": "yearActivity",
        },
        /*
         * Constructor
         */
        initialize: function(options) {
            $('#year2013').toggle("hide");
            this.changeYear(2012);

            return this;
        },
        changeAmountInAllDivs: function() {
            console.log('change the amount in the Dom');

            // var currentYear = (app._currentYear);
            var activity_id = app._activity.get('id');
            $.ajax({
                url: "http://localhost:8080/BackEnd/rest/activity/" + activity_id + ".json",
                dataType: 'json',
                data: {},
                success: function(data) {
                    activity = new Activity(data)
                    $('#activity-amount_' + activity_id).html(activity.get('amount'));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });


            var expense_id = app._expense.get('id');

            $.ajax({
                url: "http://localhost:8080/BackEnd/rest/expense/" + expense_id + ".json",
                dataType: 'json',
                data: {},
                success: function(data) {
                    expense = new Expense(data)
                    $('#expense-amount_' + expense_id).html(expense.get('amount'));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        redrawYearHeader: function() {
            var self = this;
            // TODO read the _years collection and display the current year.
            $('#currentYear').text("" + self._currentYear);


        },
        yearActivity: function(theYear, activity_id, expense_id) {
            console.log("theYear:" + theYear + ", activity_id: " + activity_id);
            $('.expense').hide('blind', 500);
            if (activity_id) {
                this.activity(activity_id);
            } else {
                this._activity = null;
            }
            if (expense_id) {
                this.expense(expense_id);
            }
        },
        changeYear: function(theYear) {
            self = this;
            var direction = {2012: 'left', 2013: 'right'};
            $('#content').appendTo('#year' + self._currentYear);
            $('#year' + self._currentYear).toggle("slide", {"direction": direction[self._currentYear]}, 500, function() {
                $('#content').appendTo('#year' + theYear);
                $('#year' + self._currentYear).toggle("slide", {"direction": direction[self._currentYear]}, 500);
            });


            console.log('changing the year to ' + theYear);

            return this.year(theYear);
        },
        year: function(theYear) {
            var self = this;

            self._currentYear = parseInt(theYear)
            self._activity = null;


            $.ajax({
//                url: 'data/year' + theYear + '.json',
                url: "http://localhost:8080/BackEnd/rest/year/" + theYear + ".json",
                // url: "http://172.29.194.195:8080/DemoProject/webresources/demo2.entity.yearobj/1",

                dataType: 'json',
                data: {},
                success: function(data) {
                    console.log("Got years from file: " + data);
                    //create Tour collect and Set Data
                    self._year = new Year(data);
                    self.listActivities();
                    var i = 1;
                    _.each(self._year.get('activityCollection'), function(activity) {
                        $(document).bind('keydown', 'f' + i, function assets() {
                            app.navigate('#y/' + self._currentYear + '/activity/' + activity['id'], {trigger: true});
                            return false;
                        });
                        i++;
                    })

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
                url: 'http://localhost:8080/BackEnd/rest/expense/' + expense_id + '.json',
//                url: 'data/expense' + expense_id + '.json',
                dataType: 'json',
                data: {},
                success: function(data) {
                    console.log("Got expense from file: " + data);
                    self._expense = new Expense(data)
                    self.listExpenses();

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.status);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        activity: function(activity_id) {
            var self = this;
            console.log("Get the activity " + activity_id + " with rest...");
            $.ajax({
                url: 'http://localhost:8080/BackEnd/rest/activity/' + activity_id + '.json',
//                url: 'data/activity' + activity_id + '.json',
                dataType: 'json',
                data: {},
                success: function(data) {
                    console.log("Got activity from file: " + data);
                    // TODO detta ska inte sparas i enb variable, eller så måste den tömmas vid tex year()
                    self._activity = new Activity(data);
                    self.listActivities(  );


                    var i = 1;
                    _.each(self._activity.get('expenseCollection'), function(expense) {
                        $(document).bind('keydown', 'alt+f' + i, function assets() {
                            app.navigate('#expense/' + expense['id'], {trigger: true});
                            return false;
                        });
                        i++;
                    })

                }
            });
            self.redrawYearHeader();
        },
        listActivities: function(expense) {
            console.log(" this._year.get('activityCollection'): " + this._year.get('activityCollection'));
            console.log(" new ActivityCollection( this._year.get('activityCollection')): " + new ActivityCollection(this._year.get('activityCollection')));

            var view = new ActivityListView({
                model: new ActivityCollection(this._year.get('activityCollection'))
            });
            view.render();
            if (this._activity) {
                console.log("list expenses...");
                var view2 = new ExpenseListView({
                    model: this._activity,
                    el: "#expenseInActivity" + this._activity.get('id')
                });

                view2.render();
            }
            console.log("expense: " + expense);
            if (this._expense != null) {

                var view3 = new BudgetEntryListView({
                    el: "#budgetEntryInExpense" + this._expense.get('id'),
                    model: this._expense
                });

                view3.render();
            }
        },
        listExpenses: function( ) {
            var view3 = new BudgetEntryListView({
                el: "#budgetEntryInExpense" + this._expense.get('id'),
                model: this._expense
            });

            view3.render();
        },
    });

    //instantiate Application object
    app = new Application();
    Backbone.history.start();
});

function slide(direction) {
    $('#activityListView').hide("slide", {"direction": direction});
}



$(document).bind('keydown', 'Alt+right', function assets() {
    app.navigate('#year/2013', {trigger: true});
    return false;
});
$(document).bind('keydown', 'Alt+left', function assets() {
    app.navigate('#year/2012', {trigger: true});
    return false;
});

function handleOverActivity() {
    console.log("handleOver");
    var activity = $(this);
    var activityId = activity.attr("id").substring(8);
    console.log("activity " + activityId);
    var c = $("#expenseInActivity" + activityId).children().length;

    console.log(c);

    if (c < 1)
    {
        console.log("empty");
        var self = app;
        console.log("Get the activity " + activityId + " with rest...");
        $.ajax({
            url: 'http://localhost:8080/BackEnd/rest/activity/' + activity_id + '.json',
//            url: 'data/activity' + activityId + '.json',
            dataType: 'json',
            data: {},
            success: function(data) {
                console.log("Got activity from file: " + data);
                // TODO detta ska inte sparas i enb variable, eller så måste den tömmas vid tex year()
                self._activity = new Activity(data);
                self.listActivities(  );


                var i = 1;
                _.each(self._activity.get('expenseCollection'), function(expense) {
                    $(document).bind('keydown', 'alt+f' + i, function assets() {
                        app.navigate('#expense/' + expense['id'], {trigger: true});
                        return false;
                    });
                    i++;
                })

            }
        });
        app.redrawYearHeader();

    } else {
        console.log("not empty");
    }

}

function handleOverExpense() {
    console.log("handleOver");
    var expense = $(this);
    var expenseId = expense.attr("id").substring(10);
    console.log("expenseRow " + expenseId);
    var c = $("#budgetEntryInExpense" + expenseId).children().length;

    console.log(c);

    if (c < 1)
    {
        console.log("empty");
        var self = app;

        console.log("Get the budgetEntry " + expenseId + " with rest...");

        $.ajax({
            url: 'http://localhost:8080/BackEnd/rest/expense/' + expense_id + '.json',
//            url: 'data/expense' + expenseId + '.json',
            dataType: 'json',
            data: {},
            success: function(data) {
                console.log("Got expense from file: " + data);
                self._expense = new Expense(data)
                self.listExpenses();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.status);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    } else {
        console.log("not empty");
    }

}



function handleDrag() {
    console.log("handleDrag" + $(this).attr("id"));
    dragId = $(this);
}


function handleDrop() {
    var element = $(this)
    var expense_id = $(this).attr("id").substring(20);
    var budgetEntry_id = dragId.attr("id").substring(18);

    var data = {"id": budgetEntry_id, "expense": {"id": expense_id}};

    console.log('updating the expense id of budgetentry ' + budgetEntry_id + ' to ' + expense_id);

    dragId.appendTo(element);

    moveBudgetEntry(data)
    dragId = null;
}

function moveBudgetEntry(data) {
    $.ajax({
        url: "http://localhost:8080/BackEnd/rest/budgetEntry/" + budgetEntry_id + ".json",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            console.log("Updated successfully: " + data);
            app.changeAmountInAllDivs();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });


}
;
