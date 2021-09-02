import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  coreImportDeclaration,
  coreNavPropertyFieldTypeImportNames,
  corePropertyFieldTypeImportNames,
  corePropertyTypeImportNames,
  enumTypeImportDeclarations,
  externalImportDeclarations
} from '../imports';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import { cmdArgs } from '../generator-options';

export function importDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  const versionInCap = caps(oDataVersion);
  let imports = [
    ...externalImportDeclarations(entity.properties),
    ...complexTypeImportDeclarations(entity.properties),
    ...enumTypeImportDeclarations(entity.properties)
  ];
  if (cmdArgs.generateRequestBuilder) {
    imports = [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: `./${entity.className}RequestBuilder`,
        namedImports: [`${entity.className}RequestBuilder`]
      },
      ...imports
    ];
  }
  if (!cmdArgs.generateTypeOnly) {
    imports = [
      ...imports,
      coreImportDeclaration(
        [
          ...corePropertyTypeImportNames(entity.properties),
          ...corePropertyFieldTypeImportNames(entity.properties),
          ...coreNavPropertyFieldTypeImportNames(
            entity.navigationProperties,
            oDataVersion
          ),
          ...(cmdArgs.generateRequestBuilder ? [] : ['RequestBuilder']),
          'AllFields',
          `CustomField${versionInCap}`,
          `Entity${versionInCap}`,
          'EntityBuilderType',
          'Field'
        ].sort()
      )
    ];
  }
  return imports;
}

export function otherEntityImports(
  entity: VdmEntity,
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  return Array.from(new Set(entity.navigationProperties.map(n => n.to)))
    .map(to => {
      const matchedEntity = service.entities.find(e => e.entityTypeName === to);
      if (!matchedEntity) {
        throw Error(
          `Failed to find the entity from the service: ${JSON.stringify(
            service
          )} for entity ${entity}`
        );
      }
      return matchedEntity.className;
    })
    .filter(name => name !== entity.className)
    .map(name => otherEntityImport(name));
}

function otherEntityImport(name: string): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: cmdArgs.generateTypeOnly
      ? [`${name}Type`]
      : [name, `${name}Type`],
    moduleSpecifier: `./${name}`
  };
}
