import { SourceFileStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { VdmComplexType } from '../vdm-types';
import { importDeclarations } from './imports';
import { builderFunction } from './builder-function';
import { fieldTypeClass } from './field-type-class';
import { complexTypeNamespace } from './namespace';
import { complexTypeInterface } from '.';

export function complexTypeSourceFile(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion,
  includeBuilderFunction= true,
  includeFieldTypeClass= true,
  includeComplexTypeNamespace=true,

): SourceFileStructure {
  const statements:  SourceFileStructure['statements'] = [
    ...importDeclarations(complexType, oDataVersion),
      complexTypeInterface(complexType),
  ];
  if(includeBuilderFunction) {
    statements.push(builderFunction(complexType));
}
  if(includeFieldTypeClass){
    statements.push(fieldTypeClass(complexType, oDataVersion));
  }
  if(includeComplexTypeNamespace){
    statements.push(complexTypeNamespace(complexType, oDataVersion));
  }

  return {
    kind: StructureKind.SourceFile,
    statements
  };
}
