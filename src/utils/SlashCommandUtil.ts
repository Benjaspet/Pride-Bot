import {Client} from "discord.js";
import PrideCommand from "../commands/PrideCommand";
import PronounsCommand from "../commands/PronounsCommand";
import FlagCommand from "../commands/FlagCommand";
import OrientationCommand from "../commands/OrientationCommand";

export default class SlashCommandUtil {

    public static getAllSlashCommandData(client: Client): object[] {
        return [
            new FlagCommand(client).slashData,
            new PrideCommand(client).slashData,
            new PronounsCommand(client).slashData,
            new OrientationCommand(client).slashData
        ];
    }
}