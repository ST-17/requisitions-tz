<script setup lang="ts">
import Input from "../components/UI/Input.vue";
import Table from "../components/Table.vue";
import RequestDialog from "../components/RequestDialog.vue";
import { onMounted, reactive, ref } from "vue";
import { axiosInstance } from "../plugin/axios.ts";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";
import Select from "../components/UI/Select.vue";
import CreateButton from "../components/UI/CreateButton.vue";

const FILTER_BODY = {
  search: undefined,
  premise_id: undefined,
  page: 1,
  page_size: 10,
};

const isDialogVisible = ref(false);

const filter = reactive(structuredClone(FILTER_BODY));
const count = ref(0);

const isRequestsAreLoading = ref(false);
const requests = ref([]);
const getRequests = async () => {
  isRequestsAreLoading.value = true;
  try {
    const { data } = await axiosInstance.get("appeals/v1.0/appeals/", {
      params: {
        ...filter,
      },
    });
    count.value = data?.count;
    requests.value = data?.results;
  } catch (error) {
    console.log(error);
  } finally {
    isRequestsAreLoading.value = false;
  }
};

const isPremisesAreLoading = ref(false);
const premises = ref([]);
const getPremises = async () => {
  isPremisesAreLoading.value = true;
  try {
    const { data } = await axiosInstance.get("geo/v2.0/user-premises/");
    premises.value = data?.results ?? [];
  } catch (error) {
    console.log(error);
  } finally {
    isPremisesAreLoading.value = false;
  }
};

const onPageChange = (event: any) => {
  filter.page = event.page + 1;
  filter.page_size = event.rows;
  getRequests();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const onSearch = () => {
  filter.page = 1;
  getRequests();
};

const onSelect = () => {
  filter.page = 1;
  getRequests();
};

const dialogRequest = ref();
const openDialog = (request: any) => {
  dialogRequest.value = request;
  isDialogVisible.value = true;
};

const onCreate = () => {
  dialogRequest.value = undefined;
  isDialogVisible.value = true;
}

const closeDialog = () => {
  isDialogVisible.value = false;
  getRequests();
};

onMounted(() => {
  getRequests();
  getPremises();
});
</script>

<template>
  <RequestDialog
    v-if="isDialogVisible"
    :request="dialogRequest"
    v-model="isDialogVisible"
    :premises="premises"
    @close="closeDialog"
  />
  <section class="list-container">
    <p class="list-text">Список заявок</p>
    <div class="list-box">
      <CreateButton
        :onClick="onCreate"
        style="margin-bottom: 32px"
      />
      <!-- <button class="create-button" @click="isDialogVisible = true">
        Создать
      </button> -->
      <div class="filter">
        <Input
          v-model:model-value="filter.search"
          placeholder="Поиск (№ заявки, название)"
          icon="search"
          icon-side="right"
          @icon-click="onSearch"
        />
        <!-- <Input placeholder="Дом" /> -->
        <Select
          v-model:model-value="filter.premise_id"
          placeholder="Дом"
          :options="premises"
          :loading="isPremisesAreLoading"
          option-label="address"
          option-value="id"
          filter
          show-clear
          :change="onSelect"
        />
      </div>
      <div v-if="isRequestsAreLoading" class="loading">
        <ProgressSpinner />
      </div>
      <Table
        v-if="requests && requests?.length > 0"
        :requests="requests"
        @edit-request="openDialog"
      />
      <Paginator
        v-if="requests && requests?.length > 0"
        :rows="filter.page_size"
        :totalRecords="count"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="onPageChange"
      />
      <p
        v-if="requests && requests?.length === 0 && !isRequestsAreLoading"
        class="no-data-message"
      >
        Данные не найдены
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.list-container {
  min-height: 100vh;
  padding: 15px;
  background: #eee;
}
.list-text {
  color: #454545;
  font-size: 20px;
  padding: 0 15px;
}
.list-box {
  margin-top: 70px;
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;
}
.filter {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 32px;
}
.loading {
  display: flex;
  justify-content: center;
}
.no-data-message {
  text-align: center;
  padding-bottom: 20px;
}
</style>
