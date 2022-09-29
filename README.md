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
  dir: string, // 需要监听的目录
  include?: includeOptins[] // 包含的文件类型数组
  output: string, // 输出的中转文件
  auto?:boolean, // 是否自动扫描并生成,默认false
}
export type includeOptins = 'ts' | 'js' | 'vue' | 'md'

```


## Internal


## License
