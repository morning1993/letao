$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  //渲染方法
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        $('tbody').html(template('tmp', info));

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),

          onPageClicked: function (a, b, c, p) {
            // 修改了当前页
            page = p
            // 重新发送渲染整个页面
            render()
          }
        })
      }
    })
  }

  //一级分类添加
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');
  })

  //表单校验
  $('form').bootstrapValidator({
    // 配置的校验的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定所有字段的校验规则
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    }
  })

  //表单校验成功实践
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      success: function (info) {
        if (info.success) {
          page = 1;
          render();
          $('#addModal').modal('hide');
          //清除表单内容和样式
          $('form').data('bootstrapValidator').resetForm(true);

        }
      }
    })
  })

})

