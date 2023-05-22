import '@splidejs/splide/css/core';
import Splide from "@splidejs/splide";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import gsap from "gsap";
import lottie from "lottie-web";

lottie.loadAnimation({
  container: document.querySelector('.lottie'), /* Lottieの入れ物要素を指定する */
  renderer: 'svg', /* SVGとして描画する */
  loop: true, /* アニメーションを繰り返すかどうか（true: 繰り返す、false: 一度だけ、整数: 繰り返し回数-1） */
  autoplay: true, /* 自動的にアニメーションを再生するかどうか（true: 再生する、false: 再生しない） */
  path: 'https://assets9.lottiefiles.com/packages/lf20_C67qsN3hAk.json' /* LottieのJSONファイルのパスを指定する  */
});
