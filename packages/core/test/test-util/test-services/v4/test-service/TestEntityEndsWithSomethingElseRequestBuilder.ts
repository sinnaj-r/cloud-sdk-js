/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '../../../../../src';
import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';

/**
 * Request builder class for operations supported on the [[TestEntityEndsWithSomethingElse]] entity.
 */
export class TestEntityEndsWithSomethingElseRequestBuilder extends RequestBuilder<TestEntityEndsWithSomethingElse> {
  /**
   * Returns a request builder for retrieving one `TestEntityEndsWithSomethingElse` entity based on its keys.
   * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
   * @returns A request builder for creating requests to retrieve one `TestEntityEndsWithSomethingElse` entity based on its keys.
   */
  getByKey(
    keyProperty: string
  ): GetByKeyRequestBuilderV4<TestEntityEndsWithSomethingElse> {
    return new GetByKeyRequestBuilderV4(TestEntityEndsWithSomethingElse, {
      KeyProperty: keyProperty
    });
  }

  /**
   * Returns a request builder for querying all `TestEntityEndsWithSomethingElse` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntityEndsWithSomethingElse` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntityEndsWithSomethingElse> {
    return new GetAllRequestBuilderV4(TestEntityEndsWithSomethingElse);
  }

  /**
   * Returns a request builder for creating a `TestEntityEndsWithSomethingElse` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntityEndsWithSomethingElse`.
   */
  create(
    entity: TestEntityEndsWithSomethingElse
  ): CreateRequestBuilderV4<TestEntityEndsWithSomethingElse> {
    return new CreateRequestBuilderV4(TestEntityEndsWithSomethingElse, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntityEndsWithSomethingElse`.
   */
  update(
    entity: TestEntityEndsWithSomethingElse
  ): UpdateRequestBuilderV4<TestEntityEndsWithSomethingElse> {
    return new UpdateRequestBuilderV4(TestEntityEndsWithSomethingElse, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
   * @param keyProperty Key property. See [[TestEntityEndsWithSomethingElse.keyProperty]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse`.
   */
  delete(
    keyProperty: string
  ): DeleteRequestBuilderV4<TestEntityEndsWithSomethingElse>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntityEndsWithSomethingElse`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntityEndsWithSomethingElse` by taking the entity as a parameter.
   */
  delete(
    entity: TestEntityEndsWithSomethingElse
  ): DeleteRequestBuilderV4<TestEntityEndsWithSomethingElse>;
  delete(
    keyPropertyOrEntity: any
  ): DeleteRequestBuilderV4<TestEntityEndsWithSomethingElse> {
    return new DeleteRequestBuilderV4(
      TestEntityEndsWithSomethingElse,
      keyPropertyOrEntity instanceof TestEntityEndsWithSomethingElse
        ? keyPropertyOrEntity
        : { KeyProperty: keyPropertyOrEntity! }
    );
  }
}
