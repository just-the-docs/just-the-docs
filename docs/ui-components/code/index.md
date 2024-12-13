---
title: 🛡️ Métodos de Solicitud HTTP 
parent: Supervivencia Sin Esfuerzo
priority: 4
---
<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">

# Métodos de Solicitud HTTP

En este artículo se cubren los **9 principales métodos de solicitud HTTP** utilizados en las aplicaciones web. Cada método tiene un propósito específico dentro de la comunicación entre cliente y servidor. Esta guía te ayudará a comprender el uso correcto de cada método y cuándo aplicarlos.

![ImagendeBytebyteGo](/assets/img/http.gif)

## 1. GET

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> El método `GET` se utiliza para recuperar información de un servidor. Generalmente, no tiene efectos secundarios y no modifica el estado del recurso.  
<strong>Uso:</strong> Ideal para obtener datos como recursos estáticos (páginas HTML, imágenes, etc.) o consultar el estado de un recurso.  
<strong>Ejemplo:</strong> `GET /v1/products/iphone`
</div>

## 2. POST

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `POST` envía datos al servidor, usualmente para crear un nuevo recurso.  
<strong>Uso:</strong> Utilizado para crear elementos, enviar formularios, o cargar archivos. Los datos suelen ir en el cuerpo de la solicitud.  
<strong>Ejemplo:</strong> `POST /v1/users`
</div>

## 3. PUT

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> El método `PUT` actualiza o reemplaza un recurso existente en el servidor.  
<strong>Uso:</strong> Utilizado para actualizar un recurso existente, especificando el recurso completo en el cuerpo de la solicitud.  
<strong>Ejemplo:</strong> `PUT /v1/users/123`
</div>

## 4. DELETE

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `DELETE` elimina un recurso en el servidor.  
<strong>Uso:</strong> Utilizado para eliminar recursos existentes.  
<strong>Ejemplo:</strong> `DELETE /v1/users/123`
</div>

## 5. PATCH

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `PATCH` modifica parcialmente un recurso existente.  
<strong>Uso:</strong> Utilizado para realizar cambios parciales o actualizaciones incrementales en un recurso.  
<strong>Ejemplo:</strong> `PATCH /v1/users/123`
</div>

## 6. HEAD

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `HEAD` es similar a `GET`, pero solo devuelve los encabezados de la respuesta sin el cuerpo.  
<strong>Uso:</strong> Se utiliza para verificar la existencia de un recurso o consultar los metadatos sin descargar todo el contenido.  
<strong>Ejemplo:</strong> `HEAD /v1/products/iphone`
</div>

## 7. OPTIONS

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `OPTIONS` devuelve los métodos HTTP soportados por el servidor para un recurso específico.  
<strong>Uso:</strong> Utilizado para verificar qué métodos son aceptados por el servidor antes de enviar una solicitud.  
<strong>Ejemplo:</strong> `OPTIONS /v1/users`
</div>

## 8. CONNECT

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `CONNECT` establece una conexión de túnel bidireccional con el servidor, frecuentemente utilizado para establecer una conexión segura (SSL/TLS).  
<strong>Uso:</strong> Ideal para conexiones a través de un proxy, como conexiones HTTPS.  
<strong>Ejemplo:</strong> `CONNECT xxx.com:80`
</div>

## 9. TRACE

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
<strong>Descripción:</strong> `TRACE` realiza un seguimiento del camino recorrido por la solicitud en la red. Devuelve la solicitud original recibida por el servidor.  
<strong>Uso:</strong> Utilizado principalmente para pruebas y depuración, permitiendo diagnosticar problemas de red.  
<strong>Ejemplo:</strong> `TRACE /index.html`
</div>

---

Estos métodos son la base para la comunicación entre cliente y servidor en aplicaciones web modernas. Es importante conocer cuándo utilizarlos para optimizar el rendimiento, seguridad y eficiencia de la interacción con los servidores.

### Recursos Adicionales

- [Documentación oficial de HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
- [Curso sobre Métodos HTTP en TryHackMe](https://tryhackme.com)
- [Ejercicios de Métodos HTTP en Hack The Box](https://hackthebox.com)

<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">

<div style="text-align: center; margin: 40px 0;">
  <img src="/assets/images/cojo.png" alt="Firma" style="max-width: 30%; height: auto; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);">
</div>