$(document).ready(function(){
    loadData(getData);
});

let nowIndex = 0;
let isloading = false;
function loadData(cb) {
    const client_id = 'd6ehon1psz22cgp54b2svg81cimy3v';
    const limit = 20;
    isloading = true;
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit='
        + limit + '&client_id=' + client_id + "&offset=" + nowIndex,
        success: (response) => {
            console.log(response);
            cb(null, response);
        },
        error: (err) => {
            cb(err);
        }
    })
}

function getData(err, data) {
    if (err) {
        console.log(err);
    } else {
        const streams = data.streams;

        const $container = $('.container');
        for (const stream of streams) {
            $container.append(getModal(stream));
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

$(window).scroll(function(){
    if ($(window).scrollTop() + $(window).height() > $(document).height() -100) {
        if (!isloading) {
            loadData(getData);
        }
    }
})