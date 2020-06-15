import Chart from 'chart.js';
// import Chart from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.2/Chart.min.js';
import {LitElement, html, css} from 'lit-element';

class ChartjsCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: { type: Object },
      chart: { type: Object }
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const type = this.config.chart;
    
    const data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    }
    
    const options = {}
    
    const ctx = this.renderRoot.querySelector('canvas').getContext('2d');
    console.log('CTX: ');
    console.log(ctx);

    this.chart = new Chart(ctx, {
        type: type,
        data: data,
        options: options
    });
  }

  render() {
    return html`
      <ha-chart-base></ha-chart-base>
      <ha-card>
        <canvas width="90%" height="90%"></canvas>
      </ha-card>
    `;
  }

  setConfig(config) {
    if (!config.chart) {
      throw new Error("You need to define type of chart");
    } else if ( !['line', 'radar', 'bar', 'horizontalBar', 'pie', 'doughnut', 'polarArea', 'bubble', 'scatter'].includes(config.chart) ) {
      throw new Error("Invalid config for 'chart'. Available options are: line, bar, horizontalBar, radar, pie, doughnut, polarArea, bubble, scatter");
    }
    
    this.config = config;
  }

  getCardSize() {
    return 2;
  }

  static get styles() {
    return css`
      ha-card {
        padding: 0 16px 16px;
      }
      canvas {
        width: 90% !important;
        height: 90% !important;
        margin-left: 5%;
      }
    `;
  }
}
customElements.define("chartjs-card", ChartjsCard);
console.info(
  '%c  CHARTJS-CARD  \n%c Version 0.0.1 ',
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);