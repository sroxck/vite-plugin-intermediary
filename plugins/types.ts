export interface Intermediary {
  dir: string,
  include?: includeOptins[]
  output: string
}
export type includeOptins = 'ts' | 'js' | 'vue'
