# react-good-calendar API

##### Table of Contents

* [Rendering](#rendering)
* [Theme](#theme)
* [Events](#events)
  * [Adding](#events-adding)
  * [Editing](#events-editing)
* [Custom components](#custom-components)

<a name="rendering"/>

## Rendering

A basic calendar may be rendered as follows:

```jsx
import React from 'react';
import Calendar from 'react-good-calendar';

function Example() {
  return (
    <Calendar />
  );
}
```

Please see the [example](../example/src/App.js) for more implementation details.

<a name="theme"/>

## Theme

Theming is accomplished using Styled Components' [ThemeProvider](https://www.styled-components.com/docs/advanced). An optional `theme` prop may be passed to `<Calendar />`, containing any customisations to the [base theme](../src/theme.js).

For example:

```jsx
render(<Calendar
  theme={{ weekHeight: 100 }}
/>, document.getElementById('root'));
```

### Properties

The following properties of `theme` are available to customise:

- `weekHeight`: determines the (fixed) height of each week in the month view
- `borderColor`: the colour of the borders between days in the month view
- `hoverColor`: the background colour when hovering over days
- `activeColor`: the background colour of days belonging to the current month
- `inactiveColor`: the background colour of out-of-range days
- `todayColor`: the background colour of today's day
- `eventFontSize`: the font size of event titles
- `eventMargin`: the margin around event titles
- `eventPadding`: the padding inside event titles

<a name="events"/>

## Events

Events may be passed as the `events` prop, to `<Calendar />`. This should be an array of objects like the following:

```js
{
  id, // string
  startTime, // Date object
  endTime, // Date object
  title, // string
  color, // (optional) colour of the event
  // any other properties
}
```

These events will be rendered onto the view, and become interactive if you pass the below properties.

<a name="events-adding"/>

### Adding

The `onNewEvent` prop, if passed, is called whenever clicking a blank space inside a day on the month view. It is called with a single argument: a `Date` object representing the day clicked.

<a name="events-editing"/>

### Editing

The `onEditEvent` prop, if passed, is called whenever clicking an event title on the month view. It is called with a single argument: the `event` object which belongs to the clicked title.

<a name="custom-components"/>

## Custom components

You may pass a `components` object to `<Calendar />` as a prop.

These can be simple wrappers (for example, to render certain styles) which render the default component as their children, or they can behave however you like. The list of implemented custom components is as follows:

### Toolbar

#### Name:

`Toolbar`, e.g.:

```jsx
render(<Calendar components={{ Toolbar: MyCustomToolbar }} />)
```

#### Props received:

- `date`: (`Date` object) the current date of the calendar
- `navigateNext`: (`Function`) call this to navigate to the next month
- `navigatePrev`: (`Function`) call this to navigate to the previous month
- `children`: the default toolbar

The example in `example/src/App.js` renders a custom toolbar component which switches the colour of the default toolbar every 500ms.
