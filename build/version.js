const childProcess = require('child_process')
module.exports = function(){
  let n = childProcess.execSync('git rev-list HEAD --count').toString()
  return childProcess.execSync('git describe --tags --long').toString().trim() + '-' + n
}
