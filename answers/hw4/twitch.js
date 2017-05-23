

function getData(cb) {
    const client_id = 'd6ehon1psz22cgp54b2svg81cimy3v';
    const limit = 20;
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit='
        + limit + '&client_id=' + client_id,
        success: (response) => {
            console.log(response);
            cb(null, response);
        },
        error: (err) => {
            cb(err);
        }
    })
}

getData((err, data) => {
    if (err) {
        console.log(err);
    } else {
        const streams = data.streams;

        const $container = $('.container');
        for (const stream of streams) {
            $container.append(getModal(stream));
        }
    }
});

function getModal(data) {
    return `
        <div class="model">
            <div class="screen">
                <img src="${data.preview.medium}"/>
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