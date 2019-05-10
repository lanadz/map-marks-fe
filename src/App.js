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
        name: "",
      },
      loggedIn: false,
      currentLocation: {
        lat: 0,
        lng: 0
      },
      mapCenter: {
        lat: 0,
        lng: 0
      },
      mapZoom: 13,
      remarks: [],
      unfilteredRemarks: [],
      groupedRemarks: [],
      selectedRemarks: [],
      showListRemarksDialog: false,
      showSearchDialog: false,
      filterMyRemarks: false
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

  setCurrentLocation(position) {
    this.setState((state, props) => ({
      currentLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }));
  }

  login(loginInfo) {
    this.setState(
      {
        user: {
          name: loginInfo.user.name
        },
        loggedIn: true
      }
    );
  }

  remarkSubmit(remarkBody) {
    let body = {
      remark: {
        body: remarkBody,
        user_name: this.state.user.name,
        lat: this.state.currentLocation.lat,
        lng: this.state.currentLocation.lng
      }
    };

    ApiClient('/remarks.json',
      {
        method: 'POST',
        body:
          JSON.stringify(body)
      },
      (error, json) => {
        if (error) {
          console.log('Error: ', error);
        } else {
          this.getRemarks(this.state.mapCenter);
        }
      }
    );
  }

  mapChanged(currentMapState) {
    let { mapCenter } = this.state;
    let { mapZoom } = this.state;

    if (!Object.is(currentMapState.center, mapCenter) || !Object.is(currentMapState.zoom, mapZoom)) {
      this.getRemarks(currentMapState);
      this.setState({ mapCenter: currentMapState.center, mapZoom: currentMapState.zoom });
    }
  }

  markerClicked(markerGroupId) {
    let { groupedRemarks } = this.state;
    let group = groupedRemarks[markerGroupId];
    this.setState({
      selectedRemarks: group.remarks,
      showListRemarksDialog: true
    });
  }

  getRemarks(currentCenter, blockRefetch = this.state.showSearchDialog) {
    // TODO: Add dynamic radius. Radius in meters
    // If search field is opened
    if (blockRefetch) { return };

    const radius = 100000;
    let params = `radius=${radius}&lat=${currentCenter.lat}&lng=${currentCenter.lng}`;
    ApiClient(`/remarks.json?${params}`,
      {},
      (error, json) => {
        if (error) {
          console.log('Error: ', error);
          this.storeRemarks([]);
        } else {
          this.storeRemarks(json);
        }
      }
    );
  }

  closeListRemarksDialog() {
    this.setState({ showListRemarksDialog: false });
  }

  toggleSearchDialog() {
    const newValue = !this.state.showSearchDialog;
    if (!newValue) {
      // refetch remarks to cancel any previous search
      this.getRemarks(this.state.mapCenter, false);
    }
    this.setState({ showSearchDialog: newValue });
  }

  toggleFilterMyRemarks() {
    const { filterMyRemarks } = this.state;
    this.storeRemarks(this.state.unfilteredRemarks, !filterMyRemarks);
    this.setState({ filterMyRemarks: !filterMyRemarks });
  }

  searchSubmit(query) {
    query = query.toLowerCase();
    const { currentLocation } = this.state;
    const params = `lat=${currentLocation.lat}&lng=${currentLocation.lng}&q=${query}`;

    ApiClient(`/remarks.json?${params}`,
      {},
      (error, json) => {
        if (error) {
          console.log('Error: ', error);
          this.storeRemarks([]);
        } else {
          this.storeRemarks(json);
        }
      }
    );
  }

  storeRemarks(remarksFromApi, filterMyRemarks = this.state.filterMyRemarks) {
    let filteredRemarks = [];
    if (filterMyRemarks) {
      const userName = this.state.user.name;
      filteredRemarks = remarksFromApi.filter((r) => r.user_name === userName);
    } else {
      filteredRemarks = remarksFromApi;
    }
    this.setState({
      groupedRemarks: RemarksGroupByLocation(filteredRemarks, this.state.mapZoom),
      remarks: filteredRemarks,
      unfilteredRemarks: remarksFromApi
    });
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.setCurrentLocation(position));
    } else {
      console.warn('Error: The Geolocation service failed.');
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="application">
        <Router>
          <Route path="/login" exact render={(props) => (
            loggedIn ?
              (<Redirect to='/' />)
              :
              (<Login onLogin={this.login}></Login>)
          )} />

          <Route path="/" exact render={(props) => (
            loggedIn ?
              (<MapScreen
                zoom={this.state.mapZoom}
                center={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
                username={this.state.user.name}
                onRemarkSubmit={this.remarkSubmit}
                onMapChange={this.mapChanged}
                onMarkerClick={this.markerClicked}
                remarks={this.state.remarks}
                groupedRemarks={this.state.groupedRemarks}
                selectedRemarks={this.state.selectedRemarks}
                showListRemarksDialog={this.state.showListRemarksDialog}
                onCloseListRemarksDialog={this.closeListRemarksDialog}
                showSearchDialog={this.state.showSearchDialog}
                onToggleSearchDialog={this.toggleSearchDialog}
                onSearchSubmit={this.searchSubmit}
                onMyRemarksSearchClick={this.toggleFilterMyRemarks}
              >
              </MapScreen>)
              :
              (<Redirect to='/login' />)
          )} />
        </Router>
      </div>
    );
  }
}

export default App;
