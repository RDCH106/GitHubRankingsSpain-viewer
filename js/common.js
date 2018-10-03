
var ranking;
var maxranking = 100;  // Max ranking elements (TOP 100)
    
function printRanking(ranking){
        
    /*for(i = 0; i < ranking.length; i++){
                        
        $('#ranking tbody').append("<tr><td><a href='https://github.com/"+ranking[i].name+"' target='_blank'>"+ranking[i].name+"</a>"
        +"</td><td>"+ranking[i].public+"</td><td>"+ranking[i].private+"</td><td>"
        +ranking[i].repositories+"</td><td>"+ranking[i].followers+"</td><td>"+ranking[i].join+"</td><td>"
        +"<img width='64px' src='"+ranking[i].avatar+"'>"+"</td></tr>");
            
    }*/
    ranking.forEach(function(arrayItem){
            $("#ranking tbody").append("<tr><td><a href='https://github.com/"+arrayItem.name+"' target='_blank'>"+arrayItem.name+"</a>"
            +"</td><td>"+arrayItem.public+"</td><td>"+arrayItem.private+"</td><td>"
            +arrayItem.repositories+"</td><td>"+arrayItem.followers+"</td><td>"+arrayItem.join+"</td><td>"
            /*+"<img width='64px' src='"+arrayItem.avatar+"'>"+"</td></tr>");*/
            +"<img width='64px' src='https://avatars.githubusercontent.com/"+arrayItem.name+"'>"+"</td></tr>");  /// ⚠️ Temporal fix
        });
        
}
    
function get_ghranking(region){
    
    $.ajax({type:"GET", url: "https://raw.githubusercontent.com/iblancasa/ghrankings/master/"+region+".json", dataType: "json", async: true,
        success: function(data) {
            $(".datetimestamp").html(data.date);
            printRanking(data.users.slice(0, maxranking));
            ranking =$("#ranking").DataTable( 
            {
            "language": {
                "url": "i18n/Spanish.json"
            },
            "order": [[ 1, "desc" ]],
            "responsive": true,
            "columnDefs": [ {
                "targets": 6,   /* Disable sort icon in Avatar column */
                "orderable": false,
            } ]
            } );
        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    //url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    //name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function change(value, name) {    
    if(ranking !== undefined){
        ranking.destroy();
    }
    $("#ranking tbody").empty();
    get_ghranking(value);
}

/*function sortSelect(select, attr, order) {
    if(attr === "text"){
        if(order === "asc"){
            $(select).html($(select).children("option").sort(function (x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
        }// end asc
        if(order === "desc"){
            $(select).html($(select).children("option").sort(function (y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
        }// end desc
    }
}*/

function init(region){
    
    $(document).ready(function() {
        $("#selection").on('change', function() {
            change($(this).val(), $(this).find("option:selected").text());
        });
    });
    
    $(document).ready(function () {
            //sortSelect("#selection", "text", "asc");
            get_ghranking(region);
            $("#selection").val(region);    
    });
    
    $(document).ready(function() {
        $("#theme").val("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");  // Default theme
        $("#theme").on('change', function() {            
            $("#css_theme").attr("href", $(this).val());
        });
    });
    
}