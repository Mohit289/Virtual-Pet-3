var dog,dogHappy,sadDog,database,foodS,foodStock;
var feedDog, addFood;
var fedTime, lastFed;
var foodObj;
var gameState, readState
var garden, wadhroom, bedroom;
function preload()
{
  dog=("dogImg.png");
  dogHappy=("dogImg1.png");
  garden=loadImage("Garden.png");
washroom=loadImage("WashRoom.png");
bedroom=loadImage("BedRoom.png");
}

function setup() {
	createCanvas(800, 700);
  foodStock=database.ref('Food');
  foodStock.on("value",readstock);

  dog.createSprite(350,650,75,75);

  /*if(keyWentdown(UP_ARROW)){
    foodStock.value=foodStock.value-1;
  }

  if(keyWentdown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy); 
  } */

  foodObj = new Food(200,200);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood());

  readState = database.ref('gameState');
  readState.on("value", function(data){
      gameState=data.val();
  });

}

function draw(){
  display();
 
    currentTime=hour();
    if(currentTime==(lastFed+1)){
        update("Playing");
        foodObj.garden();
     }else if(currentTime==(lastFed+2)){
      update("Sleeping");
        foodObj.bedroom();
     }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
      update("Bathing");
        foodObj.washroom();
     }else{
      update("Hungry")
      foodObj.display();
     }
     
     if(gameState!="Hungry"){
       feed.hide();
       addFood.hide();
       dog.remove();
     }else{
      feed.show();
      addFood.show();
      
     }

fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
  lastFed=data.val();
     })
    
     drawSprites();
  }

function readStock(data) {  
  foodS=data.val();
}

function writeStock(x){

  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function addFood(){
  position++
  database.ref('/').update({
    Food:position
  })
}

function feedDog(){

  dog.addImage(dogHappy);
  foodobject.updateFoodStock(foodobject.getFoodStock()-1);
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
}
function update(state){
    database.ref('/').update({
        gameState:state
    });
}
}