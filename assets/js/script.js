$(document).ready(function(){
    var alphaVantageAPIKey = '8VHWEL4WMIJ9VMN0';

    var fromCurrency = '';
    var toCurrency = '';
    
    var fromCurrencies = ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BITGOLD','BMD','BND','BOB','BRL','BSD','BTN','BWP','BYR','BZD','CAD','CDF','CHF','CLF','CLP','CNY','COP','CRC','CUP','CVE','CZK','DJF','DKK', 'DOP','DZD','EEK','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','IQD','IRR','ISK','JEP','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRO','MTL','MUR','MVR','MWK','MXN','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RUR','RWF','SAR','SBDf','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','STD','SVC','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','USDE','UYU','UZS','VEF','VND','VUV','WST','XAF','XAG','XAU','XCD','XDR','XOF','XPF','YER','ZAR','ZMK','ZMW','ZWL'];
    var toCurrencies = ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BITGOLD','BMD','BND','BOB','BRL','BSD','BTN','BWP','BYR','BZD','CAD','CDF','CHF','CLF','CLP','CNY','COP','CRC','CUP','CVE','CZK','DJF','DKK', 'DOP','DZD','EEK','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','IQD','IRR','ISK','JEP','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRO','MTL','MUR','MVR','MWK','MXN','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RUR','RWF','SAR','SBDf','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','STD','SVC','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','USDE','UYU','UZS','VEF','VND','VUV','WST','XAF','XAG','XAU','XCD','XDR','XOF','XPF','YER','ZAR','ZMK','ZMW','ZWL'];

    // printing curriency codes to select option list
    for (var i = 0; i < fromCurrencies.length; i++) {
        var symbol = fromCurrencies[i];
        $('#fromCurrency').append("<option id='" + symbol + "'>" + fromCurrencies[i] + "</option>");
    }
    for (var i = 0; i < toCurrencies.length; i++) {
        var symbol = toCurrencies[i];
        $('#toCurrency').append("<option id='" + symbol + "'>" + toCurrencies[i] + "</option>");
    }
    // get the from currency user input
    $("#fromCurrency").on('change', function () {
        fromCurrency = $(this).val();
        console.log(typeof(fromCurrency))
        console.log(fromCurrency)
    });
    // get the to currency user input
    $("#toCurrency").on('change', function () {
        toCurrency = $(this).val();
        console.log(toCurrency)
    });
    
    $('#convertBTN').on('click', function(){
        
        event.preventDefault();
        // make ajax call
        $.ajax({
            url: "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + fromCurrency + "&to_currency=" + toCurrency + "&apikey=" + alphaVantageAPIKey + "",
            method: 'GET',
            success: function(data) {
                console.log(data);
                var realTimeCurrency = data['Realtime Currency Exchange Rate'];
                var fromCurrencyName = realTimeCurrency['2. From_Currency Name'];
                var toCurrencyName = realTimeCurrency['4. To_Currency Name'];
                var exchangeRate = realTimeCurrency['5. Exchange Rate'];
                $('#fromCurrencyName').html("1 " + fromCurrencyName + " equals ");
                $('#exchangeRate').html(exchangeRate);
                $('#toCurrencyName').html(toCurrencyName);
            },
            error: function(error) {
                console.log("ERROR IS " + error);
            }
        });
    });

      // MOST ACTIVE API CALL FUNCTION
      var iexMostActiveAJAXCALL = function() {
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/market/list/mostactive",
            method: 'GET',
            success: function(data) {
                console.log(data)
    
                for (var i = 0; i < data.length; i++) {
    
                    var symbol = data[i].symbol;
                    var companyName = data[i].companyName;
                    var iexRealtimePrice = data[i].iexRealtimePrice;
                    var latestPrice = data[i].latestPrice;
                    var change = data[i].change;
                    var changePercent = data[i].changePercent * 100;
                    changePercent = changePercent.toFixed(2);
                    var iexVolume = data[i].iexVolume;
                    var latestVolume = data[i].latestVolume;
                    var latestTime = data[i].latestTime;
                    if (iexVolume === null || iexRealtimePrice === null) {
                        
                        if (change > 0) {
                            $('#mostActiveStocksTable').append("<tr id='" + symbol + "'><td>" + symbol + "</td><td>" + companyName + "</td><td>$" + latestPrice + "</td><td class='bg-success'>$" + change + "</td><td class='bg-success'>" + changePercent + "%</td><td>" + latestVolume + "</td><td>" + latestTime + "</td></tr>");
                        } else {
                            $('#mostActiveStocksTable').append("<tr id='" + symbol + "'><td>" + symbol + "</td><td>" + companyName + "</td><td>$" + latestPrice + "</td><td class='bg-danger'>$" + change + "</td><td class='bg-danger'>" + changePercent + "%</td><td>" + latestVolume + "</td><td>" + latestTime + "</td></tr>");
                        }
                    } else {
                        if (change > 0) {
                            $('#mostActiveStocksTable').append("<tr id='" + symbol + "'><td>" + symbol + "</td><td>" + companyName + "</td><td>$" + iexRealtimePrice + "</td><td class='bg-success'>$" + change + "</td><td class='bg-success'>" + changePercent + "%</td><td>" + iexVolume + "</td><td>" + latestTime + "</td></tr>");
                        } else {
                            $('#mostActiveStocksTable').append("<tr id='" + symbol + "'><td>" + symbol + "</td><td>" + companyName + "</td><td>$" + iexRealtimePrice + "</td><td class='bg-danger'>$" + change + "</td><td class='bg-danger'>" + changePercent + "%</td><td>" + iexVolume + "</td><td>" + latestTime + "</td></tr>");
                        }
                    }
                }
            },
            error: function(error) {
                console.log("ERROR IS " + error);
            }
        });
    };
    // CALL MOST ACTIVE STOCKS
    iexMostActiveAJAXCALL();

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
                var close = data[i].close;

                var curTime = new Date();
                var day = curTime.getDay();

                curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "");


                if (curTime < 1400 && day<6){
                    $('#gainersList').append("<li class='list-group-item' name='listItem' id='" + symbol + "'><div class='row'><div class='col-4'>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-up mr-3' style='color: green'></i><span style='color: green;'>" + change + "</style></div><div class='col-4'><span class='ml-2' style='color: green'>(" + percentChange + "%)</span></div></div><div class='row'><div class='col-6'><small class='text-muted'>" + name + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>");
                } else {  
                    $('#gainersList').append("<li class='list-group-item' name='listItem' id='" + symbol + "'><div class='row'><div class='col-4'>" + symbol + "</div><div class='col-4'><span style='color: green;'></style></div><div class='col-4'><span class='ml-2' style='color: green'>$" + close.toFixed(2) + "</span></div></div><div class='row'><div class='col-6'><small class='text-muted'>" + name + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>");
                }
            }
            $(".list-group-item").on('click', function(){
                var symbolName = (this.id)
                $("#searchInput").val(symbolName)
                $( "#searchBTN" ).trigger("click")
            }) 
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
                var close = data[i].close;
               
                var curTime = new Date();
                var day = curTime.getDay();

                curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "");


                if (curTime < 1400 && day<6){
                    $('#losersList').append("<li class='list-group-item' id='"+symbol+"'><div class='row'><div class='col-4'>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-up mr-3' style='color: red'></i><span style='color: red;'>" + change + "</style></div><div class='col-4'><span class='ml-2' style='color: red'>(" + percentChange + "%)</span></div></div><div class='row'><div class='col-6'><small class='text-muted'>" + name + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>");
                } else {  
                    $('#losersList').append("<li class='list-group-item' id='"+symbol+"'><div class='row'><div class='col-4'>" + symbol + "</div><div class='col-4'><span style='color: red;'></style></div><div class='col-4'><span class='ml-2' style='color: red'>$" + close.toFixed(2) + "</span></div></div><div class='row'><div class='col-6'><small class='text-muted'>" + name + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>");
                }
            }
            $(".list-group-item").on('click', function(){
                var symbolName = (this.id)
                $("#searchInput").val(symbolName)
                $( "#searchBTN" ).trigger("click")
            }) 
        },
        error: function(error) {
            console.log("Error!" + error);
        }
    })

     // SECTOR PERFORMANCE API CALL
    var alphaVantageSectorPerformanceAJAX = function() {
        $.ajax({
            url: "https://www.alphavantage.co/query?function=SECTOR&apikey=" + alphaVantageAPIKey + "",
            method: 'GET',
            success: function(data) {
                
                // realTime Sector Performance
                var sector1Day = data['Rank B: 1 Day Performance'];

                // getting data from initial api call
                var consumerDisc = parseFloat(sector1Day['Consumer Discretionary']);
                var consumerStap = parseFloat(sector1Day['Consumer Staples']);
                var energy = parseFloat(sector1Day['Energy']);
                var financials = parseFloat(sector1Day['Financials']);        
                var healthCare = parseFloat(sector1Day['Health Care']);                
                var industrials = parseFloat(sector1Day['Industrials']);    
                var infoTech = parseFloat(sector1Day['Information Technology']);      
                var materials = parseFloat(sector1Day['Materials']);       
                var realEstate = parseFloat(sector1Day['Real Estate']);
                var teleComm = parseFloat(sector1Day['Telecommunication Services']);
                var utilities = parseFloat(sector1Day['Utilities']);

                // printing data to html in table format
                $('#sectorTime').html("1D");

                if (consumerDisc > 0) {
                    $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                } else {
                    $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                }

                if (consumerStap > 0) {
                    $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                } else {
                    $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                }

                if (energy > 0) {
                    $('#energy').html(energy + "%").css('color', 'green');
                } else {
                    $('#energy').html(energy + "%").css('color', 'red');
                }

                if (financials > 0) {
                    $('#financials').html(financials + "%").css('color', 'green');
                } else {
                    $('#financials').html(financials + "%").css('color', 'red');
                }

                if (healthCare > 0) {
                    $('#healthCare').html(healthCare + "%").css('color', 'green');
                } else {
                    $('#healthCare').html(healthCare + "%").css('color', 'red');
                }

                if (industrials > 0) {
                    $('#industrials').html(industrials + "%").css('color', 'green');
                } else {
                    $('#industrials').html(industrials + "%").css('color', 'red');
                }

                if (infoTech > 0) {
                    $('#infoTech').html(infoTech + "%").css('color', 'green');
                } else {
                    $('#infoTech').html(infoTech + "%").css('color', 'red');
                }

                if (materials > 0) {
                    $('#materials').html(materials + "%").css('color', 'green');
                } else {
                    $('#materials').html(materials + "%").css('color', 'red');
                }

                if (realEstate > 0) {
                    $('#realEstate').html(realEstate + "%").css('color', 'green');
                } else {
                    $('#realEstate').html(realEstate + "%").css('color', 'red');
                }

                if (teleComm > 0) {
                    $('#teleComm').html(teleComm + "%").css('color', 'green');
                } else {
                    $('#teleComm').html(teleComm + "%").css('color', 'red');
                }

                if (utilities > 0) {
                    $('#utilities').html(utilities + "%").css('color', 'green');
                } else {
                    $('#utilities').html(utilities + "%").css('color', 'red');
                }



                // Changing Sector Performance frequency
                $('.sectorBTN').on('click', function(){

                    switch(this.id) {
                        case '5DSector':

                            var sector5Day = data['Rank C: 5 Day Performance'];

                            consumerDisc = parseFloat(sector5Day['Consumer Discretionary']);
                            consumerStap = parseFloat(sector5Day['Consumer Staples']);
                            energy = parseFloat(sector5Day['Energy']);
                            financials = parseFloat(sector5Day['Financials']);
                            healthCare = parseFloat(sector5Day['Health Care']);
                            industrials = parseFloat(sector5Day['Industrials']);
                            infoTech = parseFloat(sector5Day['Information Technology']);
                            materials = parseFloat(sector5Day['Materials']);
                            realEstate = parseFloat(sector5Day['Real Estate']);
                            teleComm = parseFloat(sector5Day['Telecommunication Services']);
                            utilities = parseFloat(sector5Day['Utilities']);
                     

                            $('#sectorTime').html("5D");
                         
                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            if (realEstate > 0) {
                                $('#realEstate').html(realEstate + "%").css('color', 'green');
                            } else {
                                $('#realEstate').html(realEstate + "%").css('color', 'red');
                            }
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }
            

                            break;
                        
                        case '1MSector':
                            
                            var sector1Month = data['Rank D: 1 Month Performance'];

                            consumerDisc = parseFloat(sector1Month['Consumer Discretionary']);
                            consumerStap = parseFloat(sector1Month['Consumer Staples']);         
                            energy = parseFloat(sector1Month['Energy']);
                            financials = parseFloat(sector1Month['Financials']);
                            healthCare = parseFloat(sector1Month['Health Care']);
                            industrials = parseFloat(sector1Month['Industrials']);
                            infoTech = parseFloat(sector1Month['Information Technology']);
                            materials = parseFloat(sector1Month['Materials']);
                            realEstate = parseFloat(sector1Month['Real Estate']);
                            teleComm = parseFloat(sector1Month['Telecommunication Services']);
                            utilities = parseFloat(sector1Month['Utilities']);

                            $('#sectorTime').html("1M");

                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            if (realEstate > 0) {
                                $('#realEstate').html(realEstate + "%").css('color', 'green');
                            } else {
                                $('#realEstate').html(realEstate + "%").css('color', 'red');
                            }
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }
            

                            break;

                        case '3MSector':

                            var sector3Month = data['Rank E: 3 Month Performance'];

                            consumerDisc = parseFloat(sector3Month['Consumer Discretionary']);
                            consumerStap = parseFloat(sector3Month['Consumer Staples']);
                            energy = parseFloat(sector3Month['Energy']);
                            financials = parseFloat(sector3Month['Financials']);
                            healthCare = parseFloat(sector3Month['Health Care']);
                            industrials = parseFloat(sector3Month['Industrials']);
                            infoTech = parseFloat(sector3Month['Information Technology']);
                            materials = parseFloat(sector3Month['Materials']);
                            realEstate = parseFloat(sector3Month['Real Estate']);
                            teleComm = parseFloat(sector3Month['Telecommunication Services']);
                            utilities = parseFloat(sector3Month['Utilities']);

                            $('#sectorTime').html("3M");

                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            if (realEstate > 0) {
                                $('#realEstate').html(realEstate + "%").css('color', 'green');
                            } else {
                                $('#realEstate').html(realEstate + "%").css('color', 'red');
                            }
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }
            

                            break;

                        case 'ytdSector':

                            var sectorYTD = data['Rank F: Year-to-Date (YTD) Performance'];

                            consumerDisc = parseFloat(sectorYTD['Consumer Discretionary']);
                            consumerStap = parseFloat(sectorYTD['Consumer Staples']);
                            energy = parseFloat(sectorYTD['Energy']);
                            financials = parseFloat(sectorYTD['Financials']);
                            healthCare = parseFloat(sectorYTD['Health Care']);
                            industrials = parseFloat(sectorYTD['Industrials']);
                            infoTech = parseFloat(sectorYTD['Information Technology']);
                            materials = parseFloat(sectorYTD['Materials']);
                            realEstate = parseFloat(sectorYTD['Real Estate']);
                            teleComm = parseFloat(sectorYTD['Telecommunication Services']);
                            utilities = parseFloat(sectorYTD['Utilities']);

                            $('#sectorTime').html("YTD");
                            
                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            if (realEstate > 0) {
                                $('#realEstate').html(realEstate + "%").css('color', 'green');
                            } else {
                                $('#realEstate').html(realEstate + "%").css('color', 'red');
                            }
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }

                            break;

                        case '1YSector':

                            var sector1Year = data['Rank G: 1 Year Performance'];

                            consumerDisc = parseFloat(sector1Year['Consumer Discretionary']);
                            consumerStap = parseFloat(sector1Year['Consumer Staples']);
                            energy = parseFloat(sector1Year['Energy']);
                            financials = parseFloat(sector1Year['Financials']);
                            healthCare = parseFloat(sector1Year['Health Care']);
                            industrials = parseFloat(sector1Year['Industrials']);
                            infoTech = parseFloat(sector1Year['Information Technology']);
                            materials = parseFloat(sector1Year['Materials']);
                            realEstate = parseFloat(sector1Year['Real Estate']);
                            teleComm = parseFloat(sector1Year['Telecommunication Services']);
                            utilities = parseFloat(sector1Year['Utilities']);

                            $('#sectorTime').html("1Y");
                           
                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            if (realEstate > 0) {
                                $('#realEstate').html(realEstate + "%").css('color', 'green');
                            } else {
                                $('#realEstate').html(realEstate + "%").css('color', 'red');
                            }
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }

                            break;

                        case '3YSector':

                            var sector3Year = data['Rank H: 3 Year Performance'];

                            consumerDisc = parseFloat(sector3Year['Consumer Discretionary']);
                            consumerStap = parseFloat(sector3Year['Consumer Staples']);
                            energy = parseFloat(sector3Year['Energy']);
                            financials = parseFloat(sector3Year['Financials']);
                            healthCare = parseFloat(sector3Year['Health Care']);
                            industrials = parseFloat(sector3Year['Industrials']);
                            infoTech = parseFloat(sector3Year['Information Technology']);
                            materials = parseFloat(sector3Year['Materials']);
                            realEstate = parseFloat(sector3Year['Real Estate']);
                            teleComm = parseFloat(sector3Year['Telecommunication Services']);
                            utilities = parseFloat(sector3Year['Utilities']);
            
                            $('#sectorTime').html("3Y");
                            
                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            $('#realEstate').html("No data");
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }

                            break;

                        case '5YSector':
                            

                            var sector5Year = data['Rank I: 5 Year Performance'];

                            consumerDisc = parseFloat(sector5Year['Consumer Discretionary']);
                            consumerStap = parseFloat(sector5Year['Consumer Staples']);
                            energy = parseFloat(sector5Year['Energy']);
                            financials = parseFloat(sector5Year['Financials']);
                            healthCare = parseFloat(sector5Year['Health Care']);
                            industrials = parseFloat(sector5Year['Industrials']);
                            infoTech = parseFloat(sector5Year['Information Technology']);
                            materials = parseFloat(sector5Year['Materials']);
                            realEstate = parseFloat(sector5Year['Real Estate']);
                            teleComm = parseFloat(sector5Year['Telecommunication Services']);
                            utilities = parseFloat(sector5Year['Utilities']);
            
                            $('#sectorTime').html("5Y");
                            
                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }
            
                            $('#realEstate').html("No data");
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }

                            break;

                        case '10YSector':

                            var sector10Year = data['Rank J: 10 Year Performance'];

                            consumerDisc = parseFloat(sector10Year['Consumer Discretionary']);
                            consumerStap = parseFloat(sector10Year['Consumer Staples']);
                            energy = parseFloat(sector10Year['Energy']);
                            financials = parseFloat(sector10Year['Financials']);
                            healthCare = parseFloat(sector10Year['Health Care']);
                            industrials = parseFloat(sector10Year['Industrials']);
                            infoTech = parseFloat(sector10Year['Information Technology']);
                            materials = parseFloat(sector10Year['Materials']);
                            realEstate = parseFloat(sector10Year['Real Estate']);
                            teleComm = parseFloat(sector10Year['Telecommunication Services']);
                            utilities = parseFloat(sector10Year['Utilities']);
            
                            $('#sectorTime').html("10Y");
                            
                            if (consumerDisc > 0) {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'green');
                            } else {
                                $('#consumerDisc').html(consumerDisc + "%").css('color', 'red');
                            }
            
                            if (consumerStap > 0) {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'green');
                            } else {
                                $('#consumerStap').html(consumerStap + "%").css('color', 'red');
                            }
            
                            if (energy > 0) {
                                $('#energy').html(energy + "%").css('color', 'green');
                            } else {
                                $('#energy').html(energy + "%").css('color', 'red');
                            }
            
                            if (financials > 0) {
                                $('#financials').html(financials + "%").css('color', 'green');
                            } else {
                                $('#financials').html(financials + "%").css('color', 'red');
                            }
            
                            if (healthCare > 0) {
                                $('#healthCare').html(healthCare + "%").css('color', 'green');
                            } else {
                                $('#healthCare').html(healthCare + "%").css('color', 'red');
                            }
            
                            if (industrials > 0) {
                                $('#industrials').html(industrials + "%").css('color', 'green');
                            } else {
                                $('#industrials').html(industrials + "%").css('color', 'red');
                            }
            
                            if (infoTech > 0) {
                                $('#infoTech').html(infoTech + "%").css('color', 'green');
                            } else {
                                $('#infoTech').html(infoTech + "%").css('color', 'red');
                            }
            
                            if (materials > 0) {
                                $('#materials').html(materials + "%").css('color', 'green');
                            } else {
                                $('#materials').html(materials + "%").css('color', 'red');
                            }

                            $('#realEstate').html("No data");
            
                            if (teleComm > 0) {
                                $('#teleComm').html(teleComm + "%").css('color', 'green');
                            } else {
                                $('#teleComm').html(teleComm + "%").css('color', 'red');
                            }
            
                            if (utilities > 0) {
                                $('#utilities').html(utilities + "%").css('color', 'green');
                            } else {
                                $('#utilities').html(utilities + "%").css('color', 'red');
                            }

                            break;
                    }
                });
            },
            error: function(error) {
                console.log("ERROR IS " + error);
            }
        });
    }

    alphaVantageSectorPerformanceAJAX();
    
    // WATCH LIST CLICK FUNCTION
    // _________________________________________________________________
    $('#watchListBTN').on('click', function(){
        event.preventDefault();
        
        // get search term from user input
        var searchTerm= $('#watchListInput').val();
        
        // clear search  input box
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
                    $('#watchListGroup').append("<li class='list-group-item list-group-item-action' id='" + symbol + "'><div class='row'><div class='col-4'><i class='fas fa-sort mr-2'></i>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-up mr-3' style='color: green'></i><span style='color: green'>" + change + "</span><span class='ml-2' style='color: green'>(" + percentChange + "%)</span></div><div class='col-4'>$" + closePrice.toLocaleString() + "</div></div><div class='row'><div class='col-6'><small class='text-muted'>" + companyName + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>")
                } else {
                    $('#watchListGroup').append("<li class='list-group-item list-group-item-action' id='" + symbol + "'><div class='row'><div class='col-4'><i class='fas fa-sort mr-2'></i>" + symbol + "</div><div class='col-4'><i class='fas fa-caret-down mr-3' style='color: red'></i><span style='color: red'>" + change + "</span><span class='ml-2' style='color: red'>(" + percentChange + "%)</span></div><div class='col-4'>$" + closePrice.toLocaleString() + "</div></div><div class='row'><div class='col-6'><small class='text-muted'>" + companyName + "</small></div><div class='col-2'></div><div class='col-4'></div></div></li>")
                }
                
                $(".list-group-item").on('click', function(){
                    var symbolName = (this.id)
                    $("#searchInput").val(symbolName)
                    $( "#searchBTN" ).trigger("click")
                }) 
                
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
        var dataRange = "1m"
        $("#graphType").html(searchTerm.toUpperCase())
        $("#graphName").html(dataRange.toUpperCase())
        
        $('.datesrange').click(function(){
            var dataRange = $(this).text().toLowerCase()
            $("#graphName").html(dataRange.toUpperCase())
            $.ajax({
                url: "https://api.iextrading.com/1.0/stock/"+searchTerm+"/chart/"+dataRange+"",
                method: 'GET',
                success: function(data) {
                    
                var label = []
                var low = []
            
    
            
            for(i=0; i<data.length; i++){
               label.push(data[i].label)
               if(data[i].low > 0){
                   low.push(data[i].low)
                }
            }
            var smallest = low[0]
            
            for(var i=1; i<low.length; i++){
                if(low[i] < smallest){
                    smallest = low[i]  
                }
            }

                var chart = new Chartist.Line('#chart1', {
                    series: [low]
                },
                
                
                {
                    low: smallest,
                    showLabel: false,
                    showArea: true,
                    showPoint: false,
                    fullWidth: true,
                    width: '101.7%',
                    height: '100%',
                    axisX: {showGrid: false},
                    axisY: {showGrid: false}
                })
                chart.on('draw', function(data) {
                    if(data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                            d: {
                                begin: 2000 * data.index,
                                dur: 2000,
                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeOutQuint
                            }
                        });
                    }
                });
      
            
        },
        error: function(error) {
            console.log("Error!" + error);
        }
        })
        })
        

        $('#searchInput').val('');
        
        // general corporate summary ajax api pull
        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/" + searchTerm + "/company",
            method: 'GET',
            success: function(data) {
                
                $('#alertRow').hide();
                
                $('#newsCard').hide();
                $('#mostActiveStocksCard').hide();
                $('#corpCard').show();
                
                if (data.CEO === '') {
                    $('#ceo').html("Unknown");
                } else {
                    $('#ceo').html(data.CEO);
                }
                
                $('#corpTitle').html(data.companyName);
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
        
        

        $.ajax({
            url: "https://api.iextrading.com/1.0/stock/"+searchTerm+"/chart/"+dataRange+"",
            method: 'GET',
        success: function(data) {
            

        var label = []
        var low = []
        
        for(i = 0; i<data.length; i++){
           label.push(data[i].label)
           if(data[i].low > 0){
               low.push(data[i].low)
            }
        }
        
        var smallest = low[0]
        
        for(var i=1; i<low.length; i++){
            if(low[i] < smallest){
                smallest = low[i]  
            }
        }
            var chart = new Chartist.Line('#chart1', {
                series: [low]
            },
            
            
            {
                low: smallest,
                showLabel: false,
                showArea: true,
                showPoint: false,
                fullWidth: true,
                width: '101.7%',
                height: '100%',
                axisX: {showGrid: false},
                axisY: {showGrid: false}
            })
            chart.on('draw', function(data) {
                if(data.type === 'line' || data.type === 'area') {
                    data.element.animate({
                        d: {
                            begin: 2000 * data.index,
                            dur: 2000,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify(),
                            easing: Chartist.Svg.Easing.easeOutQuint
                        }
                    });
                }
            });
  
        
    },
    error: function(error) {
        console.log("Error!" + error);
    }
    
})
});
});
