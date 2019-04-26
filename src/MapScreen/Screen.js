import './Screen.sass';
import React, { Component } from 'react';
import Map from './Map';
import AddRemarkButton from '../AddRemark/Button';
import SearchButton from '../Search/Button';
import MyRemarksButton from '../Search/MyRemarksButton';
import RemarkDialog from '../AddRemark/Window';
import ListRemarks from '../ListRemarks/ListRemarks';
import SearchDialog from '../Search/Window';

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddRemarkDialog: false
    };
    this.toggleAddRemarkDialog = this.toggleAddRemarkDialog.bind(this);
  }

  toggleAddRemarkDialog() {
    this.setState({ showAddRemarkDialog: !this.state.showAddRemarkDialog });
  }

  cssActiveClassFor(condition) {
    return condition ? "active" : "";
  }

  render() {
    return (
      <div className="container">
        <div className="section map-container">
          <Map
            center={this.props.center}
            zoom={this.props.zoom}
            onMapCenterChange={this.props.onMapCenterChange}
            groupedRemarks={this.props.groupedRemarks}
            onMarkerClick={this.props.onMarkerClick}
          />
        </div>

        <div className="navbar is-fixed-bottom always-visible-menu">
          <div className="navbar-menu is-active">
            <div className="navbar-item">
              <SearchButton onClick={this.props.onToggleSearchDialog} />
            </div>
            <div className="navbar-item">
              <AddRemarkButton onClick={this.toggleAddRemarkDialog} />
            </div>
            <div className="navbar-item">
              <MyRemarksButton onClick={this.props.onMyRemarksSearchClick}/>
            </div>
          </div>


          <RemarkDialog
            onClose={this.toggleAddRemarkDialog}
            onSubmit={this.props.onRemarkSubmit}
            username={this.props.username}
            active={this.cssActiveClassFor(this.state.showAddRemarkDialog)}
          >
          </RemarkDialog>
          <ListRemarks
            remarks={this.props.selectedRemarks}
            active={this.cssActiveClassFor(this.props.showListRemarksDialog)}
            onClose={this.props.onCloseListRemarksDialog}
          />
          <SearchDialog
            remarks={this.props.remarks}
            active={this.cssActiveClassFor(this.props.showSearchDialog)}
            onClose={this.props.onToggleSearchDialog}
            onSubmit={this.props.onSearchSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Screen;