/**
 * Application Form Reducer
 * Manages all state updates across the multi-step form
 */

import { ApplicationData, ApplicationAction, initialApplicationData } from '@/src/types/application';

export function applicationReducer(
  state: ApplicationData,
  action: ApplicationAction
): ApplicationData {
  switch (action.type) {
    case 'UPDATE_STEP1':
      return {
        ...state,
        step1: { ...state.step1, ...action.payload },
      };

    case 'UPDATE_STEP2':
      return {
        ...state,
        step2: { ...state.step2, ...action.payload },
      };

    case 'UPDATE_STEP3':
      return {
        ...state,
        step3: { ...state.step3, ...action.payload },
      };

    case 'UPDATE_STEP4':
      return {
        ...state,
        step4: { ...state.step4, ...action.payload },
      };

    case 'UPDATE_STEP5':
      return {
        ...state,
        step5: { ...state.step5, ...action.payload },
      };

    case 'UPDATE_STEP6':
      return {
        ...state,
        step6: { ...state.step6, ...action.payload },
      };

    case 'ADD_QUOTATION':
      return {
        ...state,
        step7: {
          quotations: [...state.step7.quotations, action.payload],
        },
      };

    case 'REMOVE_QUOTATION':
      return {
        ...state,
        step7: {
          quotations: state.step7.quotations.filter(q => q.id !== action.payload),
        },
      };

    case 'UPDATE_QUOTATION':
      return {
        ...state,
        step7: {
          quotations: state.step7.quotations.map(q =>
            q.id === action.payload.id ? { ...q, ...action.payload.data } : q
          ),
        },
      };

    case 'RESET_FORM':
      return initialApplicationData;

    default:
      return state;
  }
}
