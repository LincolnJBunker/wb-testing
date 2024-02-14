import { jest } from '@jest/globals';

const mockIsWord = jest.fn(() => true);
jest.unstable_mockModule('../src/words.js', () => {
    return {
      getWord: jest.fn(() => 'APPLE'),
      isWord: mockIsWord,
    };
  });

  const { Wordle, buildLetter } = await import('../src/wordle.js')


describe('building a letter object', () => {
    test('returns a letter object', () => {
        const letter = buildLetter('A', 'PRESENT')
        expect(letter).toEqual({ letter: 'A', status: 'PRESENT' })
    })
})

describe('constructing a new Wordle game', () => {
    test('sets maxGuesses to 6 if no argument is passed', () => {
        let newInstance = new Wordle()
        expect(newInstance.maxGuesses).toBe(6)
    })

    test('sets maxGuesses to the argument passed', () => {
        let newInstance = new Wordle(10)
        expect(newInstance.maxGuesses).toBe(10)
    })

    test('set guesses to an array of length maxguesses', () => {
        let newInstance = new Wordle()
        expect(newInstance.guesses.length).toBe(6)
    })

    test('set currGuess to 0', () => {
        let newInstance = new Wordle()
        expect(newInstance.currGuess).toBe(0)
    })

    test('sets word to a word from getWord', () => {
        const newInstance = new Wordle()
        expect(newInstance.word).toBe('APPLE')
    });
});

describe('buildGuessFromWord', () => {
    test('sets the status of a correct letter to CORRECT', () => {
        let newInstance = new Wordle()
        const guess = newInstance.buildGuessFromWord('A____')
        expect(guess[0].status).toBe('CORRECT')
    })

    test('set the status of a present letter to PRESENT', () => {
        let newInstance = new Wordle()
        const guess = newInstance.buildGuessFromWord('E____')
        expect(guess[0].status).toBe('PRESENT')
    })

    test('set the status of an absent letter to ABSENT', () => {
        let newInstance = new Wordle()
        let guess = newInstance.buildGuessFromWord('Z____')
        expect(guess[0].status).toBe('ABSENT')
    });
});

describe('appendGuess', () => {
    test('throws an error if no more guesses are allowed', () => {
        let newInstance = new Wordle(1)
        expect(() => {
            let guess = newInstance.appendGuess(1)
        }).toThrow()
    })

    test('throw an error if the guess is not the length of 5', () => {
        let newInstance = new Wordle()
        expect(() => {
            let guess = newInstance.appendGuess.length.not.toBe(5)
        }).toThrow()
    })

    test('throws an error if the guess is not a word', () => {
        const wordle = new Wordle();
        mockIsWord.mockReturnValueOnce(false);
        expect(() => wordle.appendGuess('GUESS')).toThrow();
      });

    test('appends the result of buildGuessFromWord to the guessess array', () => {
        const newInstance = new Wordle()
        newInstance.appendGuess('GUESS')
        expect(newInstance.guesses[0]).toEqual(newInstance.buildGuessFromWord('GUESS'))
    })
})