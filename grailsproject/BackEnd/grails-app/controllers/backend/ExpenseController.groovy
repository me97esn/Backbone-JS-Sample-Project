package backend

import org.springframework.dao.DataIntegrityViolationException

class ExpenseController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [expenseInstanceList: Expense.list(params), expenseInstanceTotal: Expense.count()]
    }

    def create() {
        [expenseInstance: new Expense(params)]
    }

    def save() {
        def expenseInstance = new Expense(params)
        if (!expenseInstance.save(flush: true)) {
            render(view: "create", model: [expenseInstance: expenseInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'expense.label', default: 'Expense'), expenseInstance.id])
        redirect(action: "show", id: expenseInstance.id)
    }

    def show(Long id) {
        def expenseInstance = Expense.get(id)
        if (!expenseInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'expense.label', default: 'Expense'), id])
            redirect(action: "list")
            return
        }

        [expenseInstance: expenseInstance]
    }

    def edit(Long id) {
        def expenseInstance = Expense.get(id)
        if (!expenseInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'expense.label', default: 'Expense'), id])
            redirect(action: "list")
            return
        }

        [expenseInstance: expenseInstance]
    }

    def update(Long id, Long version) {
        def expenseInstance = Expense.get(id)
        if (!expenseInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'expense.label', default: 'Expense'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (expenseInstance.version > version) {
                expenseInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'expense.label', default: 'Expense')] as Object[],
                          "Another user has updated this Expense while you were editing")
                render(view: "edit", model: [expenseInstance: expenseInstance])
                return
            }
        }

        expenseInstance.properties = params

        if (!expenseInstance.save(flush: true)) {
            render(view: "edit", model: [expenseInstance: expenseInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'expense.label', default: 'Expense'), expenseInstance.id])
        redirect(action: "show", id: expenseInstance.id)
    }

    def delete(Long id) {
        def expenseInstance = Expense.get(id)
        if (!expenseInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'expense.label', default: 'Expense'), id])
            redirect(action: "list")
            return
        }

        try {
            expenseInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'expense.label', default: 'Expense'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'expense.label', default: 'Expense'), id])
            redirect(action: "show", id: id)
        }
    }
}
