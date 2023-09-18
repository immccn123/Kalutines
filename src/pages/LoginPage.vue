<template>
  <q-page class="q-px-lg">
    <h3>登录</h3>
    <q-form>
      <q-input
        class="q-my-sm"
        filled
        v-model="username"
        label="手机号/邮箱"
      ></q-input>
      <q-input
        class="q-my-sm"
        filled
        type="password"
        v-model="password"
        label="密码"
      ></q-input>

      <div>
        <q-checkbox v-model="savePassword">记住密码</q-checkbox>
      </div>

      <q-btn color="primary" @click="login()" :loading="isLogging">登录</q-btn>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { schoolApi } from 'src/boot/axios';
import { useSessionStore } from 'src/stores/session-store';
import { useRouter } from 'vue-router';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const username = ref<string>($q.localStorage.getItem('username') || ''),
  password = ref<string>($q.localStorage.getItem('password') || ''),
  savePassword = ref(true);
const store = useSessionStore();
const router = useRouter();
const isLogging = ref(false);

const login = async () => {
  isLogging.value = true;
  await schoolApi
    .post('/public/login', {
      name: username.value,
      password: password.value,
    })
    .then((response: AxiosResponse) => {
      const token =
        response.headers.Authorization || response.headers.authorization;
      if (!token) return;
      store.setToken(token as string);
      schoolApi.defaults.headers.common['Authorization'] = store.token;
      if (savePassword.value) {
        $q.localStorage.set('username', username.value);
        $q.localStorage.set('password', password.value);
      } else {
        $q.localStorage.remove('username');
        $q.localStorage.remove('password');
      }
      router.push('/');
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 400) {
        $q.notify({
          message: '账号或密码错误',
          color: 'red',
        });
      } else {
        $q.notify({
          message: error.message,
          caption: '未知错误',
          color: 'red',
        });
      }
    });
  isLogging.value = false;
};
</script>
