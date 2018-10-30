//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
});

//初始化轮播图
mui('.mui-slider').slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//把地址栏中所有的参数都解析成一个对象
function getSearch(){
  //将地址栏参数都解析成一个对象
  var search = location.search;
  
  search = decodeURI(search);
  search = search.slice(1);
  var arr = search.split('&')
  
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i].split('=')[0];
    var value = arr[i].split('=')[1];
    obj[key] = value;
  }
  return obj;
}