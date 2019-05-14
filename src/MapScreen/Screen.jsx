import './Screen.sass';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import AddRemarkButton from '../AddRemark/Button';
import SearchButton from '../Search/Button';
import MyRemarksButton from '../Search/MyRemarksButton';
import RemarkDialog from '../AddRemark/Window';
import ListRemarks from '../ListRemarks/ListRemarks';
import SearchDialog from '../Search/Window';

class Screen extends Component {
  static cssActiveClassFor(condition) {
    return condition ? 'active' : '';
  }

  static propTypes = {
    center: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    zoom: PropTypes.number.isRequired,
    onMapChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    groupedRemarks: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    onToggleSearchDialog: PropTypes.func.isRequired,
    onMyRemarksSearchClick: PropTypes.func.isRequired,
    onRemarkSubmit: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedRemarks: PropTypes.array.isRequired,
    showListRemarksDialog: PropTypes.bool.isRequired,
    onCloseListRemarksDialog: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    remarks: PropTypes.array.isRequired,
    showSearchDialog: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAddRemarkDialog: false,
    };
    this.toggleAddRemarkDialog = this.toggleAddRemarkDialog.bind(this);
  }

  toggleAddRemarkDialog() {
    const { showAddRemarkDialog } = this.state;
    this.setState({ showAddRemarkDialog: !showAddRemarkDialog });
  }

  render() {
    const {
      center,
      zoom,
      onMapChange,
      groupedRemarks,
      onMarkerClick,
      onToggleSearchDialog,
      onMyRemarksSearchClick,
      onRemarkSubmit,
      onSearchSubmit,
      username,
      selectedRemarks,
      showListRemarksDialog,
      onCloseListRemarksDialog,
      remarks,
      showSearchDialog,
    } = this.props;
    const { showAddRemarkDialog } = this.state;
    return (
      <div className="container">
        <div className="section map-container">
          <Map
            center={center}
            zoom={zoom}
            onMapChange={onMapChange}
            groupedRemarks={groupedRemarks}
            onMarkerClick={onMarkerClick}
          />
        </div>

        <div className="navbar is-fixed-bottom always-visible-menu">
          <div className="navbar-menu is-active">
            <div className="navbar-item">
              <SearchButton onClick={onToggleSearchDialog} />
            </div>
            <div className="navbar-item">
              <AddRemarkButton onClick={this.toggleAddRemarkDialog} />
            </div>
            <div className="navbar-item">
              <MyRemarksButton onClick={onMyRemarksSearchClick} />
            </div>
          </div>


          <RemarkDialog
            onClose={this.toggleAddRemarkDialog}
            onSubmit={onRemarkSubmit}
            username={username}
            active={Screen.cssActiveClassFor(showAddRemarkDialog)}
          />
          <ListRemarks
            remarks={selectedRemarks}
            active={Screen.cssActiveClassFor(showListRemarksDialog)}
            onClose={onCloseListRemarksDialog}
          />
          <SearchDialog
            remarks={remarks}
            active={Screen.cssActiveClassFor(showSearchDialog)}
            onClose={onToggleSearchDialog}
            onSubmit={onSearchSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Screen;
