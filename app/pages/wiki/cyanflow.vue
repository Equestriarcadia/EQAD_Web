<script setup lang="ts">
const sidebarItems = [
  { label: '简介', href: '#about' },
  { label: '使用指南', href: '#use' },
  { label: '搜图', href: '#dbimg' },
  { label: '今日人品', href: '#jrrp' },
  { label: '自裁', href: '#suicide' },
  { label: '发病', href: '#disease' },
  { label: '嗦蹄', href: '#hoofshut' },
  { label: '点歌', href: '#ncmpicker' },
  { label: '开播监控', href: '#blivecheck' },
  { label: '群老婆', href: '#wife' },
  { label: '欢迎', href: '#welcomer' }
]

useHead({
  title: 'CyanFlow 使用文档 - EQAD Network'
})
</script>

<template>
  <WikiPageShell
    title="CyanFlow 使用文档"
    subtitle="CyanFlow WinForms"
    :breadcrumbs="[{ label: 'CyanFlow 使用文档' }]"
    :sidebar-items="sidebarItems"
  >
    <section id="about">
      <h2><br><br><br>简介</h2>
      <p>
        CyanFlow是一个运行在NoneBot框架上的QQ机器人<br>
        机器人的大部分功能均为自主开发<br>
        机器人QQ号：2545639429
      </p>
    </section>

    <section id="use">
      <h2><br><br><br>使用指南</h2>
      <h3>如何添加机器人好友</h3>
      <ol>
        <li>向机器人发送好友邀请</li>
        <li>稍等片刻，机器人会自动通过你的好友邀请</li>
      </ol>
      <h3>如何拉机器人进群</h3>
      <ol>
        <li>确保自己添加了机器人好友</li>
        <li>拉机器人进入群聊</li>
        <li>稍等片刻，机器人会自动通过你的拉人邀请</li>
      </ol>
      <h3>如何让机器人退群</h3>
      <ol>
        <li>确保你拥有群管理员权限</li>
        <li>输入 <code>。quit</code> 指令</li>
        <li>稍等片刻，机器人会自动退出群聊</li>
      </ol>
      <div class="wiki-card warning">
        <h4>
          <img src="/static/image/wiki/icon/alert.svg" class="warning-icon" alt="">
          特别提醒
        </h4>
        <p>
          为防止机器人被封号，请使用 <code>。quit</code> 指令让机器人退群<br>
          如果直接踢出，<strong>机器人会全局拉黑操作者和群聊</strong>
        </p>
      </div>
    </section>

    <section id="dbimg">
      <h2><br><br><br>DBImg - 搜图</h2>
      <p>
        该功能可以通过标签（tags）在呆站进行搜图，
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/leonsu-l/nonebot_plugin_phimg">已开源至Github</a>
      </p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/dbimg.gif" alt="DBImg 搜图">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。搜图 [&lt;tags|distance&gt;]</code></td>
            <td data-label="描述">
              输入标签为tags搜图（多个标签使用逗号分割，全角半角均可）<br>
              输入匹配距离为图搜图，可引用消息进行图搜图
            </td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --tags</code></td>
            <td data-label="描述">获取当前群聊内置标签列表</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --status</code></td>
            <td data-label="描述">获取当前群聊的搜图功能状态</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --pp [PER_PAGE]</code></td>
            <td data-label="描述">每页结果数量 [默认为50]</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --p [PAGE]</code></td>
            <td data-label="描述">页码 [默认为1]</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --sf [SF]</code></td>
            <td data-label="描述">排序字段 [默认为score]</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --sd [SD]</code></td>
            <td data-label="描述">排序方向 [默认为desc]</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 --i [INDEX]</code></td>
            <td data-label="描述">选择结果索引 [默认为-1（即随机），最大值应为per_page减1]</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 -c --add [&lt;tags&gt; ...]</code></td>
            <td data-label="描述">添加当前群聊的内置标签，搜图时会强制带上这些标签</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 -c --rm [&lt;tags&gt; ...]</code></td>
            <td data-label="描述">删除当前群聊的内置标签</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 -c --on/--off</code></td>
            <td data-label="描述">开关搜图功能 [默认开启]</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。搜图 -c --onglobal/--offglobal</code></td>
            <td data-label="描述">开关全局标签</td>
          </tr>
        </tbody>
      </table>
      <div class="wiki-card warning">
        <h4>
          <img src="/static/image/wiki/icon/alert.svg" class="warning-icon" alt="">
          警告
        </h4>
        <p>
          如果你关闭了全局标签并不额外添加内置标签，机器人可能会搜出：涩图、G图、鉴证图等<br>
          <strong>如果你一定要关闭全局标签，请自行承担可能的炸群风险</strong>
        </p>
      </div>
    </section>

    <section id="jrrp">
      <h2><br><br><br>Jrrp - 今日人品</h2>
      <p>该功能可以获取今日人品值，该值每天凌晨12点会刷新。<strong>相信科学，仅供娱乐</strong></p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/jrrp.gif" alt="今日人品">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。jrrp</code></td>
            <td data-label="描述">获取今日人品值</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。jrrp rank</code></td>
            <td data-label="描述">今日人品排行榜</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。jrrp on/off</code></td>
            <td data-label="描述">开关今日人品功能 [默认开启]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="suicide">
      <h2><br><br><br>Suicide - 自裁</h2>
      <p>让机器人对你进行禁言操作，禁言时间随机1～20分钟，需给予机器人管理员权限</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/suicide.gif" alt="自裁">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。自裁</code></td>
            <td data-label="描述">字面意思</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。自裁 on/off</code></td>
            <td data-label="描述">开关自裁功能 [默认关闭]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="disease">
      <h2><br><br><br>Disease - 发病</h2>
      <p>该功能可以随机抽取一条发病语句并应用至指定对象上</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/disease.gif" alt="发病">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。发病 &lt;对象&gt;</code></td>
            <td data-label="描述">返回一个发病语句</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。发病 on/off</code></td>
            <td data-label="描述">开关发病功能 [默认开启]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="hoofshut">
      <h2><br><br><br>HoofShut - 嗦蹄</h2>
      <p>嗦嗦被@用户的蹄子，同时被嗦的用户会增加一次被嗦次数</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/hoofshut.gif" alt="嗦蹄">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。嗦 &lt;@对象&gt;</code></td>
            <td data-label="描述">嗦嗦对方的蹄子</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。嗦 on/off</code></td>
            <td data-label="描述">开关嗦蹄功能 [默认开启]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="ncmpicker">
      <h2><br><br><br>NCMPicker - 点歌</h2>
      <p>该功能可以通过歌名、歌手或专辑在网易云点歌</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/ncmpicker.gif" alt="点歌">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。点歌 &lt;搜索内容&gt;</code></td>
            <td data-label="描述">在网易云点歌</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。点歌 on/off</code></td>
            <td data-label="描述">开关点歌功能 [默认开启]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="blivecheck">
      <h2><br><br><br>BliveCheck - 开播监控</h2>
      <p>该功能可以通过B站UID进行直播间开播监控，如果开播了将会向群内推送消息</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/blivecheck.gif" alt="开播监控">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。blive add/del &lt;UID&gt;</code></td>
            <td data-label="描述">添加或移除本群的开播监控</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="wife">
      <h2><br><br><br>Wife - 群老婆</h2>
      <p>获取一个每日刷新的群老婆，也可以通过手动离婚来刷新老婆</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/wife.gif" alt="群老婆">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。wife</code></td>
            <td data-label="描述">获取群老婆</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。wife 离婚</code></td>
            <td data-label="描述">字面意思</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。wife 刷新</code></td>
            <td data-label="描述">刷新群成员列表</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。wife on/off</code></td>
            <td data-label="描述">开关群老婆功能 [默认开启]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="welcomer">
      <h2><br><br><br>Welcomer - 欢迎</h2>
      <p>该功能可以让机器人向新成员发送欢迎消息，欢迎消息可以自定义</p>
      <img class="wiki-img" src="/static/image/wiki/cyanflow/welcomer.gif" alt="欢迎">
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>。欢迎 set &lt;字段&gt;</code></td>
            <td data-label="描述">自定义欢迎消息，可以使用变量</td>
          </tr>
          <tr>
            <td data-label="命令"><code>。欢迎 on/off</code></td>
            <td data-label="描述">开关欢迎功能 [默认关闭]</td>
          </tr>
        </tbody>
      </table>
      <table class="command-table">
        <thead>
          <tr>
            <th>变量</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="变量"><code>%at%</code></td>
            <td data-label="描述">@新成员</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%profile%</code></td>
            <td data-label="描述">新成员头像</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%date%</code></td>
            <td data-label="描述">入群时间</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%name%</code></td>
            <td data-label="描述">新成员昵称</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%group%</code></td>
            <td data-label="描述">群名称</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%groupid%</code></td>
            <td data-label="描述">群号</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%next%</code></td>
            <td data-label="描述">换行</td>
          </tr>
        </tbody>
      </table>
    </section>
  </WikiPageShell>
</template>
