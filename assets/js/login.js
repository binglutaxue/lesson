$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $(' .login-box').show();
    })
    const { form ,layer} = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd(value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    $('#form_reg').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('.reg-box [name="username"]').val(),
                password: $('.reg-box [name="password"]').val(),
            }, 
            success(res) {
                if(res.status !== 0)
        {
                    layer.msg(res.message||'注册失败');
                    return;
                }
                layer.msg('注册成功');
                $('#link_login').click();
            }
        })
    })
    
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method:'POST',
            data:$(this).serialize(),
            success(res) {
            if(res.status!==0)
            {
            layer.msg(res.message || '登陆失败');
                return;
                }   
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            },
        })
    })
})
