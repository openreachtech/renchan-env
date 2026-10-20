'use strict'

/**
 * Separator of a value into an array of values.
 */
class ValueSeparator {
  /**
   * Constructor of ValueSeparator.
   *
   * @param {{
   *   delimiter: string
   * }} params - Parameters of constructor.
   */
  constructor ({
    delimiter,
  }) {
    this.delimiter = delimiter
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ValueSeparator ? X : never} T, X
   * @param {{
   *   delimiter?: string
   * }} [params] - Parameters for the factory method.
   * @returns {InstanceType<T>} Instance of this class.
   * @this {T}
   * @public
   */
  static create ({
    delimiter = ',',
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        delimiter,
      })
    )
  }

  /**
   * Separate a value into an array of trimmed and not empty values.
   *
   * @param {{
   *   value: string | null
   * }} params - Parameters.
   * @returns {Array<string>} Separated values, empty when the value has none.
   * @public
   */
  separateValue ({
    value,
  }) {
    if (!value) {
      return []
    }

    return value
      .split(this.delimiter)
      .map(it => it.trim())
      .filter(it => it !== '')
  }
}

module.exports = ValueSeparator
