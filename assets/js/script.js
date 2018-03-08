$(document).ready(function(){

    // GENERAL APIS UPON PAGE LOAD
    // _________________________________________________________________

    // news api
    $.ajax({
        url:"https://api.iextrading.com/1.0/stock/market/news/last/10",
        method: 'GET',
        success: function(data) {

            for (var i = 0; i < data.length; i++) {
                // var dateTime = data[i].dateTime;
                var headline = data[i].headline;
                var summary = data[i].summary;
                var related = data[i].related;
                var url = data[i].url;
                var source = data[i].source;

                $('#newsFeed').append("<div class='card mt-2'><div class='card-header'><h5 class='card-title'><a href='" + url + "' target='_blank'>" + headline +"</a></h5></div><div class='card-body'><a href='" + url + "' target='_blank'><p class='card-text'>"+ summary + "</p><p class='card-text'><small>Source: " + source + "</small></p></a></div></div>");
            }
        },
        error: function(error) {
            console.log("Error is " + error);
        }
    })

    // grabbing the gainers
    $.ajax({
        url: "https://api.iextrading.com/1.0/stock/market/list/gainers",
        method: 'GET',
        success: function(data){
         
            for (var i = 0; i < data.length; i++) {

                var name = data[i].companyName;
                var changePercent = data[i].changePercent * 100;
                var percentChange = changePercent.toFixed(2);
                var symbol = data[i].symbol;
                var change = data[i].change;
           
                $('#gainersList').append("<li class='list-group-item'><div class='row'><div class='col-4'>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-up mr-3' style='color: green'></i><span style='color: green;'>" + change + "</style></div><div class='col-4'><span class='ml-2' style='color: green'>(" + percentChange + "%)</span></div></div><div class='row'><div class='col-6'><small class='text-muted'>" + name + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>");
                
            }
        },
        error: function(error) {
            console.log("Error!" + error);
        }
    })

    // grabbing the losers
    $.ajax({
        url: "https://api.iextrading.com/1.0/stock/market/list/losers",
        method: 'GET',
        success: function(data){

            for (var i = 0; i < data.length; i++) {

                var name = data[i].companyName;
                var changePercent = data[i].changePercent * 100;
                var percentChange = changePercent.toFixed(2);
                var symbol = data[i].symbol;
                var change = data[i].change;

               
                $('#losersList').append("<li class='list-group-item'><div class='row'><div class='col-4'>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-down mr-3' style='color: red'></i><span style='color: red;'>" + change + "</span></div><div class='col-4'><span class='ml-2' style='color: red'>(" + percentChange + "%)</span></div></div><div class='row'><div class='col-6'><small class='text-muted'>" + name + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>");
                
            }
        },
        error: function(error) {
            console.log("Error!" + error);
        }
    })



    // WATCH LIST CLICK FUNCTION
    // _________________________________________________________________
    $('#watchListBTN').on('click', function(){
        event.preventDefault();

        // get search term from user input
        var searchTerm= $('#watchListInput').val();

        // clear search input box
        $('#watchListInput').val('');

        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/quote",
            method: 'GET',
            success: function(data){

                var companyName = data.companyName;
                var closePrice = data.close;
                var percentChange = data.changePercent * 100;
                percentChange = percentChange.toFixed(2);
                var exchange = data.primaryExchange;
                var sector = data.sector;
                var symbol = data.symbol;
                var change = data.change;

                $('#watchListAlert').hide();

                if (percentChange > 0) {
                    $('#watchListGroup').append("<li class='list-group-item list-group-item-action'><div class='row'><div class='col-4'><i class='fas fa-sort mr-2'></i>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-up mr-3' style='color: green'></i><span style='color: green'>" + change + "</span><span class='ml-2' style='color: green'>(" + percentChange + "%)</span></div><div class='col-4'>$" + closePrice.toLocaleString() + "</div></div><div class='row'><div class='col-6'><small class='text-muted'>" + companyName + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>")
                } else {
                    $('#watchListGroup').append("<li class='list-group-item list-group-item-action'><div class='row'><div class='col-4'><i class='fas fa-sort mr-2'></i>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-down mr-3' style='color: red'></i><span style='color: red'>" + change + "</span><span class='ml-2' style='color: red'>(" + percentChange + "%)</span></div><div class='col-4'>$" + closePrice.toLocaleString() + "</div></div><div class='row'><div class='col-6'><small class='text-muted'>" + companyName + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>")
                }

               

            },
            error: function(error){
                console.log("Error!" + error);
                $('#watchListAlert').show().html("Incorrect symbol. Please search again.");
            },
        })
    });

    


    // SEARCH FOR A COMPANY BUTTON CLICK
    // _________________________________________________________________
    $('#searchBTN').on('click', function(){
        event.preventDefault();
        // get user input
        var searchTerm = $('#searchInput').val();

        $('#searchInput').val('');

        // general corporate summary ajax api pull
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/company",
            method: 'GET',
            success: function(data) {

                $('#alertRow').hide();

                $('#newsCard').hide();
                $('#corpCard').show();

                $('#corpTitle').html(data.companyName);
                $('#ceo').html(data.CEO);
                $('#corpSummary').html(data.description);
                $('#industry').html(data.industry);
                $('#sector').html(data.sector);
            },
            error: function(error) {
                console.log("Error!" + error);
                $('#alertRow').show().html("Incorrect symbol. Please search again.");
            }
        })

        // corp logo api
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/logo",
            method: 'GET',
            success: function(data) {
                $('#corpLogo').attr('src', data.url);
            },
            error: function(error) {
                console.log("Error!" + error);
            }
        });

        // company financial info api pull
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/financials",
            method: 'GET',
            success: function(data) {

                var totalAssets = data.financials[0].totalAssets;
                var totalLiabilities = data.financials[0].totalLiabilities;
                var reportDate = data.financials[0].reportDate;

                $('#totalAssets').html("$" + totalAssets.toLocaleString());
                $('#totalLiabilities').html("$" + totalLiabilities.toLocaleString());
                $('#reportDate').html(reportDate);

                var grossProfit = data.financials[0].grossProfit;
                var netIncome = data.financials[0].netIncome;
                var operatingExpense = data.financials[0].operatingExpense;
                var operatingIncome = data.financials[0].operatingIncome;
                var operatingRevenue = data.financials[0].operatingRevenue;
                var shareholderEquity = data.financials[0].shareholderEquity;
                var totalRevenue= data.financials[0].totalRevenue;

                $('#grossProfit').html("$" + grossProfit.toLocaleString());
                $('#netIncome').html("$" + netIncome.toLocaleString());
                $('#operatingExpense').html("$" + operatingExpense.toLocaleString());
                $('#operatingIncome').html("$" + operatingIncome.toLocaleString());
                $('#operatingRevenue').html("$" + operatingRevenue.toLocaleString());
                $('#shareholderEquity').html("$" + shareholderEquity.toLocaleString());
                $('#totalRevenue').html("$" + totalRevenue.toLocaleString());


            },
            error: function(error) {
                console.log("Error!" + error);
            }
        })

        // company key stats
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/stats",
            method: 'GET',
            success: function(data) {

                var marketcap = data.marketcap;
                var sharesOutstanding = data.sharesOutstanding;

                $('#marketCap').html("$" + marketcap.toLocaleString());
                $('#sharesOutstanding').html(sharesOutstanding.toLocaleString());
            },
            error: function(error) {
                console.log("Error!" + error);
            }
        })

        // company quote pull
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/quote",
            method: 'GET',
            success: function(data) {

                var openPrice = data.open;
                var highPrice = data.high;
                var lowPrice = data.low;
                var closePrice = data.close;
                var volume = data.latestVolume;
                var yearHigh = data.week52High;
                var yearLow = data.week52Low;
                var ytdChange = data.ytdChange * 100;
                ytdChange = ytdChange.toFixed(2);
                var latestPrice = data.latestPrice;
                var change = data.change;
                
                var changePercent = data.changePercent * 100;
                changePercent = changePercent.toFixed(2);


                $('#openPrice').html("$" + openPrice.toLocaleString());
                $('#highPrice').html("$" + highPrice.toLocaleString());
                $('#lowPrice').html("$" + lowPrice.toLocaleString());
                $('#closePrice').html("$" + closePrice.toLocaleString());
                $('#volume').html(volume.toLocaleString());
                $('#yearHigh').html("$" + yearHigh.toLocaleString());
                $('#yearLow').html("$" + yearLow.toLocaleString());


                if (ytdChange > 0) {
                    $('#ytdChange').html(ytdChange + "%").css('background-color', 'green');
                } else {
                    $('#ytdChange').html(ytdChange + "%").css('background-color', 'red');
                }


                $('#todayOpen').html("$" + openPrice.toLocaleString());
                $('#latestPrice').html("$" + latestPrice.toLocaleString());
                
                if (change > 0) {
                    $('#todayChange').html("<i class='fas fa-caret-up mr-3' style='color: green'></i><span style='color: green'>" + change)
                } else {
                    $('#todayChange').html("<i class='fas fa-caret-down mr-3' style='color: red'></i><span style='color: red'>" + change)
                }

                if (change > 0) {
                    $('#todayPercentChange').html("<i class='fas fa-caret-up mr-3' style='color: green'></i><span style='color: green'>(" + changePercent + "%)")
                } else {
                    $('#todayPercentChange').html("<i class='fas fa-caret-down mr-3' style='color: red'></i><span style='color: red'>(" + changePercent + "%)")
                }


            },
            error: function(error) {
                console.log("Error!" + error);
            }
        })

        // company news pull
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/news",
            method: 'GET',
            success: function(data) {

                // clear the news feed before printing new material to it
                $('#corpNews').html('');

                //loop through response to print articles to html 
                for (var i = 0; i < data.length; i++) {

                    var headline = data[i].headline;
                    var url = data[i].url;
                    var summary = data[i].summary;
                    var source = data[i].source;

                    $('#corpNews').append("<a href='" + url + "' target='_blank'><li class='list-group-item list-group-item-action'><div class='row'>" + headline + "</div><div class='row'><span><small class='text-muted'>Source: " + source + "</small></span></div></li></a>");
                }
                
            },
            error: function(error) {
                console.log("Error!" + error);
            }
        })
        

        // base chart pull
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/chart/",
            method: 'GET',
            success: function(data) {
                console.log("chart");
                console.log(data);

                $('#chart').html(data);
   
            },
            error: function(error) {
                console.log("Error!" + error);
            }
        })


        $("#moreFinancialBTN").on('click', function(){
            $('#moreFinancialBTN').hide();
            $('#lessFinancialBTN').show();
        });

       $('#lessFinancialBTN').on('click', function(){
            $('#moreFinancialBTN').show();
            $('#lessFinancialBTN').hide();
        });

    });
    

});