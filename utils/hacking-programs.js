/** @param {NS} ns */
// hackingPrograms.js
// Define the hacking programs required to nuke servers
export const hackingPrograms = [
    { name: "BruteSSH.exe", method: (target) => ns.brutessh(target) },
    { name: "FTPCrack.exe", method: (target) => ns.ftpcrack(target) },
    { name: "relaySMTP.exe", method: (target) => ns.relaysmtp(target) },
    { name: "HTTPworm.exe", method: (target) => ns.httpworm(target) },
    { name: "SQLInject.exe", method: (target) => ns.sqlinject(target) },
  ];
  
  export async function main(ns) {
    const crackers = hackingPrograms.reduce((count, cracker) => {
      if (ns.fileExists(cracker.name)) {
        return count + 1;
      }
      return count;
    }, 0);
    return crackers;
  }