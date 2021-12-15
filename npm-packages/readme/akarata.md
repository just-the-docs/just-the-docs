# Akarata

[![Build Status](https://travis-ci.org/ikhsanalatsary/akarata.svg?branch=master)](https://travis-ci.org/ikhsanalatsary/akarata)
[![codecov](https://codecov.io/gh/ikhsanalatsary/akarata/branch/master/graph/badge.svg)](https://codecov.io/gh/ikhsanalatsary/akarata)
[![npm](https://img.shields.io/npm/v/akarata.svg?color=blue)](http://npm.im/akarata) [![Greenkeeper badge](https://badges.greenkeeper.io/ikhsanalatsary/akarata.svg)](https://greenkeeper.io/)

[README English version](./README.en.md)

Akarata adalah pustaka JavaScript untuk mengambil akar kata/suku kata(stem) dari kata yang berimbuhan awal ataupun akhir pada bahasa Indonesia. Akarata diambil dari kata "akar kata", agar lebih pendek saat penyebutannya.

Akarata diilhami dari stem kata bahasa Indonesia berdasarkan Porter Stemmer, dengan menggunakan algoritma yang dipaparkan dalam _paper_ [**A Study of Stemming Effects on Information Retrieval in Bahasa Indonesia**](http://www.illc.uva.nl/Publications/ResearchReports/MoL-2003-02.text.pdf), oleh Fadillah Z Tala.

Akarata dibuat secara umum bisa berjalan di server menggunakan `Node.js` maupun di browser terbaru bahkan di `react-native` sekalipun. Namun perlu memperhatikan kompatibilitas dari _platform_ tersebut. Cek di [Kompatibilitas fungsi](#kompatibilitas-fungsi)

## Dibutuhkan

tslib >= 1.9.0

## Instalasi

npm:

    npm install --save tslib akarata

yarn:

    yarn add tslib akarata

## Kompatibilitas fungsi

Karena akarata di dalam fungsinya menggunakan [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes). Maka jika anda menggunakan akarata pada `Node.js` versi 4, _browser_ Edge < v14, IE, Chrome < v47, Firefox < 43, Safari < v9 dan lain-lain([lihat tabel](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Browser_compatibility)) maka membutuhkan [`polyfill`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill). Untuk caranya bisa lihat di bagian [Menambah polyfill](#menambah-polyfill)

## Menambah polyfill

Lewati langkah ini jika _platform_ didukung.

Menggunakan `npm`:

    npm i ts-polyfill

Menggunakan `yarn`:

    yarn add ts-polyfill

### Gunakan polyfill

Muat ini sebelum memuat pustaka akarata, biasanya taruh diatasnya.

pada node.js:

    require('ts-polyfill/lib/es2016-array-include');

pada ES2015+ / Babel / TypeScript:

    import 'ts-polyfill/lib/es2016-array-include';

### Hanya menggunakan script tag:

Jika tidak ingin melakukan instalasi `ts-polyfill` dan hanya menjalankan di _browser_. Maka salin kode yang ada di dokumentasi [`polyfill`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill)

    <script type="javascript">
      // salin kode disini
    <script>

## Penggunaan

### Muat pustaka akarata

ES2015+ / Babel / TypeScript:

    // muat pustakanya
    import * as akarata from 'akarata';
    // or
    import akarata from 'akarata';

CommonJS/ UMD / NodeJS:

    // muat pustakanya
    var akarata = require('akarata');

Michael Jackson script/ MJS / NodeJS `experimental-modules`:

    // muat pustakanya
    import * as akarata from 'akarata';
    // or
    import akarata from 'akarata';

`unpkg.com`:

    // sejak akarata versi > 0.1.5
    // unpkg.com/:package@:version/:file
    // catatan `.min` menandakan versi kompres-nya
    // sebagai contoh
    import * as akarata from 'https://unpkg.com/akarata@0.2.0/bundles/index.esm.js';
    // atau
    import akarata from 'https://unpkg.com/akarata@0.2.0/bundles/index.esm.min.js';

    // atau url absolut, secara implisit ke bundles/index.umd.js
    import akarata from 'https://unpkg.com/akarata';

### Kemudian bisa digunakan:

    // panggil fungsi stem
    akarata.stem('menikah'); // nikah

Atau mencobanya langsung dari web: [akarata.netlify.com](https://akarata.netlify.com).

## Masalah

Karena pustaka ini masih tahap development, jika diketahui ada masalah silakan buat [tiket baru](https://github.com/ikhsanalatsary/akarata/issues/new)

## Berkontribusi

Awalnya, pustaka ini merupakan implementasi dari sistem penganalisis untuk Bahasa Indonesia, dari proyek [Apache Lucene](http://lucene.apache.org/), ke dalam bahasa JavaScript.

### Referensi

1. [Situs Resmi Kamus Bahasa Indonesia](http://bahasa.kemdiknas.go.id/kbbi/index.php)
2. Untuk mencari dan memverifikasi kata Bahasa Indonesia, [Kateglo Bahtera](http://kateglo.com/)
3. Artikel Wikipedia yang berjudul [Prefiks dalam Bahasa Indonesia](http://id.wikipedia.org/wiki/Prefiks_dalam_bahasa_Indonesia)

### Langkah-langkah

1. Proyek ini membutuhkan versi Node.js >= 8.5
2. _Fork_ proyek ini
3. Buat branch untuk fitur Anda (`git checkout -b my-new-feature`)
4. Buat tes kasus untuk fitur anda pada folder `__tests__` dan jalankan `npm test`
5. _Commit_ perubahan-perubahan yang Anda buat (`git commit -am 'Tambahkan fitur baru'`)
6. _Push_ ke branch itu (`git push origin my-new-feature`)
7. Ajukan **_Pull Request_** baru

## Terima kasih

Setelah bersyukur kepada Allah Subhanahu Wa Ta'ala, kami ingin mengucapkan terima kasih kepada:

- Fadillah Z Tala & [Apache Lucene](http://lucene.apache.org/) sehingga kami dapat mulai membuat pustaka ini
- Penyedia [Kateglo Bahtera](http://kateglo.com/), karena telah menyediakan API nya sehingga saya bisa memilih & memisahkan kata-kata ambigu, dan akhirnya memeriksa validitas hasil kata.
- Adinda Praditya & [Indonesian Stemmer](https://github.com/apraditya/indonesian_stemmer). Beliau sebagai _coach_ dan berkat pustakanya maka pustaka ini bisa diimplementasi ke dalam bahasa JavaScript.
