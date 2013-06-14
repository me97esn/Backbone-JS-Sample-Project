class UrlMappings {

    static mappings = {
        "/rest/year/$id?"(resource:"year")
        "/rest/activity/$id?"(resource:"activity")

        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
    }
}
