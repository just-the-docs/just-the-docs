---
title: 🛡️ Guía Análisis de Phishing
parent: Supervivencia Sin Esfuerzo
priority: 4
---
<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">

# 🛡️ **Guía Técnica para Detectar y Analizar Intentos de Phishing**

La **detección de phishing** es esencial para mantener la seguridad de los sistemas informáticos, proteger a los usuarios y mitigar riesgos organizacionales. En esta guía, aprenderás a **identificar correos fraudulentos** y a usar herramientas clave para analizar su legitimidad.

---

<div style="background-color: #2E3B4E; padding: 20px; text-align: center; border-radius: 8px; color: white; font-size: 28px; font-weight: bold;">
  🛡️ **Protégete del Phishing con Estrategias Efectivas**
</div>

---

## ✉️ **¿Qué es el Phishing?**

El **phishing** es un ataque cibernético que busca engañar a los usuarios para que proporcionen información confidencial (credenciales, datos bancarios, etc.) o realicen acciones perjudiciales, como descargar malware.

### **Características comunes de un ataque de phishing:**

- Enlaces sospechosos que redirigen a sitios falsificados.
- Solicitudes urgentes para ingresar información personal.
- Archivos adjuntos maliciosos.
- Correos provenientes de dominios o remitentes desconocidos.

---

## 🔍 **Análisis Forense de Correos Electrónicos**

El análisis de las **cabeceras de correos electrónicos** es crucial para detectar intentos de phishing. Aquí te explicamos cómo hacerlo.

### 🛠️ **Pasos para Obtener las Cabeceras del Correo:**

| **Cliente de Correo** | **Pasos para obtener cabeceras**                                                                 |
|-----------------------|--------------------------------------------------------------------------------------------------|
| **Gmail**             | Abre el correo > Haz clic en los tres puntos (⋮) > Selecciona **"Mostrar original"**.             |
| **Outlook**           | Abre el correo > Haz clic en los tres puntos (⋮) > Selecciona **"Ver fuente del mensaje"**.      |
| **Yahoo**             | Abre el correo > Haz clic en los tres puntos (⋮) > Selecciona **"Ver encabezado completo"**.      |
| **Thunderbird**       | Haz clic derecho sobre el correo > Selecciona **"Ver fuente del mensaje"**.                       |

---

### 🛠️ **Campos Clave a Analizar:**

| **Campo**                   | **Descripción**                                                                                       | **Indicadores de Phishing/Spoofing**                                    |
|-----------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| **From**                     | Dirección del remitente.                                                                             | Si el dominio es sospechoso o tiene errores tipográficos.               |
| **Reply-To**                 | Dirección para respuestas.                                                                          | Si es diferente al remitente, verifica su legitimidad.                  |
| **Received**                 | Ruta del correo por servidores.                                                                     | Si hay servidores desconocidos, revisa su confiabilidad.                |
| **X-Originating-IP**         | IP del servidor original.                                                                           | Realiza un análisis **Whois** si la IP parece sospechosa.               |
| **X-Authentication-Results** | Verificación SPF/DKIM/DMARC.                                                                         | Fallos en estas verificaciones son indicadores de suplantación.         |

> **Tip:** Usa herramientas automatizadas para analizar cabeceras rápidamente. Consulta la lista de herramientas más adelante.

---

## 🔐 **Tecnologías de Autenticación: SPF, DKIM y DMARC**

Para identificar correos legítimos, los servidores de correo utilizan tres tecnologías clave:

1. **SPF (Sender Policy Framework):** Confirma que el correo proviene de un servidor autorizado por el dominio.
2. **DKIM (DomainKeys Identified Mail):** Garantiza que el contenido del correo no ha sido modificado durante el tránsito.
3. **DMARC (Domain-Based Message Authentication, Reporting, and Conformance):** Combina SPF y DKIM para validar la autenticidad del correo.

| **Herramienta**           | **Función**                              | **Enlace**                               |
|---------------------------|------------------------------------------|------------------------------------------|
| **MXToolbox**             | Verifica registros SPF/DKIM/DMARC.       | [MXToolbox](https://mxtoolbox.com)       |
| **DMARC Analyzer**        | Analiza políticas DMARC implementadas.   | [DMARC Analyzer](https://www.dmarcian.com) |

> **Ejemplo práctico:** Si un correo falla en la autenticación DMARC, puede ser un indicador de que el remitente está suplantando el dominio.

---

## 🛠️ **Herramientas de Análisis de Phishing**

Para facilitar el análisis, aquí tienes una lista de herramientas útiles. Estas también están representadas en la **imagen de apoyo**.

| **Herramienta**           | **Descripción**                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------|
| **VirusTotal**            | Analiza enlaces y archivos para detectar amenazas.                                               |
| **PhishTank**             | Base de datos comunitaria de URLs phishing reportadas.                                           |
| **AbuseIPDB**             | Identifica IPs maliciosas asociadas a actividades sospechosas.                                    |
| **CheckShortURL**         | Expande enlaces acortados para comprobar su legitimidad.                                         |
| **Cuckoo Sandbox**        | Analiza archivos en un entorno aislado para detectar comportamientos maliciosos.                |
| **Microsoft SmartScreen** | Filtro integrado en productos de Microsoft para detectar correos fraudulentos.                  |
| **ThePhish**              | Herramienta open-source para automatizar el análisis de correos phishing.                       |
| **Mimecast Email Security** | Utiliza inteligencia artificial para filtrar correos maliciosos y proteger contra amenazas sofisticadas. |

![Imagen de Herramientas de Análisis](/assets/img/phis.jpeg)

> **Descarga la imagen**: [Herramientas de Análisis](https://www.example.com)

---

## 🧰 **Análisis Forense Avanzado**

Si necesitas un análisis más profundo, considera los siguientes enfoques:

1. **Revisión de Metadatos:**
   - Extrae los metadatos del archivo adjunto utilizando herramientas como **ExifTool**.
2. **Análisis de IP:**
   - Usa servicios como **IPinfo** o **AbuseIPDB** para identificar la ubicación y el proveedor del servidor.
3. **Entornos Aislados:**
   - Analiza los adjuntos o enlaces sospechosos en un sandbox, como **Cuckoo Sandbox** o **Any.Run**.
4. **Rastreo de Enlaces:**
   - Utiliza **CheckShortURL** o inspección manual para expandir y verificar enlaces acortados.

---

## 🔒 **Mejores Prácticas para Protegerte del Phishing**

1. **Verifica siempre la dirección del remitente.**
2. **No hagas clic en enlaces sospechosos.**
3. **Evita descargar archivos de remitentes desconocidos.**
4. **Habilita autenticación en dos pasos (2FA) siempre que sea posible.**
5. **Educa a los usuarios sobre los riesgos del phishing.**

---

## 📂 **Recursos Adicionales**

- [PhishTank: Base de datos de phishing](https://www.phishtank.com)
- [Guía oficial de SPF](https://www.openspf.org)
- [Analizador de Cabeceras de Gmail](https://toolbox.googleapps.com/apps/messageheader/)

---
<div style="text-align: center; margin: 40px 0;">
  <img src="/assets/images/cojo.png" alt="Firma" style="max-width: 30%; height: auto; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);">
</div>