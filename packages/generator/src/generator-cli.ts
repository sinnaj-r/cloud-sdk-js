#!/usr/bin/env node

import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { generate } from './generator';
import { cmdArgs } from './generator-options';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator-cli'
});

logger.info('Parsing args...');

generate(cmdArgs)
  .then(() => logger.info('Generation of services finished successfully.'))
  .catch(err => {
    logger.error(new ErrorWithCause('Generation of services failed.', err));
    process.exit(1);
  });
