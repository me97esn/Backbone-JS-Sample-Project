package backend

class BudgetEntry {
    String name
    float amount
    String description
    static belongsTo = [expense: Expense]

    static mapping ={
        version false
    }

    static constraints = {
    }
}
