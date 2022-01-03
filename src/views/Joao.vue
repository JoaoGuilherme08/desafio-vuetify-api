<template>
  <v-app id="joao">
    <div>
      <v-card
        elevation="10"
        shaped
        width="400"
        class="mx-auto mt-5"
        color="blue lighten-2"
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
            <v-progress-linear
              indeterminate
              color="indigo darken-4"
              v-show="carregando"
            ></v-progress-linear>
          </v-container>
        </v-form>
      </v-card>

      <v-card color="white!important" style="opacity: 0" height="30"></v-card>

      <v-alert
        dense
        type="warning"
        v-show="msgShow"
        v-model="msgAlert"
        width="500"
        class="mx-auto mt-5"
        transition="slide-x-reverse-transition"
        >{{ msgAlert }}</v-alert
      >

      <v-card
        class="mx-auto mt-5"
        elevation="10"
        v-show="exibir"
        id="teste"
        width="1000"
        shaped
      >
        <v-container>
          <v-row justify="space-around">
            <v-card width="600">
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
                  <v-col cols="7">
                    <p class="ml-3" style="padding-top: 20px">
                      {{ summonerName }}
                    </p>
                  </v-col>
                  <v-col cols="2">
                    <v-btn v-on:click="validaPartida">PARTIDA AO VIVO</v-btn>
                    <v-progress-linear
                      indeterminate
                      color="green"
                      v-show="carregandoPartida"
                    ></v-progress-linear>
                  </v-col>
                </v-card-title>
              </v-img>

              <v-card-text>
                <v-row>
                  <v-card-text v-model="Level">Level: {{ Level }}</v-card-text>
                </v-row>
                <v-row>
                  <v-card-text v-model="UltimoChampion"
                    >Melhor champion: {{ UltimoChampion }}</v-card-text
                  >
                </v-row>
                <v-row>
                  <v-card-text v-model="Maestria"
                    >Maestria: {{ Maestria }}</v-card-text
                  >
                </v-row>
                <v-row>
                  <v-card-text v-model="UltimoJogo"
                    >Ultima Jogada com o champion: {{ UltimoJogo }}</v-card-text
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

      <v-container>
        <v-card
          width="700"
          height="300"
          class="mx-auto mt-03"
          style="top: 50px"
          v-show="PlayersPartida"
        >
          <v-card-title v-model="modoJogo">{{ modoJogo }}</v-card-title>
          <v-card-text id="TimeAzul">Time Azul</v-card-text>

          <v-list>
            <v-list-item v-for="(players, i) in team1" :key="i">
              <img :src="players.img" width="30" style="margin-right: 10px" />
              {{ players.nome }}
              <div style="padding-right: 20px"></div>
              {{ players.rank }}
              <div style="padding-right: 40px"></div>
              Champion:
              {{ players.nomechampion }}</v-list-item
            >
          </v-list>
        </v-card>
        <v-card
          color="white!important"
          style="opacity: 0"
          height="57"
          v-show="PlayersPartida"
        ></v-card>
        <v-card
          width="700"
          height="300"
          class="mx-auto"
          style="top: 50px"
          v-show="PlayersPartida"
        >
          <v-card-text id="TimeVermelho">Time Vermelho</v-card-text>
          <v-list>
            <v-list-item v-for="(players, i) in team2" :key="i">
              <img :src="players.img" width="30" style="margin-right: 10px" />
              {{ players.nome }}
              <div style="padding-right: 20px"></div>
              {{ players.rank }}
              <div style="padding-right: 40px"></div>
              Champion:
              {{ players.nomechampion }}
            </v-list-item>
          </v-list>
        </v-card>
        <v-card
          color="white!important"
          style="opacity: 0"
          height="500"
          v-show="PlayersPartida"
        ></v-card>
      </v-container>
    </div>

    <v-footer padless app id="footerJoao">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong style="padding-right: 15px">Cobol API</strong>
        <a href="https://developer.riotgames.com/apis">Api's Usadas</a>
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
    carregando: false,
    PlayersPartida: false,
    team1: [],
    team2: [],
    msgAlert: "",
    modoJogo: "",
    msgShow: false,
    carregandoPartida: false,
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
        this.carregando = true;
        this.exibir = true;

        //Informações do Jogador pelo Nome.
        const response = await fetch(
          "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
            this.name +
            "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
        );
        const data = await response.json();
        this.Level = data.summonerLevel;
        this.summonerName = data.name;
        //Fim

        //Requisição para pegar o id do ultimo campeão jogado.
        const responseChampion = await fetch(
          "https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
            data.id +
            "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
        );
        const championData = await responseChampion.json();
        this.Maestria = championData[0].championLevel;
        this.UltimoJogo =
          ("0" + new Date(championData[0].lastPlayTime).getDate()).slice(-2) +
          "/" +
          new Date(championData[0].lastPlayTime).getMonth() +
          "/" +
          new Date(championData[0].lastPlayTime).getFullYear();
        //Fim

        //Requisição que retorna todos os campeões da ultima atualização.
        this.UltimoChampion = await this.BuscaNomeChampion(
          championData[0].championId
        );
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
            "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
        );
        const Tier = await getTier.json();

        this.carregando = false;
        if (Tier[0] != undefined && Tier[0].rank != undefined) {
          this.Tier = Tier[0].tier + " " + Tier[0].rank;
        } else {
          this.Tier = "";
        }
        //Fim
      }
    },

    async BuscaRankPorNome(NomeJogador) {
      const response = await fetch(
        "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
          NomeJogador +
          "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
      );
      const data = await response.json();

      const getTier = await fetch(
        "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
          data.id +
          "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
      );
      const Tier = await getTier.json();

      if (Tier[0] != undefined && Tier[0].rank != undefined) {
        return "Rank: " + Tier[0].tier + " " + Tier[0].rank;
      } else {
        return "";
      }
    },

    async BuscaNomeChampion(idChampion) {
      const championList = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
      );
      const listChampion = await championList.json();

      for (var i in listChampion.data) {
        if (listChampion.data[i].key == idChampion) {
          return listChampion.data[i].name;
        }
      }
    },

    async validaPartida() {
      try {
        this.carregandoPartida = true;

        const responses = await fetch(
          "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
            this.name +
            "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
        );

        const data = await responses.json();

        const getFeaturedGames = await fetch(
          "https://br1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" +
            data.id +
            "?api_key=RGAPI-94cee732-c4c3-4d33-abab-e56614199541"
        );

        const FeaturedGame = await getFeaturedGames.json();

        this.modoJogo = FeaturedGame.gameMode;
        for (var key in FeaturedGame.participants) {
          if (FeaturedGame.participants[key].teamId == "100") {
            this.team1.push({
              img:
                "http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/" +
                FeaturedGame.participants[key].profileIconId +
                ".png",
              nome: FeaturedGame.participants[key].summonerName,
              rank: await this.BuscaRankPorNome(
                FeaturedGame.participants[key].summonerName
              ),
              team: FeaturedGame.participants[key].teamId,
              nomechampion: await this.BuscaNomeChampion(
                FeaturedGame.participants[key].championId
              ),
            });
          } else {
            this.team2.push({
              img:
                "http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/" +
                FeaturedGame.participants[key].profileIconId +
                ".png",
              nome: FeaturedGame.participants[key].summonerName,
              rank: await this.BuscaRankPorNome(
                FeaturedGame.participants[key].summonerName
              ),
              team: FeaturedGame.participants[key].teamId,
              nomechampion: await this.BuscaNomeChampion(
                FeaturedGame.participants[key].championId
              ),
            });
          }
        }
        this.PlayersPartida = true;
        this.carregandoPartida = false;
      } catch (error) {
        console.log(error);
        this.carregandoPartida = false;
        this.PlayersPartida = false;
        this.msgShow = true;
        this.msgAlert = "O jogador não está em partida no momento.";
        setTimeout(() => {
          this.msgShow = false;
        }, 3000);
      }
    },
  },
};
</script>

<style>
#joao {
  background-image: url("https://images6.alphacoders.com/651/651136.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

#teste {
  background-image: url("https://i.pinimg.com/originals/be/00/69/be006924ee1c307ec8836edc809efe77.png");
  background-size: cover;
  background-position: left;
}

#TimeAzul {
  color: blue;
}
#TimeVermelho {
  color: red;
}

.ml-3 {
  text-shadow: #333;
}

#footerJoao {
  width: 100%;
  bottom: 0;
  position: fixed;
}

.v-alert {
  position: fixed;
  left: 30%;
  bottom: -34px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
