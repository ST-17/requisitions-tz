<script setup lang="ts">
import { Dropdown, SelectChangeEvent } from "primevue";

const modelValue = defineModel();

defineProps<{
  placeholder?: string
  options?: any[]
  loading?: boolean
  optionLabel?: string
  optionId?: string
  disable?: boolean
  change?: (event: SelectChangeEvent) => void
}>()
</script>

<template>
  <Dropdown
    v-model:model-value="modelValue"
    class="dropdown"
    :placeholder="placeholder ?? ''"
    :options="options ?? []"
    :loading="loading"
    :option-label="optionLabel"
    :option-value="optionId"
    filter
    show-clear
    @change="change"
    :disabled="disable"
  />
</template>

<style scoped lang="scss">
.dropdown {
  width: 100%;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #ccc;
}
</style>
