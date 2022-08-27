<h1>Whatsapp API</h1>
<ul>
  <li><p>Descargar/clonar el repositorio</p></li>
  <li><p>Utilizar el comando <b>npm i</b> para instalar las dependencias</p></li>
  <li><p>Correr el comando <b>npm run start</b> o <b>npm run nodemon</b></p></li>
</ul>
<p>
En este momento nos encontramos con el servidor disponible en el <b>puerto 3000</b> por defecto, es posible acceder desde <a href="http://localhost:3000"> aqui </a> (En caso de no funcionar revisar las variables de entorno)
</p>

<h2>Instalacion de ngrok</h2>
<p>Pueden descargarse la herramienta <b>ngrok</b> desde el siguiente enlace: <a href="https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip">Ngrok</a></p>
<p>Una vez instalado, abrir una consola</p>
<p>Es necesario crearse una cuenta y asociar su token antes de continuar con el comando <b>ngrok authtoken NROTOKEN</b></p>
<p>Correr el comando <b>ngrok http 3000</b> (o el puerto que este configurado)</p>
<p>Ngrok proveera de una URL accesible por la API de Whatsapp</p>
<img src="https://i.imgur.com/1FDxHe9.png">


<h1>Variables de entorno</h1>
<p>Crear un archivo .env en la raiz del proyecto para poder configurar los tokens de la API</p>
<img src="https://imgur.com/82BV6Zt.png">
<p><u>WHATSAPP_TOKEN</u> sera el token privado que utilizaran en comun los usuarios para realizar las peticiones al numero de WhatsApp</p>
<p><u>VERIFY_TOKEN</u> es un cadena aleatoria utilizada para confirmar la correcta configuracion del webhook desde el panel de Meta</p>
<img src="https://i.imgur.com/5aIStI1.png">
<p>En caso de ser correcto el servidor enviara un log con el mensaje <b>WEBHOOK VERIFIED</b></p>

<p>Desde el apartado de configuracion de la aplicacion en Meta, en la seccion <u>primeros pasos</u> podemos acceder a la documentacion desde POSTMAN para configurar los parametros y utilizar las peticiones predeterminadas</p>
<img src="https://i.imgur.com/76KWRqz.png">
<h1>Enviar un mensaje</h1>
<p></p>
<img src="https://i.imgur.com/aD6tUsH.png">


<h1>Endpoints</h1>
<ul>
  <li>GET / (Raiz vacia)</li>
  <li>GET /webhook</li>
  <li>POST /webhook (Utilizada para la recepcion de mensajes)</li>
</ul>
