<template>
  <div class="aside">
    <div class="title">
      <i class="iconfont icon-list-alt"></i>&nbsp;&nbsp;目录
    </div>
    <div class="toc" id="toc-content"></div>
  </div>
</template>

<style scoped lang="less">
.aside {
  float: right;
  width: 25%;
  padding-left: 50px;
  position: -webkit-sticky;
  position: sticky;
  top: 52px;
  margin-bottom: 20px;

  .title {
    margin: 35px 0 15px 0;
    font-size: 18px;
    padding-left: 20px;
    font-weight: bold;
    line-height: 24px;
    color: #34495e;

    .iconfont {
      font-size: 18px;
      vertical-align: -1px;
    }
  }
}

@media screen and (max-width: 992px) {
  .aside {
    display: none !important;
  }
}
</style>
