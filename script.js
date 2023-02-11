//整数乱数作成
function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

//カード作成
let cards = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", 
  "A", "B", "C", "D", "E", "F", "G", "H", "I"
];

//シャッフル
for (let i = cards.length-1; i > 0; i--){ //最後から順に繰り返す
  let r = rand(0,i); //上で作成した乱数メソッドに引数を渡す
  let tmp = cards[i]; //最後の一枚もシャッフルする為に定義
  cards[i] = cards[r];
  cards[r] = tmp;
}

//カードをfieldへ格納
let field = document.getElementById('field')
for(let i = 0; i < cards.length; i++){
  let card = document.createElement('div'); //div設定
  card.className = 'card'; //class名設定
  card.innerHTML = ''//cards[i]; //記載する文字設定(デフォルトは非表示)
  card.index = i;
  card.onclick = click; //DOM設定(今回はクリックされた際の処理。「click」と命名)
  field.appendChild(card);
}

//最初に定義する時点では「null」としておく
let first = null; //選択一枚目
let second = null; //選択二枚目
let timer = null; //ジャッジ秒数

//経過時間表示
let count = 0; //デフォルト値設定
let clock = document.getElementById('clock') //HTMLにあるid取得
let timer2 = setInterval(function(){
  clock.innerHTML = "経過時間："+(++count)+"秒";
}, 1000);

//ペア成功
let success = 0; //デフォルト値設定

function click(c){ //上で定義したクリック時の処理
  if (timer){
    clearTimeout(timer); //ジャッジ中に他のカードクリックされるとバグの原因なるので、timer強制終了(clearTimeout)
    judge(); //judge即実行
  }
  let card = c.target;
  card.innerHTML = cards[card.index];

  if (!first){ //もし一枚目が選択されていない(null)パターン
    first = card; //選択一枚目にcardを格納
  }else if (first.index === card.index){ //一枚目と二枚目が一致パターン(不正操作)
    return; //初期値に戻す
  }else{ //一枚目と二枚目が不一致パターン(正規操作)
    second = card;//選択二枚目にcardを格納
    timer = setTimeout(judge, 1000); //1秒後にジャッジ、judge関数は以下にある
  }

  function judge(){
    if (first.innerHTML === second.innerHTML){ //カードが同じであれば「style.visibility」で消す
      first.style.visibility = 'hidden'; //一枚目
      second.style.visibility = 'hidden'; //二枚目
      success += 2;
        if (success === cards.length){ //全ペア揃った際パターン
          clearInterval(timer2); //「clearInterval」でtimer2停止
        }
    }else{
      first.innerHTML = ''; //元に戻す(白紙にする)
      second.innerHTML = ''; //元に戻す(白紙にする)
    }
    //処理の最後で初期化して次の操作に備える
    first = null; 
    second = null;
    timer = null;
   }
}