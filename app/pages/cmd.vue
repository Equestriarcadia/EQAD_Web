<script setup lang="ts">
useHead({
  title: '命令列表 - EQAD Network',
  meta: [
    {
      name: 'description',
      content: '查看 EQAD Network Minecraft 服务器常用命令及其区服兼容性。'
    }
  ]
})
</script>

<template>
  <div class="command-page">
    <header id="header" class="ex-header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>命令列表</h1>
            <h5>Command list</h5>
          </div>
        </div>
      </div>
    </header>

    <div class="ex-basic-1">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumbs">
              <NuxtLink to="/">主页</NuxtLink>
              <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;命令列表</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ex-basic-1">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-container">
              <table class="command-table">
                <thead>
                  <tr>
                    <th>命令</th>
                    <th>描述</th>
                    <th>区服兼容性</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="命令"><code>/cd</code></td>
                    <td data-label="描述">打开菜单</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/music &lt;参数&gt;</code></td>
                    <td data-label="描述">
                      点歌相关（<a target="_blank" rel="noopener noreferrer" href="https://mlp.puudding.top/%E5%85%B6%E4%BB%96/Archive/AllMusic">下载Allmusic模组</a>）
                    </td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>/music 2129456147</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/back</code></td>
                    <td data-label="描述">回到死亡点</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/tpa &lt;玩家&gt;</code></td>
                    <td data-label="描述">请求传送到指定玩家</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>/tpa Leon</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/tpahere &lt;玩家&gt;</code></td>
                    <td data-label="描述">请求指定玩家传送到你这里</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>/tpahere Leon</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/suicide</code></td>
                    <td data-label="描述">紫砂</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/warp &lt;传送点&gt;</code></td>
                    <td data-label="描述">传送到指定传送点</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>/warp spawn</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/bot &lt;参数&gt;</code></td>
                    <td data-label="描述">假人相关</td>
                    <td data-label="区服兼容性">创造世界不可用</td>
                    <td data-label="示例"><code>/bot create &lt;假人名称&gt;</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/rtp</code></td>
                    <td data-label="描述">随机传送</td>
                    <td data-label="区服兼容性">创造世界不可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/home [名称]</code></td>
                    <td data-label="描述">传送到设定的家</td>
                    <td data-label="区服兼容性">创造世界不可用</td>
                    <td data-label="示例"><code>/home jia</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/sethome [名称]</code></td>
                    <td data-label="描述">设置家</td>
                    <td data-label="区服兼容性">创造世界不可用</td>
                    <td data-label="示例"><code>/sethome jia</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/delhome &lt;名称&gt;</code></td>
                    <td data-label="描述">删除家</td>
                    <td data-label="区服兼容性">创造世界不可用</td>
                    <td data-label="示例"><code>/delhome jia</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/gamemode &lt;游戏模式&gt;</code></td>
                    <td data-label="描述">更改游戏模式</td>
                    <td data-label="区服兼容性">仅创造世界可用</td>
                    <td data-label="示例"><code>/gamemode 1</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/mail &lt;参数&gt;</code></td>
                    <td data-label="描述">邮件相关</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>/mail read</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/hat</code></td>
                    <td data-label="描述">将手上的物品当作帽子佩戴</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/sit</code></td>
                    <td data-label="描述">坐下</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/lay</code></td>
                    <td data-label="描述">躺下</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                  <tr>
                    <td data-label="命令"><code>/help</code></td>
                    <td data-label="描述">显示帮助信息</td>
                    <td data-label="区服兼容性">所有区服皆可用</td>
                    <td data-label="示例"><code>-</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
