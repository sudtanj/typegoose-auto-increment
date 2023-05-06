import mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AutoIncrementOptionsSimple {
  /** Which Field to increment on save */
  field: string;
  /**
   * How much to increment the field by
   * @default 1
   */
  incrementBy?: number;
}

export type AutoIncrementSimplePluginOptions = AutoIncrementOptionsSimple | AutoIncrementOptionsSimple[];

export interface AutoIncrementIDOptions<T extends TimeStamps> {
  /**
   * How much to increment the field by
   * @default 1
   */
  incrementBy?: number;
  /**
   * Set the field to increment
   * -> Only use this if it is not "_id"
   * @default _id
   */
  field?: string;
  /**
   * The Tracker Collection to use to keep track of an counter for the ID
   * @default identitycounters
   */
  trackerCollection?: string;
  /**
   * Set the tracker model name
   * @default identitycounter
   */
  trackerModelName?: string;
  /**
   * the count should start at
   * @default 0
   */
  startAt?: number;
  /**
   * Overwrite what to use for the `modelName` property in the tracker document
   * This can be overwritten when wanting to use a single tracker for multiple models
   * Defaults to `document.constructor.modelName`
   */
  overwriteModelName?: string | OverwriteModelNameFunction;
  /**
   * this is use to differentiate the counter based on certain prefix
   * @default ''
   */
  prefix?: () => string | null;
  /**
   * this is use to add hook for event after the increment is done
   * @default void
   */
  postIncrement?: (val: T) => void;
}

/**
 * A function to generate the name used for the auto-increment "modelName" field
 */
export type OverwriteModelNameFunction = (modelName: string, model: mongoose.Model<any>) => string;

export interface AutoIncrementIDTrackerSpec {
  /** The ModelName from the current model */
  modelName: string;
  /** The field in the schema */
  field: string;
  /** Current Tracker count */
  count: number;
  /** prefix to differentiate counter */
  prefix: string | null;
}
