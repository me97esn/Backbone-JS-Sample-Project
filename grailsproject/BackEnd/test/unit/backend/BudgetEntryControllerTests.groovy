package backend



import org.junit.*
import grails.test.mixin.*

@TestFor(BudgetEntryController)
@Mock(BudgetEntry)
class BudgetEntryControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/budgetEntry/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.budgetEntryInstanceList.size() == 0
        assert model.budgetEntryInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.budgetEntryInstance != null
    }

    void testSave() {
        controller.save()

        assert model.budgetEntryInstance != null
        assert view == '/budgetEntry/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/budgetEntry/show/1'
        assert controller.flash.message != null
        assert BudgetEntry.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/budgetEntry/list'

        populateValidParams(params)
        def budgetEntry = new BudgetEntry(params)

        assert budgetEntry.save() != null

        params.id = budgetEntry.id

        def model = controller.show()

        assert model.budgetEntryInstance == budgetEntry
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/budgetEntry/list'

        populateValidParams(params)
        def budgetEntry = new BudgetEntry(params)

        assert budgetEntry.save() != null

        params.id = budgetEntry.id

        def model = controller.edit()

        assert model.budgetEntryInstance == budgetEntry
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/budgetEntry/list'

        response.reset()

        populateValidParams(params)
        def budgetEntry = new BudgetEntry(params)

        assert budgetEntry.save() != null

        // test invalid parameters in update
        params.id = budgetEntry.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/budgetEntry/edit"
        assert model.budgetEntryInstance != null

        budgetEntry.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/budgetEntry/show/$budgetEntry.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        budgetEntry.clearErrors()

        populateValidParams(params)
        params.id = budgetEntry.id
        params.version = -1
        controller.update()

        assert view == "/budgetEntry/edit"
        assert model.budgetEntryInstance != null
        assert model.budgetEntryInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/budgetEntry/list'

        response.reset()

        populateValidParams(params)
        def budgetEntry = new BudgetEntry(params)

        assert budgetEntry.save() != null
        assert BudgetEntry.count() == 1

        params.id = budgetEntry.id

        controller.delete()

        assert BudgetEntry.count() == 0
        assert BudgetEntry.get(budgetEntry.id) == null
        assert response.redirectedUrl == '/budgetEntry/list'
    }
}
