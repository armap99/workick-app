<?php
//datos de conexion a base de datos
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
$correo = $_GET["correo"];
$contrasena = $_GET["contrasena"];
$nombre = $_GET["nombre"];
$direccion = $_GET["direccion"];
$municipio = $_GET["municipio"];
//Conexion
$conexion = mysqli_connect($server,$usuario,$pass,$bd);
$sqlU = $sql = "SELECT * FROM Cuenta WHERE correo = '$usuario' && contrasena = '$contrasena'";;
$respuestaC = mysqli_query($conexion,$sqlU);
if(mysqli_num_rows($respuestaC)>0){
    echo "2";
}
else{
    $sql = "INSERT INTO Cuenta (Nombre, Correo, Contrasena, Direccion ,Municipio, Estatus, FechaAlta) 
            VALUE('$nombre','$correo','$contrasena','$direccion','$municipio',1,CURDATE());";

    if(mysqli_query($conexion,$sql)){
        echo "1";
    }else{
        echo "0";
    }
}

mysqli_close($conexion);
?>