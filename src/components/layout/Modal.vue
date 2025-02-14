<template>
  <transition name="fade">
    <div class="modal-overlay" v-if="show"></div>
  </transition>

  <transition name="fade">
    <div class="home mooodal" v-if="show">
      <header>
        <h1>{{ titles[opc] }}</h1>
      </header>
      <span>{{ descriptions[opc] }}</span>
      <form class="f">
        <button class="btn button is-primary" @click="closeModal">
          Aceptar
        </button>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    opc: Number,
  },
  data() {
    return {
      titles: [
        //Sensores
        "Nivel del tanque", //(0)
        "Calidad del agua", //(1)
        "Calidad del agua", //(2)
        "Milímetros captados", //(3)
        "Estado de la lluvia", //(4)
        "Última actualización", //(5)
        //SCALL
        "Altura del tanque", //(6)
        "Diámetro del tanque", //(7)
        "Captación", //(8)
        "Pluviómetro", //(9)
        //Error
        "Error", //(10)
        //Actualización correcta de datos
        "Carga exitosa", //(11)
        //Excedente
        "¡Importante!", //(12)
      ],
      descriptions: [
      //Sensores
      "En este apartado podrás conocer la cantidad de litros que se encuentran almacenados actualmente en tu depósito.",
      "En este apartado se muentra la calidad del agua en base a las partículas por millón disueltas en el agua. Entre más PPM haya en el depósito, menor será la calidad del agua.",
      "En este apartado se muentra la calidad del agua en base al nivel de PH. Un agua demasiada alcalina o demasiada ácida no es apta para su uso.",
      "En este apartado se muestran los milímetros reales de agua que pudiste captar en la última lluvia. Este dato se recopila directamente del pluviómetro de tu SCALL.",
      "En este apartado podrás conocer si en el domicilio donde se encuentra instalado el SCALL está lloviendo en este momento.",
      "En este apartado se indica la fecha y la hora de la última vez que el microcontrolador envió datos al servidor.",
      //SCALL
      "Ingresa en este apartado, en centímetros, la altura del depósito. Este dato servirá para obtener el volúmen correspondiente con el nivel de agua que tu depósito tiene.",
      "Ingresa en este apartado, en centímetros, el largo también conocido como el diámetro del depósito. Este dato servirá para obtener el volúmen correspondiente con el nivel de agua que tu depósito tiene.",
      "Ingresa en este apartado, en metros cuadrados, el área del techo con el que puedes captar agua. Con este dato y con los mm de precipitación estimados en el pronóstico del clima, se podrá obtener el cálculo del agua que podrás captar en la próxima lluvia, el cual, podrás visualizar en tu aplicación móvil. También con este dato y los del pluviómetro, podrás conocer cuanta agua captaste en la última lluvia.",
      "El pluviómetro es el encargado de cuantificar los milímetros de precipitación que caen en una lluvia. En este apartado debes ingresar su capacidad para poder calcular este dato, así como el de cuanta agua pudiste captar en la última lluvia.",
      //Error
      "Se produjo un error al cargar o recuperar información de la base de datos",
      //Actualización correcta de datos
      "Información actualizada con éxito!",
      //Excedente
      "No olvides cargar los datos al servidor cuando termines de organizar las tareas que puedes hacer con el agua excedente. Esto se hace con el botón que se encuentra el fondo de la página.",
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close"); // Emite el evento "close" al componente padre
    },
  },
};
</script>
