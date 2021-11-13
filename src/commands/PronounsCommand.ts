import {Client, MessageEmbed} from "discord.js";
import {ICommand} from "../structs/ICommand";
import Util from "../utils/Util";

export default class PronounsCommand implements ICommand {

    public name: string = "pronouns";
    public once: boolean = false;
    public enabled: boolean = true;
    public description: string = "View a list of common pronouns.";
    public aliases: string[] = [];
    protected client: Client;

    constructor(client: Client) {
        this.enabled = true;
        this.client = client;
    }

    public async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            const embed = new MessageEmbed()
                .setTitle("Common Pronouns")
                .setColor(Util.getDefaultEmbedColor())
                .setThumbnail(this.client.user.displayAvatarURL({dynamic: true, size: 256}))
                .setDescription("Pronouns are words that refer to either the people talking (like you or I) or someone " +
                    "or something that is being talked about (like she, they, and this). Gender pronouns (like he or " +
                    "them) specifically refer to people that you are talking about. You can view some of the most common " +
                    "pronouns below. NOTE: One can still be non-binary while using pronouns that are associated with " +
                    "their gender assigned at birth.")
                .addFields([
                    {
                        name: "He/Him/His",
                        value: "He said he would rather do it himself." + "\n" + "Who is he referring to?",
                        inline: false
                    },
                    {
                        name: "She/Her/Hers",
                        value: "She said she would rather do it herself." + "\n" + "Who is she referring to?",
                        inline: false
                    },
                    {
                        name: "They/Them/Theirs (non-gender-binding)",
                        value: "They said they would rather do it themselves." + "\n" + "Who are they referring to?",
                        inline: false
                    },
                    {
                        name: "It/It/Its",
                        value: "It said it would rather do it itself." + "\n" + "Who is it referring to?",
                        inline: false
                    }
                ])
                .setTimestamp()
                .setFooter("Pronoun Bot", this.client.user.displayAvatarURL({dynamic: true}));
            return await interaction.reply({embeds: [embed]});
        }
    }

    public slashData: object = <object> {
        name: this.name,
        description: this.description
    };
}