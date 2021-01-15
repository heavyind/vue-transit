# Vue Transit

An alternative to Vue's native transition component that is designed to be used for more sophisticated page enter and leave animations than what's currently feasible out-of-the-box.

## What

Vue Transit does not remove elements from the DOM, but instead applies arbitrary styles based on page enter and page leave. In practice, this can mean something like setting the opacity of the element to `1` from `0` on page enter, or doing the opposite on page leave.

### Why not just use the native `<transition>` component?

To begin with, it's actually not terribly flexible for animation. The API is, in the author's mind, good but insufficient to achieve complex, fancy transitions, and a wrapper must be put around it. Moreover, there is no way to stop Vue's native `<transition>` from removing the element from the DOM. If elements' positionings depend on one another (e.g., `relative`) on an outgoing page, removing those elements at different times will cause serious problems.

## Basic usage

1. Initialize the component somewhere in the root component of the app's `mounted` function.
2. Use `<transit-view>` instead of `<router-view>`.
3. Replace native `<router-link>` elements with `<transit-link>`.
4. Wrap the element in question with a `<transit>` tag.

## API

The elements can be configured with a duration, delay, timing functions, and other options.

