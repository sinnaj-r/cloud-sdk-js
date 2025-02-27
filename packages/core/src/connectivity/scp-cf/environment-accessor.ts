import { createLogger, ErrorWithCause, first } from '@sap-cloud-sdk/util';
import * as xsenv from '@sap/xsenv';
import { JwtPayload } from 'jsonwebtoken';
import { audiences, decodeJwt } from './jwt';
import {
  DestinationServiceCredentials,
  Service,
  ServiceCredentials,
  XsuaaServiceCredentials
} from './environment-accessor-types';
import { ClientCredentials } from './xsuaa-service-types';

const logger = createLogger({
  package: 'core',
  messageContext: 'environment-accessor'
});

/**
 * Basic Credentials Getter from Destination service credentials needed for JWT generator.
 *
 * @returns Basic credentials.
 */
export function getDestinationBasicCredentials(): BasicCredentials {
  const destinationCredentials = getDestinationServiceCredentials();
  const basicCredentials: BasicCredentials = {
    clientid: destinationCredentials.clientid
      ? destinationCredentials.clientid
      : null,
    clientsecret: destinationCredentials.clientsecret
      ? destinationCredentials.clientsecret
      : null
  };
  return basicCredentials;
}

/**
 * First 'destination' credentials getter.
 *
 * @returns The 'destination' credentials object or `null`, if it does not exist.
 */
export function getDestinationServiceCredentials(): any {
  return first(getDestinationServiceCredentialsList());
}

/**
 * Destination credentials getter.
 *
 * @returns A list of 'credentials' objects in 'destination' service.
 */
export function getDestinationServiceCredentialsList(): DestinationServiceCredentials[] {
  return getServiceList('destination').map(
    s => s.credentials as DestinationServiceCredentials
  );
}

/**
 * Credentials list getter for a given service.
 * @param service - Service name
 * @returns Fetched credentials objects of existing service in 'VCAP_SERVICES'.
 */
export function getServiceCredentialsList(service: string): any[] {
  const credentials: any[] = [];
  getServiceList(service).forEach(entry => {
    if ('credentials' in entry) {
      credentials.push(entry['credentials']);
    } else {
      logger.warn(
        `Skipping a service in ${service}. Object has no 'credentials'.`
      );
    }
  });

  return credentials;
}

/**
 * Services getter for a given service.
 * @param service - Service name.
 * @returns List of service bindings of the given type. Returns an empty array if no service binding exists for the given type.
 */
export function getServiceList(service: string): Service[] {
  return xsenv.filterServices({ label: service }); // TODO: how do we allow propagating custom secret paths for k8s?
}

/**
 * Returns the first found instance for the given service type.
 * @param service - The service type.
 * @returns The first found service.
 */
export function getService(service: string): Service | undefined {
  const services: Service[] = xsenv.filterServices({ label: service });

  if (!services.length) {
    logger.warn(
      `No services of type ${service} found! This might cause errors in other parts of the application.`
    );

    return undefined;
  }
  if (services.length > 1) {
    logger.warn(
      `Found more than one service instance for service type ${service}. Found: ${services
        .map(s => s.name)
        .join(', ')}. Selecting the first one.`
    );
  }

  return services[0];
}

/**
 * Get destination service if one is present.
 *
 * @returns Destination service
 * @throws Error in case no destination service is found in the VCAP variables
 */
export function getDestinationService(): Service {
  const destinationService = getService('destination');

  if (!destinationService) {
    throw Error('No binding to a destination service found.');
  }
  return destinationService;
}

/**
 * 'VCAP_SERVICES' Getter from environment variables.
 * This function returns the VCAP_SERVICES as object or `null`, if it is not defined (i.e. no services are bound to the application).
 *
 * @returns 'VCAP_SERVICES' found in environment variables or `null`, if not defined. The key denotes the name ov the service and the value is the definition.
 */
export function getVcapService(): Record<string, any> | null {
  const env = getEnvironmentVariable('VCAP_SERVICES');
  let vcapServices: Record<string, any>;
  if (!env) {
    logger.warn("Environment variable 'VCAP_SERVICES' is not defined.");
    return null;
  }
  try {
    vcapServices = JSON.parse(env);
  } catch (error) {
    throw new ErrorWithCause(
      "Failed to parse environment variable 'VCAP_SERVICES'.",
      error
    );
  }
  if (!Object.keys(vcapServices).length) {
    throw new Error(
      "Environment variable 'VCAP_SERVICES' is defined but empty. This should not happen."
    );
  }

  return vcapServices;
}

/**
 * Environment variables accessor.
 * @param name - Environment variable name.
 * @returns Env variable value if defined.
 *           null: If not defined.
 */
export function getEnvironmentVariable(
  name: string
): string | undefined | null {
  if (process.env[name]) {
    return process.env[name];
  }
  logger.info('Environment variable ' + name + ' is not defined.');
  return null;
}

/**
 * Destination URI getter
 * NOTICE: If there exist more than one destination/uri, the function
 * returns the first entry.
 *
 * @returns The first existing uri in destination or `null`, if not found.
 */
export function getDestinationServiceUri(): string | null {
  const destinationServiceCredentials = getDestinationServiceCredentialsList();
  const uris: string[] = [];
  for (const credential of destinationServiceCredentials) {
    if ('uri' in credential) {
      uris.push(credential['uri']);
    } else {
      logger.info(
        "Skipping credentials in 'destination'. 'uri' property not defined"
      );
    }
  }
  return uris[0] || null;
}

/**
 * Takes a decoded JWT and uses the client_id and audience claims to determine the XSUAA service instance
 * that issued the JWT. Returns the credentials if a match is found, otherwise throws an error.
 * If no decoded JWT is specified, then returns the first existing XSUAA credential service plan "application".
 * @param token - Either an encoded or decoded JWT.
 * @returns The credentials for a match, otherwise `null`.
 */
export function getXsuaaServiceCredentials(
  token?: JwtPayload | string
): XsuaaServiceCredentials {
  if (typeof token === 'string') {
    return getXsuaaServiceCredentials(decodeJwt(token)); // Decode without verifying
  }
  return selectXsuaaInstance(token);
}

/**
 * Takes a string that represents the service type and resolves it by calling [[getService]].
 * If the parameter is already an instance of [[Service]], it is returned directly.
 *
 * Throws an error when no service can be found for the given type.
 * @param service - A string representing the service type or a [[Service]] instance.
 * @returns A [[Service]] instance.
 */
export function resolveService(service: string | Service): Service {
  if (typeof service === 'string') {
    const serviceInstance = getService(service);

    if (!serviceInstance) {
      throw Error(
        `Unable to get access token for "${service}" service. No service instance of type "${service}" found.`
      );
    }

    return serviceInstance;
  }
  return service;
}

/**
 * Extracts the credentials of a service into an instance of [[ClientCredentials]].
 * @param serviceCreds - The credentials of a service as read from VCAP_SERVICES.
 * @returns A [[ClientCredentials]] instance.
 */
export function extractClientCredentials(
  serviceCreds: ServiceCredentials
): ClientCredentials {
  return {
    username: serviceCreds.clientid,
    password: serviceCreds.clientsecret
  };
}

function selectXsuaaInstance(token?: JwtPayload): XsuaaServiceCredentials {
  const xsuaaInstances = getServiceList('xsuaa');

  if (!xsuaaInstances.length) {
    throw Error(
      'No binding to an XSUAA service instance found. Please make sure to bind an instance of the XSUAA service to your application.'
    );
  }

  const strategies = [matchingClientId, matchingAudience, takeFirstAndWarn];
  const selected = applyStrategiesInOrder(strategies, xsuaaInstances, token);

  if (selected.length === 0) {
    throw Error('No XSUAA instances are found from the given JWT.');
  }

  if (selected.length > 1) {
    logger.warn(
      `Multiple XSUAA instances could be matched to the given JWT! Choosing the first one (xsappname: ${
        first(selected)!.credentials.xsappname
      }).`
    );
  }

  return first(selected)!.credentials;
}

function applyStrategiesInOrder(
  selectionStrategies: SelectionStrategyFn[],
  xsuaaInstances: Record<string, any>[],
  token?: JwtPayload
): Record<string, any>[] {
  return selectionStrategies.reduce(
    (result, strategy) =>
      result.length ? result : strategy(xsuaaInstances, token),
    []
  );
}

type SelectionStrategyFn = (
  xsuaaInstances: Record<string, any>[],
  token?: JwtPayload
) => Record<string, any>[];

function matchingClientId(
  xsuaaInstances: Record<string, any>[],
  token?: JwtPayload
): Record<string, any>[] {
  if (!token) {
    return [];
  }
  return xsuaaInstances.filter(
    xsuaa => xsuaa.credentials.clientid === token.client_id
  );
}

function matchingAudience(
  xsuaaInstances: Record<string, any>[],
  token?: JwtPayload
): Record<string, any>[] {
  if (!token) {
    return [];
  }
  return xsuaaInstances.filter(xsuaa =>
    audiences(token).has(xsuaa.credentials.xsappname)
  );
}

function takeFirstAndWarn(
  xsuaaInstances: Record<string, any>[]
): Record<string, any>[] {
  logger.warn(
    `Unable to match a specific XSUAA service instance to the given JWT. The following XSUAA instances are bound: ${xsuaaInstances.map(
      x => x.credentials.xsappname
    )}. The following one will be selected: ${
      xsuaaInstances[0].credentials.xsappname
    }. This might produce errors in other parts of the system!`
  );
  return xsuaaInstances.slice(0, 1);
}

interface BasicCredentials {
  clientid: string;
  clientsecret: string;
}

/**
 * @deprecated Since v1.5.0. Use directly exported functions instead
 */
export const EnvironmentAccessor = {
  getDestinationBasicCredentials,
  getDestinationServiceCredentials,
  getDestinationServiceCredentialsList,
  getServiceCredentialsList,
  getServiceList,
  getVcapService,
  getEnvironmentVariable,
  getDestinationServiceUri,
  getXsuaaServiceCredentials
};
