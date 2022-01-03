<template>
  <v-app>
    <!-- busca -->
    <v-card class="ma-8">
      <v-card-text>
        <v-text-field
          label="Pesquisar"
          append-icon="mdi-close"
          @keydown.enter="pesq"
          @click:append="() => (this.pesquisa_termo = '')"
          required
          v-model="pesquisa_termo"
        ></v-text-field>
        <v-progress-linear
          indeterminate
          v-show="progresso_visivel"
        ></v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-combobox
          v-model="plataforma_selecionado"
          :items="lista_plataformas"
          item-value="id"
          item-text="name"
          label="Plataforma"
          multiple
          outlined
          dense
        ></v-combobox>
        <v-spacer></v-spacer>
        <v-combobox
          v-model="genero_selecionado"
          :items="lista_generos"
          item-value="id"
          item-text="name"
          label="Genero"
          multiple
          outlined
          dense
        ></v-combobox>
        <v-spacer></v-spacer>
        <v-btn @click="pesq" class="mx-2" fab dark color="blue">
          <v-icon dark> mdi-magnify </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- resultado -->
    <v-container fluid grid-list-xl>
      <v-layout wrap class="ma-auto">
        <v-flex v-for="(res, i) in pesquisa_resultado" :key="i">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="mx-auto" width="500">
                <v-img
                  :src="res.background_image"
                  class="white--text align-end"
                  height="200px"
                >
                  <v-card-title>{{ res.name }}</v-card-title>
                </v-img>
                <v-fab-transition>
                  <v-overlay v-if="hover" absolute color="#036358">
                    <v-btn
                      @click="
                        [
                          (exibe_overlay = !overlay),
                          (jogo_selecionado = res),
                          infoJogo(res.id),
                        ]
                      "
                      >Detalhes</v-btn
                    >
                  </v-overlay>
                </v-fab-transition>
              </v-card>
            </template>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- dados do jogo -->
    <v-overlay :value="exibe_overlay" :opacity="0.5">
      <v-card class="mx-auto scroll mt-9" dark max-width="60%" scrollable>
        <v-card-title>
          <table style="width: 100%; table-layout: fixed">
            <tr>
              <td>
                <v-btn @click="exibe_overlay = false"> Fechar </v-btn>
              </td>
              <td colspan="2" style="text-align: center">
                <h1>{{ detalhes_jogo.name }}</h1>
              </td>
              <td></td>
            </tr>
          </table>
        </v-card-title>
        <v-card-text>
          <table style="width: 100%; table-layout: fixed">
            <thead>
              <tr height="25%">
                <td rowspan="2" style="width: 70%">
                  <v-carousel height="20%">
                    <v-carousel-item
                      v-for="(res, i) in jogo_selecionado.short_screenshots"
                      :key="i"
                      :src="res.image"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    ></v-carousel-item>
                  </v-carousel>
                </td>
                <td style="text-align: center">
                  <table style="width: 100%; table-layout: fixed">
                    <thead>
                      <tr>
                        <td style="text-align: right">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png"
                            width="64"
                          />
                        </td>
                        <td style="text-align: left">
                          <h3>Metacritic</h3>
                          <h4>{{ detalhes_jogo.metacritic }}</h4>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </td>
              </tr>
              <tr height="25%">
                <td style="text-align: center">
                  <h3>Data de lancamento</h3>
                  <h4>{{ detalhes_jogo.released }}</h4>
                </td>
              </tr>
            </thead>
          </table>
          <v-textarea
            style="display:inline; margin:0; !important"
            v-html="detalhes_jogo.description"
          ></v-textarea>
          ({{ detalhes_jogo.rating }})<v-rating
            :value="detalhes_jogo.rating"
            dense
            half-increments
            readonly
            size="14"
            style="display: inline"
          ></v-rating>
        </v-card-text>
      </v-card>
    </v-overlay>
  </v-app>
</template>


<script>
export default {
  name: "App",
  data: () => ({
    token: "e4b742d87eeb4ee4b6ab70951d12a6c4",
    pesquisa_termo: "",
    pesquisa_resultado: [],
    pesquisa_plataforma: [],
    pesquisa_genero: [],
    progresso_visivel: false,
    lista_generos: [],
    lista_plataformas: [],
    exibe_overlay: false,
    jogo_selecionado: {},
    detalhes_jogo: [],
    genero_selecionado: [],
    plataforma_selecionado: [],
  }),
  mounted() {
    this.plataformas();
    this.generos();
  },
  methods: {
    async pesq() {
      this.progresso_visivel = true;
      var url = `https://api.rawg.io/api/games?key=${this.token}&search=${this.pesquisa_termo}`;
      if (this.genero_selecionado.length > 0) {
        var lista = "";
        for (var i = 0; i < this.genero_selecionado.length; i++) {
          lista = lista + this.genero_selecionado[i].id + ",";
        }

        url = url + "&genres=" + lista;
      }
      if (this.plataforma_selecionado.length > 0) {
        var lista2 = "";
        for (var i2 = 0; i2 < this.plataforma_selecionado.length; i2++) {
          lista2 = lista2 + this.plataforma_selecionado[i2].id + ",";
        }
        url = url + "&platforms=" + lista2;
      }
      console.log(url);
      const responce = await fetch(url);
      const json = await responce.json();
      this.pesquisa_resultado = json.results;
      this.progresso_visivel = false;
    },
    async plataformas() {
      const responce = await fetch(
        `https://api.rawg.io/api/platforms?key=${this.token}`
      );
      const json = await responce.json();
      this.lista_plataformas = json.results;
    },
    async generos() {
      const responce = await fetch(
        `https://api.rawg.io/api/genres?key=${this.token}`
      );
      const json = await responce.json();
      this.lista_generos = json.results;
    },
    async infoJogo(id) {
      const responce = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${this.token}`
      );
      const json = await responce.json();
      this.detalhes_jogo = json;
      this.detalhes_jogo.description = this.detalhes_jogo.description.replace(
        "\n",
        ""
      );
    },
  },
};
</script>

<style scoped></style>


<!--
https://api.rawg.io/docs/#tag/games
 -->