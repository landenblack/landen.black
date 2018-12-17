

module.exports = function() {
    var fs = require('fs');

    this.createList = function(user, name) {
        var lists = this.jsonFile("./list/lists.json");
        var id = 0;
        for (let list in lists) {
            if (lists[list].listid > id) {
                id = lists[list].listid;
            }
        }
        console.log(id);
        ++id;
        console.log(id);
        
        console.log(lists);
        lists.push({
            "user":user,
            "listid":id.toString(),
            "name":name
        });
        console.log(lists);

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