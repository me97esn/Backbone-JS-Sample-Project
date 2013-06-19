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

        new Year(amount: 1000, yearfield: 2012, activityCollection: [
                new Activity(name: 'Aktiviteter riktade till målgruppen', amount: 10000, expenseCollection: [
                        new Expense(name: "Löner personal", amount: 100)
                            .addToBudgetEntryCollection(new BudgetEntry(name: "Jan Zachariassen", amount: 100000, description: "Jan Zachariassens månadslön"))
                            .addToBudgetEntryCollection(new BudgetEntry(name: "Greger Sernemar", amount: 90000, description: "Greger Sernemars månadslön"))
                            .addToBudgetEntryCollection(new BudgetEntry(name: "Per Bodin", amount: 78000, description: "Per Bodins månadslön"))
                        ,
                        new Expense(name: "Lokaler", amount: 9900)
                            .addToBudgetEntryCollection(
                                new BudgetEntry(name: "Lokalhyra Siemens Upplands Väsby", amount: 1000000, description: "Lokalhyra Siemens Upplands Väsby")
                            )

                ]),
                new Activity(name: 'Information och marknadsföring', amount:4400, expenseCollection: [
                        new Expense(name: "Reklam", amount: 9800, )
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Reklam tv4", amount: 1000000, description: "Reklam tv4"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Reklamkampanj tunnelbanan", amount: 1500000, description: "Reklamkampanj tunnelbanan"))
                        ,
                ])
        ]
        ).save()


        new Year(amount: 1000, yearfield: 2013, activityCollection: [
                new Activity(name: 'Aktiviteter till målgruppen', amount: 10000, expenseCollection: [
                        new Expense(name: "Löner personal", amount: 100)
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Emil Stenberg", amount: 800, description: "Emils månadslön"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Jan Zachariassen", amount: 100000, description: "Jan Zachariassens månadslön"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Greger Sernemar", amount: 90000, description: " Greger Sernemars månadslön"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Per Bodin", amount: 78000, description: "Per Bodins månadslön")),

                        new Expense(name: "Lokaler", amount: 9900)
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Lokalhyra hantverkargatan", amount: 555, description: "Lokalhyra hantverkargatan"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Lokalhyra Siemens Upplands Väsby", amount: 1000000, description: "Lokalhyra Siemens Upplands Väsby"))


                ]),
                new Activity(name: 'Information och marknadsföring', amount:4400, expenseCollection: [
                        new Expense(name: "Reklam", amount: 9800)
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Reklam tv4", amount: 1000000, description: "Reklam tv4"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Reklamkampanj tunnelbanan", amount: 1500000, description: "Reklamkampanj tunnelbanan"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Reklamkampanj SVD", amount: 200000, description: "Reklamkampanj SVD"))
                                .addToBudgetEntryCollection(new BudgetEntry(name: "Reklamkampanj Reklam radio", amount: 300000, description: "Radioreklam")),

                        new Expense(name: "PR", amount: 1000000)
                                .addToBudgetEntryCollection(new BudgetEntry(name: "PR-kampanj hos 'PR och Reklam AB'", amount: 125000, description: "PR-kampanj hos 'PR och Reklam AB")),

                ])
        ]
        ).save()

    }
    def destroy = {
    }
}
