/* 总共有两种类型的动作
1. 点击左右按钮
  - panel要变
  - indicator 要变

2. 点击indicator
  - panel要变
  - indicator要变 */

// 实现组件化的简单carousel


class Carousel {
  constructor($root) {
    this.$root = $root
    this.$pre = $root.querySelector('.arrows .arrow-pre')
    this.$next = $root.querySelector('.arrows .arrow-next')
    this.$$indicators = $root.querySelectorAll('.indicators > li')
    this.$$panels = $root.querySelectorAll('.panels > a')

    this.bind()
  }
  bind() {
    let self = this
    this.$pre.onclick = () => {
      let index = self.getPreIndex()
      self.activeIndicator(index)
      self.activePanel(index)
    }

    this.$next.onclick = () => {
      let index = self.getNextIndex()
      self.activeIndicator(index)
      self.activePanel(index)
    }

    this.$$indicators.forEach($node => $node.onclick = function (e) {
      let index = [...self.$$indicators].indexOf(e.target)
      self.activeIndicator(index)
      self.activePanel(index)
    })
  }

  getIndex() {
    return [...this.$$indicators].indexOf(this.$root.querySelector('.indicators > li.active'))
  }
  getPreIndex() {
    return ((this.getIndex() - 1) + this.$$indicators.length) % this.$$indicators.length
  }
  getNextIndex() {
    return (this.getIndex() + 1) % this.$$indicators.length
  }

  activeIndicator(index) {
    this.$$indicators.forEach($node => $node.classList.remove('active'))
    this.$$indicators.item(index).classList.add('active')
  }
  activePanel(index) {
    this.$$panels.forEach($node => $node.classList.remove('active'))
    this.$$panels.item(index).classList.add('active')
  }
}
document.querySelectorAll('.carousel').forEach($node => new Carousel($node))