package backend

class Expense {
    String name
    float amount
    static hasMany = [budgetEntryCollection: BudgetEntry]

    static constraints = {

    }

    public Float getAmount(){
        return budgetEntryCollection?.sum {it.amount}
    }
}
