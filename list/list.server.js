

module.exports = function() {
    var fs = require('fs');

    this.getLists = function(user) {
        console.log(user);
        var lists = this.jsonFile("./list/lists.json");
        console.log(lists);
        user_lists = lists.filter(list => list.user === user);
        console.log(user_lists);
        return user_lists;
    }

    this.getFile = function(path) {
        return fs.readFileSync(path).toString();
    }

    this.jsonFile = function(path) {
        return JSON.parse(this.getFile(path));
    }
}