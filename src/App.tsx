import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import Theme, { ThemeControl, ThemedButton } from "./Theme";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  StateProvider,
  StateContext,
  DispatchContext,
  setMinDepth,
  setMaxDepth,
  setPopSize,
  setTheme,
} from "./GlobalState";

const Container = styled.div`
  padding: 1em;
`;

const ScreenContainer = styled.div`
  grid-column: 2/5;
  grid-row: 1/1;
  border: 1px solid ${(props) => props.theme.borders};
  transition: 0.2s;
`;

const Heading = styled.h2`
  border-bottom: 1px solid ${(props) => props.theme.borders};
  margin: 0px;
  padding: 1em 1.5em 0.8em 1em;
`;

const Content = styled.div`
  margin: 0px;
  padding: 1em 1.5em;
`;

const ScreensContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
  width: 100%;

  &.forwards > .enter {
    transform: translateX(800px);
    opacity: 0;
  }

  &.forwards > .enter-active {
    transform: translateX(0px);
    opacity: 1;
  }

  &.forwards > .exit {
    transform: translateX(0px);
    opacity: 1;
  }

  &.forwards > .exit-active {
    transform: translateX(-800px);
    opacity: 0;
  }

  &.backwards > .enter {
    transform: translateX(-800px);
    opacity: 0;
  }

  &.backwards > .enter-active {
    transform: translateX(0px);
    opacity: 1;
  }

  &.backwards > .exit {
    transform: translateX(0px);
    opacity: 1;
  }

  &.backwards > .exit-active {
    transform: translateX(800px);
    opacity: 0;
  }
`;

const WelcomeScreen = () => {
  const dispatch = useContext(DispatchContext);
  return (
    <ScreenContainer>
      <Heading>What is Imagene3?</Heading>
      <Content>
        <p>
          An application that generates interesting imagery through the use of
          Darwin's theory of evolution.
        </p>

        <p>
          <ThemedButton
            onClick={() => dispatch({ type: "PUSH_NAV", value: "information" })}
          >
            What does that mean?
          </ThemedButton>
          <ThemedButton
            onClick={() => dispatch({ type: "PUSH_NAV", value: "population" })}
          >
            Get started
          </ThemedButton>
        </p>
      </Content>
    </ScreenContainer>
  );
};

const InformationScreen = () => {
  const dispatch = useContext(DispatchContext);

  return (
    <ScreenContainer>
      <Heading>How we generate images</Heading>
      <Content>
        <p>
          We use something called Genetic Programming to generate and evolve
          math functions that output numbers
        </p>
        <p>
          We start by generating an initial pool of math functions - we call
          this the initial population or first generation. Think of it like our
          ancestors, a group of primeates trying to survive.
        </p>
        <p>
          We take these functions and provide them with an x and y coordinate
          and are given a numbers we can use to set red, green and blue colour
          values in a pixel. We repeat this process generating as many pixels as
          required to form an image of a particular length and width.
        </p>
        <p>
          You rate the resulting image, which helps determine the likelihood of
          survival for the underlying math functions (or primeates if you will)
        </p>
        <p>
          Once you've ranked an appropriate amount of sample images, you can
          choose to "evolve" your population.
        </p>
        <p>
          We apply some genetic/evolutionary algorithms to "breed" and mutate"
          individuals based on their survival rating (fitness).
        </p>
        <p>
          From this point on, you can choose to repeat the process as often as
          you like to hone in on particular traits you find pleasing in the
          sample images.
        </p>
        <p>
          <ThemedButton onClick={() => dispatch({ type: "POP_NAV" })}>
            Back
          </ThemedButton>
        </p>
      </Content>
    </ScreenContainer>
  );
};

const PopulationScreen = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { popSize, minDepth, maxDepth } = state;
  return (
    <ScreenContainer>
      <Heading>Generate population</Heading>
      <Content>
        <p>
          To begin creating images, we need a "population" of math functions
          that accept x/y positions and return a value that can be used as the
          r, g or b component of a corresponding pixel
        </p>

        <p>
          The settings below control the number of math functions to generate
          (pop size) and the number of operations allowed in the functions
          (min/max depth) e.g: e.g (x) &eq;&gt; x or (x) &eq;&gt; x ^ 2 has a
          depth of 1, whereas (x) &eq;&gt; x ^ (2 + 3) has a depth of 2
        </p>

        <p>
          If this is your first time, we recommend leaving these settings at
          their defaults .
        </p>

        <div>
          <label>Population size ({popSize})</label>
          <div>
            <input
              type="text"
              value={popSize}
              onChange={(e) => setPopSize(dispatch, e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Min depth ({minDepth})</label>

          <div>
            <input
              type="text"
              value={minDepth}
              onChange={(e) => setMinDepth(dispatch, e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Max depth ({maxDepth})</label>
          <div>
            <input
              type="text"
              defaultValue={maxDepth}
              onChange={(e) => setMaxDepth(dispatch, e.target.value)}
            />
          </div>
        </div>
        <p>
          <ThemedButton onClick={() => dispatch({ type: "POP_NAV" })}>
            Back
          </ThemedButton>
          <ThemedButton
            onClick={() => dispatch({ type: "PUSH_NAV", value: "samples" })}
          >
            Continue
          </ThemedButton>
        </p>
      </Content>
    </ScreenContainer>
  );
};

const SamplesScreen = () => {
  const dispatch = useContext(DispatchContext);

  return (
    <ScreenContainer>
      <Heading>Generate images/Samples</Heading>
      <Content>
        <p>
          <ThemedButton onClick={() => dispatch({ type: "POP_NAV" })}>
            Back
          </ThemedButton>
        </p>
      </Content>
    </ScreenContainer>
  );
};

function App() {
  return (
    <StateProvider>
      <ConnectedTheme>
        <Container>
          Imagene3
          <ConnectedThemeControl />
          <ScreenRouter />
        </Container>
      </ConnectedTheme>
    </StateProvider>
  );
}

const ConnectedTheme = ({ children }: { children: any }) => {
  const { theme } = useContext(StateContext);
  return <Theme theme={theme}>{children}</Theme>;
};

const ConnectedThemeControl = () => {
  const dispatch = useContext(DispatchContext);
  const { theme } = useContext(StateContext);
  return (
    <ThemeControl onSelectTheme={setTheme.bind(null, dispatch)} theme={theme} />
  );
};

const ScreenRouter = () => {
  const { navStack, navDir } = useContext(StateContext);
  console.log(navStack.slice(0));
  return (
    <TransitionGroup component={ScreensContainer} className={navDir}>
      {navStack.slice(0, 1).map((n) => (
        <CSSTransition key={n} timeout={200}>
          {renderScreen(n)}
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

const renderScreen = (screen: string) => {
  switch (screen) {
    case "information":
      return <InformationScreen />;
    case "population":
      return <PopulationScreen />;
    case "samples":
      return <SamplesScreen />;
  }

  return <WelcomeScreen />;
};

export default App;
