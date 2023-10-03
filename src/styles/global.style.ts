import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

                      /* Box sizing rules */
                    * {
                      box-sizing: border-box;
                      margin: 0;
                      padding: 0;
                      border: none;
                      outline: none;
                      vertical-align: baseline;
                      background: transparent;
                      font-weight: normal;
                      text-decoration: none;
                    }

/* Set core html defaults */
html {
  min-height: 100vh;
  font-size: max(16px, 1.1vw);
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  scroll-behavior: smooth;
  color: black;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: lightgray;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

/* Remove list styles on ul, ol elements with a class attribute */
ul,
ol {
  list-style: none;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* remember to define focus styles! */
:focus {
  outline: 0;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

#root {
  min-height: 100vh;
}


`;

export default GlobalStyle;
