// función que permite poner visible o no una sección div, asi conseguimos que
// la tabla se oculte cuando inciamos partida
var currentMaze;
var currentTime;
var img;
var back;
var left;
var front;
var right;
var puzzle;
var lock;
var lvl2Unlock;
var lvl3Unlock;
var intscene;
var tIni;
//var tLvl1 = 100000; //100.000 ms (1min 40sg)
var pen=0;          //penalizacion acumulada
var anchura;
var refreshIntervalId;
var maze;
var quest;




// función que cambia de estado a bloqueado y viceversa
function ponerVisible(div, visible) {
	let	estado = visible ? "block" : "none"; // block para que se vea, o none
											// para que no se vea
	div.css({
		"display" : estado
	});
}

// funcion que se invoca al cargar la pagina
// Carga de los diferentes botones e iniciacion de algunas variables y valores
$(function() {
    ponerVisible($("#menuHighscore"), false);
    ponerVisible($("#menuInsertHighscore"), false);
    ponerVisible($("#interrogacion"), false);
    ponerVisible($("#menuMinijuego"), false);
    ponerVisible($("#clock"), false);
    ponerVisible($("#10"), false);
    anchura = $("#clock").width();
    lvl2Unlock=false;
    lvl3Unlock=false;
    lock = false;
    
    // BOTONES MENUS DEL JUEGO 
    for(var i=0; i<16; i++){
            $("#b"+i).click(
            function(event) {
                    console.log(getVacio());
                    isAdyacent(event.target.id.substring(1), getVacio());
            })
    }
    $("#Bjugar").click( // funcionalidad de la pestaña jugar
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), true);
                
				})
    $("#Blvl1").click(
			function() {
                    currentMaze=1;
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl"), true);
                    //clock management
                    tIni=Date.now();
                    refreshIntervalId = setInterval( function() { timer(100000) }, 500 );
                    console.log("tini "+tIni);
                    pen=0;
                
                    ponerVisible($("#clock"), true);
                    play1(000, maze1);
                
				})
    $("#Blvl2").click(
            
			function() {
                if(lvl2Unlock==true){
                    currentMaze=2;
                    console.log("blvl2");
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl"), true);
                    tIni=Date.now();
                    refreshIntervalId = setInterval( function() { timer(150000) }, 500 );
                    console.log("tini "+tIni);
                    pen=0;
                    
                    
                    ponerVisible($("#clock"), true);
                    play1(000, maze2);
                }
				})
    $("#Blvl3").click(
            
			function() {
                if(lvl3Unlock==true){
                    currentMaze=3;
                    console.log("blvl3");
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), false);
                    ponerVisible($("#menulvl"), true);
                    tIni=Date.now();
                    refreshIntervalId = setInterval( function() { timer(150000) }, 500 );
                    console.log("tini "+tIni);
                    pen=0;
                    
                    
                    ponerVisible($("#clock"), true);
                    play1(000, maze3);
                }
				})
    $("#Binstrucciones").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuInstrucciones"), true);
				})
    
    $("#Bcontactar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuContactar"), true);
				})
  
    $("#BatrasIns").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuInstrucciones"), false);
				})
    $("#BatrasCon").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuContactar"), false);
				})
    $("#Bhighscores").click(
                function() {
                        getHighScores(1);
                        ponerVisible($("#menu"), false);
                        ponerVisible($("#menuHighscore"), true);
                    });
    
     $("#highscore1").click(
                function() {
                        getHighScores(1);
                    });
     $("#highscore2").click(
                function() {
                        getHighScores(2);
                    });
     $("#highscore3").click(
                function() {
                        getHighScores(3);
                    });
    $("#backHighscores").click(
                function() {
                    ponerVisible($("#menuHighscore"), false);
                     ponerVisible($("#menu"), true);
                    
                    });
    
    $("#Blvl2").hover(
            function(){
                        if(lvl2Unlock==true){
                            document.getElementById("Blvl2").style.backgroundImage="url(assets/Boton2Hover.png)";
                        }
                      },
            function(){
                        if(lvl2Unlock==true){
                                    document.getElementById("Blvl2").style.backgroundImage="url(assets/Boton2.png)";
                                }
            })
    $("#Blvl2").hover(
        function(){
                    if(lvl3Unlock==true){
                        document.getElementById("Blvl3").style.backgroundImage="url(assets/Boton3Hover.png)";
                    }
                  },
        function(){
                    if(lvl3Unlock==true){
                                document.getElementById("Blvl3").style.backgroundImage="url(assets/Boton3.png)";
                            }   
        })
    $("#backMenu").click(
			function() {
                if(lvl2Unlock==true){
                    
                    
                    //console.log("Cambio a desbloqueado");
                    document.getElementById("Blvl2").style.backgroundImage="url(assets/Boton2.png)";
                }
                    InsertHighscore();
                    ponerVisible($("#menulvl"), false);
                    ponerVisible($("#menuV"), false);
                
    
				})
    $("#backMenuD").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menulvl"), false);
                    ponerVisible($("#menuD"), false);
                
    
				})
    
    $("#ok").click(
                function() {
                    if($("#insertHighscore").val()!=""){ 
                    console.log(currentMaze+"->"+$("#insertHighscore").val()+"->"+currentTime);
                    checkHighScores(currentMaze,$("#insertHighscore").val(),currentTime);
                    ponerVisible($("#menuInsertHighscore"), false);
                    ponerVisible($("#menu"), true);
                    }
                    
                    });
    $("#bBack").click(
                function() {
                        if(back!="null"){
                            load(back);
                        }
                    });

    $("#bFront").click(
                function() {
                        if(front!="null"){
                            load(front);
                        }
                    });
    $("#bLeft").click(
                function() {
                        if(left!="null"){
                            load(left);
                        }
                    else
                        {
                            
                        }
                    });
    $("#bRight").click(
                function() {
                        if(right!="null"){
                            load(right);
                        }
                    });
    $("#bA").click(
            function() {
                    if(lock){
                        check("a");
                    }
                });
    $("#bB").click(
            function() {
                    if(lock){
                        check("b");
                    }
                });
    $("#bC").click(
            function() {
                    if(lock){
                        check("c");
                    }
                });
    
    $("#bD").click(
            function() {
                    if(lock){
                        check("d");
                    }
                });

    $("#interrogacion").click(
            function() {
                
                //document.getElementById('sound1').animate({volume: 0.5}, 500);
                document.getElementById('sound2').pause();
                document.getElementById('sound1').play();
                //fadein(document.getElementById('sound1'));
                if(maze.scene[intscene].img=="002Close.png"){
                    minijuego();
                }else{
                    locked();
                }
                });
    document.getElementById('sound1').addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    document.getElementById('sound2').addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    
})

//Inicializa el laberinto
function play1(scene, mazeSelect){

    document.getElementById("sound2").play();
    
    var parsed = JSON.parse(mazeSelect);
    maze = parsed.maze;
    var parsed2 = JSON.parse(questions1);
    quest = parsed2.xml.mazepr;
    
    load(scene);
    
}
function load(scene){
    
    ponerVisible($("#interrogacion"), false);

    intscene = parseInt(scene, 10);
    
    console.log(intscene);
    var obj = maze.scene[intscene];
    
    //console.log(obj.img);
    //console.log(obj.right);
    img = obj.img;
    left = obj.left;
    $("#fader").fadeOut(10);
    $("#fader").fadeIn(400);
    if(left=="null")
        {
        document.getElementById("bLeft").style.display = 'none';
        }else{
        document.getElementById("bLeft").style.display = 'block';
        console.log("left"+left);
        }
    front = obj.front;
        if(front=="null")
        {
        document.getElementById("bFront").style.display = 'none';
        }else{
        document.getElementById("bFront").style.display = 'block';
        console.log("front " + front);
        }
    right = obj.right;
        if(right=="null")
        {
        document.getElementById("bRight").style.display = 'none';
        }else{
        document.getElementById("bRight").style.display = 'block';
        console.log("right " + right);
        }
    
    back = obj.back;
        if(back=="null")
        {
        document.getElementById("bBack").style.display = 'none';
        }else{
        document.getElementById("bBack").style.display = 'block';
        console.log("back " + back);
        }
    asset = obj.asset;
        if(asset=="null")
        {
            
            ponerVisible($("#asset"), false);
        }else {
            ponerVisible($("#asset"), true);
            document.getElementById("asset").src = "assets/"+obj.asset+".png";
        }
    puzzle = obj.puzzle;
        if(puzzle=="null")
        {
            document.getElementById("background").src = "assets/"+img;
        }else if(maze.scene[intscene].img=="002Close.png"){
            document.getElementById("background").src = "assets/"+img;
            prepregunta();
        }else{
            puzzle = parseInt(puzzle, 10);
            if(quest.qw[puzzle].correcta!="null"){
                lock=true;
                document.getElementById("background").src = "assets/"+img;
                document.getElementById("background2").src = "assets/"+img;
                prepregunta();
                //locked();
            }else{
                console.log("Valla abierta");
                document.getElementById("background").src = "assets/"+obj.imgo;
            }
            
        }
    
}
function prepregunta(){
    //console.log("prepregunta");
    ponerVisible($("#interrogacion"), true);
    ponerVisible($("#bFront"), false);
}
function locked(){
    //console.log("bloqueado");
    ponerVisible($("#interrogacion"), false);
    ponerVisible($("#menulvl"), false);
    ponerVisible($("#menuLocked"), true);
    
    
    //se recuperan los assets de las preguntas para evitar que se repitan las X
    document.getElementById("bA").src = "assets/lvl1/A.png";
    document.getElementById("bB").src = "assets/lvl1/B.png";
    document.getElementById("bC").src = "assets/lvl1/C.png";
    document.getElementById("bD").src = "assets/lvl1/D.png";
    
    //recoge la pregunta del json
    //console.log(puzzle);
    var obj = quest.qw[puzzle];
    //imprime por consola
    //console.log("pregunta : "+ obj.pregunta);
    //console.log("a -> " + obj.a);
    //console.log("b -> " + obj.b);
    //console.log("c -> " + obj.c);
    //console.log("d -> " + obj.d);
    //imprime en textareas
    
    document.getElementById("pregunta").innerHTML = obj.pregunta;
    document.getElementById("resA").innerHTML = obj.a;
    document.getElementById("resB").innerHTML = obj.b;
    document.getElementById("resC").innerHTML = obj.c;
    document.getElementById("resD").innerHTML = obj.d;
    
}
function check(ans){
    console.log("Checkeando");
    if(quest.qw[puzzle].correcta == ans){
        //respuesta correcta
        console.log("Correcto")
        lock = false;
        quest.qw[puzzle].correcta="null";
        
        ponerVisible($("#menulvl"), true);
        ponerVisible($("#menuLocked"), false);
        
        if(maze.scene[intscene].front!="null"){
            ponerVisible($("#bFront"), true);
        }
        document.getElementById('sound2').play();
        document.getElementById('sound1').pause();
        ponerVisible($("#botones"), true);
        console.log("assets/"+maze.scene[intscene].imgo);
        document.getElementById("background").src = "assets/"+maze.scene[intscene].imgo;

    }else{
        //respuesta incorrecta
        document.getElementById("b"+ans.toUpperCase()).src = "assets/lvl1/x.png";
        
        //ponerVisible($("#botones"), true);
        ponerVisible($("#10"), true);
        $("#10").fadeOut(800);
        
        console.log("incorrecto");
        //posible penalizacion
        pen+=10000;
        //
    }
    
}
//Controladores de tiempo
function timer(timeFinal){
    var time = pen+Date.now() - tIni;
    currentTime = time;
    if(time>=timeFinal){
        derrota();
    }else{
        progress(timeFinal-time, timeFinal,$("#clock") );
        //console.log("tcurrent "+time);
    }
}
//Controlador de la barra de tiempo
function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * anchura / timetotal;
    //console.log("progressBarWidth "+progressBarWidth+" /timeleft " +timeleft+" /$element.width()"+anchura+"/timetotal "+ timetotal);
    $element.animate({ width: progressBarWidth }, 500);
    
};
//Minijuego
function move(id1, id2){
            console.log(id1+" - "+id2);
            console.log(document.getElementById("b15").src);
            
            if(document.getElementById("b"+id1).src.includes("vacio")){
                document.getElementById("b"+id1).src=document.getElementById("b"+id2).src;
                document.getElementById("b"+id2).src="assets/vacio.png";
            }
            else if(document.getElementById("b"+id2).src.includes("vacio")){
                document.getElementById("b"+id2).src=document.getElementById("b"+id1).src;
                document.getElementById("b"+id1).src="assets/vacio.png";
            }
            if(document.getElementById("b15").src.includes("llave.png")){
                victoria();
                resetMinijuego();
               }
}
function isAdyacent(id1, id2){
    console.log(id1+" %4 == "+id2+" %4 -> ");
    console.log(id1%4==id2%4);
    if(id1%4==id2%4){   //coincidencia vertical
        //
        console.log("Adyacentes 0");
        if(Math.floor((id1/4)+1)==Math.floor((id2/4))||Math.floor((id2/4)+1)==Math.floor((id1/4))){
            console.log("Adyacentes 1");
            move(id1, id2);
        }
    }
    console.log(id1+" /4 == "+id2+" /4 -> ");
    console.log(id1/4==id2/4);
    if(Math.floor(id1/4)==Math.floor(id2/4)){   //coincidencia horizontal
        //
        console.log("Adyacentes 2");
        if((id1%4)+1==(id2%4)||(id2%4)+1==(id1%4)){
            console.log("Adyacentes3");
            move(id1, id2);
        }
    }
}
function getVacio(){
     for(var i=0; i<16; i++){
        if(document.getElementById("b"+i).src.includes("vacio")){
            console.log("Vacio" + document.getElementById("b"+i).src);
            return i;
        }
     }
}
function minijuego(){
        ponerVisible($("#menuMinijuego"), true);
        ponerVisible($("#interrogacion"), false);
        ponerVisible($("#menulvl"), false);
        
}
function resetMinijuego(){
    document.getElementById("b0").src = "assets/llave.png";
    document.getElementById("b15").src = "assets/vacio.png";
    for(var i=1; i<15; i++){
                document.getElementById("b"+i).src = "assets/bloque.png";
    }
}
/* Victoria / Derrota */
function derrota(){
    document.getElementById('sound2').pause();
    document.getElementById('sound1').pause();
    ponerVisible($("#clock"), false);
    console.log("derrota");
    ponerVisible($("#menuMinijuego"), false);
    ponerVisible($("#menuLocked"), false);
    
    //ponerVisible($("#menuD"), true);
    $("#menulvl").fadeOut(1000);
    $("#menuD").fadeIn(1000);
    clearInterval(refreshIntervalId);
}
function victoria(){

    document.getElementById('sound2').pause();
    document.getElementById('sound1').pause();
    ponerVisible($("#clock"), false);
    console.log("Victoria");
    if(currentMaze==1){
        lvl2Unlock=true;
    }else if(currentMaze==2){
        lvl3Unlock=true;
    }
    ponerVisible($("#menuMinijuego"), false);
    ponerVisible($("#menulvl"), false);
    ponerVisible($("#menuV"), true);
    
    clearInterval(refreshIntervalId);
}
//Guardado De HighScores
function InsertHighscore(){
    ponerVisible($("#menuV"), false);
    ponerVisible($("#menuInsertHighscore"), true);
}
function checkHighScores(maze, nameIn, puntIn){    
    //Comprueba si ya existe en su memoria un archivo de maximas puntuaciones
    var puntuacion = {name:nameIn, punt:puntIn};
    if(localStorage.getItem("highscores" + maze)==null){
        var vector = [puntuacion];
        localStorage.setItem("highscores" + maze, JSON.stringify(vector));
    }else{
        //console.log(localStorage.getItem("highscores" + maze));
        var obj = JSON.parse(localStorage.getItem("highscores" + maze));
        obj.push(puntuacion);
        //console.log(JSON.stringify(obj));
        obj.sort(function(a, b){return a.punt - b.punt});
        obj = obj.slice(0, 9);
        localStorage.setItem("highscores" + maze, JSON.stringify(obj));
    }
}
function getHighScores(maze){
    var obj = JSON.parse(localStorage.getItem("highscores" + maze));
    var str = "";
    var i;
    var index=1;
    for(i in obj){
        str = str + (index) +  ") " + obj[i].name+ " - Tiempo -> " +obj[i].punt + "\n";
        index++;
    }
    console.log(str);
    $("#Highscore").val(str);
    //console.log(localStorage.getItem("highscores"));
    //Actualiza los datos de Maximas puntuaciones
}

var maze1 = '{ "maze": { "scene": [ { "-id": "000", "imgo": "null", "asset": "null", "back": "null", "front": "null", "left": "0038", "right": "0047", "img": "000BLR.png", "puzzle": "null" }, { "-id": "001", "imgo": "null", "asset": "helado", "back": "0038", "front": "null", "left": "0050", "right": "0039", "img": "000BLR.png", "puzzle": "null" }, { "-id": "002", "imgo": "null", "asset": "pelota", "back": "0047", "front": "null", "left": "0048", "right": "0041", "img": "000BLR.png", "puzzle": "null" }, { "-id": "003", "imgo": "null", "asset": "null", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "004", "imgo": "rana", "asset": "pesas", "back": "0050", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "005", "imgo": "null", "asset": "null", "back": "0039", "front": "null", "left": "006", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "006", "imgo": "null", "asset": "null", "back": "005", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "007", "imgo": "null", "asset": "piedras", "back": "0035", "front": "null", "left": "0042", "right": "008", "img": "001BLR.png", "puzzle": "null" }, { "-id": "008", "imgo": "null", "asset": "null", "back": "007", "front": "null", "left": "0011", "right": "0051", "img": "001BLR.png", "puzzle": "null" }, { "-id": "009", "imgo": "null", "asset": "null", "back": "0051", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0010", "imgo": "null", "asset": "null", "back": "0042", "front": "null", "left": "0040", "right": "0014", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0011", "imgo": "null", "asset": "farolillo", "back": "008", "front": "null", "left": "0013", "right": "0012", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0012", "imgo": "null", "asset": "null", "back": "0011", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0013", "imgo": "null", "asset": "null", "back": "0011", "front": "null", "left": "0015", "right": "null", "img": "001LL.png", "puzzle": "null" }, { "-id": "0014", "imgo": "null", "asset": "null", "back": "0010", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0015", "imgo": "null", "asset": "arana", "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0016", "imgo": "null", "asset": "null", "back": "0036", "front": "null", "left": "0046", "right": "0049", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0017", "imgo": "null", "asset": "null", "back": "0046", "front": "null", "left": "0028", "right": "0020", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0018", "imgo": "null", "asset": "null", "back": "0049", "front": "null", "left": "0019", "right": "0043", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0019", "imgo": "monedas", "asset": "caja", "back": "0018", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0020", "imgo": "null", "asset": "null", "back": "0017", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0021", "imgo": "null", "asset": "null", "back": "0018", "front": "null", "left": "0037", "right": "0025", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0022", "imgo": "null", "asset": "null", "back": "0037", "front": "null", "left": "0023", "right": "0024", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0023", "imgo": "null", "asset": "null", "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0024", "imgo": "null", "back": "0022", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0025", "imgo": "null", "asset": "aranazos", "back": "0021", "front": "null", "left": "0026", "right": "0027", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0026", "imgo": "null", "asset": "raton", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0027", "imgo": "null", "asset": "null", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0028", "imgo": "null", "asset": "null", "back": "0017", "front": "null", "left": "0029", "right": "0045", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0029", "imgo": "null", "asset": "null", "back": "0028", "front": "null", "left": "0031", "right": "0032", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0030", "imgo": "null", "asset": "farolillo", "back": "0045", "front": "null", "left": "0033", "right": "0034", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0031", "imgo": "null", "asset": "null", "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0032", "imgo": "null", "asset": "null", "back": "0029", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0033", "imgo": "null", "asset": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0034", "imgo": "null", "asset": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0035", "asset": "null", "back": "0048", "front": "007", "left": "null", "right": "null", "img": "000Close.png", "imgo": "000Open.png", "puzzle": "001" }, { "-id": "0036", "asset": "null", "back": "0040", "front": "0016", "left": "null", "right": "null", "img": "001Close.png", "imgo": "001Open.png", "puzzle": "002" }, { "-id": "0037", "asset": "null", "back": "0021", "front": "0022", "left": "null", "right": "null", "img": "002Close.png", "imgo": "002Open.png", "puzzle": "003" }, { "-id": "0038", "imgo": "null", "asset": "aranazos", "back": "000", "front": "null", "left": "001", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "0039", "imgo": "null", "asset": "pizza", "back": "001", "front": "null", "left": "005", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "0040", "imgo": "null", "asset": "null", "back": "0010", "front": "null", "left": "null", "right": "0036", "img": "001RR.png", "puzzle": "null" }, { "-id": "0041", "imgo": "null", "asset": "null", "back": "002", "front": "003", "left": "null", "right": "null", "img": "000FF.png", "puzzle": "null" }, { "-id": "0042", "imgo": "null", "asset": "pesas", "back": "007", "front": "0010", "left": "null", "right": "null", "img": "001FF.png", "puzzle": "null" }, { "-id": "0043", "imgo": "null", "asset": "null", "back": "0018", "front": "0021", "left": "null", "right": "null", "img": "002FF.png", "puzzle": "null" }, { "-id": "0044" }, { "-id": "0045", "imgo": "null", "asset": "caja", "back": "0028", "front": "null", "left": "null", "right": "0030", "img": "002RR.png", "puzzle": "null" }, { "-id": "0046", "imgo": "null", "asset": "null", "back": "0016", "front": "null", "left": "0017", "right": "null", "img": "002LL.png", "puzzle": "null" }, { "-id": "0047", "imgo": "null", "asset": "null", "back": "000", "front": "null", "left": "002", "right": "null", "img": "000LL.png", "puzzle": "null" }, { "-id": "0048", "imgo": "null", "asset": "null", "back": "002", "front": "null", "left": "null", "right": "0035", "img": "000RR.png", "puzzle": "null" }, { "-id": "0049", "imgo": "null", "asset": "null", "back": "0016", "front": "0018", "left": "null", "right": "null", "img": "002FF.png", "puzzle": "null" }, { "-id": "0050", "imgo": "null", "asset": "null", "back": "001", "front": "004", "left": "null", "right": "null", "img": "000FF.png", "puzzle": "null" }, { "-id": "0051", "imgo": "null", "asset": "null", "back": "008", "front": "null", "left": "009", "right": "null", "img": "001LL.png", "puzzle": "null" } ] } }';


var maze2='{ "maze": { "scene": [ { "-id": "000", "asset": "null", "back": "null", "front": "null", "left": "008", "right": "0060", "img": "000BLR.png", "puzzle": "null" }, { "-id": "001", "asset": "null", "back": "0060", "front": "null", "left": "0044", "right": "0061", "img": "000BLR.png", "puzzle": "null" }, { "-id": "002" }, { "-id": "003", "asset": "caja", "back": "0061", "front": "0047", "left": "0062", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "004", "asset": "null", "back": "0062", "front": "0038", "left": "0063", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "005", "asset": "null", "back": "0063", "front": "0036", "left": "0064", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "006", "asset": "pala", "back": "0064", "front": "null", "left": "0037", "right": "0065", "img": "000BLR.png", "puzzle": "null" }, { "-id": "007", "asset": "pelota", "back": "0064", "front": "0010", "left": "null", "right": "0050", "img": "000BFR.png", "puzzle": "null" }, { "-id": "008", "asset": "null", "back": "000", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "009" }, { "-id": "0010", "asset": "null", "back": "007", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0011", "asset": "null", "back": "0050", "front": "null", "left": "0052", "right": "0054", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0012", "asset": "farolillo", "back": "0053", "front": "0067", "left": "null", "right": "0039", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0013", "asset": "null", "back": "0052", "front": "0066", "left": "0045", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0014", "asset": "null", "back": "0066", "front": "0048", "left": "null", "right": "0053", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0015", "asset": "null", "back": "0054", "front": "0016", "left": "0046", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0016", "asset": "null", "back": "0015", "front": "0068", "left": "null", "right": "0040", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0017", "asset": "pelota2", "back": "0067", "front": "null", "left": "0069", "right": "0019", "img": "001BLR.png", "puzzle": "null" }, { "-id": "0018" }, { "-id": "0019", "asset": "helado", "back": "0017", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0020", "asset": "piedras", "back": "0069", "front": "0051", "left": "0041", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0021", "asset": "null", "back": "0051", "front": "null", "left": "0056", "right": "0055", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0022", "asset": "null", "back": "0055", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0023", "asset": "null", "back": "0070", "front": "0071", "left": "null", "right": "0024", "img": "002BFR.png", "puzzle": "null" }, { "-id": "0024", "asset": "null", "back": "0023", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0025", "asset": "pizza", "back": "0056", "front": "null", "left": "0059", "right": "0026", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0026", "asset": "gato", "back": "0025", "front": "0070", "left": "0042", "right": "null", "img": "002BFL.png", "puzzle": "null" }, { "-id": "0027", "asset": "null", "back": "0071", "front": "0072", "left": "0029", "right": "0057", "img": "002BFLR.png", "puzzle": "null" }, { "-id": "0028", "asset": "null", "back": "0057", "front": "null", "left": "0030", "right": "0031", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0029", "asset": "aranazo", "back": "0027", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0030", "asset": "null", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0031", "asset": "monedas", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0032", "asset": "null", "back": "0072", "front": "null", "left": "0058", "right": "0034", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0033" }, { "-id": "0034", "asset": "null", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0035", "asset": "null", "back": "0058", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0036", "asset": "arana", "back": "005", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0037", "asset": "pesas", "back": "006", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0038", "asset": "null", "back": "004", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0039", "asset": "null", "back": "0012", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0040", "asset": "null", "back": "0016", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0041", "asset": "null", "back": "0020", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0042", "asset": "null", "back": "0026", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0043", "asset": "null", "back": "0026", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0044", "asset": "null", "back": "001", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0045", "asset": "null", "back": "0013", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0046", "asset": "null", "back": "0015", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0047", "asset": "pelota", "back": "003", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0048", "asset": "null", "back": "0014", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0049", "asset": "null", "back": "0039", "front": "null", "left": "null", "right": "0012", "img": "001B.png", "puzzle": "null" }, { "-id": "0050", "asset": "null", "back": "007", "front": "0011", "left": "null", "right": "null", "img": "000Close.png", "imgo": "000Open.png", "puzzle": "000" }, { "-id": "0051", "asset": "null", "back": "0020", "front": "0021", "left": "null", "right": "null", "img": "001Close.png", "imgo": "001Open.png", "puzzle": "004" }, { "-id": "0052", "asset": "null", "back": "0011", "front": "0013", "left": "null", "right": "null", "img": "001Close2.png", "imgo": "001Open2.png", "puzzle": "006" }, { "-id": "0053", "asset": "null", "back": "0014", "front": "0012", "left": "null", "right": "null", "img": "001Close2.png", "imgo": "001Open2.png", "puzzle": "007" }, { "-id": "0054", "asset": "null", "back": "0011", "front": "0015", "left": "null", "right": "null", "img": "001Close2.png", "imgo": "001Open2.png", "puzzle": "008" }, { "-id": "0055", "asset": "null", "back": "0021", "front": "0022", "left": "null", "right": "null", "img": "002Close2.png", "imgo": "002Open2.png", "puzzle": "009" }, { "-id": "0056", "asset": "null", "back": "0021", "front": "0025", "left": "null", "right": "null", "img": "002Close2.png", "imgo": "002Open2.png", "puzzle": "0010" }, { "-id": "0057", "asset": "null", "back": "0027", "front": "0028", "left": "null", "right": "null", "img": "002Close2.png", "imgo": "002Open2.png", "puzzle": "0011" }, { "-id": "0058", "asset": "null", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "002Close.png", "imgo": "002Open.png", "puzzle": "005" }, { "-id": "0059", "asset": "null", "back": "0025", "front": "null", "left": "null", "right": "null", "img": "002B.png", "imgo": "null", "puzzle": "null" }, { "-id": "0060", "asset": "null", "back": "000", "front": "null", "left": "001", "right": "null", "img": "000LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0061", "asset": "null", "back": "001", "front": "003", "left": "null", "right": "null", "img": "000FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0062", "asset": "null", "back": "003", "front": "null", "left": "null", "right": "004", "img": "000RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0063", "asset": "null", "back": "004", "front": "null", "left": "null", "right": "005", "img": "000RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0064", "asset": "null", "back": "005", "front": "null", "left": "006", "right": "null", "img": "000LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0065", "asset": "null", "back": "006", "front": "007", "left": "null", "right": "null", "img": "000FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0066", "asset": "null", "back": "0013", "front": "null", "left": "null", "right": "0014", "img": "001RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0067", "asset": "null", "back": "0012", "front": "null", "left": "0017", "right": "null", "img": "001LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0068", "asset": "null", "back": "0016", "front": "null", "left": "0017", "right": "null", "img": "001LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0069", "asset": "null", "back": "0017", "front": "0020", "left": "null", "right": "null", "img": "001FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0070", "asset": "null", "back": "0026", "front": "null", "left": "null", "right": "0023", "img": "002RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0071", "asset": "null", "back": "0023", "front": "null", "left": "null", "right": "0027", "img": "002RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0072", "asset": "null", "back": "0027", "front": "0032", "left": "null", "right": "null", "img": "002FF.png", "imgo": "null", "puzzle": "null" } ] } }';

var maze3='{ "maze": { "scene": [ { "-id": "000", "asset": "null", "back": "null", "front": "0065", "left": "0069", "right": "0010", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "001", "asset": "pesas", "back": "0069", "front": "003", "left": "002", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "002", "asset": "helado", "back": "001", "front": "006", "left": "0052", "right": "null", "img": "000BFL.png", "puzzle": "null" }, { "-id": "003", "asset": "monedas", "back": "001", "front": "null", "left": "005", "right": "004", "img": "000BLR.png", "puzzle": "null" }, { "-id": "004", "asset": "null", "back": "003", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "005", "asset": "null", "back": "003", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "006", "asset": "gato", "back": "002", "front": "0059", "left": "007", "right": "0058", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "007", "asset": "null", "back": "006", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "008", "asset": "null", "back": "0059", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "009", "asset": "null", "back": "0058", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0010", "asset": "pizza", "back": "000", "front": "null", "left": "0060", "right": "0012", "img": "000BLR.png", "puzzle": "null" }, { "-id": "0011", "asset": "aranazo", "back": "0060", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0012", "asset": "null", "back": "0010", "front": "null", "left": "0013", "right": "0014", "img": "000BLR.png", "puzzle": "null" }, { "-id": "0013", "asset": "null", "back": "0012", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0014", "asset": "null", "back": "0012", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0015", "asset": "null", "back": "0065", "front": "0016", "left": "0055", "right": "0066", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "0016", "asset": "piedras", "back": "0015", "front": "null", "left": "0053", "right": "0054", "img": "000BLR.png", "puzzle": "null" }, { "-id": "0017", "asset": "null", "back": "0055", "front": "0030", "left": "0067", "right": "0062", "img": "001BFLR.png", "puzzle": "null" }, { "-id": "0018", "asset": "helado", "back": "0066", "front": "0028", "left": "0019", "right": "0061", "img": "000BFLR.png", "puzzle": "null" }, { "-id": "0019", "asset": "null", "back": "0018", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0020", "asset": "pelota", "back": "0061", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0021", "asset": "null", "back": "0028", "front": "null", "left": "0022", "right": "0023", "img": "000BLF.png", "puzzle": "null" }, { "-id": "0022", "asset": "null", "back": "0021", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0023", "asset": "null", "back": "0021", "front": "null", "left": "0024", "right": "0025", "img": "000BLF.png", "puzzle": "null" }, { "-id": "0024", "asset": "pala", "back": "0023", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0025", "asset": "null", "back": "0023", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0026", "asset": "raton", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0027", "asset": "null", "back": "0028", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0028", "asset": "null", "back": "0018", "front": "0026", "left": "null", "right": "0027", "img": "000BFR.png", "puzzle": "null" }, { "-id": "0029", "back": "0062", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0030", "asset": "caja", "back": "0017", "front": "0032", "left": "0031", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0031", "asset": "null", "back": "0030", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0032", "asset": "null", "back": "0030", "front": "0033", "left": "0034", "right": "null", "img": "001BFL.png", "puzzle": "null" }, { "-id": "0033", "asset": "null", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0034", "asset": "null", "back": "0032", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0035", "asset": "pelota2", "back": "0067", "front": "0056", "left": "null", "right": "0036", "img": "001BFR.png", "puzzle": "null" }, { "-id": "0036", "asset": "arana", "back": "0035", "front": "0038", "left": "0039", "right": "0063", "img": "001BFLR.png", "puzzle": "null" }, { "-id": "0037", "asset": "null", "back": "0063", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0038", "asset": "null", "back": "0036", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0039", "asset": "farolillo", "back": "0036", "front": "null", "left": "null", "right": "null", "img": "001B.png", "puzzle": "null" }, { "-id": "0040", "asset": "null", "back": "0056", "front": "null", "left": "0042", "right": "0068", "img": "002BLR.png", "puzzle": "null" }, { "-id": "0041", "asset": "pizza", "back": "0040", "front": "0068", "left": "0044", "right": "0043", "img": "002BFLR.png", "puzzle": "null" }, { "-id": "0042", "asset": "null", "back": "0040", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0043", "asset": "helado", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0044", "asset": "null", "back": "0041", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0045", "asset": "null", "back": "0068", "front": "0057", "left": "0064", "right": "0046", "img": "002BFLR.png", "puzzle": "null" }, { "-id": "0046", "asset": "null", "back": "0045", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0047", "asset": "null", "back": "0064", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0048", "asset": "null", "back": "0057", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0049", "asset": "null", "back": "0048", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0050", "asset": "null", "back": "0048", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0051", "asset": "null", "back": "0048", "front": "null", "left": "null", "right": "null", "img": "002B.png", "puzzle": "null" }, { "-id": "0052", "asset": "null", "back": "002", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0053", "asset": "null", "back": "0016", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0054", "asset": "null", "back": "0016", "front": "null", "left": "null", "right": "null", "img": "000B.png", "puzzle": "null" }, { "-id": "0055", "asset": "null", "back": "0015", "front": "0017", "left": "null", "right": "null", "img": "000Close.png", "imgo": "000Open.png", "puzzle": "0021" }, { "-id": "0056", "asset": "null", "back": "0035", "front": "0040", "left": "null", "right": "null", "img": "001Close.png", "imgo": "001Open.png", "puzzle": "0020" }, { "-id": "0057", "asset": "null", "back": "0045", "front": "null", "left": "null", "right": "null", "img": "002Close.png", "imgo": "002Open.png", "puzzle": "0012" }, { "-id": "0058", "asset": "null", "back": "006", "front": "009", "left": "null", "right": "null", "img": "000Close2.png", "imgo": "000Open2.png", "puzzle": "0013" }, { "-id": "0059", "asset": "null", "back": "006", "front": "008", "left": "null", "right": "null", "img": "000Close2.png", "imgo": "000Open2.png", "puzzle": "0014" }, { "-id": "0060", "asset": "null", "back": "0010", "front": "0011", "left": "null", "right": "null", "img": "000Close2.png", "imgo": "000Open2.png", "puzzle": "0015" }, { "-id": "0061", "asset": "null", "back": "0018", "front": "0020", "left": "null", "right": "null", "img": "000Close2.png", "imgo": "000Open2.png", "puzzle": "0016" }, { "-id": "0062", "asset": "null", "back": "0017", "front": "0029", "left": "null", "right": "null", "img": "001Close2.png", "imgo": "001Open2.png", "puzzle": "0017" }, { "-id": "0063", "asset": "null", "back": "0036", "front": "0037", "left": "null", "right": "null", "img": "001Close2.png", "imgo": "001Open2.png", "puzzle": "0018" }, { "-id": "0064", "asset": "null", "back": "0045", "front": "0047", "left": "null", "right": "null", "img": "002Close2.png", "imgo": "002Open2.png", "puzzle": "0019" }, { "-id": "0065", "asset": "null", "back": "000", "front": "null", "left": "null", "right": "0015", "img": "000RR.png", "imgo": "null", "puzzle": "null" }, { "-id": "0066", "asset": "null", "back": "0015", "front": "null", "left": "0018", "right": "null", "img": "000LL.png", "imgo": "null", "puzzle": "null" }, { "-id": "0067", "asset": "null", "back": "0017", "front": "0035", "left": "null", "right": "null", "img": "001FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0068", "asset": "null", "back": "0040", "front": "0045", "left": "null", "right": "null", "img": "002FF.png", "imgo": "null", "puzzle": "null" }, { "-id": "0069", "asset": "null", "back": "000", "front": "null", "left": "001", "right": "null", "img": "000LL.png", "imgo": "null", "puzzle": "null" } ] } }';


var questions1 = '{ "xml": { "mazepr": { "qw": [ { "pregunta": "¿Cuántas patas tiene un insecto?", "a": "4", "b": "8", "c": "6", "d": "depende del insecto", "correcta": "c" }, { "pregunta": "¿Cuál de estos animales es un mamífero?", "a": "tiburón", "b": "delfín", "c": "manta", "d": "caballito de mar", "correcta": "b" }, { "pregunta": "¿Qué parte de las matemáticas se encarga del estudio de los numeros y operaciones con estos?", "a": "aritmética", "b": "trigonometría", "c": "álegra", "d": "geometría", "correcta": "a" }, { "pregunta": "¿Cuál fue la primera raza humana?", "a": "homo-sapiens-sapiens", "b": "homo-sapiens", "c": "namlu u", "d": "homo-erectus", "correcta": "c" }, { "pregunta": "Cuál fue el primer videojuego de la historia?", "a": "Mario-Bros", "b": "OXO", "c": "Pong", "d": "KHY", "correcta": "c" }, { "pregunta": "¿Qué año pertenece al año del dragón en China?", "a": "1999", "b": "2000", "c": "2001", "d": "2002", "correcta": "b" }, { "pregunta": "¿En qué año se celebró la primera copa de europa de fúbol?", "a": "1955/1956", "b": "1945/1946", "c": "1845/1846", "d": "1855/1856", "correcta": "a" }, { "pregunta": "¿Cuál fue la primera consola de la historia?", "a": "Magnavox Odyssey", "b": "NES", "c": "Atari Pong", "d": "TRC-1", "correcta": "a" }, { "pregunta": "¿Cuándo fue la fecha de la primera guerra mundial?", "a": "1918", "b": "1917", "c": "1915", "d": "1914", "correcta": "d" }, { "pregunta": "¿Cuántos Mister Olympia tiene Arnold Schwarzenegger?", "a": "7", "b": "16", "c": "5", "d": "2", "correcta": "a" }, { "pregunta": "¿Cómo se llamaba el perro de Asterix y Obelix?", "a": "Milú", "b": "Niebla", "c": "Idefix", "d": "Nevado", "correcta": "c" }, { "pregunta": "¿Quién fue la primera ganadora de operación triunfo?", "a": "Chenoa", "b": "Rosa López", "c": "David Bisbal", "d": "Bustamante", "correcta": "b" }, { "pregunta": "¿En qué año se inaguró el metro de Madrid?", "a": "1919", "b": "1818", "c": "1920", "d": "1819", "correcta": "a" }, { "pregunta": "¿En qué año se fundó ferrari?", "a": "1909", "b": "1931", "c": "1963", "d": "1939", "correcta": "d" }, { "pregunta": "¿Qué famoso compositor se quedo sordo?", "a": "Beethoven", "b": "Mozart", "c": "Vivaldi", "d": "Chaikovski", "correcta": "a" }, { "pregunta": "¿Cuál de las siguientes marcas es estadounidense?", "a": "Fortuna", "b": "Malboro", "c": "Ducados", "d": "Nobel", "correcta": "b" }, { "pregunta": "¿Cuál de las siguientes consolas fue la más vendida?", "a": "Nintendo DS lite", "b": "PS2", "c": "Game boy advance", "d": "Wii", "correcta": "b" }, { "pregunta": "¿Cuál fue el primer presidente de España?", "a": "Zapatero", "b": "Aznar", "c": "Adolfo Suarez", "d": "Rajoy", "correcta": "c" }, { "pregunta": "¿En qué se mide la intensidad de corriente?", "a": "Amperios", "b": "Voltios", "c": "Grados", "d": "candelas", "correcta": "a" }, { "pregunta": "¿Cuántas champions tiene el Arsenal FC?", "a": "0", "b": "1", "c": "3", "d": "4", "correcta": "a" }, { "pregunta": "¿Cuál es el animal más fuerte del mundo?", "a": "Hormiga", "b": "Gorila", "c": "Tigre", "d": "Escarabajo Rinoceronte", "correcta": "d" }, { "pregunta": "¿Qué es la capoira?", "a": "Una comida", "b": "Una provincia", "c": "Un baile", "d": "Un arte marcial", "correcta": "d" }, { "pregunta": "¿Cuál es el video mas visto en youtube?", "a": "Manerasde molestar a tu vecino (Rubius)", "b": "Mejores record Guinnes", "c": "Buleria", "d": "Ganma Style", "correcta": "d" } ] } } }';

