function getBooks() {
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({action: "get_books"}),
        dataType: "json",
        contentType: 'application/json; charset=utf-8'
    }).done(function (data) {
        console.log(data.a);
    });
}