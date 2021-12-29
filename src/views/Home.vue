<template>
  <v-app id="home">
    <v-container>
      <v-card elevation="8" shaped>
        <v-card-title>Bem vindo</v-card-title>
        <v-form>
          <v-card-text
            >Olá, este é nosso projeto de Vuetify consumindo API's</v-card-text
          >
        </v-form>
      </v-card>
      <v-row justify="center" class="mx-auto mt-5">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Criadores
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5"> Time Solinftec </v-card-title>
            <v-card-text
              >Nosso grupo é composto por 5 membros:
              <ul>
                <li>João Cobo</li>
                <li>Luana Miki</li>
                <li>Lucas Rodrigo</li>
                <li>Weslley Costa</li>
                <li>Rodrigo José</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-timeline>
        <v-timeline-item v-for="n in 1" :key="n" color="red lighten-2" large>
          <template v-slot:opposite>
            <span>Inicio</span>
          </template>
          <v-card class="elevation-2" color="red lighten-4">
            <v-card-title class="text-h5"> O Inicio </v-card-title>
            <v-card-text>
              Foi criado um repositório no Github para os membros da equipe
              efetuarem o Fork.
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-for="n in 1" :key="n" color="red lighten-2" large>
          <template v-slot:opposite>
            <span>Criação</span>
          </template>
          <v-card class="elevation-2" color="deep-purple lighten-4">
            <v-card-title class="text-h5"> A Criação </v-card-title>
            <v-card-text>
              O projeto base desenvolvido, é um menu onde contem os nomes dos
              integrantes do projeto.
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-for="n in 1" :key="n" color="red lighten-2" large>
          <template v-slot:opposite>
            <span>Objetivo</span>
          </template>
          <v-card class="elevation-2" color="green lighten-3">
            <v-card-title class="text-h5"> O Objetivo </v-card-title>
            <v-card-text>
              O projeto tem como objetivo desenvolver o espirito criativo de
              cada membro da equipe, cada um terá que desenvolver uma tela com o
              consumo de uma API.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style>
#home {
  background-color: powderblue;
}
</style>
