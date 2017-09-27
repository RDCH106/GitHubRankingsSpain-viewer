
var ranking;
    
    
$(document).ready(function() {
    $('#selection').on('change', function() {
        change($(this).val(), $(this).find('option:selected').text());
    });
});

$(document).ready(function () {
    sortSelect('#selection', 'text', 'asc');
});

function change(value, name) {    
    if(ranking != undefined){
        ranking.destroy();
    }
    $('#ranking tbody').empty();
    get_ghranking(value);
}
    
function printRanking(ranking){
        
    for(i = 0; i < ranking.length; i++){
                        
    $('#ranking tbody').append("<tr><td>"+ranking[i].name+"</td><td>"+ranking[i].public+"</td><td>"+ranking[i].private+"</td><td>"
    +ranking[i].repositories+"</td><td>"+ranking[i].followers+"</td><td>"+ranking[i].join+"</td><td>"
    +"<img width='64px' src='"+ranking[i].avatar+"'>"+"</td></tr>");
            
    }        
        
}
    
function get_ghranking(region){
    
    $.ajax({type:'GET', url: "https://raw.githubusercontent.com/iblancasa/ghrankings/master/"+region+".json", dataType: 'json', async: true,
        success: function(data) {
            $(".datetimestamp").html(data.date);
            printRanking(data.users);
            ranking =$('#ranking').DataTable( 
            {
            //"language": {
            //"url": "i18n/Spanish.json"
            //}
            "order": [[ 1, "desc" ]]
            } );
        }
    });
}

function sortSelect(select, attr, order) {
    if(attr === 'text'){
        if(order === 'asc'){
            $(select).html($(select).children('option').sort(function (x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
        }// end asc
        if(order === 'desc'){
            $(select).html($(select).children('option').sort(function (y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
        }// end desc
    }

};