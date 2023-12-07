<template>
  <div class="container">
    <var-form ref="form" scroll-to-error="start">
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
      <var-form-item>
        <var-button class="submit-btn" type="primary"  @click="submit">添加场记板</var-button>
      </var-form-item>
    </var-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue";
import { Snackbar } from '@varlet/ui'

import { useStore } from "../store";

import { SceneInfoForm } from "../types/SceneInfo";

const emits = defineEmits(['update:isshow'])

const store = useStore()

const formData = reactive<SceneInfoForm>({
  title: "",
  description: "",
});
const form = ref(null);

const submit = () => {
  if (!formData.title) {
    return Snackbar("标题不能为空");
  }
  // mm/dd/yyyy hh:mm AM
  const date = new Date().toLocaleDateString("en-US") + " " + new Date().toLocaleTimeString("en-US");
  // console.log(formData,date);
  const tmp = { ...formData, date, key: formData.title + "." + Date.now() }

  store.scene_info.push(tmp)
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
