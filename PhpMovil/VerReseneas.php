<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$trabajadorId=$_GET['trabajadorId'];

$sql = "SELECT Resena.Id, Resena.IdContratista, Resena.IdTrabajador, Resena.Resena, Resena.Estrellas, Resena.Precio, Cuenta.Nombre as NombreCliente FROM Resena INNER JOIN Cuenta ON Resena.IdContratista = Cuenta.Id WHERE Resena.IdTrabajador = '$trabajadorId'";

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