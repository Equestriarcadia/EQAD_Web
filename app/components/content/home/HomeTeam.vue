<script setup lang="ts">
interface SocialLink {
  href: string
  icon: string
  title: string
}

interface TeamMember {
  name: string
  position: string
  avatar: string
  bio: string
  socialLinks: SocialLink[]
}

const members: TeamMember[] = [
  {
    name: 'Leon',
    position: '腐竹/运维',
    avatar: '/static/image/team/leon.jpg',
    bio: '\\😭/\\😭/\\😭/',
    socialLinks: [
      { href: 'https://space.bilibili.com/455003140', icon: '/static/image/bili.svg', title: '哔哩哔哩个人空间' },
      { href: 'https://github.com/leonsu-l', icon: '/static/image/github.svg', title: 'Github 个人主页' },
      { href: 'https://namemc.com/profile/Leonsu_L', icon: '/static/image/namemc.svg', title: 'NameMC 个人页' }
    ]
  },
  {
    name: '叨叨',
    position: '腐竹/运维',
    avatar: '/static/image/team/叨.jpg',
    bio: '星怒🥰',
    socialLinks: [
      { href: 'https://space.bilibili.com/494565117', icon: '/static/image/bili.svg', title: '哔哩哔哩个人空间' },
      { href: 'https://github.com/JessDaodao', icon: '/static/image/github.svg', title: 'Github 个人主页' },
      { href: 'https://namemc.com/profile/ress2338396', icon: '/static/image/namemc.svg', title: 'NameMC 个人页' }
    ]
  },
  {
    name: 'xyy',
    position: '社区运营',
    avatar: '/static/image/team/xyy.jpg',
    bio: '狗狗',
    socialLinks: [
      { href: 'https://space.bilibili.com/37962676', icon: '/static/image/bili.svg', title: '哔哩哔哩个人空间' },
      { href: 'https://namemc.com/profile/Xyy11', icon: '/static/image/namemc.svg', title: 'NameMC 个人页' }
    ]
  },
  {
    name: '羽梦千景',
    position: '视觉设计',
    avatar: '/static/image/team/raku.jpg',
    bio: '千景不是甜贝儿!',
    socialLinks: [
      { href: 'https://space.bilibili.com/18251508', icon: '/static/image/bili.svg', title: '哔哩哔哩个人空间' },
      { href: 'https://github.com/AomiRaku', icon: '/static/image/github.svg', title: 'Github 个人主页' },
      { href: 'https://namemc.com/profile/raku404', icon: '/static/image/namemc.svg', title: 'NameMC 个人页' },
      { href: 'https://raku404.com/', icon: '/static/image/home.svg', title: '个人网站' }
    ]
  },
  {
    name: '落雨𝓼𝓪',
    position: '合作伙伴',
    avatar: '/static/image/team/落雨.jpg',
    bio: '皮肤站大佬',
    socialLinks: [
      { href: 'https://space.bilibili.com/206184710', icon: '/static/image/bili.svg', title: '哔哩哔哩个人空间' },
      { href: 'https://github.com/MoeLuoYu', icon: '/static/image/github.svg', title: 'Github 个人主页' },
      { href: 'https://namemc.com/profile/MoeLuoYu', icon: '/static/image/namemc.svg', title: 'NameMC 个人页' },
      { href: 'https://moeluoyu.xyz/', icon: '/static/image/home.svg', title: '个人网站' }
    ]
  }
]
</script>

<template>
  <section id="team" class="basic-2" aria-labelledby="team-title">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2 id="team-title" class="home-section-heading">- 核心成员 -</h2>
        </div>

        <div v-for="member in members" :key="member.name" class="team-col col-md-6 mb-4">
          <article class="team-card">
            <div class="avatar-container">
              <img :src="member.avatar" :alt="`${member.name} 的头像`" class="member-avatar">
            </div>
            <div class="member-info">
              <h3 class="membername">{{ member.name }}</h3>
              <p class="position">{{ member.position }}</p>
              <img class="bioqt" src="/static/image/qt.svg" alt="">
              <p class="bio">{{ member.bio }}</p>
              <div class="sclinkarea">
                <a
                  v-for="link in member.socialLinks"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img :title="link.title" :src="link.icon" :alt="link.title" class="sclink">
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
