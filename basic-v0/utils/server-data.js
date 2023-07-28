/** @param {NS} ns */

export class ServerData {
  constructor(ns, filename) {
    this.ns = ns;
    this.filename = filename;
    this.data = null;
  }
  
  async loadData() {
    if (!this.ns.fileExists(this.filename)) {
      throw new Error(`File ${this.filename} does not exist.`);
    }
    const fileContent = await this.ns.read(this.filename);
    this.data = JSON.parse(fileContent);
  }

  async loadServer(hostname) {
    if (this.data === null) {
      await this.loadData();
    }
    return this.data.find(server => server.hostname === hostname);
  }  

  async getAllHostnames() {
    if (this.data === null) {
      await this.loadData();
    }
    return this.data.map(server => server.hostname);
  }
}
