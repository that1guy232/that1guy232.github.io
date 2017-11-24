/**
 * Created by Keith on 10/25/2016.
 */

function getVids() {

    $.getJSON("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCI3U4iYLLnc5DSordUnL_HlX1SdGgkmv4&channelId=UCQOwWvXpgO4NNgKzyYoi3-A&part=snippet,id&order=date&maxResults=5", function (data) {
        $.each (data.items, function (i, v) {
            var id = "https://www.youtube.com/embed/"+(v.id.videoId);
            var ifrm = document.createElement("iframe");
            ifrm.setAttribute("src", id);
            ifrm.style.width = "350px";
            ifrm.style.height = "200px";
            ifrm.style.border = "0";
            ifrm.style.alignItems = "center";
            document.getElementById("vids").appendChild(ifrm);

        })


    });
}

