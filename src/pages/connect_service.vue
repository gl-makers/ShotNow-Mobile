<template>
  <var-fab 
    type="danger"
    inactive-icon="cog-outline"
    @click="new_record"
  />
</template>
<script setup lang="ts">
const new_record = () => {
  console.log("new_record");
};
</script>
