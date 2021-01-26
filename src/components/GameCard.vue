<template>
  <v-card flat elevation="0" color="#373737" class="game-card">
    <v-img :src="game.image" cover height="150">
      <div class="d-flex flex-column fill-height">
        <div v-if="jackpot" class="detail-display mb-auto">
          <span class="white--text">{{ formatNumberAsCurrency(jackpot) }}</span>
        </div>
        <div class="play-icon-container mx-auto">
          <v-icon class="play-icon" color="#FCFCFC" size="65">mdi-play</v-icon>
        </div>
        <div class="detail-display game-name-display mt-auto">
          <span class="white--text">{{ game.name }}</span>
        </div>
      </div>
    </v-img>

    <v-img
      class="ribbon"
      v-if="showRibbon && isNew"
      src="/new-ribbon.png"
      width="100"
    />
    <v-img
      class="ribbon"
      v-else-if="showRibbon && isTop"
      src="/top-ribbon.png"
      width="100"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Game, Category, formatNumberAsCurrency } from "@/lib";

@Component
export default class GameCard extends Vue {
  @Prop() private game!: Game;
  @Prop() private category!: Category;

  private isHovered = false;
  private formatNumberAsCurrency = formatNumberAsCurrency;

  private get showRibbon() {
    return this.category !== "new" && this.category !== "top";
  }

  private get isNew() {
    return this.game.categories.includes("new");
  }

  private get isTop() {
    return this.game.categories.includes("top");
  }

  private get jackpot() {
    return this.game.jackpot;
  }
}
</script>

<style>
.game-card {
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

body {
  background: #fcfcfc;
}

.ribbon {
  position: absolute !important;
  top: -4px;
  right: -4px;
}

.detail-display {
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 4px;
}

.game-name-display {
  opacity: 0;
  transition: all 0.6s;
}

.play-icon-container {
  opacity: 0;
  transition: all 0.6s;
  border-radius: 50%;
  border: 3px solid #fcfcfc;
  background: rgba(142, 198, 63, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.game-card:hover .game-name-display,
.game-card:hover .play-icon-container {
  opacity: 1;
}
</style>