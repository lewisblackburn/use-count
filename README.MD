![use-count](docs/use-count.jpg)

![CI Status](https://github.com/lewisblackburn/use-count/actions/workflows/development.yml/badge.svg)

React Hook to use realtime countapi.xyz data and display it in your application.

# Features

- 📦 **Tiny**: `use-count` weighs in at **less than** 6.71 KB minified and gzipped.
- 🌳 **Universal**: we dist esm and cjs modules.
- 👨‍💻 **Developer friendly**: Helpful development messages that are stripped away in production
- ⌨️ **Strongly typed**: `use-count` is written in TypeScript and encourages good practices this way

## Installation

##### With NPM

> `npm i --save use-count`

##### Or, with yarn:

> `yarn add use-count`

## Usage

```tsx
import { useCount } from 'use-count';

const App = () => {
  const { value: hits } = useCount('namespace', 'key');

  return <p>{hits}</p>;
};
```
