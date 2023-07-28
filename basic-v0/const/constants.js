/** @param {NS} ns */

// Hosts -- basic global constants
export const DEFAULT_TARGET = 'n00dles'; 
export const DEFAULT_HOME   = 'home'; // home server name

// Hacking, growing and weakening global constants
export const MIN_DELAY = 10;    // milliseconds delay between actions
export const MIN_YIELD = 0.01;  // Min yield from banks
export const HACKING_PERCENTAGE = 0.1; // Percentage of total money to hack
export const EPSILON   = 1.5; // Multiplier for grow and weaken2

// Hacking, growing and weakening files
export const dHACK     = '/shared/dHack.js';
export const dGROW     = '/shared/dGrow.js';
export const dWEAK     = '/shared/dWeak.js';
export const fFARM_EXP = 'w1.js'; // script to farm experience (by weakening 'n00dles')
export const fFARM_REP = 's1.js'; // script to farm reputation (by sharing server time)


// Stocks -- Basic global constants
export const TIX_TX_FEE   = 100e3; // Transaction costs = 100k from https://github.com/bitburner-official/bitburner-src/blob/dev/src/Constants.ts#L148
export const CASH_RESERVE = 100e9; // 100 Billion to upgrade purchased servers

// Data -- Basic data file locations
export const SERVERS_DATA     = '/data/servers-data.txt';
export const BANKS_DATA       = '/data/banks-data.txt';
export const BOTS_DATA        = '/data/bots-data.txt';
export const PURCHASED_PREFIX = 'pserv-';
export const HACKNET_PREFIX   = 'hacknet';
export const SETUP_FILES      = ['/setup/bank-setup.js','/setup/bots-setup.js', '/setup/server-setup.js'];
export const CONSTANTS_FILE   = ['/const/constants.js'];
export const HELPER_FILES     = ['/utils/utils-hack.js', '/utils/all-servers.js',
  '/utils/get-server-stats.js', '/utils/hack-strategy.2.js', '/utils/hack-strategy.3.js',
  '/utils/hack-strategy.js', '/utils/logger.js', '/utils/server-data.js', '/utils/share-power.js', 
  '/utils/utils-hack.js', '/utils/yield-analysis.js'];
export const EXPLOIT_FILES    = ['exploits/dev-menu.js'];
export const ALL_FILES        = [...HELPER_FILES, ...SETUP_FILES, ...CONSTANTS_FILE]; 

/*
// Don't use this, it adds 0.25 GB to the file
export const PORT_CRACKERS = (ns) => ([
    { name: "BruteSSH.exe", method: (target) => ns.brutessh(target) },
    { name: "FTPCrack.exe", method: (target) => ns.ftpcrack(target) },
    { name: "relaySMTP.exe", method: (target) => ns.relaysmtp(target) },
    { name: "HTTPworm.exe", method: (target) => ns.httpworm(target) },
    { name: "SQLInject.exe", method: (target) => ns.sqlinject(target) },
  ]);
*/
/*
// Logging -- Don't use this yet. It's for logging across all scripts

// Define log level
const logLevel = 'WARN';  // Change this to control verbosity

// Define log levels
export const levels = {
  'DEBUG': 1,
  'INFO': 2,
  'WARN': 3,
  'ERROR': 4
};

// Create logging function
export function log(ns, level, message) {
  if (levels[level] >= levels[logLevel]) {
    ns.print(`[${level}]: ${message}`);
  }
}
*/


