import { Chart, createChart } from "@devexperts/dxcharts-lite";
import type { PartialChartConfig } from "@devexperts/dxcharts-lite/dist/chart/chart.config";
import type { Candle } from "@devexperts/dxcharts-lite/dist/chart/model/candle.model";
import { type FC, useState, useCallback } from "react";
import { pipe } from "fp-ts/function";
import { none, fromNullable, fold, type Option, flatMap } from "fp-ts/Option";

import { createMockCandles, initChart, addYAxisValue } from "@utils/chartUtils";

import css from "./StockGraph.module.css";

const DEFAULT_CHART_CONFIG: PartialChartConfig = {
  devexpertsPromoLink: true,
  components: {
    chart: { type: "candle" },
  },

  colors: {
    areaTheme: {
      lineColor: "#d70101",
      startColor: "#f4511e",
      stopColor: "#FF950A",
    },
    candleTheme: {
      downColor: "#f4511e",
      downWickColor: "#d70101",
    },
    chartAreaTheme: { backgroundColor: "#000" },
  },
};

type TChartsData = {
  title: string;
  dataSize?: number;
  init?: (api: Chart, data: Candle[]) => void;
}

const requestIdleWithFallback = (cb: IdleRequestCallback, time = 1000) => {
  "requestIdleCallback" in window
    ? requestIdleCallback(cb, { timeout: time })
    : setTimeout(cb, time);
};

const onInit = (api: Chart) => {
  const MAX_VIEW_SIZE = 100;
  let length = 0;

  api.disableUserControls();
  api.setChartType("histogram");
  setInterval(() => {
    length++;
    const newCandle = createMockCandles(1, false)[0];
    newCandle.timestamp = +new Date();
    api.data.addLastCandle(newCandle);
    requestIdleWithFallback(() => {
        api.data.setXScale(length > MAX_VIEW_SIZE ? (length - MAX_VIEW_SIZE) : 0, length);
    });
  }, 1000);
}

export const ChartItem: FC<TChartsData> = ({ title, init, dataSize }: TChartsData) => {
  const chartData = createMockCandles(dataSize);
  const hasData = !!chartData && chartData?.length > 0;

  const [chartInstance, setChartInstance] = useState<Option<Chart>>(none);

  const chartInitRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;
    const api = createChart(node, DEFAULT_CHART_CONFIG);

    setChartInstance(fromNullable(api));
    pipe(
      fromNullable(api),
      fold(
        () => console.error("Couldn´t init Chart"),
        initChart(chartData, init)
      )
    );
  }, []);

  const repopulateChart = () =>
    pipe(
      chartInstance,
      fold(
        () => console.warn("REPOPULATE_ERROR: Couldn´t update the chart"),
        (c) => c.updateData({ candles: createMockCandles(dataSize) })
      )
    );

  const addNewAxis = () =>
    pipe(
      chartInstance,
      flatMap((a) => fromNullable(a?.paneManager?.panes?.CHART)),
      fold(
        () => console.warn("NEW_AXIS_ERROR: Couldn´t create a new axis"),
        (p) => addYAxisValue(p, dataSize)
      )
    );

  const CandlesInfoNav = () => {
    if(!hasData) return <code>w/o candles</code>;

    return (
      <>
        <code>(🕯️ {chartData.length} candles)</code>
        <button className={css.infoButton} onClick={repopulateChart}>
          🔀 Repopulate Chart
        </button>
        <button className={css.infoButton} onClick={addNewAxis}>
          🔛 Add Y Axis
        </button>
      </>
    )
  };

  return (
    <section>
      <h2>{title}</h2>
      <div className={css.wrapper} ref={chartInitRef}>
        {!hasData && <code>LOADING...</code>}
      </div>
      <div className={css.infoBlock}>
        <CandlesInfoNav />
      </div>
    </section>
  );
};

type TChartsBodyProps = { symbol: string };

export const StockGraph: FC<TChartsBodyProps> = ({ symbol }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <ChartItem title={`${symbol} Stocks: Realtime`} init={onInit} dataSize={0} />
    </div>
  );
};