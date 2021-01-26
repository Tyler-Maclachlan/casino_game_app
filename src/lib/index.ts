export const VUE_APP_API_GAMES_URL = process.env.VUE_APP_API_GAMES_URL;
export const VUE_APP_API_JACKPOTS_URL = process.env.VUE_APP_API_JACKPOTS_URL;

export interface Game {
    id: string;
    name: string;
    image: string;
    categories: string[];
    jackpot?: number;
}

export interface Jackpot {
    game: string;
    amount: number;
}

export type Category =
    | "top"
    | "new"
    | "slots"
    | "jackpots"
    | "live"
    | "blackjack"
    | "roulette"
    | "table"
    | "poker"
    | "other";

export interface MenuItem {
    text: string;
    category: Category;
}

export const formatNumberAsCurrency = (amount: number) => {
    const formatter = Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    return formatter.format(amount)
}