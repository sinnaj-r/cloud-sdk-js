import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import { entityClass } from './class';
import { importDeclarations, otherEntityImports } from './imports';
import { entityTypeInterface } from './interface';
import { entityNamespace } from './namespace';

export function entitySourceFile(
  entity: VdmEntity,
  service: VdmServiceMetadata,
  includeEntityClass = true,
  includeEntityNamespace = true
): SourceFileStructure {
  const statements: SourceFileStructure['statements'] = [
    ...importDeclarations(entity, service.oDataVersion),
    ...otherEntityImports(entity, service),
    entityTypeInterface(entity, service)
  ];
  if (includeEntityClass) {
    statements.push(entityClass(entity, service));
  }
  if (includeEntityNamespace) {
    statements.push(entityNamespace(entity, service));
  }
  return {
    kind: StructureKind.SourceFile,
    statements
  };
}
