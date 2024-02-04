import type { Term } from './api'

type TermWithName = Term & { name: string };

export const termsWithName = (terms: Term[]): TermWithName[] =>
  terms
    .filter(term => !term.isDefault)
    .sort((a, b) => (a.startAt > b.startAt ? 1 : -1))
    .map((term, i) => {
      return {
        ...term,
        name: `ターム${i + 1}`
      }
    })
    .concat(
      terms
        .filter(term => term.isDefault)
        .map((term) => {
          return {
            ...term,
            name: '未割当用ターム'
          }
        })
    )
