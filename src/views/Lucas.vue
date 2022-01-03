<template>
  <div class="header">
    <div class="user">
      <div class="inicio">
        <h1>
          Digite o usuário do GitHub
          <img
            class="gitImage"
            src="https://pngimg.com/uploads/github/github_PNG58.png"
            alt=""
          />
        </h1>
      </div>
      <v-form class="conteudo" @submit.prevent="">
        <v-row cols="col-6 align-content-start">
          <v-col class="col-6 col-row-6 align-content-start" cols="">
            <v-text-field
              class="input"
              ref="groupId"
              color="black"
              v-model="name"
              :name="name"
              :counter="30"
              :rules="nameRules"
              label="Usuário GitHub"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn id="button" class="mr-4 col-2" @click="get_id()"> Enviar </v-btn>
        <div class="image">
          <img
            :src="user.avatar_url"
            disable:height="400px"
            width="400px"
            style="border-radius: 300px"
          />
        </div>
        <div class="infoGit">
          <div class="name">
            <p v-if="user.name">{{ "Nome: " + user.name }}</p>
            <p v-else></p>
          </div>
          <div class="public_repos">
            <p v-if="user.public_repos">
              {{ "Repositórios Públicos: " + user.public_repos }}
            </p>
            <p v-else></p>
          </div>
          <div class="public_gists">
            <p v-if="user.public_gists">
              {{ "Repositórios Gist: " + user.public_gists }}
            </p>
            <p v-else></p>
          </div>
          <div class="followers">
            <p v-if="user.followers">{{ "Seguidores: " + user.followers }}</p>
            <p v-else></p>
          </div>
          <div class="following">
            <p v-if="user.following">{{ "Seguindo: " + user.following }}</p>
            <p v-else></p>
          </div>
        </div>
        <a
          v-if="href"
          id="hrefGit"
          class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default"
          color="error"
          :href="href"
        >
          Clique aqui para acessar o perfil no GitHub</a
        >
      </v-form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "User",
  name: "href",
  data() {
    return {
      user: {},
      //imagem: {backgroundImage: "url(https://sempreupdate.com.br/wp-content/webp-express/webp-images/uploads/2021/05/GitHub-headpic.jpg.webp)"},
    };
  },
  created() {
    this.getUser();
    const field = document.querySelector("input[name=name]").value;
    console.log(field);
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    get_id() {
      const field = document.getElementById("input-34").value;
      const href = "https://github.com/" + field;
      const url = "https://api.github.com/users/" + field;
      axios
        .get(url)
        .then((res) => {
          this.user = res.data;
          this.href = href;

          var recive = 1;
        })

        .catch((error) => {
          console.log(error);
          alert("Usuário: " + field + " não encontrado!");
          var recive = 0;
        });

      //alert(field);
      this.id = this.$refs.groupId.value;
      console.log(this.id);
      //alert("lucas");
    },
  },
};
</script>
<style>
.user {
  background-color: darkslategray;
  height: auto;
  width: auto;
}
.inicio {
  text-align: center;
  margin-bottom: 30px;
}
#imagem {
  height: 1000px;
}
.gitImage {
  margin-bottom: -10px;
  width: 50px;
}
.image {
  max-width: 200px;
  max-height: 150px;
  width: auto;
  height: auto;
  margin: 30px;
}
.infoGit {
  margin-top: -180px;
}
.name {
  font-family: monospace;
  color: #56cde8;
  font-size: 30px;
  width: 70%;
  display: flex;
  margin-left: 499px;
}
.public_repos {
  font-family: monospace;
  color: darkcyan;
  font-size: 30px;
  width: 70%;
  display: flex;
  margin-left: 499px;
}
.public_gists {
  font-family: monospace;
  color: darkcyan;
  font-size: 30px;
  width: 70%;
  display: flex;
  margin-left: 499px;
}
.followers {
  font-family: monospace;
  color: darkcyan;
  font-size: 30px;
  width: 50%;
  display: flex;
  margin-left: 499px;
}
.following {
  font-family: monospace;
  color: darkcyan;
  font-size: 30px;
  width: 50%;
  display: flex;
  margin-left: 499px;
}
.conteudo {
  background-color: #010409;
  width: 100%;
  height: 800px;
  position: relative;
}

.input {
  padding: 20px;
  text-align: center;
  color: white;
  background-color: darkslategrey;
  border-radius: 5px;
}
#button {
  background-color: #0d1117;
  color: #53a5f7;
  border: white;
  margin-top: 20px;
  margin-left: 600px;
}

#hrefGit {
  margin-top: 55px;
  margin-left: 500px;
  background-color: #0d1117;
  color: #53a5f7;
}

.col-6 {
  margin: 0 auto;
}
</style>
