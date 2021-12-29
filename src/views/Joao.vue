<template>
  <v-app>
    <v-card
      elevation="10"
      shaped
      width="400"
      class="mx-auto mt-5"
      color="amber lighten-3"
    >
      <v-card-title
        ><h1 class="display-1">League of Legends API</h1></v-card-title
      >
      <v-card-subtitle>
        <h2>Digite seu nick</h2>
      </v-card-subtitle>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-text-field
            v-model="name"
            :counter="40"
            :rules="nameRules"
            label="Nick"
            v-on:blur="validaNome"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Pesquisar
          </v-btn>
        </v-container>
      </v-form>
    </v-card>

    <v-card class="mx-auto mt-5" elevation="5" v-show="exibir">
      <v-container>
        <v-row justify="space-around">
          <v-card width="400">
            <v-img
              height="200px"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f910d45-3c3a-44a3-ac62-03f42de5c1ec/d7ndlad-c950cfa3-9e41-4a85-ad66-18386928f178.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFmOTEwZDQ1LTNjM2EtNDRhMy1hYzYyLTAzZjQyZGU1YzFlY1wvZDduZGxhZC1jOTUwY2ZhMy05ZTQxLTRhODUtYWQ2Ni0xODM4NjkyOGYxNzguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MKnNQbj-BGsMc2h1oj0VdlotJVHash5wQpG4PLouzSo"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-spacer></v-spacer>
              </v-app-bar>

              <v-card-title class="white--text mt-8">
                <v-avatar size="56">
                  <img :src="image" />
                </v-avatar>
                <p class="ml-3">{{ summonerName }}</p>
              </v-card-title>
            </v-img>

            <v-card-text>
              <v-row>
                <v-card-text v-model="Level">Level: {{ Level }}</v-card-text>
              </v-row>
              <v-row>
                <v-card-text v-model="UltimoChampion"
                  >Ultimo Champion jogado: {{ UltimoChampion }}</v-card-text
                >
              </v-row>
              <v-row>
                <v-card-text v-model="Maestria"
                  >Maestria: {{ Maestria }}</v-card-text
                >
              </v-row>
              <v-row>
                <v-card-text v-model="UltimoJogo"
                  >Ultima Jogada: {{ UltimoJogo }}</v-card-text
                >
              </v-row>
              <v-row>
                <v-card-text v-model="Tier">Tier: {{ Tier }}</v-card-text>
              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-card>
    <v-footer padless app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Cobol API</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    Level: "",
    UltimoChampion: "",
    Tier: "",
    Maestria: "",
    image: null,
    valid: false,
    name: "",
    summonerName: "",
    UltimoJogo: "",
    exibir: false,
    nameRules: [
      (v) => !!v || "Digite seu Nick",
      (v) => (v && v.length <= 40) || "Name must be less than 40 characters",
    ],
  }),

  methods: {
    validaNome() {
      if (this.name == "") {
        this.exibir = false;
      }
    },
    async validate() {
      if (this.name != "") {
        this.exibir = true;
        //Informações do Jogador pelo Nome.
        const response = await fetch(
          "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
            this.name +
            "?api_key=RGAPI-d9ed3552-3571-4581-80e0-e7bd124443a5"
        );
        const data = await response.json();
        this.Level = data.summonerLevel;
        this.summonerName = data.name;
        //Fim

        //Requisição para pegar o id do ultimo campeão jogado.
        const responseChampion = await fetch(
          "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
            data.id +
            "?api_key=RGAPI-d9ed3552-3571-4581-80e0-e7bd124443a5"
        );
        const championData = await responseChampion.json();
        console.log(championData);
        this.Maestria = championData[0].championLevel;
        this.UltimoJogo = new Date(championData[0].lastPlayTime);
        //Fim

        //Requisição que retorna todos os campeões da ultima atualização.
        const championList = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
        );
        const listChampion = await championList.json();

        for (var key in listChampion.data) {
          if (listChampion.data[key].key == championData[0].championId) {
            this.UltimoChampion = listChampion.data[key].name;
          }
        }
        //Fim

        //Requisição para pegar o icone de invocador.
        this.image =
          "http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/" +
          data.profileIconId +
          ".png";
        //Fim

        //Requisição para pegar o Tier
        const getTier = await fetch(
          "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
            data.id +
            "?api_key=RGAPI-d9ed3552-3571-4581-80e0-e7bd124443a5"
        );
        const Tier = await getTier.json();
        if (Tier[0].tier != undefined) {
          this.Tier = Tier[0].tier + " " + Tier[0].rank;
        } else {
          this.Tier = "";
        }
        //Fim
      }
    },
  },
};
</script>
