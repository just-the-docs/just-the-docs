---
title: Iniciar un proyecto Maven
parent: Java
nav_order: 2.1
---
En intelliJ ir a ‘New project’, completar nombre del proyecto y en build system: Maven

Un **proyecto Maven en Java** es una estructura estandarizada para gestionar y construir proyectos en Java utilizando Apache Maven, una herramienta de automatización de compilación y gestión de dependencias.

### 📌 **¿Qué es Maven?**

Maven es una herramienta de construcción y gestión de proyectos que simplifica el proceso de desarrollo en Java al proporcionar:

- **Gestión de dependencias**: Descarga automáticamente las bibliotecas necesarias desde el repositorio de Maven.
- **Estructura estandarizada**: Organiza el código fuente, pruebas y recursos de manera consistente.
- **Automatización de compilación**: Facilita la compilación, empaquetado y despliegue del código.
- **Ejecutar pruebas automáticamente**: Usa frameworks como JUnit o TestNG.

---

### 🏗 **Estructura de un Proyecto Maven**

Cuando creas un proyecto Maven, este tiene una estructura predeterminada:

```
bash
CopiarEditar
mi-proyecto/
│── src/
│   ├── main/java/      # Código fuente
│   ├── main/resources/ # Archivos de configuración
│   ├── test/java/      # Código de pruebas
│── pom.xml             # Archivo de configuración del proyecto
│── target/             # Directorio donde se generan los archivos compilados

```

### 📌 **El archivo `pom.xml` (Project Object Model)**

Es el archivo de configuración central de Maven. En él se definen:

- El **grupo y nombre** del proyecto.
- Las **dependencias** externas (bibliotecas necesarias).
- Los **plugins** de Maven utilizados.
- Las fases de **compilación y empaquetado**.

Ejemplo de un `pom.xml` básico:

```xml
xml
CopiarEditar
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ejemplo</groupId>
    <artifactId>mi-proyecto</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <dependencies>
        <!-- Dependencia de JUnit para pruebas -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>

```

---

### 🚀 **Comandos Maven más usados**

📌 Se ejecutan en la terminal dentro del directorio del proyecto:

| Comando | Descripción |
| --- | --- |
| `mvn clean` | Elimina archivos generados en `target/`. |
| `mvn compile` | Compila el código fuente. |
| `mvn test` | Ejecuta las pruebas unitarias. |
| `mvn package` | Genera un `.jar` o `.war`. |
| `mvn install` | Instala el paquete en el repositorio local. |
| `mvn dependency:tree` | Muestra el árbol de dependencias del proyecto. |

---

### 🎯 **Ventajas de usar Maven**

✅ Estandarización del proyecto.

✅ Gestión automática de dependencias.

✅ Automatización de compilación, pruebas y empaquetado.

✅ Integración con CI/CD (Jenkins, GitHub Actions).

---

### ¿Qué es **Surefire** en Maven? 🚀

**Surefire** es un **plugin de Maven** diseñado para ejecutar pruebas automatizadas en proyectos Java. Es el encargado de ejecutar los tests cuando corres el comando:

mvn test

### 🔍 **¿Para qué se usa?**

- Ejecutar pruebas unitarias y de integración.
- Generar reportes de ejecución de tests.
- Determinar si el build de Maven es exitoso o no basado en los tests.

### 📌 **¿Cómo funciona?**

Cuando ejecutas `mvn test`, Surefire busca archivos de prueba que cumplan ciertas convenciones de nombres:

1. **Clases que terminan en** `Test.java` (Ejemplo: `MyClassTest.java`).
2. **Clases que comienzan con** `Test` (Ejemplo: `TestMyClass.java`).
3. **Clases que terminan en** `Tests.java` (Ejemplo: `MyClassTests.java`).

Luego, usa el framework de pruebas configurado (JUnit o TestNG) para ejecutar los tests.

### 📌 **Comandos útiles**

🔹 Ejecutar **todos los tests**:

```
sh
CopiarEditar
mvn test

```

🔹 Ejecutar **un test específico**:

```
sh
CopiarEditar
mvn -Dtest=MiClaseTest test

```

🔹 Ejecutar **un método específico dentro de una clase de test**:

```
sh
CopiarEditar
mvn -Dtest=MiClaseTest#miMetodoTest test

```

---

### 🛠 **¿Por qué Surefire no detecta mis tests?**

Si Maven no está ejecutando los tests, puede ser por estas razones:

1. **El nombre de la clase no sigue las convenciones** (`Test.java`, `Test*.java`, `Tests.java`).
2. **Los tests no están en la carpeta correcta** (`src/test/java`).
3. **El plugin Surefire no está configurado correctamente en el `pom.xml`**.
4. **No tienes las dependencias de JUnit o TestNG correctamente declaradas**.

---

### 🚀 **Resumen**

- **Surefire** es el plugin de Maven que ejecuta los tests.
- Funciona con **JUnit y TestNG**.
- Sigue ciertas **convenciones de nombres** para detectar los tests.
- Puedes personalizarlo en el `pom.xml`.
- Si no detecta los tests, revisa nombres, ubicaciones y dependencias.

Si sigues con problemas, dime y te ayudo a depurarlo. 😃💡

### 🔍 **¿Por qué funciona sin definirlo?**

- Maven tiene un conjunto de **plugins predeterminados** que usa cuando ejecutas ciertos comandos.
- **El plugin `maven-surefire-plugin` está incluido por defecto** en Maven cuando ejecutas `mvn test`, incluso si no lo declaras en tu `pom.xml`.
- Actualmente, la versión predeterminada utilizada por Maven es `2.22.2` (aunque esto puede cambiar dependiendo de la versión de Maven que tengas instalada).

### 🛠 **¿Cómo saber qué versión de Surefire está usando Maven?**

Si quieres verificar qué versión de Surefire se está ejecutando en tu entorno, puedes usar el siguiente comando:

```
sh
CopiarEditar
mvn help:effective-pom

```

Este comando mostrará el `pom.xml` efectivo que está usando Maven, incluyendo todos los plugins predeterminados.