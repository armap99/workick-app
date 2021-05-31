<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$opcion=$_GET['opcion'];
$Id=$_GET['Id'];

if($opcion == 0){
    $sql = "SELECT Nombre,Direccion,Municipio from Cuenta WHERE Id = '$Id'";
    $resultado=mysqli_query($cone,$sql);
    //$datos=array();
    if(mysqli_num_rows($resultado)>0){
        while($row = mysqli_fetch_assoc($resultado)){
            echo $row['Nombre']. "~". $row['Direccion']."~".$row['Municipio'];
            //$datos[] = $row;
        }
    }
}
if($opcion == 1){
    $sqlD = "SELECT  Cuenta.Nombre,  Cuenta.Direccion, Cuenta.Municipio, Trabajador.DescripcionCorta AS DescripcionCorta,Trabajador.DescripcionLarga AS DescripcionLarga,Trabajador.TituloTrabajo AS TituloTrabajo,Trabajador.Categoria AS Categoria, Trabajador.CalificacionGlobal AS CalificacionGlobal, Trabajador.CalificacionPrecio AS CalificacionPrecio  FROM Cuenta INNER JOIN Trabajador ON Cuenta.Id = Trabajador.IdCuenta WHERE Cuenta.Id = '$Id'";
        $resultadoD=mysqli_query($cone,$sqlD);
    //$datos=array();
    if(mysqli_num_rows($resultadoD)>0){
        while($row = mysqli_fetch_assoc($resultadoD)){
            echo $row['Nombre']. "~". $row['Direccion']."~".$row['Municipio']."~".$row['DescripcionCorta']."~".$row['DescripcionLarga']."~".$row['TituloTrabajo']."~".$row['Categoria']."~".$row['CalificacionGlobal']."~".$row['CalificacionPrecio'];
            //$datos[] = $row;
        }
    }
}

//echo json_encode($datos);
mysqli_close($cone);
?>