var through = require('through2');
var falafel = require('falafel');
var config = require('config'); // FIXME hard reload this each time in order to support `watchify`
var util = require('util');

var getTransform = function (expose) {
    return function (file, opts) {
        if (!/\.(js|jsx|coffee)$/.test(file)) return through();

        var data = '';

        return through(function write(chunk, enc, next) {
            data += chunk.toString('utf8');
            next();
        }, function end(done) {
            this.push(output = String(falafel(data, function (node) {
                if (node.name === (expose || '_require') &&
                    node.parent &&
                    node.parent.arguments &&
                    node.parent.arguments.length) {
                    node.update('window.require');
                }
            })));
            this.push(null);
            done();
        });
    }
}

module.exports = getTransform('_require');

module.exports.with = getTransform;

module.exports.attachShim = function (expose) {
    global[expose || '_require'] = function shim_require() {
        return {};
    };
}