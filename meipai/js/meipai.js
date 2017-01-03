var videoList = [{
    name: '女神',
    code: 'nvshen'
}, {
    name: '舞蹈',
    code: 'wudao'
}, {
    name: '音乐',
    code: 'yinyue'
}, {
    name: '美食',
    code: 'meishi'
}]

var strHtmlType = template('tplvideosType',{videoTypes:videoList})
$('#navList').html(strHtmlType)

$('#navList .list-group-item').click(function(){
    // 设置样式
    $('#navList .list-group-item').removeClass('active')
    $(this).addClass('active')
    
    // 根据分类id获取数据
    var tid = $(this).data('tid')

    getVideoData(tid)
})
/**
 * 获取数据
 */
function getVideoData(tid){
    $.getJSON(`/data/video_${tid}.json`,function(res){
        initHtml(res)
    })
}
/**
 * 拼接字符串
 */
function initHtml(data){
    var strHtml = ''
    // 渲染书籍数据
    strHtml = template('tplvideosList',{videos:data})
    console.log(strHtml)
    $('#videosContainer').html(strHtml)
    
}