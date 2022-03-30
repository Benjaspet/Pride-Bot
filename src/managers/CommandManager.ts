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

import {Client, Collection} from "discord.js";
import {ApplicationCommand} from "../types/ApplicationCommand";
import Command from "../structs/Command";
import FlagCommand from "../commands/FlagCommand";
import PrideCommand from "../commands/PrideCommand";
import PronounsCommand from "../commands/PronounsCommand";
import OrientationCommand from "../commands/OrientationCommand";
import LGBTQMemeCommand from "../commands/LGBTQMemeCommand";

export default class CommandManager {

    public static commands: Collection<string, ApplicationCommand> = new Collection<string, ApplicationCommand>();
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
        CommandManager.registerCommands([
            new FlagCommand(client),
            new LGBTQMemeCommand(client),
            new OrientationCommand(client),
            new PrideCommand(client),
            new PronounsCommand(client)
        ]);
    }

    private static registerCommands(commands: Command[]): void {
        for (const command of commands) {
            CommandManager.commands.set(command.getName(), command);
        }
    }
}