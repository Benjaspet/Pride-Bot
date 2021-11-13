import {Client} from "discord.js";
import {ICommand} from "../structs/ICommand";

export default class PrideCommand implements ICommand {

    public name: string = "pride";
    public once: boolean = false;
    public enabled: boolean = true;
    public description: string = "Add pride flairs to your profile picture.";
    public aliases: string[] = [];
    protected client: Client;

    constructor(client: Client) {
        this.enabled = true;
        this.client = client;
    }

    public async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            await interaction.reply({content: "Success."});
        }
    }

    public slashData: object = <object> {
        name: this.name,
        description: this.description,
    };
}