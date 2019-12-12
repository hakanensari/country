module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'airbnb-base',
  'globals': {
    'hljs': 'readonly'
  },
  'rules': {
    'no-param-reassign': [
      'error',
      { 'props': false }
    ]
  }
}
