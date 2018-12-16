

module.exports = function() {
    var fsz = require('fs');

    this.test = function(word) {
        console.log('test');
        return fsz.readFileSync('./books.json').toString();
    }
}