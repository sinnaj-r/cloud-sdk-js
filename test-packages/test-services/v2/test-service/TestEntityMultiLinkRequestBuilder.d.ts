import {
  RequestBuilder,
  GetAllRequestBuilderV2,
  GetByKeyRequestBuilderV2,
  CreateRequestBuilderV2,
  UpdateRequestBuilderV2,
  DeleteRequestBuilderV2
} from '@sap-cloud-sdk/core';
import { TestEntityMultiLink } from './TestEntityMultiLink';
/**
 * Request builder class for operations supported on the [[TestEntityMultiLink]] entity.
 */
export declare class TestEntityMultiLinkRequestBuilder extends RequestBuilder<TestEntityMultiLink> {
  /**
   * Returns a request builder for retrieving one `TestEntityMultiLink` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityMultiLink.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityMultiLink` entity based on its keys.
   */
  getByKey(keyProperty: string): GetByKeyRequestBuilderV2<TestEntityMultiLink>;
  /**
   * Returns a request builder for querying all `TestEntityMultiLink` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityMultiLink` entities.
   */
  getAll(): GetAllRequestBuilderV2<TestEntityMultiLink>;
  /**
   * Returns a request builder for creating a `TestEntityMultiLink` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityMultiLink`.
   */
  create(
    entity: TestEntityMultiLink
  ): CreateRequestBuilderV2<TestEntityMultiLink>;
  /**
   * Returns a request builder for updating an entity of type `TestEntityMultiLink`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityMultiLink`.
   */
  update(
    entity: TestEntityMultiLink
  ): UpdateRequestBuilderV2<TestEntityMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityMultiLink`.
   * @param keyProperty Key property. See [[TestEntityMultiLink.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityMultiLink`.
   */
  delete(keyProperty: string): DeleteRequestBuilderV2<TestEntityMultiLink>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityMultiLink`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityMultiLink` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityMultiLink
  ): DeleteRequestBuilderV2<TestEntityMultiLink>;
}
//# sourceMappingURL=TestEntityMultiLinkRequestBuilder.d.ts.map
