$(function() {
    getUserInfo();
    // 点击退出按钮
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1、清空本地存储的token
            localStorage.removeItem('token')
                // 2、跳转页面
            location.href = '/login.html'

            // 3、关闭询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = "/login.html"
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    // 渲染用户名
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 判断是否有图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show()
    }

}