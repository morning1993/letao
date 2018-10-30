$(function () {

  var page = 1;
  var pageSize = 5;
  var imgs = [];
  //页面渲染函数
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        $('tbody').html(template('tmp', info));
        //分页功能
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

  //商品分类添加
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');

    //渲染二级分类
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tmp2', info))
      }
    });

  });

  //二级分类li点击事件
  $('.dropdown-menu').on('click', 'li', function () {
    //获取到当前a的文本， 设置按钮
    $('.dropdown-text').html($(this).html());
    //获取到当前a的id， 设置给隐藏表单
    $('[name=brandId]').val($(this).data('id'));
    //让brandId校验成功
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  });

  //图片上传
  $('#file').fileupload({
    done: function (e, data) {
      if (imgs.length >= 3) {
        alert('不要再传了哦');
        return;
      }
      $('.img_box').append('<img src="' + data.result.picAddr + '" width="100" height="100">');
      imgs.push(data.result);
      //根据数组的长度，来修改picStatus的状态 如果长度为3 手动校验成功
      if (imgs.length === 3) {
        $('form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      } else {
        $('form').data('bootstrapValidator').updateStatus('picStatus', 'INVALID');
      }
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
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类',
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称',
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品的描述',
          }
        }
      },
      num: {
        //必须是1-99999之间的有效数字
        validators: {
          notEmpty: {
            message: '请输入商品的库存',
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: '请输入有效的库存(1-99999)',
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空',
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的尺码格式(xx-xx)',
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张商品图片'
          }
        }
      }
    }
  })

  //添加商品
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    var param = $('form').serialize();
    param += '&picName1=' + imgs[0].picName + '&picAddr1=' + imgs[0].picAddr;
    param += '&picName2=' + imgs[1].picName + '&picAddr2=' + imgs[1].picAddr;
    param += '&picName3=' + imgs[2].picName + '&picAddr3=' + imgs[2].picAddr;

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: param,
      success: function (info) {
        //关闭模态框
        $('.addModal').modal('hide');
        //渲染
        page = 1;
        render();

        //重置样式
        $('form').data('bootstrapValidator').resetForm(true);

        //手动重置分类选择和清除图片
        $('.dropdown-text').html('请选择二级分类');
        $('.img_box img').remove();
      }
    })



  })



})