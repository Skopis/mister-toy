<template>
  <div class="home main-content">
    <div>
      <h3>Number of Toys per Type</h3>
      <chart class="chart" v-if="toys.length" />
    </div>
    <div>
      <h3>Average Price of Toys per Type</h3>
      <chart-average class="chart" :toys="toys" v-if="toys.length"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import chart from "@/cmps/chart";
import chartAverage from '@/cmps/chart-average';

export default {
  name: "home",
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
  },
  components: {
    chart,
    chartAverage
  },
};
</script>