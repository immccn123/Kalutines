<template>
  <q-page class="q-ma-lg">
    <h3>选择需要完成的作业</h3>
    <q-list bordered padding>
      <q-item
        v-for="(item, index) in homeworks"
        :key="index"
        tag="label"
        :disable="item.state === 2"
        :active="item.state === 2"
        active-class="bg-teal-1"
      >
        <q-item-section avatar>
          <q-checkbox
            :disable="item.state === 2"
            v-model="chooseHomeworks[index]"
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>过期时间：{{ item.expiredTime }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{
            item.state === 2 ? '已完成' : '未完成'
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSessionStore } from '../stores/session-store';
import { schoolApi } from 'src/boot/axios';
import { ref, watch } from 'vue';
import { Homework, HomeworkResponse } from 'src/interfaces/homework';

const router = useRouter();
const store = useSessionStore();

const homeworks = ref<Homework[]>([]);
const chooseHomeworks = ref<boolean[]>([]);
let selectedHomeworks: Homework[] = [];

watch(homeworks, () => {
  chooseHomeworks.value = [];
  homeworks.value.map(() => {
    chooseHomeworks.value.push(false);
  });
});

watch(chooseHomeworks, () => {
  if (chooseHomeworks.value.length !== homeworks.value.length) return;
  selectedHomeworks = [];
  for (let i = 0; i < chooseHomeworks.value.length; i++) {
    if (chooseHomeworks.value[i]) {
      selectedHomeworks.push(homeworks.value[i]);
    }
  }
});

if (store.token === undefined) {
  router.push('/login');
} else {
  schoolApi
    .get<HomeworkResponse>('/student/ai-homework/all/unfinish')
    .then((response) => {
      homeworks.value = [...homeworks.value, ...response.data.homeworkList];
    });
  schoolApi
    .get<HomeworkResponse>('/student/ai-homework/all/expired')
    .then((response) => {
      homeworks.value = [...homeworks.value, ...response.data.homeworkList];
    });
}
</script>
