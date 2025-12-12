<template>
 

    <div class="row">
     <div class="col-4">
      <Examination/>
     </div>
     <div class="col-8">
      <Patient/>
     </div>
     

    </div>
    <div class="row">
     
      <Schedule/>
     
    </div>
    <div class="col-8">
      <AutismWilayasChart/>
     </div>

 
</template>

<script lang="ts">
import Examination from '/src/components/dashboard/Examination.vue';
import Patient from '/src/components/dashboard/Patient.vue';
import Schedule from '/src/components/dashboard/Schedule.vue';
import AutismWilayasChart from '/src/components/dashboard/Wilaya.vue';
export default {
    
  name: 'Dashboard',
  components: {
    Examination,
    Patient,
    Schedule,

   AutismWilayasChart
  },

  
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
}

.patient-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.patient-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 10px;
}

.name {
  font-size: 14px;
}
</style>
