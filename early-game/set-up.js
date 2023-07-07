/** @param {NS} ns */

import {hackingPrograms} from '/utils/hacking-programs.js'
import {deepScan} from '/utils/deep-scan.js'

export async function main(ns) {
  // Set-up log and shows it
  ns.disableLog('ALL');
  ns.clearLog;
  ns.tail();
  // list of all server 
  const connected_servers = deepScan(ns, 'home') // ns.scan('home') // servers connected to home
  let serverList = [];
  for (const s of connected_servers){
    let serverData = ns.getServer(s);
    // ns.print(JSON.stringify(serverData))
    serverList.push(serverData);
  }
  ns.write('/setup/all_servers.txt', 
           JSON.stringify(serverList), 'w');
  // Constant declaration
  const hackingSkill = ns.getHackingLevel();
  const validCrackers = hackingPrograms.filter(cracker=>ns.fileExists(cracker.name));
  const crackers = validCrackers.length;
  const crackableServers = serverList.filter(s => s.numOpenPortsRequired <= crackers);
  // nuking
  for (const s of crackableServers){
    for (const cracker of validCrackers)
      cracker.method(s.hostname)
    ns.nuke(s.hostname)
  }
  const myBanks = serverList.filter(s => 
                          s.numOpenPortsRequired <= crackers && 
                          s.requiredHackingSkill <= hackingSkill &&
                          s.moneyMax>0);
  const myFarm = serverList.filter(s => s.hasAdminRights || 
                          s.numOpenPortsRequired <= crackers && 
                          s.requiredHackingSkill <= hackingSkill &&
                          s.maxRam>0 && s.cpuCores>0);
  ns.print(`Servers found : ${serverList.length}`)
  ns.print(`Farmers found : ${myFarm.length}`)
  ns.print(`Banks found   : ${myBanks.length}`)
  ns.print(`Hacking skill : ${hackingSkill}`);
  ns.print(`Crackers      : ${crackers}`);
  ns.write('/setup/bank_servers.txt', 
           JSON.stringify(myBanks), 'w');
  ns.write('/setup/farm_servers.txt', 
           JSON.stringify(myFarm), 'w');

}