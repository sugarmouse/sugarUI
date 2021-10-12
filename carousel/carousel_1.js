/* 总共有两种类型的动作
1. 点击左右按钮
  - panel要变
  - indicator 要变

2. 点击indicator
  - panel要变
  - indicator要变 */

const $ = c => document.querySelector(c)
const $$ = c => document.querySelectorAll(c)

const $pre = $('.carousel .arrows .arrow-pre')
const $next = $('.carousel .arrows .arrow-next')
const $$indicators = $$('.indicators > li')
const $$panels = $$('.panels > a')

function getIndex() {
  return [...$$indicators].indexOf($('.indicators > li.active'))
}
function getPreIndex() {
  return ((getIndex() - 1) + $$indicators.length) % $$indicators.length
}
function getNextIndex() {
  return (getIndex() + 1) % $$indicators.length
}


function activePanel (index) {
  $$panels.forEach($node => $node.classList.remove('active'))
  $$panels.item(index).classList.add('active')

}
function activeIndicator(index) {
  $$indicators.forEach($node => $node.classList.remove('active'))
  $$indicators.item(index).classList.add('active')
}

$pre.onclick = () => {
  let index = getPreIndex()
  activeIndicator(index)
  activePanel(index)
}

$next.onclick = () => {
  let index = getNextIndex()
  activeIndicator(index)
  activePanel(index)
}

$$indicators.forEach($node => $node.onclick = function (e) {
  let index = [...$$indicators].indexOf(e.target)
  activeIndicator(index)
  activePanel(index)
})