<template>
  <v-app>
    <!-- busca -->
    <v-card  class="ma-8">
      <v-card-text>
        <v-text-field label="Pesquisar" append-icon="mdi-close" @click:append="() => (this.pesquisa = '')" required v-model="pesquisa" ></v-text-field>
        <v-progress-linear indeterminate v-show="progresso"></v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-combobox v-model="pla_pesq" :items="items" item-text="name" label="Plataforma" multiple outlined dense ></v-combobox>
        <v-spacer></v-spacer>
        <v-btn @click="pesq" class="mx-2" fab dark color="blue">
          <v-icon dark> mdi-magnify </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>


    <!-- resultado -->
    <v-container fluid grid-list-xl>
      <v-layout wrap class="ma-auto">
        <v-flex v-for="(res, i) in resultado" :key="i">
           <v-hover>
             <template v-slot:default="{ hover }">
               <v-card class="mx-auto"  width="500">
                <v-img :src="res.background_image" class="white--text align-end" height="200px" >
                  <v-card-title>{{res.name}}</v-card-title>
                </v-img>
                <v-fab-transition>
                  <v-overlay v-if="hover" absolute color="#036358">
                    <v-btn @click="[overlay = !overlay,detalha = res, infoJogo(res.id)]" >Detalhes</v-btn>
                  </v-overlay>
                </v-fab-transition>
            </v-card>
             </template>
           </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- dados do jogo -->
    <v-overlay color="red" :opacity="1" :value="overlay"  >
      <v-card  color="blue" class="mx-auto">  
        <v-btn color="orange lighten-2"  @click="overlay = false"  > Hide Overlay  </v-btn>
      </v-card>
    </v-overlay>
  </v-app>
</template>



























<script>
export default {
  name: 'App',
  data: () => ({
    pesquisa:"",
    token:"e4b742d87eeb4ee4b6ab70951d12a6c4",
    resultado:[],
    progresso: false,
    items: [],
    pla_pesq: [],
    overlay: false,
    detalha:{},
    jogo:[],

    
  }),
  mounted(){
    this.plataformas();
  },
  methods:{
    async pesq(){
      this.progresso = true;
      const responce = await fetch(`https://api.rawg.io/api/games?key=${this.token}&search=${this.pesquisa}`);
      const json = await responce.json();
      this.resultado = json.results;
      this.progresso = false;
    },
    async plataformas(){
      const responce = await fetch(`https://api.rawg.io/api/platforms?key=${this.token}`);
      const json = await responce.json();
      this.items = json.results;
    },
    async infoJogo(id){
      const responce = await fetch(`https://api.rawg.io/api/games/${id}?key=${this.token}`);
      const json = await responce.json();
      this.jogo = json;
    }
  },
};
</script>

<style scoped></style>


<!--
https://api.rawg.io/docs/#tag/games
 -->