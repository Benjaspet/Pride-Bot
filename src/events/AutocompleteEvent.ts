import {IEvent} from "../structs/IEvent";
import {ApplicationCommandOptionChoice, Client, ClientEvents, Interaction} from "discord.js";
import axios from "axios";

export default class AutocompleteEvent implements IEvent {

    public name: keyof ClientEvents;
    public once: boolean;
    public client: Client;

    constructor(client: Client, name: keyof ClientEvents, once: boolean) {
        this.client = client;
        this.once = once;
        this.name = name;
    }

    public async execute(interaction: Interaction) {
        if (!interaction.isAutocomplete()) return;
        const focusedValue = interaction.options.getFocused() as string;
        switch (interaction.commandName) {
            case "pride":
            case "flag":
                const terms = [
                    "Abrosexual", "Agender", "Aromantic", "Alloromantic", "AroAce", "Asexual", "Bigender", "Biromantic",
                    "Bisexual", "Demiboy", "Demigirl", "Demiromantic", "Demisexual", "Gay", "Genderfluid", "Genderflux",
                    "Genderqueer", "Intersex", "Lesbian", "Lesbiromantic", "Monoromantic", "Nonbinary", "Omniromantic",
                    "Omnisexual", "Panromantic", "Pansexual", "Polyamorous", "Polyromantic", "Polysexual", "Pride",
                    "Questioning", "Sapphic", "Transgender", "TwoSpirit", "Xenogender"
                ];

                const filtered = terms.filter(term => term.toLowerCase().includes(focusedValue)).slice(0, 20);
                return await interaction.respond(filtered.map(term => ({name: term, value: term.toLowerCase()})));
            case "orientation":
                let queried: ApplicationCommandOptionChoice[] = [];
                let similar;
                if (interaction.options.getString("type") === "sexual") {
                    await axios.get(`https://app.ponjo.club/v1/pride/orientations?type=sexual&q=${focusedValue}`)
                        .then(async response => {
                            similar = response.data.data;
                            similar.forEach(element => {
                               queried.push({name: element.name, value: element.name.toLowerCase()});
                            });
                        });
                    return await interaction.respond(queried);
                } else {
                    await axios.get(`https://app.ponjo.club/v1/pride/orientations?type=romantic&q=${focusedValue}`)
                        .then(async response => {
                            similar = response.data.data;
                            similar.forEach(element => {
                                queried.push({name: element.name, value: element.name.toLowerCase()});
                            });
                        });
                    return await interaction.respond(queried);
                }
        }
    }
}