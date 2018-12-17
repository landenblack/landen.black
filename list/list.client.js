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
        appendLists(data);
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

        if ($(`#user-lists div ul[data-id='${data[list].listid}']`).length === 0) {
            $(listHTML(data[list])).insertBefore("#new-list");

            for (let book in data[list].books) {
                let bookid = data[list].books[book].bookid;
                $(`.all-books li div[data-id='${bookid}'`).parent()
                .appendTo($("#user-lists div ul").last());
            }
        }
    }
    $(".user-books, .all-books").sortable({
        connectWith: ".sortable"
    });
    $( ".sortable" ).sortable({
        update: function( event, ui ) {
            if (this === ui.item.parent()[0]) {
                let book = ui.item[0];
                let bookid = $(book).children().data('id');
                if ($(book).parent().hasClass('all-books')) {
                    removeBook(bookid);
                } else {
                    let list = $(book).parent().data('id');
                    addBookToList(bookid, list);
                }
            }
        }
    });
}

function addBookToList(book, list) {
    console.log(`add ${book} to ${list}`);
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({action: "add_book", book: book, list: list}),
        contentType: 'application/json',
        dataType: "json"
    }).done(function (data) {
        console.log(data);
    });
}

function removeBook(book) {
    console.log(`remove ${book}`);
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({action: "remove_book", book: book}),
        contentType: 'application/json',
        dataType: "json"
    }).done(function (data) {
        console.log(data);
    });
}

function listHTML(list) {
    return `
    <div class="user-list">
    <h2>${list.name}</h2><h2 class="delete-list">delete list</h2>
    <ul class="sortable user-books" data-id=${list.listid}></ul>
    </div>
    `;
}

function bookHTML(book) {
    return `
    <li class="book">
      <div data-id="${book._id}">
          <div class="image"><img src="${book.picture}"></div>
          <div class="details">
            <span class="title">${book.title}</span>
            <span class="price">${book.price}</span>
          </div>
        </div>
    `;
}