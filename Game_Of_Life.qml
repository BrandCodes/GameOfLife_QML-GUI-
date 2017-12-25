import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Window 2.2
import "Code.js" as Logic

Window {
    visible: true
    width: 500; height: 425
    Rectangle {
        width: 500; height: 425; color: "black"
        Grid {
            id: campo
            x: 10; y: 10
            rows: 30; columns: 30;  spacing: 2;
            Repeater {
                id: rep
                model: parent.rows * parent.columns
                Rectangle {
                    id: cell
                    width: 11; height: 11
                    border.color: "blue"
                    color: "blue"
                    property int j : Logic.getJ()
                    property int i : Logic.getI()
                    property bool viva: false
                    property bool nextGen: false
                    function cambiarColor() {
                        if (viva){   cell.color = "#00FF00"   }
                        else{   cell.color = "blue"    }
                    }
                    MouseArea {
                        anchors.fill: parent
                        //hoverEnabled: true
                        onClicked:  {
                            if (clicked) {
                                if(!viva){
                                    viva = !viva
                                    cambiarColor()
                                    //Logic.fillin(i,j)
                                    //Logic.imprimir()
                                } else{
                                    viva = false
                                    cambiarColor()
                                    //Logic.empty(i,j)
                                    //Logic.imprimir()
                                }
                            }
                        }
                    }
                }
            }
        }
        Timer {
            id: secuencia
            interval: 100;  running: false; repeat: true
            onTriggered:  {
                Logic.proxGen(campo); //Logic.proxGen(field)
                //Logic.correr()
            }
        }
        Button{
            x:420; y:70
            text: "Run"
            onClicked: {    secuencia.running = true  }
        }
        Button{
            x:420; y:100
            text: "Stop"
            onClicked: {    secuencia.running = false  }
        }
        Button{
            x:420; y:130
            text: "Next"
            onClicked: {
                Logic.proxGen(campo)
                //Logic.correr()
            }
        }
        Button{
            x:420; y:160
            text: "Clear"
            onClicked: {
                //Logic.limpiando(campo)
                //Logic.rellena()
                //Logic.imprimir()
                var contador = 0;
                for(var i = 0; i < campo.rows; i++)
                    for(var j = 0; j < campo.columns; j++){
                        rep.itemAt(contador).viva = false;
                        rep.itemAt(contador++).cambiarColor();
                    }
            }
        }
        Button{
            x:420; y:190
            text: "Close Game"
            onClicked: {   Qt.quit()   }
        }
    }//Fin Rectangle
}//Fin Window
