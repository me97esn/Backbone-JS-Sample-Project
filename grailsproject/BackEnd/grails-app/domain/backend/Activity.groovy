package backend

class Activity {
    String name
    float amount
    static hasMany = [expenseCollection: Expense]
    static constraints = {
    }
}
