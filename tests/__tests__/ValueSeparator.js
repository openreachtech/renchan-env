'use strict'

const ValueSeparator = require('../../lib/ValueSeparator')

describe('ValueSeparator', () => {
  describe('constructor', () => {
    describe('should keep property', () => {
      describe('#delimiter', () => {
        const cases = [
          {
            input: { delimiter: ',' },
            expected: ',',
          },
          {
            input: { delimiter: '/' },
            expected: '/',
          },
          {
            input: { delimiter: '||' },
            expected: '||',
          },
        ]

        test.each(cases)('delimiter: $input.delimiter', ({ input, expected }) => {
          const valueSeparator = new ValueSeparator(input)

          expect(valueSeparator)
            .toHaveProperty('delimiter', expected)
        })
      })
    })
  })
})

describe('ValueSeparator', () => {
  describe('.create()', () => {
    describe('should be an instance of own class', () => {
      const cases = [
        {
          input: { delimiter: '/' },
        },
        {
          input: { delimiter: ';' },
        },
      ]

      test.each(cases)('delimiter: $input.delimiter', ({ input }) => {
        const valueSeparator = ValueSeparator.create(input)

        expect(valueSeparator)
          .toBeInstanceOf(ValueSeparator)
      })
    })

    describe('should call constructor', () => {
      const cases = [
        {
          tally: { delimiter: '/' },
        },
        {
          tally: { delimiter: ';' },
        },
      ]

      test.each(cases)('delimiter: $tally.delimiter', ({ tally }) => {
        const SpyClass = constructorSpy.spyOn(ValueSeparator)

        SpyClass.create(tally)

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith(tally)
      })
    })

    describe('should fill default delimiter', () => {
      test('with no arguments', () => {
        const SpyClass = constructorSpy.spyOn(ValueSeparator)

        SpyClass.create()

        expect(SpyClass.__spy__)
          .toHaveBeenCalledWith({ delimiter: ',' })
      })
    })
  })
})

describe('ValueSeparator', () => {
  describe('#separateValue()', () => {
    describe('with valid values', () => {
      describe('should return array of trimmed values', () => {
        const cases = [
          {
            input: { delimiter: ',' },
            valueCases: [
              {
                value: 'alpha,beta,gamma',
                expected: ['alpha', 'beta', 'gamma'],
              },
              {
                value: 'delta,epsilon',
                expected: ['delta', 'epsilon'],
              },
              {
                value: 'zeta',
                expected: ['zeta'],
              },
              {
                value: ' eta , theta ',
                expected: ['eta', 'theta'],
              },
              {
                value: ' ',
                expected: [],
              },
              {
                value: '',
                expected: [],
              },
            ],
          },
          {
            input: { delimiter: '/' },
            valueCases: [
              {
                value: 'iota/kappa/lambda',
                expected: ['iota', 'kappa', 'lambda'],
              },
              {
                value: 'mu/nu',
                expected: ['mu', 'nu'],
              },
              {
                value: 'xi',
                expected: ['xi'],
              },
              {
                value: ' omicron / pi ',
                expected: ['omicron', 'pi'],
              },
              {
                value: ' ',
                expected: [],
              },
              {
                value: '',
                expected: [],
              },
            ],
          },
          {
            input: { delimiter: '||' },
            valueCases: [
              {
                value: 'rho||sigma||tau',
                expected: ['rho', 'sigma', 'tau'],
              },
              {
                value: 'upsilon||phi',
                expected: ['upsilon', 'phi'],
              },
              {
                value: 'chi',
                expected: ['chi'],
              },
              {
                value: ' psi || omega ',
                expected: ['psi', 'omega'],
              },
              {
                value: ' ',
                expected: [],
              },
              {
                value: '',
                expected: [],
              },
            ],
          },
        ]

        describe.each(cases)('delimiter: $input.delimiter', ({ input, valueCases }) => {
          const valueSeparator = new ValueSeparator(input)

          test.each(valueCases)('value: $value', ({ value, expected }) => {
            const args = {
              value,
            }

            const received = valueSeparator.separateValue(args)

            expect(received)
              .toStrictEqual(expected)
          })
        })
      })

      describe('should keep what is not the delimiter', () => {
        const cases = [
          {
            input: { delimiter: '/' },
            valueCases: [
              {
                value: 'alpha,beta/gamma',
                expected: ['alpha,beta', 'gamma'],
              },
              {
                value: 'delta|epsilon',
                expected: ['delta|epsilon'],
              },
            ],
          },
          {
            input: { delimiter: '||' },
            valueCases: [
              {
                value: 'zeta|eta||theta',
                expected: ['zeta|eta', 'theta'],
              },
              {
                value: 'iota,kappa',
                expected: ['iota,kappa'],
              },
            ],
          },
        ]

        describe.each(cases)('delimiter: $input.delimiter', ({ input, valueCases }) => {
          const valueSeparator = new ValueSeparator(input)

          test.each(valueCases)('value: $value', ({ value, expected }) => {
            const args = {
              value,
            }

            const received = valueSeparator.separateValue(args)

            expect(received)
              .toStrictEqual(expected)
          })
        })
      })

      describe('should drop empty values by delimiter at special position', () => {
        const cases = [
          {
            input: { delimiter: ',' },
            valueCases: [
              {
                value: ',alpha',
                expected: ['alpha'],
              },
              {
                value: 'beta,',
                expected: ['beta'],
              },
              {
                value: ',gamma,',
                expected: ['gamma'],
              },
              {
                value: 'delta,,epsilon',
                expected: ['delta', 'epsilon'],
              },
              {
                value: ',,',
                expected: [],
              },
            ],
          },
          {
            input: { delimiter: '/' },
            valueCases: [
              {
                value: '/zeta',
                expected: ['zeta'],
              },
              {
                value: 'eta/',
                expected: ['eta'],
              },
              {
                value: '/theta/',
                expected: ['theta'],
              },
              {
                value: 'iota//kappa',
                expected: ['iota', 'kappa'],
              },
              {
                value: '//',
                expected: [],
              },
            ],
          },
          {
            input: { delimiter: '||' },
            valueCases: [
              {
                value: '||lambda',
                expected: ['lambda'],
              },
              {
                value: 'mu||',
                expected: ['mu'],
              },
              {
                value: '||nu||',
                expected: ['nu'],
              },
              {
                value: 'xi||||omicron',
                expected: ['xi', 'omicron'],
              },
              {
                value: '||||',
                expected: [],
              },
            ],
          },
        ]

        describe.each(cases)('delimiter: $input.delimiter', ({ input, valueCases }) => {
          const valueSeparator = new ValueSeparator(input)

          test.each(valueCases)('value: $value', ({ value, expected }) => {
            const args = {
              value,
            }

            const received = valueSeparator.separateValue(args)

            expect(received)
              .toStrictEqual(expected)
          })
        })
      })
    })

    describe('with invalid values', () => {
      describe('when value is null', () => {
        const cases = [
          {
            input: { delimiter: ',' },
          },
          {
            input: { delimiter: '/' },
          },
          {
            input: { delimiter: '||' },
          },
        ]

        test.each(cases)('delimiter: $input.delimiter', ({ input }) => {
          const valueSeparator = new ValueSeparator(input)
          const args = {
            value: null,
          }

          const received = valueSeparator.separateValue(args)

          expect(received)
            .toStrictEqual([])
        })
      })
    })
  })
})
