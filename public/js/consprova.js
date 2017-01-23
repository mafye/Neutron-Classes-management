//Pesquisa os professores ao carregar a página
$(function pesqProfs(){
  $.post("/pesqProfs",function(data){
    $("#autor").empty();
    $("#autor").append($("<option selected disabled/>").val('Autor').text('Autor'));
    for(var i = 1; i < data.length; i++) {
      $("#autor").append($("<option />").val(data[i]).text(data[i]));
      console.log(data[i]);
    }
  });
});

  $( function() {
    $("#disciplina").change(function(){
      var disciplina = $('#disciplina').val();

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
          $("#materia").empty();
          $("#materia").append($("<option disable selected />").val('Materia').text('Materia'));
          for(var i = 0; i < data.length; i++) {
            $("#materia").append($("<option />").val(data[i]).text(data[i]));
            console.log(data[i]);
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

      $.ajax({
        url: "/pesqQuest",  // AQUI É A URL QUE SERA ENVIADO
        type: "POST",   //TIPO DE ENVIO
        dataType: "json", //TIPO DE DADO QUE SERA PASSADO
        data:JSON.stringify({
          materia: materia
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
         for(var i = 0; i < data.length; i++) {
           $("#questCandidatas").append($("<tr/>")
           .append($("<td/>").val(data[i][0]).text(data[i][0]))
           .append($("<td style='text-align:center;'/>").val(data[i][1]).text(data[i][1]))
           .append($("<td style='text-align:center;'/>").val(data[i][2]).text(data[i][2]))
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


$(function pesqDisciplina(){

         $.post("/pesqDisc",function(data){
            $("#disciplina").empty();
            $("#disciplina").append($("<option disable selected />").val('Disciplina').text('Disciplina'));

           for(var i = 0; i < data.length; i++) {
             $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
            console.log(data[i]);
           }
         });
});



$(function(){
  $("#consultarProva").click(function(){

    var buscafiltrada = [$("#autor").val(), $("#disciplina").val(), $("#serie").val(), $("#tipo").val()];
    // var algo = buscafiltrada.filter(filtraBusca);

    if(buscafiltrada[0] != "" && buscafiltrada[1] != null)
    {
        var autor = buscafiltrada[0];
    }
    else
    {
       var autor = "";
    }
    if(buscafiltrada[1] != "" && buscafiltrada[1] != "Disciplina" && buscafiltrada[1] != null)
    {
        var disciplina = buscafiltrada[1];
    }
    else
    {
       var disciplina = "";
    }
    if(buscafiltrada[2] != "" && buscafiltrada[1] != "Série" && buscafiltrada[1] != null)
    {
        var serie = buscafiltrada[2];
    }
    else
    {
       var serie = "";
    }
    if(buscafiltrada[3] != "" && buscafiltrada[1] != "Tipo" && buscafiltrada[1] != null)
    {
        var tipo = buscafiltrada[3];
    }
    else
    {
       var tipo = "";
    }
    console.log("------------------------");
    console.log(autor);
    console.log(disciplina);
    console.log(serie);
    console.log(tipo);

    var table = document.getElementById('tableSelecionadas');
    var dados = [];
    // var autor = $("#autor").val();
    // var disciplina = $("#disciplina").val();
    // var serie = $("#serie").val();
    // var tipo = $("#tipo").val();
    alert(table.rows.length);
    for(var r = 1; r < table.rows.length; r++)
      dados[r] = table.rows[r].cells[1].innerHTML;

    $.ajax({
          url: "/consultandoProva",  // AQUI É A URL QUE SERA ENVIADO
          type: "POST",   //TIPO DE ENVIO
          dataType: "json", //TIPO DE DADO QUE SERA PASSADO
          data:JSON.stringify({
              dados : dados,
              autor : autor,
              disciplina : disciplina,
              serie : serie,
              tipo : tipo
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

            $("#IzaMyLuv").empty();
           for(var i = 0; i < data.length; i++) {
             $("#IzaMyLuv").append($("<tr/>")
              .append($("<td />").val(data[i][1]).text(data[i][0]))
              .append($("<td />").val(data[i][0]).text(data[i][1]))
              .append($("<td />").val(data[i][2]).text(data[i][2]))
              .append($("<td  />")
                .append("<button type='button' class='btn btn-danger id = 'gen' onclick = 'doIt(this)' name = '"+i+"'>Gerar PDF</button>")
           ));
            console.log(data[i]);
           }




            $("#materia").empty();
            $("#materia").append($("<option disable selected />").val('Materia').text('Materia'));
            for(var i = 0; i < data.length; i++) {
              $("#materia").append($("<option />").val(data[i]).text(data[i]));
              console.log(data[i]);
            }
          },

          error: function() {
            console.log('process error');
          },
        });
  });
});




// $( function() {
//   $("#cadastrar").click(function(){
//     var disciplina = $('#disciplina').val();
//
//     $.ajax({
//       url: "/pesqMat",  // AQUI É A URL QUE SERA ENVIADO
//       type: "POST",   //TIPO DE ENVIO
//       dataType: "json", //TIPO DE DADO QUE SERA PASSADO
//       data:JSON.stringify({
//         disciplina: disciplina
//       }),
//
//       contentType: "application/json",
//       cache: false,
//       timeout: 5000,
//       complete: function() {
//         console.log('process complete');
//       },
//       success: function(data) {
//         console.log(disciplina);
//         console.log('process sucess');
//         $("#materia").empty();
//         $("#materia").append($("<option disable selected />").val('Materia').text('Materia'));
//         for(var i = 0; i < data.length; i++) {
//           $("#materia").append($("<option />").val(data[i]).text(data[i]));
//           console.log(data[i]);
//         }
//       },
//
//       error: function() {
//         console.log('process error');
//       },
//     });
//   });
// });


var novaRow = [];
  var x = 0;
  function trocarTabela(element){
    var table = document.getElementById('tableCandidatas');
    var row = parseInt(element.parentNode.parentNode.rowIndex);
    novaRow[x] = '<tr><td style="text-align: left;width:125px;">'+ document.getElementById("materia").value +'</td><td style="text-align: left;">' + table.rows[row].cells[0].innerHTML + '</td><td style="text-align: center;">' + table.rows[row].cells[1].innerHTML + '</td><td style="text-align: center;">' + table.rows[row].cells[2].innerHTML + '</td><td><button class="btn btn-danger btn-block" onclick="removerRow(this)">Remover</button></td></tr>';
    document.getElementById("questSelecionadas").innerHTML += novaRow[x];
    x++;
  }

  function removerRow(btn) {
    x--;
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  novaRow[x] = "";
}



function doIt(element) {
  var table = document.getElementById('tableSelecionadas');
  var row =table.rows.length;
  // console.log(row);
  console.log(table.rows[row-1].cells[0].innerHTML);

  var nomeTMP = row-1;
  var nome= String(nomeTMP);
  var nome2= JSON.stringify(nomeTMP);

  // alert(nome);
// alert(  Object.prototype.toString.call(nome) );
    $.ajax({

      url: "/getprova",  // AQUI É A URL QUE SERA ENVIADO
      type: "POST",   //TIPO DE ENVIO
      dataType: "json", //TIPO DE DADO QUE SERA PASSADO
      data:JSON.stringify({
        variola: nomeTMP
      }),

      contentType: "application/json",
      cache: false,
      timeout: 5000,
      complete: function() {
        console.log('process complete');

      },
      success: function(data) {
        // console.log(data[]);
        // var doc = new jsPDF()

        // var datav =[];
        console.log('----');
        console.log(data.length);
        // var dtt=JSON.stringify(data);
        console.log('***********');




          // var x = 0;
          // datav[x] = data[i];
          // x = x+1;
          //data[i];
// var pdfdoc={content:[]};

      //AQUI EU TRATO OS DADOS
      var ginha =[];
      var num = 1;
      var linhas ="______________________________________________________________________________________\n";
      var spc = "\n"
      var nlinhas = "";
        for(var i=0; i< data.length ;i++)
        {
          switch (data[i].tipo) {

            case "Discursiva":
            if(data[i].linhas_visiveis == '1')
            {
              var number = parseInt(data[i].quant_linhas);
              console.log(number);
                ginha[i]=num+")" + data[i].enunciado+"\n\n";
                for(var j=0; j< number ;j++)
                {

                  nlinhas += linhas;
                }

                ginha[i] = ginha[i]+ nlinhas+"\n\n";
                num++;
                nlinhas = "";

                break;
            }
            else {
              var number = parseInt(data[i].quant_linhas);
              console.log(number);
                ginha[i]=num+")" + data[i].enunciado+"\n\n";
                for(var j=0; j< number ;j++)
                {

                  nlinhas += spc;
                }

                ginha[i] = ginha[i]+ nlinhas+"\n\n";
                num++;
                nlinhas = "";

                break;

            }







            case "Objetiva":
            // alert("2");
           ginha[i]=num+") "+data[i].enunciado+"\n\n"+"a) "+data[i].op1+"\n"+"b) "+data[i].op2+"\n"+"c) "+data[i].op3+"\n"+"d) "+data[i].op4+"\n"+"e) "+data[i].op5+"\n\n";
           num++;
           break;

            // default:
//tá me ouvindo?tá me ouvindo?tá me ouvindo?tá me ouvindo?tá me ouvindo?tá me ouvindo?tá me ouvindo?tá me ouvindo?
          }
            // if(data[i].tipo="Discursiva"){
            //   ginha[i]=data[i].enunciado+"\n";
            // }else if (){
            // alert(data[i].tipo);
            //   ginha[i]=data[i].enunciado+"\n"+data[i].op1+"\n"+data[i].op2+"\n"+data[i].op3+"\n"+data[i].op4+"\n"+data[i].op5;
            // }
      //MANIPULO O ARRAY PRA POR O NUMERO DE QUESTAO, i, A QUEWSTAO, E DPS PULAR DUAS LINHAS.
      // console.log(ginha[i]+"\n");
            //  data[i]= ginha[i] +"\n\n____________________________________________________________________________________\n\n\n\n";
        }
        // var pdfdoc={
        //
        //   content:
        //   [
        //     {
        //       image: 'cabeçalho_pdf.png',
        //       width: 40
        //     },
        //     ginha
        //   ],
        //
        // };
        var cab = [];
        cab [0] = "COLÉGIO PEDRO II     -     CAMPUS SÃO CRISTÓVÃO III                                               NOTA:\n";
        cab [1] = "COORDENADOR: ______________________________                  \n";
        cab [2] = "PROFESSOR: ________________________________         DATA:      /      /\n";
        cab [3] = "ALUNO: _____________________________________         TURMA: ________   N°: ___\n\n\n"


        var merda = "coco";
        var pdfdoc = {
          // header:
          //
          //
          // [
          //   cab,
          // ],

      content:
      [
        cab,
        ginha,


      ],
  }

        pdfMake.createPdf(pdfdoc).open();




        console.log('process sucess');

      },

      error: function() {
        console.log('process error');
      },
    });

}