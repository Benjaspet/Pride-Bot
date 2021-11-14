import {Client, MessageEmbed} from "discord.js";
import {ICommand} from "../structs/ICommand";
import {SlashCommandOptions} from "../structs/ICommandOptions";
import axios from "axios";
import Util from "../utils/Util";

export default class OrientationCommand implements ICommand {

    public name: string = "orientation";
    public once: boolean = false;
    public enabled: boolean = true;
    public description: string = "Get information on a sexual or romantic orientation.";
    public aliases: string[] = [];
    protected client: Client;

    constructor(client: Client) {
        this.enabled = true;
        this.client = client;
    }

    public async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            const type = interaction.options.getString("type");
            const query = interaction.options.getString("query");
            try {
                if (type === "sexual") {
                    await axios.get(`https://app.ponjo.club/v1/pride/orientations?type=sexual&q=${query}`)
                        .then(async response => {
                            const data = response.data.data;
                            const embed = new MessageEmbed();
                            if (data.length === 0) { // If the array is empty.
                                embed.setDescription("No search results found.");
                                embed.setColor(Util.getDefaultEmbedColor());
                                return await interaction.reply({embeds: [embed]});
                            } else {
                                embed.setAuthor("Search results for: " + query, data[0].flag);
                                embed.setColor(Util.getDefaultEmbedColor());
                                embed.setThumbnail(data[0].flag);
                                data.forEach(element => {
                                    embed.addField(element.name, element.definition, false);
                                });
                                return await interaction.reply({embeds: [embed]});
                            }
                        });
                } else {
                    await axios.get(`https://app.ponjo.club/v1/pride/orientations?type=romantic&q=${query}`)
                        .then(async response => {
                            const data = response.data.data;
                            const embed = new MessageEmbed();
                            if (data.length === 0) { // If the array is empty.
                                embed.setDescription("No search results found.");
                                embed.setColor(Util.getDefaultEmbedColor());
                                return await interaction.reply({embeds: [embed]});
                            } else {
                                embed.setAuthor("Search results for: " + query, data[0].flag);
                                embed.setColor(Util.getDefaultEmbedColor());
                                embed.setThumbnail(data[0].flag);
                                data.forEach(element => {
                                    embed.addField(element.name, element.definition, false);
                                });
                                return await interaction.reply({embeds: [embed]});
                            }
                        });
                }
            } catch (error) {
                return await interaction.reply({embeds: [new MessageEmbed().setColor(Util.getDefaultEmbedColor()).setDescription("An error occurred while searching.")]});
            }
        }
    }

    public slashData: object = <object> {
        name: this.name,
        description: this.description,
        options: [
            {
                name: "type",
                description: "The type of orientation to search for.",
                type: SlashCommandOptions.STRING,
                required: true,
                autocomplete: false,
                choices: [
                    {
                        name: "Sexual",
                        value: "sexual"
                    },
                    {
                        name: "Romantic",
                        value: "romantic"
                    }
                ]
            },
            {
                name: "query",
                description: "The search query.",
                type: SlashCommandOptions.STRING,
                required: true,
                autocomplete: true
            }
        ]
    };
}