import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { TestEntity2 } from './TestEntity2';
/**
 * Request builder class for operations supported on the [[TestEntity2]] entity.
 */
export declare class TestEntity2RequestBuilder extends RequestBuilder<TestEntity2> {
  /**
   * Returns a request builder for retrieving one `TestEntity2` entity based on its keys.
   * @param keyPropertyString Key property. See [[TestEntity2.keyPropertyString]].
   * @returns A request builder for creating requests to retrieve one `TestEntity2` entity based on its keys.
   */
  getByKey(keyPropertyString: string): GetByKeyRequestBuilderV4<TestEntity2>;
  /**
   * Returns a request builder for querying all `TestEntity2` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity2` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntity2>;
  /**
   * Returns a request builder for creating a `TestEntity2` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity2`.
   */
  create(entity: TestEntity2): CreateRequestBuilderV4<TestEntity2>;
  /**
   * Returns a request builder for updating an entity of type `TestEntity2`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity2`.
   */
  update(entity: TestEntity2): UpdateRequestBuilderV4<TestEntity2>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity2`.
   * @param keyPropertyString Key property. See [[TestEntity2.keyPropertyString]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity2`.
   */
  delete(keyPropertyString: string): DeleteRequestBuilderV4<TestEntity2>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity2`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity2` by taking the entity as a parameter.
   */
  delete(entity: TestEntity2): DeleteRequestBuilderV4<TestEntity2>;
}
//# sourceMappingURL=TestEntity2RequestBuilder.d.ts.map
