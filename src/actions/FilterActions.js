import {
  STATUS_FILTER_CHANGED,
  VOCALS_FILTER_CHANGED,
  SHARKS_FILTER_CHANGED,
  SORT_TYPE_CHANGED,
  FILTER_DISPLAY_CHANGED,
  COVER_FILTER_CHANGED
 } from './types';

export const statusFilterChanged = value => (
  { type: STATUS_FILTER_CHANGED, payload: value }
)
export const vocalsFilterChanged = value => (
  { type: VOCALS_FILTER_CHANGED, payload: value }
)
export const sharksFilterChanged = value => (
  { type: SHARKS_FILTER_CHANGED, payload: value }
)
export const sortTypeChanged = value => (
  { type: SORT_TYPE_CHANGED, payload: value }
)
export const filterDisplayChanged = value => (
  { type: FILTER_DISPLAY_CHANGED, payload: value }
)
export const coverFilterChanged = value => (
  { type: COVER_FILTER_CHANGED, payload: value }
)
