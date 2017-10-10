module.exports = function(){
  return require('../package.json').version
  // const childProcess = require('child_process')
  // let n = childProcess.execSync('git rev-list HEAD --count').toString()
  // return childProcess.execSync('git describe --tags --long').toString().trim() + '-' + n
}
