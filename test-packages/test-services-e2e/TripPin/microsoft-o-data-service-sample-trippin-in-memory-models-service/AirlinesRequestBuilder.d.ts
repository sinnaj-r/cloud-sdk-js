import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { Airlines } from './Airlines';
/**
 * Request builder class for operations supported on the [[Airlines]] entity.
 */
export declare class AirlinesRequestBuilder extends RequestBuilder<Airlines> {
  /**
   * Returns a request builder for retrieving one `Airlines` entity based on its keys.
   * @param airlineCode Key property. See [[Airlines.airlineCode]].
   * @returns A request builder for creating requests to retrieve one `Airlines` entity based on its keys.
   */
  getByKey(airlineCode: string): GetByKeyRequestBuilderV4<Airlines>;
  /**
   * Returns a request builder for querying all `Airlines` entities.
   * @returns A request builder for creating requests to retrieve all `Airlines` entities.
   */
  getAll(): GetAllRequestBuilderV4<Airlines>;
  /**
   * Returns a request builder for creating a `Airlines` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airlines`.
   */
  create(entity: Airlines): CreateRequestBuilderV4<Airlines>;
  /**
   * Returns a request builder for updating an entity of type `Airlines`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airlines`.
   */
  update(entity: Airlines): UpdateRequestBuilderV4<Airlines>;
  /**
   * Returns a request builder for deleting an entity of type `Airlines`.
   * @param airlineCode Key property. See [[Airlines.airlineCode]].
   * @returns A request builder for creating requests that delete an entity of type `Airlines`.
   */
  delete(airlineCode: string): DeleteRequestBuilderV4<Airlines>;
  /**
   * Returns a request builder for deleting an entity of type `Airlines`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Airlines` by taking the entity as a parameter.
   */
  delete(entity: Airlines): DeleteRequestBuilderV4<Airlines>;
}
//# sourceMappingURL=AirlinesRequestBuilder.d.ts.map
