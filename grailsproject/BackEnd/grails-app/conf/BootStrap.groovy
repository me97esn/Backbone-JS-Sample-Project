import backend.Activity
import backend.BudgetEntry
import backend.Expense
import backend.Year
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
        JSON.registerObjectMarshaller(Year) {
            def returnArray = [:]
            returnArray['yearfield'] = it.yearfield
            returnArray['amount'] = it.amount
            returnArray['activityCollection'] = it.activityCollection

            return returnArray
        }
        JSON.registerObjectMarshaller(Activity) {
            def returnArray = [:]
            returnArray['name'] = it.name
            returnArray['id'] = it.id
            returnArray['amount'] = it.amount
            returnArray['expenseCollection'] = it.expenseCollection

            return returnArray
        }
        JSON.registerObjectMarshaller(Expense) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            returnArray['amount'] = it.amount
            returnArray['budgetEntryCollection'] = it.budgetEntryCollection

            return returnArray
        }

        new Year(amount: 1000, yearfield: 2013, activityCollection: [
                new Activity(name: 'An Activity', amount: 10000, expenseCollection: [
                        new Expense(name: "Lön", amount: 100, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ]),
                        new Expense(name: "Resor", amount: 9900, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ])

                ]),
                new Activity(name: 'Another Activity', amount:4400, expenseCollection: [
                        new Expense(name: "Lön", amount: 9800, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ]),
                        new Expense(name: "Resor", amount: 1000000, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ])

                ])
        ]
        ).save()
        new Year(amount: 1000, yearfield: 2012, activityCollection: [
                new Activity(name: 'An Activity', amount: 10000, expenseCollection: [
                        new Expense(name: "Lön", amount: 100, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ]),
                        new Expense(name: "Resor", amount: 9900, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ])

                ]),
                new Activity(name: 'Another Activity', amount:4400, expenseCollection: [
                        new Expense(name: "Lön", amount: 9800, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ]),
                        new Expense(name: "Resor", amount: 1000000, budgetEntryCollection: [
                                new BudgetEntry(name: "Emil", amount: 555, description: "Emils lilla lön"),
                                new BudgetEntry(name: "Jan", amount: 1000000, description: "Jannes massiva lön") ,
//                                new BudgetEntry(name: "Greger", amount: 555)
                        ])

                ])
        ]
        ).save()

    }
    def destroy = {
    }
}
