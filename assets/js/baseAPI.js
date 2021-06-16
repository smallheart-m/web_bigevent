//每次使用$.get、$.post、$.ajax、之前都会先调用ajaxPrefilter这个函数；在这个函数中我们可以拿到给ajax请求的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //统一为有权限的接口 设置请求头headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = "/login.html"
        }
    }
})