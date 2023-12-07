<template>
  <div>
    <!-- image="dji_bg.jpg" -->
    <var-app-bar
      round
      image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, #333 339%"
    >
      <div class="title">ShotNow!</div>
      <template #left>
        <var-button round text color="transparent" text-color="#fff">
          <var-icon name="menu" :size="24" />
        </var-button>
      </template>

      <template #content>
        <var-tabs
          style="margin-top: 10px"
          color="transparent"
          active-color="#fff"
          inactive-color="#ddd"
          v-model:active="active_tab"
        >
          <var-tab name="shot_record">拍摄记录</var-tab>
          <var-tab name="scene_record">场记板</var-tab>
          <var-tab name="connect_service">连接服务</var-tab>
        </var-tabs>
      </template>
    </var-app-bar>
    <router-view v-slot="{ Component }">
      <transition name="opacity">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const active_tab = ref("shot_record");

// 从路由 获取 active_tab
router.isReady().then(() => {
  // @ts-ignore
  active_tab.value = router.currentRoute.value.name
})

watch(active_tab, (val) => {
  // console.log("active_tab", new_val, old_val);
  router.push({ name: val })
})
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>
