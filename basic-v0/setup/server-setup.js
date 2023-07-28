/** @param {NS} ns */
import {SERVERS_DATA} from '/const/constants.js';

export async function main(ns) {
  const serverSet = findAllServers(ns);
  ns.write(SERVERS_DATA, JSON.stringify(serverSet), 'w');
}


/**
 * Returns an array of all servers in the network.
 */
export function findAllServers(ns, toRemove=[]) {
  const serverDiscovered = new Set(['home']);
  const allServers = [];
  const queue = ['home'];

  while (queue.length) {
    const currentServer = queue.shift();
    const connectedServers = ns.scan(currentServer);

    for (const server of connectedServers) {
      if (!serverDiscovered.has(server)) {
        serverDiscovered.add(server);
        queue.push(server);
        const serverData = ns.getServer(server);
        const serverFixedData = {
          hostname: serverData.hostname,
          hasAdminRights: serverData.hasAdminRights,
          cpuCores: serverData.cpuCores,
          maxRam: serverData.maxRam,
          moneyMax: serverData.moneyMax,
          organizationName: serverData.organizationName,
          numOpenPortsRequired: serverData.numOpenPortsRequired,
          requiredHackingSkill: serverData.requiredHackingSkill,
          purchasedByPlayer: serverData.purchasedByPlayer,
          backdoorInstalled: serverData.backdoorInstalled,
          serverGrowth: serverData.serverGrowth,
        };
        allServers.push(serverFixedData);
      }
    }
  }

  // Remove servers from the list
  const serversToRemove = new Set(toRemove);
  const filteredServers = allServers.filter((server) => !serversToRemove.has(server.hostname));

  return (filteredServers);
}
