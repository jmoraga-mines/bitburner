/** @param {NS} ns */
import { SERVERS_DATA } from '/const/constants.js';
import { BANKS_DATA } from '/const/constants.js';
import { ServerData } from '/utils/server-data.js';
import { findAllBanks } from '/utils/all-servers';

export async function main(ns) {
  const allServers = new ServerData(ns, SERVERS_DATA);
  const allBankNames = findAllBanks(ns);
  const allBanks = [];
  for (const bankName of allBankNames) {
    let bankServer = await allServers.loadServer(bankName);
    bankServer.isBank = true;
    allBanks.push(bankServer);
  }
  ns.write(BANKS_DATA, JSON.stringify(allBanks), 'w');
}
