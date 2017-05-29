let nowIndex = 0;
let isloading = false;

document.addEventListener('DOMContentLoaded', function() {
    loadData(getData);
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop + window.innerHeight > document.documentElement.scrollHeight -100) {
            if (!isloading) {
                loadData(getData);
            }
        }
    });
});


function loadData(cb) {
    const client_id = 'd6ehon1psz22cgp54b2svg81cimy3v';
    const limit = 20;
    isloading = true;
    let url = 'https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit='
        + limit + '&client_id=' + client_id + "&offset=" + nowIndex;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = request.responseText;
            var jsonResp = JSON.parse(resp);
            cb(null, jsonResp);
        } else {
            // We reached our target server, but it returned an error
            console.log(err)
        }
    };

    request.onerror = function() {
    // There was a connection error of some sort
        cb(err);
    };
    request.send();
}

function getData(err, data) {
    if (err) {
        console.log(err);
    } else {
        const streams = data.streams;
        //const $container = $('.container');
        const $container = document.querySelector('.container');
        for (const stream of streams) {
        //for (const i = 0; i < Object.keys(streams).length; i += 1) {
            const div = document.createElement('div');
            $container.appendChild(div);
            div.outerHTML = getModal(stream);
        }
        nowIndex = nowIndex + 20;
        isloading = false;
    }
};

function getModal(data) {
    return `
        <div class="model">
            <div class="screen">
                <div class="placeholder"></div>
                <img src="${data.preview.medium}" onload="this.style.opacity=1"/>
            </div>
            <div class="streamerTitle">
                <div class="streamerImg">
                    <img src="${data.channel.logo}">
                </div>
                <div class="streamerInfo">
                <p>${data.channel.status}</p>
                <p>${data.channel.display_name}</p>
                </div>
            </div>
        </div>
    `
}