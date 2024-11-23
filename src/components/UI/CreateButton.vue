<script setup lang="ts">
defineProps<{
  onClick: Function
  isSave?: boolean
}>()
</script>

<template>
  <button class="create-button" @click="() => onClick()">{{isSave ? 'Сохранить' : 'Создать'}}</button>
</template>

<style scoped lang="scss">
.create-button {
  padding: 10px 16px;
  background: #50b053;
  border: none;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  display: block;
  margin-left: auto;
  text-transform: uppercase;
}
.create-button:hover {
  background: #417b43;
}
</style>
