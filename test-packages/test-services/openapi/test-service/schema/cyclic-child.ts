/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CyclicParent } from './cyclic-parent';
/**
 * Representation of the 'CyclicChild' schema.
 */
export type CyclicChild =
  | {
      parent?: CyclicParent;
    }
  | Record<string, any>;
