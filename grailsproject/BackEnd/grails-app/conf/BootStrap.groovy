import backend.Year

class BootStrap {

    def init = { servletContext ->
        new Year(amount: 1000, yearfield: 2013).save()
    }
    def destroy = {
    }
}
