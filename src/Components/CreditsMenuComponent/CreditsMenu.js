import React from 'react';
import './CreditsMenu.css';
import { setCreditsMenuVisibility } from '../../AppActions';

// TODO: Use const instead of component
class CreditsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  onConfirm(visible) {
    setCreditsMenuVisibility(!visible)
  }

  render() {
    if (!this.props.visible) return null;
    return (
      <div className="overlay">
        <div className={`creditsBox`}>
          <a href="https://github.com/EliasHaaralahti/No-Mans-Canvas-Client">Frontend code</a>
          <a href="https://github.com/vkoskiv/nmc2">Backend code</a>
          <div className="creatorList">
            By:
            <ul>
              <li><a href="https://twitter.com/vkoskiv">vkoskiv</a></li>
              <li><a href="https://twitter.com/moletrooper">moletrooper</a></li>
              <li><a href="https://github.com/EliasHaaralahti">Elias</a></li>
              <li><a href="https://github.com/JonniP">Jonni</a></li>
            </ul>
          </div>
          <button onClick={() => this.onConfirm(this.props.visible)} className={'OkButton'} >
            OK
          </button>
        </div>
      </div>
    )
  }
}

export default CreditsMenu;
