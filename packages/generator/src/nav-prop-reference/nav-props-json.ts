import { unixEOL } from '@sap-cloud-sdk/util';
import { VdmEntity } from '../vdm-types';

export interface CollectedNavProps {
  [entityName: string]: {
    [property: string]: [string] | string;
  };
}

// TODO Ignore Complex Types

export function collectNavProps(entities: VdmEntity[]): CollectedNavProps {
  const obj = {};
  for (const entity of entities) {
    obj[entity.entityTypeName] = {};
    for (const navProp of entity.navigationProperties) {
      const { originalName, to, isCollection, instancePropertyName } = navProp;
      if (originalName === 'up_') {
        continue;
      }
      obj[entity.entityTypeName][instancePropertyName] = isCollection
        ? [to]
        : to;
    }
  }
  return obj;
}

export function navPropsJSON(entities: VdmEntity[]): string {
  return JSON.stringify(collectNavProps(entities), null, 2) + unixEOL;
}
