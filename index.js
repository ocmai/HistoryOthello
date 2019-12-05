//[ue,shita,migi,hidari,migiue,hidariue,migishita,hidarishita]
$(document).ready(function(){
  //初期の4枚を色変え
  $('#no15').children().css('color','#2694ab');
  $('#no16').children().css('color','#ea7070');
  $('#no21').children().css('color','#ea7070');
  $('#no22').children().css('color','#2694ab');

  //地域をランダムで表示させる
  var region_data =['日本','中国','イギリス','フランス','ロシア','イスラム','南北アメリカ','アジア','ヨーロッパ','東南アジア'];
  region_random = [];
  var min = 1;
  var region_max = region_data.length;
  //重複しない乱数を生成する
  for(i = min; i <= region_max; i++){
    while(true){
      var tmp = intRandom(min, region_max);
      if(!region_random.includes(tmp)){
        region_random.push(tmp);
        break;
      }
    }
  }
  for(i=1;i<=6;i++){
    var k = region_random[i]
    $('#region'+(i)).append('<p style="font-size:14pt">' + region_data[k-1] + '</p>');
  }
  //年代を反映
  var age_data = ['2000〜','1400<br>〜<br>1600','1600<br>〜<br>1800','1200<br>〜<br>1400','1914<br>〜<br>1945','1500<br>〜<br>1700','800<br>〜<br>1000','紀元前','500<br>〜<br>1000'];
  age_random = [];
  var age_max = age_data.length;
  //重複しない乱数を生成する
  for(i = min; i <= age_max; i++){
    while(true){
      var tmp = intRandom(min, age_max);
      if(!age_random.includes(tmp)){
        age_random.push(tmp);
        break;
      }
    }
  }
  for(i=1;i<=6;i++){
    var k = age_random[i]
    $('#age'+(i)).append('<p style="font-size:14pt;word-break:break-all">' + age_data[k-1] + '</p>');
  }

  var turn = 1; //ターン管理変数/奇数：赤番，偶数：青番

  //マス目をクリックした時の処理
  $("[id^='no']").on('click',function(){
    console.log('ターン：'+turn);
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
          //別の色で仮置き
          $(this).append("<p>●</p>").css('color','#add8e6');
        }else{
          alert("ここにはおけないよ")
          turn = turn -1
        }
    }else{
      //奇数ターンのとき，赤
      var result = c.indexOf("blue");
      if(result != -1 && exist == ""){
        //別の色で仮置き
        $(this).append("<p>●</p>").css('color','#ffb6c1');
      }else{
        alert("ここにはおけないよ")
        turn = turn -1
      }
    }
  })//マス目をクリックした時の処理ここまで

  //石の確定処理
  //マスに置ける条件を満たした場合，確定色に変更する
  $('.img_maru').on('click',function(){
      now_color = $('#no'+id).children().css('color')
      if(now_color =="rgb(255, 182, 193)"){
        //薄いピンクのとき→赤に変更
        $('#no'+id).children().css('color','#ea7070');
        //ターンカウントを1増やす
        turn = turn + 1
      }else if (now_color=="rgb(173, 216, 230)") {
        //薄い青のとき→青に変更
        $('#no'+id).children().css('color','#2694ab');
        //ターンカウントを1増やす
        turn = turn + 1
      }
      // TODO:挟まっている石の色を変更する
      var othelloChallenge = Othello();

  });
  //マスにおける条件を満たしていない場合，仮置きを削除
  $('.img_batsu').on('click',function(){
      $('#no'+id).children().remove();
      //TODO:石の色が変更しているかもしれないので確認する

  });

  //検索する
  $('.search_btn').on('click', function() {
    let word = $('.search_text').val()
    window.open('http://www.google.co.jp/search?q=' + word);
  });
}); //document.ready内

//関数
//全ての枠の石の色を調査・変更
const Othello = function(){
  nowArray = [];
  //配列に現在のマスの色を格納する
  for(i=1; i<=36; i++){
    var = val = $('#no' +i).children().css('color'):
    if(val == "rgb(38, 148, 171)"){
      nowArray.push('blue');
    }else if(val == "rgb(234, 112, 112)"){
      nowArray.push('red');
    }else{
      nowArray.push(0);
    }//ifおわり
  } //現在のマスの色格納ここまで
  
}//Othello関数終わり


//乱数生成
  function intRandom(min, max){
    return Math.floor( Math.random() * (max - min + 1)) + min;
  }

//周囲のマスのidを取得して配列にして返す
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

//枠番号の入った配列を渡す→石が置いてあるかどうかを調べて返す：使わないかも
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
