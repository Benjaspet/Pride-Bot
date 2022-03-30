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

import Command from "../structs/Command";
import {ApplicationCommandData, Client, Interaction, MessageEmbed} from "discord.js";
import Utilities from "../utils/Utilities";

export default class LGBTQMemeCommand extends Command {

    private readonly client: Client;

    constructor(client: Client) {
        super("lgbtqmeme", {
            name: "lgbtqmeme",
            description: "Fetch a random LGBTQ+ meme.",
        });
        this.client = client;
    }

    public async execute(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === this.name) {
            await fetch("https://meme-api.herokuapp.com/gimme/lgbtmemes")
                .then(response => response.json())
                .then(async data => {
                    return void await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle(data.title)
                                .setColor(Utilities.getDefaultEmbedColor())
                                .setImage(data.url)
                                .setFooter({text: "Upvotes: " + data.ups + " | Posted by: " + data.author})
                        ]
                    });
                }).catch(async () => {
                    return void await interaction.reply({
                        content: "Unable to fetch a meme at this time."
                    });
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