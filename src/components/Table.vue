<script setup lang="ts">
import formatDate from "../helpers/formatDate.ts";

const props = defineProps<{
  requests?: any[];
}>();

const emits = defineEmits(["edit-request"]);

const applicantFullname = (applicant) => {
  const { last_name, first_name, patronymic_name } = applicant;
  const fullNameParts = [last_name, first_name, patronymic_name].filter(
    (part) => part.trim() !== ""
  );

  return fullNameParts.length > 0 ? fullNameParts.join(" ") : "-";
};
</script>

<template>
  <div class="list-table">
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Создана</th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests" :key="request.id">
          <td>
            <div
              class="request-number"
              @click="emits('edit-request', request)"
            >
              {{ request.number }}
            </div>
          </td>
          <td>{{ formatDate(request.created_at) ?? "-" }}</td>
          <td>{{ request.premise?.address ?? "-" }}</td>
          <td>{{ applicantFullname(request.applicant) ?? "-" }}</td>
          <td>
            {{
              request.description && request.description !== ""
                ? request.description
                : "-"
            }}
          </td>
          <td>{{ formatDate(request.due_date) ?? "-" }}</td>
          <td>{{ request.status?.name ?? "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  border-collapse: collapse;
  margin-bottom: 20px;
}
thead tr,
tbody tr {
  border-bottom: 1px solid #ccc;
}
th,
td {
  text-align: left;
  padding: 20px 8px;
  font-weight: 400;
}
th {
  padding: 12px 8px;
  color: #50b053;
}
.request-number {
  display: inline-block;
  background: #50b053;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.request-number:hover {
  background: #417b43;
}
.no-data-message {
  text-align: center;
}
</style>
