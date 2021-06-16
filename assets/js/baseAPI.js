//每次使用$.get、$.post、$.ajax、之前都会先调用ajaxPrefilter这个函数；在这个函数中我们可以拿到给ajax请求的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})