import { OpenAPIV3 } from 'openapi-types';
import { createTestRefs, emptyDocument } from '../../test/test-util';
import { apiNameExtension } from '../extensions';
import { parseApis } from './api';
import { createRefs } from './refs';

const options = { strictNaming: true };
describe('parseApis', () => {
  it('throws an error if there are APIs without paths', async () => {
    const refs = await createTestRefs();
    expect(() =>
      parseApis(emptyDocument, refs, options)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not parse APIs. The document does not contain any operations."'
    );
  });

  it('parses APIs based on tags', async () => {
    const document: OpenAPIV3.Document = {
      ...emptyDocument,
      paths: {
        '/x': {
          get: {
            tags: ['api1'],
            operationId: 'getX'
          },
          post: {
            tags: ['api2'],
            operationId: 'createX'
          }
        },
        '/y': {
          get: {
            tags: ['api1'],
            operationId: 'getY'
          },
          post: {
            tags: ['api2'],
            operationId: 'createY'
          }
        },
        '/z': {
          get: {
            operationId: 'getZ'
          }
        }
      }
    };

    expect(
      parseApis(document, await createRefs(document, options), options)
    ).toStrictEqual([
      {
        name: 'Api1Api',
        operations: [
          expect.objectContaining({
            operationId: 'getX'
          }),
          expect.objectContaining({
            operationId: 'getY'
          })
        ]
      },
      {
        name: 'Api2Api',
        operations: [
          expect.objectContaining({
            operationId: 'createX'
          }),
          expect.objectContaining({
            operationId: 'createY'
          })
        ]
      },
      {
        name: 'DefaultApi',
        operations: [
          expect.objectContaining({
            operationId: 'getZ'
          })
        ]
      }
    ]);
  });

  it('parses APIs based on extensions', async () => {
    const document = {
      ...emptyDocument,
      [apiNameExtension]: 'root',
      paths: {
        '/x': {
          [apiNameExtension]: 'path',
          get: {
            tags: ['api1'],
            [apiNameExtension]: 'operationWithTag',
            operationId: 'operationWithTagOperation'
          },
          post: {
            [apiNameExtension]: 'operationWithoutTag',
            operationId: 'operationWithoutTagOperation'
          },
          delete: {
            operationId: 'pathOperation'
          }
        },
        '/y': {
          get: {
            tags: ['api1'],
            operationId: 'rootOperation'
          }
        }
      }
    };

    expect(
      parseApis(document, await createRefs(document, options), options)
    ).toStrictEqual([
      {
        name: 'OperationWithTagApi',
        operations: [
          expect.objectContaining({
            operationId: 'operationWithTagOperation'
          })
        ]
      },
      {
        name: 'OperationWithoutTagApi',
        operations: [
          expect.objectContaining({
            operationId: 'operationWithoutTagOperation'
          })
        ]
      },
      {
        name: 'PathApi',
        operations: [
          expect.objectContaining({
            operationId: 'pathOperation'
          })
        ]
      },
      {
        name: 'RootApi',
        operations: [
          expect.objectContaining({
            operationId: 'rootOperation'
          })
        ]
      }
    ]);
  });

  it("parses API names without trailing 'api'", async () => {
    const document = {
      ...emptyDocument,
      [apiNameExtension]: 'RootApi',
      paths: {
        '/x': {
          get: {
            tags: [],
            operationId: 'someOperation'
          }
        }
      }
    };

    expect(
      parseApis(document, await createRefs(document, options), options)
    ).toStrictEqual([
      {
        name: 'RootApi',
        operations: [
          expect.objectContaining({
            operationId: 'someOperation'
          })
        ]
      }
    ]);
  });
});
