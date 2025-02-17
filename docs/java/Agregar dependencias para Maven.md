---
title: Agregar dependencias para Maven
parent: Java
nav_order: 2.2
---
## 🔍 **¿Dónde encontrar las dependencias para Maven?**

### 📌 **1. Maven Central Repository**

Puedes buscar cualquier dependencia en el sitio web oficial:
🔗 https://mvnrepository.com/

### 📌 **2. Cómo buscar una dependencia**

1. **Ingresa a [Maven Repository](https://mvnrepository.com/)**
2. **Escribe el nombre de la biblioteca** que necesitas, por ejemplo, `rest-assured`.
3. **Selecciona la versión** adecuada (usualmente la más reciente o la compatible con tu proyecto).
4. **Copia el código XML** de la dependencia y pégalo en `pom.xml`.

---

## 📌 **Estructura de un `pom.xml` con la sección `<dependencies>`**

Si no incluyes esta sección, tu proyecto no podrá descargar automáticamente las bibliotecas necesarias.

Si agregas una sola dependencia sin la etiqueta `<dependencies>`, Maven no podrá reconocerla.

Si el archivo `pom.xml` aún no tiene la sección `<dependencies>`, debes agregarla dentro del `<project>`:

```xml
xml
CopiarEditar
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.miempresa</groupId>
    <artifactId>mi-proyecto</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <!-- Sección de dependencias -->
    <dependencies>
        <!-- Dependencia para pruebas de API con REST Assured -->
        <dependency>
            <groupId>io.rest-assured</groupId>
            <artifactId>rest-assured</artifactId>
            <version>5.3.2</version>
            <scope>test</scope>
        </dependency>

        <!-- Dependencia para pruebas unitarias con JUnit -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

        <!-- Dependencia para manejar JSON con Jackson -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.15.2</version>
        </dependency>
    </dependencies>
</project>

```

## 📌 **Ejemplo: Agregar REST Assured**

Si quieres usar **REST Assured** para pruebas de APIs, puedes buscar `"rest-assured"` en Maven Repository.

🔹 **Código para `pom.xml`:**

```xml
xml
CopiarEditar
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <version>5.3.2</version>
    <scope>test</scope>
</dependency>

```

> 🔹 El atributo <scope>test</scope> indica que la dependencia solo se usa en pruebas.
> 

---

## 📌 **Ejemplo: Agregar Selenium WebDriver**

Si necesitas Selenium para automatización web, busca `"selenium-java"` en Maven Repository.

🔹 **Código para `pom.xml`:**

```xml
xml
CopiarEditar
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.19.1</version>
</dependency>

```

---

## 📌 **Ejemplo: Agregar JUnit para pruebas**

Si quieres ejecutar pruebas unitarias con JUnit, busca `"junit"` en Maven Repository.

🔹 **Código para `pom.xml`:**

```xml
xml
CopiarEditar
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>

```

---

## 📌 **Ejemplo: Agregar Jackson para manejar JSON**

Si necesitas parsear JSON con Jackson, busca `"jackson-databind"` en Maven Repository.

🔹 **Código para `pom.xml`:**

```xml
xml
CopiarEditar
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version>
</dependency>

```

---

## 🎯 **Resumen**

1. **Ir a [Maven Repository](https://mvnrepository.com/)**.
2. **Buscar la dependencia** que necesitas.
3. **Copiar y pegar** el código XML en `pom.xml`.
4. **Ejecutar** `mvn clean install` para descargar las dependencias.

---

## 📌 **¿Cómo validar si Maven descarga las dependencias correctamente?**

Después de agregar dependencias al `pom.xml`, ejecuta este comando en la terminal **dentro de la carpeta del proyecto**:

```

mvn clean install

```

📌 Esto descargará las dependencias en el **repositorio local de Maven** (`.m2/repository`) y las preparará para su uso en el proyecto.