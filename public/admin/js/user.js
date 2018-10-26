$(function () {

  var page = 1;
  var pageSize = 5;
  render();

  var id, isDelete;
  $('tbody').on('click','button', function () {
    $('#userModal').modal('show');
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-success') ? 0 : 1;
    console.log(id,isDelete);
    
  })

  $('.confirm').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete,
      },
      success: function (info) {
        $('#userModal').modal('hide');
        render();
      }
    })
  })

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize,
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


})