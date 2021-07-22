/*
 * Função AJAX base do tipo assíncrona
 * 'params' é o id do usuário enviado apenas, quando necessário.
 * [Importante!] Você não pode alterar a função xhttpAssincrono.
 */
function xhttpAssincrono(callBackFunction, params) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          // Chama a função em callback e passa a resposta da requisição
          callBackFunction(this.responseText);
      }
    };
    // Path completo para a requisição AJAX.
    var url = "http://jsonplaceholder.typicode.com/users/";
    if(!isNaN(params)){
        url = url + params +"/todos";
    }
    // Requisição do tipo POST
    xhttp.open("GET", url, true);
    // Definindo o tipo de cabeçalho da requisição.
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

// variavel que é acessada por 2 funções
var tarefas;

// função callback
function init(params) {
    if(! document.getElementById('name')){
        xhttpAssincrono(initSelect);
    }else{
        xhttpAssincrono(graphic,params);
    }
}

// Inicia o select
function initSelect(params) {   
    var pessoas = JSON.parse(params);
    $("div.jumbotron").append ("<select id ="+"name" +" onchange="+'"init(this.value)"'+"> </select>"); 
    for(let index = 0; index < pessoas.length ; index++){
        $("#name").append("<option value="+pessoas[index].id+">"+pessoas[index].name+"</option>");
    }
    
}

// gera o grafico apartir do usuario selecionado
function graphic(params) {
    tarefas = JSON.parse(params);
    $("div.jumbotron").append ("<div id="+"graphic"+" class="+"pt-3"+"> </div>");
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

//plot grafico
function drawChart() {
    var completed = 0;
    var notCompleted = 0;

    for (let index = 0; index < tarefas.length; index++) {
        if (tarefas[index].completed == true) {
            completed ++;
        }else{
            notCompleted ++;
        }
    }
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'completed');
        data.addColumn('number', 'quantity');
        data.addRows([
          ["Completed", completed],
          ["Not Completed", notCompleted],

        ]);

        var options = {'title':'Tarefas diarias'};

        var chart = new google.visualization.PieChart(document.getElementById('graphic'));
        chart.draw(data, options);
}

// gera o select quando a pagina é carregada.
window.onload = init;