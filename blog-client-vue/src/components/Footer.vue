<template>
  <footer class="footer">
    <div class="container">
      <p class="copyright">Copyright © 2018 - 2021 HZQ All Rights Reserved.</p>
      <p>桂公网安备 XXXXXXXX号</p>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  padding-top: 20px;
  padding-bottom: 1px;
  text-align: center;
  color: var(--navbar-text-color);
  background-color: var(--navbar-bg-color);

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto 20px;

    p {
      font-size: 14.5px;
      margin: 0;
    }

    .copyright {
      margin-bottom: 10px;
    }
  }
}
</style>

