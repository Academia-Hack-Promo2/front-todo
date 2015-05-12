// reutilizar maqueta y listar categorias Alex Ballera
  (function(){
    $.ajax({
      type:'get',
      url: 'http://localhost:3000/categories',

      success: function(data){
        for (var i = 0; i < data.length; i++ ){          
          $('#category').append('<div class="col-md-4 col-sm-6 col-xs-12"><div class="box"><h3>'+data[i].title+'</h3></div></div>');
          console.log(data);
        }
      },
        error: function(data){
          console.log(data);
        }     
    });
  }());

