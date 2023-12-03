<template>
  <var-fab 
    type="danger"
    inactive-icon="plus"
    @click="new_record"
  />
  1231
</template>
<script setup lang="ts">
const new_record = () => {
  console.log("new_record");
};
</script>
