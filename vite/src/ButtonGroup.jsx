import React from 'react';
import './ButtonGroup.css'; // CSS styles for the button group
const ButtonGroup = (settings) => {
    

    const handleToggleDocuments = () => {
        settings.settings[1]({showDocuments: !settings.settings[0].showDocuments, showMetadata: settings.settings[0].showMetadata, showLines: settings.settings[0].showLines})
    };
  
    const handleToggleMetadata = () => {
        settings.settings[1]({showDocuments: settings.settings[0].showDocuments, showMetadata: !settings.settings[0].showMetadata, showLines: settings.settings[0].showLines})
    };


    const handleToggleLines = () => {
        settings.settings[1]({showDocuments: settings.settings[0].showDocuments, showMetadata: settings.settings[0].showMetadata, showLines: !settings.settings[0].showLines})
    };
  
    return (
      <div className="button-group">
        <button className={`btn ${settings.settings[0].showDocuments ? 'active' : ''}`} onClick={handleToggleDocuments}>
          docs
        </button>
        <button className={`btn ${settings.settings[0].showMetadata  ? 'active' : ''}`} onClick={handleToggleMetadata}>
          metadata
        </button>
        <button className={`btn ${settings.settings[0].showLines ? 'active' : ''}`} onClick={handleToggleLines}>
          lines
        </button>
      </div>
    );
  };

export default ButtonGroup;