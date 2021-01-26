import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';

import { Game, Jackpot, VUE_APP_API_GAMES_URL, VUE_APP_API_JACKPOTS_URL } from '@/lib';

@Module({
    name: 'gamesModule',
    namespaced: true,
})
export default class GamesModule extends VuexModule {
    private _games: Game[] = [];

    get games() {
        return this._games;
    }

    @Mutation
    private setGames(games: Game[]) {
        this._games = games;
    }

    @Action
    public async getGames() {
        try {
            const games: Game[] = await fetch(VUE_APP_API_GAMES_URL).then(res => res.json());
            const jackpots: Jackpot[] = await fetch(VUE_APP_API_JACKPOTS_URL).then(res => res.json());

            this.setGames(
                games.map(game => {
                    const jackpot = jackpots.find(j => j.game === game.id);

                    return {
                        ...game,
                        jackpot: jackpot?.amount
                    }
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    @Action
    public async updateJackpots() {
        const jackpots: Jackpot[] = await fetch(VUE_APP_API_JACKPOTS_URL).then(res => res.json());

        this.setGames(
            this._games.map(game => {
                const jackpot = jackpots.find(j => j.game === game.id);

                return {
                    ...game,
                    jackpot: jackpot?.amount
                }
            })
        );
    }
}