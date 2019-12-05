//[ue,shita,migi,hidari,migiue,hidariue,migishita,hidarishita]
$(document).ready(function(){
  //初期の4枚のうち2枚を青に変更する
  $('#no15').children().css('color','#2694ab');
  $('#no22').children().css('color','#2694ab');

  var turn = 0; //ターン管理変数/奇数：赤番，偶数：青番

  //マス目をクリックした時の処理
  $("[id^='no']").on('click',function(){
    //ターンカウントを1増やす
    turn = turn + 1
    //クリックしたマス目にすでに石が存在するかどうか
    var exist = $(this).text();

    //クリックした箇所の周囲を確認する
    id = $(this).attr("id").substr(2);
      //周囲のマス目の番号を取得する
      surroundArray = [];
      var a =surround(id);
      //周囲のマス目に置かれた石の色を確認する
      colorCheckArray = [];
      var c = checkColor(surroundArray)
      console.log(c)

    //隣接するマスに色が違うものが1つもなければおけない
    if(turn % 2 == 0){
      //偶数ターンのとき，青
        var result = c.indexOf("red");
        if(result != -1 && exist == ""){
          //opacity:0.5で仮置きする
          $(this).append("<p>●</p>").css('opacity','0.5');
          $(this).children().css('color','#2694ab');
        }else{
          alert("ここにはおけないよ")
          turn = turn -1
        }
    }else{
      //奇数ターンのとき，赤
      var result = c.indexOf("blue");
      if(result != -1 && exist == ""){
        //opacity:0.5で仮置きする
        $(this).append("<p>●</p>").css('opacity','0.5');
      }else{
        alert("ここにはおけないよ")
        turn = turn -1
      }
    }
  })//マス目をクリックした時の処理ここまで

  //石の確定処理
  //マスに置ける条件を満たした場合，opacity:1.0にする
  $('.img_maru').on('click',function(){

    alert('maru');
  })
  //マスにおける条件を満たしていない場合，仮置きを削除
  $('.img_batsu').on('click',function(){
    alert('batsu');
  })

  //検索する
  $('.search_btn').on('click', function() {
    let word = $('.search_text').val()
    window.open('http://www.google.co.jp/search?q=' + word);
  });


}); //document.ready内

const surround = function(id){
  //上
  if(id > 6){
    ue = Number(id) - 6;
  }else{
    ue = 0;
  }
    surroundArray.push(ue);
  //下
  if(id < 31){
    shita = Number(id) + 6;
  }else{
    shita = 0;
  }
    surroundArray.push(shita);
  //右
  if(id % 6 != 0){
    migi = Number(id) + 1;
  }else{
    migi = 0;
  }
    surroundArray.push(migi);
  //左
  if(id % 6 != 1){
    hidari = Number(id) - 1;
  }else{
    hidari = 0;
  }
    surroundArray.push(hidari)
  //右上
  if(id % 6 == 0 || id <= 6){
    migiue = 0;
  }else{
    migiue = Number(id) -5;
  }
    surroundArray.push(migiue);
  //左上
  if(id % 6 == 1 || id <= 6){
    hidariue = 0;
  }else{
    hidariue = Number(id) - 7;
  }
    surroundArray.push(hidariue)
  //右下
  if(id % 6 == 0 || id >= 31){
    migishita = 0;
  }else{
    migishita = Number(id) + 7;
  }
    surroundArray.push(migishita)
  //左下
  if(id % 6 ==1 || id >= 31){
    hidarishita = 0;
  }else{
    hidarishita = Number(id) + 5;
  }
    surroundArray.push(hidarishita);
  return surroundArray
}
//枠番号の入った配列を渡す→石が置いてあるかどうかを調べて返す
const checkSurroundArray = function(array){
  for(i=0;i<array.length;i++){
    var no = array[i]
    var val =$('#no'+ no).text();
    if(val == ""){
      checkArray.push(false);
    }else{
      checkArray.push(true);
    }
  }
    return checkArray
}
//周囲の石の色を確認する
const checkColor = function(array){
  for(i=0;i<array.length;i++){
    var no =array[i]
    var val = $('#no' + no).children().css('color');
    if(val == "rgb(38, 148, 171)"){
      colorCheckArray.push('blue');
    }else if(val == "rgb(234, 112, 112)"){
      colorCheckArray.push('red');
    }else{
      colorCheckArray.push(0);
    }
  }
  return colorCheckArray
}
