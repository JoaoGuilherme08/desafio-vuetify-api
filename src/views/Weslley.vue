<template>
  <v-app id="weslley">
    <div id="vue-app">
      <v-card
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
            v-on:blur="validaMoeda"
          ></v-text-field>
          <v-btn value="Converter" color:sucess v-on:click="converter"
            >Converter</v-btn
          >
          <h2 style="padding-top: 10px">{{ moedaB_value }}</h2>
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto my-12"
        max-width="374"
        elevation="16"
        align="center"
        width="50em"
        color="sucess"
        style="width: 80em; top: 200px; opacity: 0.9"
      >
        <v-card-title class="mx-auto">Cotações hoje</v-card-title>

        <v-card-text>
          <v-select
          
          v-model="moedasA"
           item-text="moeda"
            :items="items"
    
            label="Selecione a moeda"
            required
            style="padding-right: 200px;"
          >
         
          </v-select>
          <h2>Para</h2>
          <v-select
         
            v-model="moedasB"
            :item-text="'moeda'"
            :items="items"
            label="Selecione a moeda"
            required
            style="padding-right: 200px;"
          ></v-select>
          <v-text-field
            v-model="moedasA_value"
          ></v-text-field>
          
          <h2 style="padding-top: 10px">{{ moedasB_value }}</h2>
        </v-card-text>
        <v-btn @click="converter2">Converter</v-btn>
      </v-card>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "Conversor",
  props: {
    moedaA: {
      default: "USD",
    },
    moedaB: {
      default: "BRL",
    },
    moedaAA: {
      default: "",
    },
    moedaBB: {
      default: "",
    },
  },

  data() {
    return {
      moedaA_value: "",
      moedaB_value: 0,
      moedasA_value: "",
      moedasB_value: 0,
      moedasA: "",
      moedasB: "",
      key: "af285a9098c9614181bd",
      listaId: "",
      items: [],
    };
  },
  methods: {
    validaMoeda(){
      if(this.moedaB == "" || this.moedaB == String){
        window.alert("Digite um número")
      }
    },


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
        "http://free.currencyconverterapi.com/api/v5/currencies?apiKey="+
        this.key
      );
      const json = await response.json();
      for(var key in json.results) {
          this.items.push({
          moeda: key,
          
        })
      }
      this.listaId = json.results;
      this.moedaAA = this.listaId;
      this.moedaBB = this.listaId;
    },

    converter2() {
      const de_para = this.moedasA + "_" + this.moedasB;
      const url = this.getUrl(de_para);
      console.log(url)
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const cotacao = json[de_para];
          const valor = (cotacao * parseFloat(this.moedasA_value)).toFixed(2);
          this.moedasB_value = `${valor} ${this.moedasB}`;
          console.log(cotacao)
          console.log(valor)
          console.log(this.moedasA_value)
        });
    }

   
  },
   created: function(){
      console.log("passei aqui");
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
  margin: o auto;
}
</style>