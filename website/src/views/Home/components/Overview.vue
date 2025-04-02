<script setup lang="ts">
defineOptions({
  name: 'Overview'
})
</script>

<template>
  <div class="overview">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="竹简清单" />
      </div>
      <h1 class="name">竹简清单</h1>
    </div>

    <div class="main">
      <div class="content">
        <h1 class="title">竹简清单</h1>
        <h2 class="sub-title">集强大功能与创新设计于一身的任务管理工具</h2>
        <h2 class="sub-title">轻松掌控生活与工作的每一个细节</h2>
        <div class="buttons">
          <button class="start-using">开始使用</button>
          <button class="download">立即下载</button>
        </div>
      </div>
      <div class="images">
        <img src="@/assets/images/device/desktop.png" class="desktop" alt="desktop" />
        <img src="@/assets/images/device/pad.png" class="pad" alt="pad" />
        <img src="@/assets/images/device/phone.png" class="phone" alt="phone" />
        <img
          src="@/assets/images/device/wearables.png"
          class="wearables"
          alt="wearables"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@primary: rgba(114, 134, 215, 1);
.overview {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    133.23deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(218, 222, 240, 0.44) 100%
  );

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 18px;
    .logo {
      img {
        width: 65px;
      }
    }
    .name {
      font-size: 22px;
      font-weight: 600;
      margin-left: 8px;
    }
  }

  .main {
    width: 80%;
    min-width: 1000px;
    max-width: 1400px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content {
      .title {
        font-size: 24px;
        font-weight: 600;
      }
      .sub-title {
        font-size: 14px;
        font-weight: 400;
        margin-top: 10px;
      }
      .buttons {
        margin-top: 20px;
        display: flex;
        gap: 20px;
        button {
          width: 100px;
          height: 28px;
          background-color: #fff;
          outline: none;
          border: 0;
          display: block;
          border-radius: 6px;
          &.start-using {
            background-color: @primary;
            color: #fff;
          }
          &.download {
            border: 1px solid @primary;
            color: @primary;
          }
        }
      }
    }

    .images {
      position: relative;
      width: 800px;
      overflow: hidden;
      img {
        transform: translateY(100%);
        opacity: 0;
        position: absolute;
        animation: show 0.9s cubic-bezier(0, 0, 0, 1.04) forwards;
      }
      .desktop {
        position: relative;
        width: 84%;
        z-index: 1;
      }
      .pad {
        width: 73%;
        z-index: 2;

        right: 40px;
        bottom: 0;
        animation-delay: 0.2s;
      }
      .phone {
        width: 22%;
        z-index: 3;

        right: 0px;
        bottom: 0;
        animation-delay: 0.4s;
      }
      .wearables {
        width: 24%;
        z-index: 4;

        right: 25%;
        bottom: 20px;
        animation-delay: 0.4s;
      }

      @keyframes show {
        0% {
          opacity: 0;
          transform: translateY(100%);
        }
        100% {
          opacity: 1;
          transform: translate(0);
        }
      }
    }
  }
}
</style>
