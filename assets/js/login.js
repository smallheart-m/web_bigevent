$(function() {
    // 去往注册页面
    $('#link_reg').on('click', function() {
            $('.login_box').hide();
            $('.reg_box').show()
        })
        // 去往登录页面
    $('#link_login').on('click', function() {
            $('.login_box').show();
            $('.reg_box').hide()
        })
        // 从layui中获取form
    var form = layui.form
    var layer = layui.layer;
    // 通过form.verify()方法自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('.reg_box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }

        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = { username: $('#form_reg [name = username]').val(), password: $('#form_reg [name = password]').val() }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录！')
                    // 手动调用点击事件
                $('#link_login').click()
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                    // 跳转到后台页面
                    // location.href = 'index.html'
            }
        })
    })
})