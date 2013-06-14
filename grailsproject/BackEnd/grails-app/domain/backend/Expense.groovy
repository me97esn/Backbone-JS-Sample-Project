package backend

class Expense {
    String name
    float amount
    static hasMany = [budgetEntryCollection: BudgetEntry]
    static constraints = {
        budgetEntryCollection cascade: 'all-delete-orphan'
    }
}
