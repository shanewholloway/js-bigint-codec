import rpi_jsy from 'rollup-plugin-jsy-lite'

const configs = []
export default configs

const sourcemap = true
const external = []
const plugins = [rpi_jsy()]


add_jsy('bigint_codec')
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
    plugins, external })
}
