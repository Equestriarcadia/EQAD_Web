<script setup lang="ts">
import WikiPageShell from '~/components/WikiPageShell.vue'

const sidebarItems = [
  { label: '开始游玩', href: '#getting-started' },
  { label: '服务器简介', href: '#gameplay-guides' },
  { label: '常见问题', href: '#faq' },
  { label: '命令参考', href: '#commands' }
]

useHead({
  title: '游玩指南 - EQAD Network'
})
</script>

<template>
  <WikiPageShell
    title="游玩指南"
    subtitle="Play guide"
    :breadcrumbs="[{ label: '游玩指南' }]"
    :sidebar-items="sidebarItems"
  >
    <section id="getting-started">
      <h2><br><br><br>开始游玩</h2>
      <h3>如何加入服务器</h3>
      <p>以纯净群组示例</p>
      <ol>
        <li>添加服务器地址 <code>vanilla.eqad.fun</code></li>
        <li>开玩！</li>
      </ol>
      <h3>首次登录</h3>
      <p>
        首次登录时，你会被传送到大厅，这时需要注册后才能游玩<br>
        这时请在游戏内输入 <code>/reg QQ邮箱</code> 来注册，密码将由服务器随机生成并发送到你提供的邮箱<br>
        登录后记得使用 <code>/changepassword 旧密码 新密码</code> 来更改密码
      </p>
      <h3>后续登录</h3>
      <p>
        当你注册后再次进入服务器时需要登录才能继续游玩<br>
        这时请在游戏内输入 <code>/l 密码</code> 来登录，密码是您之前设置的密码
      </p>
    </section>

    <section id="gameplay-guides">
      <h2><br><br><br>服务器简介</h2>
      <h3>纯净群组</h3>
      <p>
        由R9 9900X驱动<br>
        提供了生存、粘液和创造三个区，生电友好，性能强劲！
      </p>
      <h4>如何加入：</h4>
      <ol>
        <li>添加服务器地址 <code>vanilla.eqad.fun</code></li>
        <li>开玩！</li>
      </ol>

      <hr class="b-border">

      <h3>模组服</h3>
      <p>
        由i9 13900K驱动<br>
        模组服会定期更新不同的整合包
      </p>
      <h4>如何加入：</h4>
      <ol>
        <li>下载当前整合包（群文件获取）</li>
        <li>将整合包拖入启动器安装</li>
        <li>添加服务器地址 <code>everfree.eqad.fun</code></li>
        <li>开玩！</li>
      </ol>
    </section>

    <section id="faq">
      <h2><br><br><br>常见问题</h2>
      <div class="faq-item">
        <h3>Q: 服务器会定期重置吗？</h3>
        <p>
          A: 纯净群组内的纯净生存、创造世界不会重置，粘液生存会不定期进行重置<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;模组服会根据游玩人数情况进行重置
        </p>

        <hr class="b-border">

        <h3>Q: 如何举报违规玩家？</h3>
        <p>A: 请提供违规玩家的游戏名、具体行为和证据，私聊在线管理员或群内举报</p>

        <hr class="b-border">

        <h3>Q: 服务器支持哪些版本？</h3>
        <p>
          A: 纯净服支持1.9-26.1.1版本<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;模组服支持版本由整合包决定
        </p>
      </div>
    </section>

    <section id="commands">
      <h2><br><br><br>命令参考</h2>
      <h3>常用命令列表</h3>
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>/cd</code></td>
            <td data-label="描述">打开菜单</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/home [名称]</code></td>
            <td data-label="描述">传送到设定的家</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/sethome [名称]</code></td>
            <td data-label="描述">设置家</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/tpa [玩家]</code></td>
            <td data-label="描述">请求传送到指定玩家</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/rtp</code></td>
            <td data-label="描述">随机传送</td>
          </tr>
        </tbody>
      </table>
      <p>更多命令请查看<a href="/cmd.html">完整命令列表</a></p>
    </section>
  </WikiPageShell>
</template>
