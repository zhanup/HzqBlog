<template>
  <div class="bg-cover">
    <div class="container">
      <h1 class="blog-title">关于</h1>
    </div>
  </div>
  <div class="about">
    <div class="container box-shadow">
      <!-- <h1 class="title">关于本站</h1> -->
      <div class="card">
        <h2 class="card-title">博主简介</h2>
        <p>网名：在路上</p>
        <p>爱好：敲代码、看小说、看动漫、阅读</p>
        <p>个性签名：承认自己的无知,乃是开启智慧的大门</p>
      </div>
      <div class="card">
        <h2 class="card-title">本站简介</h2>
        <p><router-link to="/">HBlog个人博客系统</router-link>，前端基于 Vue 开发，本是个人博客，亦是学习过程中的产物，所以也没有考虑 SEO。目前博客系统还是非常简单，功能不全的状态，先部署上线了，后期会逐渐完善博客的功能。</p>
        <p>本博客项目已在github上开源，项目地址：<a href="https://github.com/yubifeng/SkyBlog" target="_blank">https://github.com/yubifeng/SkyBlog</a>，欢迎访问。</p>
      </div>
      <div class="card">
        <h2 class="card-title">联系方式</h2>
        <p>QQ：2925309929</p>
        <p>微信：zhanup323</p>
        <p>邮箱：2925309929@qq.com</p>
      </div>
      <div class="card">
        <h2 class="card-title">免责声明</h2>
        <p>本站属于个人博客网站，本着开放互享的原则，本网站的内容均为站长提供、网友推荐、网络整理而来，仅用于广大网友学习研究使用，如有侵犯您的版权，请及时联系我们，本站将及时纠正。</p>
        <p>本网站所有内容（网络，素材、图片），其版权均归原作者所有，在转载有关文章时务必尊重该文章的著作权，保留其来源，并自负版权等法律责任。</p>
        <p>本站文章内容，如果来源于互联网，我们会标明其来源，没有标注的属于本站原创，请您转载或者使用该文章时尊重本站及其互联网作者的著作权，注明其来源。</p>
        <p>本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。</p>
        <p>互联网的本质是自由与分享，我们真诚的希望，本站的每一份正能量能带给正在访问本网站的您提供有效的帮助，希望大家多多支持本站。</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg-cover {
  background-image: url(http://browser9.qhimg.com/bdr/__85/t0100dc32508c7e4d7a.jpg) !important;
}
.about {
  .container {
    width: 95%;
    max-width: 1000px;
    border-radius: 10px;
    min-height: 400px;
    position: relative;
    margin: -60px auto 20px;
    padding: 40px 60px;
    background-color: var(--board-bg-color);
    transition: padding .5s ease-in-out;
  }

  .title {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .card {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    p {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 1.5;
    }

    a {
      color: var(--link-color);

      &:hover {
        text-decoration: underline;
      }
    }

    .card-title {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 20px;
      line-height: 1.5;
      position: relative;
      &:hover {
         &::before {
           width: 50px;
         }
      }

      &::before {
        content: "";
        display: block;
        width: 30px;
        height: 3px;   
        border-radius: 3px;
        background: #ff6666;
        position: absolute;
        bottom: -1.5px;
        left: 0;
        z-index: 1;
        transition: .25s;       
      }

      &::after {
        position: absolute;
        left: -60px;
        width: calc(100% + 120px);
        height: 1px;
        content: "";
        display: block;
        background: #eff2f7;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .about {
    .container {
      padding: 40px;
    }

    .card {
      .card-title {
        &::after {
          left: -40px;
          width: calc(100% + 80px);
        }
      }
    }
  }
}

@media screen and (max-width: 601px) {
  .about {
    .container {
      padding: 40px 20px;
    }

    .card {
      .card-title {
        &::after {
          left: -20px;
          width: calc(100% + 40px);
        }
      }
    }
  }
}
</style>
