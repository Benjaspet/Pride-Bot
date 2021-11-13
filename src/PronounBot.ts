import * as Discord from "discord.js";
import IntentUtil from "./utils/IntentUtil";
import AppBase from "./base/AppBase";
import EventBase from "./base/EventBase";

const client = new Discord.Client({
    allowedMentions: {
        parse: IntentUtil.getParsedMentions(),
        repliedUser: false,
    },
    partials: IntentUtil.getPartials(),
    intents: IntentUtil.getIntents(),
});

new AppBase(client).login();
new EventBase(client);