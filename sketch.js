// coordenadas da bola
let bola_x = 300
let bola_y = 200
let bola_diametro = 25
let bola_raio = bola_diametro / 2

// coordenadas da minha raquete/barra
let barra_x = 10
let barra_y = 150
let vel_x = 6 // bola velocidade
let vel_y = 6 // bola velocidade

// coordenadas da barra do oponente
let barra_enemy_x = 580
let barra_enemy_y = 150
let vel_enemy_y

// comprimentos e larguras das barras
let barra_comprimento = 10
let barra_altura = 90

// placar do jogo
let meus_pontos = 0
let pontos_oponente = 0

// sons do jogo
let ponto
let raquetada
let trilha

// modo de jogo
let gamemode = "single"

function preload() {
  ponto = loadSound("ponto.mp3")
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400)
  trilha.loop()
}

function draw() {
  background("black")
  // bola
  makeball() // função da bola
  // barras
  barra(barra_x, barra_y) // função da minha barra
  barra(barra_enemy_x, barra_enemy_y) // função da barra do oponente
  // movimentação da barra inimiga
  moviment_barra_enemy() // função que movimenta a raquete do oponente
  // colisoes
  collision2d(barra_x, barra_y) // collisao da minha raquete
  collision2d(barra_enemy_x, barra_enemy_y) // collisao da raquete oponente
  // placar
  placar() // função dos placar
}

function makeball() {
  fill("white")
  circle(bola_x, bola_y, bola_diametro) // 25 = diametro
  noFill()
  
  bola_x += vel_x
  bola_y += vel_y
  
  if (bola_x + bola_raio > width || bola_x - bola_raio < 0) {
    vel_x *= -1
  }
  
  if (bola_y + bola_raio > height || bola_y - bola_raio < 0) {
    vel_y *= -1
  }
}

function barra(x, y) {
  fill("white")
  rect(x, y, barra_comprimento, barra_altura)
  noFill()
  
  if (keyIsDown(UP_ARROW)) {
    barra_y -= 5
  }
  if (keyIsDown(DOWN_ARROW)) {
    barra_y += 5
  }
}

function moviment_barra_enemy() {
  if (gamemode == "multi") {
    if (keyIsDown(87)) {
      barra_enemy_y -= 10
  }
    if (keyIsDown(83)) {
      barra_enemy_y += 10
  }
  }
  
  if (keyIsDown(87)) {
    gamemode = "multi"
  }
  
  if (gamemode == "single") {
    vel_enemy_y = bola_y - barra_enemy_y - barra_comprimento / 2 - 30
    barra_enemy_y += ceil(vel_enemy_y / 10)
  }
 }

function collision2d(x, y) {
  let hit = collideRectCircle(x, y, barra_comprimento, barra_altura, bola_x, bola_y, bola_raio);
  if(hit) {
    vel_x *= -1;
    raquetada.play()
  }
}

function placar() {
  textAlign(CENTER)
  textSize(20)
  fill("orange")
  stroke("white")
  rect(181, 23, 40, 20)
  noStroke()
  fill("white")
  text(meus_pontos, 200, 40)
  fill("orange")
  stroke("white")
  rect(381, 23, 40, 20)
  noStroke("white")
  fill("white")
  text(pontos_oponente, 400, 40)
  noFill()
  
  // marca ponto para mim
  if (bola_x > 585) {
    meus_pontos += 1
    bola_x = 600 - 30
    ponto.play()
  }
  // marca ponto pro oponente
  if (bola_x < 15) {
    pontos_oponente += 1
    bola_x = 30
    ponto.play()
  }
}
