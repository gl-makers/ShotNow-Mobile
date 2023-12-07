<template>
  <var-fab
    type="danger"
    inactive-icon="camera"
    @click="new_record"
    :show="!showCollector"
  />
  <div class="container">
    <transition name="opacity">
      <SceneInfoCollector
        v-if="showCollector"
        v-model:isshow="showCollector"
      ></SceneInfoCollector>
      <div v-else>
        <var-result
          v-if="store.scene_info.length == 0"
          type="warning"
          title="未检测到本地场记板"
          description="您可能是第一次使用 或不小心删除了本地储存"
        >
          <!-- <template #footer>
            <var-button type="success">知道了</var-button>
          </template> -->
        </var-result>
        <var-card
          v-for="item in store.scene_info"
          :key="item.key"
          v-model:floating="card_floating[item.key]"
          :title="item.title"
          :subtitle="item.date"
          :description="item.description"
        >
          <template #description>
          </template>
          <template #extra>
            <var-button
              type="primary"
              @click="card_floating[item.key] = !card_floating[item.key]"
              >{{ card_floating[item.key] ? "关闭" : "详细" }}</var-button
            >
          </template>

          <template #floating-content>
            <var-divider dashed />
          </template>
        </var-card>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SceneInfoCollector from "../components/SceneInfoCollector.vue";
import { useStore } from "../store";

const store = useStore();

const showCollector = ref(false);

  const card_floating = ref<Record<string, boolean>>({});

const new_record = () => {
  // console.log("new_record");
  showCollector.value = !showCollector.value;
};
</script>

<style lang="less" scoped>
.container {
  margin: 16px;
  .tag-container {
    margin: 16px;
  }
  .tag-container * {
    margin: 0 1px;
  }
}
</style>
