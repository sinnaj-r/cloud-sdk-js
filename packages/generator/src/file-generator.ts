import { readFileSync } from 'fs';
import { resolve } from 'path';
import { codeBlock, createLogger } from '@sap-cloud-sdk/util';
import { Directory, SourceFile, SourceFileStructure } from 'ts-morph';

const logger = createLogger({
  package: 'generator',
  messageContext: 'file-generator'
});

export function sourceFile(
  directory: Directory,
  relativePath: string,
  content: SourceFileStructure,
  overwrite: boolean
): SourceFile {
  const file = directory.createSourceFile(
    `${relativePath}.ts`,
    addFileComment(content),
    {
      overwrite
    }
  );

  file.formatText({ insertSpaceAfterCommaDelimiter: true });
  return file;
}

export function otherFile(
  directory: Directory,
  relativePath: string,
  content: string,
  overwrite: boolean
): SourceFile {
  return directory.createSourceFile(relativePath, content, {
    overwrite
  });
}

export function copyFile(
  fromPath: string,
  toRelativePath: string,
  toDirectory: Directory,
  overwrite: boolean
): void {
  try {
    const fileContent = readFileSync(resolve(fromPath), { encoding: 'utf8' });
    toDirectory.createSourceFile(toRelativePath, fileContent, {
      overwrite
    });
  } catch (err) {
    logger.error(err);
  }
}

function addFileComment(content: SourceFileStructure): SourceFileStructure {
  content.leadingTrivia = getCopyrightHeader();
  return content;
}

// TODO 1728 move to a new package for reduce code duplication.
function getCopyrightHeader(): string {
  return codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
 `;
}
