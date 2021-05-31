<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$opcion=$_GET['opcion'];

if($opcion == 1){
    $sql = "SELECT Trabajador.Id,Trabajador.IdCuenta,Trabajador.DescripcionCorta,Trabajador.DescripcionLarga,Trabajador.CalificacionGlobal,Trabajador.CalificacionPrecio,Trabajador.Categoria,Trabajador.TituloTrabajo,Trabajador.Trabajos,Cuenta.Nombre AS Nombre FROM Trabajador INNER JOIN Cuenta ON Trabajador.IdCuenta = Cuenta.Id WHERE Trabajador.Trabajos > 10 ORDER BY Trabajador.CalificacionGlobal DESC";
}
if($opcion == 2){
    $sql = "SELECT Trabajador.Id,Trabajador.IdCuenta,Trabajador.DescripcionCorta,Trabajador.DescripcionLarga,Trabajador.CalificacionGlobal,Trabajador.CalificacionPrecio,Trabajador.Categoria,Trabajador.TituloTrabajo,Trabajador.Trabajos,Cuenta.Nombre AS Nombre FROM Trabajador INNER JOIN Cuenta  ON Trabajador.IdCuenta = Cuenta.Id WHERE Trabajador.Trabajos < 10";
}

$resultado=mysqli_query($cone,$sql);
$datos=array();
if(mysqli_num_rows($resultado)>0){
    while($row = mysqli_fetch_assoc($resultado)){
        //echo "Cita: ".$row['Mes']. " ". $row['Dia']." ".$row['Hora']."<br>";
        $datos[] = $row;
    }
}
echo json_encode($datos);
mysqli_close($cone);
?>