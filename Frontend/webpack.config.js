module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("crypto-browserify")
    }
  },
}