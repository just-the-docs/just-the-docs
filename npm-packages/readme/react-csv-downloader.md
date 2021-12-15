# React CSV Downloader

[![Renovate badge][renovate-badge]][renovate]
[![CircleCI Status][build-badge]][build]
[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]

A simple react component to allow download CSV file from js object

## Installation

```sh
npm install --save react-csv-downloader
```

## Usage

Use with children component

```jsx
import CsvDownloader from 'react-csv-downloader';
<CsvDownloader>
  <button>Download</button>
</CsvDownloader>;
```

Use without children component

```jsx
<CsvDownloader text="Download" />
```

### Datas

pass the downloaded datas as a component prop

```jsx
const datas = [
  {
    cell1: 'row 1 - cell 1',
    cell2: 'row 1 - cell 2',
  },
  {
    cell1: 'row 2 - cell 1',
    cell2: 'row 2 - cell 2',
  },
];

<CsvDownloader datas={datas} />;
```

### Datas (on demand with async function resolver)

pass a function to compute datas to be downloaded

```jsx
const asyncFnComputeDate = () => {
  // do whatever you need async
  return Promise.resolve([
    {
      cell1: 'row 1 - cell 1',
      cell2: 'row 1 - cell 2',
    },
    {
      cell1: 'row 2 - cell 1',
      cell2: 'row 2 - cell 2',
    },
  ]);
};

<CsvDownloader datas={asyncFnComputeDate} />;
```

### Column

pass the columns definition as a component prop to change the cell display name. If column isn't passed the cell display name is automatically defined with datas keys

```jsx
const columns = [
  {
    id: 'cell1',
    displayName: 'Cell 1',
  },
  {
    id: 'cell2',
    displayName: 'Cell 2',
  },
];

<CsvDownloader columns={columns} />;
```

You can also use the columns definition to set the columns display order

## Props

| Name           | Type                         | Default | Required | Description                                                                         |
| -------------- | ---------------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| columns        | array of object              | null    | false    | Columns definition                                                                  |
| datas          | array of object/Func/Promise | null    | true     | Downloaded datas or a Promise or a function that can resolve data on demand (async) |
| filename       | string                       | null    | true     | You can pass the filename without extension. The extension is automatically added   |
| extension      | string                       | '.csv'  | false    | You can pass the file extension, note that it will affect filename                  |
| separator      | string                       | ','     | false    | Columns separator                                                                   |
| noHeader       | boolean                      | false   | false    | If `true` the header isn't added to the csv file                                    |
| prefix         | string or boolean            | false   | false    | Filename prefix. If `true` prefix becomes a timestamp                               |
| suffix         | string or boolean            | false   | false    | Filename suffix/postfix. If `true` suffix becomes a timestamp                       |
| text           | string                       | null    | false    | Download button text. Used if no children component.                                |
| wrapColumnChar | string                       | ''      | false    | Character to wrap every data and header value with.                                 |
| bom            | boolean                      | true    | false    | Activate or deactivate bom mode                                                     |
| newLineAtEnd   | boolean                      | false   | false    | Insert new line at end of file.                                                     |
| disabled       | boolean                      | false   | false    | If `true` the download process is blocked.                                          |
| meta           | boolean                      | false   | false    | If `true` the downloaded file will contain meta instrution sep to help microsoft excel and open office to recognize the sepator character.                                          |

All other props are passed to button or wrapping component.

## Full example

pass the downloaded datas as a component prop

```jsx
render() {
  const columns = [{
    id: 'first',
    displayName: 'First column'
  }, {
    id: 'second',
    displayName: 'Second column'
  }];

  const datas = [{
    first: 'foo',
    second: 'bar'
  }, {
    first: 'foobar',
    second: 'foobar'
  }];

  return (
    <div>
      <CsvDownloader
        filename="myfile"
        extension=".csv"
        separator=";"
        wrapColumnChar="'"
        columns={columns}
        datas={datas}
        text="DOWNLOAD" />
    </div>
  );
}

// content of myfile.csv
// 'First column';'Second column'
// 'foo';'bar'
// 'foobar';'foobar'
```

## Get CSV contents

If you just need to get CSV contents, use `import { toCsv } from 'react-csv-downloader';` to import toCsv function and use it directly.

## License

[MIT License](http://opensource.org/licenses/MIT)

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg
[renovate]: https://renovatebot.com/
[build-badge]: https://circleci.com/gh/dolezel/react-csv-downloader.svg?style=svg
[build]: https://circleci.com/gh/dolezel/workflows/react-csv-downloader
[deps-badge]: https://david-dm.org/dolezel/react-csv-downloader.svg
[deps]: https://david-dm.org/dolezel/react-csv-downloader
[dev-deps-badge]: https://david-dm.org/dolezel/react-csv-downloader/dev-status.svg
[dev-deps]: https://david-dm.org/dolezel/react-csv-downloader#info=devDependencies
