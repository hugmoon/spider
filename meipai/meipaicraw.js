
var Crawler = require('crawler')
var fs = require('fs')

fs.stat('./data', function (err, stats) {
    if (err) {
        console.log(err)
        fs.mkdir('./data')
        console.log('创建文件夹成功')
    }
    else {
        console.log(stats)
        console.log('文件已存在')
    }
})

var c = new Crawler({
    maxConnections: 10
})

var videoList = [{
    url: 'http://www.meipai.com/square/19',
    name: '女神',
    code: 'nvshen',

}, {
    url: 'http://www.meipai.com/square/63',
    name: '舞蹈',
    code: 'wudao',

}, {
    url: 'http://www.meipai.com/square/62',
    name: '音乐',
    code: 'yinyue',

}, {
    url: 'http://www.meipai.com/square/59',
    name: '美食',
    code: 'meishi',

}]

videoList.forEach(item => {
    getvideo(item.code, item.url)
})
function getvideo(type, baseUrl) {
    var videos = [];
    var url = baseUrl
    c.queue([{
        uri: url,
        callback: function (error, res, done) {
            if (error) {
                console.log(error)
            }
            else {
                var $ = res.$;
                $('ul#mediasList li').each(function () {
                    // console.log($(this))
                    videos.push(coverTovideos($(this)))
                    //    console.log(videos)

                })
                fs.writeFileSync(`./data/video_${type}.json`, JSON.stringify(videos))
                console.log(`写入文件完成video_${type}.json`)
            }
            done();
        }
    }])
}




function coverTovideos(tagvideo) {
    var obj = {}
    obj.title = tagvideo.find('p.content-name a').text()
    // console.log(obj.title)
    obj.autor = tagvideo.find('a.content-l-p strong').text()
    obj.img = tagvideo.find('img.db').attr('src')
    obj.link = tagvideo.find('div.content-l-video').data('video')
    obj.id = tagvideo.find('div.content-l-video').data('id')
    // videos.push(obj)
    return obj
}
