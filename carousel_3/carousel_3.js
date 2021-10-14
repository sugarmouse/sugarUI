/* 总共有两种类型的动作
1. 点击左右按钮
  - panel要变
  - indicator 要变

2. 点击indicator
  - panel要变
  - indicator要变 */
const css = function ($node, addAttribute) {
  return Object.assign($node.style, addAttribute)
}


const Animation = {
  // slide动画效果
  slide($from, $to, from, to) {
    $from.style = ""
    $to.style = ""
    css($from, {
      transform: `translateX(0)`,
      zIndex: 10
    })
    css($to, {
      transform: `translateX(${(from < to ? '' : '-')}100%)`,
      zIndex: 10
    })
    //位置变化
    setTimeout(() => {
      css($from, {
        transform: `translateX(${(from < to ? '-' : '')}100%)`,
        transition: `all .4s`
      })
      css($to, {
        transform: `translateX(0)`,
        transition: `all .4s`
      })
    }, 0)
  },
  // 渐变动画效果
  fade($from, $to) {
    $from.removeAttribute('style')
    $to.removeAttribute('style')
    css($from, {
      opacity: 1,
      zIndex: 10
    })
    css($to, {
      opacity: 0,
      zIndex: 9
    })
    setTimeout(() => {
      css($from, {
        opacity: 0,
        transition: 'all .4s'
      })
      css($to, {
        opacity: 1,
        transition: 'all .4s'
      }, 0)
    })
    setTimeout(() => {
      css($from, {
        zIndex: 9
      })
      css($to, {
        zIndex: 10
      })
    }, 500)


  },
  // 变大效果
  zoom($from, $to) {
    $from.style = ""
    $to.style = ""
    css($from, {
      opacity: 1,
      transform: `scale(1)`,
      zIndex: 10
    })
    css($to, {
      opacity: 0,
      transform: `scale(10)`,
      zIndex: 9
    })
    setTimeout(() => {
      css($from, {
        opacity: 0,
        transform: `scale(10)`,
        transition: 'all .4s'
      })
      css($to, {
        opacity: 1,
        transform: `scale(1)`,
        transition: 'all .4s'
      })
    }, 0)
    setTimeout(() => {
      css($from, {
        zIndex: 9
      })
      css($to, {
        zIndex: 10
      })
    }, 500)
  }
}

class Carousel {
  constructor($root) {
    this.$root = $root
    this.animation = 'slide'
    this.$pre = $root.querySelector('.arrows .arrow-pre')
    this.$next = $root.querySelector('.arrows .arrow-next')
    this.$$indicators = $root.querySelectorAll('.indicators > li')
    this.$$panels = $root.querySelectorAll('.panels > a')
    this.$animation = $root.querySelector('.animation-select')

    this.bind()
  }
  //绑定所有事件函数
  bind() {
    let self = this
    self.$animation.onchange = function () {
      self.animation = this.value
    }
    self.$pre.onclick = () => {
      let from = self.getIndex()
      let to = self.getPreIndex()
      let $from = self.$$panels[from]
      let $to = self.$$panels[to]
      self.activeIndicator(to)
      self.activePanel($from, $to, from, to)
    }
    self.$next.onclick = () => {
      let from = self.getIndex()
      let to = self.getNextIndex()
      let $from = self.$$panels[from]
      let $to = self.$$panels[to]
      self.activeIndicator(to)
      self.activePanel($from, $to, from, to)
    }
    self.$$indicators.forEach($node => $node.onclick = function (e) {
      let to = [...self.$$indicators].indexOf(e.target)
      let from = self.getIndex()
      let $from = self.$$panels[from]
      let $to = self.$$panels[to]
      self.activeIndicator(to)
      self.activePanel($from, $to, from, to)
    })
  }

  //用到的方法
  getIndex() {
    return [...this.$$indicators].indexOf(this.$root.querySelector('.indicators > li.active'))
  }
  getPreIndex() {
    return ((this.getIndex() - 1) + this.$$indicators.length) % this.$$indicators.length
  }
  getNextIndex() {
    return (this.getIndex() + 1) % this.$$indicators.length
  }
  //显示面板与indicator方法
  activeIndicator(index) {
    this.$$indicators.forEach($node => $node.classList.remove('active'))
    this.$$indicators.item(index).classList.add('active')
  }
  activePanel($from, $to, from, to) {
    Animation[this.animation]($from, $to, from, to)
  }
}

let $carousel = document.querySelector('.container')
new Carousel($carousel)