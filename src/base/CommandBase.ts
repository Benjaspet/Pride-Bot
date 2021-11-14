import PrideCommand from "../commands/PrideCommand";
import {Client, Interaction} from "discord.js";
import PronounsCommand from "../commands/PronounsCommand";
import FlagCommand from "../commands/FlagCommand";
import OrientationCommand from "../commands/OrientationCommand";

export default class CommandBase {

    public static async respondToApplicationCommands(client: Client, interaction: Interaction) {
        new FlagCommand(client).execute(interaction).then(() => {});
        new PrideCommand(client).execute(interaction).then(() => {});
        new PronounsCommand(client).execute(interaction).then(() => {});
        new OrientationCommand(client).execute(interaction).then(() => {});
    }
}