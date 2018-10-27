$(function () {
  var page = 1;
  var pageSize = 5;

  //页面渲染函数
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        
        $('tbody').html(template('tmp', info));

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  render();

  //添加二级分类功能
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');

    //渲染一级分类
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tmp2', info))
      }
    })
  })

  //一级分类选择功能
  $('.dropdown-menu').on('click', 'li', function () {
    //修改内容
    $('.dropdown-text').html($(this).children().html());

    //把ID值赋值给隐藏域
    $('[name=categoryId]').val($(this).data('id'));

    //通过updateStatus方法，把校验改成成功
    $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  // 图片上传
  $('#file').fileupload({
    done: function (e, data) {
      // 显示图片
      $('.img_box img').attr('src', data.result.picAddr);

      //把图片地址设置给隐藏域
      $('[name=brandLogo]').val(data.result.picAddr);

      $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })

  //表单校验
  $('form').bootstrapValidator({
    // 让隐藏的表单也参与校验
    excluded: [],
    // 配置的校验的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类的名称不能为空'
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一个一级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传二级分类的图片'
          }
        }
      }
    }
  })

  //表单校验成功事件
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('form').serialize(),
      success:function(info){
        if(info.success){
          page=1;
          render();

          //关闭模态框
          $('#addModal').modal('hide');

          //重置样式
          $('form').data('bootstrapValidator').resetForm(true);

          //手动重置一级选择框和图片
          $('.dropdown-text').html('请选择一级分类');
          $('.img_box img').attr('src','images/none.png');
        }
      }
    })
  })





})