/** @param {NS} ns */
import { SERVERS_DATA } from '/const/constants.js';
import { BOTS_DATA } from '/const/constants.js';
import { ServerData } from '/utils/server-data.js';
import { findAllBots } from '/utils/all-servers';

export async function main(ns) {
  const allServers = new ServerData(ns, SERVERS_DATA);
  const allBotsNames = await findAllBots(ns);
  const allBots = [];
  for (const botName of allBotsNames) {
    let botServer = await allServers.loadServer(botName);
    botServer.isBot = true;
    allBots.push(botServer);
  }
  ns.write(BOTS_DATA, JSON.stringify(allBots), 'w');
}
