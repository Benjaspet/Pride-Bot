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

import {
    ApplicationCommandData,
    Client,
    CommandInteraction,
    EmbedFieldData,
    MessageEmbed
} from "discord.js";
import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import axios from "axios";
import Utilities from "../utils/Utilities";
import Command from "../structs/Command";
import EmbedUtil from "../utils/EmbedUtil";

export default class OrientationCommand extends Command {

    private readonly client: Client;

    constructor(client: Client) {
        super("orientation", {
            name: "orientation",
            description: "Get information on a sexual or romantic orientation.",
            options: [
                {
                    name: "type",
                    description: "The type of orientation to search for.",
                    type: ApplicationCommandOptionTypes.STRING,
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
                    type: ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true
                }
            ]
        })
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        const type: string = interaction.options.getString("type");
        const query: string = interaction.options.getString("query");
        const cond: string = type === "sexual" ? "sexual" : "romantic";
        try {
            await axios.get(`https://app.ponjo.club/v1/pride/orientations?type=${cond}&q=${query}`)
                .then(async response => {
                    const data: any = response.data.data;
                    const embed: MessageEmbed = new MessageEmbed();
                    if (data.length === 0) { // If the array is empty.
                        embed.setDescription("No search results found.");
                        embed.setColor(Utilities.getDefaultEmbedColor());
                        return await interaction.reply({embeds: [embed]});
                    } else {
                        let embedData: EmbedFieldData[] = [];
                        embed.setAuthor({
                            name: "Search results for: " + query,
                            iconURL: data[0].flag
                        });
                        embed.setColor(Utilities.getDefaultEmbedColor());
                        embed.setThumbnail(data[0].flag);
                        data.forEach(element => {
                            embedData.push({
                                name: element.name,
                                value: element.definition,
                                inline: false
                            });
                        });
                        embed.addFields(embedData);
                        return void await interaction.reply({embeds: [embed]});
                    }
                });
        } catch (error) {
            return await interaction.reply(
                {
                    embeds: [EmbedUtil.getDefaultEmbed("An error occurred while searching.")]
                });
        }
    }

    public getName(): string {
        return this.name;
    }

    public getCommandData(): ApplicationCommandData {
        return this.data;
    }
}