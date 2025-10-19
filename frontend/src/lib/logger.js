const isProd = import.meta.env.PROD;

export const logInfo = (...args) => { if (!isProd) console.info(...args); };
export const logError = (...args) => { if (!isProd) console.error(...args); };
export const logDebug = (...args) => { if (!isProd) console.debug(...args); };

export default { logInfo, logError, logDebug };


