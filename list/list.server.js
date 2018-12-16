module.exports = function() {
    this.test = function(word) {
        console.log('test');
        return fs.readFileSync('./books.json').toString();
    }
}