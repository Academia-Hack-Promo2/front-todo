// reutilizar maqueta y listar categorias Alex Ballera
(function(){
  $('#category').html('<div class="btn-primary title"><h2>categorias</h2></div>')
  $.ajax({
    type:'get',
    url: 'http://localhost:3000/categories',
    success: function(data){
      for (var i = 0; i < data.length; i++ ){          
        $('#category').append('<div class="col-md-4 col-sm-6 col-xs-12"><div class="box3 btn-info" data-category="' + data[i].id+ '"><h4>'+data[i].title+'</h4></div></div>');
      }

      $(".box3").click(function(){
        var category_id = $(this).data("category")
        $.ajax({
          type:'get',
          url:'http://localhost:3000/tasks?category='+category_id,
          success: function(response){
            var box = ""      
            for(var i = 0; i < response.length; i++){
             box = box + ('<div class="col-md-4 col-sm-6 col-xs-12"><div class="box2 btn-warning"><h3>titulo:  "'+ response[i].title+'"</h3><h3r><h3>Fecha:  "'+ response[i].finish_date+'"</h3><h3r><h3>Tipo:  "'+ response[i].task_type+'"</h3><h3>Estado:  "'+ response[i].status+'"</h3></div></div>')
           }  
           var clear = function(){return $('#tasks').html('  ');};
           var abox = function(){return $("#tasks").append(box);};

            clear().fadeOut(100,function() {
            setTimeout(function() {abox().fadeIn(2000)},100);
          });
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
