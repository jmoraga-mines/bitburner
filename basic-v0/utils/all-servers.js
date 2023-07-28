/** @param {NS} ns */
// all-servers.js
import {nukeServer} from '/utils/utils-hack.js'

export async function main(ns) {
  const servers = findAllServers(ns);
  let pushList = [];

  // ns.tprint(`Servers: ${Array(servers).join(', ')}`);

  ns.tprint(`Banks: ${(findAllBanks(ns)).join(', ')}`);

  ns.tprint(`Bots: ${(findAllBots(ns)).join(', ')}`);

  ns.tprint(`Purchased: ${(findAllPurchased(ns)).join(', ')}`);
}

export function findAllBanks(ns){
  const allServers = findAllServers(ns, ['home']);
  let allBanks = []
  for(const server of allServers)
    if((ns.getServerMaxMoney(server)>0)&&
                               (ns.getServerMoneyAvailable(server)>0)&&
                               (nukeServer(ns, server))&&
                               (ns.hackAnalyze(server)>0))
      allBanks.push(server)
  return (allBanks);
}

export function findAllBots(ns){
  // const allServers = findAllServers(ns, ['home'].concat(ns.getPurchasedServers()));
  const allServers = findAllServers(ns, ['home'].concat(findAllPurchased(ns)));
  let allBots = []
  for(const server of allServers)
    if((ns.getServerMaxRam(server)>0)&&
        ((nukeServer(ns, server)) || server.hasAdminRights))
      allBots.push(server)
  return (allBots);
}

export function findAllPurchased(ns){
  const allServers = findAllServers(ns, ['home']);
  const allPurchased = allServers.filter((server)=>server.startsWith('pserv-'));
  return (allPurchased);
}


/**
 * Returns an array of all servers in the network.
 */
export function findAllServers(ns, toRemove=[]) {
  const serverDiscovered = new Set(['home']);
  const allServers = ['home'];
  const queue = ['home'];

  while (queue.length) {
    const currentServer = queue.shift();
    const connectedServers = ns.scan(currentServer);

    for (const server of connectedServers) {
      if (!serverDiscovered.has(server)) {
        serverDiscovered.add(server);
        queue.push(server);
        allServers.push(server);
      }
    }
  }

  // Remove servers from the list
  const serversToRemove = new Set(toRemove);
  const filteredServers = allServers.filter((server) => !serversToRemove.has(server));

  return (filteredServers);
}

export function autocomplete(data, args) {
  return [...data.servers];
}