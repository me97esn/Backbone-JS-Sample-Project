package backend

class Activity {
    String name
    Float amount
    static hasMany = [expenseCollection: Expense]
    static constraints = {
        expenseCollection cascade: 'all-delete-orphan'
    }

    public Float getAmount(){
        return expenseCollection?.sum {it.amount}
    }
}
