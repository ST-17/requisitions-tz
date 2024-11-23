<script setup lang="ts">
import { onMounted, ref } from "vue";
import { axiosInstance } from "../plugin/axios.ts";
import { useRouter } from "vue-router";
import Input from "../components/UI/Input.vue";

const router = useRouter();

const login = ref("");
const password = ref("");

const errorLabel = ref("");
const errors = ref({});

const handleLogin = async () => {
  try {
    const { data } = await axiosInstance.post("auth/login/", {
      username: login.value,
      password: password.value,
    });
    localStorage.setItem("@access-token", data?.key);
    router.push("/");
  } catch (err) {
    errorLabel.value = err?.response?.data.detail;
    errors.value = err?.response?.data.data;
    console.log(err);
  }
};

onMounted(() => {
  localStorage.removeItem("@access-token");
});
</script>

<template>
  <div class="log">
    <p>Login: 79122333444</p>
    <p>Password: 123456</p>
  </div>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">Авторизация</div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <Input
            v-model:model-value="login"
            label="Логин или Телефон"
            icon="phone"
            icon-side="left"
            placeholder="Логин или Телефон"
          />
        </div>
        <div class="form-group">
          <Input
            v-model:model-value="password"
            icon="lock"
            type="password"
            :error="errors.password && errors.password[0]"
            is-password
            icon-side="left"
          />
        </div>
        <span v-if="errorLabel" class="error-text">{{ errorLabel }}</span>
        <button type="submit" class="login-button">Войти</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.log{
  position: absolute;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/bg.png");
  background-size: cover;
  background-position: center;
}

.login-box {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  text-align: center;
  position: relative;
}

.login-header {
  font-size: 16px;
  font-weight: 500;
  font-weight: bold;
  color: #fff;
  background: #50b053;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  top: -15px;
  left: 20px;
  right: 20px;
}

form {
  margin-top: 50px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.login-button {
  background: #50b053;
  border: none;
  color: #fff;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.login-button:hover {
  background: #417b43;
}

.error-text {
  color: rgb(255, 0, 0);
  font-size: 12px;
  display: block;
  text-align: left;
  margin-bottom: 10px;
}
</style>
