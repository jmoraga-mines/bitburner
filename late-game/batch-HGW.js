/** @param {NS} ns */
// batch-HGW.js



export async function main(ns) {
    const hosts = [
        'hong-fang-tea', 'sigma-cosmetics', 'joesguns', 'nectar-net', 'hong-fang-tea', 'harakiri-sushi', 'neo-net',
        'zer0', 'max-hardware', 'iron-gym', 'phantasy', 'silver-helix', 'omega-net', 'crush-fitness', 'the-hub',
        'johnson-ortho', 'comptek', 'netlink', 'rothman-uni', 'catalyst', 'summit-uni', 'aevum-police',
        'rho-construction', 'millenium-fitness', 'alpha-ent', 'syscore', 'lexo-corp', 'zb-institute', 'snap-fitness',
        'global-pharm', 'unitalife', 'galactic-cyber', 'solaris', 'zeus-med', 'aerocorp', 'univ-energy', 'deltaone',
        'omnia', 'defcomm', 'icarus', 'zb-def', 'nova-med', 'taiyang-digital', 'infocomm', 'run4theh111z', 'titan-labs',
        'microdyne', 'fulcrumtech', 'stormtech', 'kuai-gong', '.', 'b-and-a', 'nwo', 'applied-energetics', 'helios',
        '4sigma', 'blade', 'clarkinc', 'fulcrumassets', 'vitalife', 'omnitek', 'powerhouse-fitness', 'ecorp', 'megacorp',
        'The-Cave', 'w0r1d_d43m0n'
    ];

    const orderedHosts = [];
    const orderedMoney = [];

    const formulas = ns.formulas.hacking;
    const player = ns.getPlayer();
    const serverRam = ns.args[0];
    const hackscriptRam = ns.getScriptRam('/newserver/hack.js');
    const growscriptRam = ns.getScriptRam('/newserver/grow.js');
    const weakenscriptRam = ns.getScriptRam('/newserver/weaken.js');

    let rhosts = hosts.filter((host) => ns.hasRootAccess(host));
    let totalRamForRun = 0;
    let runs = 0;

    for (let i = 0; i < rhosts.length; i++) {
        const fserver = ns.getServer(rhosts[i]);
        const f = fserver.minDifficulty;
        const growPercent = formulas.growPercent(fserver, 1, player, 1);
        const hackPercent = formulas.hackPercent(fserver, player) * 100;

        const growThreads = Math.round(2.3 / (growPercent - 1));
        const hackThreads = Math.round(50 / hackPercent);
        let weakenThreads = 2000 - ns.getServerMinSecurityLevel(rhosts[i]) / 0.05;
        weakenThreads = Math.round(weakenThreads - growThreads * 0.004 - hackThreads * 0.002);

        totalRamForRun = hackscriptRam * hackThreads + growscriptRam * growThreads + weakenscriptRam * weakenThreads;
        runs = Math.floor(ns.getServerMaxRam('home') / totalRamForRun);
        const weakenTime = formulas.weakenTime(fserver, player) / 1000;

        let chmm = ns.getServerMaxMoney(rhosts[i]);
        let mps = (chmm / weakenTime) * (serverRam / totalRamForRun);
        chmm = mps;

        if (serverRam < totalRamForRun) {
            continue;
        }

        const item = orderedHosts.find((server) => server === rhosts[i]);
        if (item || !ns.hasRootAccess(rhosts[i])) {
            continue;
        }

        orderedMoney.push(chmm);
        orderedHosts.push(rhosts[i]);
    }

    const sortedIndices = orderedMoney.map((_, index) => index).sort((a, b) => orderedMoney[b] - orderedMoney[a]);
    const sortedHosts = sortedIndices.map((index) => orderedHosts[index]);

    ns.print(sortedHosts);
}
