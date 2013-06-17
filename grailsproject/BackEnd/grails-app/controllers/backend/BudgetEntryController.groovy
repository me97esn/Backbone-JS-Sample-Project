package backend

import grails.converters.JSON
import org.springframework.dao.DataIntegrityViolationException

class BudgetEntryController {

//    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [budgetEntryInstanceList: BudgetEntry.list(params), budgetEntryInstanceTotal: BudgetEntry.count()]
    }

    def create() {
        [budgetEntryInstance: new BudgetEntry(params)]
    }

    def save() {
        def budgetEntryInstance = new BudgetEntry(params)
        if (!budgetEntryInstance.save(flush: true)) {
            render(view: "create", model: [budgetEntryInstance: budgetEntryInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), budgetEntryInstance.id])
        redirect(action: "show", id: budgetEntryInstance.id)
    }

    def show(Long id) {
        def budgetEntryInstance = BudgetEntry.get(id)
        withFormat {
            html {
                if (!budgetEntryInstance) {
                    flash.message = message(code: 'default.not.found.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), id])
                    redirect(action: "list")
                    return
                }
            }
            json {
                response.setHeader("Access-Control-Allow-Origin", "*")
                render budgetEntryInstance as JSON
            }

        }


        [budgetEntryInstance: budgetEntryInstance]
    }

    def edit(Long id) {
        def budgetEntryInstance = BudgetEntry.get(id)
        if (!budgetEntryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), id])
            redirect(action: "list")
            return
        }

        [budgetEntryInstance: budgetEntryInstance]
    }

    def update(Long id, Long version) {
        def budgetEntryInstance = BudgetEntry.get(id)
        if (!budgetEntryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (budgetEntryInstance.version > version) {
                budgetEntryInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'budgetEntry.label', default: 'BudgetEntry')] as Object[],
                          "Another user has updated this BudgetEntry while you were editing")
                render(view: "edit", model: [budgetEntryInstance: budgetEntryInstance])
                return
            }
        }

        budgetEntryInstance.properties = request.JSON

        if (!budgetEntryInstance.save(flush: true)) {
            render(view: "edit", model: [budgetEntryInstance: budgetEntryInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), budgetEntryInstance.id])
        redirect(action: "show", id: budgetEntryInstance.id)
    }

    def delete(Long id) {
        def budgetEntryInstance = BudgetEntry.get(id)
        if (!budgetEntryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), id])
            redirect(action: "list")
            return
        }

        try {
            budgetEntryInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'budgetEntry.label', default: 'BudgetEntry'), id])
            redirect(action: "show", id: id)
        }
    }
}
