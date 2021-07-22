//Chamado da API
function quote(){
    fetch('https://animechan.vercel.app/api/random')
    .then(response => response.json())
    .then(quote => setQuote(quote));
}
function setQuote(params) {
    var itens = JSON.parse(JSON.stringify(params));
    $( "p" ).remove(".remove");
    $( "p" ).remove(".font-weight-bold");
    $("div.col-8").append ("<p class ="+"font-weight-bold"+"> Anime: "+"</p>"+"<p class ="+"remove"+">"+itens.anime+"</p>");
    $("div.col-8").append ("<p class ="+"font-weight-bold"+"> Character: "+"</p>"+"<p class ="+"remove"+">"+itens.character+"</p>");
    $("div.col-8").append ("<p class ="+"font-weight-bold"+"> Quote: "+"</p>"+"<p class ="+"remove"+">"+itens.quote+"</p>");
    if(sessionStorage.getItem(itens.anime) === null){
        sessionStorage.setItem(itens.anime,1);
    }else{
        var controle = sessionStorage.getItem(itens.anime);
        controle++;
        sessionStorage.setItem(itens.anime,controle);
    }
}
// gera o grafico 
function graphic() {
    $("div.col-4").append ("<div id="+"graphic"+"> </div>");
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

//plot grafico
function drawChart() {
    var dataArray = [
        ['Name', 'Quote quantity'],
    ];
    var sessionStorageArray = new Array(sessionStorage.length);
    for (var i = 0; i < sessionStorage.length; i++){
        sessionStorageArray[i] = new Array(2);
    } 
    for (var i=0;i<sessionStorage.length;i++){
        sessionStorageArray[i][0] = sessionStorage.getItem(sessionStorage.key(i));
        sessionStorageArray[i][1] = sessionStorage.key(i);
    }
    var sortedArray =  sessionStorageArray.sort();

    for (var i = sortedArray.length-1; i > sortedArray.length-6 ; i--) {
        var row = [sortedArray[i][1],parseInt(sortedArray[i][0])];
        dataArray.push(row);
    }
    var options = {
        title: 'Animes aparecidos',
    };

    var data = google.visualization.arrayToDataTable(dataArray);

    var chart = new google.visualization.PieChart(document.getElementById('graphic'));
    chart.draw(data, options);

}


