<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$usuario = $_GET['usuario'];
$contrasena = $_GET['contrasena'];

$sql = "SELECT Id,Estatus,Nombre FROM Cuenta WHERE correo = '$usuario' && contrasena = '$contrasena'";
$resultado=mysqli_query($cone,$sql);
$datos=array();
if(mysqli_num_rows($resultado)>0){
    while($row = mysqli_fetch_assoc($resultado)){
        echo $row['Id']. ":". $row['Estatus'].":".$row['Nombre'];
        
    }
}
else{
    echo "0";
}

mysqli_close($cone);
?>