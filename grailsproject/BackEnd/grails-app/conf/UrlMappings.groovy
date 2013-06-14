class UrlMappings {

    static mappings = {
        "/rest/year/$id?"(resource:"year")

        "/$controller/$action?/$id?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
    }
}
