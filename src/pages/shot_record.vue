<template>
  <var-fab
    type="danger"
    inactive-icon="camera"
    @click="new_record"
    :show="!showCollector"
  />
  <div class="container">
    <transition name="opacity">
      <ShotInfoCollector
        v-if="showCollector"
        v-model:isshow="showCollector"
      ></ShotInfoCollector>
      <div v-else>
        <var-result
          v-if="store.shot_record.length == 0"
          type="warning"
          title="未检测到本地拍摄记录"
          description="您可能是第一次使用 或不小心删除了本地储存"
        >
          <!-- <template #footer>
            <var-button type="success">知道了</var-button>
          </template> -->
        </var-result>
        <var-card
          v-for="item in store.shot_record"
          :key="item.key"
          v-model:floating="card_floating[item.key]"
          :title="item.title + (item.end_date !== '' ? '(已结束)' : '')"
          :subtitle="
            item.end_date !== '' ? item.date + ' - ' + item.end_date : item.date
          "
        >
          <!-- src="dji_bg.jpg" -->
          <!-- src="https://varlet.gitee.io/varlet-ui/cat.jpg" -->
          <template #description>
            <div class="tag-container">
              <var-chip
                v-for="tag in item.tags"
                size="small"
                :key="tag"
                type="info"
                :color="generateHSLAColor(tag)"
                >{{ tag }}</var-chip
              >
            </div>
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

            <div class="card-example-text">
              {{ item.description }}
              <br />
              <var-button
                @click="
                  item.end_date == ''
                    ? endRecord(item.key)
                    : restartRecord(item.key)
                "
                :type="item.end_date == '' ? 'danger' : 'success'"
              >{{ item.end_date == '' ? '结束' : '撤销结束' }}</var-button
              >
              <!-- <var-button @click="restartRecord(item.key)" type="success">再次开始</var-button> -->
            </div>
          </template>
        </var-card>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ShotInfoCollector from "../components/ShotInfoCollector.vue";
import { useStore } from "../store";
import { generateHSLAColor } from "../utils/colors";

const store = useStore();

const showCollector = ref(false);

const card_floating = ref<Record<string, boolean>>({});

const new_record = () => {
  // console.log("new_record");
  showCollector.value = !showCollector.value;
};

const endRecord = (key: string) => {
  console.log("endRecord", key);
  // 生成 12/3/2023 02:07 AM 这样的时间
  const date = new Date()
    .toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(",", "");

  // 从 store.record 中找到对应 key 的元素修改 end date
  const index = store.shot_record.findIndex((item) => item.key === key);
  if (index > -1) {
    store.shot_record[index].end_date = date;
  }
};

const restartRecord = (key: string) => {
  // 从 store.record 中找到对应 key 的元素修改 end date
  const index = store.shot_record.findIndex((item) => item.key === key);
  if (index > -1) {
    store.shot_record[index].end_date = "";
  }
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
