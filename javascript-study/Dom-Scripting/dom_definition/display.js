/* 
增加小组件，把一些隐藏属性展示出来：
1. 缩略词元素abbr(包含title属性) 
2. 文献来源表blockquote(包含cite属性)
3. 设置快捷键表a(accesskey属性)
*/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

function displayAbbreviations() {
  //向后兼容性
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

  var abbrrviation = document.getElementsByTagName("abbr");
  if (abbrrviation.length < 1) return false;
  var defs = new Array();
  for (var i = 0; i < abbrrviation.length; i++) {
    var current_abbr = abbrrviation[i];
    var definition = current_abbr.getAttribute("title"); //缩略词说明
    var key = current_abbr.lastChild.nodeValue; //缩略词本身
    defs[key] = definition; //关联数组，索引不局限于数字
  }

  var dlist = document.createElement("dl");
  for (key in defs) { //这里循环的是索引，而非结果
    //生成表项表头
    var dtitle = document.createElement("dt");
    var dt_text = document.createTextNode(key);
    dtitle.appendChild(dt_text);

    //生成表项数据
    var ddesc = document.createElement("dd");
    var dd_text = document.createTextNode(defs[key]);
    ddesc.appendChild(dd_text);

    //一条表项加入到表中
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  //生成标题
  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  document.body.appendChild(header);
  document.body.appendChild(dlist);
}

function displayCitations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

  var quotes = document.getElementsByTagName("blockquote");
  for (var i = 0; i < quotes.length; i++) {
    if (!quotes[i].getAttribute("cite")) continue; //不是所有引用都有说明来源
    var url = quotes[i].getAttribute("cite");
    //引用来源放在引文后面，需要找到引文位置，而lastchild不一定是<p>，多半是空格/换行而非元素
    var quote_children = quotes[i].getElementsByTagName('*');
    if (quote_children.length < 1) continue; //引文内容不一定由元素如p包裹，但如果有就是引文，这里没对前者处理
    var elem = quote_children[quote_children.length - 1];

    //生成引用链接
    var link = document.createElement("a");
    var link_text = document.createTextNode("source");
    link.appendChild(link_text);
    link.setAttribute("href", url);

    var superscripts = document.createElement("sup");//修饰为上标的效果，类似em
    superscripts.appendChild(link);
    elem.appendChild(superscripts);
  }
}

function displayAccesskeys() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

  var links = document.getElementsByTagName("a");
  var akeys = new Array();
  for (var i = 0; i < links.length; i++) {
    var current_link = links[i];
    if (!current_link.getAttribute("accesskey")) continue;
    var key = current_link.getAttribute("accesskey");
    var text = current_link.lastChild.nodeValue;//这样不好，万一</a>后空格了呢
    akeys[key] = text;
  }

  var list = document.createElement("ul");
  for (key in akeys) {
    var str = key + ": " + akeys[key];
    var item = document.createElement("li");
    var item_text = document.createTextNode(str);
    item.appendChild(item_text);
    list.appendChild(item);
  }

  var header = document.createElement("h3");
  var header_text = document.createTextNode("Accesskeys");
  header.appendChild(header_text);

  document.body.appendChild(header);
  document.body.appendChild(list);
}

addLoadEvent(displayAbbreviations);
addLoadEvent(displayCitations);
addLoadEvent(displayAccesskeys);