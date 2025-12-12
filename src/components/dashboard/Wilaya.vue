<template>
  <div class="container mt-4 text-end">
    <h2 class="mb-3">عدد الأطفال المصابين بالتوحد حسب الولاية</h2>

    <!-- Buttons List -->
    <div class="d-flex flex-wrap justify-content-end gap-2 mb-4">
      <button
        class="btn btn-primary"
        @click="selectAll"
      >جميع الولايات</button>

      <button
        v-for="(w, index) in wilayas"
        :key="index"
        class="btn btn-outline-primary"
        @click="selectWilaya(w)"
      >
        {{ w.name }}
      </button>
    </div>

    <!-- Chart Canvas -->
    <canvas ref="chartCanvas" height="120"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "AutismWilayasChart",

  data() {
    return {
      chartInstance: null,

      wilayas: [
        { name: "أدرار", count: 57 },
        { name: "الشلف", count: 12 },
        { name: "الأغواط", count: 89 },
        { name: "أم البواقي", count: 34 },
        { name: "باتنة", count: 66 },
        { name: "بجاية", count: 41 },
        { name: "بسكرة", count: 23 },
        { name: "بشار", count: 78 },
        { name: "البليدة", count: 15 },
        { name: "البويرة", count: 92 },
        { name: "تمنراست", count: 8 },
        { name: "تبسة", count: 55 },
        { name: "تلمسان", count: 73 },
        { name: "تيارت", count: 44 },
        { name: "تيزي وزو", count: 29 },
        { name: "الجزائر", count: 98 },
        { name: "الجلفة", count: 64 },
        { name: "جيجل", count: 17 },
        { name: "سطيف", count: 76 },
        { name: "سعيدة", count: 31 },
        { name: "سكيكدة", count: 53 },
        { name: "سيدي بلعباس", count: 26 },
        { name: "عنابة", count: 88 },
        { name: "قالمة", count: 19 },
        { name: "قسنطينة", count: 72 },
        { name: "المدية", count: 47 },
        { name: "مستغانم", count: 39 },
        { name: "المسيلة", count: 63 },
        { name: "معسكر", count: 21 },
        { name: "ورقلة", count: 94 },
        { name: "وهران", count: 58 },
        { name: "البيض", count: 12 },
        { name: "إليزي", count: 67 },
        { name: "برج بوعريريج", count: 45 },
        { name: "بومرداس", count: 74 },
        { name: "الطارف", count: 16 },
        { name: "تندوف", count: 81 },
        { name: "تيسمسيلت", count: 28 },
        { name: "الوادي", count: 59 },
        { name: "خنشلة", count: 33 },
        { name: "سوق أهراس", count: 97 },
        { name: "تيبازة", count: 24 },
        { name: "ميلة", count: 62 },
        { name: "عين الدفلى", count: 49 },
        { name: "النعامة", count: 14 },
        { name: "عين تموشنت", count: 83 },
        { name: "غرداية", count: 68 },
        { name: "غليزان", count: 25 },
        { name: "تيميمون", count: 91 },
        { name: "برج باجي مختار", count: 36 },
        { name: "أولاد جلال", count: 52 },
        { name: "بني عباس", count: 27 },
        { name: "إن صالح", count: 85 },
        { name: "إن ڤزام", count: 11 },
        { name: "تقرت", count: 79 },
        { name: "جانت", count: 43 },
        { name: "المغير", count: 22 },
        { name: "المنيعة", count: 61 }
      ]
    };
  },

  mounted() {
    this.renderChartAll();
  },

  methods: {
    /* ----------------------------- CHART FUNCTIONS ----------------------------- */

    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },

    renderChartAll() {
      this.destroyChart();
      const ctx = this.$refs.chartCanvas.getContext("2d");

      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.wilayas.map(w => w.name),
          datasets: [
            {
              label: "عدد الأطفال",
              data: this.wilayas.map(w => w.count),
              borderWidth: 1
            }
          ]
        }
      });
    },

    renderSingleWilaya(w) {
      this.destroyChart();
      const ctx = this.$refs.chartCanvas.getContext("2d");

      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [w.name],
          datasets: [
            {
              label: "عدد الأطفال",
              data: [w.count],
              borderWidth: 1
            }
          ]
        }
      });
    },

    /* ----------------------------- BUTTON ACTIONS ----------------------------- */

    selectAll() {
      this.renderChartAll();
    },

    selectWilaya(wilaya) {
      this.renderSingleWilaya(wilaya);
    }
  }
};
</script>

<style scoped>
button {
  font-size: 14px;
}
</style>
