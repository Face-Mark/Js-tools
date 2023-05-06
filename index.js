/* 千位分隔符 */
export function thousandBitSeparator(num) {
  num = Accuracy.ToRound(num, 2, true).toString().split(".");
  var arr = num[0].split("").reverse(),
    res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(",");
    }
    res.push(arr[i]);
  }
  res.reverse();
  res = num[1] ? res.join("").concat("." + num[1]) : res = res.join("");
  return res;
}

/* 常用设备判断 */
export function Os() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isChrome: isChrome,
    isPc: isPc
  }
}

/**
 * 从地址栏获取参数
 * @param { String } k 参数名
 */
export function getSearch(k) {
  var str = location.search
  str = str.slice(1)
  var arr = str.split('&')
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i].split('=')[0]
    var value = arr[i].split('=')[1]
    obj[key] = value
  }
  return obj[k]
}

/**
 * 从地址栏获取参数
 * @param { String } name 参数名
 * @param { String } link 链接地址，可以不传
 */
export function GetUrlParam(name, link) {
  /* rParam */
  var name = escape(name),
    link = link == null || link == "" ? window.location.href : link,
    r = null,
    link = link.substring(link.indexOf("?"), link.length);
  /* 构造一个含有目标参数的正则表达式对象 */
  /* 匹配目标参数 */
  var reg = new RegExp("(^|&|_)" + name + "=([^(&|_)]*)((&|_)|$)"),
    r = escape(link.substr(1)).replace(/%3D/g, '=').replace(/%26/g, '&').match(reg);
  /* 返回参数值 */
  if (r != null) return decodeURIComponent(unescape(r[2]));
  return "";
};

/* 移动常用设备判断 */
export function mobileOs() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return 'weixin'
  } else if (ua.match(/QQ/i) == "qq") {
    return 'qq'
  } else if ((ua.match(/weibo/i) == "weibo")) {
    return 'weibo'
  } else if ((ua.match(/dingtalk/i) == "dingtalk")) {
    return 'dingding'
  } else {
    return 'other'
  }
}

/**
 * 下载图片
 *@param { String } url 图片地址
 *@param { String } fileName 图片名称
 */
export function DownImg(url, fileName) {
  let downImg = document.createElement('a')
  downImg.href = url
  downImg.download = fileName
  downImg.click()
}

/**
 * Cookie相关操作
 * @param { String/Object } obj 传入的值（对象或者字符串）
 * 例： onCookie(name)
 *      onCookie({type:"get",name:"名"})
 *      onCookie({type:"set",name:"名",value:"值",data:{domain:"",path:"",expires:"",}})
 *      onCookie({type:"del",name:"名"})
 */
export function onCookie(obj) {
  var obj = obj,
    name = typeof (obj) != "object" ? obj : obj.name;

  function getfn(name) {
    var name = name,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"),
      arr = !document.cookie.match(reg) ? null : unescape(document.cookie.match(reg)[2]);
    return arr;
  }
  if (!obj.type || obj.type === "get" || typeof (obj) != "object") {
    return getfn(name);
  }
  switch (obj.type) {
    case "set":
      var prototype = Object.prototype.toString.call(obj.value);
      if (prototype == "[object Object]" || prototype == "[object Array]") {
        obj.value = JSON.stringify(obj.value);
      }
      value = escape(obj.value);
      var setTime = new Date(),
        setDomain = obj.data && obj.data.domain ? ";domain=" + obj.data.domain : ";domain=.homedo.com",
        set = obj.data && obj.data.expires ? setTime.getTime() + Number(obj.data.expires) : setTime.getTime() + (1000 * 60 * 60 * 24 * 365 * 100),
        setPath = obj.data && obj.data.path ? ";path=" + obj.data.path : ";path=/";
      setTime.setTime(set);
      document.cookie = name + "=" + value + setDomain + setPath + ";expires=" + setTime.toGMTString();
      break;
    case "del":
      var exp = new Date(),
        cval = getfn(name);
      exp.setTime(exp.getTime() - 1);
      if (cval) {
        var setPath = obj.data && obj.data.path ? ";path=" + obj.data.path : ";path=/",
          setDomain = obj.data && obj.data.domain ? ";domain=" + obj.data.domain : ";domain=.homedo.com";
        document.cookie = name + "=" + cval + setDomain + setPath + ";expires=" + exp.toGMTString();
      }
      break;
  }
}

/**
 * 字符长度
 * @param { String } b Number string
 */
export function byte(b) {
  var b = b,
    l = b.replace(/[\u4e00-\u9fa5]*/g, '').length,
    m = b.replace(/[^\u4e00-\u9fa5]*/g, '').length;
  return l + (m * 2);
};

/**
 * 浮点数
 * @param { String } o type(向上取整：Upper, 向下取整：Lower, 四舍五入：Round)
 * @param { Number } v 值
 * @param { Number } n 取整位数
 * @param { Number } f 是否保留小数点后0
 */
export function Accurac(o, v, n, f) {
  var o = o,
    v = v,
    n = n == null ? 0 : n,
    f = f,
    r = null;
  var MultiplyTen = function (v, n) {
    var v = v,
      n = n;
    for (var i = 0; i < n; i++) {
      v = v * 10;
    }
    return v;
  };
  switch (o) {
    case "Lower":
      r = Math.floor(MultiplyTen(v, n)) / Math.pow(10, n);
      break;
    case "Upper":
      r = Math.ceil(MultiplyTen(v, n)) / Math.pow(10, n);
      break;
    case "Round":
      r = Math.round(MultiplyTen(v, n)) / Math.pow(10, n);
      break;
    default:
      r = v;
  }
  return f ? r.toFixed(n) : r;
};

/**
 * ios h5页面回退刷新（未测试）
 */
export function blackReload() {
  var browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
  if (browserRule.test(navigator.userAgent)) {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload()
      }
    };
  }
};

/**
 * 本地存储图片
 * @param {*} file // 文件流
 */
export function getImgUrlLoad(file) {
  try {
    var URL = window.URL || window.webkitURL;
    var imgURL = URL.createObjectURL(file);
    var imgList = []
    imgList.push(imgURL)
    URL.revokeObjectURL(imgURL); // 释放内存
    return imgList
  } catch (e) {
    try {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        imgList.push(event.target.result)
      };
      fileReader.readAsDataURL(file);
      return imgList
    } catch (e) {
      alert('上传失败')
    }
  }
};

/**
 * 监听页面滚动-->底部--（减30）
 * @param {*} callback 回调
 */
export function ScrollLoad(callback) {
  window.addEventListener('scroll', function () {
    var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
      clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
    if ((clientHeight + scrollTop >= scrollHeight - 30)) {
      callback && callback()
    }
  })
};

/**
 * Detecting data types
 */
export function DataType() {
  var _toString = Object.prototype.toString;
  DataType.prototype.toRawType = (value) => {
    return _toString.call(value).slice(8, -1)
  }
  DataType.prototype.isPlainObject = (value) => {
    return _toString.call(value) === '[object Object]'
  }
  DataType.prototype.isRegExp = (value) => {
    return _toString.call(value) === '[object RegExp]'
  }
  DataType.prototype.isArry = (value) => {
    return _toString.call(value) === '[object Array]'
  }
  DataType.prototype.isString = (value) => {
    return _toString.call(value) === '[object String]'
  }
  DataType.prototype.isBoolean = (value) => {
    return _toString.call(value) === '[object Boolean]'
  }
}

/**
 * Remove an item from an array
 * @param { Array } arr arry
 * @param { Number } item 需要截取的值
 * return 截取项
 */
export function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * 地址栏添加参数
 * @param { String } uri 需要改变的地址链接
 * @param { String } par 需要改变或者增加的参数名称
 * @param { String } par_value 需要改变或者增加的参数值
 */
export function changeURLPar(uri, par, par_value) {
  var pattern = par + '=([^&]*)';
  var replaceText = par + '=' + par_value;
  if (uri.match(pattern)) { //如果连接中带这个参数
    var tmp = '/\\' + par + '=[^&]*/';
    tmp = uri.replace(eval(tmp), replaceText);
    return (tmp);
  } else {
    if (uri.match('[\?]')) { //如果链接中不带这个参数但是有其他参数
      return uri + '&' + replaceText;
    } else { //如果链接中没有带任何参数
      return uri + '?' + replaceText;
    }
  }
}

/**
 * @param { String } message 提示语
 * @param { Number } time 时间（毫秒）
 */
export function Toast(params) {
  var el = document.createElement("div");
  el.setAttribute("id", "toast");
  el.innerHTML = params.message;
  document.body.appendChild(el);
  el.classList.add("fadeIn");
  setTimeout(function () {
    el.classList.remove("fadeIn");
    el.classList.add("fadeOut");
    el.addEventListener("animationend", function () {
      el.classList.add("hide");
    });
  }, params.time);
}

/**
 * 自动引入当前文件夹下所有module
 * require.context(directory, useSubdirectories = false, regExp = /^.//);
 * @param {String} directory 读取文件的路径
 * @param {Boolean} directory 匹配文件的正则表达式
 * @param {regExp} regExp 读取文件的路径
 */
export function Modules() {
  const modulesFiles = require.context('./modules', true, /.js$/)
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^.\/(.*)\.js/,'$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
}

/**
 * 子集id查找所有父级id
 * @param {Array} data 数组对象
 * @param {String, Number} id 子级id
 * @param {Array} arr 返回值
 */
 export function get_level_all(data, id, arr = []) {
  data.find((item) => {
    if (item.id === id) {
      arr.push(item.id)
      return true
    } else if (item.hasChildren && item.children.length) {
      arr = get_level_all(item.children, id, arr)
      if (arr.length) {
        arr.push(item.id)
        return true
      } else {
        return false
      }
    }
    return false
  })
  return arr
}