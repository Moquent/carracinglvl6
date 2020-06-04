class Player{
    constructor(){
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = null;
    }

    getCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", function(data){
            playerCount = data.val();
        })
    }
    updateCount(count){
        database.ref("/").update({
            playerCount: count
        })
    }
    update(){
        var playerIndex = "players/player"+this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance
        });
    }

    getCarsAtEnd(){
        var rank = database.ref("CarsAtEnd");
        rank.on("value", (data) => {
            this.rank = data.val();
        })
    }

    static rankUpdate(rank){
        database.ref("/").update({
            CarsAtEnd: rank
        });
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref("players")
        playerInfoRef.on("value", (data) => {allPlayers = data.val()});
    }
}