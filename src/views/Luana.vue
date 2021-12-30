<template>
  <v-app>
    <v-card style="width: 500px;padding-bottom: -;margin-bottom: 20px;" class="mx-auto mt-5" color="pink lighten-4">
      <v-card-title>Informe a cidade</v-card-title>
    <v-text-field v-on:blur="validaCidade" required v-model="cidade" @keydown.enter="pesquisa">

    </v-text-field>
    </v-card>
<v-card 
    id="card-tempo"
    v-show="cardTempo"
    class="mx-auto"
    max-width="400"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{cidade}}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-h2"
          cols="6"
        >
          {{resultado.temperature}}&deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            :src="icone"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        {{resultado.wind_speed}}km/h
         </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        {{resultado.humidity}}%
        </v-list-item-subtitle>
    </v-list-item>
  </v-card>  
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: ()=>({
      cidade: "",
      resultado:[],
      icone:"",
      cardTempo: false,
    }),
  methods:{
    validaCidade(){
      if(this.cidade == ""){
        this.cardTempo = false;
      }
    },
    async pesquisa() {
      const response=await fetch(`http://api.weatherstack.com/forecast?access_key=fbced4667508feea2e1d32a047267824&query=${this.cidade}&langauge=pt`);
      const json=await response.json();
      this.resultado=json.current;
      this.icone=json.current.weather_icons[0];
      this.cardTempo=true;
    }
  }
  };
</script>