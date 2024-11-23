<script setup lang="ts">
import Dialog from "primevue/dialog";
import Select from "./UI/Select.vue";
import DatePicker from "primevue/datepicker";
import Input from "./UI/Input.vue";
import CreateButton from "./UI/CreateButton.vue";
import { onMounted, ref, toRaw } from "vue";
import { axiosInstance } from "../plugin/axios.ts";
import formatDate from "../helpers/formatDate.ts";

const modelValue = defineModel<boolean | undefined>();

const props = defineProps<{
  request: any;
  premises?: any[];
}>();

const emits = defineEmits(["close"]);

const request = ref();

const onSubmit = () => {
  isCreate.value ? createRequest() : saveRequest();
  emits("close");
};

const isCreating = ref(false);
const createRequest = async () => {
  isCreating.value = true;
  try {
    const rawRequest = toRaw(request.value);
    const { data } = await axiosInstance.post("appeals/v1.0/appeals/", {
      ...rawRequest,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    isCreating.value = false;
  }
};

const isSaving = ref(false);
const saveRequest = async () => {
  isSaving.value = true;
  try {
    const rawRequest = toRaw(request.value);
    const { data } = await axiosInstance.patch(
      `appeals/v1.0/appeals/${rawRequest.id}/`,
      {
        ...rawRequest,
        due_date: props.request.due_date,
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    isSaving.value = false;
  }
};

const apartmentsAreLoading = ref(false);
const apartments = ref([]);
const getApartments = async () => {
  apartmentsAreLoading.value = true;
  try {
    const { data } = await axiosInstance.get("geo/v1.0/apartments/", {
      params: {
        premise_id: request.value.premise_id,
      },
    });
    apartments.value = data?.results ?? [];
  } catch (error) {
    console.log(error);
  } finally {
    apartmentsAreLoading.value = false;
  }
};

const onPremisesChange = () => {
  request.value.apartment_id = undefined;
  getApartments();
};

const isCreate = ref(true);

onMounted(() => {
  if (props.request) {
    isCreate.value = false;
    request.value = {
      ...props.request,
      premise_id: props.request.premise?.id ?? undefined,
      apartment_id: props.request.apartment?.id ?? undefined,
      due_date: formatDate(props.request.due_date),
    };
    getApartments();
  } else {
    request.value = {
      status_id: 1,
      premise_id: undefined,
      apartment_id: undefined,
      due_date: undefined,
      applicant: {
        last_name: undefined,
        first_name: undefined,
        patronymic_name: undefined,
        username: undefined,
      },
      description: undefined,
    };
  }
});
</script>

<template>
  <Dialog
    v-model:visible="modelValue"
    modal
    :header="
      isCreate
        ? 'Создание заявки'
        : `Заявка № ${request.number} (от ${formatDate(request.created_at)})`
    "
    :draggable="false"
  >
    <div class="dialog-status">
      <span>{{ request.status?.name ?? "Новая" }}</span>
    </div>
    <div class="dialog-row">
      <Select
        v-model:model-value="request.premise_id"
        placeholder="Дом"
        :options="premises"
        option-label="address"
        option-value="id"
        filter
        show-clear
        :change="onPremisesChange"
      />
      <Select
        v-model="request.apartment_id"
        placeholder="Квартира"
        :options="apartments"
        :loading="apartmentsAreLoading"
        optionLabel="number"
        optionId="id"
        :disabled="!request.premise_id"
      />
      <DatePicker
        v-model="request.due_date"
        id="datepicker-24h"
        placeholder="Срок"
        dateFormat="dd.mm.yy"
        hourFormat="24"
        class="date-picker"
      />
    </div>
    <div class="dialog-row">
      <Input v-model="request.applicant.last_name" placeholder="Фамилия" />
      <Input v-model="request.applicant.first_name" placeholder="Имя" />
      <Input
        v-model="request.applicant.patronymic_name"
        placeholder="Отчество"
      />
      <Input v-model="request.applicant.username" placeholder="Телефон" />
    </div>
    <textarea
      v-model="request.description"
      class="dialog-textarea"
      placeholder="Описание заявки"
      rows="7"
    />
    <div>
      <CreateButton :onClick="onSubmit" :isSave="!isCreate" />
    </div>
  </Dialog>
</template>

<style lang="scss">
.dialog-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 32px;
}
.date-picker {
  width: 100%;
}
.date-picker .p-inputtext {
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #ccc;
}
.dialog-textarea {
  width: 100%;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  resize: none;
  margin-bottom: 24px;

  &:focus {
    outline: none;
  }
}
.dialog-status {
  display: flex;
  justify-content: end;
  margin-bottom: 15px;

  P {
    font-size: 14px;
  }
}
</style>
