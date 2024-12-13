---
title: 🛡️ Microsoft Sentinel
dparent: Supervivencia Sin Esfuerzo
priority: 4
---
<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">


## Introducción
Microsoft Sentinel es una plataforma SIEM que se utiliza para recopilar, analizar y correlacionar datos de seguridad. Las consultas de Kusto Query Language (KQL) son fundamentales para realizar búsquedas e investigaciones efectivas sobre los datos recopilados en Sentinel. En este cheatsheet, te proporcionamos las búsquedas más importantes y útiles en KQL para detectar incidentes de seguridad, junto con explicaciones claras en español.

## 1. Consultas Básicas en KQL

### 1.1 Buscar Eventos de Inicio de Sesión Fallidos
Detectar intentos fallidos de inicio de sesión puede ser clave para identificar ataques de fuerza bruta o intentos no autorizados.

**Consulta**:
```kql
SecurityEvent | where EventID == 4625 | project TimeGenerated, Account, Computer, FailureReason | order by TimeGenerated desc
```

**Explicación**:
- `EventID == 4625`: Filtra los eventos de inicio de sesión fallidos.
- `project`: Muestra las columnas seleccionadas (hora, cuenta, computadora y motivo del fallo).
- `order by TimeGenerated desc`: Ordena los eventos de más reciente a más antiguo.

### 1.2 Buscar Inicios de Sesión Exitosos en un Periodo de Tiempo Específico
Puedes analizar los inicios de sesión exitosos para detectar patrones de acceso inusuales.

**Consulta**:
```kql
SecurityEvent | where EventID == 4624 | where TimeGenerated > ago(1d) | project TimeGenerated, Account, Computer | order by TimeGenerated desc
```

**Explicación**:
- `EventID == 4624`: Filtra eventos de inicio de sesión exitoso.
- `ago(1d)`: Filtra los eventos que ocurrieron en las últimas 24 horas.
- `project`: Muestra las columnas de hora, cuenta y computadora.
- `order by`: Ordena los resultados de forma descendente para ver los eventos más recientes.

## 2. Detección de Anomalías y Actividades Sospechosas

### 2.1 Buscar Múltiples Inicios de Sesión Fallidos desde la Misma IP
Esta consulta detecta posibles ataques de fuerza bruta al correlacionar intentos de inicio de sesión fallidos desde la misma dirección IP.

**Consulta**:
```kql
SecurityEvent | where EventID == 4625 | summarize FailedAttempts = count() by SourceIP, bin(TimeGenerated, 5m) | where FailedAttempts > 5 | order by FailedAttempts desc
```

**Explicación**:
- `summarize FailedAttempts = count()`: Cuenta los intentos fallidos por dirección IP.
- `by SourceIP, bin(TimeGenerated, 5m)`: Agrupa por IP de origen y agrupa los eventos en intervalos de 5 minutos.
- `where FailedAttempts > 5`: Filtra las IPs con más de 5 intentos fallidos.

### 2.2 Buscar Cambios en los Privilegios de Usuario
Detectar cambios inesperados en los privilegios de los usuarios puede ser crucial para identificar escalamiento de privilegios o comportamientos maliciosos.

**Consulta**:
```kql
SecurityEvent | where EventID == 4732 | project TimeGenerated, Account, GroupName, Computer | order by TimeGenerated desc
```

**Explicación**:
- `EventID == 4732`: Evento de "un usuario añadido a un grupo".
- `project`: Muestra la hora, la cuenta, el grupo y la computadora donde ocurrió el evento.
- `order by`: Ordena los resultados por tiempo.

## 3. Análisis de Malware y Amenazas Avanzadas

### 3.1 Buscar Archivos Ejecutables Sospechosos en el Endpoint
Puedes detectar archivos ejecutables sospechosos buscando actividades en los endpoints que estén asociadas con programas potencialmente peligrosos.

**Consulta**:
```kql
DeviceFileEvents | where FileType == "Executable" | where FileName in ('powershell.exe', 'cmd.exe', 'mshta.exe') | project TimeGenerated, DeviceName, FileName, InitiatingProcessFileName | order by TimeGenerated desc
```

**Explicación**:
- `DeviceFileEvents`: Tabla que contiene eventos relacionados con archivos ejecutados en dispositivos.
- `FileType == "Executable"`: Filtra solo archivos ejecutables.
- `where FileName in ('powershell.exe', 'cmd.exe', 'mshta.exe')`: Filtra nombres de archivos comunes en ataques.
- `project`: Muestra las columnas de hora, nombre del dispositivo, nombre del archivo y nombre del proceso que lo inició.

### 3.2 Consultar Alertas de Microsoft Defender para Endpoint
Si tienes integrado Defender for Endpoint, puedes buscar alertas generadas por la protección avanzada de este servicio.

**Consulta**:
```kql
SecurityAlert | where ProductName == "Microsoft Defender for Endpoint" | where Severity == "High" | project TimeGenerated, AlertName, Computer, Description | order by TimeGenerated desc
```

**Explicación**:
- `SecurityAlert`: Tabla que contiene las alertas de seguridad.
- `ProductName == "Microsoft Defender for Endpoint"`: Filtra las alertas de Defender.
- `Severity == "High"`: Filtra alertas de alta gravedad.
- `project`: Muestra las columnas de hora, nombre de alerta, computadora y descripción.

## 4. Análisis de Correlación de Eventos y Respuesta

### 4.1 Correlación de Inicios de Sesión Fallidos y Bloqueos de Cuenta
Esta consulta puede ayudarte a investigar eventos donde una cuenta es bloqueada después de varios intentos fallidos de inicio de sesión.

**Consulta**:
```kql
SecurityEvent | where EventID == 4625 | join kind=inner (SecurityEvent | where EventID == 4740 ) on Account | project TimeGenerated, Account, SourceIP, Computer | order by TimeGenerated desc
```

**Explicación**:
- `join kind=inner`: Une dos tablas (los inicios de sesión fallidos y los bloqueos de cuenta) basados en la cuenta.
- `EventID == 4740`: Evento de cuenta bloqueada.
- `project`: Proyecta las columnas relevantes.

## 5. Respuesta Rápida a Incidentes

### 5.1 Detectar y Automatizar Respuesta a IPs Maliciosas
Puedes detectar accesos desde IPs conocidas como maliciosas y automatizar su bloqueo.

**Consulta**:
```kql
SecurityEvent | where SourceIP in ('192.168.1.100', '203.0.113.45') | project TimeGenerated, Account, SourceIP, Computer | order by TimeGenerated desc
```

**Explicación**:
- `where SourceIP in ('192.168.1.100', '203.0.113.45')`: Filtra las IPs maliciosas conocidas.
- `project`: Muestra las columnas de hora, cuenta, IP de origen y computadora.
- `order by`: Ordena los resultados por tiempo.

<hr style="border: none; border-top: 1px solid #7e57c2; margin: 40px 0; width: 100%;">

<div style="text-align: center; margin: 40px 0;">
  <img src="/assets/images/cojo.png" alt="Firma" style="max-width: 30%; height: auto; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);">
</div>
