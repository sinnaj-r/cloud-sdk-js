import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import { collectNavProps } from './nav-props-json';

function normalizrEntities(entities: VdmEntity[]): string[] {
  const collectedNavProps = collectNavProps(entities);
  const entityStatements: string[] = [];
  const defineStatements: string[] = [];
  const entityKeys: string[] = [];
  for (const [key, value] of Object.entries(collectedNavProps)) {
    entityStatements.push(`const ${key} = new schema.Entity('${key}');`);
    if (Object.keys(value).length > 0) {
      defineStatements.push(
        `${key}.define( ${JSON.stringify(value).replace(/["']/gi, '')});`
      );
    }
    entityKeys.push(key);
  }
  return [
    ...entityStatements,
    ...defineStatements,
    `export const normalizrEntities = {${JSON.stringify(
      entityKeys,
      null,
      2
    ).replace(/["'[\]]/gi, '')}};`
  ];
}

export function normalizrConfig(
  service: VdmServiceMetadata,
  generateRequestBuilder = true
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: 'normalizr',
        namedImports: ['schema']
      },
      ...normalizrEntities(service.entities)
    ]
  };
}
