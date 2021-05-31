<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$IdContratista=$_GET['IdContratista'];
$IdTrabajador=$_GET['IdTrabajador'];
$Resena=$_GET['Resena'];
$Estrellas=$_GET['Estrellas'];
$Precio=$_GET['Precio'];


$sqlD = "INSERT INTO `Resena`(`IdContratista`, `IdTrabajador`, `Resena`, `Estrellas`, `Precio`) VALUES ('$IdContratista','$IdTrabajador','$Resena','$Estrellas','$Precio')";

if(mysqli_query($cone,$sqlD)){
        $sql = "UPDATE Trabajador SET Trabajador.CalificacionPrecio = (SELECT AVG(Precio) FROM Resena WHERE IdTrabajador = '$IdTrabajador'), Trabajador.CalificacionGlobal = (SELECT AVG(Estrellas) FROM Resena WHERE IdTrabajador = '$IdTrabajador') WHERE Trabajador.Id = '$IdTrabajador'";
        mysqli_query($cone,$sql);
        echo "1";
        
}else{
        echo "0";
    }


mysqli_close($cone);
?>