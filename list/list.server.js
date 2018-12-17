

module.exports = function() {
    var fs = require('fs');

    this.createList = function(user, name) {
        var lists = this.jsonFile("./list/lists.json");
        var id = 0;
        for (let list in lists) {
            let listid = Number(lists[list].listid);
            if (listid > id) {
                id = listid;
            }
        }
        ++id;
        
        const new_list = {
            "user":user,
            "listid":id.toString(),
            "name":name
        };
        lists.push(new_list);

        this.writeJson("./list/lists.json", lists);

        return [new_list];
    }

    this.getLists = function(user) {
        var lists = this.jsonFile("./list/lists.json");
        var list_details = this.jsonFile("./list/listdetails.json");

        var user_lists = lists.filter(list => list.user === user);
        user_lists.map(list => list.books = getListBooks(list.listid, list_details));

        return user_lists;
    }

    this.getListBooks = function(list, list_details) {
        console.log(list_details);
        console.log( list_details.filter(details => details.listid === list));
        return list_details.filter(details => details.listid === list)
    }

    this.addBookToList = function(book, list, user) {
        var new_details = this.removeBook(book, user); //remove if currently exists
        new_details.push({
            "listid":list,
            "bookid":book
        }); //append to file
        fs.writeFile("./list/listdetails.json", JSON.stringify(new_details), (err)=> {
            if (err) throw err;
            console.log(`book added`);
        });
        
    }

    this.removeBook = function(book, user) {
        var current_lists = this.jsonFile("./list/lists.json");
        var list_details = this.jsonFile("./list/listdetails.json");

        var user_lists = current_lists.filter(list => list.user === user);
        for (let i in user_lists) {
            let list_id = user_lists[i].listid;
            list_details = list_details.filter(list => !(list.listid === list_id && list.bookid === book));
        }
        return list_details;
    }

    this.getFile = function(path) {
        return fs.readFileSync(path).toString();
    }

    this.jsonFile = function(path) {
        return JSON.parse(this.getFile(path));
    }

    this.writeJson = function(path, data) {
        fs.writeFile(path, JSON.stringify(data), (err)=> {
            if (err) throw err;
            console.log(`wrote to ${path}`);
        });
    }
}