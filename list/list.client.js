function pageLoad() {
    getBooks(true);
}

function createList(name) {
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({action: "create_list", name: name}),
        contentType: 'application/json',
        dataType: "json"
    }).done(function (data) {
        console.log(data);
        
    });
}


function getBooks(get_lists) {
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({action: "get_books"}),
        contentType: 'application/json',
        dataType: "json"
    }).done(function (data) {
        console.log(data);
        for (let book in data) {
            $(".all-books").append(bookHTML(data[book]));
        }
        if (get_lists) {
            getLists();
        }
    });
}

function getLists() {
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({action: "get_lists"}),
        contentType: 'application/json',
        dataType: "json"
    }).done(function (data) {
        appendLists(data);
    });
}

function appendLists(data) {
    for (let list in data) {

        if ($(`#user-lists ul[data-id='${data[list].listid}']`).length === 0) {
            $(listHTML(data[list])).insertBefore("#new-list");

            for (let book in data[list].books) {
                let bookid = data[list].books[book].bookid;
                $(`.all-books li div[data-id='${bookid}'`)
                .appendTo("#user-lists ul").last();
            }
        }
    }
}

function listHTML(list) {
    return `
    <h2>${list.name}</h2>
    <ul class="sortable user-books" data-id=${list.listid}></ul>
    `;
}

function bookHTML(book) {
    return `
    <li>
      <div class="book" data-id="${book._id}">
          <div class="image"><img src="${book.picture}"></div>
          <div class="details">
            <span class="title">${book.title}</span>
            <span class="price">${book.price}</span>
          </div>
        </div>
    `;
}