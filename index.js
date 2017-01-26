/* jshint node: true */
'use strict';

var Promise = require('ember-cli/lib/ext/promise');
var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-cli-deploy-delete-sourcemaps',

  createDeployPlugin: function(options) {
    return {
      name: options.name,

      didBuild: function(context) {
        var promises = context.distFiles
            .filter(function(file) {
              return file.match(/^assets\/.*\.map$/)
            })
            .map(function(file) {
              return path.join(context.distDir, file);
            })
            .map(function(file) {
              return new Promise((resolve, reject) => {
                fs.unlink(file, function(err) {
                  if (err) {
                    reject();
                  } else {
                    resolve();
                  }
                });
              })});
        return Promise.all(promises);
      }
    };
  }
};
