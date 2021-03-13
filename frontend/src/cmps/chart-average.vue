<script>
import { Bar } from "vue-chartjs";

export default {
  props: ["toys"],
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: ["funny", "sports", "learning", "toddlers", "scary"],
        datasets: [
          {
            label: "Average Price",
            backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)'
            ],
            data: [
              this.getData("funny"),
              this.getData("sports"),
              this.getData("learning"),
              this.getData("toddlers"),
              this.getData("scary"),
            ],
          },
        ],
      },
      {
        scales: {
          yAxes: [
            {
              type: "linear",
              ticks: {
                beginAtZero: true,
                min: 0,
              },
            },
          ],
        },
      }
    );
  },
  methods: {
    getData(type) {
      let toysToShow = [];
      this.toys.forEach((toy) => {
        for (let i = 0; i < toy.type.length; i++) {
          if (toy.type[i] === type) toysToShow.push(toy.price);
        }
      });
      if (toysToShow.length <= 1) {
        return toysToShow[0];
      }
      return toysToShow.reduce((a, b) => a + b) / toysToShow.length;
    },
  },
};
</script>
<style>
.chart {
  width: 500px;
}
</style>