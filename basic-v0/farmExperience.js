/** @param {NS} ns */
// farmExperience.js
export async function main(ns) {
  const my_farm = ns.getPurchasedServers().concat("home")
  const farming_script = "w1.js"
  const optimalServer = "n00dles"
  const homeBuffer = Math.floor(ns.getServerMaxRam('home')*0.05);
  let maxThreads = 1;
  for(const server of my_farm){
    await ns.scp(farming_script, server, "home")
    const usableRam = Math.max(0,
                      ns.getServerMaxRam(server)-ns.getServerUsedRam(server)
                      -((server=='home')?homeBuffer:0));
    maxThreads = Math.floor(usableRam/ns.getScriptRam(farming_script, "home"));
    if(!(ns.args[0]=='stop')){
      if (maxThreads>0){
        let pid = ns.exec(farming_script, server, maxThreads, optimalServer);
        ns.tprint("Launching "+farming_script+" in "+
        server+"; Threads: "+maxThreads+"; PID: "+pid);
      }
    }
    else {
      ns.scriptKill(farming_script, server);
    }
  }
}