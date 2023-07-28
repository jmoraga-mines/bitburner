/** @param {NS} ns */

import {BOTS_DATA, SERVERS_DATA} from '/const/constants.js'
import {ServerData} from '/utils/server-data.js'

export async function main(ns) {
  let pid=0;
  pid = ns.run('/setup/server-setup.js');
  await ns.sleep(10);
  pid = ns.run('/setup/bank-setup.js');
  await ns.sleep(10);
  pid = ns.run('/setup/bot-setup.js');
  await ns.sleep(10);
  // const allBots = new ServerData(ns, BOTS_DATA);
  const allBots = new ServerData(ns, SERVERS_DATA);
  
  for(const aBot of (await allBots.getAllHostnames())){
    ns.killall(aBot);
    ns.scp('early-hack-template.js', aBot, 'home');
    do {
      pid = ns.exec('early-hack-template.js', aBot, 1);
      await ns.sleep(5);
    } while (pid>0)
  }
}