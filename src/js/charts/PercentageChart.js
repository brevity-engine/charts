import AggregationChart from "./AggregationChart";
import { getOffset } from "../utils/dom";
import { getComponent } from "../objects/ChartComponents";
import {
  PERCENTAGE_BAR_DEFAULT_HEIGHT,
  PERCENTAGE_BAR_DEFAULT_DEPTH,
} from "../utils/constants";

export default class PercentageChart extends AggregationChart {
  constructor(parent, args) {
    super(parent, args);
    this.type = "percentage";
    this.setup();
  }

  setMeasures(options) {
    const m = this.measures;
    this.barOptions = options.barOptions || {};

    const b = this.barOptions;
    b.height = b.height || PERCENTAGE_BAR_DEFAULT_HEIGHT;
    b.depth = b.depth || PERCENTAGE_BAR_DEFAULT_DEPTH;

    m.paddings.right = 30;
    m.legendHeight = 60;
    m.baseHeight = (b.height + b.depth * 0.5) * 8;
  }

  setupComponents() {
    const s = this.state;

    const componentConfigs = [
      [
        "percentageBars",
        {
          barHeight: this.barOptions.height,
          barDepth: this.barOptions.depth,
        },
        function () {
          return {
            xPositions: s.xPositions,
            widths: s.widths,
            colors: this.colors,
          };
        }.bind(this),
      ],
    ];

    this.components = new Map(
      componentConfigs.map((args) => {
        const component = getComponent(...args);
        return [args[0], component];
      })
    );
  }

  calc() {
    super.calc();
    const s = this.state;

    s.xPositions = [];
    s.widths = [];

    let xPos = 0;
    s.sliceTotals.map((value) => {
      const width = (this.width * value) / s.grandTotal;
      s.widths.push(width);
      s.xPositions.push(xPos);
      xPos += width;
    });
  }

  makeDataByIndex() {}

  bindTooltip() {
    const s = this.state;
    this.container.addEventListener("mousemove", (e) => {
      const bars = this.components.get("percentageBars").store;
      const bar = e.target;
      if (bars.includes(bar)) {
        const i = bars.indexOf(bar);
        const gOff = getOffset(this.container);
        const pOff = getOffset(bar);

        const x =
          pOff.left - gOff.left + parseInt(bar.getAttribute("width")) / 2;
        const y = pOff.top - gOff.top;
        const title =
          (this.formattedLabels && this.formattedLabels.length > 0
            ? this.formattedLabels[i]
            : this.state.labels[i]) + ": ";
        const fraction = s.sliceTotals[i] / s.grandTotal;

        this.tip.setValues(x, y, {
          name: title,
          value: (fraction * 100).toFixed(1) + "%",
        });
        this.tip.showTip();
      }
    });
  }
}
