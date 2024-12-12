---
title: Consejos BTL-1
parent: Security Blue Team
nav_order: 2
---

<div style="background: linear-gradient(45deg, #00b4d8, #0077b6); padding: 30px; border-radius: 10px; text-align: center; color: white;">
  <h1 style="font-size: 2.5rem;">Consejos para preparar el Examen BTL-1</h1>
</div>

> **Resumen**  
> Este artículo ofrece una guía completa con recursos, herramientas y estrategias efectivas para prepararte para la certificación **BTL-1**. Explora temas clave como la inteligencia de amenazas, el análisis forense, la gestión de eventos de seguridad (SIEM) y la respuesta a incidentes, acompañados de ejemplos prácticos y ejercicios para que puedas afianzar tus conocimientos.

---

## Introducción

Hace un mes, logré aprobar con éxito el examen **Blue Team Level 1 (BTL-1)** en mi primer intento. Aunque fue un reto, una preparación estructurada y la práctica constante fueron esenciales para mi éxito. En este artículo, compartiré los recursos, consejos y estrategias que me ayudaron a superar este reto. Si estás buscando obtener esta certificación, esta guía te proporcionará una base sólida para avanzar con confianza.

---

## **¿Qué es la Certificación BTL-1?**

La **certificación BTL-1** (Blue Team Level 1) valida las habilidades fundamentales de un profesional dentro de un equipo azul, el cual es responsable de la defensa cibernética de una organización. A diferencia de los equipos rojos, que simulan ciberataques, el equipo azul se enfoca en identificar, prevenir, detectar y mitigar ciberamenazas en tiempo real.

El BTL-1 cubre áreas esenciales, incluyendo análisis de phishing, inteligencia de amenazas, forense digital, gestión de eventos de seguridad (SIEM) y respuesta a incidentes. Obtener esta certificación puede abrirte muchas puertas en el ámbito de la seguridad cibernética, especialmente en roles orientados a la defensa.

---


## Áreas Clave del Examen BTL-1
{: .fs-5 .fw-bold .text-left }

| **Área**                  | **Descripción**                                                                                                                                            |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Análisis de Phishing**  | Identificación de indicadores de compromiso (IOCs) en correos electrónicos, URLs y archivos adjuntos.                                                     |
| **Inteligencia de Amenazas** | Uso de marcos como **MITRE ATT&CK** para comprender tácticas y técnicas de los atacantes.                                                                  |
| **Forense Digital**       | Análisis de evidencia digital en entornos Windows y Linux, con énfasis en la preservación de datos y el análisis de memoria.                              |
| **Gestión de Eventos (SIEM)** | Manejo de grandes volúmenes de datos y eventos de seguridad utilizando plataformas como **Splunk**, **Elastic Stack** y otros SIEM.                      |
| **Respuesta a Incidentes** | Investigación, mitigación y comunicación efectiva de ciberataques, así como la ejecución de medidas correctivas.                                             |

Cada área es crucial para demostrar tus habilidades técnicas. A continuación, profundizaremos en cada una, proporcionando ejemplos, herramientas útiles y ejercicios prácticos.


---

## 1. Análisis de Phishing 
{: .fs-5 .fw-bold .text-left }

El análisis de phishing es fundamental para identificar correos electrónicos maliciosos, dominios fraudulentos y archivos adjuntos peligrosos.

### Artefactos Clave
{: .fs-5 .fw-bold .text-left }

| **Artefacto**      | **Detalles**                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| **Correo Electrónico** | Remitente, servidor de envío, encabezados, asunto y contenido del cuerpo. |
| **URLs**           | Dominio, IP, parámetros en URLs defangadas (separadas con `[.]`).            |
| **Archivos Adjuntos** | Verificación de extensiones, nombres y hashes (MD5/SHA256).               |

### Herramientas Útiles para Phishing
{: .fs-5 .fw-bold .text-left }

| **Categoría**      | **Herramienta**                                      | **Uso Específico**                                                                                                    |
|---------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Reputación**      | [VirusTotal](https://www.virustotal.com/)           | Escanea archivos, URLs, dominios o IPs para verificar si están catalogados como maliciosos.                          |
|                     | [URLhaus](https://urlhaus.abuse.ch/)                | Base de datos de URLs maliciosas y herramientas para reportarlas o verificarlas.                                      |
| **Sandbox**         | [Hybrid Analysis](https://www.hybrid-analysis.com/) | Ejecuta archivos sospechosos en un entorno controlado para identificar su comportamiento y posibles riesgos.         |
| **Encabezados**     | [MxToolbox](https://mxtoolbox.com/)                 | Analiza encabezados de correos electrónicos y verifica si los servidores de envío están en listas negras.            |
| **Visualización**   | [URLScan](https://urlscan.io/)                      | Proporciona una representación gráfica de cómo se comporta un dominio o URL.                                        |

### Obtener Hashes en Windows
{: .fs-5 .fw-bold .text-left }

| Comando | Descripción |
|---------|-------------|
| `get-filehash -algorithm MD5 <archivo>` | Calcula el hash MD5 de un archivo. |
| `get-filehash -algorithm SHA256 <archivo>` | Calcula el hash SHA256 de un archivo. |

### Comandos en Linux
{: .fs-5 .fw-bold .text-left }

| Comando | Descripción |
|---------|-------------|
| `md5sum <archivo>` | Calcula el hash MD5 de un archivo. |
| `sha256sum <archivo>` | Calcula el hash SHA256 de un archivo. |

---

## 2. Forense Digital
{: .fs-5 .fw-bold .text-left }

### FTK Imager (Windows)
{: .fs-5 .fw-bold .text-left }

| Comando | Descripción |
|---------|-------------|
| `ftkimager.exe <source> <destination>` | Captura una imagen de disco. |
| `ftkimager.exe -hash <path-to-image>` | Verifica el hash de una imagen de disco. |

### Volatility (Análisis de Memoria)
{: .fs-5 .fw-bold .text-left }

| Comando | Descripción |
|---------|-------------|
| `volatility -f memoria.dmp pslist` | Lista los procesos en una imagen de memoria. |
| `volatility -f memoria.dmp netscan` | Muestra las conexiones de red en una imagen de memoria. |
| `volatility -f memoria.dmp timeliner` | Crea una línea de tiempo a partir de una imagen de memoria. |
| `volatility -f memoria.dmp imageinfo` | Obtiene información sobre la imagen de memoria. |
| `volatility -f memoria.dmp procdump --pid <PID> --dump-dir <output>` | Volca la memoria de un proceso específico. |
| `volatility -f memoria.dmp dlllist` | Muestra las bibliotecas cargadas por un proceso. |

---

## 3. Comandos para SIEM (Splunk)
{: .fs-5 .fw-bold .text-left }

| Comando | Descripción |
|---------|-------------|
| `index="main" src="192.168.1.1"` | Realiza una consulta para eventos desde la IP origen `192.168.1.1`. |
| `index="security" sourcetype="syslog" "error"` | Filtra eventos de tipo syslog que contienen el texto "error". |
| `index="security" | stats count by sourcetype` | Cuenta el número de eventos por tipo. |
| `index="security" | head 10` | Muestra los 10 eventos más recientes. |
| `index="security" | table _time, host, src_ip, dest_ip, _raw` | Muestra una tabla con los campos de tiempo, host, IP origen, IP destino y evento crudo. |
| `index="security" | timechart span=1h count by sourcetype` | Muestra un gráfico de eventos agrupados por hora y tipo de fuente. |
| `index="main" "failed login" | top src_ip` | Muestra las IPs que intentaron iniciar sesión sin éxito. |

---

## 4. Comandos de Análisis de Red (Wireshark)
{: .fs-5 .fw-bold .text-left }

| Comando | Descripción |
|---------|-------------|
| `http` | Filtra el tráfico HTTP. |
| `ip.src == 192.168.1.1` | Filtra el tráfico por la IP de origen `192.168.1.1`. |
| `ip.dst == 192.168.1.1` | Filtra el tráfico por la IP de destino `192.168.1.1`. |
| `tcp` | Filtra el tráfico TCP. |
| `udp` | Filtra el tráfico UDP. |
| `dns` | Filtra el tráfico DNS. |
| `tshark -i eth0 -w capture.pcap` | Captura tráfico de red y lo guarda en un archivo `.pcap`. |
| `tshark -r capture.pcap -Y "http.request"` | Filtra solicitudes HTTP en un archivo `.pcap` capturado. |
| `wireshark -k -Y "ip.addr==192.168.1.1"` | Inicia Wireshark y filtra el tráfico para la IP `192.168.1.1`. |

---

## 5. Respuesta a Incidentes
{: .fs-6 .fw-bold .text-center }

## Comandos en Windows
{: .fs-5 .fw-bold .text-left }

| Comando                | Descripción                                                          |
|------------------------|----------------------------------------------------------------------|
| `wmic process list brief` | Muestra una lista de procesos activos en el sistema.                |
| `netstat -ano`            | Muestra las conexiones de red activas y sus identificadores de proceso (PID). |
| `query user`              | Muestra los usuarios actuales del sistema.                          |
| `tasklist /fi "pid eq <PID>"` | Muestra detalles de un proceso específico utilizando su PID.   |
| `netstat -an | find "80"` | Filtra conexiones en el puerto 80.                                 |
| `net user`                | Muestra todos los usuarios en el sistema Windows.                   |

## Comandos en Linux
{: .fs-5 .fw-bold .text-left }

| Comando      | Descripción                                                |
|--------------|------------------------------------------------------------|
| `ps aux`     | Muestra una lista de todos los procesos activos en el sistema. |
| `netstat -tuln` | Muestra las conexiones de red activas.                    |
| `who`        | Muestra los usuarios actualmente conectados.               |
| `netstat -tulnp` | Muestra las conexiones de red con información del proceso. |
| `top`        | Muestra los procesos activos en tiempo real.                |
| `lsof -i :80` | Muestra los procesos que están utilizando el puerto 80.     |

---

# 6. Comandos de Carving con Scalpel (Recuperación de Archivos)
{: .fs-5 .fw-bold .text-left }

| Comando                             | Descripción                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| `scalpel -b -o <output> <imagen-disco>` | Realiza carving en una imagen de disco y guarda los resultados en la carpeta de salida. |
| `scalpel -c`                        | Verifica las configuraciones del archivo de configuración de Scalpel. |
| `scalpel -z <archivo>`              | Realiza carving con el archivo de imagen especificado.               |

---

# 7. Comandos para el Análisis de Archivos (ExifTool)
{: .fs-5 .fw-bold .text-left }

| Comando                            | Descripción                                        |
|------------------------------------|----------------------------------------------------|
| `exiftool <archivo>`               | Obtiene los metadatos completos de un archivo.     |
| `exiftool -T -filename -filesize -createdate <archivo>` | Extrae información específica como nombre, tamaño y fecha de creación de un archivo. |
| `exiftool -all= <archivo>`         | Elimina todos los metadatos de un archivo.         |
| `exiftool -ExifToolVersion`        | Muestra la versión de ExifTool.                    |

---

# 8. Comandos para la Gestión de Eventos (Syslog)
{: .fs-5 .fw-bold .text-left }

| Comando                | Descripción                                         |
|------------------------|-----------------------------------------------------|
| `cat /var/log/syslog`  | Muestra el contenido del archivo de log `syslog`.   |
| `grep "error" /var/log/syslog` | Busca la palabra "error" dentro del archivo `syslog`. |
| `tail -n 50 /var/log/syslog`    | Muestra las últimas 50 líneas del archivo `syslog`. |
| `less /var/log/syslog`          | Muestra el archivo `syslog` página por página.       |
| `journalctl -xe`               | Muestra los logs del sistema en tiempo real.       |

---

# 9. Comandos de Búsqueda en Log de Windows (Event Viewer)
{: .fs-5 .fw-bold .text-left }

| Comando                                         | Descripción                                              |
|-------------------------------------------------|----------------------------------------------------------|
| `Get-WinEvent -LogName Security`                | Muestra los logs de seguridad de Windows.                |
| `Get-WinEvent -LogName Security | Where-Object {$_.Message -like "*failed*"}` | Filtra los logs de seguridad para eventos que contengan "failed". |
| `Get-WinEvent -LogName Application | Where-Object {$_.LevelDisplayName -eq "Error"}` | Filtra los eventos de la aplicación que tienen el nivel "Error". |

---

# 10. Herramientas de Análisis Forense
{: .fs-5 .fw-bold .text-left }

## Autopsy
Autopsy es una herramienta de análisis forense digital que simplifica el análisis y la recopilación de datos de dispositivos de almacenamiento.

### Comandos Básicos de Autopsy
{: .fs-5 .fw-bold .text-left }

| Comando                             | Descripción                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| `autopsy -i <image>`                | Abre una imagen de disco en Autopsy.                                 |
| `autopsy -p <project>`              | Abre un proyecto específico en Autopsy.                              |

## Volatility
Volatility es una herramienta poderosa para el análisis de imágenes de memoria, permitiendo extraer información detallada sobre procesos, redes y más.

### Comandos Básicos de Volatility
{: .fs-5 .fw-bold .text-left }

| Comando                             | Descripción                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| `volatility -f <memdump> imageinfo` | Identifica el perfil de la imagen de memoria.                        |
| `volatility -f <memdump> pslist`    | Lista los procesos activos.                                          |
| `volatility -f <memdump> netscan`   | Escanea las conexiones de red activas.                               |
| `volatility -f <memdump> dlllist`   | Muestra las bibliotecas dinámicas cargadas por procesos.             |
| `volatility -f <memdump> timeliner` | Crea una línea de tiempo de eventos en la imagen de memoria.         |
| `volatility -f <memdump> procdump --pid <PID> --dump-dir <output>` | Volca la memoria de un proceso específico. |

## KAPE (Kroll Artifact Parser and Extractor)
KAPE es una herramienta de recolección de artefactos de incidentes y análisis forense que permite extraer y analizar rápidamente datos clave de un sistema.

### Comandos Básicos de KAPE
{: .fs-5 .fw-bold .text-left }

| Comando                             | Descripción                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| `kape.exe --target <target> --output <output>` | Ejecuta KAPE para recolectar artefactos de un objetivo específico y guarda los resultados en la ubicación especificada. |
| `kape.exe --module <module> --target <target> --output <output>` | Ejecuta un módulo específico en el objetivo y guarda los resultados. |

## Otras Herramientas Recomendadas
{: .fs-5 .fw-bold .text-left }


### FTK Imager
FTK Imager es una herramienta de adquisición y análisis forense que permite crear imágenes de discos y examinar contenido de manera forense.

| Comando                             | Descripción                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| `ftkimager.exe <source> <destination>` | Captura una imagen de disco.                                         |
| `ftkimager.exe -hash <path-to-image>` | Verifica el hash de una imagen de disco.                             |

### Sleuth Kit (TSK)
Sleuth Kit es un conjunto de herramientas de análisis forense digital que permite examinar sistemas de archivos e imágenes de disco.

| Comando                             | Descripción                                                          |
|-------------------------------------|----------------------------------------------------------------------|
| `fls -r -m <dir> <image>`           | Lista archivos y directorios en una imagen de disco.                 |
| `icat <image> <inode>`              | Recupera un archivo basado en su número de inode.                    |
| `tsk_gettimes -i <image>`           | Extrae marcas de tiempo de archivos en una imagen de disco.          |

---


