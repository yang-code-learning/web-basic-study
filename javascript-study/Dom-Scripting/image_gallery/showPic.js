function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') { //还没有绑定函数的状态
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

/* 
里面的alert纯属闹着玩，不过很有意思：
body元素的</body>后的空格换行也纳入body的孩子（其他元素好像没有这个特性）
另外注释也算一种节点
这个函数第一个分支只有以<ul></body><html>其中没有任何其他符号才会进入
*/
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  //alert(parent.lastChild.nodeName);
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
    //alert("1");
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
    //alert("2");
  }
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id", "placeholder");
  placeholder.setAttribute("src", "images/placeholder.gif");
  placeholder.setAttribute("alt", "my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id", "description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(placeholder, gallery);
  insertAfter(description, placeholder);
}

function prepareGallery() { //准备链接点击时功能，就是修改onclick
  //向后兼容性
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  //分离，没有gallery的元素也行，有就执行函数（设置点击动作）
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      return !showPic(this); //注意这里要填参数
    }
    links[i].onkeypress = links[i].onclick;
  }
}

/* 
展示图片的实际操作
这里的很多分离判断，如果有prepareplaceholder就没有必要写了
*/
function showPic(whichpic) {
  //分离，没有图片放的地方就算了（但图片还是有的话就会直接跳转连接）
  if (!document.getElementById("placeholder")) return false;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  //分离，有图片放的地方还不行，如果不是img是text不行（这个应该放前面）
  if (placeholder.nodeName != "IMG") return false;
  placeholder.setAttribute("src", source);

  //同理，得先存在，否则不处理
  if (document.getElementById("description")) {//（这个是副业，换图才是主业，换图失败了才返回false，因此这里不用返回false）
    var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : " ";//处理没有title属性的情况
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) { //得是文本类型才替换新的文本
      description.firstChild.nodeValue = text;
    }
  }
  return true;
}

/* function countBodychildren() { //检查nodetype，纯测试没用
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
    for(var i=0;i<body_element.childNodes.length;i++)
    {
        alert(body_element.childNodes[i].nodeType);
    }
}
window.onload = countBodychildren; */

addLoadEvent(preparePlaceholder)
addLoadEvent(prepareGallery);
