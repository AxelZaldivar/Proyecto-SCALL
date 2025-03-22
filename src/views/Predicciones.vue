<template>
  <div class="container">
    <div class="home">
      <header>
        <h1>Optimización de primeras aguas</h1>
      </header>

      <section>
        <h2>Predicción con Red Neuronal</h2>
        <div class="card">
          <p>
            En este apartado, podremos
            <strong
              >optimizar el porcentaje de primeras aguas que debemos
              almacenar</strong
            >, en base a los días que han pasado sin llover, a la calidad del
            aire (puntos IMECA), a la velocidad del viento y en base a la
            humedad de la ciudad en donde se encuentre el SCALL.
          </p>
          <p>
            Recordemos que las primeras aguas son las más
            <strong>contaminadas en cada lluvia</strong>, pero no en todas se
            encuentra igual de sucia.
          </p>
          <input
            type="text"
            v-model="city"
            placeholder="Escribe una ciudad (ej. Guadalajara)"
            class="form-control espacio"
          />
          <button @click="makePrediction" class="btn button is-primary">
            Predecir
          </button>
        </div>

        <div class="card" v-if="prediction !== null">
          <p>
            Para la ciudad de <strong>{{ city }}</strong
            >, dado que no se han presentado precipitaciones en los últimos
            <strong>{{ prediction.dias_sin_lluvia }} días</strong>, que los
            puntos IMECA de la ciudad son de <strong>{{ prediction.imeca }}</strong
            >, la velocidad del viento es de
            <strong>{{ prediction.viento }} km/h</strong> y que la humedad se
            encuentra en <strong>{{ prediction.humedad }}%</strong>
            el porcentaje estimado de primeras aguas para la próxima lluvia es
            de:
            <strong>{{ prediction.porcentaje_tiro }}%</strong>
          </p>
        </div>

        <div class="card" v-else-if="errorMsg">
          <p>
            {{ errorMsg }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      city: "",
      prediction: null,
      errorMsg: null,
    };
  },
  methods: {
    async makePrediction() {
      this.prediction = null;
      this.errorMsg = null;
      try {
        const response = await axios.get(
          `https://web-production-41af.up.railway.app/predecir?ciudad=${this.city}`
        );
        this.prediction = response.data;
        console.log(this.prediction);
      } catch (error) {
        console.error("Error en la predicción:", error);
        this.errorMsg =
          "No se pudo obtener la predicción. Verifica el nombre de la ciudad o intenta más tarde.";
      }
    },
  },
};
</script>
