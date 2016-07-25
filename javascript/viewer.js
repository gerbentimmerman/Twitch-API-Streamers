$(document).ready(function () {
    var following= [];

    var followerURL = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/";
    $.getJSON(followerURL,function (data2){
        var logo;
        var name;
        var status;

        for (var i=0; i < data2.follows.length; i++){
            var displayName = data2.follows[i].channel.display_name;
            following.push(displayName);
        }
        following.push("ESL_SC2");
        following.push("OgamingSC2");
        following.push("BoterbakjeFC")
        following.push("brunofin");
        following.push("comster404");
        following.push("freecodecamp");

        for (var x = 0; x <following.length; x++){
            var url2 = 'https://api.twitch.tv/kraken/streams/' + following[x] + '/?callback=?';

            $.getJSON(url2).done(function (data3) {
                if (data3.error){
                    logo = "http://placehold.it/200x200";
                    name = data3.message;
                    status = data3.error;
                    $(".notAvailable").append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 info"><a href="https://www.twitch.tv/' + name+ '" class="links" target="_blank"><div class="well"><div class="profileImage">' + '<img src="'+ logo +'" class="img-responsive logo">' + '</div><div class="profileName"><h4>'+ name + '</h4></div><div class="profileStatus">'+ status + '</div></div></a></div>');
                }
                if (data3.stream === null){
                    $.getJSON(data3._links.channel,function (data5) {
                        logo = data5.logo;
                        name = data5.display_name;
                        status = "OFFLINE";
                        if (logo === null){
                            logo = "http://placehold.it/200x200"
                        }
                        $(".offline").append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 info"><a href="https://www.twitch.tv/' + name+ '" class="links" target="_blank"><div class="well"><div class="profileImage">' + '<img src="'+ logo +'" class="img-responsive logo">' + '</div><div class="profileName"><h4>'+ name + '</h4></div><div class="profileStatus">'+ status + '</div></div></a></div>');
                    });
                }
            });
        }
        for (var y = 0; y < following.length;y++) {
            onlineURL = 'https://api.twitch.tv/kraken/streams/' + following[y];
            $.getJSON(onlineURL, function (data4) {
                logo = data4.stream.channel.logo;
                status = data4.stream.channel.status;
                name = data4.stream.channel.display_name;
                $(".online").append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 info"><a href="https://www.twitch.tv/' + name+ '" class="links" target="_blank"><div class="well"><div class="profileImage">' + '<img src="' + logo + '" class="img-responsive logo">' + '</div><div class="profileName"><h4>' + name + '</h4></div><div class="profileStatus">' + status + '</div></div></a></div>');

            });
        }
    });
    console.log(following);
}); // END of Document Ready