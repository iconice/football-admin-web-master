const path = require('path')
const {
  override,
  fixBabelImports,
  addBabelPlugins,
  addWebpackResolve,
  addDecoratorsLegacy
  // addPostcssPlugins
} = require('customize-cra')

module.exports = override(
  ...addBabelPlugins('react-hot-loader/babel'),
  addWebpackResolve({
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    style: 'css'
  }),
  addDecoratorsLegacy()
  // addPostcssPlugins([
  //   require('postcss-px2rem')({
  //     remUnit: 75
  //   })
  // ])
)
