// ************************************************ VARIAVEIS GLOBAIS ************************************************//

var pos_h, pos_v, pos_v_j, tempo_ms, timerID, pos_atual_v, nome, tempo_jogo, tempo_1s, timerZ, pontos_fim,
    timerC, apanhado, eliminados;
var jogo_ativo = false;

// ******************************************************************************************************************//

// **************************************************** VARIÁVEIS DE SONS ******************************************* //
var audio_tiro = new Audio("Sons/tiro.wav");
audio_tiro.pause();

var audio_atingido = new Audio("Sons/atingido.wav");
audio_atingido.pause();

var audio_jogo = new Audio("Sons/jogo_praia.mp3");
audio_jogo.pause();

var audio_perde = new Audio("Sons/game_over.wav");
audio_perde.pause();

var audio_ganha = new Audio("Sons/ganha.mp3");
audio_ganha.pause();

var audio_mapa = new Audio("sons/Abertura_Jogo_Menus/Abertura_Mapa.mp3");
audio_mapa.pause();

var musica_fundo = true;

var sons_jogo = true;

// *********************************************************************************************************************** //

// **********************************************VARIÁVEIS DE VELOCIDADE************************************************** //
var velocidade = new Array();

var velocidade_min = 3;         //número mínimo de px de movimentação
var velocidade_max = 10;        //número máximo de px de movimentação

var cadencia_min = 100;         //tempo mínimo de cadência para mover mp's
var cadencia_max = 500;         //tempo máximo de cadência para mover mp's

var posicao_min = 1000;         //posição mínima dos mp's
var posicao_max = 100;          //posição máxima dos mp's

// *********************************************************************************************************************** //

// ***************************************************VARIAVEIS DOS MICROPLÁSTICOS **************************************** //

var PLASTICOS = [
    ["cigarros"],
    ["copo"],
    ["copo_plastico"],
    ["embalagem"],
    ["embalagem2"],
    ["garrafa_plastico"],
    ["garrafa_plastico2"],
    ["lata1"],
    ["lata2"],
    ["lata3"],
    ["plastico1"],
    ["plastico2"],
    ["plastico3"],
    ["plastico4"],
    ["plastico5"],
    ["saco_branco"],
    ["saco_lixo"],
    ["saco_verde"],
    ["saco_vermelho"]
];

var tipos_mp;

var BIOLOGICOS = [
    ["copo"],
    ["escova_dentes"],
    ["escova_madeira"],
    ["frasco_vidro"],
    ["garrafa"],
    ["recipiente"],
    ["saco_pano"],
    ["saco_papel"]
];

var tipos_bio;

// *********************************************************************************************************************** //

// ************************************************ VARIAVEIS PARA TIROS ************************************************//

var TIROS = [
    [false, "bala1"],
    [false, "bala2"],
    [false, "bala3"],
    [false, "bala4"],
    [false, "bala5"],
    [false, "bala6"],
    [false, "bala7"],
    [false, "bala8"],
    [false, "bala9"],
    [false, "bala10"]
];
var BOTAOAPERTADO;
var atingido = false;

// **************************************************************************************************************** //

// ************************************************ VARIAVEIS PARA O MAPA ************************************************ //
var timer_piscar;
var mario = false;
var jogador2;
var area, aceso;
var REGIAO = [
    ["Praia"],
    ["Rio"],
    ["Floresta"]
];
//**************************************************************************************************************************//

// ************************************************ VARIÁVEIS PARA AS PERGUNTAS ************************************************//

var PERGUNTAS = [
    [true, "p1", ["Tecidos sintéticos como acrílico e poliéster libertam microfibras que são praticamente impossíveis de filtrar nas ETAR (Estação de Tratamento de Águas Residuais)."]],
    [true, "p2", ["Os animais marinhos confundem as partículas de plástico com o seu alimento."]],
    [true, "p3", ["Existe a probabilidade de haver microplásticos no ar e na água potável."]],
    [false, "p4", ["Os microplásticos só resultam do processo de degradação de objetos maiores."]],
    [true, "p5", ["Os microplásticos estão presentes em produtos de cosmética e higiene."]],
    [true, "p6", ["As beatas de cigarros contêm plástico."]],
    [true, "p7", ["Os micro e nanoplásticos entram na cadeia alimentar do ser humano quando ingere peixe."]],
    [false, "p8", ["Os microplásticos têm mais de 5mm."]],
    [true, "p9", ["O esferovite demora 1 milhão de anos a decompor-se."]],
    [true, "p10", ["Em 2050 haverá mais plásticos nos oceanos do que peixes."]],
    [true, "p11", ["Existem rochas com crosta de plástico."]],
    [false, "p12", ["Beatas de cigarro são biodegradáveis."]],
    [false, "p13", ["Existem menos microplásticos no oceano do que estrelas na nossa galáxia."]],
    [false, "p14", ["Saquinhos de chá não libertam biliões de nanoplásticos na água ingerida."]],
    [false, "p15", ["A pastilha elástica não é a segunda maior fonte de lixo nas ruas."]]
];
var numero_pergunta;
// console.log(PERGUNTAS[0][0], PERGUNTAS[0][1], PERGUNTAS[0][2][0]);
var verificar_resposta;

// *********************************************************************************************************************** //

// ********************************************** VARIÁVEIS DE NÍVEIS ***************************************************** //

var NIVEL = [
    [45, 12],
    [35, 15],
    [30, 12]
];
var fase = 0;
var limpo = 0;
// *********************************************************************************************************************** //


// *********************************** INICIO DO CÓDIGO ******************************************************* //

window.onload = function () {

    document.getElementById("yourName").style.display = "none";             //esconde painel introdução de nome
    document.getElementById("loose").style.display = "none";                //esconde painel "perdeu"
    document.getElementById("no_time").style.display = "none";              //esconde painel "perdeu"
    document.getElementById("barra").style.display = "none";                //esconde barra lateral
    document.getElementById("win").style.display = "none";                  //esconde painel "parabéns"
    document.getElementById("questionario").style.display = "none";         //esconde questionário
    document.getElementById("resposta_certa").style.display = "none";       //esconde resposta certa
    document.getElementById("resposta_errada").style.display = "none";      //esconde resposta certa
    document.getElementById("historia").style.display = "none";
    document.getElementById("scene").style.display = "none";
    document.getElementById("area_limpa").style.display = "none";                //esconde painel "area_limpa"
    document.getElementById("tudo_limpo").style.display = "none";                //esconde painel "area_limpa"

    document.getElementById("enter").onmouseover = function () {            //muda cor botão
        this.style.backgroundColor = "#9DC5BB";
    };
    document.getElementById("enter").onmouseout = function () {             //repõe cor botão
        this.style.backgroundColor = "#ffffff";
    };

    document.getElementById("enter").onclick = function () {                // quando clico em "entrar"...
        document.getElementById("welcome").style.display = "none";          //esconde painel de boas vindas
        document.getElementById("yourName").style.display = "block";        //mostra painel introdução de nome
        nome = document.getElementById("name").value;                       //variável assume valor introduzido

    };

    document.getElementById("maps").onmouseover = function () {             //muda cor botão
        this.style.backgroundColor = "#9DC5BB";
    };
    document.getElementById("maps").onmouseout = function () {              //repõe cor botão
        this.style.backgroundColor = "#ffffff";
    };

    document.getElementById("maps").onclick = function () {                 //quando clico em "mapa"...
        document.getElementById("tela_inicial").style.display = "none";         //esconde painel de introdução de nome
        document.getElementById("historia").style.display = "block";
        mapa();                                                             //executa função "mapa"
        jogador2 = document.getElementById("jogador2");
        audio_mapa.play()
    };

    jogador2 = document.getElementById("jogador2");
};

function mapa() {

    mario = true;
    console.log(mario);

    //**************************************  PARTE DA HISTÓRIA *************************************************//

    var folha = 1;

    document.getElementById("prox_pagina").onclick = function () {

        if (folha === 1) {
            document.getElementById("pagina").src = "imagens/telas/quadrado_fala2.png";
            folha = folha + 1;
        } else {
            if (folha === 2) {
                document.getElementById("pagina").src = "imagens/telas/quadrado_fala3.png";
                folha = folha + 1;
            } else {
                document.getElementById("historia").style.display = "none";
                document.getElementById("scene").style.display = "block";

            }
        }
    };

    document.getElementById("fechar_mapa").onclick = function () {
        document.getElementById("historia").style.display = "none";
        document.getElementById("scene").style.display = "block";
    };

    //**************************************  IMAGENS INSERIDAS NO SCENE *************************************************//


    document.getElementById("scene").innerHTML += "<img id='mapa' class='img-fluid' src='imagens/mapas/mapa_final.png'>";    //carrega fundo do mapa

    document.getElementById("barra").style.display = "block";                    //mostra barra lateral
    document.getElementById("barra").style.position = "absolute";                //posiciona barra lateral
    document.getElementById("barra").style.top = "0";
    document.getElementById("barra").style.left = "0";

    document.getElementById("logo").onclick = function() {
        history.go(0);
    }

    document.getElementById("icon_b").style.display = "none";

    document.getElementById("sounds").style.display = "block";
    document.getElementById("icon_s").src = "imagens/Botoes/sound_on.png";
    document.getElementById("icon_m").src = "imagens/Botoes/music_on.png";
    botoes_som(audio_mapa);

    document.getElementById("time").style.display = "none";
    document.getElementById("points").style.display = "none";

    document.getElementById("scene").innerHTML += "<img id='jogador2' src='imagens/jogador/jogador_fixe.png'>";                          //carrega jogador

    document.getElementById("scene").innerHTML += "<img id='tutorial' src='imagens/tutorial_sombra.png ' class='btn'>";                  //carrega icon tutorial

    document.getElementById("scene").innerHTML += "<img  id='T_texto' src='imagens/tutorial_Texto.png'>";                               //carrega icon tutorial com texto

    document.getElementById("T_texto").style.display = "none";                                                                           //icon tutorial com texto invisível

    document.getElementById("scene").innerHTML += "<img id='fechar_info' src='imagens/Botoes/exit.png' class='btn' type='button'/>";                                      //carrega botão fechar

    document.getElementById("fechar_info").style.display = "none";                                                                            //botão fechar invisível

    document.getElementById("scene").innerHTML += "<img id='river' src='imagens/mapas/river_borda_sombra.png' class='btn'>";             //carrega imagem de área como botão

    document.getElementById("scene").innerHTML += "<img id='beach' src='imagens/mapas/beach_borda_sombra.png' class='btn'>";             //carrega imagem de área como botão

    document.getElementById("scene").innerHTML += "<img id='florest' src='imagens/mapas/florest_borda_sombra.png' class='btn'>";         //carrega imagem de área como botão

    document.getElementById("scene").innerHTML += "<img id='botao_historia' class='btn' src='imagens/Botoes/historia.png'>";
    document.getElementById("botao_historia").style.display = "block";

    document.getElementById("botao_historia").onclick = function () {
        folha = 1;
        document.getElementById("scene").style.display = "none";                                                                            //botão fechar invisível
        document.getElementById("historia").style.display = "block";
    };

    //************************************** CONTROLES TUTORIAL *************************************************//
    aceso = false;                                                                          //botão tutorial está em cinza

    timer_piscar = setInterval(function () {                                                //timer para pôr o botão tutorial a piscar
        if (aceso == false) {
            document.getElementById("tutorial").src = "imagens/tutorial.png";
            aceso = true;
        } else {
            document.getElementById("tutorial").src = "imagens/tutorial_sombra.png";
            aceso = false;
        }
    }, 1000);

    document.getElementById("tutorial").style.position = "absolute";
    document.getElementById("tutorial").style.left = "77%";
    document.getElementById("tutorial").style.top = "77%";

    document.getElementById("tutorial").onclick = function () {

        clearInterval(timer_piscar);

        document.getElementById("T_texto").style.display = "block";
        document.getElementById("T_texto").style.position = "absolute";
        document.getElementById("T_texto").style.left = "200px";
        document.getElementById("T_texto").style.top = "100px";

        document.getElementById("fechar_info").style.display = "block";

    };

    document.getElementById("fechar_info").onclick = function () {

        document.getElementById("fechar_info").style.display = "none";
        document.getElementById("T_texto").style.display = "none";

        timer_piscar = setInterval(function () {
            if (aceso == false) {
                document.getElementById("tutorial").src = "imagens/tutorial.png";
                aceso = true;
            } else {
                document.getElementById("tutorial").src = "imagens/tutorial_sombra.png";
                aceso = false;
            }
        }, 1000);
    };

    //************************************** CONTROLES JOGADOR2 *************************************************//

    document.getElementById("jogador2").style.position = "absolute";      //define posição de jogador como absolute
    document.getElementById("jogador2").style.left = "550px";             //pos_h_j nos 450px
    document.getElementById("jogador2").style.top = "250px";              //atribui a pos_v_j ao jogador

    //************************************** CONTROLES STICKERS *************************************************//

    document.getElementById("beach").onmouseover = function () {
        this.src = "imagens/mapas/beach_3d.png";
    };
    document.getElementById("beach").onmouseout = function () {
        this.src = "imagens/mapas/beach_borda_sombra.png";
    };

    document.getElementById("beach").style.position = "absolute";
    document.getElementById("beach").style.left = "600px";
    document.getElementById("beach").style.top = "100px";

    document.getElementById("river").onmouseover = function () {
        this.src = "imagens/mapas/river_3d.png";
    };
    document.getElementById("river").onmouseout = function () {
        this.src = "imagens/mapas/river_borda_sombra.png";
    };

    document.getElementById("river").style.position = "absolute";
    document.getElementById("river").style.left = "100px";
    document.getElementById("river").style.top = "250px";

    document.getElementById("florest").onmouseover = function () {
        this.src = "imagens/mapas/florest_3d.png";
    };
    document.getElementById("florest").onmouseout = function () {
        this.src = "imagens/mapas/florest_borda_sombra.png";
    };

    document.getElementById("florest").style.position = "absolute";
    document.getElementById("florest").style.left = "470px";
    document.getElementById("florest").style.top = "350px";

    document.getElementById("beach").onclick = function () {

        clearInterval(timer_piscar);                                         //limpa timer de movimentação mp's
        audio_mapa.pause();

        document.getElementById("mapa").style.display = "none";
        document.getElementById("jogador2").style.display = "none";
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("T_texto").style.display = "none";
        document.getElementById("fechar_info").style.display = "none";
        document.getElementById("river").style.display = "none";
        document.getElementById("beach").style.display = "none";
        document.getElementById("florest").style.display = "none";
        document.getElementById("botao_historia").style.display = "none";

        area = 0;
        batalhar();
    };
    document.getElementById("river").onclick = function () {

        clearInterval(timer_piscar);                                         //limpa timer de movimentação mp's
        audio_mapa.pause();

        document.getElementById("mapa").style.display = "none";
        document.getElementById("jogador2").style.display = "none";
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("T_texto").style.display = "none";
        document.getElementById("fechar_info").style.display = "none";
        document.getElementById("river").style.display = "none";
        document.getElementById("beach").style.display = "none";
        document.getElementById("florest").style.display = "none";
        document.getElementById("botao_historia").style.display = "none";

        area = 1;
        batalhar();
    };
    document.getElementById("florest").onclick = function () {

        clearInterval(timer_piscar);                                         //limpa timer de movimentação mp's
        audio_mapa.pause();

        document.getElementById("mapa").style.display = "none";
        document.getElementById("jogador2").style.display = "none";
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("T_texto").style.display = "none";
        document.getElementById("fechar_info").style.display = "none";
        document.getElementById("river").style.display = "none";
        document.getElementById("beach").style.display = "none";
        document.getElementById("florest").style.display = "none";
        document.getElementById("botao_historia").style.display = "none";

        area = 2;
        batalhar();
    }

}

function batalhar() {

    document.getElementById("scene").innerHTML += "<img src='imagens/jogador/jogador_batalha.png' id='jogador'>";                //carrega jogador

    for (i = 0; i < TIROS.length; i++) {
        document.getElementById("scene").innerHTML += "<img src='imagens/z2.png' id='" + TIROS[i][1] + "'>";             //carrega tiro
        document.getElementById(TIROS[i][1]).style.display = "none";                                                             //tiro está invisível
    }

    document.getElementById("icon_b").style.display = "inline-block";

    document.getElementById("scene").innerHTML += "<img id='ambiente' class='img-fluid margin-auto' src='imagens/batalhas/" + REGIAO[area][0] + ".png'>";

    carrega_elementos();                                                                                                        //carrega mp's e jogador
}

function carrega_elementos() {

    jogo_ativo = true;                                                           //jogo fica ativo
    mario = false;
    audio_jogo.play();
    eliminados = 0;

    document.getElementById("points").style.display = "block";
    document.getElementById("pontos").style.display = "block";                      //mostra pontos (valor)
    pontos_fim = document.getElementById("pontos").value;                           //pontos iniciais

    document.getElementById("time").style.display = "block";
    document.getElementById("tempo_txt").style.display = "block";                   //mostra tempo (valor)
    document.getElementById("tempo_txt").value = NIVEL[fase][0];                    //tempo máximo apresentado - 45s

    document.getElementById("icon_s").src = "imagens/Botoes/sound_on.png";
    document.getElementById("icon_m").src = "imagens/Botoes/music_on.png";
    botoes_som(audio_jogo);

    document.getElementById("jogador").style.position = "absolute";                                             //define posição de jogador como absolute
    document.getElementById("jogador").style.left = "100px";                                                     //pos_h_j nos 200px

    pos_v_j = parseInt(Math.random() * (400 - 100)) + "px";                                                        //cálculo aleatório da pos_v_j na altura total da janela menos altura
    document.getElementById("jogador").style.top = pos_v_j;                                                     //atribui a pos_v_j ao jogador

    for (contador = 0; contador < NIVEL[fase][1]; contador++) {                                 //carrega os 10 mp no nível 1

        tipos_mp = parseInt(Math.random() * PLASTICOS.length);

        tipos_bio = parseInt(Math.random() * BIOLOGICOS.length);
        if (contador == 0) {
            document.getElementById("sceneextra").innerHTML = "<img src='imagens/objetos/" + PLASTICOS[tipos_mp][0] + ".png' id='plastico" + contador + "'>";

        } else {
            document.getElementById("sceneextra").innerHTML += "<img src='imagens/objetos/" + PLASTICOS[tipos_mp][0] + ".png' id='plastico" + contador + "'>";
        }

        document.getElementById("plastico" + contador).style.display = "block";
        document.getElementById("plastico" + contador).style.position = "absolute";         //define a posição de cada mp como absolute

        document.getElementById("plastico" + contador).style.width = 80 + "px";
        document.getElementById("plastico" + contador).style.height = "auto";

        pos_h = parseInt(Math.random() * (posicao_max)) + posicao_min + "px";             //posição horizontal aleatória entre largura total da janela (1366-posicao_min) mais largura que eu quiser (posicao_max)

        pos_v = parseInt(Math.random() * (500 - 110) + 90) + "px";                        //posição vertical aleatória entre altura total da janela menos altura do mp

        document.getElementById("plastico" + contador).style.top = pos_v;                 //atribui a pos_v ao mp
        document.getElementById("plastico" + contador).style.left = pos_h;                //atribui a pos_h ao mp

        velocidade[contador] = parseInt(velocidade_min + Math.random() * (velocidade_max - velocidade_min + 1));
        //ARRAY!! - cria/atribui número de px aleatório para mover cada mp entre velocidade_min e velocidade_max
    }

    move_mp();                                                                       //atribui função move_mp a cada mp

    tempo_1s = setInterval(function () {                                 //a cada 1s tira 1 ao valor indicado na caixa do tempo
        document.getElementById("tempo_txt").value = document.getElementById("tempo_txt").value - 1;
    }, 1000);

    tempo_jogo = setTimeout(function () {                                //ao fim de Xs executa a função perde_jogo
        perde_jogo();
    }, parseInt(NIVEL[fase][0] * 1000));

    timerZ = setInterval(function () {                                  //timer para mover o tiro
        for (i = 0; i < TIROS.length; i++) {
            if (BOTAOAPERTADO == true) {
                if (parseInt(document.getElementById(TIROS[i][1]).style.left) + 14 < innerWidth) {
                    document.getElementById(TIROS[i][1]).style.left = parseInt(document.getElementById(TIROS[i][1]).style.left) + 3 + "px";
                    deteta_colisao();
                }
            }
        }

    }, 2)

    document.getElementById("icon_b").onclick = function () {

        audio_jogo.pause();

        document.getElementById("sceneextra").innerHTML = " ";

        document.getElementById("icon_b").style.display = "none";
        document.getElementById("jogador").style.display = "none";
        document.getElementById("ambiente").style.display = "none";
        document.getElementById("historia").style.display = "none";

        clearInterval(timerID);                                                                          //limpa timer de movimentação mp's
        clearInterval(tempo_1s);                                                                         //limpa timer de desconto de tempo
        clearInterval(timerZ);                                                                          //limpa timer do tiro
        clearTimeout(tempo_jogo);

        audio_mapa.play();

        document.getElementById("historia").style.display = "none";
        document.getElementById("botao_historia").style.display = "block";
        document.getElementById("jogador2").style.display = "block";

        document.getElementById("river").style.display = "block";
        document.getElementById("beach").style.display = "block";
        document.getElementById("florest").style.display = "block";

        document.getElementById("tutorial").style.display = "block";

        document.getElementById("scene").innerHTML = "<div id='sceneextra'></div>";

        timer_piscar = setInterval(function () {                                                //timer para pôr o botão tutorial a piscar
            if (aceso == false) {
                document.getElementById("tutorial").src = "imagens/tutorial.png";
                aceso = true;
            } else {
                document.getElementById("tutorial").src = "imagens/tutorial_sombra.png";
                aceso = false;
            }
        }, 1000);

        mapa();

    };

}

window.onkeydown = function (event1) {         //ao carregar na tecla, faz função processaTecla - move jogador
    processaTecla(event1);
};

window.onkeyup = function (event2) {           //ao carregar na tecla, faz função tiroTecla - lança tiros
    tiroTecla(event2);
};

//função criada para mover cada mp

function move_mp() {

    tempo_ms = parseInt(cadencia_min + Math.random() * (cadencia_max - cadencia_min + 1));    //cria/atribui tempo aleatório para mover cada mp entre cadencia_min e cadencia_max

    timerID = setInterval(function () {
        for (contador = 0; contador < NIVEL[fase][1]; contador++) {

            if (parseInt(document.getElementById("plastico" + contador).style.left) >= 150) {           //se mp estiver antes dos 200px...
                document.getElementById("plastico" + contador).style.left = parseInt(document.getElementById("plastico" + contador).style.left) - velocidade[contador] + "px";

                //movimenta cada mp com tempo_ms gerado com a velocidade gerada no ARRAY
                // pos_atual_mp = document.getElementById("plastico" + contador).style.left;

            } else {
                if (parseInt(document.getElementById("plastico" + contador).style.left) < 150) {        //se mp chegar aos 200px...
                    perde_jogo();
                }
            }
        }
    }, tempo_ms)
}

function processaTecla(event1) {                                                    //função para teclas

    if (mario === true) {
        switch (event1.key) {
            case "w":
                jogador2.style.top = parseInt(jogador2.style.top) - 10 + "px";
                jogador2.src = "imagens/jogador/jogador_traseira.png";
                break;
            case "s":
                jogador2.style.top = parseInt(jogador2.style.top) + 10 + "px";
                jogador2.src = "imagens/jogador/jogador_frente.png";
                break;
            case "a":
                jogador2.style.left = parseInt(jogador2.style.left) - 10 + "px";
                jogador2.src = "imagens/jogador/jogador_esquerda.png";
                break;
            case "d":
                jogador2.style.left = parseInt(jogador2.style.left) + 10 + "px";
                jogador2.src = "imagens/jogador/jogador_direita.png";
                break;
        }
    } else {
        if (jogo_ativo === true) {                                                      //se o jogo_ativo fôr verdadeiro
            pos_atual_v = parseInt(document.getElementById("jogador").style.top);       //atribui à variável pos_atual_v a posição vertical atual do jogador

            switch (event1.key) {                                                       //escolha de teclas
                case "w":                                                               //caso clique q...
                    if (pos_atual_v >= 0) {
                        pos_atual_v = pos_atual_v - 10 + "px";                          //à pos_atual_v é retirado 10px e é o novo valor de pos_atual_v
                        document.getElementById("jogador").style.top = pos_atual_v;     //o novo valor vertical é atribuído ao jogador
                    }
                    break;
                case "s":                                                               //caso clique a...
                    if (pos_atual_v <= 612 - 140) {
                        pos_atual_v = pos_atual_v + 10 + "px";                          //à pos_atual_v é somado 10px e é o novo valor de pos_atual_v
                        document.getElementById("jogador").style.top = pos_atual_v;     //o novo valor vertical é atribuído ao jogador
                    }
            }
        }
    }
}

function perde_jogo() {                                             //função criada para perder o jogo

    jogo_ativo = false;                                                                     //jogo deixa de estar ativo

    document.getElementById("scene").style.display = "none";                                  //fundo do jogo deixa de ser visível
    document.getElementById("barra").style.display = "none";                               //barra lateral deixa de ser visível
    document.getElementById("jogador").style.top = pos_atual_v;                              //jogador fica fixo

    clearInterval(timerID);                                                                          //limpa timer de movimentação mp's
    clearInterval(tempo_1s);                                                                         //limpa timer de desconto de tempo
    clearInterval(timerZ);                                                                          //limpa timer do tiro
    clearTimeout(tempo_jogo);                                                                       //limpa timer do tempo total de jogo

    audio_jogo.pause();                                                                   //pára música do jogo
    audio_perde.play();

    if (document.getElementById("tempo_txt").value == 0) {
        document.getElementById("no_time").style.display = "block";       //mostra painel de "perdeu"
        document.getElementById("loose").style.display = "none";       //mostra painel de "perdeu"
    } else {
        document.getElementById("loose").style.display = "block";       //mostra painel de "perdeu"
        document.getElementById("no_time").style.display = "none";       //mostra painel de "perdeu"
    }

    document.getElementById("try_again1").onmouseover = function () {                     //muda cor botão
        this.style.backgroundColor = "#9DC5BB";
    };
    document.getElementById("try_again1").onmouseout = function () {                      //repõe cor botão
        this.style.backgroundColor = "#ffffff";
    };

    document.getElementById("try_again1").onclick = function () {                         //clicar no botão
        document.getElementById("loose").style.display = "none";                          //esconde painel de "perdeu por mp's"
        document.getElementById("scene").style.display = "block";                         //mostra fundo do jogo
        document.getElementById("barra").style.display = "block";
        document.getElementById("pontos").value = "0";
        carrega_elementos();                                                              //carrega mp's e jogador
    };

    document.getElementById("try_again2").onmouseover = function () {                     //muda cor botão
        this.style.backgroundColor = "#9DC5BB";
    };
    document.getElementById("try_again2").onmouseout = function () {                      //repõe cor botão
        this.style.backgroundColor = "#ffffff";
    };

    document.getElementById("try_again2").onclick = function () {                         //clicar no botão
        document.getElementById("no_time").style.display = "none";                        //esconde painel de "perdeu por tempo"
        document.getElementById("scene").style.display = "block";                         //mostra fundo jogo
        document.getElementById("barra").style.display = "block";
        document.getElementById("pontos").value = "0";
        carrega_elementos();                                                              //carrega mp's e jogador
    };

}

function disappear() {                              //função serve para tirar do campo de jogo o mp atingido ao final de 1s
    timerC = setTimeout(function () {
        apanhado.style.left = innerWidth - 300 + "px";
        apanhado.style.top = innerHeight + 1000 + "px";
        apanhado.style.display = "none";
    }, 1000);
}

function tiroTecla(event2) {

    if (jogo_ativo == true && event2.key == " ") {                                  //se jogo está ativo e se carrego no espaço...

        BOTAOAPERTADO = true;
        for (i = 0; i < TIROS.length; i++) {
            document.getElementById(TIROS[i][1]).style.display = "block";                    //posiciona tiro
            document.getElementById(TIROS[i][1]).style.position = "absolute";
            document.getElementById(TIROS[i][1]).style.top = parseInt(document.getElementById("jogador").style.top) + 60 + "px"; //tiro fica a meio da altura do jogador
            document.getElementById(TIROS[i][1]).style.left = "220px";
            if (sons_jogo == true) {
                audio_tiro.play();
            }                                                          //toca som do tiro
            break;
            console.log(TIROS[i][1])

        }
    }

}

function deteta_colisao() {

    for (i = 0; i < TIROS.length; i++) {
        for (contador = 0; contador < NIVEL[fase][1]; contador++) {
            if (apanhado != document.getElementById("plastico" + contador)) {
                if (parseInt(document.getElementById(TIROS[i][1]).style.left) + 14 > parseInt(document.getElementById("plastico" + contador).style.left)
                    &&
                    parseInt(document.getElementById(TIROS[i][1]).style.left) < parseInt(document.getElementById("plastico" + contador).style.left) + 110) {
                    if (parseInt(document.getElementById(TIROS[i][1]).style.top) + 18 > parseInt(document.getElementById("plastico" + contador).style.top)
                        &&
                        parseInt(document.getElementById(TIROS[i][1]).style.top) < parseInt(document.getElementById("plastico" + contador).style.top) + 110) {

                        //SE HOUVER COLISÃO//

                        tipos_bio = parseInt(Math.random() * BIOLOGICOS.length);

                        document.getElementById("plastico" + contador).src = "imagens/zero_waste/" + BIOLOGICOS[tipos_bio][0] + ".png";

                        apanhado = document.getElementById("plastico" + contador);

                        atingido = true;

                        if (sons_jogo == true) {        //se sons estiverem ativos...
                            audio_atingido.play();      //toca audio de atingido/colisão
                        } else {                        //senão...
                            audio_atingido.pause();     //não toca nada
                        }

                        eliminados = eliminados + 1;        //contabiliza eliminados

                        if (atingido == true) {             //se objeto tiver status atingido
                            disappear();                    //ativa função para desaparecer
                        }

                        document.getElementById(TIROS[i][1]).style.left = innerWidth + 1000 + "px";

                        pontos_fim = parseInt(document.getElementById("pontos").value) + 10;        //soma 10 pontos aos pontos totais por cada mp

                        document.getElementById("pontos").value = pontos_fim;                       //mostrado é o total

                        if (eliminados == NIVEL[fase][1]) {         //se eliminados for igual a 10
                            ganha_jogo();               //ativa função ganha_jogo
                        }
                    }
                }
            }
        }
    }
}

function ganha_jogo() {

    jogo_ativo = false;                                                                     //jogo deixa de estar ativo

    document.getElementById("scene").style.display = "none";                                  //fundo do jogo deixa de ser visível
    document.getElementById("barra").style.display = "none";                               //barra lateral deixa de ser visível
    document.getElementById("jogador").style.top = pos_atual_v;                              //jogador fica fixo

    clearInterval(timerID);                                                                          //limpa timer de movimentação mp's
    clearInterval(tempo_1s);                                                                         //limpa timer de desconto de tempo
    clearInterval(timerZ);                                                                          //limpa timer do tiro
    clearTimeout(tempo_jogo);                                                                       //limpa timer do tempo total de jogo

    document.getElementById("pontos").value = 0;

    audio_jogo.pause();                                                                   //pára música do jogo
    audio_ganha.play();                                                           //toca música de ganhar

    document.getElementById("win").style.display = "block";                       //mostra painel de "parabéns"

    document.getElementById("question").onmouseover = function () {                  //muda cor botão
        this.style.backgroundColor = "#9DC5BB";
    };
    document.getElementById("question").onmouseout = function () {                  //repõe cor botão
        this.style.backgroundColor = "#ffffff";
    };

    document.getElementById("question").style.display = "block";                   //mostra botão para ir à pergunta
    document.getElementById("question").onclick = function () {
        perguntas();
    }

}

function perguntas() {

    document.getElementById("win").style.display = "none";

    document.getElementById("submeter").onmouseover = function () {             //muda cor botão
        this.style.backgroundColor = "#9DC5BB";
    };
    document.getElementById("submeter").onmouseout = function () {              //repõe cor botão
        this.style.backgroundColor = "#ffffff";
    };

    document.getElementById("questionario").style.display = "block";

    numero_pergunta = parseInt(Math.random() * PERGUNTAS.length);

    document.getElementById("afirmacao").innerHTML = PERGUNTAS[numero_pergunta][2][0];

    document.getElementById("verdadeiro").style.backgroundColor = "#ffffff";
    document.getElementById("falso").style.backgroundColor = "#ffffff";

    document.getElementById("verdadeiro").onclick = function () {
        this.style.backgroundColor = "#53A882";
        console.log("muda cor verdadeiro");
        verificar_resposta = true;
        document.getElementById("falso").style.backgroundColor = "#ffffff";
    };

    document.getElementById("falso").onclick = function () {
        this.style.backgroundColor = "#BD5943";
        console.log("muda cor falso");
        verificar_resposta = false;
        document.getElementById("verdadeiro").style.backgroundColor = "#ffffff";
    };

    document.getElementById("submeter").onclick = function () {

        document.getElementById("questionario").style.display = "none";

        if (verificar_resposta === PERGUNTAS[numero_pergunta][0]) {

            document.getElementById("resposta_certa").style.display = "block";

            document.getElementById("proximo_nivel").onmouseover = function () {             //muda cor botão
                this.style.backgroundColor = "#9DC5BB";
            };
            document.getElementById("proximo_nivel").onmouseout = function () {              //repõe cor botão
                this.style.backgroundColor = "#ffffff";
            };

            document.getElementById("proximo_nivel").onclick = function () {

                document.getElementById("resposta_certa").style.display = "none";
                document.getElementById("scene").style.display = "block";                                  //fundo do jogo deixa de ser visível
                audio_ganha.pause();
                document.getElementById("barra").style.display = "block";
                document.getElementById("pontos").value = "0";

                if (fase < 2) {

                    fase = fase + 1;
                    carrega_elementos();

                } else {

                    fase = 0;
                    limpo = limpo + 1;

                    if (limpo <= 2) {

                        document.getElementById("barra").style.display = "none";                //esconde barra lateral
                        document.getElementById("sceneextra").style.display = "none";
                        document.getElementById("ambiente").style.display = "none";
                        document.getElementById("jogador").style.display = "none";

                        for (i = 0; i < TIROS.length; i++) {
                            document.getElementById(TIROS[i][1]).style.display = "none";                                                             //tiro está invisível
                        }

                        document.getElementById("sceneextra").innerHTML = " ";

                        document.getElementById("area_limpa").style.display = "block";
                        document.getElementById("regiao").innerHTML = REGIAO[area][0];

                        document.getElementById("next").onmouseover = function () {             //muda cor botão
                            this.style.backgroundColor = "#9DC5BB";
                        };
                        document.getElementById("next").onmouseout = function () {              //repõe cor botão
                            this.style.backgroundColor = "#ffffff";
                        };
                        document.getElementById("next").onclick = function () {
                            document.getElementById("area_limpa").style.display = "none";

                            audio_jogo.pause();

                            document.getElementById("sceneextra").innerHTML = " ";

                            document.getElementById("icon_b").style.display = "none";
                            document.getElementById("jogador").style.display = "none";
                            document.getElementById("ambiente").style.display = "none";
                            document.getElementById("historia").style.display = "none";

                            clearInterval(timerID);                                                                          //limpa timer de movimentação mp's
                            clearInterval(tempo_1s);                                                                         //limpa timer de desconto de tempo
                            clearInterval(timerZ);                                                                          //limpa timer do tiro
                            clearTimeout(tempo_jogo);

                            audio_mapa.play();

                            document.getElementById("historia").style.display = "none";
                            document.getElementById("botao_historia").style.display = "block";
                            document.getElementById("jogador2").style.display = "block";

                            document.getElementById("river").style.display = "block";
                            document.getElementById("beach").style.display = "block";
                            document.getElementById("florest").style.display = "block";

                            document.getElementById("tutorial").style.display = "block";

                            document.getElementById("scene").innerHTML = "<div id='sceneextra'></div>";

                            mapa();

                        };


                    } else {
                        document.getElementById("barra").style.display = "none";                //esconde barra lateral
                        document.getElementById("sceneextra").style.display = "none";
                        document.getElementById("ambiente").style.display = "none";
                        document.getElementById("jogador").style.display = "none";

                        for (i = 0; i < TIROS.length; i++) {
                            document.getElementById(TIROS[i][1]).style.display = "none";                                                             //tiro está invisível
                        }

                        document.getElementById("sceneextra").innerHTML = " ";

                        document.getElementById("tudo_limpo").style.display = "block";
                        document.getElementById("regiao_final").innerHTML = REGIAO[area][0];

                        document.getElementById("next_final").onmouseover = function () {             //muda cor botão
                            this.style.backgroundColor = "#9DC5BB";
                        };
                        document.getElementById("next_final").onmouseout = function () {              //repõe cor botão
                            this.style.backgroundColor = "#ffffff";
                        };
                        document.getElementById("next_final").onclick = function () {
                            document.getElementById("tudo_limpo").style.display = "none";

                            audio_jogo.pause();

                            document.getElementById("sceneextra").innerHTML = " ";

                            document.getElementById("icon_b").style.display = "none";
                            document.getElementById("jogador").style.display = "none";
                            document.getElementById("ambiente").style.display = "none";
                            document.getElementById("historia").style.display = "none";

                            clearInterval(timerID);                                                                          //limpa timer de movimentação mp's
                            clearInterval(tempo_1s);                                                                         //limpa timer de desconto de tempo
                            clearInterval(timerZ);                                                                          //limpa timer do tiro
                            clearTimeout(tempo_jogo);

                            audio_mapa.play();

                            document.getElementById("historia").style.display = "none";
                            document.getElementById("botao_historia").style.display = "block";
                            document.getElementById("jogador2").style.display = "block";

                            document.getElementById("river").style.display = "block";
                            document.getElementById("beach").style.display = "block";
                            document.getElementById("florest").style.display = "block";

                            document.getElementById("tutorial").style.display = "block";

                            document.getElementById("scene").innerHTML = "<div id='sceneextra'></div>";

                            mapa();
                        }
                    }
                }
            }

        } else {

            document.getElementById("resposta_errada").style.display = "block";

            document.getElementById("refazer_questao").onmouseover = function () {                  //muda cor botão
                this.style.backgroundColor = "#9DC5BB";
            };
            document.getElementById("refazer_questao").onmouseout = function () {                  //repõe cor botão
                this.style.backgroundColor = "#ffffff";
            };

            document.getElementById("refazer_questao").onclick = function () {
                document.getElementById("resposta_errada").style.display = "none";
                perguntas();
            }
        }
    }
}

function botoes_som(m_fundo) {                                                      //função para botoes de som/música
    document.getElementById("icon_s").onclick = function () {                       //clicando no icon do som...
        if (sons_jogo == true) {                                                    //se sons estiverem ativos...
            document.getElementById("icon_s").src = "imagens/Botoes/sound_off.png";        //icon muda
            sons_jogo = false;                                                      //sons ficam off
        } else {                                                                    //senão...
            document.getElementById("icon_s").src = "imagens/Botoes/sound_on.png";         //icon som muda
            sons_jogo = true;                                                       //sons ficam on
        }
    };

    document.getElementById("icon_m").onclick = function () {                       //clicando no icon da música...
        if (musica_fundo == true) {                                                 //se música estiver ativa...
            m_fundo.pause();                                               //pára música
            document.getElementById("icon_m").src = "imagens/Botoes/music_off.png";        //icon música muda
            musica_fundo = false;
        } else {                                                                    //senão...
            m_fundo.play();                                                //toca música
            document.getElementById("icon_m").src = "imagens/Botoes/music_on.png";         //icon música muda
            musica_fundo = true;
        }
    }
}


