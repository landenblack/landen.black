function hello() {
    console.log('doing');
    $.ajax({
        type: "POST",
        url: "/list/server/",
        data: JSON.stringify({t: "z"}),
        dataType: "json",
        contentType: 'application/json; charset=utf-8'
    }).done(function (data) {
        console.log(data.a);
    });
}