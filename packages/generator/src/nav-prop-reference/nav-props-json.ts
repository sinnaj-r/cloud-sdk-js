import { unixEOL } from '@sap-cloud-sdk/util';
import { VdmEntity } from '../vdm-types';

export function navPropsJSON(entities: VdmEntity[]): string {
  const obj = {};
  for (const entity of entities) {
    obj[entity.entityTypeName] = {};
    for (const navProp of entity.navigationProperties) {
      const { originalName, to, isCollection, instancePropertyName } = navProp;
      if (originalName === 'up_') {
        continue;
      }
      obj[entity.entityTypeName][instancePropertyName] = { to, isCollection };
    }
  }
  return JSON.stringify(obj, null, 2) + unixEOL;
}
