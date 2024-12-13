---
layout: page
title: 🛡️ Splunk - Monitoreo y Análisis de Datos
description: Consejos y recursos
parent: Supervivencia Sin Esfuerzo
priority: 5
---
<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">

<div style="background-color:rgb(83, 177, 146); padding: 30px; text-align: center; border-radius: 8px; color: white; font-size: 24px; font-weight: bold;">
  SPLUNK
</div>


## Visión General

**Splunk** es una plataforma avanzada para el análisis de grandes volúmenes de datos y la gestión de logs, diseñada especialmente para monitorear, analizar y visualizar datos en tiempo real. Es una herramienta esencial en el campo de la ciberseguridad, particularmente en funciones de **SIEM** (Gestión de Información y Eventos de Seguridad), donde ayuda a identificar y responder a incidentes de seguridad.

## Funcionalidades

### Monitoreo en Tiempo Real

Splunk permite la visualización de eventos y métricas en tiempo real, lo que proporciona una capacidad crítica para la detección inmediata de amenazas y anomalías en la infraestructura de TI. A través de **dashboards** personalizables, los usuarios pueden observar de manera directa el comportamiento de sistemas y redes.

### Análisis de Datos

Con Splunk, es posible realizar análisis detallados sobre grandes volúmenes de datos, permitiendo descubrir patrones, correlacionar eventos y extraer información valiosa para la toma de decisiones en seguridad. La plataforma es capaz de procesar datos estructurados y no estructurados, lo que la convierte en una solución flexible y escalable.

### Integración con Otras Herramientas

Splunk cuenta con una amplia gama de **Apps** y **Add-ons** que permiten integrar fuentes de datos externas y herramientas de seguridad. Esta integración permite centralizar los análisis y obtener una visión unificada de los eventos de seguridad.

## Casos de Uso

### Gestión de Logs

La recolección, indexación y análisis de logs es uno de los casos de uso más comunes en Splunk. La plataforma puede ingerir logs de múltiples fuentes (servidores, dispositivos de red, aplicaciones) y proporcionar análisis detallados sobre estos datos. Los logs son esenciales para identificar patrones de comportamiento y eventos anómalos.

### SIEM con Splunk

Splunk actúa como un potente **SIEM**, centralizando los eventos de seguridad para su análisis y correlación. La plataforma permite a los equipos de seguridad detectar amenazas, responder rápidamente a incidentes y automatizar acciones basadas en alertas y reglas personalizadas.

### Respuesta a Incidentes

Splunk también es una herramienta invaluable en la **respuesta a incidentes**, permitiendo a los analistas de seguridad investigar en profundidad los eventos registrados, identificar la causa raíz de los incidentes y realizar un seguimiento de las acciones correctivas. Además, la plataforma facilita la generación de informes detallados para su documentación.

## Comandos de Splunk

### Comandos Básicos

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main"`<br>
  <strong>Descripción:</strong> Filtra los eventos del índice "main". Utilizado para trabajar con datos específicos de un índice.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `source="logfile.log"`<br>
  <strong>Descripción:</strong> Filtra los eventos provenientes de un archivo de log específico.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `sourcetype="json"`<br>
  <strong>Descripción:</strong> Filtra eventos según el tipo de fuente, como "json".
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `host="server1"`<br>
  <strong>Descripción:</strong> Filtra los eventos provenientes de un host específico.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `*error*`<br>
  <strong>Descripción:</strong> Realiza una búsqueda de eventos que contengan la palabra "error".
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `status=200`<br>
  <strong>Descripción:</strong> Filtra los eventos en los que el campo "status" tenga el valor 200 (respuesta exitosa HTTP).
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `| stats count`<br>
  <strong>Descripción:</strong> Realiza una agregación básica, contando la cantidad de eventos en el conjunto de datos filtrados.
</div>

### Comandos de Búsqueda Avanzada

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" sourcetype="json" | stats count by status`<br>
  <strong>Descripción:</strong> Filtra eventos por el índice "main" y el sourcetype "json", luego realiza un conteo de eventos agrupados por "status".
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" error | top 10 source`<br>
  <strong>Descripción:</strong> Filtra eventos que contienen la palabra "error" y muestra las 10 principales fuentes de esos eventos.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="security" | timechart span=1h count`<br>
  <strong>Descripción:</strong> Muestra una gráfica con la cantidad de eventos por hora, útil para analizar eventos temporales.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="logs" | stats avg(bytes) by host`<br>
  <strong>Descripción:</strong> Calcula el promedio de "bytes" por cada host, ideal para analizar el volumen de datos por servidor.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | dedup source`<br>
  <strong>Descripción:</strong> Elimina registros duplicados basados en el campo "source".
</div>

### Comandos de Seguridad

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="security" sourcetype="syslog" | stats count by host`<br>
  <strong>Descripción:</strong> Filtra eventos de tipo "syslog" en el índice "security" y muestra un conteo agrupado por host.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="firewall" | stats values(ip) by action`<br>
  <strong>Descripción:</strong> Muestra las IP asociadas con cada acción del firewall (permitir o bloquear), útil para detectar intentos sospechosos.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="security" | search "failed login" | stats count by user`<br>
  <strong>Descripción:</strong> Busca eventos con "failed login" y agrupa el conteo por usuario.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="security" | search "brute force" | stats count`<br>
  <strong>Descripción:</strong> Busca eventos con "brute force" para identificar intentos de ataque por fuerza bruta.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="firewall" | search "blocked" | stats count by ip`<br>
  <strong>Descripción:</strong> Filtra eventos de firewall que indican tráfico bloqueado y muestra la cantidad de intentos por IP.
</div>

### Comandos de Tiempo y Ordenación

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | earliest=-24h@h latest=now`<br>
  <strong>Descripción:</strong> Filtra eventos ocurridos en las últimas 24 horas, ideal para obtener eventos recientes.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | earliest="2024-12-01T00:00:00" latest="2024-12-05T23:59:59"`<br>
  <strong>Descripción:</strong> Filtra eventos dentro de un rango de fechas específico, útil para auditorías.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | sort - _time`<br>
  <strong>Descripción:</strong> Ordena los eventos por el campo "_time" en orden descendente, mostrando los eventos más recientes.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | sort + bytes`<br>
  <strong>Descripción:</strong> Ordena los eventos por el campo "bytes" en orden ascendente, útil para detectar picos de tráfico.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | head 10`<br>
  <strong>Descripción:</strong> Muestra los primeros 10 eventos de la búsqueda actual, ideal para un resumen rápido.
</div>

### Comandos de Agregación y Análisis

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="web" | stats sum(bytes) by host`<br>
  <strong>Descripción:</strong> Suma los valores de "bytes" por cada host, útil para ver el volumen de datos procesados por cada servidor.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="web" | timechart span=1h avg(bytes)`<br>
  <strong>Descripción:</strong> Muestra una gráfica con el promedio de bytes procesados por hora, ideal para detectar tendencias de tráfico.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="security" | top 10 src_ip`<br>
  <strong>Descripción:</strong> Muestra las 10 direcciones IP de origen más frecuentes, útil para detectar posibles puntos de origen de ataques.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | stats count by status, host`<br>
  <strong>Descripción:</strong> Realiza un conteo de eventos por "status" y agrupa por "host", ideal para el análisis de errores por servidor.
</div>

<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
  <strong>Comando:</strong> `index="main" | chart count over _time by status`<br>
  <strong>Descripción:</strong> Genera un gráfico de barras con la cantidad de eventos agrupados por "status" a lo largo del tiempo.
</div>

## Recursos Adicionales

- [Documentación Oficial de Splunk](https://docs.splunk.com): Guías detalladas sobre el uso de Splunk para diversas aplicaciones de seguridad y análisis de datos.
- [Splunk Community](https://community.splunk.com): Comunidad activa de usuarios que comparten conocimientos y resuelven problemas.
- [Splunk Education](https://www.splunk.com/en_us/training.html): Cursos y certificaciones sobre el uso de Splunk.
- [TryHackMe](https://www.tryhackme.com): Laboratorios prácticos y desafíos de ciberseguridad.
- [Hack The Box](https://www.hackthebox.eu): Desafíos interactivos y pruebas de penetración.

---

<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">

<div style="text-align: center; margin: 40px 0;">
  <img src="/assets/images/cojo.png" alt="Firma" style="max-width: 30%; height: auto; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);">
</div>