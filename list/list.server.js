

module.exports = function() {
    var fs = require('fs');

    this.createList = function(user, name) {
        var lists = this.jsonFile("./list/lists.json");
        if (lists.length) {
            var id = lists[lists.length -1];
        } else {
            var id = "1";
        }
        lists.push({
            "user":user,
            "listid":id,
            "name":name
        });
        fs.writeFile("./list/lists.json", JSON.stringify(lists), (err)=> {
            if (err) throw err;
            console.log(`list ${name} created`);
        });
    }

    this.getLists = function(user) {
        var lists = this.jsonFile("./list/lists.json");
        var list_details = this.jsonFile("./list/listdetails.json");

        var user_lists = lists.filter(list => list.user === user);
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