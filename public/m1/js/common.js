// 初始化区域滚动容器
mui('.mui-scroll-wrapper').scroll({
  indicators: false
})

// 初始化轮播图
mui('.mui-slider').slider({
  interval: 2000
})

// 把地址栏中所有的参数都解析成一个对象
function getSearch() {
  //1. 先通过location.search获取到所有的参数
  var search = location.search
  //2. 对这个字符串进行解码 得到中文
  //?key=阿迪&name=zs&age=18
  search = decodeURI(search)
  // 3. 去除？    key=阿迪&name=zs&age=18
  search = search.slice(1)
  // 4. 根据&符切成 数组  ["key=阿迪", "name=zs", "age=18"]
  var arr = search.split('&')
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    // 对 arr[i] 对 = 进行切割
    var key = arr[i].split('=')[0]
    var value = arr[i].split('=')[1]
    obj[key] = value
  }
  return obj
}
