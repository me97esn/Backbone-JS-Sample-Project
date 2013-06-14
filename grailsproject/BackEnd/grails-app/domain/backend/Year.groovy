package backend

class Year {
    /**
     * "activityCollection": [
     {
     "id": 1,
     "name": "Aktiviteter riktade till målgruppen",
     "amount": 3000
     }
     ],
     "id": 1,
     "yearfield": 2012,
     "amount": 6000,
     "isFirst": true,
     "isLast": false
     */
    static hasMany = [activityCollection: Activity]
    int yearfield
//    boolean isFirst, isLast
    float amount
    static constraints = {
        activityCollection cascade: 'all-delete-orphan'
    }
}
