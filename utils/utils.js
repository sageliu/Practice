/*
 *
 * */

var utils = {};
var _u = utils;

/*
 *工具库方法：
 *
 * */


/*----------------------------------------------------------------------------------------------------*/
/*
 * listToArray:将类数组转换为数组，兼容所有浏览器;
 * @parameter
 *   likeAry:[object] 需要转换的类数组
 * @return
 *   [array] 将类数组转换成功后的数组
 * by Team in 2015/11/04
 */

_u.listToArray = function (likeAry) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeAry, 0);
    } catch (e) {
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
};


/*----------------------------------------------------------------------------------------------------*/
//把一个字符串转换为JSON格式的对象
//toJSON: function (str) {
//    try {
//        return JSON.parse(str);
//    } catch (e) {
//        return eval("(" + str + ")");
//    }
//},
//第二种方式

_u.toJSON = function (str) {
    return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
};


/*----------------------------------------------------------------------------------------------------*/
/*
 * isType:检测数据类型
 * @parameter
 *   value:要检测的数据类型的值
 *   type:[string] 要判断的数据类型字符串,例如:"Function"、"Array"、"Number"、"Object"...
 *   reg:匹配输入字符串大小写，大小写都可以得到验证
 * @return:[boolean] true代表是这个数据类型 false代表不是这个数据类型
 */

_u.isType = function isType(value, type) {
    var reg = new RegExp("^\\[object " + type + "\\]$", "i");
    return reg.test(Object.prototype.toString.call(value, type));
};


/*----------------------------------------------------------------------------------------------------*/
/*
 * getCss:获取当前元素的某一个属性的样式值
 * @parameter
 *   curEle:[object] 当前要操作的那个元素
 *   attr:[string] 当前要获取的样式属性名
 * @return
 *   获取的最后结果值
 * by team on 2015/11/11
 */

_u.getCss = function (curEle, attr) {
    var reg = /^[+-]?(?:\d|[1-9]\d+)(?:\.\d+)?(px|em|rem|pt|pc|mm)$/g, val = null;
    val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
    return reg.test(val) ? parseFloat(val) : val;
};

/*----------------------------------------------------------------------------------------------------*/

/*
 * 获取某元素到body的偏移量 top，left
 * */
_u.offset = function (curEle) {
    var osp = curEle.offsetParent, osl = curEle.offsetLeft, ost = curEle.offsetTop;
    while (osp) {
        if (window.navigator.userAgent.indexOf("MSIE 8") < 0) {
            osl += osp.clientLeft;
            ost += osp.clientTop;
        }
        osl += osp.offsetLeft;
        ost += osp.offsetTop;
        osp = osp.offsetParent;
    }
    return {top: ost, left: osl};
};
/*----------------------------------------------------------------------------------------------------*/

/*
 * 获取指定元素的下一个弟弟元素节点
 * */
//getNextEle: function (ele) {
//    var next = ele.nextSibling;
//    if (next.nodeType == 1) {
//        return next;
//    }
//    if (next.nextSibling) {
//        return arguments.callee(ele);
//    }
//    return null;
//}
//与上面方法相同
_u.getNextEle = function (ele) {
    if (typeof ele.nextElementSibling == "object") {
        return ele.nextElementSibling;
    } else {
        var next = ele.nextSibling;
        while (next) {
            if (next.nodeType === 1) {
                return next;
            }
            next = next.nextSibling;
        }
        return null;
    }
};
/*----------------------------------------------------------------------------------------------------*/
/*
 * 获取指定标签名ele下所有标签名为tagName的弟弟元素节点
 * */
_u.getNextAll = function (ele, tagName) {
    var next = this.getNextEle(ele), ary = [];
    if (tagName && typeof tagName == "string") {
        while (next) {
            if (next.tagName.toLowerCase() === tagName.toLowerCase()) {
                ary.push(next);
            }
            next = this.getNextEle(next);
        }
    } else {
        while (next) {
            ary.push(next);
            next = this.getNextEle(next);
        }
    }
    return ary;
};
/*----------------------------------------------------------------------------------------------------*/
/*
 * 获取指定元素上一个哥哥元素节点
 * */
_u.getPrevEle = function (ele) {
    if (typeof ele.prevElementSibling == "object") {
        return ele.prevElementSibling;
    } else {
        var prev = ele.previousSibling;
        if (prev) {
            if (prev.nodeType === 1) {
                return prev;
            } else {
                return arguments.callee(prev);//递归方式
            }
        } else {
            return null;
        }
    }
};
/*----------------------------------------------------------------------------------------------------*/
/*
 * 获取指定标签名ele下的所有标签名为tagName的哥哥元素节点
 * */
_u.getPrevAll = function (ele, tagName) {
    var pre = this.getPrevEle(ele), ary = [];
    if (tagName && typeof tagName === "string") {
        while (pre) {
            if (pre.tagName.toLowerCase() === tagName.toLowerCase()) {
                ary.unshift(pre);
            }
            pre = this.getPrevEle(pre);
        }
    } else {
        while (pre) {
            ary.unshift(pre);
            pre = this.getPrevEle(pre);
        }
    }
    return ary;
};
/*-----------------------------------------------------------------------------------------------------*/
/*
 *
 * */
_u.getSibling = function (ele) {
    var prev = this.getPrevEle(ele);
    var next = this.getNextEle(ele);
    var ary = [];
    prev ? ary[ary.length] = prev : null;
    next ? ary[ary.length] = next : null;
    return ary;

};
/*-----------------------------------------------------------------------------------------------------*/

/*
 * 获取指定元素所有的兄弟元素节点
 * */
_u.getSiblings = function (ele) {
    var preA = this.getPrevAll(ele);
    var nexA = this.getNextAll(ele);
    return preA.concat(nexA);
};

//_u.getSiblings = function (ele) {
//    var ary = [];
//    if (ele.previousElementSibling && ele.nextElementSibling) {
//        var pervEle = ele.previousElementSibling;
//        var nextEle = ele.nextElementSibling;
//        while (pervEle) {
//            ary.unshift(pervEle);
//            pervEle = pervEle.previousElementSibling;
//        }
//        while (nextEle) {
//            ary.push(nextEle);
//            nextEle = nextEle.nextElementSibling;
//        }
//    } else {
//        var pre = ele.previousSibling;
//        while (pre) {
//            if (pre.nodeType === 1) {
//                ary.unshift(pre);
//            }
//            pre = pre.previousSibling;
//        }
//        var next = ele.nextSibling;
//        while (next) {
//            if (next.nodeType === 1) {
//                ary.push(next);
//            }
//            next = next.nextSibling;
//        }
//    }
//    return ary;
//
//};

//getSiblings: function (ele) {
//    var ary = [];
//    var sibAll = ele.parentNode.children;//children在IE下个数无法确定
//    for (var i = 0; i < sibAll.length; i++) {
//        if (sibAll[i] != ele && sibAll[i].nodeType === 1) {
//            ary.push(sibAll[i]);
//        }
//    }
//    return ary;
//}
/*-----------------------------------------------------------------------------------------------------*/

/*
 * 获取在指定所有元素节点集eleAll中找出最后的元素节点
 * */

_u.getLastEle = function (eleAll) {
    if (eleAll && eleAll.length && eleAll.length > 0) {
        var ary = [];
        for (var i = 0; i < eleAll.length; i++) {
            if (eleAll[i] && eleAll[i].nodeType && eleAll[i].nodeType === 1) {
                var ele = utils.getNextEle(eleAll[i]);
                if (ele == null) {
                    ary.push(eleAll[i]);
                }
            } else {
                var n = i + 1;
                alert("参数中第 " + n + " 个对象，不符合条件！");
                throw new Error("参数中第 " + n + " 个对象，不符合条件！")
            }
        }
        return ary;
    }
};
/*-----------------------------------------------------------------------------------------------------*/
/*
 * 获取在指定所有元素节点集eleAll中找出第一个的元素节点
 * */

_u.getFirstEle = function (eleAll) {
    if (eleAll && eleAll.length && eleAll.length > 0) {
        var ary = [];
        for (var i = 0; i < eleAll.length; i++) {
            if (eleAll[i] && eleAll[i].nodeType && eleAll[i].nodeType === 1) {
                var ele = utils.getPrevEle(eleAll[i]);
                if (ele == null) {
                    ary.push(eleAll[i]);
                }
            } else {
                var n = i + 1;
                alert("参数中第 " + n + " 个对象，不符合条件！");
                throw new Error("参数中第 " + n + " 个对象，不符合条件！")
            }
        }
        return ary;
    }
};


/*-----------------------------------------------------------------------------------------------------*/
/*
 * getEleChildren:获取指定元素下标签名为tagName的所有子元素
 * @parameter
 *    ele:[object]当前要操作的元素
 *    tagName:[string]指定想要获取的子元素的标签名
 */

//getEleChildren: function (ele, tagName) {
//    var ary = [];
//    var oChild = ele.childNodes;
//    if (tagName && tagName.nodeType == 1) {
//        for (var i = 0; i < oChild.length; i++) {
//            if (oChild[i].nodeType == 1 && oChild[i].tagName == node.toUpperCase()) {
//                ary.push(oChild[i]);
//            }
//        }
//        return ary;
//    } else {//如果tagName参数没传，则将ele下的所有元素节点获取并返回
//        for (i = 0; i < oChild.length; i++) {
//            if (oChild[i].nodeType == 1) {
//                a.push(oChild[i]);
//            }
//        }
//        return ary;
//    }
//},

_u.getEleChildren = function (ele, tagName) {
    var nodeList = ele.childNodes, ary = [], reg;
    if (typeof tagName === "string") {
        tagName = tagName.toUpperCase();
        reg = new RegExp("^" + tagName + "$");
    } else if (typeof tagName === "undefined") {
        reg = /^[A-Z][A-Z0-9_]*$/;
    } else {
        throw new Error("参数错误");
    }
    for (var i = 0; i < nodeList.length; i++) {
        if (reg.test(nodeList[i].nodeName)) {
            ary.push(nodeList[i]);
        }
    }
    return ary;

    //if (tagName && typeof tagName == "string") {
    //    var tName = tagName.toUpperCase();
    //    for (var i = 0; i < nodeList.length; i++) {
    //        if (nodeList[i].nodeType === 1 && nodeList[i].tagName === tName) {
    //            ary.push(nodeList[i]);
    //        }
    //    }
    //    return ary;
    //} else {
    //    for (var j = 0; j < nodeList.length; j++) {
    //        if (nodeList[j].nodeType === 1) {
    //            ary.push(nodeList[j]);
    //        }
    //    }
    //    return ary;
    //}
};
/*-----------------------------------------------------------------------------------------------------*/
_u.getIndex = function () {
    var index = 0;
    var pre = this.previousSibling;
    while (pre) {
        if (pre.nodeType === 1) {
            index++;
        }
        pre = pre.previousSibling;
    }
    return index;
};
/*-----------------------------------------------------------------------------------------------------*/
//_u.getElementsByClass = function (strClass, context) {//context是上下文
//    context = context || document;
//    var tagList = context.getElementsByTagName("*");
//    if (strClass.trim) {
//        strClass = strClass.trim();//不但去掉了首尾空格，还把中间多余的空格也去掉了。
//    } else {
//        var regTrim = /^ +| +$/g;
//        strClass = strClass.replace(regTrim, "");
//    }
//    var aClass = strClass.split(/ +/);
//
//    for (var i = 0; i < aClass.length; i++) {
//        //tagList=byClass(aClass[i],tagList);
//        //在下面，要把byClass实现的逻辑在这里再实现一遍
//        //aClass[i]里面放的是具体每一个类名，通过这个类名生成正则，然后去匹配元素就可以了
//
//        var reg = new RegExp("(^| )" + aClass[i] + "( |$)");
//        var a = [];//要把筛选的结果保存下来
//        for (var j = 0; j < tagList.length; j++) {
//            var ele = tagList[j];
//            if (reg.test(ele.className)) {
//                a.push(ele);
//            }
//        }
//        tagList = a;//相当于return a之后，tagList
//
//    }
//    return tagList;
//};

_u.getElementsByClass = function (strClass, context) {
    //this->_utils
    context = context || document;

    //确定当前的浏览器兼容getElementsByClassName方法，我们可以直接使用这个方法，在实施情境语境
    if ("getElementsByClassName" in document) {
        return this.listToArray(context.getElementsByClassName(strClass));
    }

    //在不兼容的情况下，我们必须编写代码来处理兼容
    var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i], flag = true;
        for (var k = 0; k < strAry.length; k++) {
            var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
            if (!reg.test(curTag.className)) {
                flag = false;
                break;
            }
        }
        flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};
/*-----------------------------------------------------------------------------------------------------*/
//给指定的元素ele增加一个类名
_u.addClass = function (ele, strClass) {
    var reg = new RegExp("(^| )" + strClass + "( |$)");
    if (!reg.test(ele.className)) {
        ele.className += " " + strClass;
    }
};
/*-----------------------------------------------------------------------------------------------------*/
_u.removeClass = function (ele, strClass) {
    var reg = new RegExp("(^| )" + strClass + "( |$)", "g");
    ele.className = ele.className.replace(reg, " ");//这儿是空格，不是空字符串

    //"a b c";如果是去掉b，用正则匹配捕获到的是" b ",如果用空字符串替换，a和c就粘在一起了

};
/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------*/



