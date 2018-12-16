function hello() {
    console.log('doing');
    $.ajax({
        type: "GET",
        url: "/list/server/",
        dataType: "json",
        data: {t: "z"}
    }).done(function (data) {
        console.log(data.a);
    });
}