package backend



import org.junit.*
import grails.test.mixin.*

@TestFor(YearController)
@Mock(Year)
class YearControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/year/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.yearInstanceList.size() == 0
        assert model.yearInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.yearInstance != null
    }

    void testSave() {
        controller.save()

        assert model.yearInstance != null
        assert view == '/year/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/year/show/1'
        assert controller.flash.message != null
        assert Year.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/year/list'

        populateValidParams(params)
        def year = new Year(params)

        assert year.save() != null

        params.id = year.id

        def model = controller.show()

        assert model.yearInstance == year
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/year/list'

        populateValidParams(params)
        def year = new Year(params)

        assert year.save() != null

        params.id = year.id

        def model = controller.edit()

        assert model.yearInstance == year
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/year/list'

        response.reset()

        populateValidParams(params)
        def year = new Year(params)

        assert year.save() != null

        // test invalid parameters in update
        params.id = year.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/year/edit"
        assert model.yearInstance != null

        year.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/year/show/$year.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        year.clearErrors()

        populateValidParams(params)
        params.id = year.id
        params.version = -1
        controller.update()

        assert view == "/year/edit"
        assert model.yearInstance != null
        assert model.yearInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/year/list'

        response.reset()

        populateValidParams(params)
        def year = new Year(params)

        assert year.save() != null
        assert Year.count() == 1

        params.id = year.id

        controller.delete()

        assert Year.count() == 0
        assert Year.get(year.id) == null
        assert response.redirectedUrl == '/year/list'
    }
}
