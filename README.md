# vite-plugin-intermediary
[中文](./README_zh.md)   

Automatically create an import and export transit file, Usually used to unify import paths    

![img](public/demo.gif)   

## Requirement

- node version: >=14

## Feature

- 

## Install

``` zsh
pnpm i vite-plugin-intermediary -D
```


## Usage


``` js
import { defineConfig } from 'vite'
import Intermediary from 'vite-plugin-intermediary'
export default defineConfig({
  plugins: [Intermediary({
    dir:'src/components',
    output:'index.ts',
  })]
})
```

## Options


``` ts
export interface Intermediary {
  dir: string, // watcher directive
  include?: includeOptins[] // file type list
  output: string, 
  auto?:boolean, //if true scan dir and create intermediary file to first run vite
}
export type includeOptins = 'ts' | 'js' | 'vue' | 'md'

```
