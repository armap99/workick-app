<?php
//https://workick.000webhostapp.com/PhpMovil/VerMensajes.php?opcion=1&id=1
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$id=$_GET['id'];

$sql = "SELECT Id, IdContratista, IdTrabajador, Contenido, HoraEnvio, Enviado FROM Mensaje WHERE IdPropuesta = '$id'";

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