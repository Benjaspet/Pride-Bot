import {Client, MessageAttachment} from "discord.js";
import {ICommand} from "../structs/ICommand";
import LoggerBase from "../base/LoggerBase";
import AvatarUtil from "../utils/AvatarUtil";
import {SlashCommandOptions} from "../structs/ICommandOptions";
import Util from "../utils/Util";
import axios from "axios";
import {Buffer} from "buffer";

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
            await interaction.deferReply();
            const flair = interaction.options.getString("flair");
            const userAvatar = interaction.member.displayAvatarURL({dynamic: false, format: "png", size: 512});
            await AvatarUtil.getFlairedAvatarAsBase64(userAvatar, flair)
                .then(async result => {
                    await Util.sleep(5000);
                    const data = result.split(",")[1];
                    const buff = Buffer.from(data, "base64");
                    const file = new MessageAttachment(buff, `${interaction.member.username}-${flair}.png`);
                    return await interaction.editReply({files: [file]});
                })
                .catch(async error => {
                    LoggerBase.error(error);
                    return await interaction.editReply("An error occurred. Please contact a developer.");
                });
        }
    }

    public slashData: object = <object> {
        name: this.name,
        description: this.description,
        options: [
            {
                name: "flair",
                description: "The pride flair to add to your profile picture.",
                type: SlashCommandOptions.STRING,
                required: true,
                choices: [
                    {
                        name: "Pansexual",
                        value: "pansexual"
                    }
                ],
            }
        ]
    };
}