class UrlMappings {

    static mappings = {
        "/rest/year/$id?"(resource:"year")
        "/rest/activity/$id?"(resource:"activity")
        "/rest/expense/$id?"(resource:"expense")
        "/rest/expense/$id?"(resource:"expense")
        "/rest/budgetEntry/$id?"(resource:"budgetEntry")

        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
    }
}
