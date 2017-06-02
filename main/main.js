"use strict"

const loadAllItems = require('./loadAllItems.js');

module.exports = function main() {
    console.log("Debug Info");
    // console.log("***<没钱赚商店>购物清单***\n");
    var input = new Array();
    input = [
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000000',
        'ITEM000001',
        'ITEM000001',
        'ITEM000004'
    ];
    return getList(input);
};

// var inforMap = new Array();//（项目，值）
var inforMap = loadAllItems();
//console.log(inforMap);

function getList(barCodes) { //输入消费商品编号数组

  var count = new Map();//存储购买的每种商品商品数量(商品编号，数量)
    var value = 1;
    count.set(barCodes[0],value);

  for(var i = 1; i < barCodes.length; i++) {

      if(count.has(barCodes[i])) { //若count中已存在该商品，则该商品数量加一
        value++;
        count.set(barCodes[i],value)
      }

      else {
        value = 1;
        count.set(barCodes[i],value);//若匹配，且count中不存在该商品，则将商品编号放入count中
      }

  }
  //console.log(count);
  var result = new Array();
  result.push("***<没钱赚商店>购物清单***\n")
  var sum = 0;//累计商品价格
  for(var item of count) {
    for(var i = 0; i < inforMap.length; i++) {
      if(item[0] == inforMap[i].barcode) {
        result.push('名称：'+inforMap[i].name+'，数量：'+item[1]+inforMap[i].unit+'，单价：'+inforMap[i].price.toFixed(2)+'(元)，小计：'+(item[1]*inforMap[i].price).toFixed(2)+'(元)\n');
        // console.log('名称：'+inforMap[i].name+'，数量：'+count.get(key)+'，单价：'+inforMap[i].price+'，小计：'+count.get(key)*inforMap.price+'(元)\n');
        sum = sum + item[1]*inforMap[i].price.toFixed(2);
      }
    }

  }
  result.push('----------------------\n');
  result.push('总计：'+sum.toFixed(2)+'(元)\n');
  result.push('**********************');

  return result.join("");
}
