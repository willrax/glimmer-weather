import Component, { tracked } from "@glimmer/component";

enum LocationStatus {
  Pending = 1,
  Failed = 2,
  Success = 3
};

const ApiHost = 'http://localhost:4000';

export default class Weather extends Component {
  @tracked locationStatus = LocationStatus.Pending;
  @tracked report: any;

  constructor(options) {
    super(options);
    this.loadWeather();
  }

  async loadWeather() {
    try {
      let location = await this.getLocation()
      let response = await fetch(`${ApiHost}/${location}?units=auto`);
      this.report = await response.json();
      this.locationStatus = LocationStatus.Success;
    } catch(e) {
      this.locationStatus = LocationStatus.Failed;
    }
  }

  @tracked('locationStatus')
  get locationPending() {
    return this.locationStatus === LocationStatus.Pending;
  }

  @tracked('locationStatus')
  get locationFailed() {
    return this.locationStatus === LocationStatus.Failed;
  }

  @tracked('locationStatus')
  get locationSuccess() {
    return this.locationStatus === LocationStatus.Success;
  }

  getLocation(): Promise<[number, number]> {
    return new Promise (function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function({ coords }) {
        resolve([coords.latitude, coords.longitude]);
      }, function() {
        reject();
      });
    })
  }
}
