<template>
  <v-app id="weslley">
    <div id="vue-app">
      <v-main>
        <v-container>
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
            elevation="16"
            align="center"
            width="50em"
            color="sucess"
            style="width: 80em; top: 200px; opacity: 0.9"
          >
            <h1 text-align="center">Dolar Hoje</h1>

            <v-card-text>
              <h2>{{ moedaA }} Para {{ moedaB }}</h2>
              <v-text-field
                v-model="moedaA_value"
                v-bind:placeholder="moedaA"
              ></v-text-field>
              <v-btn value="Converter" color:sucess v-on:click="converter"
                >Converter</v-btn
              >
              <h2 style="padding-top: 10px">{{ moedaB_value }}</h2>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>
<script>
export default {
  el: "#vue-app",
  name: "Conversor",
  props: {
    moedaA: {
      default: "USD",
    },
    moedaB: {
      default: "BRL",
    },
  },

  data() {
    return {
      moedaA_value: "",
      moedaB_value: 0,
    };
  },
  methods: {
    getUrl(moedas) {
      return [
        "http://free.currencyconverterapi.com/api/v5/convert?q=",
        moedas,
        "&compact=ultra&apiKey=af285a9098c9614181bd",
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
      this.moedaB_value = "";
    },
  },
};
</script>
<style scoped>
#weslley {
  background-image: url("https://images3.alphacoders.com/243/thumb-1920-24307.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: o auto;
}
</style>