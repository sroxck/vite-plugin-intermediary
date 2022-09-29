# vite-plugin-intermediary
自动创建导入导出中转文件，通常用于多文件导出统一单文件导入路径


## Feature

- 
- 
- 

## Requirement

- node version: >=16


## Install

``` zsh
npm i -g 
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
默认情况下,会监听指定`dir`目录下的文件HMR进行匹配,文件内容包含`export` 或`export default`,会在当前目录创建`output`文件,根据匹配到的导出模式,自动添加`export * as 'fileName' from 'filePath'` 或者 `export {default as 'fileName'} from 'filePath'`

## License
MiT
