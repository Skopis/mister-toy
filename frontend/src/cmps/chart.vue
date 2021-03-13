<script>
import { Pie } from "vue-chartjs";

export default {
  methods: {
    getData(type) {
      var allToys = this.$store.getters.toys;
      var toysToShow = [];
      allToys.forEach((toy) => {
        for (let i = 0; i < toy.type.length; i++) {
          if (toy.type[i] === type) toysToShow.push(toy);
        }
      });
      return toysToShow.length;
    },
  },
  extends: Pie,
  mounted() {
    this.renderChart({
      labels: ["learning", "funny", "sports", "scary", "toddlers"],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
          data: [
            this.getData("learning"),
            this.getData("funny"),
            this.getData("sports"),
            this.getData("scary"),
            this.getData("toddlers"),
          ],
        },
      ],
    });
  },
};
</script>

