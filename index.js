/* jshint node: true */
'use strict';

var rsvp = require('rsvp');
var fs = require('fs');
var path = require('path');

var Promise = rsvp.Promise;

module.exports = {
  name: 'ember-cli-deploy-delete-sourcemaps',

  createDeployPlugin: function(options) {
    return {
      name: options.name,

      didUpload: function(context) {
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
