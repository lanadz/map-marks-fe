/* eslint-disable no-console */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.sass';
import MapScreen from './MapScreen/Screen';
import Login from './Login/Login';
import ApiClient from './helpers/ApiClient';
import RemarksGroupByLocation from './helpers/RemarksGroupByLocaction';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
      },
      loggedIn: false,
      currentLocation: {
        lat: 0,
        lng: 0,
      },
      mapCenter: {
        lat: 0,
        lng: 0,
      },
      mapZoom: 13,
      remarks: [],
      unfilteredRemarks: [],
      groupedRemarks: [],
      selectedRemarks: [],
      showListRemarksDialog: false,
      showSearchDialog: false,
      filterMyRemarks: false,
    };

    this.login = this.login.bind(this);
    this.remarkSubmit = this.remarkSubmit.bind(this);
    this.getRemarks = this.getRemarks.bind(this);
    this.mapChanged = this.mapChanged.bind(this);
    this.markerClicked = this.markerClicked.bind(this);
    this.closeListRemarksDialog = this.closeListRemarksDialog.bind(this);
    this.toggleSearchDialog = this.toggleSearchDialog.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.toggleFilterMyRemarks = this.toggleFilterMyRemarks.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.setCurrentLocation(position));
    } else {
      console.warn('Error: The Geolocation service failed.');
    }
  }

  setCurrentLocation(position) {
    this.setState(() => ({
      currentLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    }));
  }

  // eslint-disable-next-line react/destructuring-assignment
  getRemarks(currentCenter, blockRefetch = this.state.showSearchDialog) {
    // TODO: Add dynamic radius. Radius in meters
    // If search field is opened
    if (blockRefetch) { return; }

    const radius = 100000;
    const params = `radius=${radius}&lat=${currentCenter.lat}&lng=${currentCenter.lng}`;
    ApiClient(`/remarks.json?${params}`,
      {},
      (error, json) => {
        if (error) {
          console.log('Error: ', error);
          this.storeRemarks([]);
        } else {
          this.storeRemarks(json);
        }
      });
  }

  remarkSubmit(remarkBody) {
    const { user, currentLocation, mapCenter } = this.state;
    const body = {
      remark: {
        body: remarkBody,
        user_name: user.name,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      },
    };

    ApiClient('/remarks.json',
      {
        method: 'POST',
        body:
          JSON.stringify(body),
      },
      (error) => {
        if (error) {
          console.log('Error: ', error);
        } else {
          this.getRemarks(mapCenter);
        }
      });
  }

  login(loginInfo) {
    this.setState(
      {
        user: {
          name: loginInfo.user.name,
        },
        loggedIn: true,
      },
    );
  }

  closeListRemarksDialog() {
    this.setState({ showListRemarksDialog: false });
  }

  toggleSearchDialog() {
    const { showSearchDialog, mapCenter } = this.state;
    const newValue = !showSearchDialog;
    if (!newValue) {
      // refetch remarks to cancel any previous search
      this.getRemarks(mapCenter, false);
    }
    this.setState({ showSearchDialog: newValue });
  }

  toggleFilterMyRemarks() {
    const { filterMyRemarks, unfilteredRemarks } = this.state;
    this.storeRemarks(unfilteredRemarks, !filterMyRemarks);
    this.setState({ filterMyRemarks: !filterMyRemarks });
  }

  searchSubmit(query) {
    const queryLowerCased = query.toLowerCase();
    const { currentLocation } = this.state;
    const params = `lat=${currentLocation.lat}&lng=${currentLocation.lng}&q=${queryLowerCased}`;

    ApiClient(`/remarks.json?${params}`,
      {},
      (error, json) => {
        if (error) {
          console.log('Error: ', error);
          this.storeRemarks([]);
        } else {
          this.storeRemarks(json);
        }
      });
  }

  // eslint-disable-next-line react/destructuring-assignment
  storeRemarks(remarksFromApi, filterMyRemarks = this.state.filterMyRemarks) {
    const { user, mapZoom } = this.state;
    let filteredRemarks = [];
    if (filterMyRemarks) {
      const userName = user.name;
      filteredRemarks = remarksFromApi.filter(r => r.user_name === userName);
    } else {
      filteredRemarks = remarksFromApi;
    }
    this.setState({
      groupedRemarks: RemarksGroupByLocation(filteredRemarks, mapZoom),
      remarks: filteredRemarks,
      unfilteredRemarks: remarksFromApi,
    });
  }

  mapChanged(currentMapState) {
    const { mapCenter } = this.state;
    const { mapZoom } = this.state;

    if (
      !Object.is(currentMapState.center, mapCenter)
      || !Object.is(currentMapState.zoom, mapZoom)) {
      this.getRemarks(currentMapState);
      this.setState({ mapCenter: currentMapState.center, mapZoom: currentMapState.zoom });
    }
  }

  markerClicked(markerGroupId) {
    const { groupedRemarks } = this.state;
    const group = groupedRemarks[markerGroupId];
    this.setState({
      selectedRemarks: group.remarks,
      showListRemarksDialog: true,
    });
  }

  render() {
    const { loggedIn } = this.state;
    const {
      mapZoom, currentLocation,
      user, remarks, groupedRemarks,
      selectedRemarks, showListRemarksDialog, showSearchDialog,
    } = this.state;
    return (
      <div className="application">
        <Router>
          <Route
            path="/login"
            exact
            render={() => (loggedIn ? (<Redirect to="/" />) : (<Login onLogin={this.login} />))}
          />

          <Route
            path="/"
            exact
            render={() => (
              loggedIn
                ? (
                  <MapScreen
                    zoom={mapZoom}
                    center={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                    username={user.name}
                    onRemarkSubmit={this.remarkSubmit}
                    onMapChange={this.mapChanged}
                    onMarkerClick={this.markerClicked}
                    remarks={remarks}
                    groupedRemarks={groupedRemarks}
                    selectedRemarks={selectedRemarks}
                    showListRemarksDialog={showListRemarksDialog}
                    onCloseListRemarksDialog={this.closeListRemarksDialog}
                    showSearchDialog={showSearchDialog}
                    onToggleSearchDialog={this.toggleSearchDialog}
                    onSearchSubmit={this.searchSubmit}
                    onMyRemarksSearchClick={this.toggleFilterMyRemarks}
                  />
                )
                : (<Redirect to="/login" />)
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
