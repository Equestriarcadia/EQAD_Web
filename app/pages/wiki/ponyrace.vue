<script setup lang="ts">
import WikiPageShell from '~/components/layouts/WikiPageShell.vue'

const sidebarItems = [
  { label: '注意事项', href: '#attention' },
  { label: '简介', href: '#about' },
  { label: '种族列表', href: '#race-list' },
  { label: '配方', href: '#recipe' },
  { label: 'PAPI变量', href: '#papi' },
  { label: '指令', href: '#commands' },
  { label: '权限节点', href: '#permission' },
  { label: '配置文件', href: '#config' }
]

useHead({
  title: 'PonyRace 使用文档 - EQAD Network'
})
</script>

<template>
  <WikiPageShell
    title="PonyRace 使用文档"
    subtitle="PonyRace WinForms"
    :breadcrumbs="[{ label: 'PonyRace 使用文档' }]"
    :sidebar-items="sidebarItems"
  >
    <section id="attention">
      <h2><br><br><br>注意事项</h2>
      <p>
        这是一个Bukkit插件，需要安装在Spigot及其下游分支的服务端内才能运行<br>
        对于个人玩家，我们更推荐你去看看
        <a target="_blank" rel="noopener noreferrer" href="https://www.mcmod.cn/class/12030.html">Unicopia</a><br>
        测试过的版本：1.20.1、1.21.1<br>
        理论兼容版本：1.16.x-1.21.x<br>
        下载链接（更新可能不及时）：
        <a target="_blank" rel="noopener noreferrer" href="https://mlp.puudding.top/%E5%85%B6%E4%BB%96/Archive/PonyRace">点我</a>
      </p>
    </section>

    <section id="about">
      <h2><br><br><br>简介</h2>
      <p>
        这是EQAD Network开发的插件<br>
        可以让玩家在游戏内扮演MLP种族<br>
        目前插件共包含8个种族 <del>（除了幻形灵，因为我不会做）</del><br>
        分别是飞马、陆马、独角兽、夜琪、海马、麒麟、龙、人类（人类是凑数的）<br>
        每个种族都有单独的技能、数值和饮食习惯
      </p>
    </section>

    <section id="race-list">
      <h2><br><br><br>种族列表</h2>
      <h3>飞马</h3>
      <ul>
        <li>永久速度I效果</li>
        <li>拿着木棍时能飞行</li>
        <li>飞行时拿着木棍右键可以俯冲</li>
        <li>飞行和俯冲有体力限制</li>
        <li>喜欢素食，讨厌肉食</li>
        <li>可以食用一些原版不能直接食用的植物</li>
      </ul>

      <hr class="b-border">

      <h3>陆马</h3>
      <ul>
        <li>24点生命上限</li>
        <li>永久力量I效果</li>
        <li>永久跳跃提升I效果</li>
        <li>永久速度I效果</li>
        <li>在地面上拿着木棍右键可以冲刺</li>
        <li>喜欢素食，讨厌肉食</li>
        <li>可以食用一些原版不能直接食用的植物</li>
      </ul>

      <hr class="b-border">

      <h3>独角兽</h3>
      <ul>
        <li>拿着木棍左键可以发射激光 (可以穿透)</li>
        <li>拿着木棍右键可以传送到你看着的地方</li>
        <li>有魔力限制</li>
        <li>喜欢素食，讨厌肉食</li>
        <li>可以食用一些原版不能直接食用的植物</li>
      </ul>

      <hr class="b-border">

      <h3>夜琪</h3>
      <ul>
        <li>拿着木棍时能飞行</li>
        <li>飞行时拿着木棍右键可以俯冲</li>
        <li>飞行和俯冲有体力限制</li>
        <li>拥有夜视能力</li>
        <li>白天有虚弱I效果</li>
        <li>晚上有力量II效果</li>
      </ul>

      <hr class="b-border">

      <h3>海马</h3>
      <ul>
        <li>可以在水下呼吸</li>
        <li>水下游泳速度更快</li>
        <li>在水中拿着木棍右键可以突进</li>
        <li>突进有体力限制</li>
        <li>喜欢素食，讨厌肉食</li>
        <li>可以食用一些原版不能直接食用的植物</li>
      </ul>

      <hr class="b-border">

      <h3>麒麟</h3>
      <ul>
        <li>30点生命上限</li>
        <li>不怕火</li>
        <li>拿着木棍右键可以发怒</li>
        <li>发怒会产生火焰</li>
        <li>处于发怒状态时会获得力量II和抗性提升I效果</li>
        <li>发怒后会获得时长为3分钟的虚弱II效果</li>
      </ul>

      <hr class="b-border">

      <h3>龙族</h3>
      <ul>
        <li>26点生命上限</li>
        <li>拿着木棍时能飞行</li>
        <li>飞行有体力限制</li>
        <li>不怕火</li>
        <li>吃绿宝石或者钻石可以恢复生命</li>
      </ul>
    </section>

    <section id="recipe">
      <h2><br><br><br>配方</h2>
      <p>名称：转生药水，效果：让玩家更换种族</p>
      <img class="wiki-img" src="/static/image/wiki/ponyrace/recipe1.png" alt="转生药水配方">
      <p>名称：体力药水，效果：瞬间回满体力值</p>
      <img class="wiki-img" src="/static/image/wiki/ponyrace/recipe2.png" alt="体力药水配方">
      <p>名称：魔力药水，效果：瞬间回满魔力值</p>
      <img class="wiki-img" src="/static/image/wiki/ponyrace/recipe3.png" alt="魔力药水配方">
    </section>

    <section id="papi">
      <h2><br><br><br>PAPI变量</h2>
      <table class="command-table">
        <thead>
          <tr>
            <th>变量</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="变量"><code>%ponyrace_race%</code></td>
            <td data-label="描述">返回玩家种族</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%ponyrace_stamina%</code></td>
            <td data-label="描述">返回玩家体力值</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%ponyrace_mana%</code></td>
            <td data-label="描述">返回玩家魔力值</td>
          </tr>
          <tr>
            <td data-label="变量"><code>%ponyrace_enrage%</code></td>
            <td data-label="描述">返回玩家发怒值</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="commands">
      <h2><br><br><br>指令</h2>
      <table class="command-table">
        <thead>
          <tr>
            <th>命令</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="命令"><code>/pr set &lt;种族&gt; [玩家]</code></td>
            <td data-label="描述">设置种族</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/pr info [玩家]</code></td>
            <td data-label="描述">查看种族信息</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/pr reload</code></td>
            <td data-label="描述">重载配置文件</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/pr gui</code></td>
            <td data-label="描述">打开种族选择菜单</td>
          </tr>
          <tr>
            <td data-label="命令"><code>/pr about</code></td>
            <td data-label="描述">关于PonyRace</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="permission">
      <h2><br><br><br>权限节点</h2>
      <table class="command-table">
        <thead>
          <tr>
            <th>权限</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="权限"><code>ponyrace.admin</code></td>
            <td data-label="描述">允许使用管理员指令</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="config">
      <h2><br><br><br>配置文件</h2>
      <p>1.5.1版本</p>
      <code>
        # PonyRace配置文件<br>
        # 若无特殊标注，配置文件内所有数值皆需填入正整数<br>
        <br>
        messages:<br>
        &nbsp;&nbsp;# 插件消息前缀<br>
        &nbsp;&nbsp;prefix: "&8[&bPonyRace&8]&r "<br>
        <br>
        settings:<br>
        &nbsp;&nbsp;selection:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 是否在无种族玩家加入时显示种族选择菜单<br>
        &nbsp;&nbsp;&nbsp;&nbsp;show: true<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 是否使用效率更低的方式来兼容登录插件<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 如果种族选择窗口被登录插件卡没，请启用此选项<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 该选项启用后会覆盖“强制无种族玩家选择种族”选项<br>
        &nbsp;&nbsp;&nbsp;&nbsp;login-plugin-support: false<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 是否强制无种族玩家选择种族<br>
        &nbsp;&nbsp;&nbsp;&nbsp;force: true<br>
        &nbsp;&nbsp;consume:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 左键技能魔力消耗量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;mana-left: 20<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 右键技能魔力消耗量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;mana-right: 50<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 飞行时每秒体力消耗量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;stamina: 1<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 冲刺技能体力消耗量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;stamina-boost: 20<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 玩家飞行速度超过阈值后每增加1速度所额外消耗的体力（可小数）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;stamina-move: 0.5<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 最大额外消耗体力<br>
        &nbsp;&nbsp;&nbsp;&nbsp;stamina-move-max: 3<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 飞行速度阈值（方块/秒）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;stamina-move-threshold: 8<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 发怒时每0.25秒怒气消耗量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;enrage: 3<br>
        &nbsp;&nbsp;regen:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 每秒魔力恢复量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;mana: 1<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 每秒体力恢复量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;stamina: 2<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 每0.25秒怒气恢复量<br>
        &nbsp;&nbsp;&nbsp;&nbsp;enrage: 1<br>
        &nbsp;&nbsp;cooldown:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 魔法技能冷却（秒）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;mana: 1<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 冲刺技能冷却（秒）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;boost: 1<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 吃食物/宝石冷却，不影响原版食物食用速度（秒）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;eat: 1<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 龙族火球技能冷却（秒）<br>
        &nbsp;&nbsp;&nbsp;&nbsp;dragon-fire: 30<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 在体力耗尽后需要恢复到多少体力才能继续飞行<br>
        &nbsp;&nbsp;&nbsp;&nbsp;fly: 20<br>
        &nbsp;&nbsp;&nbsp;&nbsp;# 发怒所需要的最低怒气值<br>
        &nbsp;&nbsp;&nbsp;&nbsp;enrage: 20
      </code>
    </section>
  </WikiPageShell>
</template>
