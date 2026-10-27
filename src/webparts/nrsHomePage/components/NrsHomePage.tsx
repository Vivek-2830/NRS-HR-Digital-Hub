import * as React from 'react';
import styles from './NrsHomePage.module.scss';
import { INrsHomePageProps } from './INrsHomePageProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class NrsHomePage extends React.Component<INrsHomePageProps, {}> {
  public render(): React.ReactElement<INrsHomePageProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className="nrsHomePage">
       
      </section>
    );
  }
}
