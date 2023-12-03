<template>
  <div class="container">
    <var-form ref="form" scroll-to-error="start">
      <var-form-item label="日期" prop="date">
        <var-time-picker
          class="time-picker"
          v-model="formData.time"
          type="date"
          placeholder="请选择日期"
        />
      </var-form-item>
      <var-form-item label="标题" prop="title">
        <var-input v-model="formData.title" placeholder="请输入标题" class="input">
            <template #prepend-icon>
                <var-icon name="message-text-outline" />
            </template>
        </var-input>
      </var-form-item>
      <var-form-item label="描述" prop="description">
        <var-input v-model="formData.description" placeholder="请输入描述" class="input">
            <template #prepend-icon>
                <var-icon name="information-outline" />
            </template>
        </var-input>
      </var-form-item>
      <var-form-item label="标签" prop="tags">
        <div class="tag-container">
            <var-chip
              v-for="tag in formData.tags"
              :key="tag"
              closable
              type="info"
              :color="generateHSLAColor(tag)"
              @close="remove_tag(tag)"
            >{{ tag }}</var-chip>
        </div>
        <div class="tag-input-container">
            <var-input v-model="tag_input" placeholder="请输入标签" class="tag-input">
                <template #prepend-icon>
                    <var-icon name="bell-outline" />
                </template>
            </var-input>
            <var-button @click="add_tag" text class="add-tag-button" outline type="primary">添加标签</var-button>
        </div>
      </var-form-item>
      <var-form-item>
        <var-button class="submit-btn" type="primary"  @click="submit">Shot Now!</var-button>
      </var-form-item>
    </var-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue";
import { Snackbar } from '@varlet/ui'

import { useStore } from "../store";

import { ShotRecordForm } from "../types/ShotRecord";

import { generateHSLAColor } from "../utils/colors";

const emits = defineEmits(['update:isshow'])

const store = useStore()

const formData = reactive<ShotRecordForm>({
  title: "",
  description: "",
  time: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  tags: [],
});
const form = ref(null);

const tag_input = ref("");

const add_tag = () => {
  if (formData.tags.includes(tag_input.value)) {
    return Snackbar("标签已存在");
  }

  if (tag_input.value) {
    formData.tags.push(tag_input.value);
    tag_input.value = "";
  }

};

const remove_tag = (tag: string) => {
  const index = formData.tags.indexOf(tag);
  if (index > -1) {
    formData.tags.splice(index, 1);
  }
};


const submit = () => {
  if (!formData.title) {
    return Snackbar("标题不能为空");
  }
  const date = new Date().toLocaleDateString("en-US") + " " + formData.time;
  // console.log(formData,date);
  const tmp = { ...formData, date, key: formData.title + "." + Date.now(), end_date: "" }
  // @ts-ignore
  delete tmp.time
  store.shot_record.push(tmp)
  emits("update:isshow", false)
  
};
</script>

<style lang="less" scoped>
.container {
  .time-picker {
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .input {
    padding-top: 10px;
  }
  .tag-container {
    margin: 10px 5px 0px 5px;
  }
  .tag-input-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .tag-input {
      flex: 1;
    }
    .add-tag-button {
      margin-top: 10px;
    }
  }
  .submit-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
