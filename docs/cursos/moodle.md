---
layout: default
title: Desenvolvimento de Plugins para Moodle
parent: Cursos
nav_order: 5
---

{: .no_toc }
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Most lists can be rendered with pure Markdown.

## Instalação em ambiente básico

Pacotes mínimos em sistema operacional *Debian 11*

```bash
apt-get install php php-intl php-cli php-gd php-curl php-xml php-mbstring php-zip mariadb-server php-mysql
```

## Estrutura mínima de um Plugin


```php
<?php
echo "olá";
```

## Task list

<div class="code-example" markdown="1">
- [ ] hello, this is a todo item
- [ ] hello, this is another todo item
- [x] goodbye, this item is done
</div>
```markdown
- [ ] hello, this is a todo item
- [ ] hello, this is another todo item
- [x] goodbye, this item is done
```

## Definition list

Definition lists require HTML syntax and aren't supported with the GitHub Flavored Markdown compiler.

<div class="code-example" markdown="1">
<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>
</div>
```html
<dl>
  <dt>Name</dt>
  <dd>Godzilla</dd>
  <dt>Born</dt>
  <dd>1952</dd>
  <dt>Birthplace</dt>
  <dd>Japan</dd>
  <dt>Color</dt>
  <dd>Green</dd>
</dl>
```
