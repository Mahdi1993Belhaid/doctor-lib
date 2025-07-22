<template>
  <div class="card">
    <h3 class="title">المرضى الجدد</h3>
    <table class="patient-table">
      <thead>
        <tr>
          <th>الصورة</th>
          <th>الاسم</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.name">
          <td><img :src="patient.avatar" alt="avatar" class="avatar" /></td>
          <td class="name">{{ patient.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Examination',
  data() {
    return {
      patients: [
        { name: "محجوب العارم", avatar: "https://i.pravatar.cc/40?img=1" },
        { name: "قطاعي سهام", avatar: "https://i.pravatar.cc/40?img=2" },
        { name: "قاسمي علي", avatar: "https://i.pravatar.cc/40?img=3" },
        { name: "بولرباح عامر", avatar: "https://i.pravatar.cc/40?img=4" },
        { name: "كريمي خديجة", avatar: "https://i.pravatar.cc/40?img=5" },
        { name: "بوعلام فتيحة", avatar: "https://i.pravatar.cc/40?img=6" },
      ]
    };
  }
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 0 10px #eee;
  direction: rtl;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: bold;
  text-align: right;
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
}

.patient-table th,
.patient-table td {
  padding: 8px;
  vertical-align: middle;
  font-size: 14px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-weight: normal;
}
</style>
