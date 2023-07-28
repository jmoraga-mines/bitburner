/** @param {NS} ns **/
// allMoney.js

// run allMoney.js --min_potential 13 --max_level 5

export async function main(ns) {
  ns.disableLog('ALL');
  ns.clearLog();
  ns.tail();
  let purchasedList = ns.getPurchasedServers();
  if (purchasedList.length<1)
    purchasedList = "home"
  else
    purchasedList = purchasedList.join(', ');
	const data = ns.flags([
		['exclude', purchasedList],   //  run this-script.js --exclude server1,server2
    ['max_level', Infinity],
    ['min_potential', 1],
    ['max_ports', ns.fileExists("BruteSSH.exe", 'home') + 
                  ns.fileExists("FTPCrack.exe", 'home') +
                  ns.fileExists("relaySMTP.exe", 'home') + 
                  ns.fileExists("HTTPWorm.exe", 'home')],
    ['max_hack', ns.getHackingLevel()]
	]);
  // let dollarUS =  Intl.NumberFormat("en", { notation: "compact", maximumSignificantDigits: 3 });
  /*
  Intl.NumberFormat("en-US", {
    style: "currency",
    unitDisplay: "short",
    maximumFractionDigits: 0,
    currency: "USD",
  });
  */

	let to_exclude = data['exclude'].split(',').map(server => server.trim());
  let max_level = data['max_level'];
  let max_hack = data['max_hack'];
  const max_ports = data['max_ports'];
  let min_potential = data['min_potential'];

	let results = scan(ns, 'home', to_exclude);
  results = results.map(server_name => ns.getServer(server_name));
  results.sort(function(a,b){
                              if(a.minDifficulty-b.minDifficulty>0){
                                return 1;
                              }
                              else if(a.minDifficulty-b.minDifficulty<0){
                                return -1;
                              }
                              else {
                                return (b.moneyMax-a.moneyMax);
                              }
                            });
  ns.tprint(`Found ${results.length} servers.`);
  results.forEach(function (server_data) {
    const server = server_data.hostname;
    // let server_data = ns.getServer(server);
    let server_money = Math.floor(ns.getServerMaxMoney(server)); // in Millions
    // let server_ram = ns.getServerMaxRam(server);
    let server_security = ns.getServerMinSecurityLevel(server);
    let server_money_avail = Math.floor(ns.getServerMoneyAvailable(server)); // in Millions
    let server_potential = Math.floor(server_money/server_security/1000000);
    let server_max_hack = ns.getServerRequiredHackingLevel(server);
    const server_req_ports = ns.getServerNumPortsRequired(server);
    //
    if ((server_security  <= max_level) && 
        (server_potential >= min_potential) && 
        (server_max_hack  <= max_hack) && 
        (server_req_ports <= max_ports) 
        // && (server_money_avail>0)
        ) {
      ns.print(`Money : $ ${ns.formatNumber(server_money_avail,1)}/${ns.formatNumber(server_money,1)}`+ 
          `; Security : (${server_data.hackDifficulty.toFixed(0)}/${server_security})`+
          `; Req Ports: ${server_req_ports}`+
        // " ; Memory: " + server_ram + 
          `; Pot: ${server_potential.toFixed(0)}`+
          ` [${server}]`);

    }
	})

}

function scan(ns, target, to_remove) {
	// the to_scan list starts out with only the base server
	var to_scan = [target];
	var found = [target];
	// scan servers in the to_scan list
	while (to_scan.length > 0) {
		var server = to_scan.pop()
		ns.scan(server).forEach(function (result) {
			// if we haven't found it yet
			if (!found.includes(result)) {
				// record it
				found.push(result)
				// scan it later
				to_scan.push(result)
			}
		})
	}

	// remove entries found in to_remove
	found = found.filter(s => to_remove.indexOf(s) < 0)

	return found;
}