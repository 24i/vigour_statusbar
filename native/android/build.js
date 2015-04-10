#!/usr/bin/env node
var spawn = require('child_process').spawn
  , fs = require('vigour-fs')
  , log = require('npmlog')
  , Promise = require('promise')
  , path = require('path')

  // paths
  , srcPath = path.join(__dirname, 'src')
  , aarDir = path.join(srcPath, 'lib', 'build', 'outputs', 'aar')

log.info('building .aar files from source')

function exe (command, cwd) {
  var args = command.split(' ')
  var fnName = args[0]
  args = args.splice(1, args.length - 1)
  return new Promise(function (resolve, reject) {
    log.info('Executing', command)
    if (cwd === '') {
      cwd = process.cwd()
    }
    log.info('in', cwd)
    var call = spawn( fnName , args , { cwd: cwd } )
    call.stdout.on('data', function (data) {
      process.stdout.write(data)
    });

    call.stderr.on('data', function (data) {
      process.stderr.write(data)
    });

    call.on('close', function(code) {
                        if (code === 0) {
                          resolve()
                        } else {
                          reject()
                        }
                      })
  })
}

function assemble() {
  return exe('./gradlew assemble', srcPath)
}

function copyAars() {
  var src = path.join()
  log.info("copying .aar files from ", aarDir)
  fs.readdirSync(aarDir).forEach(function(file) {
    console.log(file)
    var dst = path.join(__dirname, 'statusbar' + file.substr(file.indexOf('-')))
    console.log(file+' -> '+dst)
    fs.writeFileSync(dst, fs.readFileSync(path.join(aarDir, file)))
  })
  log.info('done')
}

Promise.resolve()
.then(assemble)
.then(copyAars)
.catch(function(reason) {
  log.error(reason)
})
