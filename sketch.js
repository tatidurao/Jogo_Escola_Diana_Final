//variavel personagens
var pc, pc_CostaM, pc_DireitaM, pc_EsquerdaM, pc_FrenteM, pc_CostaP, pc_DireitaP, pc_EsquerdaP, pc_FrenteP;
var nerd, nerdImage;
var canvas
//variavel botoes
var buttonMissao1, buttonMissao1Image, buttonMissao2Image,buttonMissao3Image, botaosaladeaula, botaoBiblioteca;
var backgroundImage0,backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4,backgroundImage5 ;

//sinalizadores de movimento
var moved = true;

//estados de Jogos = cena 1 = "Inicio" cena2 = "Em frente a sala de aula ou cena3 = "dentro sala de aula" cena 4 = "dentro biblioteca" 5=final do jogo
var cena = 0;

//estrelas
var star, star_display;
var star_img, empty_star, one_star, two_star
var venceu=false
//jogo da soma
var number1, number5,number9,number0, number1Img, number5Img, number9Img,number0Img;
var number1Group, number5Group, number9Group, number0Group;
var meta = 30;
var pontos = 0;
var girl, girlImg;
var PLAY=1;
var END=0;
var gameState=1;
//jogo biblioteca
var score=0
var access1, access2, access3, button1,button2,button3
var accesscode1="JOSEFINE"
var accesscode2="CODE"
var accesscode3="CODE"
var somEstrela, somMouseClick, somPoint, somFail, somSucess

function preload() {
  //imagens do Jogo
  backgroundImage0 = loadImage("./cenas/cena0.png");
  backgroundImage1 = loadImage("./cenas/cena1.jpg");
  backgroundImage2 = loadImage("./cenas/cena2.jpg");
  backgroundImage3 = loadImage("./cenas/cena3.png");
  backgroundImage4 = loadImage("./cenas/cena4.jpg");
  backgroundImage5 = loadImage("./cenas/cena5.jpg");

  //jogador principal
  pc_CostaM=loadAnimation("./menina/menina1.png","./menina/menina2.png", "./menina/menina3.png","./menina/menina4.png")
  pc_DireitaM=loadAnimation("./menina/direita_m_1.png","./menina/direita_m_2.png","./menina/direita_m_3.png")
  pc_EsquerdaM=loadAnimation("./menina/esquerda_m_1.png","./menina/esquerda_m_2.png","./menina/esquerda_m_3.png")
  pc_FrenteM=loadAnimation("./menina/menina_frente2.png","./menina/menina_frente3.png","./menina/menina_frente4.png")
  
  pc_FrenteP=loadAnimation("./menina/menina_frente2.png")
  pc_CostaP = loadAnimation ("./menina/menina3.png")
  pc_EsquerdaP = loadAnimation ("./menina/esquerda_m_1.png")
  pc_DireitaP = loadAnimation ("./menina/direita_m_1.png")
  girlImage=loadAnimation("./menina/menina_frente2.png","./menina/menina_frente3.png","./menina/menina_frente4.png")
  //npc nao jogador
  nerdImage = loadImage("./nerd/nerd.png")

  //botões
  buttonMissao1Image=loadImage("./sinalizadores/botao_cena1.png")
  buttonMissao2Image=loadImage("./sinalizadores/botaoSala.png")
  buttonMissao3Image=loadImage("./sinalizadores/botaoBiblioteca.png")
  //placar das estrelas
  empty_star=loadAnimation("./sinalizadores/empty.png")
  one_star=loadAnimation("./sinalizadores/one_star.png")
  two_star=loadAnimation("./sinalizadores/stars.png")
  star_img=loadImage("./sinalizadores/star.png")
  endImg =loadAnimation("./sinalizadores/fimdeJogo.png");

  //Jogo sala de aula
  //girlImg = loadAnimation("Runner-1.png","Runner-2.png");
  number1Img = loadImage("./sinalizadores/1.png");
  number5Img = loadImage("./sinalizadores/5.png");
  number9Img = loadImage("./sinalizadores/9.png");
  number0Img = loadImage("./sinalizadores/0.png");
  
  //sons
  somEstrela=loadSound('./sound/level-up.mp3');
  somMouseClick=loadSound('./sound/mouseclick.mp3');
  somFail=loadSound('./sound/fail.mp3');
  somSucess=loadSound('./sound/sucess.mp3')
}

function setup() {
 canvas = createCanvas(1000, 600);
 canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
 canvas.style("z-index", "-1");

 pc = createSprite(420,500,20,30);
 pc.addAnimation("costa",pc_CostaM)
 pc.addAnimation("direita",pc_DireitaM)
 pc.addAnimation("esquerda",pc_EsquerdaM)
 pc.addAnimation("frente",pc_FrenteM)
 pc.addAnimation("pc_CostaP",pc_CostaP)
 pc.addAnimation("pc_EsquerdaP",pc_EsquerdaP)
 pc.addAnimation("pc_DireitaP",pc_DireitaP)
 pc.addAnimation("pc_FrenteP",pc_FrenteP)
 pc.changeAnimation("pc_FrenteP")
 pc.scale=0.15

 nerd = createSprite(490,500,20,30);
 nerd.addImage("nerd", nerdImage)
 nerd.scale = 0.6

 buttonMissao1=createSprite(300,520)
 buttonMissao1.addImage("botaocena1", buttonMissao1Image)
 buttonMissao1.visible=false
 buttonMissao1.scale = 0.5
 
 botaosaladeaula=createSprite(350,450)
 botaosaladeaula.scale = 0.5
 botaosaladeaula.visible=false
 botaosaladeaula.addImage("bot", buttonMissao2Image)
 
 botaoBiblioteca=createSprite(480,450)
 botaoBiblioteca.scale = 0.5
 botaoBiblioteca.visible=false
 botaoBiblioteca.addImage("botaoD", buttonMissao3Image)

 star_display=createSprite(70,40)
 star_display.addAnimation("empty",empty_star)
 star_display.addAnimation("onestar",one_star)
 star_display.addAnimation("twostar",two_star)
 star_display.changeAnimation("empty")
 star_display.scale=0.2

 
 girl=createSprite(300,100)
 girl.addAnimation("menina",girlImage)
 girl.velocityY=0
 girl.visible=false
 girl.scale = 0.3
 
 star=createSprite(500,300)
 star.addImage(star_img)
 star.scale=0.1
 star.visible=false

 
number1Group=new Group()
number9Group=new Group()
number5Group=new Group()
number0Group=new Group()
access1=createInput("")
//300,110 10000,600
access1.position(canvas.x+width/2-200,canvas.y+height/2-190)
access1.style("background","white")

access2=createInput("")
access2.position(canvas.x+width/2-200,canvas.y+height/2-39)
access2.style("background","white")

access3=createInput("")
access3.position(canvas.x+width/2-200,canvas.y+height/2+100)
access3.style("background","white")

button1=createImg("sinalizadores/botaoplay.png")
button1.position(canvas.x+width/2-200,canvas.y+height/2-160)
button1.size(50,50)

button2=createImg("sinalizadores/botaoplay.png")
button2.position(canvas.x+width/2-200,canvas.y+height/2-9)
button2.size(50,50)

button3=createImg("sinalizadores/botaoplay.png")
button3.position(canvas.x+width/2-200,canvas.y+height/2+130)
button3.size(50,50)
}

function draw() 
{ 
  if(cena === 0){
    background(backgroundImage0);
    esconderelementos()
    pc.visible = false
    nerd.visible = false
    
    setTimeout(()=>{
      pc.visible = true
      nerd.visible = true
      cena = 1
    },3000)

  } 
  if(cena === 1){
    background(backgroundImage1);
    esconderelementos()
    posisonarcaixa()
    
   //colisão com o nerd
   if(pc.collide(nerd)){
    moved=false //desabilitar controles do jogador
    buttonMissao1.visible=true //mostrar botão
    pc.x=pc.x-50 //colocar jogador ao lado do nerd
    pc.changeAnimation("pc_FrenteP") //mudar animação
    pc.scale = 0.15
    //abrir janela de chat
    $(document).ready(function () {
      displayBot()
    })
   }
   //ações ao clicar no botão start
   if(mousePressedOver(buttonMissao1)){
    //som
    buttonMissao1.visible = false //esconder botão
    displayBot() //fechar chat
    pc.changeAnimation("pc_FrenteP") //mudar animação
    pc.scale = 0.15
    pc.x = 420
    pc.y = 420
    console.log(cena)
    cena=2
  }
 
  }
  //cena 2
  if(cena === 2){ 

    background(backgroundImage2)
    esconderelementos()
    nerd.visible=false //esconder nerd
    moved=false //desabailitar controles do jogador
    botaosaladeaula.visible=true //mostrar botao
    

     //se pressionar o botao da sala de aula
    if(mousePressedOver(botaosaladeaula)&&!venceu){
        //som
        cena=3 //sala de aula
        console.log(cena)
         
    }
    //se pressionar o botao da biblioteca
    if(mousePressedOver(botaoBiblioteca)&&venceu){
        //som
        cena=4 //biblioteca
        mostrarelementos()
        console.log(cena)
     }

  }

  //cena 3
  if(cena === 3){
    background(backgroundImage3);
    esconderelementos()
    nerd.visible=false
    pc.visible=false
    girl.visible=true
    botaosaladeaula.visible=false
    botaoBiblioteca.visible=false
    
    if(gameState===PLAY){
      girl.x = World.mouseX;
      edges= createEdgeSprites();
      girl.collide(edges);
      createZero()
      createum()
      createcinco()
      createnove()
      if(number0Group.isTouching(girl)){
        //som
        number0Group.destroyEach()
      }
      else  if(number1Group.isTouching(girl)){
      //som
        number1Group.destroyEach()
        pontos+=1
      }
      else if(number5Group.isTouching(girl)){
      //som
        number5Group.destroyEach()
        pontos+=5
      }
      else  if(number9Group.isTouching(girl)){
      //som
        number9Group.destroyEach()
        pontos+=9
      }
      
      if(pontos>=30

      ){
        gameState=END
      }
    
    }
    if(gameState===END){
      if(pontos===30){
        number0Group.destroyEach()
        number1Group.destroyEach()
        number5Group.destroyEach()
        number9Group.destroyEach()
        number0Group.setVelocityYEach(0)
        number1Group.setVelocityYEach(0)
        number5Group.setVelocityYEach(0)
        number9Group.setVelocityYEach(0)
        star.visible=true
        star_display.changeAnimation("onestar")
        //som
        girl.visible=false
        setTimeout(()=>{
          girl.destroy()
          pc.visible=true
          star.visible=false
          botaoBiblioteca.visible=true
          cena=2
          venceu=true
        },1000)
      }
      if(pontos>30){
        //som
        textSize(20);
        fill("white")
        text("voce ultrapasou a meta tente novamente",120,339)
        setTimeout(() => {
        number0Group.destroyEach()
        number1Group.destroyEach()
        number5Group.destroyEach()
        number9Group.destroyEach()
        pontos=0
        gameState=PLAY
        }, 2000)

        number0Group.setVelocityYEach(0)
        number1Group.setVelocityYEach(0)
        number5Group.setVelocityYEach(0)
        number9Group.setVelocityYEach(0)

        
      }
    }


    //pontuação
    textSize(20);
    fill(0);
    text("Mål: "+ meta,850,30);
    text("Points: "+ pontos,850,50);
    
  }
  // cena 4
  if(cena === 4){
    background(backgroundImage4);
    perguntas()
    
    nerd.visible=false
    pc.visible=false
    botaosaladeaula.visible=false
    botaoBiblioteca.visible=false
    
    button1.mouseClicked(acaobutton1)
    button2.mouseClicked(acaobutton2)
    button3.mouseClicked(acaobutton3)
    if(score===3){
      clear()
      star.visible=true
      setTimeout(()=>{
      star_display.changeAnimation("twostar")
      //som
      pc.scale = 0.20
      moved=true
      cena=5
      },1000)
    }
    textSize(20)
    fill ("black")
    text("Mål:"+score,450,50)
  }
  //cena 5
  if(cena === 5){
    background(backgroundImage5);
   
    nerd.visible=true
    pc.visible=true
    nerd.scale=0.8
    star.visible=false
    if(pc.collide(nerd)){
      moved=false //desabilitar controles do jogador
      pc.scale = 0.20
      pc.x=pc.x-50 //colocar jogador ao lado do nerd
      pc.changeAnimation("pc_FrenteP") //mudar animação
      posisonarcaixa2()
      //abrir janela de chat
      $(document).ready(function () {
        displayBot2()
      })
      
     }

    
    
  }

  //controles do jogador
  if(moved===true && cena ===1){
   if(keyWentDown(UP_ARROW)){
    pc.velocityY=-2
    pc.changeAnimation("costa")
    pc.scale=0.15
   }
   else if (keyWentUp(UP_ARROW)){
    pc.velocityY=0
    pc.changeAnimation("pc_CostaP")
   }
   if(keyWentDown(DOWN_ARROW)){
    pc.velocityY=2
    pc.scale=0.15
    pc.changeAnimation("frente")
   }
   else if (keyWentUp(DOWN_ARROW)){
    pc.velocityY=0
    pc.changeAnimation("pc_FrenteP")
   }
   if(keyWentDown(LEFT_ARROW)){
    pc.velocityX=-2
    pc.scale=0.4
    pc.changeAnimation("esquerda")
   }
   else if (keyWentUp(LEFT_ARROW)){
    pc.velocityX=0
    pc.changeAnimation("pc_EsquerdaP")
   }
   
   if(keyWentDown(RIGHT_ARROW)){
    pc.velocityX=2
    pc.scale=0.4
    pc.changeAnimation("direita")
   }
   else if (keyWentUp(RIGHT_ARROW)){
    pc.velocityX=0
    pc.changeAnimation("pc_DireitaP")
   }
  }

  if(moved===true&&cena===5){
   if(keyWentDown(UP_ARROW)){
    pc.velocityY=-2
    pc.changeAnimation("costa")
    pc.scale=0.20
   }
   else if (keyWentUp(UP_ARROW)){
    pc.velocityY=0
    pc.changeAnimation("pc_CostaP")
   }
   if(keyWentDown(DOWN_ARROW)){
    pc.velocityY=2
    pc.scale=0.20
    pc.changeAnimation("frente")
   }
   else if (keyWentUp(DOWN_ARROW)){
    pc.velocityY=0
    pc.changeAnimation("pc_FrenteP")
   }
   if(keyWentDown(LEFT_ARROW)){
    pc.velocityX=-2
    pc.scale=0.55
    pc.changeAnimation("esquerda")
   }
   else if (keyWentUp(LEFT_ARROW)){
    pc.velocityX=0
    pc.changeAnimation("pc_EsquerdaP")
   }
   
   if(keyWentDown(RIGHT_ARROW)){
    pc.velocityX=2
    pc.scale=0.55
    pc.changeAnimation("direita")
   }
   else if (keyWentUp(RIGHT_ARROW)){
    pc.velocityX=0
    pc.changeAnimation("pc_DireitaP")
   }
  }
  edges= createEdgeSprites();
  pc.collide(edges);
  
  //comportamentos fora do estado de jogo
  textSize(10);
  text (mouseX + "," + mouseY, mouseX, mouseY)
  drawSprites();
}
//abrir janela de chat
function displayBot() {
 
  $('.chatbox__chat').toggle()
  
}
function displayBot2() {
  $('.chatbox__chat2').toggle()
}
function createZero(){
  if (World.frameCount % 200 == 0) {
    var zero = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    zero.addImage(number0Img);
    zero.scale=0.5;
    zero.velocityY = -5;
    zero.lifetime = 130;
    number0Group.add(zero);
    }
}
function createum(){
  if (World.frameCount % 350 == 0) {
    var um = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    um.addImage(number1Img);
    um.scale=0.5;
    um.velocityY = -5;
    um.lifetime = 130;
    number1Group.add(um);
    }
}
function createcinco(){
  if (World.frameCount % 420 == 0) {
    var cinco = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    cinco.addImage(number5Img);
    cinco.scale=0.5;
    cinco.velocityY = -5;
    cinco.lifetime = 130;
    number5Group.add(cinco);
    }
}
function createnove(){
  if (World.frameCount % 540 == 0) {
    var nove = createSprite(Math.round(random(50, width-50)),600, 10, 10);
    nove.addImage(number9Img);
    nove.scale=0.5;
    nove.velocityY = -5;
    nove.lifetime = 130;
    number9Group.add(nove);

    }
}
function perguntas(){
  textSize(15)
    fill ("black")
    text("nefjosie",300,70)

    fill ("black")
    text("Hvem er 6.b dansk lære",300,90)

    fill ("black")
    text("doce1",300,220)

    fill ("black")
    text("qual palavra usamos para codigo",300,240)

    fill ("black")
    text("doce1",300,370)

    fill ("black")
    text("qual palavra usamos para codigo",300,390)
}
function autenticar(atualcode,code){
  if(atualcode===code.toUpperCase())
    return true
  else
   return false 
}
function acaobutton1(){
  
if(autenticar(accesscode1,access1.value())){
  access1.hide()
  button1.hide()
  //som
  score++
}else{
  //som
}
}
function acaobutton2(){
  if(autenticar(accesscode2,access2.value())){
    access2.hide()
    button2.hide()
    //som
    score++
  }
  else{
    //som
  }
  }
  function acaobutton3(){
    if(autenticar(accesscode3,access3.value())){
      access3.hide()
      button3.hide()
      //som
      score++
    }
    else{
      //som
    }
    }
function esconderelementos(){
  access1.hide()
  access2.hide()
  access3.hide()
  button1.hide()
  button2.hide()
  button3.hide()
}
function mostrarelementos(){
  access1.show()
  access2.show()
  access3.show()
  button1.show()
  button2.show()
  button3.show()
}
function windowResized(){
  canvas.position((windowWidth-width)/2,(windowHeight-height)/2)

  access1.position(canvas.x+width/2-200,canvas.y+height/2-190)

  access2.position(canvas.x+width/2-200,canvas.y+height/2-39)

  access3.position(canvas.x+width/2-200,canvas.y+height/2+100)

  button1.position(canvas.x+width/2-200,canvas.y+height/2-160)

  button2.position(canvas.x+width/2-200,canvas.y+height/2-9)

  button3.position(canvas.x+width/2-200,canvas.y+height/2+130)
  posisonarcaixa()
  posisonarcaixa2()
}

function posisonarcaixa(){
  var caixa=document.getElementById("dialogo")
  caixa.style.position = "absolute"; // obrigatório para posicionamento manual
  caixa.style.left = `${canvas.x + width / 2 +100}px`;
  caixa.style.top = `${canvas.y + height / 2 -150}px`; // exemplo diferente
}

function posisonarcaixa2(){
  var caixa2=document.getElementById("chatbox2")
  caixa2.style.position = "absolute"; // obrigatório para posicionamento manual
  caixa2.style.left = `${canvas.x + width / 2 +100}px`;
  caixa2.style.top = `${canvas.y + height / 2 -150}px`; // exemplo diferente
}

