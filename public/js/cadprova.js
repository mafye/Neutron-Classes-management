 $( function() {
  $( "#datepicker" ).datepicker({
       yearRange: '1900:2050',
       changeMonth: true,
       changeYear: true,
       altFormat: "yy-dd-mm",
       altField: "#alt-date"
  });
  } );



  $( function() {

  $("#div2").hide();

  $.ajax({
    url: "/pesqDiscProfII",  // AQUI É A URL QUE SERA ENVIADO
    type: "POST",   //TIPO DE ENVIO
    dataType: "json", //TIPO DE DADO QUE SERA PASSADO

    contentType: "application/json",
    cache: false,
    timeout: 5000,
    complete: function() {
      console.log('process complete');
    },
    success: function(data) {
      console.log(disciplina);
      console.log('process sucess');
      $("#disciplina").empty();
  $("#disciplina").append($("<option disabled selected />").val('Disciplina').text('Disciplina'));
      for(var i = 0; i < data.length; i++) {
        $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
      //  alert(data[i]);
      }

    },

    error: function() {
      console.log('process error');
    },
  });


    $("#disciplina").change(function(){
      var disciplina = $('#disciplina').val();
  $("#materia").empty();
  $("#materia").append($("<option disabled selected />").val('Matéria').text('Matéria'));

      $.ajax({
        url: "/pesqMat",  // AQUI É A URL QUE SERA ENVIADO
        type: "POST",   //TIPO DE ENVIO
        dataType: "json", //TIPO DE DADO QUE SERA PASSADO
        data:JSON.stringify({
          disciplina: disciplina
        }),

        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        success: function(data) {
          console.log(disciplina);
          console.log('process sucess');
          $("#questCandidatas").empty();
          $("#questSelecionadas").empty();

          for(var i = 0; i < data.length; i++) {
            $("#materia").append($("<option />").val(data[i]).text(data[i]));
          //  alert(data[i]);
          }
        },

        error: function() {
          console.log('process error');
        },
      });
    });
  });


  $( function() {
    $("#materia").change(function(){
      var materia = $('#materia').val();
      var autor = $('#autor').val();
      $.ajax({
        url: "/pesqQuest",  // AQUI É A URL QUE SERA ENVIADO
        type: "POST",   //TIPO DE ENVIO
        dataType: "json", //TIPO DE DADO QUE SERA PASSADO
        data:JSON.stringify({
          materia: materia,
          autor: autor
        }),

        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        success: function(data) {
          console.log(materia);
          console.log('process sucess');
          $("#questCandidatas").empty();
          var dificuldade;
          // <input class="star star_1" id="star_1" type="radio" name="star" value="Fácil" required/>
          // <label class="star star_1" for="star_1" id="label1"></label>



         for(var i = 0; i < data.length; i++) {

           if (data[i][1] == "Fácil") {
             dificuldade = 'Facil';
           }
           else if (data[i][1] == "Mediana" || data[i][1] == "Média") {
             dificuldade =  'Mediana';
           }
           else if (data[i][1] == "Difícil") {
             dificuldade = 'Difícil';
           }

           $("#questCandidatas").append($("<tr/>")
           .append($("<td/>").val(data[i][0]).text(data[i][0]))
           .append($("<td style='text-align:center;'/>").val(data[i][2]).text(data[i][2]))
           .append($("<td style='text-align:center;' />").append(dificuldade +"</div>"))
           .append($("<td  style='align:right; width:100px;'/>")
           .append($("<button class='btn btn-primary btn-block' onclick='trocarTabela(this)'>").text("Adicionar"))
         ));
          console.log(data[i]);
         }
        },

        error: function() {
          console.log('process error');
        },
      });
    });
  });






$(function(){
  $("#cadastrar").click(function(){
    var table = document.getElementById('tableSelecionadas');
    var dados = [];
    var nomeP = $("#nomeP").val();
    var autor = $("#autor").val();
    var disciplina = $("#disciplina").val();
    var serie = $("#serie").val();
    var tipo = $("#tipo").val();

    for(var r = 1; r < table.rows.length; r++)
      dados[r] = table.rows[r].cells[1].innerHTML;

    $.ajax({
          url: "/cadastroProva",  // AQUI É A URL QUE SERA ENVIADO
          type: "POST",   //TIPO DE ENVIO
          dataType: "json", //TIPO DE DADO QUE SERA PASSADO
          data:JSON.stringify({
              dados : dados,
              autor : autor,
              nomeP : nomeP,
              disciplina : disciplina,
              serie : serie,
              tipo : tipo
          }),

          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function() {
            console.log('process complete');
            location.reload();
          },
          success: function(data) {
            console.log('process sucess');
          },

          error: function() {
            console.log('process error');
          },
        });
  });
});
