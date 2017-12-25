function proxGen(campo){
    asignarValoresProxGen(campo);
    dibujarProxGen(campo);  }

function asignarValoresProxGen(campo){
    for (var i = 0; i < campo.rows; i++) {
        for (var j = 0; j < campo.columns; j++) {
            var cell = getChild(campo, i, j);
            var vecinos = vecinosVivos(i, j, campo);
            cell.nextGen = vivira(vecinos, cell.viva);
        }
    }
}

function dibujarProxGen(campo){
    for (var i = 0; i < campo.rows; i++) {
        for (var j = 0; j < campo.columns; j++) {
            var cell = getChild(campo, i, j);
            cell.viva = cell.nextGen;
            cambiarColor(cell);
        }
    }
}

function cambiarColor(cell){
    if (cell.viva){  cell.color = "#00FF00"; /*"cornflowerblue" */  }
    else{   cell.color = "blue";    }
}

function vecinosVivos(r, c, campo){
    var vecinos = 0;
    for (var i = r - 1; i <= r + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if ((i == r && j == c) || !esVecinoEnLimite(campo, i, j) )
                continue;
            var cell = getChild(campo, i, j);
            if (cell != null && cell.viva){ vecinos++; }
        }
    }
    return vecinos;
}

function esVecinoEnLimite(campo, vecinoFila, vecinoColumna)    {
    if (vecinoColumna < 0 || vecinoColumna >= campo.columns || vecinoFila < 0 || vecinoFila >= campo.rows){ return false;   }
    else{   return true;    }
}

function vivira(vecinosVivos, viva){
    if (viva && vecinosVivos < 2)
        return false;
    if (viva && (vecinosVivos == 2 || vecinosVivos == 3))
        return true;
    if (viva && vecinosVivos > 3)
        return false;
    if (!viva && vecinosVivos == 3)
        return true;

    return false;
}

function getChild(campo, fila, columna){
    var z = fila * campo.rows + columna;
    return campo.children[z];
}
/* --- consola -- */
var n_Fil = 30;
var n_Col = 30;
var matriz = new Array(n_Fil);
var matrizX = new Array(n_Fil);
var i = 0;
var j = 0;
var indexi = 0;
var indexj = 0;
function crearM(){
    for (i = 0; i < n_Fil; i++){
        matriz[i]=new Array(n_Col);
        matrizX[i]= new Array(n_Col);
    }
}
function rellena(){
    for(i = 0; i < n_Fil; i++){
        for(j = 0; j < n_Col; j++){
            matriz[i][j] = 0;
        }
    }
}
function fillin(p_X, p_Y){    matriz[p_X][p_Y]=1;   }
function empty(p_X, p_Y){    matriz[p_X][p_Y]=0;   }
function getI(){    return indexi;  }
function getJ(){
    if(indexj==n_Col)    {
        indexi++;
        indexj=0;
    }
    return indexj++;    }

function imprimir(){
    for ( i=0; i<n_Fil; i++)	{
        for ( j=0; j <matriz[i].length; j++)	{
        }
        console.log( matriz[i] + " ");
    }
    console.log("__________");  }

function copiar (origen, destino) {
    for ( i = 0; i < n_Fil; i++) {
         for ( j = 0; j < n_Col; j++) {
              destino[i][j] = origen[i][j];
         }
    }
}
function algoritmo(){
    for ( i = 0; i < n_Fil; i++) {
        for ( j = 0; j < n_Col; j++) {
            var casillas_on = 0;
            if ( (i-1>0) && (j-1>0) && (matriz[i-1][j-1]==1) ) {    casillas_on++;  }
            if ( (j-1>0) && (matriz[i][j-1]==1) ) {     casillas_on++;  }
            if ( (i+1<n_Fil) && (j-1>0)&& matriz[i+1][j-1]==1 ) {   casillas_on++;  }
            if ( (i-1>0) && (matriz[i-1][j]==1) ) {     casillas_on++;  }
            if ( (i+1<n_Fil) && (matriz[i+1][j]==1) ) {     casillas_on++;  }
            if ( (i-1>0) && (j+1<n_Col) && (matriz[i-1][j+1]==1) ) {    casillas_on++;  }
            if ( (j+1<n_Col) && (matriz[i][j+1]==1) ) {     casillas_on++;  }
            if ( (i+1<n_Fil) && (j+1<n_Col) && (matriz[i+1][j+1]==1) ) {    casillas_on++;  }
            // Condiciones de vida.
            if ( (matriz[i][j]==1 && casillas_on==2)|| (matriz[i][j]==1 && casillas_on==3) ){
                    matrizX[i][j]=1;        // sigue viva
            }else if(matriz[i][j]==0 && casillas_on==3){
                    matrizX[i][j]=1;        //nace
            }else{
                matrizX[i][j]=0;            // muere o permanece muerta
            }
        }
    }
    copiar (matrizX, matriz);
    imprimir();    }

function correr(){  algoritmo(matriz,matrizX);  }

crearM()
rellena()
