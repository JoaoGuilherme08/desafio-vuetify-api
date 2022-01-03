<template>
  <v-app id="weslley">
    <div id="vue-app">
      <!-- Dolar hoje -->
      <v-card
        class="mx-auto my-auto"
        max-width="400"
        elevation="16"
        align="center"
        width="500px"
        style="width: 80em; top: 200px; opacity: 0.9"
      >
        <h1 text-align="center">Dolar Hoje</h1>

        <v-card-text>
          <h2>{{ moedaA }} Para {{ moedaB }}</h2>
          <v-text-field v-model="moedaA_value"></v-text-field>
          <h2 style="padding-top: 10px">{{ moedaB_value }}</h2>
        </v-card-text>
        <v-btn
          color="yellow lighten-3"
          v-on:click="converter"
          style="
            border-bottom-style: solid;
            border-bottom-width: 0px;
            bottom: 15px;
            margin-top: 15px;
          "
          >Converter</v-btn
        >
      </v-card>
      <!-- Cotação hoje -->
      <v-card
        class="mx-auto my-12"
        max-width="400"
        elevation="16"
        align="center"
        width="500"
        style="width: 80em; top: 200px; opacity: 0.9"
      >
        <h1 align="center">Cotações hoje</h1>

        <v-card-text>
          <div style="display: flex">
            <v-select
              v-model="moedasA"
              item-text="moeda"
              :items="items"
              label="Selecione a moeda"
              required
              style="padding-right: 25px"
              cols="6"
            >
            </v-select>
            <v-select
              v-model="moedasB"
              :item-text="'moeda'"
              :items="items"
              label="Selecione a moeda"
              required
              style="padding-left: 25px"
              cols="6"
            ></v-select>
          </div>

          <h2>{{ moedasA }} Para {{ moedasB }}</h2>
          <v-text-field v-model="moedasA_value"></v-text-field>

          <h2 style="padding-top: 10px">{{ moedasB_value }}</h2>
        </v-card-text>
        <v-btn
          @click="converter2"
          color="yellow lighten-3"
          style="
            border-bottom-style: solid;
            border-bottom-width: 0px;
            bottom: 15px;
            margin-top: 15px;
          "
          >Converter</v-btn
        >

      </v-card>
    </div>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      /* dolar hoje */
      moedaA: "USD",
      moedaB: "BRL",
      moedaA_value: "1",
      moedaB_value: 0,
      /* cotação hoje */
      moedasA_value: "1",
      moedasB_value: 0,
      moedasA: "",
      moedasB: "",
      key: "af285a9098c9614181bd",
      items: [],
    };
  },
  methods: {
    /* Dolar Hoje */

    getUrl(moedas) {
      return [
        "http://free.currencyconverterapi.com/api/v5/convert?q=",
        moedas,
        "&compact=ultra&apiKey=",
        this.key,
      ].join("");
    },

    converter() {
      const de_para = this.moedaA + "_" + this.moedaB;
      const url = this.getUrl(de_para);

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const cotacao = json[de_para];
          const valor = (cotacao * parseFloat(this.moedaA_value)).toFixed(2);
          this.moedaB_value = `${valor} ${this.moedaB}`;
        });
    },

    /* Cotação hoje  */

    async getPaises() {
      const response = await fetch(
        "http://free.currencyconverterapi.com/api/v5/currencies?apiKey=" +
          this.key
      );
      const json = await response.json();
      for (var key in json.results) {
        this.items.push({
          moeda: key,
        });
      }
    },

    converter2() {
      const de_para = this.moedasA + "_" + this.moedasB;
      const url = this.getUrl(de_para);
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const cotacao = json[de_para];
          const valor = (cotacao * parseFloat(this.moedasA_value)).toFixed(2);
          this.moedasB_value = `${valor} ${this.moedasB}`;
        });
    },
  },
  created: function () {
    this.getPaises();
  },
  /*  watch:{
      moedasA: function(){
          console.log("watch " , this.moedasA)
          this.converter2();
          
      },
      moedasB: function(){
          
          console.log("watch " , this.moedasB)
          this.converter2();
      },

      moedas_value: function (){
        console.log("moedas value ", this.moedas_value)
        this.converter2();
      },
      
    } */
};
</script>
<style scoped>
#weslley {
  background-image: url("https://images3.alphacoders.com/243/thumb-1920-24307.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>