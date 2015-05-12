// reutilizar maqueta y listar categorias Alex Ballera
(function(){
  $.ajax({
    type:'get',
    url: 'http://localhost:3000/categories',

    success: function(data){
      for (var i = 0; i < data.length; i++ ){          
        $('#category').append('<div class="col-md-4 col-sm-6 col-xs-12"><div class="box btn-info" data-category="' + data[i].id+ '"><h3>'+data[i].title+'</h3></div></div>');
        console.log(data);
      }
      $(".box").click(function(){
        var category_id = $(this).data("category")
        $.ajax({
          type:'get',
          url:'http://localhost:3000/tasks?category='+category_id,

          success: function(response){
            $('#tasks').html('     ')
            for(var i = 0; i < response.length; i++){
              $('#tasks').append('<div class="col-md-4 col-sm-6 col-xs-12"><div class="box btn-warning"><h3>titulo:  "'+ response[i].title+'"</h3><h3r><h3>Fecha:  "'+ response[i].finish_date+'"</h3><h3r><h3>Tipo:  "'+ response[i].task_type+'"</h3><h3>Estado:  "'+ response[i].status+'"</h3></div></div>')
            } 
          },
          error:  function(response){
            console.log(response)
          } 
        })
      })
    },
    error: function(data){
      console.log(data);
    }     
  });
}());
