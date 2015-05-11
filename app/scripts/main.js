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
            url: 'http://todolist.com:3000/categories',
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
      url: 'http://todolist.com:3000/categories',

      success: function(data){
        for (var i = 0; i < data.length; i++ ){
          var categoryTitle = data[i].title;
          $('#categories').prepend('<option>'+categoryTitle+'</option>');
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
      "categories": $("#categories").val(),
      "task_type": $("#task_type").val(),
      "status": $("#status").val(),
      "finish_date": $("#finish_date").val() 
     };
     $.ajax({
      type:'post',
      url: 'http://todolist.com:3000/tasks',
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

});
