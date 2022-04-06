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

import {Client} from "discord.js";
import PrideCommand from "../commands/PrideCommand";
import PronounsCommand from "../commands/PronounsCommand";
import FlagCommand from "../commands/FlagCommand";
import OrientationCommand from "../commands/OrientationCommand";
import LGBTQMemeCommand from "../commands/LGBTQMemeCommand";

export default class SlashCommandUtil {

    public static getAllSlashCommandCommandData(client: Client): object[] {
        return [
            new FlagCommand(client).getCommandData(),
            new LGBTQMemeCommand(client).getCommandData(),
            new OrientationCommand(client).getCommandData(),
            new PrideCommand(client).getCommandData(),
            new PronounsCommand(client).getCommandData()
        ];
    }
}