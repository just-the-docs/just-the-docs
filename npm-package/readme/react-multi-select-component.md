# react-multi-select-component

Simple and lightweight multiple selection dropdown component with `checkboxes`, `search` and `select-all`

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://react-multi-select-component.pages.dev/)
[![GitHub Actions Status](https://github.com/hc-oss/react-multi-select-component/workflows/NodeJS/badge.svg)](https://github.com/hc-oss/react-multi-select-component/actions)
[![NPM](https://img.shields.io/npm/v/react-multi-select-component.svg)](https://npm.im/react-multi-select-component)
[![gzip](https://badgen.net/bundlephobia/minzip/react-multi-select-component@latest)](https://bundlephobia.com/result?p=react-multi-select-component@latest)

## ✨ Features

- 🕶 Zero Dependency
- 🍃 Lightweight (<5KB)
- 💅 Themeable
- ✌ Written w/ TypeScript

## 🔧 Installation

```bash
npm i react-multi-select-component    # npm
yarn add react-multi-select-component # yarn
```

## 📦 Example

![Example](docs/images/preview.gif)

```tsx
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const Example = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default Example;
```

More examples can be found [here ↗](./docs/recipes)

## 👀 Props

| Prop                  | Description                                                                                                                                       | Type                         | Default        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `labelledBy`          | value for `aria-labelledby`                                                                                                                       | `string`                     |                |
| `options`             | options for dropdown                                                                                                                              | `[{label, value, disabled}]` |                |
| `value`               | pre-selected rows                                                                                                                                 | `[{label, value}]`           | `[]`           |
| `hasSelectAll`        | toggle 'Select All' option                                                                                                                        | `boolean`                    | `true`         |
| `isLoading`           | show spinner on select                                                                                                                            | `boolean`                    | `false`        |
| `shouldToggleOnHover` | toggle dropdown on hover option                                                                                                                   | `boolean`                    | `false`        |
| `overrideStrings`     | [localization ↗](docs/recipes/localization.md)                                                                                                    | `object`                     |                |
| `onChange`            | onChange callback                                                                                                                                 | `function`                   |                |
| `disabled`            | disable dropdown                                                                                                                                  | `boolean`                    | `false`        |
| `disableSearch`       | hide search textbox                                                                                                                               | `boolean`                    | `false`        |
| `filterOptions`       | [custom filter options (async supported) ↗](docs/recipes/custom-filter.md)                                                                        | `function`                   | Fuzzy Search   |
| `className`           | class name for parent component                                                                                                                   | `string`                     | `multi-select` |
| `valueRenderer`       | [custom dropdown header ↗](docs/recipes/custom-value.md)                                                                                          | `function`                   |                |
| `ItemRenderer`        | [custom dropdown option ↗](docs/recipes/custom-item.md)                                                                                           | `function`                   |                |
| `ClearIcon`           | Custom Clear Icon for Search                                                                                                                      | `ReactNode`                  |                |
| `ArrowRenderer`       | Custom Arrow Icon for Dropdown                                                                                                                    | `ReactNode`                  |                |
| `debounceDuration`    | debounce duraion for Search                                                                                                                       | `number`                     | `300`          |
| `ClearSelectedIcon`   | Custom Clear Icon for Selected Items                                                                                                              | `ReactNode`                  |                |
| `isCreatable`         | Allows user to create unavailable option(s) [example ↗](https://react-multi-select-component.pages.dev/?path=/story/creatable--creatable-default) | `boolean`                    | `false`        |
| `onCreateOption`      | allows to override newly created option [example ↗](https://react-multi-select-component.pages.dev/?path=/story/creatable--creatable-custom)      | `function`                   |                |

## 📝 Changelog

For every release changelog/migration-guide will be available in [releases](https://github.com/hc-oss/react-multi-select-component/releases)

## 🤠 Credits

- This project gets inspiration and several pieces of logical code from [react-multiple-select](https://github.com/Khan/react-multi-select/)
- [TypeScript](https://github.com/microsoft/typescript)

## 📜 License

MIT &copy; [harshzalavadiya](https://github.com/harshzalavadiya)
