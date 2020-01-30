import rpi_jsy from 'rollup-plugin-jsy-lite'
import { terser as rpi_terser } from 'rollup-plugin-terser'

const configs = []
export default configs

const sourcemap = true
const external = []
const plugins = [rpi_jsy()]
const plugins_min = plugins.concat([
  rpi_terser({}),
])


add_jsy('index')
add_jsy('bigint_encode_into')
add_jsy('bigint_encode')
add_jsy('bigint_decode')


function add_jsy(name) {
  configs.push({
    input: `code/${name}.jsy`,
    output: [
      { file: `cjs/${name}.js`, format: 'cjs', exports:'named', sourcemap },
      { file: `umd/${name}.js`, format: 'umd', name, exports:'named', sourcemap },
      { file: `esm/${name}.mjs`, format: 'es', sourcemap },
    ],
    plugins, external
  }, {
    input: `code/${name}.jsy`,
    output: [
      { file: `umd/${name}.min.js`, format: 'umd', name, exports:'named', sourcemap },
    ],
    plugins: plugins_min, external
  })
}
