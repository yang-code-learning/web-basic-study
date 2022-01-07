/* 
����С�������һЩ��������չʾ������
1. ���Դ�Ԫ��abbr(����title����) 
2. ������Դ��blockquote(����cite����)
3. ���ÿ�ݼ���a(accesskey����)
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
  //��������
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

  var abbrrviation = document.getElementsByTagName("abbr");
  if (abbrrviation.length < 1) return false;
  var defs = new Array();
  for (var i = 0; i < abbrrviation.length; i++) {
    var current_abbr = abbrrviation[i];
    var definition = current_abbr.getAttribute("title"); //���Դ�˵��
    var key = current_abbr.lastChild.nodeValue; //���Դʱ���
    defs[key] = definition; //�������飬����������������
  }

  var dlist = document.createElement("dl");
  for (key in defs) { //����ѭ���������������ǽ��
    //���ɱ����ͷ
    var dtitle = document.createElement("dt");
    var dt_text = document.createTextNode(key);
    dtitle.appendChild(dt_text);

    //���ɱ�������
    var ddesc = document.createElement("dd");
    var dd_text = document.createTextNode(defs[key]);
    ddesc.appendChild(dd_text);

    //һ��������뵽����
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  //���ɱ���
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
    if (!quotes[i].getAttribute("cite")) continue; //�����������ö���˵����Դ
    var url = quotes[i].getAttribute("cite");
    //������Դ�������ĺ��棬��Ҫ�ҵ�����λ�ã���lastchild��һ����<p>������ǿո�/���ж���Ԫ��
    var quote_children = quotes[i].getElementsByTagName('*');
    if (quote_children.length < 1) continue; //�������ݲ�һ����Ԫ����p������������о������ģ�����û��ǰ�ߴ���
    var elem = quote_children[quote_children.length - 1];

    //������������
    var link = document.createElement("a");
    var link_text = document.createTextNode("source");
    link.appendChild(link_text);
    link.setAttribute("href", url);

    var superscripts = document.createElement("sup");//����Ϊ�ϱ��Ч��������em
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
    var text = current_link.lastChild.nodeValue;//�������ã���һ</a>��ո�����
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