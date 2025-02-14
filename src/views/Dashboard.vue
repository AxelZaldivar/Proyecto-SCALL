<template>
  <div id="app">
    <div class="container">
      <div class="home">
        <header>
          <h1>Precipitación a nivel nacional</h1>
        </header>
        <BarChart />
        <div class="card">
          <div class="p-2">
            <h3>Datos extraídos de la Comisión Nacional del Agua 2022</h3>
            <i class="fa fa-arrow-right"></i>
            <span>
              <a
                href="https://smn.conagua.gob.mx/tools/DATA/Climatolog%C3%ADa/Pron%C3%B3stico%20clim%C3%A1tico/Temperatura%20y%20Lluvia/PREC/2022.pdf"
                target="_blank"
                >Visitar el sitio oficial</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";

export default {
  name: "Dashboard",
  components: { BarChart },
};
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css);
@import url(https://use.fontawesome.com/releases/v5.0.13/css/all.css);
</style>
