<script setup lang="ts">
import WikiPageShell from '~/components/WikiPageShell.vue'

const sidebarItems = [
  { label: '前言', href: '#foreword' },
  { label: '粘液科技', href: '#slimefun' },
  { label: '小马种族', href: '#ponyrace' },
  { label: '新下界', href: '#incendium' },
  { label: '酿酒', href: '#brewery' },
  { label: '更多武器', href: '#combat-weaponry-plus' }
]

useHead({
  title: '粘液生存 - EQAD Network'
})
</script>

<template>
  <WikiPageShell
    title="粘液生存"
    subtitle="Slime survival guide"
    :breadcrumbs="[
      { label: '游玩指南', href: '/wiki/main' },
      { label: '粘液生存' }
    ]"
    :sidebar-items="sidebarItems"
  >
    <section id="foreword">
      <h2><br><br><br>前言</h2>
      <p>
        这里是粘液生存区的游玩指南。该区的玩法太多了，所以我们单独开了一个指南（<br>
        在电脑端，你可以点击左侧的目录跳转到自己感兴趣的板块<br>
        如果你是手机，请将手机横屏
      </p>
    </section>

    <section id="slimefun">
      <h2><br><br><br>粘液科技</h2>
      <p>
        粘液生存区最核心的插件<br>
        粘液科技已经有相当详细的教程了，可以直接去看：
        <a target="_blank" rel="noopener noreferrer" href="https://slimefun-wiki.guizhanss.cn/Home">点击前往</a>
      </p>
    </section>

    <section id="ponyrace">
      <h2><br><br><br>小马种族</h2>
      <p>在你首次进入粘液生存区时，你应该会看到一个对话框</p>
      <img class="wiki-img" src="/static/image/wiki/sc2/pr1.png" alt="种族选择菜单">
      <p>这个对话框是种族选择菜单，你可以选择自己喜欢的种族</p>

      <hr class="b-border">

      <h3>配方</h3>
      <p>名称：转生药水，效果：让玩家更换种族</p>
      <img class="wiki-img" src="/static/image/wiki/sc2/pr2.png" alt="转生药水配方">
      <p>名称：体力药水，效果：瞬间回满体力值</p>
      <img class="wiki-img" src="/static/image/wiki/sc2/pr3.png" alt="体力药水配方">
      <p>名称：魔力药水，效果：瞬间回满魔力值</p>
      <img class="wiki-img" src="/static/image/wiki/sc2/pr4.png" alt="魔力药水配方">
    </section>

    <section id="incendium">
      <h2><br><br><br>新下界</h2>
      <p>
        Incendium在MC百科已经有相当详细的教程了，可以直接去看：
        <a target="_blank" rel="noopener noreferrer" href="https://www.mcmod.cn/class/4064.html">点击前往</a><br>
        <del>绝对不是因为我懒得写</del>
      </p>
    </section>

    <section id="brewery">
      <h2><br><br><br>酿酒</h2>
      <p>
        Brewery插件已经有相当详细的教程了，可以直接去看：
        <a target="_blank" rel="noopener noreferrer" href="https://wiki.yinwurealm.org/%E6%8F%92%E4%BB%B6:Brewery">点击前往</a><br>
        <del>绝对不是因为我懒得写</del>
      </p>
    </section>

    <section id="combat-weaponry-plus">
      <h2><br><br><br>更多武器</h2>
      <p>
        粘液生存区添加了大量的新武器<br>
        你可以直接在游戏自带的小绿书内看到每把武器的配方
      </p>
      <img class="wiki-img" src="/static/image/wiki/sc2/cwp1.png" alt="更多武器">
    </section>
  </WikiPageShell>
</template>
