<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$municipio = $_GET['municipio'];
$texto = $_GET['texto'];
$categoria = $_GET['categoria'];

$sql = "SELECT Trabajador.Id,Trabajador.IdCuenta,Trabajador.DescripcionCorta,Trabajador.DescripcionLarga,Trabajador.CalificacionGlobal,Trabajador.CalificacionPrecio,Trabajador.Categoria,Trabajador.TituloTrabajo,Trabajador.Trabajos,Cuenta.Nombre AS Nombre FROM Trabajador INNER JOIN Cuenta  ON Trabajador.IdCuenta = Cuenta.Id WHERE Trabajador.Trabajos < 10  and (Trabajador.DescripcionCorta LIKE '%$texto%' or Cuenta.Municipio LIKE '%$texto%' or  Trabajador.Categoria LIKE '%$texto%' or Trabajador.DescripcionLarga LIKE '%$texto%' or Trabajador.TituloTrabajo LIKE '%$texto%' or Cuenta.Nombre LIKE '%$texto%')";

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