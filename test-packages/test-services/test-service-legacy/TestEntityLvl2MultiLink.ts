/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import {
  AllFields,
  BooleanField,
  CustomField,
  Entity,
  EntityBuilderType,
  Field,
  NumberField,
  Selectable,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
export class TestEntityLvl2MultiLink
  extends Entity
  implements TestEntityLvl2MultiLinkType
{
  /**
   * Technical entity name for TestEntityLvl2MultiLink.
   */
  static _entityName = 'A_TestEntityLvl2MultiLink';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntityLvl2MultiLink.
   */
  static _serviceName = 'API_TEST_SRV';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: string;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;

  /**
   * Returns an entity builder to construct instances `TestEntityLvl2MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static builder(): EntityBuilderType<
    TestEntityLvl2MultiLink,
    TestEntityLvl2MultiLinkTypeForceMandatory
  > {
    return Entity.entityBuilder(TestEntityLvl2MultiLink);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2MultiLink` entity type.
   * @returns A `TestEntityLvl2MultiLink` request builder.
   */
  static requestBuilder(): TestEntityLvl2MultiLinkRequestBuilder {
    return new TestEntityLvl2MultiLinkRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static customField(fieldName: string): CustomField<TestEntityLvl2MultiLink> {
    return Entity.customFieldSelector(fieldName, TestEntityLvl2MultiLink);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityLvl2MultiLinkType {
  keyProperty: string;
  stringProperty?: string;
  booleanProperty?: boolean;
  guidProperty?: string;
  int16Property?: number;
}

export interface TestEntityLvl2MultiLinkTypeForceMandatory {
  keyProperty: string;
  stringProperty: string;
  booleanProperty: boolean;
  guidProperty: string;
  int16Property: number;
}

export namespace TestEntityLvl2MultiLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY: StringField<TestEntityLvl2MultiLink> =
    new StringField('KeyProperty', TestEntityLvl2MultiLink, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntityLvl2MultiLink> =
    new StringField('StringProperty', TestEntityLvl2MultiLink, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntityLvl2MultiLink> =
    new BooleanField('BooleanProperty', TestEntityLvl2MultiLink, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntityLvl2MultiLink> =
    new StringField('GuidProperty', TestEntityLvl2MultiLink, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<TestEntityLvl2MultiLink> =
    new NumberField('Int16Property', TestEntityLvl2MultiLink, 'Edm.Int16');
  /**
   * All fields of the TestEntityLvl2MultiLink entity.
   */
  export const _allFields: Array<
    | StringField<TestEntityLvl2MultiLink>
    | BooleanField<TestEntityLvl2MultiLink>
    | NumberField<TestEntityLvl2MultiLink>
  > = [
    TestEntityLvl2MultiLink.KEY_PROPERTY,
    TestEntityLvl2MultiLink.STRING_PROPERTY,
    TestEntityLvl2MultiLink.BOOLEAN_PROPERTY,
    TestEntityLvl2MultiLink.GUID_PROPERTY,
    TestEntityLvl2MultiLink.INT_16_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntityLvl2MultiLink> = new AllFields(
    '*',
    TestEntityLvl2MultiLink
  );
  /**
   * All key fields of the TestEntityLvl2MultiLink entity.
   */
  export const _keyFields: Array<Selectable<TestEntityLvl2MultiLink>> = [
    TestEntityLvl2MultiLink.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2MultiLink.
   */
  export const _keys: {
    [keys: string]: Selectable<TestEntityLvl2MultiLink>;
  } = TestEntityLvl2MultiLink._keyFields.reduce(
    (
      acc: { [keys: string]: Selectable<TestEntityLvl2MultiLink> },
      field: Selectable<TestEntityLvl2MultiLink>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
