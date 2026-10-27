import * as React from 'react';
import styles from './NrsFooter.module.scss';
import { INrsFooterProps } from './INrsFooterProps';
import { escape } from '@microsoft/sp-lodash-subset';

require('../assets/style.css');

export default class NrsFooter extends React.Component<INrsFooterProps, {}> {
  public render(): React.ReactElement<INrsFooterProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className="nrsFooter">

        <header className="main-header">
          <div className="header-container">

            <div className="brand-section">
              <div className="logo">
                <span className="logo-text">NRS</span>
                <span className="logo-subtext">
                  NIGERIA<br />REVENUE<br />SERVICE
                </span>
              </div>

              <div className="tagline">
                Together We Rise. Together We Prosper.
              </div>
            </div>

            <nav className="header-navigation">
              <a href="#">FAQs</a>
              <a href="#">HR Contact</a>
              <a href="#">Help &amp; Support</a>
              <a href="#">Accessibility</a>
            </nav>

          </div>
        </header>

        <footer className="footer-bar">
          <div className="footer-container">

            <div className="content-owner">
              Content owner: Workforce Management, Human Capital Management Group.
              Published by the HCMG SharePoint Administrator.
            </div>

            <div className="classification">
              Classification: Internal
            </div>

          </div>
        </footer>

      </section>
    );
  }
}
