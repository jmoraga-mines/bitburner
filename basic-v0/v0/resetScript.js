/** @param {NS} ns */
export async function main(ns) {
    // Array of all servers that don't need any ports opened
    // to gain root access. These have 16 GB of RAM
    const servers0Port = ["sigma-cosmetics",
                        "joesguns",
                        "nectar-net",
                        "hong-fang-tea",
                        "harakiri-sushi",
                        "foodnstuff"];
    // Array of all servers that only need 1 port opened
    // to gain root access. These have 8 GB of RAM
    const servers2Port = ["n00dles"] /**,
                        "pserv-0",
                        "pserv-1",
                        "pserv-2",
                        "pserv-3",
                        "pserv-4",
                        "pserv-5",
                        "pserv-6",
                        "pserv-7",
                        "pserv-8",
                        "pserv-9",
                        "pserv-10",
                        "pserv-11",
                        "pserv-12",
                        "pserv-13",
                        "pserv-1-0",
                        "pserv-2-0",
                        "pserv-3-0",
                        "pserv-4-0",
                        "pserv-5-0",
                        "pserv-6-0",
                        "pserv-7-0",
                        "pserv-8-0",
                        "pserv-9-0",
                        "pserv-10-0",
                        "pserv-11-0"]; **/

    // Array of all servers that only need 1 port opened
    // to gain root access. These have 32 GB of RAM
    const servers1Port = ["neo-net",
                        "zer0",
                        "max-hardware",
                        "iron-gym"]; /*,
                        "phantasy"]; */

    // Array of all servers that only need 1 port opened
    // to gain root access. These have 64 GB of RAM
    const servers3Port = []; // "silver-helix"];

    // Copy our scripts onto each server that requires 0 ports
    // to gain root access. Then use nuke() to gain admin access and
    // run the scripts.
    for (let i = 0; i < servers2Port.length; ++i) {
        const serv = servers2Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.nuke(serv);
        ns.scriptKill("early-hack-template.js", serv)
        ns.exec("early-hack-template.js", serv, 3);
        await ns.sleep(5);
    }

    for (let i = 0; i < servers0Port.length; ++i) {
        const serv = servers0Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.nuke(serv);
        ns.scriptKill("early-hack-template.js", serv)
        ns.exec("early-hack-template.js", serv, 6);
        await ns.sleep(5);
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("BruteSSH.exe")) {
        return -1;
        // await ns.sleep(60000);
    }

    // Copy our scripts onto each server that requires 1 port
    // to gain root access. Then use brutessh() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers1Port.length; ++i) {
        const serv = servers1Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        // ns.ftpcrack(serv);
        ns.nuke(serv);
        ns.scriptKill("early-hack-template.js", serv)
        ns.exec("early-hack-template.js", serv, 12);
        await ns.sleep(5);
    }
    // Copy our scripts onto each server that requires 1 port
    // to gain root access. Then use brutessh() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers3Port.length; ++i) {
        const serv = servers3Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        // ns.ftpcrack(serv);
        ns.nuke(serv);
        ns.scriptKill("early-hack-template.js", serv)
        ns.exec("early-hack-template.js", serv, 24);
        await ns.sleep(5);
    }
}