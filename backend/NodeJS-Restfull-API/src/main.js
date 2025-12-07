import { web } from "./application/web.js";
import { logger } from "./application/logging.js";


if (process.env.NODE_ENV !== 'test') {
    web.listen(3000, () => {
        logger.info("App start");
    });
}

export default web;