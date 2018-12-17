function pageLoad() {
    getBooks();
    getLists();
}

function getBooks() {
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
        for (let list in data) {

            $("#user-lists").append(listHTML(data[list]));

            for (let book in data[list].books) {
                console.log(data[list].books[book]);
            }

            $("<li>test").appendTo($("#user-lists ul:last-child"));
        }
        $('.sortable').sortable({
            connectWith: '.connected'
        });
    });
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