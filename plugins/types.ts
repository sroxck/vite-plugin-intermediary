export interface Intermediary {
  dir: string,
  include?: includeOptins[]
  output: string,
  auto?:boolean
}
export type includeOptins = 'ts' | 'js' | 'vue' | 'md'
