/** @param {NS} ns **/
// s1.js

export async function main(ns) {
    while(true){
        await ns.share();
        await ns.sleep(5);
    }
}