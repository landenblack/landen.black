

module.exports = function() {
    var fs = require('fs');

    this.getLists = function(user) {
        var lists = this.jsonFile("./list/lists.json");
        user_lists = lists.filter(list => list.user === user);
    }

    this.getFile = function(path) {
        return fs.readFileSync(path).toString();
    }

    this.jsonFile = function(path) {
        return JSON.parse(this.getFile(path));
    }
}