

module.exports = function() {
    var fs = require('fs');

    this.getLists = function(user) {
        var lists = this.jsonFile("./list/lists.json");
        var user_lists = lists.filter(list => list.user === user);

        var list_details = this.jsonFile("./list/listdetails.json");
        user_lists.map(list => list.books = getListBooks(list.listid, list_details));
        
        return user_lists;
    }

    this.getListBooks = function(list, list_details) {
        return list_details.filter(details => details.listid === list)
    }

    this.getFile = function(path) {
        return fs.readFileSync(path).toString();
    }

    this.jsonFile = function(path) {
        return JSON.parse(this.getFile(path));
    }
}