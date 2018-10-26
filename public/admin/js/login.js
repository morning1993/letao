$(function () {

  $('form').bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格，自带的Glyphicons 字体图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段
    fields: {
      username: {
        //用户名里所有的校验规则
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空',
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间',
          },
          callback:{
            message:'用户名不存在',
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空',
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 15,
            message: '用户名长度必须在6到15之间',
          },
          callback:{
            message:'密码错误',
          }
        }
      },

    }
  })

  $("form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url: "/employee/employeeLogin",
      type: "POST",
      data: $("form").serialize(),

      success: function(info){
        console.log(info);
        if(info.success){
          location.href = "index.html"
        }

        // updateStatus(field, status, validator)
        //       field：name属性或者元素
        //      status:状态 NOT_VALIDATED(未校验), VALIDATING(校验中), INVALID(校验失败) or VALID(校验成功)
        if(info.error===1000){
          $("form")
          .data("bootstrapValidator")
          .updateStatus('username','INVALID','callback');
        }
        if(info.error===1001){
          $('form')
            .data('bootstrapValidator')
            .updateStatus('password', 'INVALID','callback');
        }
      }
    })
  });

  $('[type="reset"]').on('click',function(){
    $('form').data('bootstrapValidator').resetForm();
  })
})