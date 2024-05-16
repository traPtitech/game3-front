import type { Term } from './api'

export type TermWithName = Term & { name: string }

/**
 * タームに名前を追加する
 *
 * @param terms ターム(同一イベント)
 * @returns ターム(同一イベント)に名前を追加したもの
 */
export const addTermName = (terms: Term[]): TermWithName[] =>
  terms
    .filter(term => !term.isDefault)
    .sort((a, b) => (a.startAt > b.startAt ? 1 : -1))
    .map((term, i) => {
      return {
        ...term,
        name: `ターム${i + 1}`,
      }
    })
    .concat(
      terms
        .filter(term => term.isDefault)
        .map((term) => {
          return {
            ...term,
            name: '未割当用ターム',
          }
        }),
    )

/**
 * タームに名前を追加する
 *
 * @param terms ターム
 * @returns タームに名前を追加したもの
 */
export const termsWithName = (terms: Term[]) => {
  const eventTerms = Object.groupBy(terms, term => term.eventSlug)
  return Object.entries(eventTerms).flatMap(([_, terms]) => (
    terms ? addTermName(terms) : []
  ))
}
