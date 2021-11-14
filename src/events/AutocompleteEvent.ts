import {IEvent} from "../structs/IEvent";
import {Client, ClientEvents, Interaction} from "discord.js";

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
        switch (interaction.commandName) {
            case "pride":
            case "flag":
                const terms = [
                    "Abrosexual", "Agender", "Aromantic", "Asexual", "Bigender", "Bisexual", "Demiboy", "Demigirl",
                    "Gay", "Genderfluid", "Genderflux", "Genderqueer", "Intersex", "Lesbian", "Nonbinary", "Omnisexual",
                    "Pansexual", "Polyamorous", "Polysexual", "Pride", "Sapphic", "Transgender", "Xenogender"
                ];
                const focusedValue = interaction.options.getFocused() as string;
                const filtered = terms.filter(term => term.toLowerCase().includes(focusedValue));
                return await interaction.respond(filtered.map(term => ({name: term, value: term.toLowerCase()})));
        }
    }
}