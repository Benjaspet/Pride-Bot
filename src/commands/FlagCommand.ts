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
import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import Command from "../structs/Command";
import Utilities from "../utils/Utilities";

export default class FlagCommand extends Command {

    private readonly client: Client;

    constructor(client: Client) {
        super("flag", {
            name: "flag",
            description: "Obtain an image of any pride flag.",
            options: [
                {
                    name: "type",
                    description: "The type of pride flag to display.",
                    type: ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true
                }
            ]
        });
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        const flag: string = interaction.options.getString("type");
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${Utilities.capitalize(flag)} Flag`)
            .setColor(Utilities.getDefaultEmbedColor())
            .setImage(`https://app.ponjo.club/v1/pride/flags/${flag.toLowerCase()}`)
        return void await interaction.reply({embeds: [embed]});
    }

    public getName(): string {
        return this.name;
    }

    public getCommandData(): ApplicationCommandData {
        return this.data;
    }
}