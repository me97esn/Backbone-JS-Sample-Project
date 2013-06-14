import backend.Activity
import backend.Year

class BootStrap {

    def init = { servletContext ->
        new Year(amount: 1000, yearfield: 2013, activityCollection: [
                new Activity(name: 'An Activity', amount: 10000)
        ]
        ).save()
    }
    def destroy = {
    }
}
