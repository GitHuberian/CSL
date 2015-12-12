<?php
if(isset($_POST['fname'])&&($_POST['email']!='')){

	$nombre = $_POST['fname'];
	$email = $_POST['email'];

	$Subject = "Mensaje desde CREATIVA WEB PAGE";

	$Content = "
			<html>
			<head>
				<title></title>
			</head>
			<body>
				<h1>MENSAJE DESDE CREATIVA WEB PAGE</h1>
				<hr>
				<p>
					El visitante" .$nombre. " envió un mensaje para contacto desde la página WEB.
					<br/>
					E-mail del visitante: " .$email. "
				</p>
				<hr>
			</body>
			</html>
				";
				$encabezado = "MINE-Version: 1.0\r\n";
				$encabezado = "Content-type: text/html; charset=UTF-8\r\n";
				$encabezado = "From: Creativasoftline.com <>"
} 

?>

