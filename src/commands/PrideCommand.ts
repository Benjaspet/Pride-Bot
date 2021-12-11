import {Client, Interaction, MessageAttachment} from "discord.js";
import {ICommand} from "../structs/ICommand";
import Logger from "../Logger";
import AvatarUtil from "../utils/AvatarUtil";
import {SlashCommandOptions} from "../structs/ICommandOptions";
import Util from "../utils/Util";
import {Buffer} from "buffer";

export default class PrideCommand implements ICommand {

    public name: string = "pride";
    public description: string = "Add pride flairs to your profile picture.";
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            await interaction.deferReply();
            const flair = interaction.options.getString("flair");
            const userAvatar = interaction.user.displayAvatarURL({dynamic: false, format: "png", size: 512});
            await AvatarUtil.getFlairedAvatarAsBase64(userAvatar, flair)
                .then(async result => {
                    await Util.sleep(1750);
                    const data = result.split(",")[1];
                    const buff = Buffer.from(data, "base64");
                    const file = new MessageAttachment(buff, `${interaction.user.username}-${flair}.png`);
                    return await interaction.editReply({files: [file]});
                })
                .catch(async error => {
                    Logger.error(error);
                    return await interaction.editReply("An error occurred. Please contact a developer.");
                });
        }
    }

    public slashData: object = {
        name: this.name,
        description: this.description,
        options: [
            {
                name: "flair",
                description: "The pride flair to add to your profile picture.",
                type: SlashCommandOptions.STRING,
                required: true,
                autocomplete: true
            }
        ]
    };
}