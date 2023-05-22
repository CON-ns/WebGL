export class ScrollObserver {
  constructor(els, cb,rootMargin,options) {
    this.els = els;//NodeListを渡す
    const defaultOptions = {
      root: null, //交差対象
      rootMargin: rootMargin, //交差判定境界線
      threshold: 0,//targetのどこで交差判定するか
      once:true
    };
    this.cb = cb;
    this.options = Object.assign(defaultOptions, options); //オブジェクトを合体させる
    this.once = this.options.once;
    this._init();
  }
  
  //初期化
  _init() {
    const callback = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //画面内に入った時
          this.cb(entry.target, true);
          if (this.once) {
            observer.unobserve(entry.target); //監視を終了する
          }
        } else {
          //画面外に出た時
          this.cb(entry.target, false);
        }
      });
    };
    
    this.io = new IntersectionObserver(callback.bind(this), this.options);
    this.els.forEach(el => this.io.observe(el));
  }

  destroy() {
    this.io.disconnect();//IOの監視を終了する
  }
}

//使い方
//1.コールバック関数を定義する
// const cb = function (el, isIntersecting) {
//   if (isIntersecting) {
//     ここに画面内に入ったら行いたい処理をかく
//   }
// }
//※上記のelにはセレクタではなくElement(entry.target)が渡ることに注意する
//2.インスタンス化する(第一引数にNodeListを渡す)
// const so = new ScrollObserver(document.querySelectorAll('.監視したい要素'), cb, rootMargin,options:あってもなくても良い,{once:false});
//once:falseだと何度も監視をする。デフォルトはtrueで画面内に入った時に一度だけ処理を実行する