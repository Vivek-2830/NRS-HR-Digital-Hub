import * as React from 'react';
import styles from './NrsAllNews.module.scss';
import { INrsAllNewsProps } from './INrsAllNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp/presets/all';
import * as moment from 'moment';

require('../assets/style.css');

export interface INrsAllNewsState {
  NewsAnnouncementsData: any;
}

export default class NrsAllNews extends React.Component<INrsAllNewsProps, INrsAllNewsState> {

  constructor(props: INrsAllNewsProps, state: INrsAllNewsState) {

    super(props);

    this.state = {
      NewsAnnouncementsData: ""
    };

  }

  public render(): React.ReactElement<INrsAllNewsProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <>
        <section className="nrsHrDomains">
          <div className="nrsHomePage">
            <div className="hr-red-shapes"></div>
            <div className="hr-hero-copy">
              <h1 className="hr-title">News And Announcements</h1>
            </div>
            <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
          </div>
        </section>

        <section className="container">

          <section className="news-section">

            <div className="news-grid">

              {
                this.state.NewsAnnouncementsData.length > 0 &&
                this.state.NewsAnnouncementsData.map((item) => {
                  return (
                    <a href={item.NewsLink.Url} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                      <div className="news-card">

                        <div className="news-image">
                          <img
                            src={item.NewsImage}
                            alt="NRS team"
                          />
                        </div>

                        <div className="news-content">
                          <h3>{item.NewsTitle}</h3>

                          <p className="news-meta">
                            {item.NewsSource} · {moment(new Date(item.NewsDate)).format("MMMM DD, YYYY")}
                          </p>

                          <p className="news-description">
                            {item.NewsDescription}
                          </p>
                        </div>

                      </div>
                    </a>
                  );
                })
              }

            </div>

          </section>
        </section>
      </>
    );
  }

  public async componentDidMount() {
    this.getNewsAnnouncements();
  }

  public async getNewsAnnouncements() {
    const news = await sp.web.lists.getByTitle("News and Announcements").items.select(
      "NewsTitle",
      "NewsSource",
      "NewsDate",
      "NewsDescription",
      "NewsImage",
      "NewsLink"
    ).expand("AttachmentFiles").get().then((data) => {
      let AllData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            NewsTitle: item.NewsTitle ? item.NewsTitle : "",
            NewsSource: item.NewsSource ? item.NewsSource : "",
            NewsDescription: item.NewsDescription ? item.NewsDescription : "",
            NewsImage: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.NewsImage ? JSON.parse(item.NewsImage).serverRelativeUrl : require(`../assets/HRDomin.png`),
            NewsDate: item.NewsDate ? item.NewsDate : "",
            NewsLink: item.NewsLink ? item.NewsLink : ""
          });
        });
        this.setState({ NewsAnnouncementsData: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching NewsAnnouncementsData Info: ", error);
    });
  }

}
