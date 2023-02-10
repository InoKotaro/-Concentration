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
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = cards[i];
  card.index = i;
  field.appendChild(card);
}