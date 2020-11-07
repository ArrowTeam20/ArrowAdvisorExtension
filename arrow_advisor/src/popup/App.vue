<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
                :src="require('../assets/logo.jpg')"
                class="my-3"
                contain
                height="100"
        />
      </v-col>
      <v-col cols="12" style="text-align: center">
        <v-btn color="#EC407A" style="color: white" @click="adviseMe()">Advise me!!</v-btn>
      </v-col>
      <v-col cols="12" style="text-align: center">
        <v-alert type="error" color="#ff5252" v-if = "error">
          {{error}}
        </v-alert>
        <v-progress-circular
                indeterminate
                v-if="loading"
                color="#EC407A"
        ></v-progress-circular>
        <v-card
                class="mx-auto"
                outlined
                v-if="!loading"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                Results found
              </div>
              <v-list-item-title class="headline mb-1">
                {{name}}
              </v-list-item-title>
              <v-list-item-subtitle>Ingredients</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <div v-if="all">
              <v-chip
                      style="margin: 5px; color: white"
                      color="#EC407A"
                      v-for="(item, i) in ingredients"
                      :key="i"

              >
                {{item}}
              </v-chip>
            </div>
            <div v-if="!all">
              <v-chip
                      style="margin: 5px; color: white"
                      color="#EC407A"
                      v-for="(item, i) in allIngredients"
                      :key="i"

              >
                {{item}}
              </v-chip>
            </div>

            <v-btn
                    class="ma-2"
                    outlined
                    rounded
                    v-if="all"
                    @click="all = !all"
            >
              Load more
            </v-btn>
          </v-card-text>
          <v-card-subtitle>Healthy or not?</v-card-subtitle>
          <v-card-actions>
            <div style="text-align: center; align-content: center">
              <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="percentage"
                      color="#4DB6AC"
                      style="margin-left: 125%"
              >
                {{percentage}} %
              </v-progress-circular>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    all:true,

  }),
  computed:{
    percentage(){
      return this.$store.getters.value
    },
    ingredients(){

      return this.$store.getters.ingredients.slice(0,7)
    },
    allIngredients(){
      return this.$store.getters.ingredients
    },
    name(){
      return this.$store.getters.name
    },
    loading () {
      return this.$store.getters.loading
    },
    error (){
      return this.$store.getters.error
    },
  },
  methods:{
      getTabID() {
            return new Promise((resolve, reject) => {
                try {
                    chrome.tabs.query({
                        active: true,
                    }, function (tabs) {
                        resolve(tabs[0].url)
                    })
                } catch (e) {
                    reject(e)
                }
            })
      },

      async adviseMe(){
            let url = await this.getTabID()

            const payload ={
                "link" : url
            }
            this.$store.dispatch('getAdvise',payload)
        }
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
