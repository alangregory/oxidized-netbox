import OxidizedSync from "../libraries/OxidizedSync";

(async () => {
    const oxidizedSync = new OxidizedSync();
    await oxidizedSync.sync();
})();