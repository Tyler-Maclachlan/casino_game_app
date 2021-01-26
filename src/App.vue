<template>
  <v-app>
    <v-app-bar app color="#373737" dark dense class="justify-space-between">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" />
      <v-list-item-group
        v-model="currentMenuItem"
        class="d-md-flex hidden-sm-and-down"
        mandatory
        style="width: 100%"
      >
        <v-list-item
          v-for="item in menuItems"
          :key="item.category"
          color="#8dc63f"
        >
          <v-list-item-content style="z-index: 20">
            <v-list-item-title class="text-center">
              <span style="color: #fcfcfc" v-text="item.text" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
      color="#373737"
    >
      <v-list nav dense>
        <v-list-item-group v-model="currentMenuItem">
          <v-list-item
            v-for="item in menuItems"
            :key="item.category"
            color="#8dc63f"
          >
            <v-list-item-content style="z-index: 20">
              <v-list-item-title class="text-center">
                <span style="color: #fcfcfc" v-text="item.text" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="pt-8 px-12">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            v-for="game in games"
            :key="game.id"
          >
            <GameCard
              :key="`card-${game.id}`"
              :game="game"
              :category="currentCategory"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { GamesModule } from "@/store";
import { MenuItem } from "@/lib";

import GameCard from "@/components/GameCard.vue";

@Component({
  components: {
    GameCard,
  },
})
export default class App extends Vue {
  private menuItems: MenuItem[] = [
    {
      text: "Top Games",
      category: "top",
    },
    {
      text: "New Games",
      category: "new",
    },
    {
      text: "Slots",
      category: "slots",
    },
    {
      text: "Jackpots",
      category: "jackpots",
    },
    {
      text: "Live",
      category: "live",
    },
    {
      text: "Blackjack",
      category: "blackjack",
    },
    {
      text: "Roulette",
      category: "roulette",
    },
    {
      text: "Table",
      category: "table",
    },
    {
      text: "Poker",
      category: "poker",
    },
    {
      text: "Other",
      category: "other",
    },
  ];
  private currentMenuItem = 0;
  private drawer = false;
  private updateInterval: number | undefined = undefined;

  private get currentCategory() {
    return this.menuItems[this.currentMenuItem].category;
  }

  private get games() {
    switch (this.currentCategory) {
      case "jackpots":
        return GamesModule.games.filter((game) => !!game.jackpot);
      case "other":
        return GamesModule.games.filter(
          (game) =>
            game.categories.includes("ball") ||
            game.categories.includes("virtual") ||
            game.categories.includes("fun")
        );
      default:
        return GamesModule.games.filter((game) =>
          game.categories.includes(this.currentCategory)
        );
    }
  }

  private mounted() {
    GamesModule.getGames();

    this.updateInterval = setInterval(() => {
      GamesModule.updateJackpots();
    }, 5000);
  }

  private beforeDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
</script>

<style>
.theme--dark.v-list-item--active:before {
  opacity: 1 !important;
}

.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover {
  color: #8dc63f !important;
}
</style>
