/*
 * Copyright © 2022 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {ApplicationCommandData, Client, CommandInteraction, MessageEmbed} from "discord.js";
import Utilities from "../utils/Utilities";
import Command from "../structs/Command";

export default class PronounsCommand extends Command {

    private readonly client: Client;

    constructor(client: Client) {
        super("pronouns", {
            name: "pronouns",
            description: "View a list of common pronouns."
        })
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle("Common Pronouns")
            .setColor(Utilities.getDefaultEmbedColor())
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
            .setFooter({
                text: "Pronoun Bot",
                iconURL: this.client.user.displayAvatarURL({dynamic: true})
            });
        return void await interaction.reply({embeds: [embed]});
    }

    public getName(): string {
        return this.name;
    }

    public getCommandData(): ApplicationCommandData {
        return this.data;
    }
}