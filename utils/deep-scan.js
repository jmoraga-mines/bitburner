/** @param {NS} ns */
// deep-scan.js

export function deepScan(ns, target='home', to_remove=[]) {
    const found = new Set([target]);
    const to_scan = [target];
  
    while (to_scan.length > 0) {
      const server = to_scan.pop();
      ns.scan(server).forEach(result => {
        if (!found.has(result)) {
          found.add(result);
          to_scan.push(result);
        }
      });
    }
  
    const filtered = Array.from(found).filter(s => !to_remove.includes(s));
  
    return filtered;
  }
  