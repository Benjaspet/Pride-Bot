import {Client, Interaction, MessageEmbed} from "discord.js";
import {ICommand} from "../structs/ICommand";
import Util from "../utils/Util";
import {SlashCommandOptions} from "../structs/ICommandOptions";

export default class FlagCommand implements ICommand {

    public name: string = "flag";
    public description: string = "Obtain an image of any pride flag.";
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            const flag = interaction.options.getString("type");
            const embed = new MessageEmbed()
                .setTitle(`${Util.capitalize(flag)} Flag`)
                .setColor(Util.getDefaultEmbedColor())
                .setImage(`https://app.ponjo.club/v1/pride/flags/${flag.toLowerCase()}`)
            return await interaction.reply({embeds: [embed]});
        }
    }

    public slashData: object = {
        name: this.name,
        description: this.description,
        options: [
            {
                name: "type",
                description: "The type of pride flag to display.",
                type: SlashCommandOptions.STRING,
                required: true,
                autocomplete: true
            }
        ]
    };
}