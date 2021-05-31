<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";

header('Content-Type: application/json');

//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$IdCliente=$_GET['IdCliente'];
$X = array();//duraccion del trabajo
$Y = array();//calificacion del trabajo
$X_N = array();//normalizados
$Y_N = array();//normalizados
$Etiquetas = array(); //los id de los trabajadores
$Distancias = array();
$x_EntradaN=0;
$y_EntradaN=0;
$Etiqueta_Entrado;

function Llenado(){//traer todos los datos de las propuestas de la base de datos
    global $cone,$X,$Y,$Etiquetas;
    $sql = "SELECT Propuesta.IdTrabajador,Trabajador.CalificacionGlobal, DATEDIFF(Propuesta.FechaFin, Propuesta.FechaAlta) as Duracion from Propuesta INNER JOIN Trabajador ON Propuesta.IdTrabajador = Trabajador.Id WHERE Propuesta.Estatus = 3";
    $resultado=mysqli_query($cone,$sql);
    if(mysqli_num_rows($resultado)>0){
        while($row = mysqli_fetch_assoc($resultado)){
            $X[] = $row['Duracion'];
            $Y[] = $row['CalificacionGlobal'];
            $Etiquetas[] = $row['IdTrabajador'];
        }
    }
    Normalizar();
}



function Normalizar(){//a cada atributo le restamos el valor mínimo que puede tener ese atributo y lo dividimos por la diferencia entre el valor máximo y mínimo que puede tener ese atributo.
    global $X,$Y,$X_N,$Y_N;//tarernos las variables globales 
    $Max_X = max($X);//valor maximo de x
    $Min_X = min($X);//valor minimo de x
    $Max_Y = max($Y);//valor maximo de y
    $Min_Y = min($Y);//valor minimo de y
    $Tama = count($X);//tamaño del arreglo
    for($i = 0; $i< $Tama; ++$i){
        $X_N[$i] = ($X[$i] - $Min_X)/($Max_X - $Min_X);//normalizamos x
        $Y_N[$i] = ($Y[$i] - $Min_Y)/($Max_Y - $Min_Y);//normalizamos y
    }
    
    SeleccionDatoEntrada();
} 

function SeleccionDatoEntrada(){//recuperamos el ultimo trabajo del ususario
    global $cone,$IdCliente,$X,$Y,$x_EntradaN,$y_EntradaN,$Etiqueta_Entrado;
    $sql = "SELECT Propuesta.IdTrabajador,Trabajador.CalificacionGlobal, DATEDIFF(Propuesta.FechaFin, Propuesta.FechaAlta) as Duracion, Propuesta.FechaFin from Propuesta INNER JOIN Trabajador ON Propuesta.IdTrabajador = Trabajador.Id WHERE Propuesta.IdUsuario = '$IdCliente' AND Propuesta.Estatus = 3 ORDER BY Propuesta.FechaFin DESC";
    $resultado=mysqli_query($cone,$sql);
    if(mysqli_num_rows($resultado)>0){
        $row = mysqli_fetch_assoc($resultado);
        $x_Entrada = $row['Duracion'];
        $y_Entrada = $row['CalificacionGlobal'];
        $Etiqueta_Entrado = $row['IdTrabajador'];
    }
    else{
        $sql = "SELECT Propuesta.IdTrabajador,Trabajador.CalificacionGlobal, DATEDIFF(Propuesta.FechaFin, Propuesta.FechaAlta) as Duracion, Propuesta.FechaFin from Propuesta INNER JOIN Trabajador ON Propuesta.IdTrabajador = Trabajador.Id WHERE Propuesta.Estatus = 3 ORDER BY Propuesta.FechaFin DESC";
        $resultado=mysqli_query($cone,$sql);
        if(mysqli_num_rows($resultado)>0){
            $row = mysqli_fetch_assoc($resultado);
            $x_Entrada = $row['Duracion'];
            $y_Entrada = $row['CalificacionGlobal'];
            $Etiqueta_Entrado = $row['IdTrabajador'];
        }
    }
    $Max_X = max($X);//valor maximo de x
    $Min_X = min($X);//valor minimo de x
    $Max_Y = max($Y);//valor maximo de y
    $Min_Y = min($Y);//valor minimo de y
    $x_EntradaN = ($x_Entrada - $Min_X)/($Max_X - $Min_X);//normalizamos x
    $y_EntradaN = ($y_Entrada - $Min_Y)/($Max_Y - $Min_Y);//normalizamos y
    
    DistanciaEuclidea();
}

function DistanciaEuclidea(){ // Genera una nueva lista con las distancias
    global $X_N,$Y_N,$Y_N,$Distancias,$x_EntradaN,$y_EntradaN;
    $Tama = count($X_N);
    for($i = 0; $i< $Tama; ++$i){
        $Distancias[$i] = sqrt(pow(($X_N[$i]-$x_EntradaN),2)+ pow(($Y_N[$i]-$y_EntradaN),2));
    }
    Regresar();
    
}


function Regresar(){ // Regresa los 4 vecinos más cercanos
    global $cone,$X,$Etiquetas,$Distancias;
    //$Tama = count($X);
    //$chico = 99999;
    //$Encontrados = 0;
    $Dist = array();
    //$DAus = $Distancias;
    $resultado = array();
    /*while($Encontrados != 4){
        for($i = 0; $i< $Tama; ++$i){
            var_dump($DAus[$i]);
            if($DAus[$i] <= $chico){
                $chico = $DAus[$i];
                //echo $chico . "  ";
                $resultado[] = $Etiquetas[$i];
                $DAus[$i] = 999;
            }  
        }
        $Encontrados = $Encontrados+1;
        $chico = 2;
    }*/

    // Metodo burbuja, donde pone en una lista los valores con menor peso
    for ($i = 0; $i < 4; $i++) {
        $posicion = 0;
        $min = $Distancias[0]; // Se obtiene la primer distancia que sera la minima inicial
        for ($j = 0; $j < sizeof($Distancias); $j++) {
            // Se comprueba que la distancia actual sea menor que la minima y
            // que no exista ya el Id en la lista de resultados
            if($Distancias[$j] < $min && !in_array($Etiquetas[$j],$resultado)) {
                $min = $Distancias[$j];
                $posicion = $j;
            }
        }
        // Se inserta el de menor peso a la lista nueva
        $Dist[] = $Distancias[$posicion];
        $resultado[] = $Etiquetas[$posicion];
        // Se elimina el valor de la lista vieja
        array_splice($Distancias,$posicion,1);
        array_splice($Etiquetas,$posicion,1);
    }
    $sql = "SELECT Trabajador.Id,Trabajador.IdCuenta,Trabajador.DescripcionCorta,Trabajador.DescripcionLarga,Trabajador.CalificacionGlobal,Trabajador.CalificacionPrecio,Trabajador.Categoria,Trabajador.TituloTrabajo,Trabajador.Trabajos,Cuenta.Nombre AS Nombre FROM Trabajador INNER JOIN Cuenta  ON Trabajador.IdCuenta = Cuenta.Id WHERE Trabajador.Id IN ('$resultado[0]','$resultado[1]','$resultado[2]','$resultado[3]')";
    $resultado = mysqli_query($cone,$sql);
    $datos = array();
    if(mysqli_num_rows($resultado)>0){
        while($row = mysqli_fetch_assoc($resultado)){
            $datos[] = $row;
        }
    }
    echo json_encode($datos);
    
}



Llenado();
mysqli_close($cone);
?>
