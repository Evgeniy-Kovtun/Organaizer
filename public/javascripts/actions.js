$(function () {
//shave(".content h5", 70);
    $("#create-form").on('submit', function (e) {
        console.log("dhdhdfhdf");
        $.ajax({
            method: "POST",
            url: "/createActions",
            data: $(this).serialize()
        })
            .fail(function (error) {
// show error message
            })
            .success(function (data) {
                console.log(data);
                $(".task-table tbody").append("<tr><td>" + data.Name + "</td><td>" + data.ADate + "</td><td>" + data.Place + "</td><td>" + data.Description + "</td><td>" + data.Actives + "</td></tr>");
            })
            .always(function () {
                $("#myModal").modal("hide");

            });
        e.preventDefault();
    })
});
$(document).ready(function () {
    $('.remove').click(function (a) {
        $.ajax({
            method: "POST",
            url: "/removeActions",
            data: {id: $(this).data('id')}
        })
            .fail(function (error) {
// show error message
            })
            .success(function (data) {
                console.log(data);
                $("#" + data.id).remove();
            });
        a.preventDefault();

    });
});
$(document).ready(function () {
    $('.change').click(function (c) {
        $.ajax({
            method: "GET",
            url: "/getAction",
            data: $(this).serialize()
        })
            .fail(function (error) {
// show error message
            })
            .success(function (data) {
                console.log(data);

            });
        c.preventDefault();
    })
});
$(function () {
//shave(".content h5", 70);
    $("#change-form").on('submit', function (ch) {
        console.log('RRRRRRRRRRRRRRR');
//        ch.preventDefault();
        $.ajax({
            method: "POST",
            url: "/changeActions",
            data: $(this).serialize()
        })
            .fail(function (error) {
// show error message
            })
            .success(function (data) {
                console.log('вот что');
                console.log(data);
                console.log('Получили');
                $(".task-table tbody").html("<tr><td>" + data.Name + "</td><td>" + data.ADate + "</td><td>" + data.Place + "</td><td>" + data.Description + "</td><td>" + data.Actives + "</td></tr>");
            })
            .always(function () {
                $("#myModal1").modal("hide");

            });
        ch.preventDefault();
    })
});
//var newFunction = function (id) {console.log(id)};