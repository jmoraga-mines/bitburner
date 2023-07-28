/** @param {NS} ns */
/**
 * nukeServer.js
 * 
 * This script automates the process of hacking and nuking servers in a network. It scans all servers
 * in the network, determines the required hacking programs, and attempts to nuke each server if
 * sufficient hacking programs are available. The script provides a summary of successful and failed
 * nukes, as well as servers that couldn't be nuked due to a lack of required hacking programs.
 * 
 * To use this script, ensure you have the necessary hacking programs in your home server, such as
 * BruteSSH.exe, FTPCrack.exe, relaySMTP.exe, HTTPworm.exe, and SQLInject.exe.
 *
 */

export async function main(ns) {
  // Find all servers in the network
  let allServers = await findAllServers(ns);
  allServers = allServers.concat(ns.args[0] || [])
  // Define the hacking programs required to nuke servers
  const hackingPrograms = [
    { name: "BruteSSH.exe", method: (target) => ns.brutessh(target) },
    { name: "FTPCrack.exe", method: (target) => ns.ftpcrack(target) },
    { name: "relaySMTP.exe", method: (target) => ns.relaysmtp(target) },
    { name: "HTTPworm.exe", method: (target) => ns.httpworm(target) },
    { name: "SQLInject.exe", method: (target) => ns.sqlinject(target) },
  ];

  let portCrackers = 0;
  let successfulNukes = 0;
  let failedNukes = 0;
  let notEnoughCrackers = 0;

  // Count the number of hacking programs available
  for (const program of hackingPrograms) {
    if (ns.fileExists(program.name, "home")) {
      portCrackers++;
    }
  }

  for (const server of allServers) {
    if (server !== "home") {
      // Check if the server requires more hacking programs than available
      if (ns.getServerNumPortsRequired(server) > portCrackers) {
        notEnoughCrackers++;
      } else {
        // Hack the server using the available hacking programs
        for (const program of hackingPrograms) {
          if (ns.fileExists(program.name, "home")) {
            program.method(server);
          }
        }

        // Attempt to nuke the server
        try {
          ns.nuke(server);
          successfulNukes++;
        } catch (err) {
          failedNukes++;
          ns.tprint(`Failed nuking: ${server}`);
        }
      }
    }
  }

  // Print the nuke summary
  ns.tprint("Nuke summary:");
  ns.tprint(`Need more crackers to Nuke: ${notEnoughCrackers}`);
  ns.tprint(`Successful Nukes: ${successfulNukes}`);
  ns.tprint(`Failed Nukes: ${failedNukes}`);
}

/**
 * Returns an array of all servers in the network.
 */
async function findAllServers(ns) {
  const serverDiscovered = new Set(["home"]);
  const allServers = ["home"];
  const queue = ["home"];

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

  return allServers;
}

export function autocomplete(data, args) {
    return [...data.servers];
}