<script setup lang="ts">
import { ref } from "vue";

const modelValue = defineModel();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

defineProps<{
  label?: string;
  type?: string;
  isPassword?: boolean;
  icon?: string;
  iconSide?: string;
  placeholder?: string;
  error?: string;
}>();

const emits = defineEmits(["icon-click"]);
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <div class="input-wrapper" :class="error && 'error-wrapper'">
    <i
      v-if="iconSide === 'left'"
      class="pi"
      :class="`pi-${icon} ${icon === 'search' ? 'cursor-pointer' : ''}`"
      style="margin-right: 8px"
      @click="emits('icon-click')"
    ></i>
    <input
      v-if="!isPassword"
      :type="type ?? 'text'"
      v-model="modelValue"
      :placeholder="placeholder ?? ''"
    />
    <input
      v-else
      :type="isPasswordVisible ? 'text' : 'password'"
      v-model="modelValue"
      placeholder="Пароль"
    />
    <i
      v-if="isPassword"
      :class="isPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
      class="toggle-visibility"
      @click="togglePasswordVisibility"
    ></i>
    <i
      v-if="iconSide === 'right'"
      class="pi"
      :class="`pi-${icon} ${icon === 'search' ? 'cursor-pointer' : ''}`"
      @click="emits('icon-click')"
    ></i>
  </div>
  <span v-if="error" class="error-text">{{ error }}</span>
</template>

<style scoped lang="scss">
.input-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 8px;
}

.input-wrapper input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: #333;
}

.input-wrapper i {
  font-size: 16px;
  color: #999;
}

label {
  font-size: 14px;
  color: #50b053;
}

.toggle-visibility {
  cursor: pointer;
}

.error-text {
  font-size: 12px;
  color: red;
}
.error-wrapper {
  border-bottom: 1px solid red;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
