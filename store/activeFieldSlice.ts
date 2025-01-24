import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export enum ActiveField {
  Hand,
  Dora,
}

export type ActiveFieldSlice = {
  activeField: ActiveField
  setActiveField: (f: ActiveField) => void
}

export const createActiveFieldSlice: StateCreator<
  BoundState,
  [],
  [],
  ActiveFieldSlice
> = set => ({
  activeField: ActiveField.Hand,
  setActiveField: f => set({ activeField: f }),
})
