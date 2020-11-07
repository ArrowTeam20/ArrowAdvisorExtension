<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img
                        :src="require('../assets/logo.svg')"
                        class="my-3"
                        contain
                        height="100"
                />
            </v-col>
            <v-col cols="12" style="text-align: center">
                <v-btn color="#EC407A" style="color: white" @click="addviseMe()">Advise me!!</v-btn>
            </v-col>
            <v-col cols="12" style="text-align: center">
                <v-card
                        class="mx-auto"
                        outlined
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
                        <v-chip
                                style="margin: 5px; color: white"
                                color="#EC407A"
                                v-for="(item, i) in ingredients"
                                :key="i"
                        >
                            {{item}}
                        </v-chip>
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
        name: 'HelloWorld',

        data: () => ({

        }),
        created(){
            const payload ={
                "link": "https://www.amazon.fr/Neutrogena-Vclear-Nettoyant-Exfoliant-Pamplemousse/dp/B0719FR9XV/ref=sr_1_5?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=Masque+Peeling+Glycolique+-+Caudalie&s=be"
            }
            this.$store.dispatch('getAdvise',payload)
        },
        computed:{
            percentage(){
                return 70
            },
            ingredients(){
                return [
                    'water','aqua','bio','ethanol'
                ]
            },
            name(){
                return "Product name"
            }
        },
    }
</script>
