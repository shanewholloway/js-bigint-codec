import rpi_jsy from 'rollup-plugin-jsy-lite'
import { terser as rpi_terser } from 'rollup-plugin-terser'

import pkg from './package.json'
const pkg_name = pkg.name.replace('-', '_')

const configs = []
export default configs

const sourcemap = true
const external = []
const plugins = [rpi_jsy()]
const plugins_min = plugins.concat([
  rpi_terser({}),
])


add_jsy('index', pkg_name)
add_jsy('bigint_encode_into')
add_jsy('bigint_encode')
add_jsy('bigint_decode')


function add_jsy(src_name, module_name) {
  if (!module_name) module_name = src_name

  configs.push({
    input: `code/${src_name}.jsy`,
    output: [
      { file: `cjs/${src_name}.cjs`, format: 'cjs', exports:'named', sourcemap },
      { file: `umd/${src_name}.js`, format: 'umd', name:module_name, exports:'named', sourcemap },
      { file: `esm/${src_name}.mjs`, format: 'es', sourcemap },
    ],
    plugins, external
  }, {
    input: `code/${src_name}.jsy`,
    output: [
      { file: `umd/${src_name}.min.js`, format: 'umd', name:module_name, exports:'named', sourcemap },
    ],
    plugins: plugins_min, external
  })
}
