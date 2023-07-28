/** @param {NS} ns */
// utils-hack.js
// import {findAllServers} from '/utils/all-servers.js'
import {MIN_DELAY} from '/const/constants.js';


export async function main(ns) {
  const target = (ns.args[0] || 'n00dles');
  const minDelay = parseInt(ns.args[1] || MIN_DELAY); // milliseconds
  ns.tprint(`INFO: Number of available crackers -- ${portCrackerCount(ns)}`)
  if (nukeServer(ns, target)){
    ns.tprint(`INFO: Success nuking [${target}]`)
  } else {
    ns.tprint(`WARN: Can't nuke [${target}]`)
  }
  for (const cracker of availableCrackers(ns)){
    // ns.tprint(`INFO: Cracker -- ${cracker.name}`)
    try{
      cracker.method(target);
      ns.tprint(`INFO: SUCCESS -- ${cracker.name} @ [${target}]`)
    } catch (err) {
      ns.tprint(`ERROR: Failed -- ${cracker.name} @ [${target}]: ${err}`)
    }
  };
  const padTimes = calculatePadTimes(ns, target);
  ns.tprint(JSON.stringify(padTimes));
}

export function nukeServer(ns, target){
  if(isHacked(ns, target))
    return true;
  else if (!isHackable(ns, target)){
    return false;
  }
  const myCrackers = availableCrackers(ns);
  for (const cracker of myCrackers){
    cracker.method(target);
  }
  ns.nuke(target);
  return (true);
}


export function isHacked(ns, target){
  return (ns.hasRootAccess(target));
}

export function isHackable(ns, target){
  const playerLevel = ns.getHackingLevel();
  const totalCrackersAvailable = portCrackerCount(ns);
  const serverLevel = ns.getServerRequiredHackingLevel(target);
  const serverRequiredPorts = ns.getServerNumPortsRequired(target);

  return ((playerLevel>=serverLevel)&&
          (totalCrackersAvailable>=serverRequiredPorts));
}

export function portCrackerCount(ns) {
  // Define the hacking programs required to nuke servers
  const hackingPrograms = availableCrackers(ns);

  return (hackingPrograms.length);
}


export function availableCrackers(ns) {
  // Define the hacking programs required to nuke servers
  const hackingPrograms = portCrackers(ns);
  const availablePrograms = [];
  // Count the number of hacking programs available
  for (const program of hackingPrograms) {
    if (ns.fileExists(program.name, 'home')) {
      availablePrograms.push(program)
    }
  }
  return (availablePrograms);
}

export function portCrackers(ns){
  return([
    { name: "BruteSSH.exe", method: (target) => ns.brutessh(target) },
    { name: "FTPCrack.exe", method: (target) => ns.ftpcrack(target) },
    { name: "relaySMTP.exe", method: (target) => ns.relaysmtp(target) },
    { name: "HTTPworm.exe", method: (target) => ns.httpworm(target) },
    { name: "SQLInject.exe", method: (target) => ns.sqlinject(target) },
  ]);
}

export function calculatePadTimes(ns, target, minDelay = MIN_DELAY){
  const hTime = ns.getHackTime(target);
  const gTime = ns.getGrowTime(target);
  const wTime = ns.getWeakenTime(target);
  const maxTime = Math.max(hTime, gTime, wTime);
  const hPad = (maxTime - hTime);
  const wPad1 = (maxTime - wTime)+minDelay;
  const gPad = (maxTime - gTime)+minDelay*2;
  const wPad2 = wPad1 + 2*minDelay;
  return({hPad  : Math.round(hPad),
          wPad1 : Math.round(wPad1),
          gPad  : Math.round(gPad),
          wPad2 :Math.round(wPad2),});
}


export function autocomplete(data, args) {
    return [...data.servers];
}