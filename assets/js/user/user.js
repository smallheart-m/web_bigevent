$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()
        // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                console.log(res);
                // 调用 form.val()快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置用户信息
    $('#btnreset').on('click', function(e) {
        // 组织表单按钮的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.mag('更新信息失败')
                }
                return layer.msg('更新信息成功')
                    // 调用父页面中的方法重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})