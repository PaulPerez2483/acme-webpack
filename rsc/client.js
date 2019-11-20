import React from 'react';
import ReactDOM from 'react-dom';
const {
  HashRouter,
  Link,
  NavLink,
  Route,
  Switch
} = ReactRouterDOM;

const People = ({
  people
}) => {
  return React.createElement("ul", null, people.map(person => React.createElement("li", {
    key: person.id
  }, person.name)));
};

const Places = ({
  places
}) => {
  return React.createElement("ul", null, places.map(place => React.createElement("li", {
    key: place.id
  }, place.name)));
};

const Things = ({
  things
}) => {
  return React.createElement("ul", null, things.map(thing => React.createElement("li", {
    key: thing.id
  }, thing.name)));
};

const Nav = ({
  people,
  places,
  things
}) => {
  const links = [{
    text: 'People',
    to: '/people',
    count: people.length
  }, {
    text: 'Places',
    to: '/places',
    count: places.length
  }, {
    text: 'Things',
    to: '/things',
    count: things.length
  }];
  return React.createElement("nav", null, links.map(link => React.createElement(NavLink, {
    key: link.text,
    to: link.to
  }, link.text)));
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      places: [],
      things: []
    };
  }

  async componentDidMount() {
    const urls = ['/api/people', '/api/places', '/api/things'];
    const [people, places, things] = await Promise.all(urls.map(url => axios.get(url).then(response => response.data)));
    this.setState({
      people,
      places,
      things
    });
  }

  render() {
    return React.createElement(HashRouter, null, React.createElement(Route, {
      render: () => React.createElement(Nav, this.state)
    }), React.createElement("div", {
      className: "container"
    }, React.createElement("h1", null, "Acme Nouns"), React.createElement(Route, {
      path: "/people",
      render: () => React.createElement(People, this.state)
    }), React.createElement(Route, {
      path: "/places",
      render: () => React.createElement(Places, this.state)
    }), React.createElement(Route, {
      path: "/things",
      render: () => React.createElement(Things, this.state)
    })));
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));