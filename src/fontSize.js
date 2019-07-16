export default function calcRootFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  console.log(`文档宽度为:${htmlWidth}px`);
  const htmlDom = document.getElementsByTagName('html')[0];
  // if (htmlWidth > 750) {
  //   htmlWidth = 750;
  // }
  htmlDom.style.fontSize = `${htmlWidth / 10}px`;
}
