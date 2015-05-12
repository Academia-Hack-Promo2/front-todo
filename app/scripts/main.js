$(function () {
  $('#datetimepicker1').datetimepicker();
  var newCategory = $('#new_category');
  var categories = $('#categories');
  newCategory.hide();

  categories.change(function(){
    category = $(this).val();
    if (category === 'Nueva'){
      $('#new_category').show();
    } else {
      $('#new_category').hide();
    }
  });

  $('#new_category').keyup(function(event){
    if (event.which == 13){
      $('#error_category').html('');
      if ($('#new_category').val().length < 5){
        $('#error_category').html('La categoria debe tener más de 5 caracteres');
        return;

      } else {

        var category = {"title": newCategory.val()};
        $.ajax({
          type:'post',
          url: 'http://localhost:3000/categories',
          data: category,

          success: function(data){
            console.log(data);
            $('#categories').prepend('<option value="'+data.id+'" selected>'+data.title+'</option>');
            newCategory.val('');
            newCategory.hide();
          },

          error: function(data){
            console.log(data);
          }

        });
      }

    }
  });

  (function(){
    $.ajax({
      type:'get',
      url: 'http://localhost:3000/categories',

      success: function(data){
        for (var i = 0; i < data.length; i++ ){
          $('#categories').prepend('<option value="'+data[i].id+'">'+data[i].title+'</option>');
        }
      },

      error: function(data){
        console.log(data);
      }

    });
  }());
  $("#saveTodo").click(function(){
    var categoryId = $("#categories").val();
    var todo = {
      "title": $("#title").val(),
      "category_id": $("#categories").val(),
      "task_type": $("#task_type").val(),
      "status": $("#status").val(),
      "finish_date": $("#finish_date").val() 
    };
    $.ajax({
      type:'post',
      url: 'http://localhost:3000/tasks',
      data: todo,
      success: function(data){
        $("#title").val(""),
        $("#task_type").val(""),
        $("#status").val(""),
        $("#categories").val(""),
        $("#finish_date").val(""),
        $("#myModal").modal("hide")
      },
      error: function(data){
        console.log(data);
      }

    });
    
  });

  $.get("http://localhost:3000/tasks", function(tasks){
    console.log(tasks[0]);
    for (var i =0; i <= tasks.length; i++) {
    var task = tasks[i];
    $("#mainbox").append("<div class='col-md-4 col-sm-6 col-xs-12'><div class='box'><div id='alert' class=''></div><b>titulo:  "+ task.title+"</b><br><b>Categoria:  "+ task.category_id+"</b><br><b>Tipo:  "+ task.task_type+"</b><button type='button' class='status btn btn-sm btn-info'><i class='glyphicon glyphicon-ok'></i></button></div></div>");
    };
  } );


});
