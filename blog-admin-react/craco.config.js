const { whenProd } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890FF' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    plugins: [
      // whenProd生产环境生效
      ...whenProd(
        () => [
          new CompressionPlugin({ test: /\.(js|css)?$/i }),
          new BundleAnalyzerPlugin()
        ],
        []
      )
    ]
  }
}
