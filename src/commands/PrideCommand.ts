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

import {ApplicationCommandData, Client, CommandInteraction, MessageAttachment} from "discord.js";
import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import {Buffer} from "buffer";
import Logger from "../utils/Logger";
import Utilities from "../utils/Utilities";
import Command from "../structs/Command";

export default class PrideCommand extends Command {

    private readonly client: Client;

    constructor(client: Client) {
        super("pride", {
            name: "pride",
            description: "Add pride flairs to your profile picture.",
            options: [
                {
                    name: "flair",
                    description: "The pride flair to add to your profile picture.",
                    type: ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true
                }
            ]
        })
        this.client = client;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.deferReply();
        const flair: string = interaction.options.getString("flair");
        const userAvatar: string  = interaction.user.displayAvatarURL({dynamic: false, format: "png", size: 512});
        await Utilities.getFlairedAvatarAsBase64(userAvatar, flair)
            .then(async result => {
                const data: any = result.split(",")[1];
                const buff: any = Buffer.from(data, "base64");
                const file: any = new MessageAttachment(buff, `${interaction.user.username}-${flair}.png`);
                return void await interaction.editReply({files: [file]});
            })
            .catch(async error => {
                Logger.error(error);
                return void await interaction.editReply("An error occurred. Please contact a developer.");
            });
    }

    public getName(): string {
        return this.name;
    }

    public getCommandData(): ApplicationCommandData {
        return this.data;
    }
}