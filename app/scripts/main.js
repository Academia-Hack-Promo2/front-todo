$(function() {
    $('#datetimepicker1').datetimepicker();
    var newCategory = $('#new_category');
    var categories = $('#categories');
    newCategory.hide();

    categories.change(function() {
        category = $(this).val();
        if (category === 'Nueva') {
            $('#new_category').show();
        } else {
            $('#new_category').hide();
        }
    });

    $('#new_category').keyup(function(event) {
        if (event.which == 13) {
            $('#error_category').html('');
            if ($('#new_category').val().length < 5) {
                $('#error_category').html('La categoria debe tener más de 5 caracteres');
                return;

            } else {

                var category = {
                    "title": newCategory.val()
                };
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:3000/categories',
                    data: category,

                    success: function(data) {
                        console.log(data);
                        $('#categories').prepend('<option value="' + data.id + '" selected>' + data.title + '</option>');
                        newCategory.val('');
                        newCategory.hide();
                    },

                    error: function(data) {
                        console.log(data);
                    }

                });
            }

        }
    });

    (function() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/categories',

            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    $('#categories').prepend('<option value="' + data[i].id + '">' + data[i].title + '</option>');
                }
            },

            error: function(data) {
                console.log(data);
            }

        });
    }());
    $("#saveTodo").click(function() {
        var categoryId = $("#categories").val();
        var todo = {
            "title": $("#title").val(),
            "category_id": $("#categories").val(),
            "task_type": $("#task_type").val(),
            "status": $("#status").val(),
            "finish_date": $("#finish_date").val()
        };
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/tasks',
            data: todo,
            success: function(data) {
                $("#title").val(""),
                    $("#task_type").val(""),
                    $("#status").val(""),
                    $("#categories").val(""),
                    $("#finish_date").val(""),
                    $("#myModal").modal("hide")
            },
            error: function(data) {
                console.log(data);
            }

        });

    });

    var new_status = {
        "status": ""
    }

    function edit_status(id, val) {
        new_status["status"] = val;
        $.ajax({
            type: 'put',
            url: 'http://localhost:3000/tasks/' + id,
            data: new_status,

            success: function(data) {
                console.log(data)
            },

            error: function(data) {
                console.log(data)
            }
        });
    }


    $.get("http://localhost:3000/categories", function(categorys) {
        $.get("http://localhost:3000/tasks", function(tasks) {
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                for (var j = 0; j < categorys.length; j++) {
                    var category = 'sin categoria';
                    if (task.category_id == categorys[j].id) {
                        category = categorys[j].title;
                    };
                };
                if (task.status == 'pendiente') {
                  var tasks_status = 'btn-danger glyphicon glyphicon-time'
                }else{
                  tasks_status = 'btn-info glyphicon glyphicon-ok'
                }
                $("#mainbox").append("<div class='col-md-4 col-sm-6 col-xs-12'><div class='box2'><div id='task-" + task.id+ "' class=''></div><b>Titulo:  " +
                    task.title + "</b><br><b>Categoria:  " + category + "</b><br><b>Tipo:  " +
                    task.task_type + "</b>" + '<button class="status btn btn-sm '+tasks_status+'" data-info=' + task.id + ' data-attr= ' + task.status + '></button></div></div>');
            };

            $('.status').click(function() {
                $(this).toggleClass('btn-info btn-danger')
                var task_id = $(this).data("info");
                console.log(task_id);

                var task_status = $(this).data("attr");
                var alertBox = $("#task-"+task_id);

                if (alertBox.hasClass('')) {
                    alertBox.addClass('alert alert-danger');
                    alertBox.html("Tarea pendiente")
                    alertBox.fadeOut(2000);

                } else if (alertBox.hasClass('alert alert-info')) {
                    alertBox.removeClass('alert alert-info').addClass('alert alert-danger');
                    alertBox.html("Tarea pendiente")
                    alertBox.fadeIn();
                    alertBox.fadeOut(2000);

                } else if (alertBox.hasClass('alert alert-danger')) {
                    alertBox.removeClass('alert alert-danger').addClass('alert alert-info');
                    alertBox.html("Tarea terminada")
                    alertBox.fadeIn();
                    alertBox.fadeOut(2000);
                };


                if ($(this).hasClass('glyphicon glyphicon-ok')) {
                    $(this).removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-time')
                    task_status = "pendiente"

                } else if ($(this).hasClass('glyphicon glyphicon-time')) {
                    $(this).removeClass('glyphicon glyphicon-time').addClass('glyphicon glyphicon-ok')
                    task_status = "listo"
                };

                console.log(task_status)
                edit_status(task_id, task_status);
            })
        });
    });
});

//Opcional :    div_container = $("</div>").addClass("col-md-4").addClass("col-sm-6").addClass("col-xs-12");
                //div_box = $("</div>").addClass("box");