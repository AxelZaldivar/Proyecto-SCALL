<template>
  <div class="card">
    <h2>Datos leídos por la red de sensores</h2>
    <div class="f">
      <!--Nivel-->
      <div class="cardi">
        <div class="horizontal">
          <div>
            <img
              src="@/components/assets/VACIO.png"
              class="search"
              v-if="nivelIMG == 0"
            />
            <img
              src="@/components/assets/CASI_VACIO.png"
              class="search"
              v-if="nivelIMG == 1"
            />
            <img
              src="@/components/assets/MITAD.png"
              class="search"
              v-if="nivelIMG == 2"
            />
            <img
              src="@/components/assets/CASI_LLENO.png"
              class="search"
              v-if="nivelIMG == 3"
            />
            <img
              src="@/components/assets/LLENO.png"
              class="search"
              v-if="nivelIMG == 4"
            />
            <img
              src="@/components/assets/VACIO_SUCIO.png"
              class="search"
              v-if="nivelIMG == 5"
            />
            <button class="button is-primary espacio-izq" @click="openModal(0)">
              <i class="fa fa-info-circle"></i>
            </button>
          </div>
          <div class="col-xs-6 mr-auto mt-auto mb-auto">
            Nivel actual del tanque.
            <input
              class="form-control"
              v-model="nivelTXT"
              type="text"
              readonly
            />
          </div>
        </div>
      </div>

      <!--PPM-->
      <div class="cardi">
        <div class="horizontal">
          <div>
            <img
              src="@/components/assets/LLENO.png"
              class="search"
              v-if="limpio < 200 && limpio > 0"
            />
            <img
              src="@/components/assets/VACIO_SUCIO.png"
              class="search"
              v-else
            />
            <button class="button is-primary espacio-izq" @click="openModal(1)">
              <i class="fa fa-info-circle"></i>
            </button>
          </div>
          <div class="col-xs-6 mr-auto mt-auto mb-auto">
            Calidad del agua almacenada en el tanque (solidos suspendidos).
            <input
              class="form-control"
              v-model="limpioTXT"
              type="text"
              readonly
            />
          </div>
        </div>
      </div>

      <!--PH-->
      <div class="cardi">
        <div class="horizontal">
          <div>
            <img
              src="@/components/assets/LLENO.png"
              class="search"
              v-if="ph > 5 && ph < 7"
            />
            <img
              src="@/components/assets/VACIO_SUCIO.png"
              class="search"
              v-else
            />
            <button class="button is-primary espacio-izq" @click="openModal(2)">
              <i class="fa fa-info-circle"></i>
            </button>
          </div>
          <div class="col-xs-6 mr-auto mt-auto mb-auto">
            Calidad del agua almacenada en el tanque (nivel de PH).
            <input class="form-control" v-model="phTXT" type="text" readonly />
          </div>
        </div>
      </div>

      <!--Milimetros-->
      <div class="cardi">
        <div class="horizontal">
          <div>
            <img src="@/components/assets/lluvia.jpg" class="search" />
            <button class="button is-primary espacio-izq" @click="openModal(3)">
              <i class="fa fa-info-circle"></i>
            </button>
          </div>
          <div class="col-xs-6 mr-auto mt-auto mb-auto">
            Litros de precipitación captados en la última lluvia.
            <input class="form-control" v-model="mmTXT" type="text" readonly />
          </div>
        </div>
      </div>

      <!--Lluvia-->
      <div class="cardi">
        <div class="horizontal">
          <div>
            <img src="@/components/assets/lluvia.jpg" class="search" />
            <button class="button is-primary espacio-izq" @click="openModal(4)">
              <i class="fa fa-info-circle"></i>
            </button>
          </div>
          <div class="col-xs-6 mr-auto mt-auto mb-auto">
            Estado de lluvia.
            <input class="form-control" v-model="lluvia" type="text" readonly />
          </div>
        </div>
      </div>

      <!--Ultima lectura-->
      <div class="cardi">
        <div class="horizontal">
          <div>
            <img src="@/components/assets/lluvia.jpg" class="search" />
            <button class="button is-primary espacio-izq" @click="openModal(5)">
              <i class="fa fa-info-circle"></i>
            </button>
          </div>
          <div class="col-xs-6 mr-auto mt-auto mb-auto">
            Tiempo de la última carga de información.
            <input
              class="form-control"
              v-model="ultima_fecha"
              type="text"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    altura: {
      type: Number,
      default: 0,
    },
    diametro: {
      type: Number,
      default: 0,
    },
    nivel: {
      type: Number,
      default: 0,
    },
    limpio: {
      type: Number,
      default: -1,
    },
    mm: {
      type: Number,
      default: -1,
    },
    pluviometro: {
      type: Number,
      default: 0,
    },
    ph: {
      type: Number,
      default: -1,
    },
    captar: {
      type: Number,
      default: 0,
    },
    llueve: {
      type: String,
      default: "Desconocido",
    },
    fecha: {
      type: String,
      default: "Desconocido",
    },
    modificacion: Number,
  },

  data() {
    return {
      nivelIMG: null,
      nivelTXT: null,
      limpioTXT: null,
      phTXT: null,
      mmTXT: null,
      lluvia: this.llueve,
      ultima_fecha: this.fecha,
    };
  },
  name: "Sensores",
  //Si una variable cambia, se actualiza la función
  watch: {
    modificacion() {
      this.nivelAgua();
      this.textoCalidad();
      this.textoPH();
      this.valorMM();
      this.lluvia = this.llueve;
      this.ultima_fecha = this.fecha;
    },
  },
  methods: {
    //Pide al componente padre abrir un modal
    openModal(opc) {
      this.$emit("close", opc);
    },

    //Calcula el nivel del agua del tanque
    nivelAgua() {
      const level = this.altura - this.nivel;
      const volumen = Math.ceil(
        (3.14 * (this.diametro * this.diametro) * level) / 1000
      );

      this.nivelTXT = volumen + " litros";
      if (level > (this.altura / 4) * 3) {
        this.nivelIMG = 4;
      } else if (level > this.altura / 2) {
        this.nivelIMG = 3;
      } else if (level > this.altura / 4) {
        this.nivelIMG = 2;
      } else if (level > 0) {
        this.nivelIMG = 1;
      } else if (level == 0) {
        this.nivelIMG = 0;
      } else {
        this.nivelIMG = 5;
        this.nivelTXT = "Desconocido";
      }
    },

    //Transforma el valor numerico de la calidad del agua a texto
    textoCalidad() {
      if (this.limpio > 0 && this.limpio < 200) {
        this.limpioTXT = "Limpio";
      } else if (200 <= this.limpio && this.limpio <= 300) {
        this.limpioTXT = "Algo sucio";
      } else if (this.limpio > 300) {
        this.limpioTXT = "Muy sucio";
      } else {
        this.limpioTXT = "PPM desconocido";
      }
    },

    //Tranforma el valor numerico del PH en texto
    textoPH() {
      if (this.ph > 0 && this.ph < 5) {
        this.phTXT = "Demasiada ácida";
      } else if (this.ph > 7) {
        this.phTXT = "Demasiada básica";
      } else if (this.ph == -1) {
        this.phTXT = "PH desconocido";
      } else {
        this.phTXT = "Agua base";
      }
    },

    //Obtiene el valor de los milímetros
    valorMM() {
      if (this.mm < 0) {
        this.mmTXT = "Desconocido";
      } else {
        this.mmTXT = this.mm * this.pluviometro * this.captar + " litros";
      }
    },
  },
};
</script>
