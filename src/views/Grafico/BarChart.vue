<template>
  <Bar id="BarChart" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

//nuevo
import firebase from "../../firebase/init.js";
import { Chart } from "chart.js";
import { Colors } from "chart.js";

Chart.register(Colors);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      years: [],
      query: null,
      find: true,
      count: 0,
      chartData: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Mílimetros de precipitación",
            data: [],
            borderWidth: 2,
            borderRadius: 10,
          },
        ],
      },
    };
  },

  mounted() {
    this.cargarDatos();
  },

  methods: {
    //funcion para obtener los datos desde Firestore
    async getData() {
      const querySnapshot = await firebase.collection("Lluvia").get();
      const data = querySnapshot.docs.map((doc) => ({
        value1: doc.data().Enero,
        value2: doc.data().Febrero,
        value3: doc.data().Marzo,
        value4: doc.data().Abril,
        value5: doc.data().Mayo,
        value6: doc.data().Junio,
        value7: doc.data().Julio,
        value8: doc.data().Agosto,
        value9: doc.data().Septiembre,
        value10: doc.data().Octubre,
        value11: doc.data().Noviembre,
        value12: doc.data().Diciembre,
      }));
      return data;
    },

    //funcion para cargar los datos al grafico
    cargarDatos() {
      this.getData().then((data) => {
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value1)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value2)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value3)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value4)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value5)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value6)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value7)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value8)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value9)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value10)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value11)
          );
        this.chartData.datasets[0].data =
          this.chartData.datasets[0].data.concat(
            data.map((item) => item.value12)
          );
        //variables para desplegar el grafico
        const canvas = document.getElementById("BarChart");
        const chartInstance = Chart.getChart(canvas);
        const ctx = canvas.getContext("2d");
        //si existe otra instancia del grafico la elimina
        if (chartInstance) {
          chartInstance.destroy();
        }
        //variable para crear la animación de retardo
        //let delayed;
        //creacion del grafico
        const chart = new Chart(ctx, {
          type: "bar",
          data: this.chartData,
          //options: this.chartOptions,
          options: {
            animation: {
              onComplete: () => {
                //delayed: true;
              },
              delay: (context) => {
                let delay = 0;
                if (
                  context.type === "data" &&
                  context.mode === "default"// &&
                  //!delayed
                ) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
            },
            elements: {
              bar: {
                backgroundColor: this.colorize(),
                borderColor: "#000000",
              },
            },
            plugins: {
              legend: false,
              title: {
                display: true,
                text: "Milímetros de precipitación",
              },
            },
          },
        });
      });
    },

    //funcion para darle color a las barras segun su valor
    colorize() {
      return (ctx) => {
        const value = ctx.parsed.y;
        const color =
          value < 20
            ? "#D60000"
            : value < 80
            ? "#F46300"
            : value < 140
            ? "#FFFF00"
            : "#44DE28";
        return color;
      };
    },
  },
};
</script>
