class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state){
        database.ref("/").update({
            gameState: state
        })
    }

    start(){
        if(gameState == 0){
            player = new Player();
            player.getCount();

            form = new Form();
            form.display();

            car1 = createSprite(100, 200);
            car2 = createSprite(300, 200);
            car3 = createSprite(500, 200);
            car4 = createSprite(700, 200);
            cars = [car1, car2, car3, car4];

            car1.addImage(c1pic);
            car2.addImage(c2pic);
            car3.addImage(c3pic);
            car4.addImage(c4pic);
        }
    }

    play(){
        form.hide();

        player.getCarsAtEnd();

        textSize(30);
        text("Game Starts!", 120, 200);

        Player.getPlayerInfo();

        if(allPlayers != undefined){
            background("#c68767");
            image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

            var index = 0;
            var carx = 200;
            var cary = 0;
            
            for(var i in allPlayers){
                index += 1;
                carx += 250;
                cary = displayHeight - allPlayers[i].distance;
                cars[index - 1].x = carx;
                cars[index - 1].y = cary;
                console.log(cars[index-1].y)
                if(index == player.index){
                    strokeWeight(4);
                    stroke("yellow");
                    fill("red");
                    ellipse(carx, cary, 60, 60);
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }
        }


        if(keyDown(UP_ARROW) && player.index != null && gameState != 2){
            player.distance += 10;
            console.log(player.distance);
            player.update();
        }

        if(player.distance > 4300){
            game.update(2);
            //text("GAME END", );
            player.rank += 1;
            console.log(player.rank);
            Player.rankUpdate(player.rank);
        }

        drawSprites();
    }
}