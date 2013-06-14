import backend.Activity
import backend.Expense
import backend.Year

class BootStrap {

    def init = { servletContext ->
        new Year(amount: 1000, yearfield: 2013, activityCollection: [
                new Activity(name: 'An Activity', amount: 10000, expenseCollection: [
                        new Expense(name: "Lön", amount: 100),
                        new Expense(name: "Resor", amount: 9900)

                ]),
                new Activity(name: 'Another Activity', amount:4400, expenseCollection: [
                        new Expense(name: "Lön", amount: 9800),
                        new Expense(name: "Resor", amount: 1000000)

                ])
        ]
        ).save()
    }
    def destroy = {
    }
}
