# turing_machine

A simple [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) simulator with an infinite tape visualizer, implemented in [functional programming](https://en.wikipedia.org/wiki/Functional_programming) paradigm.

![Recordit GIF](https://raw.githubusercontent.com/MapReduceMages/turing_machine/master/.demo/screenshots.gif)

- Select or create a new instruction set
- load an input in the tape
- run the machine
- play with the tape visualization
- check the output

![Recordit GIF](https://raw.githubusercontent.com/MapReduceMages/turing_machine/master/.demo/tape.gif)

# Setup

```bash
npm install
```

# Run

```bash
npm run dev
# check localhost:5173
```

# Tests

```bash
npm run test
```

<img src="https://github.com/MapReduceMages/turing_machine/blob/main/.demo/tests.png" alt="tests" width="250"/>

# Algorithm

The machine is a simple state machine constituted by:
- a tape
- a head
- a set of instructions
- a set of states
- a current state

The machine reads the tape at the head position and looks for an instruction that matches the current [state](https://en.wikipedia.org/wiki/Finite-state_machine) and the current symbol.
According to this state instruction, the machine writes a new symbol, moves the head to the left or to the right, and changes to a new state.
And so on until the machine reaches a final state.

# About

The [Turing machine](https://en.wikipedia.org/wiki/Turing_machine), conceptualized by British mathematician [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) in 1936, was introduced in his paper "On Computable Numbers", with an Application to the [Entscheidungsproblem](https://en.wikipedia.org/wiki/Entscheidungsproblem). This work was pivotal in the emerging fields of mathematical logic and computation theory in the early 20th century.

During World War II, Alan Turing played a crucial role in breaking the [Nazi Enigma code](https://en.wikipedia.org/wiki/Enigma_machine) at [Bletchley Park](https://en.wikipedia.org/wiki/Bletchley_Park), significantly contributing to the Allied war effort and saving countless lives. This experience influenced his ideas about computation and the potential of machines to perform complex tasks.

A Turing machine is a theoretical device that can simulate any computer algorithm. It has an infinite tape divided into cells, each holding a symbol, and a read/write head that moves along the tape, reading and writing symbols based on predefined rules (instructions).

A Turing machine operates based on states and transitions. At any time, it is in a specific state with the read/write head on a particular tape cell. Depending on the symbol read and the current state, it can write a new symbol, change states, and move the head left or right. This mechanism allows it to model any numerical computation or algorithm.