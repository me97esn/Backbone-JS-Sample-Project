import backend.Activity
import backend.Expense
import backend.Year
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
        JSON.registerObjectMarshaller(Year) {
            def returnArray = [:]
            returnArray['name'] = it.yearfield
            returnArray['amount'] = it.amount
            returnArray['activityCollection'] = it.activityCollection

            return returnArray
        }
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
        new Year(amount: 1000, yearfield: 2012, activityCollection: [
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
