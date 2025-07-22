<template>
  <div class="table-container">
    <table class="appointments-table">
      <thead>
        <tr>
          <th>اسم المريض</th>
          <th>تاريخ الموعد</th>
          <th>آخر زيارة</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments" :key="index">
          <td>{{ appointment.name }}</td>
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.lastVisit || '-' }}</td>
          <td>
            <span :class="['status', appointment.status]">
              {{ statusLabels[appointment.status] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  data() {
    return {
      appointments: [
        { name: 'بن علي سمير', date: '05 نوفمبر 2024', lastVisit: '', status: 'done' },
        { name: 'لعور مصطفى', date: '05 نوفمبر 2024', lastVisit: '', status: 'done' },
        { name: 'كركار ليلى', date: '16 نوفمبر 2024', lastVisit: '08 أوت 2024', status: 'canceled' },
        { name: 'طالبي أمين', date: '30 نوفمبر 2024', lastVisit: '', status: 'pending' },
        { name: 'زواوي زهية', date: '3 ديسمبر 2024', lastVisit: '11 جانفي 2024', status: 'pending' },
        { name: 'العمر طاهر', date: '8 ديسمبر 2024', lastVisit: '', status: 'done' }
      ],
      statusLabels: {
        done: 'منتهي',
        canceled: 'ملغى',
        pending: 'في الانتظار'
      }
    };
  }
};
</script>

<style scoped>
.table-container {
  padding: 16px;
  overflow-x: auto;
  direction: rtl; /* RTL support for Arabic */
}

.appointments-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #e0e0e0;
  font-family: 'Arial', sans-serif;
  text-align: right;
}

.appointments-table thead {
  background-color: #f5f5f5;
}

.appointments-table th,
.appointments-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}

.status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
}

/* Status Colors */
.status.done {
  background-color: #d1f7e2;
  color: #188758;
}

.status.canceled {
  background-color: #fddede;
  color: #d32f2f;
}

.status.pending {
  background-color: #e0f0ff;
  color: #1e88e5;
}
</style>
