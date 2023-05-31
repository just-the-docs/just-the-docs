import {MIN_INDICATORS_DATA_LENGTH} from "../config";
import {Open} from "./open";
import {OHLC} from "./ohlc";
import {High} from "./high";
import {Low} from "./low";
import {Close} from "./close";
import {TR} from "./tr";
import {EMA} from "./ema";
import {ATR} from "./atr";
import {MACD} from "./macd";
import {DMI} from "./dmi";
import {KC} from "./kc";
import {CCI} from "./cci";
import {Ichimoku} from "./ichimoku";
import { SMA } from "./sma";
import {NumberList} from "../_utils/number-list";
import {RSI} from "./rsi";
import {Volume} from "./volume";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";
import {Ohlc} from "../models/ohlc";
import {OBV} from './obv';
import {Stochastic} from './stochastic';
import {Momentum} from './momentum';

export class AllIndicators {
    private _ohlcs: IndicatorFn<OHLC, Ohlc>;
    get ohlcs(): IndicatorFn<OHLC, Ohlc> { return this._ohlcs; }

    private _open = new Open(MIN_INDICATORS_DATA_LENGTH);
    open = ToIndicatorFn<Open, NumberList>(this._open);

    private _high = new High(MIN_INDICATORS_DATA_LENGTH);
    high = ToIndicatorFn<High, NumberList>(this._high);

    private _low = new Low(MIN_INDICATORS_DATA_LENGTH);
    low = ToIndicatorFn<Low, NumberList>(this._low);

    private _close = new Close(MIN_INDICATORS_DATA_LENGTH);
    close = ToIndicatorFn<Close, NumberList>(this._close);

    private _volume = new Volume(MIN_INDICATORS_DATA_LENGTH, 20);
    volume = ToIndicatorFn<Volume, Partial<Volume> & NumberList>(this._volume);

    private _obv = new OBV(MIN_INDICATORS_DATA_LENGTH, 100);
    obv = ToIndicatorFn<OBV, NumberList>(this._obv);

    private _tr = new TR(MIN_INDICATORS_DATA_LENGTH);
    get tr(): TR { return this._tr; }

    private _atr14 = new ATR(MIN_INDICATORS_DATA_LENGTH, 14);
    atr14 = ToIndicatorFn<ATR, NumberList>(this._atr14);

    private _atr10 = new ATR(MIN_INDICATORS_DATA_LENGTH, 10);

    private _ema14 = new EMA(MIN_INDICATORS_DATA_LENGTH, 14);

    private _ema20 = new EMA(MIN_INDICATORS_DATA_LENGTH, 20);
    ema20 = ToIndicatorFn<EMA, NumberList>(this._ema20);

    private _ema50 = new EMA(MIN_INDICATORS_DATA_LENGTH, 50);
    ema50 = ToIndicatorFn<EMA, NumberList>(this._ema50);

    private _sma50 = new SMA(MIN_INDICATORS_DATA_LENGTH, 50);
    sma50 = ToIndicatorFn<SMA, NumberList>(this._sma50);

    private _sma75 = new SMA(MIN_INDICATORS_DATA_LENGTH, 75);
    sma75 = ToIndicatorFn<SMA, NumberList>(this._sma75);

    private _emaVol = new EMA(MIN_INDICATORS_DATA_LENGTH, 20);
    emaVol = ToIndicatorFn<EMA, NumberList>(this._emaVol);

    private _macd12 = new MACD(MIN_INDICATORS_DATA_LENGTH, 26, 12, 9);
    macd12 = ToIndicatorFn<MACD>(this._macd12);

    private _stoch14 = new Stochastic(MIN_INDICATORS_DATA_LENGTH, 14, 3);
    stoch14 = ToIndicatorFn<Stochastic>(this._stoch14);

    private _dmi14 = new DMI(MIN_INDICATORS_DATA_LENGTH, 14);
    dmi14 = ToIndicatorFn<DMI>(this._dmi14);

    private _kc = new KC(MIN_INDICATORS_DATA_LENGTH, 1);
    get kc(): KC { return this._kc; }

    private _kc2 = new KC(MIN_INDICATORS_DATA_LENGTH, 2);
    get kc2(): KC { return this._kc2; }

    private _kc3 = new KC(MIN_INDICATORS_DATA_LENGTH, 3);
    get kc3(): KC { return this._kc3; }

    private _kc4 = new KC(MIN_INDICATORS_DATA_LENGTH, 4);
    get kc4(): KC { return this._kc4; }

    private _kc5 = new KC(MIN_INDICATORS_DATA_LENGTH, 5);
    get kc5(): KC { return this._kc5; }

    private _kc6 = new KC(MIN_INDICATORS_DATA_LENGTH, 6);
    get kc6(): KC { return this._kc6; }

    private _cci20 = new CCI(MIN_INDICATORS_DATA_LENGTH, 20);
    cci20 = ToIndicatorFn<CCI, NumberList>(this._cci20);

    private _cci5 = new CCI(MIN_INDICATORS_DATA_LENGTH, 5, 20);
    cci5 = ToIndicatorFn<CCI, NumberList>(this._cci5);

    private _cci3 = new CCI(MIN_INDICATORS_DATA_LENGTH, 3, 20);
    cci3 = ToIndicatorFn<CCI, NumberList>(this._cci3);

    private _rsi14 = new RSI(MIN_INDICATORS_DATA_LENGTH, 14);
    rsi14 = ToIndicatorFn<RSI, NumberList>(this._rsi14);

    private _rsi5 = new RSI(MIN_INDICATORS_DATA_LENGTH, 5);
    rsi5 = ToIndicatorFn<RSI, NumberList>(this._rsi5);

    private _momentum = new Momentum(MIN_INDICATORS_DATA_LENGTH, 10);
    momentum = ToIndicatorFn<Momentum, NumberList>(this._momentum);

    private _ichimoku = new Ichimoku(MIN_INDICATORS_DATA_LENGTH, 9, 26, 52, 26);
    ichimoku = ToIndicatorFn<Ichimoku>(this._ichimoku);

    get tenkanSen(): IndicatorFn<NumberList> { return this._ichimoku.TenkanSen; }

    get kijunSen(): IndicatorFn<NumberList> { return this._ichimoku.KijunSen; }

    get senkouSpanA(): IndicatorFn<NumberList> { return this._ichimoku.SenkouSpanA; }

    get senkouSpanB(): IndicatorFn<NumberList> { return this._ichimoku.SenkouSpanB; }

    get senkouSpanMax(): IndicatorFn<NumberList> { return this._ichimoku.SenkouSpanMax; }

    get senkouSpanMin(): IndicatorFn<NumberList> { return this._ichimoku.SenkouSpanMin; }

    next(ohlcs: IndicatorFn<OHLC, Ohlc>) {
        // ------- INITIAL
        this._ohlcs = ohlcs;
        const ohlc = ohlcs.getLast();
        const open = ohlc.open;
        const high = ohlc.high;
        const low = ohlc.low;
        const close = ohlc.close;
        const volume = ohlc.volume;

        // ------- NEXT
        this._open.next(open);
        this._high.next(high);
        this._low.next(low);
        this._close.next(close);
        this._volume.next(volume);

        this._tr.next(ohlcs);
        this._atr14.next(this._tr.getLast());

        // this._atr10.next(this._tr.getLast());
        // this._ema14.next(close);
        // const ema14 = this._ema14.getLast();
        // const atr10 = this._atr10.getLast();
        // this._kc.next({ema: ema14, atr: atr10});
        // this._kc2.next({ema: ema14, atr: atr10});
        // this._kc3.next({ema: ema14, atr: atr10});
        // this._kc4.next({ema: ema14, atr: atr10});
        // this._kc5.next({ema: ema14, atr: atr10});
        // this._kc6.next({ema: ema14, atr: atr10});

        // this._cci3.next({high, low, close});
        // this._cci5.next({high, low, close});
        this._cci20.next({high, low, close});

        // this._rsi5.next(this._close);
        // this._rsi14.next(this._close);

        // this._macd12.next(close);
        this._momentum.next(this._close);
        // this._stoch14.next({high, low, close});
        // this._dmi14.next({high: this._high, low: this._low, atr: this._atr14});
        // this._ichimoku.next(close);

        // this._obv.next({close: this._close, volume})
        // this._emaVol.next(volume);
        // this._ema20.next(close);
        // this._ema50.next(close);
        // this._sma50.next(close);
        // this._sma75.next(close);
    }

    update(ohlcs: IndicatorFn<OHLC, Ohlc>) {
        // ------- INITIAL
        this._ohlcs = ohlcs;
        const ohlc = ohlcs.getLast();
        const high = ohlc.high;
        const low = ohlc.low;
        const close = ohlc.close;
        const volume = ohlc.volume;

        // ------- UPDATE
        this._high.update(high);
        this._low.update(low);
        this._close.update(close);
        this._volume.update(volume);

        this._tr.update(ohlcs);
        this._atr14.update(this._tr.getLast());

        // this._atr10.update(this._tr.getLast());
        // this._ema14.update(close);
        // const ema14 = this._ema14.getLast();
        // const atr10 = this._atr10.getLast();
        // this._kc.update({ema: ema14, atr: atr10});
        // this._kc2.update({ema: ema14, atr: atr10});
        // this._kc3.update({ema: ema14, atr: atr10});
        // this._kc4.update({ema: ema14, atr: atr10});
        // this._kc5.update({ema: ema14, atr: atr10});
        // this._kc6.update({ema: ema14, atr: atr10});

        // this._cci3.update({high, low, close});
        // this._cci5.update({high, low, close});
        this._cci20.update({high, low, close});

        // this._rsi5.update(this._close);
        // this._rsi14.update(this._close);

        // this._macd12.update(close);
        this._momentum.update(this._close);
        // this._stoch14.update({high, low, close});
        // this._dmi14.update({high: this._high, low: this._low, atr: this._atr14});
        // this._ichimoku.update({high: high, low: low});

        // this._obv.update({close: this._close, volume})
        // this._emaVol.update(volume);
        // this._ema20.update(close);
        // this._ema50.update(close);
        // this._sma50.update(close);
        // this._sma75.update(close);
    }
}
import {WilderSmoothing} from "./wilder-smoothing";
import {NumberIndicator} from "./number-indicator";

export class ATR extends NumberIndicator {
    private readonly _period: number;
    get period(): number { return this._period; }

    private readonly _wilderSmoothing: WilderSmoothing;

    constructor(length: number, period: number) {
        super(length, 0);
        this._period = period;
        this._wilderSmoothing = new WilderSmoothing(length, period);
    }

    next(tr: number): void {
        this._wilderSmoothing.next(tr);
        const result = this._wilderSmoothing.getLast();
        this._result.next(result);
    }

    update(tr: number): void {
        this._wilderSmoothing.update(tr);
        const result = this._wilderSmoothing.getLast();
        this._result.update(result);
    }
}
import {List} from "../_utils/list";
import {SMA} from "./sma";
import {NumberIndicator} from "./number-indicator";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";
import {NumberList} from "../_utils/number-list";
import {EMA} from "./ema";

export class CCI extends NumberIndicator {
    private readonly _period: number;

    private readonly _typicalPrice: List;
    private readonly _typicalPriceSMA: SMA;

    private readonly _MA: IndicatorFn<EMA>;
    get MA(): IndicatorFn<EMA> { return this._MA; }

    private _index: number = -1;

    constructor(length: number, period: number, emaPeriod?: number) {
        super(length, 0);

        this._period = period;
        this._typicalPrice = new List(length, 0);
        this._typicalPriceSMA = new SMA(length, period);
        this._MA = ToIndicatorFn<EMA, NumberList>(new EMA(length, emaPeriod || period));
    }

    next({high, low, close}: {high: number, low: number, close: number}): void {
        this._index++;
        const typicalPrice = (high + low + close) / 3;

        this._typicalPrice.next(typicalPrice);
        this._typicalPriceSMA.next(typicalPrice);

        const lastTypicalPriceSMA = this._typicalPriceSMA.getLast();
        let meanDeviation;
        if (!lastTypicalPriceSMA) {
            meanDeviation = 0;
        } else {
            let sum = 0;
            for (let j = 0; j < this._period; j++) {
                sum += Math.abs(lastTypicalPriceSMA - this._typicalPrice.get(j));
            }

            meanDeviation = sum / this._period;
        }

        if (this._index < this._period - 1) {
            this._result.next(0);
            this._MA.next(0);
        } else {
            const cci = (typicalPrice - lastTypicalPriceSMA) / (0.015 * meanDeviation);
            this._result.next(cci);
            this._MA.next(cci);
        }
    }

    update({high, low, close}: {high: number, low: number, close: number}): void {
        const typicalPrice = (high + low + close) / 3;

        this._typicalPrice.update(typicalPrice);
        this._typicalPriceSMA.update(typicalPrice);

        const lastTypicalPriceSMA = this._typicalPriceSMA.getLast();
        let meanDeviation;
        if (!lastTypicalPriceSMA) {
            meanDeviation = 0;
        } else {
            let sum = 0;
            for (let j = 0; j < this._period; j++) {
                sum += Math.abs(lastTypicalPriceSMA - this._typicalPrice.get(j));
            }

            meanDeviation = sum / this._period;
        }

        if (this._index < this._period - 1) {
            // this._result.update(0);
        } else {
            const cci = (typicalPrice - lastTypicalPriceSMA) / (0.015 * meanDeviation);
            this._result.update(cci);
            this._MA.update(cci);
        }
    }
}
import {NumberIndicator} from "./number-indicator";

export class Close extends NumberIndicator {
    next(value: number) {
        this._result.next(value);
    }

    update(value: any) {
        this._result.update(value);
    }
}
import {WilderSmoothing} from "./wilder-smoothing";
import {Indicator} from "./indicator";
import {List} from "../_utils/list";
import {NumberList} from "../_utils/number-list";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";

export class DMI extends Indicator<DMI> {
    private readonly _period: number;

    private readonly _PDI: IndicatorFn<NumberList, NumberList>;
    get PDI(): IndicatorFn<NumberList, NumberList> { return this._PDI; }

    private readonly _MDI: IndicatorFn<NumberList, NumberList>;
    get MDI(): IndicatorFn<NumberList, NumberList> { return this._MDI; }

    private readonly _ADX: IndicatorFn<WilderSmoothing, NumberList>;
    get ADX(): IndicatorFn<WilderSmoothing, NumberList> { return this._ADX; }

    private readonly _smoothPDX: WilderSmoothing;
    private readonly _smoothMDX: WilderSmoothing;
    private _index: number = -1;

    constructor(length: number, period) {
        super(length, null);

        this._period = period;
        this._PDI = ToIndicatorFn<NumberList>(new NumberList(period, 0));
        this._MDI = ToIndicatorFn<NumberList>(new NumberList(period, 0));
        this._ADX = ToIndicatorFn<WilderSmoothing, NumberList>(new WilderSmoothing(length, period));
        this._smoothPDX = new WilderSmoothing(length, period);
        this._smoothMDX = new WilderSmoothing(length, period);
    }

    next({high, low, atr}: {high: Indicator, low: Indicator, atr: Indicator}) {
        this._index++;

        if (this._index === 0) {
            this._smoothPDX.next(0);
            this._smoothMDX.next(0);
            this._PDI.next(0);
            this._MDI.next(0);
            this._ADX.next(0);
        } else {
            const HH = high.getLast() - high.get(1);
            const LL = low.get(1) - low.getLast();
            let PDX = 0;
            let MDX = 0;

            if (HH > LL) {
                PDX = Math.max(HH, 0);
            } else {
                MDX = Math.max(LL, 0);
            }
            this._smoothPDX.next(PDX);
            this._smoothMDX.next(MDX);

            if (this._index <= this._period) {
                this._PDI.next(0);
                this._MDI.next(0);
                this._ADX.next(0);
            } else {
                const PDI = this._smoothPDX.getLast() / atr.getLast() * 100;
                const MDI = this._smoothMDX.getLast() / atr.getLast() * 100;

                this._PDI.next(PDI);
                this._MDI.next(MDI);

                const diffDI = Math.abs(PDI - MDI);
                const sumDI = PDI + MDI;
                this._ADX.next(100 * (diffDI/sumDI));
            }
        }
    }

    update({high, low, atr}: {high: Indicator, low: Indicator, atr: Indicator}) {
        if (this._index === 0) {
            return;
        }

        const HH = high.getLast() - high.get(1);
        const LL = low.get(1) - low.getLast();
        let PDX = 0;
        let MDX = 0;

        if (HH > LL) {
            PDX = Math.max(HH, 0);
        } else {
            MDX = Math.max(LL, 0);
        }
        this._smoothPDX.update(PDX);
        this._smoothMDX.update(MDX);

        if (this._index > this._period) {
            const PDI = this._smoothPDX.getLast() / atr.getLast() * 100;
            const MDI = this._smoothMDX.getLast() / atr.getLast() * 100;

            this._PDI.update(PDI);
            this._MDI.update(MDI);

            const diffDI = Math.abs(PDI - MDI);
            const sumDI = PDI + MDI;
            this._ADX.update(100 * (diffDI/sumDI));
        }
    }

    get(index: number) {
        this._selectedIndex = index;

        return this;
    }

    isPDIAboveMDI(diff: number = 0): boolean {
        return this._PDI.get(this._selectedIndex) > this._MDI.get(this._selectedIndex) + diff;
    }

    isPDIBelowMDI(diff: number = 0): boolean {
        return this._PDI.get(this._selectedIndex) < this._MDI.get(this._selectedIndex) - diff;
    }

    isPDIAboveADX(diff: number = 0): boolean {
        return this._PDI.get(this._selectedIndex) > this._ADX.get(this._selectedIndex) + diff;
    }

    isPDIBelowADX(diff: number = 0): boolean {
        return this._PDI.get(this._selectedIndex) < this._ADX.get(this._selectedIndex) - diff;
    }

    isPDIBullish(diff: number = 0): boolean {
        return this._PDI.get(this._selectedIndex) > this._PDI.get(this._selectedIndex + 1) + diff;
    }

    isPDIBearish(diff: number = 0): boolean {
        return this._PDI.get(this._selectedIndex) < this._PDI.get(this._selectedIndex + 1) - diff;
    }

    isMDIBearish(diff: number = 0): boolean {
        return this._MDI.get(this._selectedIndex) < this._MDI.get(this._selectedIndex + 1) - diff;
    }

    isMDIBullish(diff: number = 0): boolean {
        return this._MDI.get(this._selectedIndex) > this._MDI.get(this._selectedIndex + 1) + diff;
    }

    isADXBullish(diff: number = 0): boolean {
        return this._ADX.get(this._selectedIndex) > this._ADX.get(this._selectedIndex + 1) + diff;
    }
}
import {SUM} from "./sum";
import {NumberIndicator} from "./number-indicator";

export class EMA extends NumberIndicator {
    private readonly _period: number;
    private readonly _sum: SUM;
    private readonly _multiplier: number;
    private _index: number = -1;

    constructor(length: number, period: number) {
        super(length, 0);
        this._period = period;
        this._sum = new SUM(period);
        this._multiplier = 2 / (period + 1);
    }

    next(value: number) {
        this._index++;

        if (this._index < this._period) {
            this._sum.next(value);
            this._result.next(this._sum.getValue() / this._period);
        } else {
            const value_1 = this._result.get(1);
            this._result.next(value_1 + this._multiplier * (value - value_1));
        }
    }

    update(value: number) {
        if (this._index < this._period) {
            this._sum.update(value);
            this._result.update(this._sum.getValue() / this._period);
        } else {
            const value_1 = this._result.get(1);
            this._result.update(value_1 + this._multiplier * (value - value_1));
        }
    }
}
import {NumberIndicator} from "./number-indicator";

export class High extends NumberIndicator {
    next(value: number) {
        this._result.next(value);
    }

    update(value: any) {
        this._result.update(value);
    }
}
import {Indicator} from "./indicator";
import {NumberList} from "../_utils/number-list";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";
import {EMA} from "./ema";

export class Ichimoku extends Indicator<Ichimoku> {
    private readonly _conversionLineLength: number;
    private readonly _baseLineLength: number;
    private readonly _leadingSpanBLength: number;

    private _tenkanSenHighs: NumberList;
    private _tenkanSenLows: NumberList;

    private _kijunSenHighs: NumberList;
    private _kijunSenLows: NumberList;

    private _senkouSpanBHighs: NumberList;
    private _senkouSpanBLows: NumberList;

    private readonly _TenkanSen: IndicatorFn<NumberList>;
    get TenkanSen(): IndicatorFn<NumberList> { return this._TenkanSen; }

    private readonly _KijunSen: IndicatorFn<NumberList>;
    get KijunSen(): IndicatorFn<NumberList> { return this._KijunSen; }

    private readonly _SenkouSpanA: IndicatorFn<NumberList>;
    get SenkouSpanA(): IndicatorFn<NumberList> { return this._SenkouSpanA; }

    private readonly _SenkouSpanB: IndicatorFn<NumberList>;
    get SenkouSpanB(): IndicatorFn<NumberList> { return this._SenkouSpanB; }

    private readonly _SenkouSpanMax: IndicatorFn<NumberList>;
    get SenkouSpanMax(): IndicatorFn<NumberList> { return this._SenkouSpanMax; }

    private readonly _SenkouSpanMin: IndicatorFn<NumberList>;
    get SenkouSpanMin(): IndicatorFn<NumberList> { return this._SenkouSpanMin; }

    private readonly _ChikouSpan: IndicatorFn<NumberList>;
    get ChikouSpan(): IndicatorFn<NumberList> { return this._ChikouSpan; }

    constructor(length: number, conversionLineLength: number, baseLineLength: number, leadingSpanBLength: number, laggingSpan: number) {
        super(length, null);

        this._conversionLineLength = conversionLineLength;
        this._baseLineLength = baseLineLength;
        this._leadingSpanBLength = leadingSpanBLength;

        this._tenkanSenHighs = new NumberList(conversionLineLength, 0);
        this._tenkanSenLows = new NumberList(conversionLineLength, 0);

        this._kijunSenHighs = new NumberList(baseLineLength, 0);
        this._kijunSenLows = new NumberList(baseLineLength, 0);

        this._senkouSpanBHighs = new NumberList(leadingSpanBLength, 0);
        this._senkouSpanBLows = new NumberList(leadingSpanBLength, 0);

        this._TenkanSen = ToIndicatorFn(new NumberList(length, 0));
        this._KijunSen = ToIndicatorFn(new NumberList(length, 0));
        this._SenkouSpanA = ToIndicatorFn(new NumberList(length, 0, laggingSpan - 1));
        this._SenkouSpanB = ToIndicatorFn(new NumberList(length, 0, laggingSpan - 1));
        this._SenkouSpanMax = ToIndicatorFn(new NumberList(length, 0, laggingSpan - 1));
        this._SenkouSpanMin = ToIndicatorFn(new NumberList(length, 0, laggingSpan - 1));
        this._ChikouSpan = ToIndicatorFn(new NumberList(length, 0));
    }

    next(value: number) {
        this._tenkanSenHighs.next(value);
        this._tenkanSenLows.next(value);
        const tenkanSen = (this._tenkanSenHighs.getMax() + this._tenkanSenLows.getMin()) / 2;
        this._TenkanSen.next(tenkanSen);

        this._kijunSenHighs.next(value);
        this._kijunSenLows.next(value);
        const kijunSen = (this._kijunSenHighs.getMax() + this._kijunSenLows.getMin()) / 2;
        this._KijunSen.next(kijunSen);

        const senkouSpanA = (tenkanSen + kijunSen) / 2;
        this._SenkouSpanA.next(senkouSpanA);

        this._senkouSpanBHighs.next(value);
        this._senkouSpanBLows.next(value);
        const senkouSpanB = (this._senkouSpanBHighs.getMax() + this._senkouSpanBLows.getMin()) / 2;
        this._SenkouSpanB.next(senkouSpanB);

        if (senkouSpanA > senkouSpanB) {
            this._SenkouSpanMax.next(senkouSpanA);
            this._SenkouSpanMin.next(senkouSpanB);
        } else {
            this._SenkouSpanMax.next(senkouSpanB);
            this._SenkouSpanMin.next(senkouSpanA);
        }
    }

    update({high, low}: { high: number, low: number }) {
        this._tenkanSenHighs.update(high);
        this._tenkanSenLows.update(low);
        const tenkanSen = (this._tenkanSenHighs.getMax() + this._tenkanSenLows.getMin()) / 2;
        this._TenkanSen.update(tenkanSen);

        this._kijunSenHighs.update(high);
        this._kijunSenLows.update(low);
        const kijunSen = (this._kijunSenHighs.getMax() + this._kijunSenLows.getMin()) / 2;
        this._KijunSen.update(kijunSen);

        const senkouSpanA = (tenkanSen + kijunSen) / 2;
        this._SenkouSpanA.update(senkouSpanA);

        this._senkouSpanBHighs.update(high);
        this._senkouSpanBLows.update(low);
        const senkouSpanB = (this._senkouSpanBHighs.getMax() + this._senkouSpanBLows.getMin()) / 2;
        this._SenkouSpanB.update(senkouSpanB);

        if (senkouSpanA > senkouSpanB) {
            this._SenkouSpanMax.update(senkouSpanA);
            this._SenkouSpanMin.update(senkouSpanB);
        } else {
            this._SenkouSpanMax.update(senkouSpanB);
            this._SenkouSpanMin.update(senkouSpanA);
        }
    }

    get(index: number) {
        this._selectedIndex = index;

        return this;
    }

    isCloudBullish(): boolean {
        return this._SenkouSpanA.get(this._selectedIndex) > this._SenkouSpanB.get(this._selectedIndex);
    }

    isTenkanSenAboveKijunSen(): boolean {
        return this._TenkanSen.get(this._selectedIndex) > this._KijunSen.get(this._selectedIndex);
    }

    isTenkanSenBullish(): boolean {
        return this._TenkanSen.get(this._selectedIndex) > this._TenkanSen.get(this._selectedIndex + 1)
    }

    isKijunSenBullish(): boolean {
        return this._KijunSen.get(this._selectedIndex) > this._KijunSen.get(this._selectedIndex + 1)
    }
}
import {Indicator} from "./indicator";
import {NumberList} from "../_utils/number-list";
import {List} from "../_utils/list";

export type IndicatorFn<T extends {}, G = NumberList> = T & {
    (index: number): G;
}

export function ToIndicatorFn<T = NumberList, G = T>(indicator: Indicator | NumberList): IndicatorFn<T, G> {
    const fn = <IndicatorFn<T, G>>indicator.index.bind(indicator);

    getMethods(indicator)
        .filter(prop => prop !== 'length')
        .filter(prop => prop !== 'index')
        .filter(prop => prop !== 'constructor')
        .forEach(prop => {
            if (indicator[prop].bind) {
                fn[prop] = indicator[prop].bind(indicator);
            } else {
                fn[prop] = indicator[prop];
            }
        });

    return fn;
}

function getMethods(obj): string[] {
    const props = [];

    const methods = Reflect.getPrototypeOf(obj);
    if (!methods) { return props; }

    props.push(...Reflect.ownKeys(methods));

    if (obj.__proto__.constructor !== Indicator || obj.__proto__.constructor !== List) {
        props.push(...getMethods(obj.__proto__));
    }

    return props;
}
import {List} from "../_utils/list";

export abstract class Indicator<T = any> {
    protected readonly _length: number;
    get length(): number { return this._length; }

    getPointer(): number { return this._result.pointer; }

    protected readonly _result: List<T>;

    protected _selectedIndex: number;

    constructor(length: number, initValue: T = null) {
        this._length = length;
        this._result = new List(length, initValue);
    }

    abstract next(value: any): void;

    abstract update(value: any): void;

    index(index: number): T {
        this._selectedIndex = index;

        return this as any;
    };

    get(index: number): T {
        return this._result.get(index);
    }

    getLast(): T {
        return this._result.getLast();
    }

    clone(length: number = this._length): List<T> {
        return this._result.clone(length);
    }
}
import {Indicator} from "./indicator";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";
import {NumberList} from "../_utils/number-list";

export class KC extends Indicator {
    private readonly _multiplier: number;

    private readonly _UPPER: IndicatorFn<NumberList, NumberList>;
    get UPPER(): IndicatorFn<NumberList, NumberList> { return this._UPPER; }

    private readonly _MID: IndicatorFn<NumberList, NumberList>;
    get MID(): IndicatorFn<NumberList, NumberList> { return this._MID; }

    private readonly _LOWER: IndicatorFn<NumberList, NumberList>;
    get LOWER(): IndicatorFn<NumberList, NumberList> { return this._LOWER; }

    constructor(length: number, multiplier: number) {
        super(length, 0);

        this._multiplier = multiplier;
        this._UPPER = ToIndicatorFn<NumberList>(new NumberList(length, 0));
        this._MID = ToIndicatorFn<NumberList>(new NumberList(length, 0));
        this._LOWER = ToIndicatorFn<NumberList>(new NumberList(length, 0));
    }

    next({ema, atr}: {ema: number, atr: number}) {
        const band = atr * this._multiplier;
        this._UPPER.next(ema + band);
        this._LOWER.next(ema - band);
        this._MID.next(ema);
    }

    update({ema, atr}: {ema: number, atr: number}) {
        const band = atr * this._multiplier;
        this._UPPER.update(ema + band);
        this._LOWER.update(ema - band);
        this._MID.update(ema);
    }
}
import {NumberIndicator} from "./number-indicator";

export class Low extends NumberIndicator {
    next(value: number) {
        this._result.next(value);
    }

    update(value: any) {
        this._result.update(value);
    }
}
import {EMA} from "./ema";
import {Indicator} from "./indicator";
import {List} from "../_utils/list";
import {NumberList} from "../_utils/number-list";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";

export class MACD extends Indicator<MACD> {
    private readonly _emaLong: EMA;
    private readonly _emaShort: EMA;

    protected _selectedIndex: number;

    private readonly _MACD: IndicatorFn<NumberList, NumberList>;
    get MACD(): IndicatorFn<NumberList, NumberList> { return this._MACD; }

    private readonly _DIFF: IndicatorFn<NumberList, NumberList>;
    get DIFF(): IndicatorFn<NumberList, NumberList> { return this._DIFF; }

    private readonly _DEA: IndicatorFn<EMA, NumberList>;
    get DEA(): IndicatorFn<EMA, NumberList> { return this._DEA; }

    constructor(length: number, long: number, short: number, signal: number) {
        super(length, null);

        this._emaLong = new EMA(length, long);
        this._emaShort = new EMA(length, short);

        this._DIFF = ToIndicatorFn<NumberList>(new NumberList(length));
        this._DEA = ToIndicatorFn<EMA, NumberList>(new EMA(length, signal));
        this._MACD = ToIndicatorFn<NumberList>(new NumberList(length));
    }

    next(value: number): void {
        this._emaLong.next(value);
        this._emaShort.next(value);

        const diff = this._emaShort.getLast() - this._emaLong.getLast();
        this._DIFF.next(diff);
        this._DEA.next(diff);
        this._MACD.next(diff - this._DEA.getLast());
    }

    update(value: number): void {
        this._emaLong.update(value);
        this._emaShort.update(value);

        const diff = this._emaShort.getLast() - this._emaLong.getLast();
        this._DIFF.update(diff);
        this._DEA.update(diff);
        this._MACD.update(diff - this._DEA.getLast());
    }

    get(index: number) {
        this._selectedIndex = index;

        return this;
    }

    isBullish(): boolean {
        return this._MACD.get(this._selectedIndex) > this._MACD.get(this._selectedIndex + 1);
    }

    isPositive(): boolean {
        return this._MACD.get(this._selectedIndex) > 0;
    }

    isNegative(): boolean {
        return this._MACD.get(this._selectedIndex) < 0;
    }
}
import {NumberIndicator} from './number-indicator';
import {Close} from './close';
import {NumberList} from '../_utils/number-list';
import {IndicatorFn, ToIndicatorFn} from './indicator-fn';

export class Momentum extends NumberIndicator {
    private readonly _period: number;
    private _index: number = -1;

    private readonly _value: IndicatorFn<NumberList>;
    get value(): IndicatorFn<NumberList> { return this._value; }

    constructor(length: number, period: number) {
        super(length, 0);
        this._period = period;
        this._value = ToIndicatorFn<NumberList>(new NumberList(length));
    }

    next(close: Close) {
        this._index++;

        if (this._index < this._period) {
            this._result.next(0);
            this._value.next(0);
        } else {
            this._value.next(close.getLast()/close.get(this._period));
            const rateOfChange = (close.getLast() - close.get(this._period)) / close.get(this._period) * 100;
            this._result.next(rateOfChange);
        }
    }

    update(close: Close) {
        if (this._index < this._period) {
        } else {
            this._value.update(close.getLast()/close.get(this._period));
            const rateOfChange = (close.getLast() - close.get(this._period)) / close.get(this._period) * 100;
            this._result.update(rateOfChange);
        }
    }
}
import {NumberList} from "../_utils/number-list";
import {Indicator} from "./indicator";

export abstract class NumberIndicator extends Indicator {
    protected readonly _result: NumberList;

    protected _selectedIndex: number;

    constructor(length: number, initValue: number = null) {
        super(length, initValue);

        this._result = new NumberList(length, initValue);
    }

    index(index: number): NumberList {
        this._result.index(index);
        this._selectedIndex = index;

        return this._result;
    }
}
import {SMA} from './sma';
import {NumberIndicator} from './number-indicator';
import {IndicatorFn, ToIndicatorFn} from './indicator-fn';
import {NumberList} from '../_utils/number-list';
import {Close} from './close';

export class OBV extends NumberIndicator {
    private readonly _MA: IndicatorFn<SMA>;
    get MA(): IndicatorFn<SMA> { return this._MA; }

    private _index: number = -1;

    constructor(length: number, smaPeriod?: number) {
        super(length, 0);

        this._MA = ToIndicatorFn<SMA, NumberList>(new SMA(length, smaPeriod));
    }

    next({close, volume}: { close: Close, volume: number }): void {
        this._index++;
        if (this._index === 0) {
            this._result.next(volume);
            this._MA.next(volume);
        } else {
            const preClose = close.get(1);
            const curClose = close.get(0);

            const obv = preClose === curClose
                ? this._result.get(1)
                : preClose < curClose
                    ? this._result.get(1) + volume
                    : this._result.get(1) - volume;

            this._result.next(obv);
            this._MA.next(obv);
        }
    }

    update({close, volume}: { close: Close, volume: number }): void {
        if (this._index === 0) {
            this._result.update(volume);
            this._MA.update(volume);
        } else {
            const preClose = close.get(1);
            const curClose = close.get(0);

            const obv = preClose === curClose
                ? this._result.get(1)
                : preClose < curClose
                    ? this._result.get(1) + volume
                    : this._result.get(1) - volume;

            this._result.update(obv);
            this._MA.update(obv);
        }
    }
}
import {Indicator} from "./indicator";
import {Ohlc} from "../models/ohlc";

interface UpdateOhlc {
    tradeTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export class OHLC extends Indicator<Ohlc> {
    constructor(length: number) {
        const ohlc = {
            isFirstTrade: true,
            symbol: null,
            time: 0,
            tradeTime: 0,
            open: 0,
            high: 0,
            low: 0,
            close: 0,
            volume: 0
        };
        super(length, new Ohlc(ohlc));
    }

    next(ohlc: Ohlc) {
        const max = Math.max(ohlc.open, ohlc.close);
        const min = Math.min(ohlc.open, ohlc.close);

        ohlc.max = max;
        ohlc.min = min;
        ohlc.body = max - min;
        ohlc.upperShadow = ohlc.high - max;
        ohlc.lowerShadow = min - ohlc.low;

        this._result.next(ohlc);
    }

    update({tradeTime, open, high, low, close, volume}: UpdateOhlc) {
        const ohlc = this._result.getLast();

        ohlc.isFirstTrade = false;
        ohlc.tradeTime = tradeTime;
        ohlc.high = high;
        ohlc.low = low;
        ohlc.close = close;
        ohlc.volume = volume;

        const max = Math.max(open, close);
        const min = Math.min(open, close);

        ohlc.max = max;
        ohlc.min = min;
        ohlc.body = max - min;
        ohlc.upperShadow = high - max;
        ohlc.lowerShadow = min - low;
    }

    index(index: number): Ohlc {
        return this._result.get(index);
    };
}
import {NumberIndicator} from "./number-indicator";

export class Open extends NumberIndicator {
    next(value: number) {
        this._result.next(value);
    }

    update(value: any) {
        this._result.update(value);
    }
}
import {NumberList} from "../_utils/number-list";
import {Close} from "./close";
import {NumberIndicator} from "./number-indicator";
import {IndicatorFn, ToIndicatorFn} from "./indicator-fn";
import {SMA} from "./sma";

export class RSI extends NumberIndicator {
    private readonly _period: number;

    private readonly _gain: NumberList;

    private readonly _loss: NumberList;

    private readonly _preAvgGain: NumberList;

    private readonly _preAvgLoss: NumberList;

    private _index: number = -1;

    private readonly _MA: IndicatorFn<SMA>;
    get MA(): IndicatorFn<SMA> { return this._MA; }

    constructor(length: number, period: number) {
        super(length, 0);

        this._period = period;

        this._gain = new NumberList(period, 0);
        this._loss = new NumberList(period, 0);
        this._preAvgGain = new NumberList(period, 0);
        this._preAvgLoss = new NumberList(period, 0);
        this._MA = ToIndicatorFn<SMA, NumberList>(new SMA(length, period));
    }

    name = () => {}


    next(close: Close) {
        const value = close.getLast();
        const preValue = close.get(1);

        this._index++;

        if (this._index === 0) {
            this._gain.next(0);
            this._loss.next(0);
            this._result.next(0);
            this._MA.next(0);
            return;
        }

        let gain = 0;
        let loss = 0;
        if (value > preValue) {
            gain = value - preValue;
        } else if (value < preValue) {
            loss = preValue - value;
        }

        if (this._index < this._period) {
            this._gain.next(gain);
            this._loss.next(loss);
            this._result.next(0);
            this._MA.next(0);
            return;
        }

        let avgGain;
        let avgLoss;
        if (this._index === this._period) {
            this._gain.next(gain);
            this._loss.next(loss);

            avgGain = this._gain.getSum() / this._period;
            avgLoss = this._loss.getSum() / this._period;
        } else {
            avgGain = ((this._preAvgGain.getLast() * (this._period - 1)) + gain) / this._period;
            avgLoss = ((this._preAvgLoss.getLast() * (this._period - 1)) + loss) / this._period;
        }

        this._preAvgGain.next(avgGain);
        this._preAvgLoss.next(avgLoss);

        const rs = avgGain / avgLoss;
        const rsi = 100 - 100 / (1 + rs);
        this._result.next(rsi);
        this._MA.next(rsi);
    }

    update(close: Close) {
        const value = close.getLast();
        const preValue = close.get(1);

        if (this._index === 0) {
            return;
        }

        let gain = 0;
        let loss = 0;
        if (value > preValue) {
            gain = value - preValue;
        } else if (value < preValue) {
            loss = preValue - value;
        }

        if (this._index < this._period) {
            this._gain.update(gain);
            this._loss.update(loss);
            return;
        }

        let avgGain;
        let avgLoss;
        if (this._index === this._period) {
            this._gain.update(gain);
            this._loss.update(loss);

            avgGain = this._gain.getSum() / this._period;
            avgLoss = this._loss.getSum() / this._period;
        } else {
            avgGain = ((this._preAvgGain.get(1) * (this._period - 1)) + gain) / this._period;
            avgLoss = ((this._preAvgLoss.get(1) * (this._period - 1)) + loss) / this._period;
        }

        this._preAvgGain.update(avgGain);
        this._preAvgLoss.update(avgLoss);

        const rs = avgGain / avgLoss;
        const rsi = 100 - 100 / (1 + rs);
        this._result.update(rsi);
        this._MA.update(rsi);
    }
}
import {SUM} from "./sum";
import {NumberIndicator} from "./number-indicator";

export class SMA extends NumberIndicator {
    private readonly _period: number;
    private readonly _sum: SUM;

    constructor(length: number, period: number) {
        super(length, 0);
        this._period = period;
        this._sum = new SUM(period);
    }

    next(value: number) {
        this._sum.next(value);
        const sum = this._sum.getValue();

        this._result.next(sum/this._period);
    }

    update(value: number) {
        this._sum.update(value);
        const sum = this._sum.getValue();

        this._result.update(sum/this._period);
    }
}
import {Indicator} from './indicator';
import {NumberList} from '../_utils/number-list';
import {IndicatorFn, ToIndicatorFn} from './indicator-fn';
import {SMA} from './sma';

export class Stochastic extends Indicator<Stochastic> {
    protected _selectedIndex: number;

    private readonly _K: IndicatorFn<NumberList>;
    get K(): IndicatorFn<NumberList> { return this._K; }

    private readonly _D: IndicatorFn<SMA>;
    get D(): IndicatorFn<SMA> { return this._D; }

    private readonly _highs: NumberList;

    private readonly _lows: NumberList;

    private readonly _k: number;

    private _index: number = -1;

    constructor(length: number, k: number, d: number) {
        super(length, null);

        this._k = k;

        this._highs = new NumberList(k);
        this._lows = new NumberList(k);

        this._K = ToIndicatorFn<NumberList>(new NumberList(length));
        this._D = ToIndicatorFn<SMA, NumberList>(new SMA(length, d));
    }

    next({high, low, close}: { high: number, low: number, close: number }): void {
        this._index++;

        this._highs.next(high);
        this._lows.next(low);

        if (this._index < this._k) {
            this._K.next(0);
            this._D.next(0);
        } else {
            const K = (close - this._lows.getMin()) / (this._highs.getMax() - this._lows.getMin()) * 100;
            this._K.next(K);
            this._D.next(K);
        }
    }

    update({high, low, close}: { high: number, low: number, close: number }): void {
        this._highs.update(high);
        this._lows.update(low);

        if (this._index < this._k) {
        } else {
            const K = (close - this._lows.getMin()) / (this._highs.getMax() - this._lows.getMin()) * 100;
            this._K.update(K);
            this._D.update(K);
        }
    }
}
import {Indicator} from "./indicator";

export class SUM extends Indicator {
    private _sum: number = 0;

    constructor(length: number) {
        super(length, 0);
    }

    next(value: number): void {
        this._sum -= this._result.getFirst();
        this._sum += value;
        this._result.next(value);
    }

    update(value: number): void {
        this._sum -= this._result.getLast();
        this._sum += value;
        this._result.update(value);
    }

    getValue(): number {
        return this._sum;
    }
}
import {OHLC} from "./ohlc";
import {NumberIndicator} from "./number-indicator";

export class TR extends NumberIndicator {
    private _index: number = -1;

    constructor(length: number) {
        super(length, 0);
    }

    next(ohlcs: OHLC) {
        this._index++;

        if (this._index === 0) {
            this._result.next(0);
        } else {
            this._result.next(this._calcTr(ohlcs));
        }
    }

    update(ohlcs: OHLC) {
        if (this._index > 0) {
            this._result.update(this._calcTr(ohlcs));
        }
    }

    private _calcTr(ohlcs: OHLC): number {
        const {high, low} = ohlcs.getLast();
        const {close} = ohlcs.get(1);

        const tr1 = high-low;
        const tr2 = Math.abs(high - close);
        const tr3 = Math.abs(low - close);

        return Math.max(tr1, tr2, tr3);
    }
}
import {NumberIndicator} from './number-indicator';
import {IndicatorFn, ToIndicatorFn} from './indicator-fn';
import {NumberList} from '../_utils/number-list';
import {SMA} from './sma';

export class Volume extends NumberIndicator {
    private readonly _MA: IndicatorFn<SMA>;
    get MA(): IndicatorFn<SMA> { return this._MA; }

    constructor(length: number, period: number) {
        super(length, 0);

        this._MA = ToIndicatorFn<SMA, NumberList>(new SMA(length, period));

        this._result['isGreaterThanMA'] = this.isGreaterThanMA.bind(this);
    }

    next(value: number) {
        this._result.next(value);
        this._MA.next(value);
    }

    update(value: any) {
        this._result.update(value);
        this._MA.update(value);
    }

    isGreaterThanMA(ratio: number = 1): boolean {
        return this._result.get(this._selectedIndex) > this._MA.get(this._selectedIndex) * ratio;
    }
}
import {SUM} from "./sum";
import {NumberIndicator} from "./number-indicator";

export class WilderSmoothing extends NumberIndicator {
    private readonly _period: number;
    private readonly _sum: SUM;
    private readonly _multiplier: number;
    private _index: number = -1;

    constructor(length: number, period: number) {
        super(length, 0);
        this._period = period;
        this._sum = new SUM(period);
        this._multiplier = this._period - 1;
    }

    next(value: number) {
        this._index++;

        if (this._index < this._period) {
            this._sum.next(value);
            this._result.next(0);
        } else if (this._index === this._period) {
            this._sum.next(value);
            this._result.next(this._sum.getValue() / this._period);
        } else {
            const value_1 = this._result.get(1);
            const result = (value_1 * this._multiplier + value) / this._period;
            this._result.next(result);
        }
    }

    update(value: number) {
        if (this._index < this._period) {
            this._sum.update(value);
        } else if (this._index === this._period) {
            this._sum.update(value);
            this._result.update(this._sum.getValue() / this._period);
        } else {
            const value_1 = this._result.get(1);
            const result = (value_1 * this._multiplier + value) / this._period;
            this._result.update(result);
        }
    }
}
export class List<T = number> {
    private _pointer: number = -1;
    get pointer(): number { return this._pointer; }

    protected readonly _list: T[];

    private readonly _length: number;
    get length(): number { return this._length; }

    private readonly _laggingSpan;

    protected _selectedIndex: number;

    constructor(length: number, initValue: T = null, laggingSpan: number = 0) {
        this._length = length;
        this._list = new Array(length);

        this._laggingSpan = laggingSpan;

        for (let i = 0; i < this._length; i++) {
            this.next(initValue);
        }
    }

    next(value: T): void {
        this._pointer ++;
        this.update(value);
    }

    update(value: T): void {
        const i = this._pointer % this._length;
        this._list[i] = value;
    }

    get(index: number): T {
        const i = (this._pointer - index - this._laggingSpan) % this._length;
        return this._list[i];
    }

    getFirst(): T {
        return this.get(-1);
    }

    getLast(): T {
        return this.get(0);
    }

    clone(length: number = this._length): List<T> {
        const clone = new List<T>(length);

        for (let i = length; i > -1; i--) {
            let value = this.get(i);
            if (typeof value === 'object') {
                value = JSON.parse(JSON.stringify(value));
            }

            clone.next(value);
        }

        return clone;
    }

    index(index: number) {
        this._selectedIndex = index;
        return this;
    }
}
import {List} from "./list";
import {Indicator} from "../_indicators/indicator";

export class NumberList extends List<number> {
    getMax(): number {
        return Math.max(...this._list);
    }

    getMin(): number {
        return Math.min(...this._list);
    }

    getSum(): number {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += this._list[i];
        }

        return sum;
    }

    isBullish(): boolean {
        return this.get(this._selectedIndex) > this.get(this._selectedIndex + 1);
    }

    isBearish(): boolean {
        return this.get(this._selectedIndex) < this.get(this._selectedIndex + 1);
    }

    isLessThan(value: number | Indicator | NumberList): boolean {
        if (typeof value === 'number') {
            return this.get(this._selectedIndex) < value;
        } else {
            return this.get(this._selectedIndex) < value.get(this._selectedIndex);
        }
    }

    isGreaterThan(value: number | Indicator | NumberList): boolean {
        if (typeof value === 'number') {
            return this.get(this._selectedIndex) > value;
        } else {
            return this.get(this._selectedIndex) > value.get(this._selectedIndex);
        }
    }

    isLessThanIndex(index: number): boolean {
        return this.get(this._selectedIndex) < this.get(index);
    }

    isGreaterThanIndex(index: number): boolean {
        return this.get(this._selectedIndex) > this.get(index);
    }

    isCrossover(value: number | Indicator | NumberList): boolean {
        if (typeof value === 'number') {
            return this._isCrossoverValue(value);
        } else {
            return this._isCrossoverIndicator(value);
        }
    }

    private _isCrossoverValue(value: number): boolean {
        return this.get(this._selectedIndex) > value
            && this.get(this._selectedIndex + 1) < value;
    }

    private _isCrossoverIndicator(list: Indicator | NumberList): boolean {
        return this.get(this._selectedIndex) > list.get(this._selectedIndex)
            && this.get(this._selectedIndex + 1) < list.get(this._selectedIndex + 1);
    }
}
import {LogHandler} from "../logger/log-handler";
import * as binance from "binance-api-node";
import {Symbol, SymbolLotSizeFilter, SymbolPriceFilter} from "binance-api-node";


export class ExchangeInfo {
    private static symbols: Symbol[] = [];
    private static _isGettingInfo: boolean;
    private static _exchangeInfoSubscribers = [];

    static getExchangeInfo(): Promise<Symbol[]> {
        if (this._isGettingInfo) {
            return new Promise(resolve => this._exchangeInfoSubscribers.push(resolve));
        }

        this._isGettingInfo = true;

        return binance.default({})
            .exchangeInfo()
            .then((exchangeInfo) => {
                ExchangeInfo.symbols = exchangeInfo.symbols;
                LogHandler.info('ExchangeInfo Fetched');
                this._isGettingInfo = false;
                this._exchangeInfoSubscribers.forEach(resolve => resolve());
                return exchangeInfo.symbols;
            })
            .catch(err => {
                LogHandler.error(err);
                this._isGettingInfo = false;
                throw err;
            });
    }

    static fixQuantityByLotSize(symbol: string, quantity: number): string {
        return quantity.toFixed(ExchangeInfo._getLotSize(symbol));
    }

    static fixPriceByTickSize(symbol: string, price: number): string {
        return price.toFixed(ExchangeInfo._getTickSize(symbol));
    }

    static getSymbolInfo(symbol: string): Symbol {
        return ExchangeInfo.symbols.find(item => item.symbol === symbol);
    }

    private static _getLotSize(symbol: string): number {
        const symbolInfo = ExchangeInfo.getSymbolInfo(symbol);
        const lotSizeFilter = symbolInfo.filters.find(item => item.filterType === 'LOT_SIZE') as SymbolLotSizeFilter;
        const stepSize = +lotSizeFilter.stepSize;
        return Math.round(1 / stepSize).toString().length - 1;
    }

    private static _getTickSize(symbol: string): number {
        const symbolInfo = ExchangeInfo.getSymbolInfo(symbol);
        const tickSizeFilter = symbolInfo.filters.find(item => item.filterType === 'PRICE_FILTER') as SymbolPriceFilter;
        const tickSize = +tickSizeFilter.tickSize;
        return Math.round(1 / tickSize).toString().length - 1;
    }
}
import {OhlcRow} from "../models/ohlc";
import {ajax, AjaxRequest} from "rxjs/ajax";
import {pluck} from "rxjs/operators";
import {XMLHttpRequest} from 'xmlhttprequest';
import {MIN_INDICATORS_DATA_LENGTH} from "../config";

export function getOhlcRowData(interval: string, symbol: string): Promise<OhlcRow[]> {
    const options: any = {
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        createXHR: () => new XMLHttpRequest(),
        url: `https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${interval}&limit=${MIN_INDICATORS_DATA_LENGTH}`,
        method: 'GET'
    }

    return ajax(options)
        .pipe(pluck<any, any>('response'))
        .toPromise();
}/*
import {Client} from "./client";
import {SYMBOL} from "../config";
import {OrderType} from "binance-api-node";

export interface TradeAndOcoOption {
    price: number,
    takeProfit: number,
    stopLoss: number,
    investmentAmount: number;
}
export async function TradeAndOco(option: TradeAndOcoOption) {
    const quantity = option.investmentAmount / option.price;

    const order = await Client.order({
        type: 'MARKET',
        side: 'BUY',
        symbol: SYMBOL,
        quantity: quantity.toFixed(6)
    });
    console.log('[ORDER MARKET]', order);
    await sleep(2_000);

    const buyPrice = +order.fills[0].price;
    const stopLoss = buyPrice - buyPrice * (option.stopLoss / 100);
    const takeProfit = buyPrice + buyPrice * (option.takeProfit / 100);
    const orderOco = await Client.orderOco({
        side: 'SELL',
        symbol: SYMBOL,
        quantity: order.origQty,
        price: takeProfit.toFixed(2),
        stopPrice: stopLoss.toFixed(2),
        stopLimitPrice: stopLoss.toFixed(2)
    })
    console.log('[ORDER OCO]', orderOco);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
*/
import {timeIntervalPattern} from "./enums/intervals";
import {Data, IndicatorsData} from "./models/data";
import {minimumInterval} from "./models/minimum-interval";
import {TimeInterval} from "./models/interval";
import {maximumInterval} from "./models/maximum-interval";
import {StrategyInvestFactory} from './users/users-config';

export const BINANCE_FEE = 0.00075;
export const MIN_INDICATORS_DATA_LENGTH = 110;
export const INDICATORS_DATA_DIR = '../indicators-data';
export const INTERVAL_TIME_PATTERN = timeIntervalPattern;
export const AVAILABLE_INTERVALS: TimeInterval[] = [
    // '1m',
    // '5m',
    // '15m',
    // '30m',
    // '1h',
    // '2h',
    // '4h',
    // '6h',
    // '8h',
    // '12h',
    '1d'
];
export const INTERVALS_DATA = new Data(AVAILABLE_INTERVALS);
export const INDICATORS_DATA = new IndicatorsData(AVAILABLE_INTERVALS);
export const MIN_INTERVAL = minimumInterval(INTERVALS_DATA);
export const MAX_INTERVAL = maximumInterval(INTERVALS_DATA);
export const MIN_USDT_AMOUNT_FOR_ORDER = 20;
export const STRATEGY_INVEST_FACTOR: StrategyInvestFactory = {
    default: 0.1,
    maxPositionSize: 0.2,
    minPositionSize: 0.02,
    maxIndexValue: 80,
    minIndexValue: 20
};
export const CONFIG = {
    FEAR_AND_GREED_INDEX: 50,
    DCA_LEVEL: -5,
    IS_FOR_TEST: false
};
export enum Intervals {
    m5 = '5m',
    m15 = '15m',
    m30 = '30m',
    h1 = '1h',
    h2 = '2h',
    h4 = '4h',
    h6 = '6h',
    h8 = '8h',
    h12 = '12h',
    d1 = '1d',
    d3 = '3d',
    w1 = '1w'
}

export const timeIntervalPattern = {
    '1m' :      60 * 1000,
    '5m' :  5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '30m': 30 * 60 * 1000,
    '1h' : 60 * 60 * 1000,
    '2h' :  2 * 60 * 60 * 1000,
    '4h' :  4 * 60 * 60 * 1000,
    '6h' :  6 * 60 * 60 * 1000,
    '8h' :  8 * 60 * 60 * 1000,
    '12h': 12 * 60 * 60 * 1000,
    '1d' : 24 * 60 * 60 * 1000,
    '3d' :  3 * 24 * 60 * 60 * 1000,
    '1w' :  7 * 24 * 60 * 60 * 1000,
};export enum OrderSide {
    BUY= 'BUY',
    SELL = 'SELL'
}import {EventHandler} from "./event-handler";
import {Subject} from "rxjs";

describe('EventHandler', () => {
    it('#buySignal should be a Subject', () => {
        expect(EventHandler.buySignal instanceof Subject).toBeTruthy();
    });

    it('#sellSignal should be a Subject', () => {
        expect(EventHandler.sellSignal instanceof Subject).toBeTruthy();
    });
})
import {Subject} from "rxjs";
import {BuySignalEvent} from "./events/buy-signal-event";
import {SellSignalEvent} from "./events/sell-signal-event";
import {BuyOrderEvent} from "./events/buy-order-event";
import {SellOrderEvent} from "./events/sell-order-event";

export class EventHandler {
    static readonly buySignal = new Subject<BuySignalEvent>();
    static readonly sellSignal = new Subject<SellSignalEvent>();

    static readonly buyOrderEvent = new Subject<BuyOrderEvent>();
    static readonly sellOrderEvent = new Subject<SellOrderEvent>();
}
import {OrderEvent} from "./order-event";

export class BuyOrderEvent extends OrderEvent {}
import {SignalEvent} from "./signal-event";

export class BuySignalEvent extends SignalEvent {
    time: number;
    dalerCostAvg: number;
}
export abstract class AppEvent {}
import {AppEvent} from "./event";

export class OrderEvent implements AppEvent {
    symbol: string;
    price: string;
    timeInterval: string;
    strategyName: string;
    quantity: string;
    username: string;
}
import {OrderEvent} from "./order-event";

export class SellOrderEvent extends OrderEvent {}
import {SignalEvent} from "./signal-event";

export class SellSignalEvent extends SignalEvent {
    buyTime: number;
    sellTime: number;
    minChanges: number;
    maxChanges: number;
    sellChanges: number;
    dalerCostAvg: number;
}
import {AppEvent} from "./event";

export class SignalEvent implements AppEvent {
    symbol: string;
    price: number;
    timeInterval: string;
    strategyName: string;
}
import {ConsoleColor} from "../logger/console-color";
import {PadEnd} from "../logger/pad-end";
import {ValidationException} from "./validation-exception";

export class InsufficientBalanceException extends ValidationException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(symbol: string = '', timeInterval: string = '', strategyName: string = '') {
        super();

        this._message = `${ConsoleColor.BG_BLUE}BUY ${ConsoleColor.RESET} ${PadEnd.symbol(symbol)} ${PadEnd.interval(timeInterval)} ${PadEnd.strategyName(strategyName)} Account has an insufficient balance`;
    }
}
import {ValidationException} from "./validation-exception";

export class CredentialExpiredException extends ValidationException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(expirationDate: string) {
        super();

        this._message = 'Account has expired on ' + expirationDate;
    }
}
import {ConsoleColor} from "../logger/console-color";
import {PadEnd} from "../logger/pad-end";
import {ValidationException} from "./validation-exception";

export class DuplicateOrderException extends ValidationException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(symbol: string, timeInterval: string) {
        super();

        this._message = `${ConsoleColor.BG_BLUE}BUY ${ConsoleColor.RESET} ${PadEnd.symbol(symbol)} ${PadEnd.interval(timeInterval)} Order is duplicate in same timeInterval`;
    }
}
import {PadEnd} from "../logger/pad-end";
import {ResponseException} from "./response-exception";

export class EconnresetException extends ResponseException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(symbol: string) {
        super();

        this._message = PadEnd.symbol(symbol) + ' ECONNRESET error';
    }
}
export class ExceptionCatch {
    private _isNotDone = true;

    catch(expression: boolean, callback: () => void): ExceptionCatch {
        if (this._isNotDone && expression) {
            callback();
            this._isNotDone = false;
        }

        return this;
    }
}
export abstract class Exception extends Error {
    abstract message: string;
}
import {PadEnd} from "../logger/pad-end";
import {ResponseException} from "./response-exception";

export class InvalidTimestampException extends ResponseException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(symbol: string) {
        super();

        this._message = PadEnd.symbol(symbol) + ' INVALID_TIMESTAMP error';
    }
}
import {PadEnd} from "../logger/pad-end";
import {ResponseException} from "./response-exception";

export class LotSizeException extends ResponseException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(symbol: string) {
        super();

        this._message = PadEnd.symbol(symbol) + ' LOT_SIZE filter error';
    }
}
import {ConsoleColor} from "../logger/console-color";
import {PadEnd} from "../logger/pad-end";
import {ValidationException} from "./validation-exception";

export class OrderNotTradedException extends ValidationException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(symbol: string, strategyName: string, timeInterval: string) {
        super();

        this._message = `${ConsoleColor.BG_RED}SELL${ConsoleColor.RESET} ${PadEnd.symbol(symbol)} ${PadEnd.interval(timeInterval)} ${PadEnd.strategyName(strategyName)} Order is not traded`;
    }
}
import {Exception} from "./exception";

export abstract class ResponseException extends Exception {}
import {ConsoleColor} from "../logger/console-color";
import {PadEnd} from "../logger/pad-end";
import {ValidationException} from "./validation-exception";

export class StrategyPermitException extends ValidationException {
    private readonly _message: string;
    get message(): string { return this._message; }

    constructor(strategyName: string) {
        super();

        this._message = `${ConsoleColor.BG_BLUE}BUY ${ConsoleColor.RESET} ${PadEnd.strategyName(strategyName)} has not permitted to send an order`;
    }
}
import {Exception} from "./exception";

export abstract class ValidationException extends Exception {}
import './uncaught-exception-handler';
import {OhlcData} from './ohlc-data';
import {Data, IndicatorsData} from './models/data';
import {AVAILABLE_INTERVALS} from './config';
import {Jobs} from './jobs';
import {ExchangeInfo} from './api/exchange-info';
import {LogHandler} from './logger/log-handler';
import {StrategyRunner} from './strategies/strategy-runner';
import {StrategyA16Runner} from './strategies/strategies/strategy-A16';
import {StrategyW01Runner} from './strategies/strategies/strategy-W01';
import {StrategyW02Runner} from './strategies/strategies/strategy-W02';
import {StrategyW03Runner} from './strategies/strategies/strategy-W03';
import {StrategyY00Runner} from './strategies/strategies/strategy-Y00';
import {StrategyG00Runner} from './strategies/strategies/strategy-G00';
import {StrategyG01Runner} from './strategies/strategies/strategy-G01';
import {StrategyY10Runner} from './strategies/strategies/strategy-Y10';
import {StrategyA61Runner} from './strategies/strategies/strategy-A61';
import {StrategyX48Runner} from './strategies/strategies/strategy-X48';
import {StrategyX49Runner} from './strategies/strategies/strategy-X49';
import {StrategyX50Runner} from './strategies/strategies/strategy-X50';
import {StrategyA74Runner} from './strategies/strategies/strategy-A74';
import {StrategyY42Runner} from './strategies/strategies/strategy-Y42';
import {StrategyY44Runner} from './strategies/strategies/strategy-Y44';
import {StrategyP20Runner} from './strategies/strategies/strategy-P20';
import {StrategyP24Runner} from './strategies/strategies/strategy-P24';
import {StrategyA17Runner} from './strategies/strategies/strategy-A17';
import {StrategyX00Runner} from './strategies/strategies/strategy-X00';
import {StrategyX10Runner} from './strategies/strategies/strategy-X10';
import {StrategyX20Runner} from './strategies/strategies/strategy-X20';
import {StrategyX30Runner} from './strategies/strategies/strategy-X30';
import {StrategyX40Runner} from './strategies/strategies/strategy-X40';
import {StrategyX70Runner} from './strategies/strategies/strategy-X70';
import {StrategyX81Runner} from './strategies/strategies/strategy-X81';
import {StrategyX01Runner} from './strategies/strategies/strategy-X01';
import {StrategyX11Runner} from './strategies/strategies/strategy-X11';
import {StrategyX21Runner} from './strategies/strategies/strategy-X21';
import {StrategyX41Runner} from './strategies/strategies/strategy-X41';
import {StrategyX61Runner} from './strategies/strategies/strategy-X61';
import {StrategyX71Runner} from './strategies/strategies/strategy-X71';
import {StrategyX85Runner} from './strategies/strategies/strategy-X85';
import {StrategyX86Runner} from './strategies/strategies/strategy-X86';
import {StrategyX65Runner} from './strategies/strategies/strategy-X65';
import {StrategyX56Runner} from './strategies/strategies/strategy-X56';
import {StrategyX66Runner} from './strategies/strategies/strategy-X66';
import {StrategyQ00Runner} from './strategies/strategies/strategy-Q00';
import {StrategyY45Runner} from './strategies/strategies/strategy-Y45';
import {StrategyA70Runner} from './strategies/strategies/strategy-A70';
import {StrategyY47Runner} from './strategies/strategies/strategy-Y47';
import {StrategyA73Runner} from './strategies/strategies/strategy-A73';
import {StrategyA72Runner} from './strategies/strategies/strategy-A72';
import {SymbolsLastPrice} from './symbols-last-price';
import {StrategyX02Runner} from './strategies/strategies/strategy-X02';
import {StrategyX03Runner} from './strategies/strategies/strategy-X03';
import {StrategyX42Runner} from './strategies/strategies/strategy-X42';
import {StrategyY80Runner} from './strategies/strategies/strategy-Y80';
import {StrategyY81Runner} from './strategies/strategies/strategy-Y81';
import {StrategyY82Runner} from './strategies/strategies/strategy-Y82';
import {StrategyY83Runner} from './strategies/strategies/strategy-Y83';
import {StrategyY84Runner} from './strategies/strategies/strategy-Y84';
import {StrategyY85Runner} from './strategies/strategies/strategy-Y85';
import {StrategyY86Runner} from './strategies/strategies/strategy-Y86';
import {StrategyY87Runner} from './strategies/strategies/strategy-Y87';
import {StrategyY88Runner} from './strategies/strategies/strategy-Y88';
import {StrategyX78Runner} from './strategies/strategies/strategy-X78';
import {StrategyX87Runner} from './strategies/strategies/strategy-X87';
import {StrategyX88Runner} from './strategies/strategies/strategy-X88';
import {StrategyX53Runner} from './strategies/strategies/strategy-X53';
import {StrategyA00Runner} from './strategies/strategies/strategy-A00';
import {StrategyA01Runner} from './strategies/strategies/strategy-A01';
import {StrategyA02Runner} from './strategies/strategies/strategy-A02';
import {StrategyA03Runner} from './strategies/strategies/strategy-A03';
import {StrategyA04Runner} from './strategies/strategies/strategy-A04';
import {StrategyA05Runner} from './strategies/strategies/strategy-A05';
import {StrategyA12Runner} from './strategies/strategies/strategy-A12';
import {StrategyA14Runner} from './strategies/strategies/strategy-A14';
import {StrategyA15Runner} from './strategies/strategies/strategy-A15';
import {StrategyA20Runner} from './strategies/strategies/strategy-A20';
import {StrategyA21Runner} from './strategies/strategies/strategy-A21';
import {StrategyA22Runner} from './strategies/strategies/strategy-A22';
import {StrategyA23Runner} from './strategies/strategies/strategy-A23';
import {StrategyA24Runner} from './strategies/strategies/strategy-A24';
import {StrategyA25Runner} from './strategies/strategies/strategy-A25';
import {StrategyA30Runner} from './strategies/strategies/strategy-A30';
import {StrategyA31Runner} from './strategies/strategies/strategy-A31';
import {StrategyA32Runner} from './strategies/strategies/strategy-A32';
import {StrategyA33Runner} from './strategies/strategies/strategy-A33';
import {StrategyA34Runner} from './strategies/strategies/strategy-A34';
import {StrategyA35Runner} from './strategies/strategies/strategy-A35';
import {StrategyA07Runner} from './strategies/strategies/strategy-A07';
import {StrategyA08Runner} from './strategies/strategies/strategy-A08';
import {StrategyA40Runner} from './strategies/strategies/strategy-A40';
import {StrategyA41Runner} from './strategies/strategies/strategy-A41';
import {StrategyA42Runner} from './strategies/strategies/strategy-A42';
import {StrategyA43Runner} from './strategies/strategies/strategy-A43';
import {StrategyA44Runner} from './strategies/strategies/strategy-A44';
import {StrategyA45Runner} from './strategies/strategies/strategy-A45';
import {StrategyA50Runner} from './strategies/strategies/strategy-A50';
import {StrategyQ40Runner} from './strategies/strategies/strategy-Q40';
import {StrategyQ41Runner} from './strategies/strategies/strategy-Q41';
import {StrategyP30Runner} from './strategies/strategies/strategy-P30';
import {StrategyP31Runner} from './strategies/strategies/strategy-P31';
import {StrategyP32Runner} from './strategies/strategies/strategy-P32';
import {StrategyP33Runner} from './strategies/strategies/strategy-P33';
import {StrategyA60Runner} from './strategies/strategies/strategy-A60';
import {StrategyA51Runner} from './strategies/strategies/strategy-A51';
import {StrategyA53Runner} from './strategies/strategies/strategy-A53';
import {StrategyA52Runner} from './strategies/strategies/strategy-A52';
import {StrategyA54Runner} from './strategies/strategies/strategy-A54';
import {StrategyA55Runner} from './strategies/strategies/strategy-A55';
import {StrategyA56Runner} from './strategies/strategies/strategy-A56';
import {StrategyA58Runner} from './strategies/strategies/strategy-A58';
import {StrategyA57Runner} from './strategies/strategies/strategy-A57';
import {StrategyA59Runner} from './strategies/strategies/strategy-A59';
import {StrategyP34Runner} from './strategies/strategies/strategy-P34';
import {StrategyM20Runner} from './strategies/strategies/strategy-M20';
import {StrategyM21Runner} from './strategies/strategies/strategy-M21';
import {StrategyM22Runner} from './strategies/strategies/strategy-M22';
import {StrategyP25Runner} from './strategies/strategies/strategy-P25';
import {StrategyP26Runner} from './strategies/strategies/strategy-P26';
import {StrategyP27Runner} from './strategies/strategies/strategy-P27';
import {StrategyP40Runner} from './strategies/strategies/strategy-P40';
import {StrategyP41Runner} from './strategies/strategies/strategy-P41';
import {StrategyP42Runner} from './strategies/strategies/strategy-P42';
import {StrategyP43Runner} from './strategies/strategies/strategy-P43';
import {StrategyP44Runner} from './strategies/strategies/strategy-P44';
import {StrategyM31Runner} from './strategies/strategies/strategy-M31';
import {StrategyM30Runner} from './strategies/strategies/strategy-M30';
import {StrategyQ42Runner} from './strategies/strategies/strategy-Q42';
import {StrategyQ43Runner} from './strategies/strategies/strategy-Q43';
import {StrategyM40Runner} from './strategies/strategies/strategy-M40';
import {StrategyM41Runner} from './strategies/strategies/strategy-M41';
import {StrategyM42Runner} from './strategies/strategies/strategy-M42';
import {StrategyM43Runner} from './strategies/strategies/strategy-M43';
import {StrategyA000Runner} from './strategies/strategies/_strategy-A000';
import {StrategyM10Runner} from './strategies/strategies/strategy-M10';
import {StrategyM11Runner} from './strategies/strategies/strategy-M11';
import {StrategyM12Runner} from './strategies/strategies/strategy-M12';
import {StrategyA001Runner} from './strategies/strategies/_strategy-A001';
import {StrategyA002Runner} from './strategies/strategies/_strategy-A002';
import {StrategyA050Runner} from './strategies/strategies/_strategy-A050';
import {StrategyA003Runner} from './strategies/strategies/_strategy-A003';
import {StrategyA004Runner} from './strategies/strategies/_strategy-A004';
import {StrategyA005Runner} from './strategies/strategies/_strategy-A005';
import {StrategyA006Runner} from './strategies/strategies/_strategy-A006';
import {StrategyA007Runner} from './strategies/strategies/_strategy-A007';
import {StrategyA008Runner} from './strategies/strategies/_strategy-A008';
import {StrategyA009Runner} from './strategies/strategies/_strategy-A009';
import {StrategyQ000Runner} from './strategies/strategies/_strategy-Q000';
import {StrategyQ01Runner} from './strategies/strategies/strategy-Q01';
import {StrategyQ001Runner} from './strategies/strategies/_strategy-Q001';
import {StrategyA100Runner} from './strategies/strategies/_strategy-A100';
import {StrategyA101Runner} from './strategies/strategies/_strategy-A101';
import {StrategyA102Runner} from './strategies/strategies/_strategy-A102';
import {StrategyM000Runner} from './strategies/strategies/_strategy-M000';
import {StrategyM002Runner} from './strategies/strategies/_strategy-M002';
import {StrategyM003Runner} from './strategies/strategies/_strategy-M003';
import {StrategyX04Runner} from './strategies/strategies/strategy-X04';
import {StrategyZ00Runner} from './strategies/strategies/strategy-Z00';
import {StrategyZ01Runner} from './strategies/strategies/strategy-Z01';
import {StrategyZ02Runner} from './strategies/strategies/strategy-Z02';
import {StrategyZ03Runner} from './strategies/strategies/strategy-Z03';
import {StrategyZ04Runner} from './strategies/strategies/strategy-Z04';
import {StrategyZ05Runner} from './strategies/strategies/strategy-Z05';
import {StrategyZ06Runner} from './strategies/strategies/strategy-Z06';
import {StrategyZ07Runner} from './strategies/strategies/strategy-Z07';
import {StrategyZ08Runner} from './strategies/strategies/strategy-Z08';
import {StrategyZ40Runner} from './strategies/strategies/strategy-Z40';
import {StrategyZ41Runner} from './strategies/strategies/strategy-Z41';
import {StrategyZ43Runner} from './strategies/strategies/strategy-Z43';
import {StrategyZ46Runner} from './strategies/strategies/strategy-Z46';
import {StrategyZ47Runner} from './strategies/strategies/strategy-Z47';
import {StrategyZ48Runner} from './strategies/strategies/strategy-Z48';
import {StrategyZ49Runner} from './strategies/strategies/strategy-Z49';
import {StrategyZ50Runner} from './strategies/strategies/strategy-Z50';
import {StrategyW04Runner} from './strategies/strategies/strategy-W04';
import {StrategyW05Runner} from './strategies/strategies/strategy-W05';
import {StrategyW06Runner} from './strategies/strategies/strategy-W06';
import {StrategyW07Runner} from './strategies/strategies/strategy-W07';
import {StrategyW08Runner} from './strategies/strategies/strategy-W08';
import {StrategyW13Runner} from './strategies/strategies/strategy-W13';
import {StrategyW16Runner} from './strategies/strategies/strategy-W16';
import {StrategyQ03Runner} from './strategies/strategies/strategy-Q03';
import {StrategyW20Runner} from './strategies/strategies/strategy-W20';
import {StrategyW21Runner} from './strategies/strategies/strategy-W21';
import {StrategyW23Runner} from './strategies/strategies/strategy-W23';
import {StrategyW22Runner} from './strategies/strategies/strategy-W22';
import {StrategyW24Runner} from './strategies/strategies/strategy-W24';
import {StrategyW25Runner} from './strategies/strategies/strategy-W25';
import {StrategyW27Runner} from './strategies/strategies/strategy-W27';
import {StrategyW30Runner} from './strategies/strategies/strategy-W30';
import {StrategyW31Runner} from './strategies/strategies/strategy-W31';
import {StrategyW32Runner} from './strategies/strategies/strategy-W32';
import {StrategyW33Runner} from './strategies/strategies/strategy-W33';
import {StrategyW35Runner} from './strategies/strategies/strategy-W35';
import {StrategyW37Runner} from './strategies/strategies/strategy-W37';
import {StrategyW38Runner} from './strategies/strategies/strategy-W38';
import {StrategyW42Runner} from './strategies/strategies/strategy-W42';
import {StrategyW54Runner} from './strategies/strategies/strategy-W54';
import {StrategyW55Runner} from './strategies/strategies/strategy-W55';
import {StrategyP45Runner} from './strategies/strategies/strategy-P45';
import {StrategyP46Runner} from './strategies/strategies/strategy-P46';
import {StrategyA18Runner} from './strategies/strategies/strategy-A18';
import {StrategyP22Runner} from './strategies/strategies/strategy-P22';
import {StrategyP21Runner} from './strategies/strategies/strategy-P21';
import {StrategyA10Runner} from './strategies/strategies/strategy-A10';
import {StrategyX43Runner} from './strategies/strategies/strategy-X43';
import {StrategyX44Runner} from './strategies/strategies/strategy-X44';
import {StrategyA13Runner} from './strategies/strategies/strategy-A13';
import {StrategyA36Runner} from './strategies/strategies/strategy-A36';
import {StrategyA71Runner} from './strategies/strategies/strategy-A71';
import {StrategyH00Runner} from './strategies/strategies/strategy-H00';
import {StrategyH01Runner} from './strategies/strategies/strategy-H01';
import {StrategyM32Runner} from './strategies/strategies/strategy-M32';
import {StrategyA06Runner} from './strategies/strategies/strategy-A06';
import {StrategyX05Runner} from './strategies/strategies/strategy-X05';
import {StrategyX07Runner} from './strategies/strategies/strategy-X07';
import {StrategyX06Runner} from './strategies/strategies/strategy-X06';
import {StrategyX08Runner} from './strategies/strategies/strategy-X08';
import {StrategyA19Runner} from './strategies/strategies/strategy-A19';
import {StrategyX46Runner} from './strategies/strategies/strategy-X46';
import {StrategyX47Runner} from './strategies/strategies/strategy-X47';
import {StrategyP00Runner} from './strategies/strategies/strategy-P00';
import {StrategyA80Runner} from './strategies/strategies/strategy-A80';
import {StrategyB00Runner} from './strategies/strategies/strategy-B00';
import {StrategyB01Runner} from './strategies/strategies/strategy-B01';
import {StrategyX82Runner} from './strategies/strategies/strategy-X82';
import {StrategyM33Runner} from './strategies/strategies/strategy-M33';
import {StrategyM01Runner} from './strategies/strategies/strategy-M01';
import {StrategyM02Runner} from './strategies/strategies/strategy-M02';
import {StrategyX31Runner} from './strategies/strategies/strategy-X31';
import {StrategyX51Runner} from './strategies/strategies/strategy-X51';
import {StrategyX52Runner} from './strategies/strategies/strategy-X52';
import {StrategyX58Runner} from './strategies/strategies/strategy-X58';
import {StrategyX59Runner} from './strategies/strategies/strategy-X59';
import {StrategyX60Runner} from './strategies/strategies/strategy-X60';
import {StrategyX62Runner} from './strategies/strategies/strategy-X62';
import {StrategyY89Runner} from './strategies/strategies/strategy-Y89';
import {StrategyY90Runner} from './strategies/strategies/strategy-Y90';
import {StrategyY91Runner} from './strategies/strategies/strategy-Y91';
import {StrategyY92Runner} from './strategies/strategies/strategy-Y92';
import {StrategyY93Runner} from './strategies/strategies/strategy-Y93';
import {StrategyY94Runner} from './strategies/strategies/strategy-Y94';
import {StrategyY95Runner} from './strategies/strategies/strategy-Y95';
import {StrategyY46Runner} from './strategies/strategies/strategy-Y46';
import {StrategyY43Runner} from './strategies/strategies/strategy-Y43';
import {StrategyQ13Runner} from './strategies/strategies/strategy-Q13';
import {StrategyQ14Runner} from './strategies/strategies/strategy-Q14';
import {StrategyQ15Runner} from './strategies/strategies/strategy-Q15';
import {StrategyQ16Runner} from './strategies/strategies/strategy-Q16';
import {StrategyP23Runner} from './strategies/strategies/strategy-P23';
import {StrategyP28Runner} from './strategies/strategies/strategy-P28';
import {StrategyA81Runner} from './strategies/strategies/strategy-A81';
import {StrategyA82Runner} from './strategies/strategies/strategy-A82';
import {StrategyA83Runner} from './strategies/strategies/strategy-A83';
import {StrategyA84Runner} from './strategies/strategies/strategy-A84';
import {StrategyA85Runner} from './strategies/strategies/strategy-A85';
import {StrategyA86Runner} from './strategies/strategies/strategy-A86';
import {StrategyA87Runner} from './strategies/strategies/strategy-A87';
import {StrategyA88Runner} from './strategies/strategies/strategy-A88';
import {StrategyY01Runner} from './strategies/strategies/strategy-Y01';
import {StrategyX76Runner} from './strategies/strategies/strategy-X76';
import {StrategyY40Runner} from './strategies/strategies/strategy-Y40';
import {StrategyY41Runner} from './strategies/strategies/strategy-Y41';
import {StrategyY79Runner} from './strategies/strategies/strategy-Y79';
import {StrategyP35Runner} from './strategies/strategies/strategy-P35';
import {StrategyX57Runner} from './strategies/strategies/strategy-X57';
import {StrategyP29Runner} from './strategies/strategies/strategy-P29';
import {StrategyA89Runner} from './strategies/strategies/strategy-A89';
import {StrategyA11Runner} from './strategies/strategies/strategy-A11';
import {StrategyQ04Runner} from './strategies/strategies/strategy-Q04';
import {StrategyQ05Runner} from './strategies/strategies/strategy-Q05';
import {StrategyQ06Runner} from './strategies/strategies/strategy-Q06';
import {StrategyQ07Runner} from './strategies/strategies/strategy-Q07';
import {StrategyQ10Runner} from './strategies/strategies/strategy-Q10';
import {StrategyQ08Runner} from './strategies/strategies/strategy-Q08';
import {StrategyQ09Runner} from './strategies/strategies/strategy-Q09';
import {StrategyQ12Runner} from './strategies/strategies/strategy-Q12';
import {StrategyQ11Runner} from './strategies/strategies/strategy-Q11';

(async function () {
    console.log('[INIT]', new Date().toString());
    LogHandler.init();

    const symbols = [
        "BTCUSDT",
        "SHIBUSDT",
        "MANAUSDT",
        "ETHUSDT",
        ////"BUSDUSDT",
        "DOGEUSDT",
        "STORJUSDT",
        "SANDUSDT",
        "SOLUSDT",
        "HOTUSDT",
        "XRPUSDT",
        "BNBUSDT",
        "ANKRUSDT",
        "CHZUSDT",
        "FILUSDT",
        "DOTUSDT",
        "FTMUSDT",
        "QTUMUSDT",
        "ADAUSDT",
        ////"BTTUSDT",
        "MATICUSDT",
        "COTIUSDT",
        "TRXUSDT",
        "DENTUSDT",
        "LRCUSDT",
        "OMGUSDT",
        "WINUSDT",
        "ZRXUSDT",
        "THETAUSDT",
        "DYDXUSDT",
        "AXSUSDT",
        "GRTUSDT",
        "ENJUSDT",
        "SLPUSDT",
        ////"USDCUSDT",
        "DGBUSDT",
        "LINKUSDT",
        // "KEYUSDT",
        "ONEUSDT",
        "BATUSDT",
        "ETCUSDT",
        ////"LUNAUSDT",
        "RUNEUSDT",
        "WAXPUSDT",
        "ALICEUSDT",
        "SCUSDT",
        "ICPUSDT",
        "TLMUSDT",
        "VETUSDT",
        "AVAXUSDT",
        "LTCUSDT",
        "NEARUSDT",
        ////"CVCUSDT",
        "ATOMUSDT",
        "EOSUSDT",
        "KAVAUSDT",
        "ZENUSDT",
        "CHRUSDT",
        "ZILUSDT",
        "ONTUSDT",
        "DODOUSDT",
        "COMPUSDT",
        "ARUSDT",
        "IOTAUSDT",
        "SXPUSDT",
        "XLMUSDT",
        "ZECUSDT",
        "GALAUSDT",
        "SUSHIUSDT",
        "CRVUSDT",
        "RVNUSDT",
        "ATAUSDT",
        "FETUSDT",
        "ALGOUSDT",
        "OCEANUSDT",
        "NEOUSDT",
        "KNCUSDT",
        "HBARUSDT",
        "CAKEUSDT",
        "1INCHUSDT",
        ////"EURUSDT",
        "REEFUSDT",
        "BCHUSDT",
        // "FTTUSDT",
        "SKLUSDT",
        "MASKUSDT",
        "RSRUSDT",
        "EGLDUSDT",
        "FORTHUSDT",
        "BETAUSDT",
        "CELRUSDT",
        "XTZUSDT",
        "C98USDT",
        "SUPERUSDT",
        "AAVEUSDT",
        ////"SRMUSDT",
        "IOSTUSDT",
        "BLZUSDT",
        "UNIUSDT",
        ////"AUDUSDT",
        "OGNUSDT",
        "FLOWUSDT",
        "ICXUSDT",
        "AUDIOUSDT",
        "STXUSDT",
        "BELUSDT",
        "XMRUSDT",
        "VTHOUSDT",
        "XEMUSDT",
        "CELOUSDT",
        "SNXUSDT",
        "ARPAUSDT",
        "MBOXUSDT",
        "ADXUSDT",
        "AKROUSDT",
        "CTSIUSDT",
        ////"TUSDUSDT",
        "DASHUSDT",
        "LINAUSDT",
        "XECUSDT",
        "MINAUSDT",
        "SFPUSDT",
        "JSTUSDT",
        "IOTXUSDT",
        "KSMUSDT",
        "BAKEUSDT",
        "LAZIOUSDT",
        "HARDUSDT",
        ////"BTCSTUSDT",
        "TWTUSDT",
        "FLMUSDT",
        ////"GTOUSDT",
        "YGGUSDT",
        "STMXUSDT",
        "BANDUSDT",
        "WRXUSDT",
        "SUNUSDT",
        ////"NUUSDT",
        ////"EPSUSDT",
        "NKNUSDT"
    ];
    await ExchangeInfo.getExchangeInfo();
    await SymbolsLastPrice.updateAll(symbols);

    await timeout();
    new Jobs();

    for (let symbol of symbols) {
        await init(symbol);
    }
})();

async function init(symbol: string) {
    const ohlcData = new OhlcData(symbol);

    const strategies: StrategyRunner[] = [
        /*-------< ATR >-------*/
        new StrategyA001Runner(),
        new StrategyA002Runner(),
        new StrategyA003Runner(),
        new StrategyA005Runner(),
        new StrategyA006Runner(),
        new StrategyA007Runner(),
        new StrategyA008Runner(),
        new StrategyA009Runner(),
        new StrategyA050Runner(),
        new StrategyA100Runner(),
        new StrategyM000Runner(),
        new StrategyM002Runner(),
        new StrategyQ001Runner(),
        new StrategyP00Runner(),
        new StrategyP34Runner(),
        new StrategyX76Runner(),
        new StrategyX78Runner(),
        new StrategyY79Runner(),
        new StrategyY82Runner(),

        /*------< ATR/2 >------*/
        new StrategyA000Runner(),
        new StrategyA102Runner(),
        new StrategyA004Runner(),
        new StrategyA101Runner(),
        new StrategyQ000Runner(),
        new StrategyP35Runner(),
        new StrategyY40Runner(),
        new StrategyY41Runner(),
        new StrategyY42Runner(),

        /*-------< 5.5 >-------*/
        new StrategyM10Runner(),
        new StrategyM12Runner(),
        new StrategyY10Runner(),
        new StrategyY80Runner(),

        /*-------< 5.2 >-------*/
        new StrategyA06Runner(),

        /*-------< 4.5 >-------*/
        new StrategyB00Runner(),
        new StrategyM40Runner(),
        new StrategyY43Runner(),

        /*-------< 4.0 >-------*/
        new StrategyY81Runner(),

        /*-------< 3.5 >-------*/
        new StrategyA13Runner(),
        new StrategyA15Runner(),
        new StrategyA18Runner(),
        new StrategyA19Runner(),
        new StrategyA24Runner(),
        new StrategyA36Runner(),
        new StrategyA61Runner(),
        new StrategyA70Runner(),
        new StrategyA71Runner(),
        new StrategyA74Runner(),
        new StrategyA80Runner(),
        new StrategyA81Runner(),
        new StrategyA85Runner(),
        new StrategyA86Runner(),
        new StrategyA87Runner(),
        new StrategyA88Runner(),
        new StrategyB01Runner(),
        new StrategyG00Runner(),
        new StrategyG01Runner(),
        new StrategyH00Runner(),
        new StrategyH01Runner(),
        new StrategyM01Runner(),
        new StrategyM02Runner(),
        new StrategyM11Runner(),
        new StrategyM22Runner(),
        new StrategyM32Runner(),
        new StrategyM33Runner(),
        new StrategyP20Runner(),
        new StrategyP21Runner(),
        new StrategyP22Runner(),
        new StrategyP23Runner(),
        new StrategyP28Runner(),
        new StrategyP40Runner(),
        new StrategyP41Runner(),
        new StrategyP42Runner(),
        new StrategyP43Runner(),
        new StrategyP44Runner(),
        new StrategyP46Runner(),
        new StrategyQ13Runner(),
        new StrategyQ14Runner(),
        new StrategyW01Runner(),
        new StrategyW02Runner(),
        new StrategyW03Runner(),
        new StrategyW04Runner(),
        new StrategyW05Runner(),
        new StrategyW06Runner(),
        new StrategyW07Runner(),
        new StrategyW08Runner(),
        new StrategyW13Runner(),
        new StrategyW16Runner(),
        new StrategyW20Runner(),
        new StrategyW21Runner(),
        new StrategyW22Runner(),
        new StrategyW23Runner(),
        new StrategyW24Runner(),
        new StrategyW25Runner(),
        new StrategyW30Runner(),
        new StrategyW31Runner(),
        new StrategyW32Runner(),
        new StrategyW33Runner(),
        new StrategyW35Runner(),
        new StrategyW42Runner(),
        new StrategyW54Runner(),
        new StrategyW55Runner(),
        new StrategyX01Runner(),
        new StrategyX04Runner(),
        new StrategyX05Runner(),
        new StrategyX06Runner(),
        new StrategyX07Runner(),
        new StrategyX08Runner(),
        new StrategyX20Runner(),
        new StrategyX31Runner(),
        new StrategyX43Runner(),
        new StrategyX44Runner(),
        new StrategyX46Runner(),
        new StrategyX47Runner(),
        new StrategyX48Runner(),
        new StrategyX49Runner(),
        new StrategyX50Runner(),
        new StrategyX51Runner(),
        new StrategyX52Runner(),
        new StrategyX53Runner(),
        new StrategyX56Runner(),
        new StrategyX57Runner(),
        new StrategyX58Runner(),
        new StrategyX59Runner(),
        new StrategyX60Runner(),
        new StrategyX61Runner(),
        new StrategyX62Runner(),
        new StrategyX82Runner(),
        new StrategyA61Runner(),
        new StrategyY46Runner(),
        new StrategyY86Runner(),
        new StrategyY88Runner(),
        new StrategyY90Runner(),
        new StrategyY91Runner(),
        new StrategyZ01Runner(),
        new StrategyZ06Runner(),
        new StrategyZ43Runner(),

        /*-------< 3.0 >-------*/
        new StrategyA16Runner(),
        new StrategyA51Runner(),
        new StrategyA72Runner(),
        new StrategyA73Runner(),
        new StrategyA89Runner(),
        new StrategyP45Runner(),
        new StrategyQ05Runner(),
        new StrategyQ04Runner(),
        new StrategyQ08Runner(),
        new StrategyQ09Runner(),
        new StrategyQ16Runner(),
        new StrategyY01Runner(),

        /*-------< 2.5 >-------*/
        new StrategyA50Runner(),
        new StrategyQ03Runner(),
        new StrategyQ10Runner(),
        new StrategyQ11Runner(),
        new StrategyQ12Runner(),
        new StrategyY83Runner(),
        new StrategyZ00Runner(),
        new StrategyZ02Runner(),
        new StrategyZ03Runner(),
        new StrategyZ04Runner(),
        new StrategyZ05Runner(),
        new StrategyZ07Runner(),
        new StrategyZ08Runner(),
        new StrategyZ40Runner(),
        new StrategyZ41Runner(),

        /*-------< 2.2 >-------*/
        new StrategyM003Runner(),
        new StrategyA10Runner(),
        new StrategyA11Runner(),
        new StrategyA12Runner(),
        new StrategyA14Runner(),
        new StrategyA52Runner(),
        new StrategyA54Runner(),
        new StrategyA56Runner(),
        new StrategyA57Runner(),
        new StrategyA83Runner(),
        new StrategyA84Runner(),
        new StrategyM20Runner(),
        new StrategyM21Runner(),
        new StrategyM31Runner(),
        new StrategyM42Runner(),
        new StrategyP24Runner(),
        new StrategyP25Runner(),
        new StrategyP30Runner(),
        new StrategyQ01Runner(),
        new StrategyQ40Runner(),
        new StrategyX65Runner(),
        new StrategyX85Runner(),
        new StrategyY00Runner(),
        new StrategyY95Runner(),
        new StrategyZ47Runner(),
        new StrategyZ48Runner(),
        new StrategyZ49Runner(),

        /*-------< 2.0 >-------*/
        new StrategyA08Runner(),
        new StrategyA20Runner(),
        new StrategyA21Runner(),
        new StrategyA22Runner(),
        new StrategyA23Runner(),
        new StrategyA25Runner(),
        new StrategyA33Runner(),
        new StrategyA43Runner(),
        new StrategyP26Runner(),
        new StrategyQ06Runner(),
        new StrategyQ07Runner(),
        new StrategyY84Runner(),
        new StrategyY85Runner(),

        /*-------< 1.5 >-------*/
        new StrategyA00Runner(),
        new StrategyA03Runner(),
        new StrategyA03Runner(),
        new StrategyA04Runner(),
        new StrategyA07Runner(),
        new StrategyA17Runner(),
        new StrategyA30Runner(),
        new StrategyA31Runner(),
        new StrategyA32Runner(),
        new StrategyA34Runner(),
        new StrategyA35Runner(),
        new StrategyA40Runner(),
        new StrategyA41Runner(),
        new StrategyA42Runner(),
        new StrategyA44Runner(),
        new StrategyA45Runner(),
        new StrategyA53Runner(),
        new StrategyA58Runner(),
        new StrategyA59Runner(),
        new StrategyA60Runner(),
        new StrategyM30Runner(),
        new StrategyM41Runner(),
        new StrategyQ41Runner(),
        new StrategyQ42Runner(),
        new StrategyQ43Runner(),
        new StrategyW37Runner(),
        new StrategyW38Runner(),
        new StrategyX02Runner(),
        new StrategyX03Runner(),
        new StrategyX10Runner(),
        new StrategyX11Runner(),
        new StrategyX21Runner(),
        new StrategyX30Runner(),
        new StrategyX40Runner(),
        new StrategyX41Runner(),
        new StrategyX42Runner(),
        new StrategyX71Runner(),
        new StrategyX87Runner(),
        new StrategyX88Runner(),
        new StrategyY45Runner(),
        new StrategyZ46Runner(),
        new StrategyZ50Runner(),

        /*-------< 1.2 >-------*/
        new StrategyA01Runner(),
        new StrategyA02Runner(),
        new StrategyA05Runner(),
        new StrategyA55Runner(),
        new StrategyA82Runner(),
        new StrategyM43Runner(),
        new StrategyP27Runner(),
        new StrategyP29Runner(),
        new StrategyP31Runner(),
        new StrategyP32Runner(),
        new StrategyP33Runner(),
        new StrategyQ00Runner(),
        new StrategyQ15Runner(),
        new StrategyW27Runner(),
        new StrategyX00Runner(),
        new StrategyX66Runner(),
        new StrategyX70Runner(),
        new StrategyX81Runner(),
        new StrategyX86Runner(),
        new StrategyY44Runner(),
        new StrategyY47Runner(),
        new StrategyY87Runner(),
        new StrategyY89Runner(),
        new StrategyY92Runner(),
        new StrategyY93Runner(),
        new StrategyY94Runner()
];

    await ohlcData.subscribeOnTrades((data: Data, indicators: IndicatorsData) => {
        const n = AVAILABLE_INTERVALS.length;
        for (let i = 0; i < n; i++) {
            const interval = AVAILABLE_INTERVALS[i];
            strategies.forEach(strategy => strategy.init(data[interval], indicators, interval));
        }
    });
}


async function timeout() {
    new Promise((resolve) => {
        setTimeout(() => resolve(null), 5000)
    })
}
import {TR} from "./tr";
import {WilderSmoothing} from "./wilder-smoothing";

export function ATR(high: number[], low: number[], close: number[], n: number): number[] {
    const tr = TR(high, low, close);
    return WilderSmoothing(tr, n);
}
import {SMA} from "./sma";

export function CCI(high: number[], low: number[], close: number[], period: number): number[] {
    const typicalPrice = [];
    for (let i = 0; i < close.length; i++) {
        typicalPrice.push((high[i] + low[i] + close[i]) / 3);
    }

    const meanDeviation = [];
    const sma = SMA(typicalPrice, period);
    for (let i = 0; i < close.length; i++) {
        if (!sma[i]) {
            meanDeviation.push(0);
        } else {
            let sum = 0;
            for (let j = 0; j < period; j++) {
                sum += Math.abs(sma[i] - typicalPrice[i-j]);
            }
            meanDeviation.push(sum/period);
        }
    }

    const cci = new Array(period - 1);
    for (let i = period - 1; i < close.length; i++) {
        cci.push((typicalPrice[i] - sma[i]) / (0.015 * meanDeviation[i]));
    }

    return cci;
}
import {Dmi} from "../models/dmi";
import {WilderSmoothing} from "./wilder-smoothing";


export function DMI(high: number[], low: number[], atr: number[], n: number): Dmi {
    const PDX = [0];
    const MDX = [0];
    for (let i = 1; i < high.length; i++) {
        if (high[i] - high[i-1] > low[i-1] - low[i]) {
            PDX.push(Math.max(high[i] - high[i-1], 0));
            MDX.push(0);
        } else {
            PDX.push(0);
            MDX.push(Math.max(low[i-1] - low[i], 0));
        }
    }

    const smoothPDX = WilderSmoothing(PDX, n);
    const smoothMDX = WilderSmoothing(MDX, n);

    const PDI = new Array(n);
    const MDI = new Array(n);
    const DX = new Array(n);
    for (let i = n; i < high.length; i++) {
        PDI.push(smoothPDX[i]/atr[i] * 100);
        MDI.push(smoothMDX[i]/atr[i] * 100);

        const diffDI = Math.abs(PDI[i] - MDI[i]);
        const sumDI = PDI[i] + MDI[i];
        DX.push(100 * (diffDI/sumDI));
    }

    const ADX = WilderSmoothing(DX, n);

    return {
        PDI,
        MDI,
        ADX
    };
}
export function EMA(close: number[], length: number) {
    return dma(close, 2.0 / (length + 1.0), 0);
}

export function dma(d, a, start) {
    const output = [];
    let num = 0;
    for (let index = 0; index < start && index < d.length; ++index) {
        num += d[index];
        output[index] = NaN;
    }
    if (start > 0 && start <= d.length) {
        output[start - 1] = num / start;
    }
    for (let index = start; index < d.length; ++index) {
        output[index] = index <= 0 ? d[index] : (isNaN(d[index]) || (d[index] == Infinity) ? NaN : (isNaN(output[index - 1])
        || (output[index - 1] == Infinity) ? d[index] : d[index] * a + output[index - 1] * (1.0 - a)));
    }
    return output;
}import {map} from "./map";
import {ref} from "./ref";
import {IIchimoku} from "../models/iichimoku";

export function Ichimoku(d, tenkan_Sen, kijun_Sen, senkou_Span_B, plotDays): IIchimoku {
    const High = d.map(item => item.high);
    const Low = d.map(item => item.low);
    const Close = d.map(item => item.close);

    const Tenkan_Sen = map(hhv(High, tenkan_Sen), llv(Low, tenkan_Sen), (a, b) => (a + b) / 2),
        Kijun_Sen = map(hhv(High, kijun_Sen), llv(Low, kijun_Sen), (a, b) => (a + b) / 2),
        Senkou_span_A = ref1(map(Tenkan_Sen, Kijun_Sen, (a, b) => (a + b) / 2), plotDays, true),
        Senkou_span_B = ref1(map(hhv(High, senkou_Span_B), llv(Low, senkou_Span_B), (a, b) => (a + b) / 2), plotDays, true),
        Chikou_Span = ref(Close, -plotDays);

    Senkou_span_A.shift();
    Senkou_span_B.shift();

    return {
        tenkanSen: Tenkan_Sen,
        kijunSen: Kijun_Sen,
        senkouSpanA: Senkou_span_A,
        senkouSpanB: Senkou_span_B,
        chikouSpan: Chikou_Span
    };
}


export function hhv(d, n) {
    const output = [];
    for (let index = 0; index < Math.min(n - 1, d.length); ++index) {
        output[index] = NaN;
    }
    let val1 = -200000000000;
    for (let index1 = Math.max(n - 1, 0); index1 < d.length; ++index1) {
        if (isNaN(d[index1])) {
            output[index1] = NaN;
        }
        else {
            if (n == 0) {
                val1 = Math.max(val1, d[index1]);
            }
            else {
                val1 = -200000000000;
                for (let index2 = Math.max(0, index1 - n + 1); index2 <= index1; ++index2) {
                    val1 = Math.max(val1, d[index2]);
                }
            }
            output[index1] = val1;
        }
    }
    return output;
}
export function llv(d, n) {
    const output = [];
    for (let index = 0; index < Math.min(n - 1, d.length); ++index) {
        output[index] = NaN;
    }
    let val1 = 200000000000;
    for (let index1 = Math.max(n - 1, 0); index1 < d.length; ++index1) {
        if (isNaN(d[index1])) {
            output[index1] = NaN;
        }
        else {
            if (n == 0) {
                val1 = Math.min(val1, d[index1]);
            }
            else {
                val1 = 200000000000;
                for (let index2 = Math.max(0, index1 - n + 1); index2 <= index1; ++index2) {
                    val1 = Math.min(val1, d[index2]);
                }
            }
            output[index1] = val1;
        }
    }
    return output;
}
export function ref1(d, n, addToEnd) {
    if (!addToEnd) {
        return ref(d, n);
    }
    let num = n;
    if (Math.abs(num) >= d.length) {
        const output = [];
        for (let i in d) {
            output[i] = 0;
        }
    }
    const output = [Math.max(d.length + num, d.length)];
    for (let index = d.length + (num - 1); index >= Math.max(0, num); --index) {
        output[index] = d[index - num];
    }
    if (num < 0) {
        for (let index = output.length - 1; index >= output.length + num; --index) {
            output[index] = NaN;
        }
    }
    else if (num <= output.length) {
        for (let index = num - 1; index >= 0; --index) {
            output[index] = NaN;
        }
    }
    return output;
}
import {KeltnerChannel} from "../models/keltner-channel";

export function KC(ema: number[], atr: number[], multiplier: number): KeltnerChannel {
    const upper = [];
    const lower = [];
    ema.forEach((item, i) => {
        upper.push(item+(atr[i] * multiplier));
        lower.push(item-(atr[i] * multiplier));
    })

    return {
        mid: ema,
        upper,
        lower
    }
}
import {EMA} from "./ema";
import {map} from "./map";

export function MACD(Close, long: number, short: number, m: number) {
    const DIFF = map(EMA(Close, short), EMA(Close, long), (a, b) => a - b),
        DEA = EMA(DIFF, m),
        MACD = map(DIFF, DEA, (a, b) => (a - b));

    return {
        DIFF,
        DEA,
        MACD
    }
}
export function PPO(Close, long: number, short: number, m: number) {
    const shortEMA = EMA(Close, short);
    const longEMA =  EMA(Close, long);
    const DIFF = map(shortEMA, longEMA, (a, b) => a - b),
        DEA = EMA(DIFF, m),
        MACD = map(DIFF, DEA, (a, b) => a - b),
        PDIFF = map(DIFF, longEMA, (a, b) => a/b*100),
        PDEA = map(DEA, shortEMA, (a, b) => a/b*100),
        PMACD = map(PDIFF, PDEA, (a, b) => a - b);

    return {
        DIFF,
        DEA,
        MACD,
        PDIFF,
        PDEA,
        PMACD
    }
}
export function map(d1, d2, fn) {
    if (typeof d1 == 'number') {
        const n = d1;
        d1 = [];
        for (let i in d2) {
            d1.push(n);
        }
    }
    if (typeof d2 == 'number') {
        const n = d2;
        d2 = [];
        for (let i in d1) {
            d2.push(n);
        }
    }
    const output = [];
    for (let i in d1) {
        output[i] = fn(d1[i], d2[i]);
    }

    return output;
}export function ref(d, n) {
    //define output array and intialize with zero value;
    const output = [],
        length = d.length;

    for (let i in d) {
        output[i] = 0;
    }

    if (Math.abs(n) >= length) {
        return output;
    }

    for (let i = length + Math.min(n - 1, -1); i >= Math.max(0, n); --i) {
        output[i] = d[i - n];
    }

    if (n < 0) {
        for (let i = length - 1; i >= length + n; --i)
            output[i] = NaN;
    } else if (n <= length) {
        for (let i = n - 1; i >= 0; --i) {
            output[i] = NaN;
        }
    }
    return output;
}export function RSI(d, n) {
    const output = [];
    if (d.length < n) {
        return output;
    }
    let num1 = 0;
    let num2 = 0;
    for (let index = n - 1; index > 0; --index) {
        let num3 = d[index] - d[index - 1];
        if (num3 > 0) {
            num1 += num3;
        }
        else if (num3 < 0) {
            num2 += num3;
        }
    }
    let num4 = num1 / (n - 1);
    let num5 = num2 / (n - 1);
    for (let index = n; index < d.length; ++index) {
        let num3 = 0;
        let num6 = 0;
        let num7 = d[index] - d[index - 1];
        if (num7 > 0) {
            num3 = num7;
        }
        else {
            num6 = num7;
        }
        num4 = (num4 * (n - 1) + num3) / n;
        num5 = (num5 * (n - 1) + num6) / n;
        let num8 = Math.abs(num4 / num5);
        output[index] = 100 - 100 / (1 + num8);
    }
    return output;
}export function SMA(src, len) {
    let sma = [];
    for (let i = 0; i <= src.length; i++) {
        if (i < len) {
            sma[i] = null;
            continue;
        }
        sma[i - 1] = 0;
        for (let j = i - len; j < i; j++) {
            sma[i - 1] += src[j];
        }

        sma[i - 1] /= len;
    }

    return sma;
}export function Stochastic(high: number[], low: number[], close: number[], k: number, d: number, s: number) {
    const KK = map(sub(close, llv(low, k)), sub(hhv(high, k), llv(low, k)), (a, b) => a / b * 100),
        SK = ma(KK, d),
        SD = ma(SK, s);

    return {
        KK,
        SK,
        SD
    }
}


function hhv(d, n) {
    const output = [];
    for (let index = 0; index < Math.min(n - 1, d.length); ++index) {
        output[index] = NaN;
    }
    let val1 = -200000000000;
    for (let index1 = Math.max(n - 1, 0); index1 < d.length; ++index1) {
        if (isNaN(d[index1])) {
            output[index1] = NaN;
        }
        else {
            if (n == 0) {
                val1 = Math.max(val1, d[index1]);
            }
            else {
                val1 = -200000000000;
                for (let index2 = Math.max(0, index1 - n + 1); index2 <= index1; ++index2) {
                    val1 = Math.max(val1, d[index2]);
                }
            }
            output[index1] = val1;
        }
    }
    return output;
}
function llv(d, n) {
    const output = [];
    for (let index = 0; index < Math.min(n - 1, d.length); ++index) {
        output[index] = NaN;
    }
    let val1 = 200000000000;
    for (let index1 = Math.max(n - 1, 0); index1 < d.length; ++index1) {
        if (isNaN(d[index1])) {
            output[index1] = NaN;
        }
        else {
            if (n == 0) {
                val1 = Math.min(val1, d[index1]);
            }
            else {
                val1 = 200000000000;
                for (let index2 = Math.max(0, index1 - n + 1); index2 <= index1; ++index2) {
                    val1 = Math.min(val1, d[index2]);
                }
            }
            output[index1] = val1;
        }
    }
    return output;
}
function ma(d, n) {
    const output = [];
    let num = 0;
    for (let index = 0; index < d.length; ++index) {
        if (!isNaN(d[index])) {
            num += d[index];
        } else {
            output[index] = NaN;
        }

        if (n != 0 && index >= n - 1) {
            if (!isNaN(d[index - n + 1])) {
                output[index] = !isNaN(d[index]) ? num / n : NaN;
                num -= d[index - n + 1];
            } else {
                output[index] = NaN;
            }
        } else {
            output[index] = n != 0 ? NaN : num / (index + 1);
        }
    }
    return output;
}
function makeSameLength(d1, d2, fn) {
    if (typeof d2 == "number") {
        const n = d2;
        d2 = [];
        for (let i in d1) {
            d2.push(n);
        }
        fn(d1, d2);

        return;
    }

    const
        l1 = d1.length,
        l2 = d2.length,
        delta = l1 - l2;

    if (delta === 0) return;

    if (delta < 0) {
        push(d1, delta);
    } else {
        push(d2, delta);
    }
    fn(d1, d2);

    function push(d, delta) {
        for (let i = 0; i < Math.abs(delta); i++) {
            d.push(NaN);
        }
    }
}
function map(d1, d2, fn) {
    if (typeof d1 == 'number') {
        const n = d1;
        d1 = [];
        for (let i in d2) {
            d1.push(n);
        }
    }
    if (typeof d2 == 'number') {
        const n = d2;
        d2 = [];
        for (let i in d1) {
            d2.push(n);
        }
    }
    const output = [];
    for (let i in d1) {
        output[i] = fn(d1[i], d2[i]);
    }

    return output;
}
function sub(d1, d2) {
    makeSameLength(d1, d2, (a, b) => { d1 = a, d2 = b });

    const output = [];
    for (let i in d1) {
        output[i] = d1[i] - d2[i];
    }
    return output;
}
export function TR(highs: number[], lows: number[], closes: number[]): number[] {
    const trueRange = [0];

    for (let i = 1; i < closes.length; i++) {
        const tr1 = highs[i]-lows[i];
        const tr2 = Math.abs(highs[i]-closes[i-1]);
        const tr3 = Math.abs(lows[i]-closes[i-1]);
        trueRange.push(Math.max(tr1, tr2, tr3));
    }

    return trueRange;
}
export function WilderSmoothing(data: number[], n: number): number[] {
    const result = new Array(n);
    let i = 0;

    while (!data[i]) {
        i++;
    }

    let sum = 0;
    for (i; i <= n; i++) {
        sum += data[i];
    }
    result.push(sum/n);

    for (i; i < data.length; i++) {
        result.push(((result[i-1] * (n-1)) + data[i])/n);
    }

    return result;
}
import {readFile} from 'fs';
import {User} from './users/user';
import {callAtBeginningOfDay, jobInterval} from './utils/utils';
import {UsersConfig} from './users/users-config';
import {CONFIG, STRATEGY_INVEST_FACTOR} from './config';
import {ajax} from 'rxjs/ajax';
import {pluck} from 'rxjs/operators';
import {LogHandler} from './logger/log-handler';
import {XMLHttpRequest} from 'xmlhttprequest';

export class Jobs {
    static version = 'V028';
    static shutdown: boolean;
    static Users: { [userName: string]: User } = {};

    private readonly jobsInterval = 30_000;

    constructor() {
        this.readUsers();
        this.readConfig();

        this._getFearAndGreedIndex();
        callAtBeginningOfDay(this._getFearAndGreedIndex);
        callAtBeginningOfDay(this._getFearAndGreedIndex, 5 * 1000);
    }

    readUsers(): void {
        jobInterval(() => {
            readFile('./users1.json', 'ascii', (err, data: any) => {
                if (err) {
                    console.error(err)
                    return
                }

                const config: UsersConfig = JSON.parse(data);
                this._updateStrategyInvestFactorConfig(config.strategyInvestFactor);

                const users = Jobs.Users;
                config.users.forEach(user => {
                    if (users[user.username]) {
                        users[user.username].update(user);
                    } else if (!user.isShutdown) {
                        users[user.username] = new User(user);
                        users[user.username].onDestroy = () => {
                            delete users[user.username];
                        }
                    }
                });
            });
        }, this.jobsInterval);
    }

    readConfig(): void {
        jobInterval(() => {
            readFile('./app.config', 'ascii', (err, data: any) => {
                if (err) {
                    console.error(err)
                    return
                }

                Jobs.shutdown = data.includes(`${Jobs.version}: shutdown`);
            });
        }, this.jobsInterval);
    }

    private _getFearAndGreedIndex(): void {
        const options: any = {
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            createXHR: () => new XMLHttpRequest(),
            url: `https://api.alternative.me/fng/`,
            method: 'GET'
        }

        ajax(options)
            .pipe(pluck<any, any>('response'))
            .subscribe(resp => {
                CONFIG.FEAR_AND_GREED_INDEX = +resp.data[0].value;
                LogHandler.info('Fear & Greed Index: ' + CONFIG.FEAR_AND_GREED_INDEX);
            });
    }

    private _updateStrategyInvestFactorConfig(strategyInvestFactor: { [strategyName: string]: number }): void {
        for (let strategyName in strategyInvestFactor) {
            STRATEGY_INVEST_FACTOR[strategyName] = strategyInvestFactor[strategyName];
        }
    }
}
import * as binance from "binance-api-node";
import {QueryOrderResult} from "binance-api-node";
import {jobInterval} from "./utils/utils";

const blessed = require('blessed');
const colors = require('colors/safe');
const contrib = require('blessed-contrib');

const client = binance.default({
    apiKey: 'R9OE6awx0terT4RkTE2NulNihIKbx5h8Jpcdv6ocOsPeEItHp52eyQGAi6g1Tke6',
    apiSecret: 'L2ZZe8eL7HsoT7sLKxzetS5S2XEKhJxCBjP1Exds5w1OdKWNuDLB09TjPwzPUpDl'
});


// require('draftlog').into(console);
const screen = blessed.screen();
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

const table = contrib.table({
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Open Orders',
    width: '100%',
    height: '100%',
    border: {type: "line", fg: "cyan"},
    columnSpacing: 6,
    columnWidth: [10, 15, 20],
});
table.focus()
screen.append(table);
screen.render();

interface OpenOrder extends QueryOrderResult {
    changes: number;
    lastPrice: number;
}

class Logger {
    private readonly intervalTime = 60 * 5 * 1000;
    private openOrders: OpenOrder[] = [];
    private freeUSDT: number;
    private finalAccount: number;

    constructor() {
        jobInterval(async () => {
            this.openOrders = (await client.openOrders({})) as any;
            const accountInfo = await client.accountInfo();
            this.freeUSDT = +accountInfo.balances.find(item => item.asset === 'USDT').free;
            this.finalAccount = this.openOrders.reduce((a, b) => a + (+b.price * +b.origQty), this.freeUSDT);
            this.subscribeWS();
        }, this.intervalTime);

        setInterval(() => {
            const totalAccount = this.openOrders.reduce((a, b) => a + ((b.lastPrice || 0) * +b.origQty), this.freeUSDT);

            table.setData({
                headers: ['Symbol', 'price', 'Changes'],
                data: [
                    ['TOTAL', colors.yellow(this.finalAccount.toFixed(8)), colors.yellow(totalAccount.toFixed(8))],
                    ...this.openOrders
                        .sort((a, b) => (b.changes || -Infinity) - (a.changes || -Infinity))
                        .map(openOrders => [
                            openOrders.symbol,
                            colors.yellow(openOrders.price),
                            (openOrders.changes || 0) > -5
                                ? colors.green(openOrders.changes || 0)
                                : colors.red(openOrders.changes)
                        ])
                ]
            });
            screen.render();
        }, 1000);
    }

    private subscribeWS(): void {
        const symbols = this.openOrders.map(item => item.symbol);
        binance.default({}).ws.trades(symbols, trade => {
            const symbol = trade.symbol;
            const lastPrice = +trade.price;

            this.openOrders
                .filter(item => item.symbol === symbol)
                .forEach(item => {
                    const price = +item.price;
                    item.lastPrice = lastPrice;
                    item.changes = (lastPrice * 100) / price - 100;
                });
        });
    }
}

new Logger();
export enum ConsoleColor {
    RESET = '\x1b[0m',
    BRIGHT = '\x1b[1m',
    DIM = '\x1b[2m',

    RED = '\x1b[31m',
    GREEN = '\x1b[32m',
    YELLOW = '\x1b[33m',
    BLUE = '\x1b[34m',
    MAGENTA = '\x1b[35m',
    CYAN = '\x1b[36m',
    WHITE = '\x1b[37m',

    BG_RED = '\x1b[41m',
    BG_BLUE = '\x1b[44m'
}
import {ConsoleColor} from "./console-color";

export function FreeBalanceLog(amount: number) {
    return 'Free Balance   ' + ConsoleColor.YELLOW + amount.toFixed(4) + ConsoleColor.RESET;
}
import {ConsoleColor} from "./console-color";
import {PadEnd} from "./pad-end";

export function InsufficientBalanceLog(symbol: string): string {
    return `${ConsoleColor.BG_BLUE}BUY ${ConsoleColor.RESET} ${PadEnd.symbol(symbol)} Account has an insufficient balance`;
}
import {LogHandler} from "../logger/log-handler";
import {EventHandler} from "../event-handler/event-handler";

describe('LogHandler', () => {

    it('#init should subscribe on EventHandler buySignal and sellSignal', () => {
        LogHandler.init();

        expect(EventHandler.buySignal.observers.length).toBe(1);
        expect(EventHandler.sellSignal.observers.length).toBe(1);
    });
})
import {appendFile} from 'fs';
import {ConsoleColor} from './console-color';
import {CONFIG} from '../config';
import {PadEnd} from './pad-end';
import {EventHandler} from '../event-handler/event-handler';
import {BuySignalLogger} from './logs/buy-signal-logger';
import {SellSignalLogger} from './logs/sell-signal-logger';
import {BuyOrderLogger} from './logs/buy-order-logger';
import {BuyOrderLogStore} from './log-store/buy-order-log-store';
import {SellOrderLogger} from './logs/sell-order-logger';
import {SellOrderLogStore} from './log-store/sell-order-log-store';
import ErrnoException = NodeJS.ErrnoException;

export class LogHandler {
    static init(): void {
        EventHandler.buySignal
            .subscribe(signal => new BuySignalLogger(signal));

        EventHandler.sellSignal
            .subscribe(signal => new SellSignalLogger(signal));

        EventHandler.buyOrderEvent
            .subscribe(order => {
                new BuyOrderLogger(order);
                new BuyOrderLogStore(order);
            });

        EventHandler.sellOrderEvent
            .subscribe(order => {
                new SellOrderLogger(order);
                new SellOrderLogStore(order);
            });
    }


    static error(message: ErrnoException | string, username?: string): void {
        if (typeof message !== 'string') {
            this._logException(message, username);
        }

        console.log(
            LogHandler._logInfo(ConsoleColor.RED + PadEnd.loggerType('ERROR'), username) +
            message
        );
    }

    static info(message: string, username?: string): void {
        console.log(
            LogHandler._logInfo(ConsoleColor.CYAN + PadEnd.loggerType('INFO'), username) +
            message
        );
    }

    static warn(message: string, username?: string): void {
        console.log(
            LogHandler._logInfo(ConsoleColor.YELLOW + PadEnd.loggerType('WARN'), username) +
            message
        );
    }

    static store(filePath: string, data: string): void {
        appendFile(filePath, data, err => {
            if (err) LogHandler.error(err);
        });
    }

    private static _logInfo(type: string, username = 'System') {
        return CONFIG.IS_FOR_TEST
            ? ''
            : (`${LogHandler._toDateAndTime(new Date())} ${ConsoleColor.BRIGHT + PadEnd.loggerType(type) + ConsoleColor.RESET} ${PadEnd.username(username)} `);
    }

    private static _toDateAndTime(date: Date): string {
        return ConsoleColor.MAGENTA +
            date.toISOString()
                .substring(0, 19)
                .replace('T', ' ') +
            ConsoleColor.RESET;
    }

    private static _logException(error: ErrnoException, username = 'System'): void {
        const date = new Date().toISOString()
            .substring(0, 19)
            .replace('T', ' ');

        const errorMessage = `${date} ${PadEnd.username(username)}\n` +
            error.stack + '\n' +
            JSON.stringify(error) + '\n' +
            '--------------------------------------------------\n';


        appendFile('./logs/exception.log', errorMessage, err => {
            if (err) LogHandler.error(err);
        });
    }
}
import {LogStore} from "./log-store";
import {BuyOrderEvent} from "../../event-handler/events/buy-order-event";
import {PadEnd} from "../pad-end";

export class BuyOrderLogStore extends LogStore {
    constructor({username, symbol, timeInterval, strategyName, price, quantity}: BuyOrderEvent) {
        const orderLogsFileAddress = `./logs/${username.replace(' ', '')}.log`;
        super(orderLogsFileAddress);

        const orderLog = `BUY  ${PadEnd.symbol(symbol)} ${PadEnd.interval(timeInterval)} ${PadEnd.strategyName(strategyName)} ${new Date().toString()} ${(+price).toFixed(6)} ${quantity}\n`;
        this._store(orderLog);
    }
}
import {appendFile} from "fs";
import {LogHandler} from "../log-handler";

export abstract class LogStore {
    private readonly _filePath: string;

    protected constructor(filePath: string) {
        this._filePath = filePath;
    }

    protected _store(data: string): void {
        appendFile(this._filePath, data, err => {
            if (err) LogHandler.error(err);
        });
    }
}
import {LogStore} from "./log-store";
import {BuyOrderEvent} from "../../event-handler/events/buy-order-event";
import {PadEnd} from "../pad-end";

export class SellOrderLogStore extends LogStore {
    constructor({username, symbol, timeInterval, strategyName, price, quantity}: BuyOrderEvent) {
        const orderLogsFileAddress = `./logs/${username.replace(' ', '')}.log`;
        super(orderLogsFileAddress);

        const orderLog = `SELL ${PadEnd.symbol(symbol)} ${PadEnd.interval(timeInterval)} ${PadEnd.strategyName(strategyName)} ${new Date().toString()} ${(+price).toFixed(6)} ${quantity}\n`;
        this._store(orderLog);
    }
}
export enum LogType {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    ORDER = 'ORDER',
    SIGNAL = 'SIGNAL'
}

import {PadEnd} from "../pad-end";
import {ConsoleColor} from "../console-color";
import {OrderLogger} from "./order-logger";
import {BuyOrderEvent} from "../../event-handler/events/buy-order-event";

export class BuyOrderLogger extends OrderLogger {
    constructor(order: BuyOrderEvent) {
        super(order.username);

        console.log(
            this._prefix +
            ConsoleColor.BG_BLUE + 'BUY ' + ConsoleColor.RESET,
            PadEnd.symbol(order.symbol),
            PadEnd.interval(order.timeInterval),
            PadEnd.strategyName(order.strategyName),
            'Price ' + ConsoleColor.YELLOW + (+order.price).toFixed(6)
        )
    }
}
import {SignalLogger} from "./signal-logger";
import {PadEnd} from "../pad-end";
import {BuySignalEvent} from "../../event-handler/events/buy-signal-event";
import {ConsoleColor} from "../console-color";

export class BuySignalLogger extends SignalLogger {
    constructor(signal: BuySignalEvent) {
        super();

        console.log(
            this._prefix +
            (signal.dalerCostAvg < 0 ? 'Buy ' :  'BUY '),
            PadEnd.symbol(signal.symbol),
            PadEnd.interval(signal.timeInterval),
            PadEnd.strategyName(signal.strategyName),
            this._toDateAndTime(new Date(signal.time)) + ConsoleColor.YELLOW,
            this._toNumber(signal.price, 6, 8) + ConsoleColor.RESET
        );
    }
}
import {ConsoleColor} from '../console-color';
import {CONFIG} from '../../config';
import {PadEnd} from '../pad-end';
import {LogType} from '../log-type';
import {substr} from '../../utils/substr';

export abstract class Logger {
    protected get _prefix(): string {
        return CONFIG.IS_FOR_TEST
            ? ''
            : (`${this._toDateAndTime(new Date())} ${ConsoleColor.BRIGHT + this._type + ConsoleColor.RESET} ${PadEnd.username(this._username)} `);
    }

    private readonly _username: string;

    private readonly _type: string;

    private readonly _typesLayout = {
        [LogType.SIGNAL]: ConsoleColor.BLUE + PadEnd.loggerType(LogType.SIGNAL),
        [LogType.ORDER]: ConsoleColor.GREEN + PadEnd.loggerType(LogType.ORDER),
        [LogType.ERROR]: ConsoleColor.RED + PadEnd.loggerType(LogType.ERROR),
        [LogType.WARN]: ConsoleColor.YELLOW + PadEnd.loggerType(LogType.WARN),
        [LogType.INFO]:  ConsoleColor.CYAN + PadEnd.loggerType(LogType.INFO)
    }

    protected constructor(type: LogType, username = 'System') {
        this._username = username;
        this._type = this._typesLayout[type];
    }

    protected _toDateAndTime(date: Date): string {
        return ConsoleColor.MAGENTA +
            date.toISOString()
                .substring(0, 19)
                .replace('T', ' ') +
            ConsoleColor.RESET;
    }

    protected _toNumber(value: number | string, toFixed: number, length: number): string {
        return substr((+value).toFixed(toFixed).substring(0, length), length);
    }
}
import {Logger} from "./logger";
import {LogType} from "../log-type";

export class OrderLogger extends Logger {
    constructor(username: string) {
        super(LogType.ORDER, username);
    }
}
import {Logger} from "./logger";
import {LogType} from "../log-type";
import {PadEnd} from "../pad-end";

export class RetryOrderLogger extends Logger {
    constructor(symbol: string, username: string) {
        super(LogType.INFO, username);

        console.log(
            this._prefix +
            PadEnd.symbol(symbol),
            'Retry order'
        );
    }
}
import {PadEnd} from "../pad-end";
import {ConsoleColor} from "../console-color";
import {OrderLogger} from "./order-logger";
import {SellOrderEvent} from "../../event-handler/events/sell-order-event";

export class SellOrderLogger extends OrderLogger {
    constructor(order: SellOrderEvent) {
        super(order.username);

        console.log(
            this._prefix +
            ConsoleColor.BG_RED + 'SELL' + ConsoleColor.RESET,
            PadEnd.symbol(order.symbol),
            PadEnd.interval(order.timeInterval),
            PadEnd.strategyName(order.strategyName),
            'Price ' + ConsoleColor.YELLOW + (+order.price).toFixed(6)
        )
    }
}
import {SignalLogger} from "./signal-logger";
import {PadEnd} from "../pad-end";
import {ConsoleColor} from "../console-color";
import {SellSignalEvent} from "../../event-handler/events/sell-signal-event";

export class SellSignalLogger extends SignalLogger {
    constructor(signal: SellSignalEvent) {
        super();

        console.log(
            this._prefix +

            (signal.dalerCostAvg ? 'Sell' : 'SELL') + ConsoleColor.RESET,
            PadEnd.symbol(signal.symbol),
            PadEnd.interval(signal.timeInterval),
            PadEnd.strategyName(signal.strategyName),
            this._toDateAndTime(new Date(signal.buyTime)) + ConsoleColor.BRIGHT + ConsoleColor.MAGENTA,
            this._diffDate(signal.buyTime, signal.sellTime) + ConsoleColor.RESET + ConsoleColor.YELLOW,
            this._toNumber(signal.minChanges, 3, 5) + (signal.sellChanges < 0 ? ConsoleColor.RED : ConsoleColor.GREEN),
            this._toNumber(signal.sellChanges, 3, 5) + ConsoleColor.YELLOW,
            this._toNumber(signal.maxChanges, 3, 5) + ConsoleColor.RESET
        )
    }

    private _diffDate(d1, d2): string {
        d1 = new Date(d1);
        d2 = new Date(d2);
        const diff = d2.getTime() - d1.getTime();
        const s = diff / 1000;

        const DS = 60 * 60 * 24;
        const HS = 60 * 60;
        const MS = 60;

        const diffDay = s - (s % DS);
        const days = diffDay / DS;

        const remainingHours = s - diffDay;
        const diffHours = remainingHours - (remainingHours % HS);
        const hours = diffHours / HS;

        const remainingMinutes = remainingHours - diffHours;
        const diffMinutes = remainingMinutes - (remainingMinutes % MS);
        const minutes = diffMinutes / MS;

        const remainingSeconds = remainingMinutes - diffMinutes;
        const seconds = Math.round(remainingSeconds % 60);

        return `${String(days).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}
import {Logger} from "./logger";
import {LogType} from "../log-type";

export class SignalLogger extends Logger {
    constructor() {
        super(LogType.SIGNAL);
    }
}
import {Logger} from "./logger";
import {LogType} from "../log-type";

export class WarnLogger extends Logger {
    constructor(message: string, username: string) {
        super(LogType.WARN, username);

        console.log(
            this._prefix +
            message
        );
    }
}
import {PadEnd} from "./pad-end";

export function LotSizeFilterFailureLog(symbol: string): string {
    return PadEnd.symbol(symbol) + ' LOT_SIZE filter error';
}
import {substr} from "../utils/substr";

export class PadEnd {
    static strategyName(value: string): string {
        return substr(value, 12);
    }

    static interval(value: string): string {
        return substr(value, 3);
    }

    static symbol(value: string): string {
        return substr(value, 9);
    }

    static username(value: string): string {
        return substr(value, 20);
    }

    static loggerType(value: string): string {
        return substr(value, 6);
    }
}
import {PadEnd} from "./pad-end";

export function RetryBuyOrderLog(symbol: string) {
    return PadEnd.symbol(symbol) + ' Retry buy order';
}
import {ConsoleColor} from "./console-color";

export function TotalBalanceLog(amount: number) {
    return 'Total Balance  ' + ConsoleColor.YELLOW + amount.toFixed(4) + ConsoleColor.RESET;
}
import {ConsoleColor} from "./console-color";

export function UpdatedBnbAmountLog(price: string, quantity: string) {
    return 'Updated BNB amount >>> Price: ' + ConsoleColor.YELLOW + (+price).toFixed(6) +
        ConsoleColor.RESET + ' Quantity: ' + ConsoleColor.YELLOW + quantity;
}
export class CandleBody {
    max: number;
    min: number;
    body: number;
    upperShadow: number;
    lowerShadow: number;
}
import {TimeInterval} from "./interval";
import {OHLC} from "../_indicators/ohlc";
import {MIN_INDICATORS_DATA_LENGTH} from "../config";
import {AllIndicators} from "../_indicators/all-indicators";
import {IndicatorFn, ToIndicatorFn} from "../_indicators/indicator-fn";
import {Ohlc} from "./ohlc";

export class Data {
    '1m' ?: IndicatorFn<OHLC, Ohlc>;
    '5m' ?: IndicatorFn<OHLC, Ohlc>;
    '15m'?: IndicatorFn<OHLC, Ohlc>;
    '30m'?: IndicatorFn<OHLC, Ohlc>;
    '1h' ?: IndicatorFn<OHLC, Ohlc>;
    '2h' ?: IndicatorFn<OHLC, Ohlc>;
    '4h' ?: IndicatorFn<OHLC, Ohlc>;
    '6h' ?: IndicatorFn<OHLC, Ohlc>;
    '8h' ?: IndicatorFn<OHLC, Ohlc>;
    '12h'?: IndicatorFn<OHLC, Ohlc>;
    '1d' ?: IndicatorFn<OHLC, Ohlc>;

    constructor(timeIntervals: TimeInterval[]) {
        timeIntervals.forEach(interval => {
            const ohlc = new OHLC(MIN_INDICATORS_DATA_LENGTH);
            this[interval] = ToIndicatorFn<OHLC, Ohlc>(ohlc);
        });
    }
}

export class IndicatorsData {
    '1m' ?: AllIndicators;
    '5m' ?: AllIndicators;
    '15m'?: AllIndicators;
    get m15(): AllIndicators { return this["15m"]; }

    '30m'?: AllIndicators;
    get m30(): AllIndicators { return this["30m"]; }

    '1h' ?: AllIndicators;
    get h1(): AllIndicators { return this["1h"]; }

    '2h' ?: AllIndicators;
    get h2(): AllIndicators { return this["2h"]; }

    '4h' ?: AllIndicators;
    get h4(): AllIndicators { return this["4h"]; }

    '6h' ?: AllIndicators;
    get h6(): AllIndicators { return this["6h"]; }

    '8h' ?: AllIndicators;
    get h8(): AllIndicators { return this["8h"]; }

    '12h'?: AllIndicators;
    get h12(): AllIndicators { return this["12h"]; }

    '1d' ?: AllIndicators;
    get d1(): AllIndicators { return this["1d"]; }

    constructor(timeIntervals: TimeInterval[]) {
        timeIntervals.forEach(interval => this[interval] = new AllIndicators());
    }
}
export interface Dmi {
    PDI: number[];
    MDI: number[];
    ADX: number[];
}
export interface IIchimoku {
    tenkanSen: number[];
    kijunSen: number[];
    senkouSpanA: number[];
    senkouSpanB: number[];
    chikouSpan: number[];
}export type TimeInterval = '1m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | '1d'
    | '3d'
    | '1w';

export interface KeltnerChannel {
    upper: number[];
    mid: number[];
    lower: number[];
}
export interface Macd {
    DIFF: number[];
    DEA: number[];
    MACD: number[];
}import {TimeInterval} from "./interval";
import {Data} from "./data";

export function maximumInterval(data: Data): TimeInterval {
    if (data['1w'])  return '1w';
    if (data['1d'])  return '1d';
    if (data['12h']) return '12h';
    if (data['8h'])  return '8h';
    if (data['6h'])  return '6h';
    if (data['4h'])  return '4h';
    if (data['2h'])  return '2h';
    if (data['1h'])  return '1h';
    if (data['30m']) return '30m';
    if (data['15m']) return '15m';
    if (data['5m'])  return '5m';
    if (data['1m'])  return '1m';
}
/*import {Data} from "./data";
import {minimumInterval} from "./minimum-interval";

describe('#minimumInterval', () => {
    it('should return 1m', () => {
        const data = new Data(['1m', '5m', '15m', '30m']);

        expect(minimumInterval(data)).toEqual('1m');
    });

    it('should return 30m', () => {
        const data = new Data(['1h', '2h', '4h', '30m']);

        expect(minimumInterval(data)).toEqual('30m');
    });
})*/
import {TimeInterval} from "./interval";
import {Data} from "./data";

export function minimumInterval(data: Data): TimeInterval {
    if (data['1m'])  return '1m';
    if (data['5m'])  return '5m';
    if (data['15m']) return '15m';
    if (data['30m']) return '30m';
    if (data['1h'])  return '1h';
    if (data['2h'])  return '2h';
    if (data['4h'])  return '4h';
    if (data['6h'])  return '6h';
    if (data['8h'])  return '8h';
    if (data['12h']) return '12h';
    if (data['1d'])  return '1d';
    if (data['1w'])  return '1w';
}
import {Intervals} from "../enums/intervals";

interface InitialOhlc {
    isFirstTrade: boolean;
    symbol: string;
    time: number;
    tradeTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export class Ohlc {
    isFirstTrade: boolean;
    symbol: string;
    time: number;
    tradeTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;

    max?: number;
    min?: number;
    body?: number;
    upperShadow?: number;
    lowerShadow?: number;

    constructor({isFirstTrade, symbol, time, tradeTime, open, high, low, close, volume}: InitialOhlc) {
        this.isFirstTrade = isFirstTrade;
        this.symbol = symbol;
        this.time = time;
        this.tradeTime = tradeTime;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }

    isBullish(): boolean {
        return this.close > this.open;
    }

    isBearish(): boolean {
        return this.close < this.open;
    }

    isHammer(bodyRatio: number): boolean {
        return this.body < this.lowerShadow / bodyRatio;
    }

    isNotHammer(bodyRatio: number): boolean {
        return this.body > this.lowerShadow / bodyRatio;
    }

    isReverseHammer(bodyRatio: number): boolean {
        return this.body < this.upperShadow / bodyRatio;
    }

    isNotReverseHammer(bodyRatio: number): boolean {
        return this.body > this.upperShadow / bodyRatio;
    }

    isHangingMan(bodyRatio: number): boolean {
        return this.body < this.lowerShadow / bodyRatio;
    }

    isNotHangingMan(bodyRatio: number): boolean {
        return this.body > this.lowerShadow / bodyRatio;
    }

    isShootingStar(bodyRatio: number): boolean {
        return this.body < this.upperShadow / bodyRatio;
    }

    isDoji(dojiBody: number): boolean {
        return this.body < dojiBody
            && this.body < this.upperShadow
            && this.body < this.lowerShadow
    }

    isNotDoji(dojiBody: number): boolean {
        return !this.isDoji(dojiBody);
    }

    isNotShootingStar(bodyRatio: number): boolean {
        return this.body > this.upperShadow / bodyRatio;
    }

    isVolumeGreaterThan(value: number): boolean {
        return this.volume > value;
    }

    isVolumeLessThan(value: number): boolean {
        return this.volume < value;
    }

    isBodyGreaterThan(value: number): boolean {
        return this.body > value;
    }

    isBodyLessThan(value: number): boolean {
        return this.body < value;
    }

    isBodyAbove(value: number): boolean {
        return this.min > value;
    }

    isBodyBelow(value: number): boolean {
        return this.max < value;
    }

    isCloseAbove(value: number): boolean {
        return this.close > value;
    }

    isOpenAbove(value: number): boolean {
        return this.open > value;
    }

    isOpenBelow(value: number): boolean {
        return this.open < value;
    }

    isCloseBelow(value: number): boolean {
        return this.close < value;
    }

    isLowAbove(value: number): boolean {
        return this.low > value;
    }

    isLowBelow(value: number): boolean {
        return this.low < value;
    }

    isHighBelow(value: number): boolean {
        return this.high < value;
    }

    isHighAbove(value: number): boolean {
        return this.high > value;
    }

    isLowerShadowGreaterThan(value: number): boolean {
        return this.lowerShadow > value;
    }

    isUpperShadowLessThan(value: number): boolean {
        return this.upperShadow < value;
    }

    isLowerShadowLessThan(value: number): boolean {
        return this.lowerShadow < value;
    }

    isNotVolatilityHigh(value: number): boolean {
        return this.high - this.low < value;
    }

    isShadowsLessThan(bodyRatio: number): boolean {
        return this.lowerShadow < this.body * bodyRatio
            && this.upperShadow < this.body * bodyRatio;
    }

    isNotFirstOfDay(): boolean {
        return this.high !== this.low;
    }

    isCrossover(value: number): boolean {
        return this.open < value && this.close > value;
    }

    isNotCrossover(value: number): boolean {
        return !this.isCrossover(value);
    }

    isStopLossLessThan(price: number, percent): boolean {
        const changes = (this.close/price - 1) * 100;

        return changes < percent;
    }

    get isCloseEqualHigh(): boolean {
        return this.high === this.close;
    }
}

export class OhlcArray {
    time: number[] = new Array(11);
    open: number[] = new Array(11);
    high: number[] = new Array(11);
    low: number[] = new Array(11);
    close: number[] = new Array(11);
    volume: number[] = new Array(11);
}

export type OhlcRow = [
    number, // Date
    string, // Open
    string, // High
    string, // Low
    string, // Close
    string,
    number,
    string,
    number,
    string,
    string,
    string
];

export class OhlcIntervals {
    [Intervals.m30] : Ohlc[] = [];
    [Intervals.h1]  : Ohlc[] = [];
    [Intervals.h2]  : Ohlc[] = [];
    [Intervals.h4]  : Ohlc[] = [];
    [Intervals.h6]  : Ohlc[] = [];
    [Intervals.h8]  : Ohlc[] = [];
    [Intervals.h8]  : Ohlc[] = [];
    [Intervals.h12] : Ohlc[] = [];
    [Intervals.d1]  : Ohlc[] = [];
    [Intervals.d3]  : Ohlc[] = [];
    [Intervals.w1]  : Ohlc[] = [];
}
import {BuyInterval} from '../strategies/strategy-runner';
import {IndicatorsData} from './data';
import {AllIndicators} from '../_indicators/all-indicators';

export abstract class Strategy {
    abstract takeProfit: number;
    stopLoss: number = 0;

    _indicators: IndicatorsData; // Must be protected;
    set indicatorsData(indicatorsData: IndicatorsData) {
        this._indicators = indicatorsData;
    }

    abstract buy(indicators?: AllIndicators, indicatorsData?: IndicatorsData, interval?: string): boolean;

    sell(buyPrice: number, buyInterval?: BuyInterval, interval?: string, indicators?: AllIndicators): boolean {
        return false;
    };
}
import * as binance from "binance-api-node";
import {Ohlc, OhlcRow} from "./models/ohlc";
import {getOhlcRowData} from "./api/ohlc-data";
import {AVAILABLE_INTERVALS, INTERVAL_TIME_PATTERN} from "./config";
import {Data, IndicatorsData} from "./models/data";
import {OHLC} from "./_indicators/ohlc";
import {AllIndicators} from "./_indicators/all-indicators";
import {PadEnd} from "./logger/pad-end";
import {substr} from "./utils/substr";
import {SymbolsLastPrice} from "./symbols-last-price";
import {IndicatorFn} from "./_indicators/indicator-fn";

let downloadFileCount = 0;

export class OhlcData {
    private readonly symbol: string;
    private data = new Data(AVAILABLE_INTERVALS);
    private indicators = new IndicatorsData(AVAILABLE_INTERVALS);

    constructor(symbol: string) {
        this.symbol = symbol;
    }

    private convertToOhlc(ohlcs: IndicatorFn<OHLC, Ohlc>, indicators: AllIndicators, data: OhlcRow[]): void {
        data.forEach(d => {
            const ohlc = new Ohlc({
                isFirstTrade: true,
                symbol: this.symbol,
                time: d[0],
                tradeTime: +d[0],
                open: +d[1],
                high: +d[2],
                low: +d[3],
                close: +d[4],
                volume: +d[5]});

            ohlcs.next(ohlc);
            indicators.next(ohlcs);
            indicators.update(ohlcs);
        })
    }

    private async getOhlcRawData(interval: string): Promise<OhlcRow[]> {
        return getOhlcRowData(interval, this.symbol);
    }

    private async getOhlcDataList() {
        const n = AVAILABLE_INTERVALS.length;
        for (let i = 0; i < n; i++) {
            const interval = AVAILABLE_INTERVALS[i];
            const rowData = await this.getOhlcRawData(interval);

            this.convertToOhlc(this.data[interval], this.indicators[interval], rowData);
        }

        downloadFileCount++;
        console.log(substr(downloadFileCount, 3), '|', PadEnd.symbol(this.symbol), 'OHLC data fetched');
    }

    async subscribeOnTrades(callback) {
        await this.getOhlcDataList();

        binance.default({}).ws.trades([this.symbol], trade => {
            const j = AVAILABLE_INTERVALS.length;
            const price = +trade.price;

            SymbolsLastPrice.updatePrice(trade.symbol, price);

            for (let i = 0; i < j; i++) {
                const interval = AVAILABLE_INTERVALS[i];
                const klineStartTime = trade.tradeTime - (trade.tradeTime % INTERVAL_TIME_PATTERN[interval]);
                const data = this.data[interval];

                if (data.getLast().time !== klineStartTime) {
                    const ohlc = new Ohlc({
                        isFirstTrade: true,
                        symbol: trade.symbol,
                        time: klineStartTime,
                        tradeTime: +trade.tradeTime,
                        open: price,
                        high: price,
                        low: price,
                        close: price,
                        volume: +trade.quantity
                    });
                    data.next(ohlc);

                    this.indicators[interval].next(data);
                } else {
                    const lastOhlc = data.getLast();
                    data.update({
                        tradeTime: +trade.tradeTime,
                        open: lastOhlc.open,
                        high: Math.max(price, lastOhlc.high),
                        low: Math.min(price, lastOhlc.low),
                        close: price,
                        volume: lastOhlc.volume + +trade.quantity,
                    });

                    this.indicators[interval].update(data);
                }
            }

            callback(this.data, this.indicators);
        });
    }
}
import prompts from "prompts";
import {Jobs} from "./jobs";
import {ExchangeInfo} from "./api/exchange-info";

new Jobs();

setTimeout(init, 5000);

async function init() {
    await ExchangeInfo.getExchangeInfo();
    const order = await prompts([
        {
            type: 'text',
            name: 'username',
            message: 'Username'
        },
        {
            type: 'text',
            name: 'symbol',
            message: 'Symbol'
        },
        {
            type: 'text',
            name: 'side',
            message: 'Order Side',
            validate: value => (value === 'BUY' || value === 'SELL')
                ? true
                : `Order side should be BUY or SELL`
        },
        {
            type: 'text',
            name: 'quantity',
            message: 'Quantity',
            hint: '0 or quantity'
        },
        {
            type: 'text',
            name: 'ready',
            message: 'Are you sure?',
            initial: 'Yes',
        }
    ]);

    if (order.ready === 'Yes') {
        const user = Jobs.Users[order.username];
        let quantity = (user as any).assetBalances[order.symbol.slice(0, -4)].free;
        quantity = order.quantity === '0' ? quantity : order.quantity;
        quantity = ExchangeInfo.fixQuantityByLotSize(order.symbol, +quantity);

        user.client.order({
            type: 'MARKET',
            side: order.side,
            symbol: order.symbol,
            quantity
        })
            .then((resp) => {
                console.log(
                    user.username,
                    order.side,
                    order.symbol,
                    '|', 'Quantity:', quantity,
                    '|', 'Price', +(+resp.fills[0].price).toFixed(6));
            })
            .catch(err => {
                console.log(user.username, err);
            })
    }
};

import {Ohlc} from "../../models/ohlc";

export function is_doji_(ohlc: Ohlc, atr: number): boolean {
    return ohlc.body < atr/5
        && (ohlc.upperShadow > ohlc.body * 2
        || ohlc.lowerShadow > ohlc.body * 2)
}
import {Ohlc} from "../../models/ohlc";

export function is_hanging_man(ohlc: Ohlc, strongTimes: number = 1): boolean {
    return ohlc.body * strongTimes < ohlc.lowerShadow
}import {Indicator} from "../../_indicators/indicator";

export function is_mas_bullish(ma1: Indicator, ma2: Indicator, n: number, m: number = 1): boolean {
    if (n > 5 && ma1.get(1) - ma2.get(1) < ma1.get(2) - ma2.get(2)) {
        return false;
    }

    for (let j = 1; j <= n; j++) {
        if (ma1.get(j) < ma2.get(j)) return false;
    }

    for (let j = n + 1; j <= n + m; j++) {
        if (ma1.get(j) > ma2.get(j)) return false;
    }

    return true;
}
export function is_price_close_to(price: number, value: number, atr: number, diameterRatio: number = 2): boolean {
    return price < value + (atr * diameterRatio);
}
import {Ohlc} from "../../models/ohlc";

export function is_reverse_hammer(ohlc: Ohlc, strongTimes: number = 1): boolean {
    return ohlc.body * strongTimes < ohlc.upperShadow
}import { ATR } from "../../_indicators/atr";
import {Close} from "../../_indicators/close";

export function is_volatility_high(close: Close, atr: ATR, i: number, times: number): boolean {
    const ATR_PERIOD = atr.period;
    const volatility = ((atr.get(2 + i) * (ATR_PERIOD - 1) + (atr.get(1 + i) * times)) / ATR_PERIOD) + close.get(1 + i);
    return close.get(i) > volatility;
}
import {Strategy} from './strategy';
import {calcChangesInfo} from './strategy-runner';
import {AllIndicators} from '../_indicators/all-indicators';

export abstract class LowRiskAtrRatioStrategy extends Strategy {
    protected abstract _atrRatio: number;

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close, atr14}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes < this._stopLoss
            || (
                close(0).isGreaterThan(buyInterval.buyPrice + atr14.get(1) * this._atrRatio)
                && changes > this._takeProfit
            );
    }
}
import {Strategy} from './strategy';
import {calcChangesInfo} from './strategy-runner';
import {AllIndicators} from '../_indicators/all-indicators';

export abstract class LowRiskStrategyNew extends Strategy {
    protected _stopLossCandleIndex = 1;

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(this._stopLossCandleIndex).low)
            || changes < this._stopLoss
            || changes > this._takeProfit;
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(0.75)
class StrategyA000 extends Strategy {
    takeProfit = 1.0;

    buy({ohlcs, volume, atr14, dmi14, cci5, rsi5}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1)/1.5)
            && ohlcs(1).isLowerShadowGreaterThan(atr14.get(1))

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(1).body)

            && volume(1).isGreaterThanIndex(2)

            && cci5(1).isBullish()
            && cci5(1).isGreaterThan(-100)

            && rsi5(1).isGreaterThan(30)

            && dmi14.MDI(1).isGreaterThan(30)
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI()
    }
}

export class StrategyA000Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA000,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1)
class StrategyA001 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, volume, atr14, dmi14, cci5, macd12}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)
            && ohlcs(1).isLowerShadowGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()

            && volume(1).isGreaterThan(volume.get(2) * 5)

            && dmi14.PDI(1).isLessThan(30)
            && dmi14.MDI(1).isGreaterThan(40)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()

            && cci5(2).isLessThan(-100)

            && macd12(1).isNegative()
            && macd12(2).isNegative()
    }
}

export class StrategyA001Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA001,
            timeIntervals: ['1h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1)
class StrategyA002 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, volume, atr14, dmi14, cci5, macd12}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1)/1.5)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)
            && ohlcs(1).isLowerShadowGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()

            && volume(1).isGreaterThan(volume.get(2) * 4)

            && dmi14.PDI(1).isLessThan(30)
            && dmi14.MDI(1).isGreaterThan(40)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()

            && cci5(2).isLessThan(-100)

            && macd12(1).isNegative()
            && macd12(2).isNegative()
    }
}

export class StrategyA002Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA002,
            timeIntervals: ['2h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1, 2)
class StrategyA003 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, atr14, dmi14, macd12, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            /* -------------< Confirmation >------------- */
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isCloseBelow(ohlcs(3).max)

            && dmi14.PDI(1).isLessThan(20)

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci3(3).isLessThan(cci3.MA)
    }
}

export class StrategyA003Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA003,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(0.5, 2)
class StrategyA004 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, low, atr14, dmi14, macd12, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            /* -------------< Confirmation >------------- */
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)
            && volume(2).isGreaterThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isCloseBelow(ohlcs(3).max)

            && dmi14.PDI(1).isLessThan(20)

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci3(3).isLessThan(cci3.MA)
    }
}

export class StrategyA004Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA004,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1, 2)
class StrategyA005 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, atr14, kc2, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(1)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(3) * 4)

            && volume(2).isGreaterThanIndex(3)

            && kc2.LOWER(2).isGreaterThan(ohlcs(2).max)

            && cci3(2).isLessThan(cci3.MA)
            && cci3(3).isLessThan(cci3.MA)
            && cci3(4).isLessThan(cci3.MA)
    }
}

export class StrategyA005Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA005,
            timeIntervals: ['6h', '4h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {sellBasedOnAtrRatio, StrategyRunner} from "../strategy-runner";

@sellBasedOnAtrRatio(1)
class StrategyA006 extends Strategy {
    takeProfit = 1.0;

    buy({ohlcs, volume, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1))
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isLowerShadowLessThan(atr14.get(1) * 2)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()

            && volume(1).isGreaterThan(volume.get(2)*5)
            && volume(1).isGreaterThan(volume.get(3)*5)

            && kc2.LOWER(1).isGreaterThan(ohlcs(1).min)
    }
}

export class StrategyA006Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA006,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {sellBasedOnAtrRatio, StrategyRunner} from "../strategy-runner";

@sellBasedOnAtrRatio(1)
class StrategyA007 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, emaVol, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            /* -------------< Confirmation >------------- */
            && low(1).isLessThanIndex(2)

            && volume(2).isGreaterThan(emaVol.get(2) * 2)

            && kc2.LOWER(1).isGreaterThan(ohlcs(1).min)
    }
}

export class StrategyA007Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA007,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1, 2)
class StrategyA008 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, close, low, volume, atr14, emaVol, kc}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(1)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2) / 10)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 5)
            && close(1).isGreaterThan(ohlcs(2).max)

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)

            && volume(1).isGreaterThan(emaVol)
            && volume(2).isGreaterThan(emaVol.get(2) * 2)

            && kc.LOWER(2).isGreaterThan(ohlcs(2).min)
    }
}

export class StrategyA008Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA008,
            timeIntervals: ['8h', '6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1, 2)
class StrategyA009 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, atr14, dmi14, macd12, cci3}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(1)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isCloseBelow(ohlcs(3).max)

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)

            && dmi14.PDI(1).isLessThan(20)
            && dmi14(1).isPDIBelowMDI()

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci3(3).isLessThan(cci3.MA)
    }
}

export class StrategyA009Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA009,
            timeIntervals: ['1d', '12h', '8h', '6h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {sellBasedOnAtrRatio, StrategyRunner} from "../strategy-runner";

@sellBasedOnAtrRatio(1)
class StrategyA050 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, atr14, rsi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyLessThan(ohlcs(2).body/1.3)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            && rsi14(1).isLessThan(40)

            && cci20(0).isGreaterThan(-100)
    }
}

export class StrategyA050Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA050,
            timeIntervals: ['8h', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1)
class StrategyA100 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, atr14, kc3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && low(2).isLessThanIndex(3)

            && kc3.LOWER(2).isGreaterThan(ohlcs(2).max)
            && kc3.LOWER(1).isLessThan(ohlcs(1).max)
    }
}

export class StrategyA100Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA100,
            timeIntervals: ['1d', '12h', '8h', '6h', '4h', '2h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(0.5)
class StrategyA101 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, atr14, kc2, cci3, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isShadowsLessThan(1)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && low(2).isLessThanIndex(3)

            && kc2.LOWER(2).isGreaterThan(ohlcs(2).max)
            && kc2.LOWER(1).isLessThan(ohlcs(1).max)

            && cci3(1).isGreaterThan(cci3.MA)

            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI()
            && dmi14(6).isPDIBelowMDI()
    }
}

export class StrategyA101Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA101,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";
import {IndicatorsData} from "../../models/data";

@sellBasedOnAtrRatio(0.75)
class StrategyA102 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, low, high, atr14, emaVol, kc2}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const d1 = indicatorsData.d1;

        return ohlcs(0).isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isCloseAbove(high.get(2))
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isShadowsLessThan(1)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)
            && low(1).isLessThanIndex(3)

            && kc2.MID(1).isGreaterThan(high)

            && d1.kc2.LOWER(1).isGreaterThan(ohlcs(1).min)
    }
}

export class StrategyA102Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA102,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {sellBasedOnAtrRatio, StrategyRunner} from "../strategy-runner";

@sellBasedOnAtrRatio(1)
class StrategyM000 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, open, high, tenkanSen, kijunSen, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ------<TenkanSen crossover KijunSen>------ */
            && tenkanSen(1).isCrossover(kijunSen)

            && open(1).isGreaterThan(high.get(26))
            && open(1).isGreaterThan(high.get(25))

            /* -------------< Confirmation >------------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)
    }
}

export class StrategyM000Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM000,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {sellBasedOnAtrRatio, StrategyRunner} from "../strategy-runner";

@sellBasedOnAtrRatio(1)
class StrategyM002 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, close, open, high, tenkanSen, kijunSen, rsi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ------<TenkanSen crossover KijunSen>------ */
            && tenkanSen(1).isCrossover(kijunSen)

            && open(1).isGreaterThan(high.get(26))
            && open(1).isGreaterThan(high.get(25))

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(2)

            && rsi14(1).isCrossover(70)

            && cci20(1).isLessThan(170)

            && tenkanSen(3).isLessThan(kijunSen)
            && tenkanSen(4).isLessThan(kijunSen)
            && tenkanSen(5).isLessThan(kijunSen)
    }
}

export class StrategyM002Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM002,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyM003 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, close, volume, tenkanSen, kijunSen, emaVol, dmi14, cci5, cci20}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -----------< TenkanSen Bullish >---------- */
            && tenkanSen(1).isBullish()
            && tenkanSen(2).isBullish()
            && tenkanSen(3).isBullish()

            && kijunSen(1).isBullish()
            && kijunSen(2).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(1)
            && close(1).isLessThan(kijunSen.get(1) * 2)

            && volume(1).isLessThan(emaVol)

            && dmi14.PDI(1).isBullish()

            && tenkanSen(1).isGreaterThan(kijunSen)

            && cci20(1).isGreaterThanIndex(5)
            && cci20(1).isGreaterThanIndex(6)

            && cci5(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close, tenkanSen, kijunSen, atr14}: AllIndicators): boolean {

        return tenkanSen(1).isLessThan(kijunSen)
            || (
                buyInterval.buyPrice + atr14.get(1) < close.getLast()
                && changes > this.takeProfit
            )
    }
}

export class StrategyM003Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM003,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(0.5, 2)
class StrategyQ000 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, open, dmi14, atr14, cci3, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------< DMI Reverse >-------------- */
            && dmi14.MDI(1).isBearish()
            && dmi14.MDI(2).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isShadowsLessThan(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)
            && ohlcs(2).isNotVolatilityHigh(atr14.get(2) * 2)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(3) * 2)

            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)

            && cci3(1).isGreaterThan(cci3.MA)

            && kc2.LOWER(1).isGreaterThan(open)
    }
}

export class StrategyQ000Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ000,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {sellBasedOnAtrRatio, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

@sellBasedOnAtrRatio(1, 2)
class StrategyQ001 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, open, dmi14, atr14, cci3, cci20, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------< DMI Reverse >-------------- */
            && dmi14.MDI(1).isBearish()
            && dmi14.MDI(2).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isShadowsLessThan(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)

            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)

            && cci20(1).isGreaterThan(-100)

            && kc2.LOWER(1).isGreaterThan(open)
    }
}

export class StrategyQ001Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ001,
            timeIntervals: ['1d', '12h', '8h', '6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA00 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, volume, atr14, dmi14, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isLowerShadowGreaterThan(atr14.get(1))

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()

            && volume(1).isGreaterThan(emaVol.get(2) * 2)
            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)

            && dmi14.MDI(1).isGreaterThan(30)
            && dmi14.PDI(1).isLessThan(30)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA00,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA01 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, atr14, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isNotReverseHammer(1)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2))

            /* -------------< Confirmation >------------- */
            && volume(2).isGreaterThan(volume.get(3) * 1.5)

            && dmi14.PDI(2).isLessThan(30)
            && dmi14.MDI(2).isGreaterThan(30)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1.5)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA01,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA02 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, atr14, rsi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isNotReverseHammer(1)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2))

            /* -------------< Confirmation >------------- */
            && volume(2).isGreaterThan(volume.get(3) * 1.5)

            && rsi14(2).isLessThan(50)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1.5)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA02Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA02,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA03 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, dmi14, macd12}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs.get(3).isHammer(2)
            && ohlcs.get(3).isNotReverseHammer(1)
            && ohlcs.get(3).isBodyGreaterThan(atr14.get(3)/5)
            && ohlcs.get(3).isLowerShadowGreaterThan(atr14.get(3))

            /* -------------< Confirmation >------------- */
            && ohlcs.get(3).isVolumeGreaterThan(ohlcs.get(4).volume * 1.5)

            && dmi14.PDI.get(3) < 30
            && dmi14.MDI.get(3) > 30

            /* -------------< Confirmation >------------- */
            && macd12.get(2).isNegative()
            && macd12.get(1).isPositive()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || this.takeProfit < changes
    }
}

export class StrategyA03Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA03,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA04 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, rsi14, macd12}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs.get(3).isHammer(2)
            && ohlcs.get(3).isNotReverseHammer(1)
            && ohlcs.get(3).isBodyGreaterThan(atr14.get(3)/5)
            && ohlcs.get(3).isLowerShadowGreaterThan(atr14.get(3))

            /* -------------< Confirmation >------------- */
            && ohlcs.get(3).isVolumeGreaterThan(ohlcs.get(4).volume * 1.5)

            && rsi14.get(3) < 50

            /* -------------< Confirmation >------------- */
            && macd12.get(2).isNegative()
            && macd12.get(1).isPositive()

    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || this.takeProfit < changes
    }
}

export class StrategyA04Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA04,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA05 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, low, volume, atr14, rsi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isLowerShadowGreaterThan(atr14.get(1))

            /* -------------< Confirmation >------------- */
            && low(1).isLessThanIndex(2)
            && low(1).isLessThanIndex(3)
            && low(1).isLessThanIndex(4)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            && rsi14(1).isCrossover(30)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || this.takeProfit < changes
    }
}

export class StrategyA05Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA05,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA06 extends Strategy {
    takeProfit = 5.2;

    buy({ohlcs, low, high, atr14, tenkanSen, kijunSen, obv, dmi14, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(ohlcs(1).low, 10)

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(0.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isNotVolatilityHigh(atr14.get(1) * 2)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(1) * 3)

            && low(1).isLessThanIndex(3)
            && low(1).isLessThanIndex(4)

            && high(1).isLessThan(kijunSen)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(1).isLessThan(kijunSen)
            && tenkanSen(2).isLessThan(kijunSen)

            && obv(1).isGreaterThan(0)

            && stoch14.D(1).isBullish()
            && stoch14.K(1).isBullish()
            && stoch14.K(1).isGreaterThan(22)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA06Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA06,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA07 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, volume, dmi14, emaVol, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyLessThan(atr14.get(2))

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(1).body)

            && volume(1).isGreaterThan(emaVol.get(1) * 3)
            && volume(1).isGreaterThan(volume.get(2) * 2)


            && dmi14.PDI(1).isLessThan(30)
            && dmi14.MDI(1).isGreaterThan(30)
            && dmi14(1).isADXBullish()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA07Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA07,
            timeIntervals: ['6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA08 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, volume, dmi14, emaVol, macd12, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(0.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isNotVolatilityHigh(atr14.get(1) * 3)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(1) * 3)

            && volume(1).isGreaterThan(emaVol.get(1) * 5)
            && volume(1).isGreaterThan(volume.get(2) * 2)

            && dmi14.MDI(1).isGreaterThan(40)
            && dmi14(1).isADXBullish()

            && macd12(1).isNegative()
            && macd12(2).isNegative()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA08Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA08,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA10 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -10;

    buy({ohlcs, high, low, volume, dmi14, macd12, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* ----------------< Hammer >---------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(0.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isNotVolatilityHigh(atr14.get(1) * 2)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(1) * 3)

            && high(1).isLessThan(kijunSen.get(1) - atr14.get(1)/2)

            && volume(1).isGreaterThanMA(4)
            && volume(1).isGreaterThan(volume.get(2) * 2)

            && dmi14.MDI(1).isGreaterThan(40)
            && dmi14(1).isADXBullish()

            && macd12(1).isNegative()
            && macd12(2).isNegative()

            && tenkanSen(1).isLessThan(kijunSen.get(1) - atr14.get(1)/5)
    }
}

export class StrategyA10Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA10,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA11 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -10;

    buy({ohlcs, low, volume, atr14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* ----------------< Hammer >---------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(0.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isNotVolatilityHigh(atr14.get(1) * 2)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(1) * 3)

            && volume(1).isGreaterThanMA(4)

            && momentum.value(1).isLessThan(0.9)
    }
}

export class StrategyA11Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA11,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA12 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, atr14, dmi14, macd12, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(3)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            /* -------------< Confirmation >------------- */
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)
            && volume(2).isGreaterThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isCloseBelow(ohlcs(3).max)

            && dmi14.PDI(1).isLessThan(20)

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci3(3).isLessThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA12Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA12,
            timeIntervals: ['1d', '12h', '8h', '6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA13 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, kijunSen, tenkanSen, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanMA(3)

            && tenkanSen(1).isLessThan(kijunSen)

            && momentum(1).isBullish()
    }
}

export class StrategyA13Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA13,
            timeIntervals: ['8h', '6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA14 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, atr14, dmi14, macd12, cci3}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isCloseBelow(ohlcs(3).max)

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)

            && dmi14.PDI(1).isLessThan(20)
            && dmi14(1).isPDIBelowMDI()

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci3(3).isLessThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA14Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA14,
            timeIntervals: ['1d', '12h', '8h', '6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA15 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, high, low, volume, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && close(1).isGreaterThan(high.get(2))

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(5)

            && volume(2).isGreaterThanMA(3)
    }
}

export class StrategyA15Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA15,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {IndicatorsData} from '../../models/data';

class StrategyA16 extends Strategy {
    takeProfit = 3.0;

    buy({ohlcs, low, volume, atr14, kc, dmi14, emaVol}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(3)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isCloseBelow(ohlcs.get(3).max)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isHighBelow(kc.MID.get(3))
            && ohlcs(3).isNotVolatilityHigh(atr14.get(3) * 2)

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)

            && volume(2).isGreaterThan(emaVol)

            && dmi14.PDI.get(1) < 20

            // --- Short term indicators
            && h1.ohlcs.get(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close, atr14}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA16Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA16,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyA17 extends Strategy {
    takeProfit = 1.5;
    stopLoss = -15;

    buy({ohlcs, low, atr14, cci20, rsi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs.get(2).isHammer(3)
            && ohlcs.get(2).isNotReverseHammer(1)
            && ohlcs.get(2).isLowerShadowGreaterThan(atr14.get(2))

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)

            /* -------------< Confirmation >------------- */
            && ohlcs.get(5).isBearish()
            && ohlcs.get(4).isBearish()
            && ohlcs.get(3).isBearish()

            && ohlcs.get(1).isBullish()
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1)/2)

            && cci20(1).isLessThan(-100)
            && cci20(2).isLessThan(-100)
            && cci20(3).isLessThan(-100)
            && cci20(4).isLessThan(-100)

            && rsi14(1).isLessThan(30)
            && rsi14(2).isLessThan(30)
            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)
            && rsi14(6).isLessThan(30)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || changes > this.takeProfit
            || changes < this.stopLoss;
    }
}

export class StrategyA17Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA17,
            timeIntervals: ['2h', '1h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyA18 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, high, low, atr14, kc, cci5, volume, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 15)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2)/1.5)

            && low(2).isLessThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()

            && volume(2).isGreaterThan(emaVol.get(2)*2)

            && high(1).isLessThan(kc.MID)

            && cci5(1).isGreaterThan(cci5.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || changes > this.takeProfit
    }
}

export class StrategyA18Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA18,
            timeIntervals: ['8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA19 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, atr14, cci20, ema20, ema50, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(1).isHammer(3)
            && ohlcs(1).isNotReverseHammer(.5)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 5)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && cci20(1).isLessThan(-200)
            && cci20(5).isLessThan(0)
            && cci20(6).isLessThan(0)
            && cci20(7).isLessThan(0)
            && cci20(8).isLessThan(0)
            && cci20(9).isLessThan(0)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA19Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA19,
            timeIntervals: ['8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA20 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(10).isBearish()
            && ohlcs.get(10).isBodyGreaterThan(atr14.get(10))

            && ohlcs.get(9).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(8).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(7).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(10).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(10).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyLessThan(atr14.get(1)/2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA20Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA20,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA21 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(9).isBearish()
            && ohlcs.get(9).isBodyGreaterThan(atr14.get(9))

            && ohlcs.get(8).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(7).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(9).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(9).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyLessThan(atr14.get(1)/2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA21Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA21,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA22 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(8).isBearish()
            && ohlcs.get(8).isBodyGreaterThan(atr14.get(8))

            && ohlcs.get(7).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(8).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(8).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyLessThan(atr14.get(1)/2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA22Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA22,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA23 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(7).isBearish()
            && ohlcs.get(7).isBodyGreaterThan(atr14.get(7))

            && ohlcs.get(6).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(7).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(7).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyLessThan(atr14.get(1)/2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA23Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA23,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA24 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, high, low, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 15)

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs(6).isBearish()
            && ohlcs(6).isBodyGreaterThan(atr14.get(6)/4)

            && ohlcs(5).isBodyLessThan(ohlcs(6).body/2)
            && ohlcs(4).isBodyLessThan(ohlcs(6).body/2)
            && ohlcs(3).isBodyLessThan(ohlcs(6).body/2)

            && ohlcs(2).isBullish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(6).body)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyLessThan(atr14.get(1)/2)

            && high(1).isLessThan(kijunSen)

            && tenkanSen(1).isLessThan(kijunSen)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA24Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA24,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA25 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(5).isBearish()
            && ohlcs.get(5).isBodyGreaterThan(atr14.get(5))

            && ohlcs.get(4).isBodyLessThan(ohlcs.get(5).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(5).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(5).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyLessThan(atr14.get(1)/2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA25Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA25,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA30 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(10).isBearish()
            && ohlcs.get(10).isBodyGreaterThan(atr14.get(10))

            && ohlcs.get(9).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(8).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(7).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(10).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(10).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && (rsi14.get(1) < 60 || ohlcs.get(1).isVolumeLessThan(emaVol.get(1)))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA30Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA30,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA31 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(9).isBearish()
            && ohlcs.get(9).isBodyGreaterThan(atr14.get(9))

            && ohlcs.get(8).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(7).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(9).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(9).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && (rsi14.get(1) < 60 || ohlcs.get(1).isVolumeLessThan(emaVol.get(1)))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA31Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA31,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA32 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(8).isBearish()
            && ohlcs.get(8).isBodyGreaterThan(atr14.get(8))

            && ohlcs.get(7).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(8).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(8).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && (rsi14.get(1) < 60 || ohlcs.get(1).isVolumeLessThan(emaVol.get(1)))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA32Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA32,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA33 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(7).isBearish()
            && ohlcs.get(7).isBodyGreaterThan(atr14.get(7))

            && ohlcs.get(6).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(7).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(7).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && (rsi14.get(1) < 60 || ohlcs.get(1).isVolumeLessThan(emaVol.get(1)))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA33Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA33,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA34 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(6).isBearish()
            && ohlcs.get(6).isBodyGreaterThan(atr14.get(6))

            && ohlcs.get(5).isBodyLessThan(ohlcs.get(6).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(6).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(6).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(6).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && (rsi14.get(1) < 60 || ohlcs.get(1).isVolumeLessThan(emaVol.get(1)))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA34Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA34,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA35 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(5).isBearish()
            && ohlcs.get(5).isBodyGreaterThan(atr14.get(5))

            && ohlcs.get(4).isBodyLessThan(ohlcs.get(5).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(5).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(5).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && (rsi14.get(1) < 60 || ohlcs.get(1).isVolumeLessThan(emaVol.get(1)))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA35Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA35,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA36 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, high, low, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 15)

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs(6).isBearish()
            && ohlcs(6).isBodyGreaterThan(atr14.get(6) / 3)

            && ohlcs(5).isBodyLessThan(ohlcs(6).body / 2)
            && ohlcs(4).isBodyLessThan(ohlcs(6).body / 2)
            && ohlcs(3).isBodyLessThan(ohlcs(6).body / 2)

            && ohlcs(2).isBullish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(6).body)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyLessThan(atr14.get(1) / 2)

            && high(1).isLessThan(kijunSen)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA36Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA36,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA40 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(10).isBearish()
            && ohlcs.get(10).isBodyGreaterThan(atr14.get(10))

            && ohlcs.get(9).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(8).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(7).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(10).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(10).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(10).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1))
            && ohlcs.get(2).isVolumeLessThan(emaVol.get(2))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA40,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA41 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(9).isBearish()
            && ohlcs.get(9).isBodyGreaterThan(atr14.get(9))

            && ohlcs.get(8).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(7).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(9).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(9).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(9).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1))
            && ohlcs.get(2).isVolumeLessThan(emaVol.get(2))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA41,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA42 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(8).isBearish()
            && ohlcs.get(8).isBodyGreaterThan(atr14.get(8))

            && ohlcs.get(7).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(6).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(8).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(8).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(8).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1))
            && ohlcs.get(2).isVolumeLessThan(emaVol.get(2))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA42,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA43 extends Strategy {
    takeProfit = 2;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(7).isBearish()
            && ohlcs.get(7).isBodyGreaterThan(atr14.get(7))

            && ohlcs.get(6).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(5).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(7).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(7).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(7).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1))
            && ohlcs.get(2).isVolumeLessThan(emaVol.get(2))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA43,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA44 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(6).isBearish()
            && ohlcs.get(6).isBodyGreaterThan(atr14.get(6))

            && ohlcs.get(5).isBodyLessThan(ohlcs.get(6).body/2)
            && ohlcs.get(4).isBodyLessThan(ohlcs.get(6).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(6).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(6).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1))
            && ohlcs.get(2).isVolumeLessThan(emaVol.get(2))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA44Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA44,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA45 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, high, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<  Bottom Pan  >------------- */
            && ohlcs.get(5).isBearish()
            && ohlcs.get(5).isBodyGreaterThan(atr14.get(5))

            && ohlcs.get(4).isBodyLessThan(ohlcs.get(5).body/2)
            && ohlcs.get(3).isBodyLessThan(ohlcs.get(5).body/2)

            && ohlcs.get(2).isBullish()
            && ohlcs.get(2).isBodyGreaterThan(ohlcs.get(5).body)

            && ohlcs.get(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1))
            && ohlcs.get(2).isVolumeLessThan(emaVol.get(2))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(2).low
            || this.takeProfit < changes
    }
}

export class StrategyA45Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA45,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA50 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, cci20, emaVol, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotHammer(1)
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isGreaterThan(emaVol)
            && volume(1).isGreaterThanIndex(2)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)

            && cci20(0).isLessThan(100)

            && tenkanSen(1).isLessThan(kijunSen)
    }
}

export class StrategyA50Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA50,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA51 extends LowRiskStrategyNew {
    _takeProfit = 3.0;
    _stopLoss = -15;

    buy({ohlcs, close, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanMA()
            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            && close(1).isLessThan(ohlcs(4).max)
            && close(1).isLessThan(ohlcs(5).max)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)

            && dmi14(1).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI()
            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyA51Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA51,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA52 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, atr14, emaVol, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(2)/3)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isShadowsLessThan(0.5)

            && volume(1).isGreaterThan(volume.get(2) * 2)
            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)

            && dmi14(1).isPDIBelowMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA52Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA52,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA53 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, close, low, volume, atr14, dmi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThan(volume.get(2) * 1.5)
            && volume(1).isGreaterThan(emaVol.get(1))

            && close(1).isLessThan(ohlcs(4).max)
            && close(1).isLessThan(ohlcs(5).max)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)
            && low(2).isLessThanIndex(7)

            && dmi14(1).isPDIBelowMDI(3)
            && dmi14(2).isPDIBelowMDI(3)
            && dmi14(3).isPDIBelowMDI(3)
            && dmi14(4).isPDIBelowMDI(3)
            && dmi14(5).isPDIBelowMDI(3)
            && dmi14(6).isPDIBelowMDI(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA53Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA53,
            timeIntervals: ['8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA54 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, atr14, emaVol, rsi14, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/3)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isShadowsLessThan(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(volume.get(2) * 2)
            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)

            && (rsi14(1).isLessThan(40) || dmi14(1).isPDIBelowMDI())
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA54Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA54,
            timeIntervals: ['8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA55 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, close, low, volume, atr14, dmi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()

            && volume(1).isGreaterThan(volume.get(2) * 1.5)
            && volume(1).isGreaterThan(emaVol)
            && volume(1).isGreaterThanIndex(3)

            && close(1).isLessThan(ohlcs(4).max)
            && close(1).isLessThan(ohlcs(5).max)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)
            && low(2).isLessThanIndex(6)
            && low(2).isLessThanIndex(7)

            && dmi14(1).isPDIBelowMDI(3)
            && dmi14(2).isPDIBelowMDI(3)
            && dmi14(3).isPDIBelowMDI(3)
            && dmi14(4).isPDIBelowMDI(3)
            && dmi14(5).isPDIBelowMDI(3)
            && dmi14(6).isPDIBelowMDI(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA55Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA55,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA56 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, atr14, emaVol, rsi14, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)
            && ohlcs(1).isBodyGreaterThan(atr14.get(2)/3)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isShadowsLessThan(2)

            && volume(1).isGreaterThan(volume.get(2) * 2)
            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)

            && (rsi14(1).isLessThan(40) || dmi14(1).isPDIBelowMDI())
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA56Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA56,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA57 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, atr14, dmi14, emaVol, rsi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/3)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isShadowsLessThan(0.5)
            && ohlcs(1).isShadowsLessThan(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(volume.get(2) * 2)
            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)

            && (rsi14(1).isLessThan(40) || dmi14(1).isPDIBelowMDI())
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA57Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA57,
            timeIntervals: ['4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyA58 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, close, low, volume, atr14, emaVol, rsi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/2)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThan(volume.get(2) * 1.5)
            && volume(1).isGreaterThan(emaVol.get(1))

            && close(1).isLessThan(ohlcs(4).max)
            && close(1).isLessThan(ohlcs(5).max)

            && low(1).isLessThanIndex(2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)
            && low(2).isLessThanIndex(5)

            && rsi14(1).isLessThan(40)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA58Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA58,
            timeIntervals: ['4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";
import {IndicatorsData} from "../../models/data";

class StrategyA59 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, low, high, atr14, emaVol, rsi14}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const d1 = indicatorsData.d1;

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isCloseAbove(high.get(2))
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isShadowsLessThan(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)

            && rsi14(1).isLessThan(50)

            && d1.dmi14(1).isPDIBelowMDI(3)
            && d1.dmi14(2).isPDIBelowMDI(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA59Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA59,
            timeIntervals: ['12h', '8h', '6h', '4h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";
import {IndicatorsData} from "../../models/data";

class StrategyA60 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, volume, low, high, atr14, emaVol, dmi14, kc2}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const d1 = indicatorsData.d1;

        return ohlcs(0).isFirstTrade

            /* -------------< Bullish Engulfing >------------- */
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isCloseAbove(high.get(2))
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isShadowsLessThan(1)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && low(1).isLessThanIndex(2)
            && low(1).isLessThanIndex(3)

            && kc2.MID(1).isGreaterThan(high.get(1) + atr14.get(1)/10)

            && d1.dmi14(1).isPDIBelowMDI(3)
            && d1.dmi14(2).isPDIBelowMDI(3)
            && d1.dmi14(3).isPDIBelowMDI(3)
            && d1.dmi14(4).isPDIBelowMDI(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyA60Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA60,
            timeIntervals: ['12h', '8h', '6h', '4h', '2h', '1h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA61 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, high, low, volume, atr14, kc, dmi14, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 20)

            /* ----------< Bullish Engulfing >----------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2) / 2)
            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1))
            && ohlcs(1).isBodyGreaterThan(ohlcs.get(2).body)

            /* -------------< Confirmation >------------- */
            && high(3).isLessThan(kc.MID)

            && dmi14.ADX(1).isGreaterThan(25)

            && volume(1).isGreaterThan(emaVol)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(2).low)
            || this.takeProfit < changes
    }
}

export class StrategyA61Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA61,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA70 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, high, volume, atr14, dmi14, emaVol, tenkanSen, kijunSen, kc2}: AllIndicators): boolean {

        const min = Math.min(low.get(2), low.get(1));

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(min, 15)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3) / 2)

            && ohlcs(2).isBodyLessThan(atr14.get(2) / 4)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 2)
            && ohlcs(1).isNotReverseHammer(0.5)

            /* -------------< Confirmation >------------- */
            && low(2).isLessThan(kc2.LOWER)
            && low(3).isLessThanIndex(5)

            && high(3).isLessThan(kijunSen)

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)
            && volume(1).isGreaterThan(emaVol)

            && dmi14.MDI(1).isGreaterThan(25)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {
        const min = Math.min(buyInterval.ohlcs.get(2).low, buyInterval.ohlcs.get(1).low);

        return close(1).isLessThan(min)
            || this.takeProfit < changes
    }
}

export class StrategyA70Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA70,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyA71 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, high, volume, atr14, dmi14, emaVol, tenkanSen, kijunSen}: AllIndicators): boolean {

        const min = Math.min(low.get(2), low.get(1));

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(min, 15)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3) / 2)

            && ohlcs(2).isBodyLessThan(atr14.get(2) / 3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 2)
            && ohlcs(1).isNotReverseHammer(0.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()

            && low(3).isLessThanIndex(5)

            && high(3).isLessThan(kijunSen)

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)
            && volume(1).isGreaterThan(emaVol)

            && dmi14.MDI(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {
        const min = Math.min(buyInterval.ohlcs.get(2).low, buyInterval.ohlcs.get(1).low);

        return close(1).isLessThan(min)
            || this.takeProfit < changes
    }
}

export class StrategyA71Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA71,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA72 extends LowRiskStrategyNew {
    _takeProfit = 3.0;
    _stopLoss = -15;

    buy({ohlcs, low, atr14, dmi14, volume, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3))

            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)
            && ohlcs(2).isReverseHammer(1)
            && ohlcs(2).isHammer(1)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1))

            /* -------------< Confirmation >------------- */
            && volume(2).isGreaterThan(emaVol.get(2) * 2)

            && dmi14.PDI(1).isLessThan(20)
            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
    }
}

export class StrategyA72Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA72,
            timeIntervals: ['4h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA73 extends LowRiskStrategyNew {
    _takeProfit = 3.0;
    _stopLoss = -15;

    buy({ohlcs, open, close, low, high, atr14, dmi14, volume, emaVol, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/2)

            && ohlcs(2).isHammer(1)
            && ohlcs(2).isReverseHammer(1)
            && ohlcs(2).isBodyLessThan(atr14.get(2)/4)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(5).isBearish()
            && ohlcs(1).isNotHammer(1)

            && open(3).isLessThan(kijunSen)

            && low(2).isLessThanIndex(3)

            && volume(2).isGreaterThan(emaVol.get(2) * 2)
    }
}

export class StrategyA73Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA73,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA74 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/2)

            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)

            && low(3).isLessThanIndex(4)
            && low(3).isLessThanIndex(5)

            && dmi14.PDI(1).isLessThan(20)
            && dmi14.MDI(1).isGreaterThan(25)
    }
}

export class StrategyA74Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA74,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyA80 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, atr14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isNotReverseHammer(1)
            && ohlcs(2).isBodyLessThan(atr14.get(2)/2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2))

            /* -------------< Confirmation >------------- */
            && ohlcs(5).isBearish()
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/3)

            && low(2).isLessThanIndex(3)
            && low(2).isLessThanIndex(4)


            && cci20(1).isLessThan(-100)
            && cci20(2).isLessThan(-100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyA80Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA80,
            timeIntervals: ['4h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA81 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, kijunSen, tenkanSen, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<    Hammer    >------------- */
            && ohlcs(1).isHammer(2)
            && ohlcs(1).isNotReverseHammer(1)

            /* -------------< Confirmation >------------- */
            && low(1).isLessThanIndex(2)
            && low(1).isLessThanIndex(3)

            && volume(1).isGreaterThanMA(2)

            && tenkanSen(1).isLessThan(kijunSen)

            && momentum(1).isBullish()
    }
}

export class StrategyA81Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA81,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA82 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, high, low, volume, kijunSen, tenkanSen, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isNotReverseHammer(1)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)
            && close(1).isGreaterThan(ohlcs(2).max)

            && high(2).isLessThan(kijunSen)

            && volume(2).isGreaterThanMA(2)

            && tenkanSen(2).isLessThan(kijunSen)

            && momentum(2).isBullish()
    }
}

export class StrategyA82Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA82,
            timeIntervals: ['6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA83 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, high, low, volume, kijunSen, tenkanSen, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* -------------<    Hammer    >------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isNotReverseHammer(1)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)
            && close(1).isGreaterThan(ohlcs(2).max)

            && high(2).isLessThan(kijunSen)

            && volume(2).isGreaterThanMA(2)

            && tenkanSen(2).isLessThan(kijunSen)

            && momentum(2).isBullish()
    }
}

export class StrategyA83Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA83,
            timeIntervals: ['8h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA84 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, low, high, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(5).isBearish()
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()
            && ohlcs(3).isNotVolatilityHigh(atr14.get(3) * 3)

            && ohlcs(1).isNotReverseHammer(2)
            && close(1).isGreaterThan(high.get(2))

            && low(2).isLessThanIndex(3)

            && volume(2).isGreaterThanMA(2)
            && volume(1).isGreaterThanMA()

            && dmi14(1).isPDIBelowMDI()
    }
}

export class StrategyA84Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA84,
            timeIntervals: ['4h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA85 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, low, high, volume, atr14, dmi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotReverseHammer(1)
            && close(1).isGreaterThan(high.get(2))

            && low(2).isLessThanIndex(3)

            && volume(2).isGreaterThanMA(2)
            && volume(1).isGreaterThanMA()

            && dmi14.ADX(1).isGreaterThan(25)

            && momentum.value(1).isLessThan(1)
    }
}

export class StrategyA85Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA85,
            timeIntervals: ['8h', '6h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA86 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, low, high, volume, atr14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(5).isBearish()
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()

            && ohlcs(1).isNotReverseHammer(2)
            && close(1).isGreaterThan(high.get(2))
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && low(2).isLessThanIndex(3)

            && volume(2).isGreaterThanMA(2)
            && volume(1).isGreaterThanMA()

            && momentum(2).isBullish()
    }
}

export class StrategyA86Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA86,
            timeIntervals: ['4h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA87 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, low, high, volume, atr14, momentum, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotReverseHammer(1)
            && close(1).isGreaterThan(high.get(2))

            && low(2).isLessThanIndex(3)

            && volume(2).isGreaterThanMA(2)

            && momentum(2).isBullish()

            && dmi14.ADX(1).isGreaterThan(20)
    }
}

export class StrategyA87Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA87,
            timeIntervals: ['12h', '8h', '6h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA88 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, low, high, volume, atr14, stoch14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)
            && ohlcs(2).isLowerShadowGreaterThan(atr14.get(2)/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotReverseHammer(1)
            && close(1).isGreaterThan(high.get(2))

            && low(2).isLessThanIndex(3)

            && volume(2).isGreaterThanMA(2)

            && stoch14.D(2).isBullish()
            && stoch14.K(2).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyA88Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA88,
            timeIntervals: ['8h', '6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyA89 extends LowRiskStrategyNew {
    _takeProfit = 3.0;
    _stopLoss = -15;
    _stopLossCandleIndex = 2;

    buy({ohlcs, close, high, low, momentum, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(2), 10)

            /* ----------------< Hammer >---------------- */
            && ohlcs(2).isHammer(3)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && close(1).isGreaterThan(high.get(2))

            && low(2).isLessThanIndex(3)

            && momentum.value(1).isLessThan(0.8)
    }
}

export class StrategyA89Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyA89,
            timeIntervals: ['12h', '8h', '6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyB00 extends Strategy {
    takeProfit = 4.5;

    buy({ohlcs, close, low, tenkanSen, kijunSen, stoch14, ema20, ema50, senkouSpanMax}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< Stoch Crossover >----------- */
            && stoch14.K(1).isCrossover(20)

            /* -------------< Confirmation >------------- */
            && close(1).isGreaterThan(senkouSpanMax)

            && low(1).isGreaterThan(ema20)

            && tenkanSen(1).isGreaterThan(kijunSen)

            && ema20(1).isGreaterThan(ema50)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyB00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyB00,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyB01 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, close, low, tenkanSen, kijunSen, stoch14, ema20, ema50, senkouSpanMax}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< Stoch Crossover >----------- */
            && stoch14.K(1).isCrossover(20)

            /* -------------< Confirmation >------------- */
            && close(1).isGreaterThan(senkouSpanMax)

            && low(1).isGreaterThan(ema20)

            && tenkanSen(1).isGreaterThan(kijunSen)

            && ema20(1).isGreaterThan(ema50)

            && stoch14.D(2).isLessThan(20)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyB01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyB01,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {IndicatorsData} from '../../models/data';

class StrategyG00 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, close, low, ema50, sma75, dmi14, atr14, cci20, cci5}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /*--------------< EMA above SMA >-------------*/
            && ema50(1).isGreaterThan(sma75)
            && ema50.get(1) - sma75.get(1) > ema50.get(2) - sma75.get(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isNotShootingStar(3)

            && close(1).isLessThan(sma75.get(1) + atr14.get(1) * 3)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()

            && cci20(1).isLessThan(250)

            && cci5(1).isBullish()
            && cci5(1).isLessThan(150)
            && cci5(1).isGreaterThanIndex(3)

            && h1.dmi14.PDI(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyG00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyG00,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {IndicatorsData} from '../../models/data';

class StrategyG01 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, ema50, sma75, dmi14, atr14, cci20, cci3, macd12}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /*--------------< EMA above SMA >-------------*/
            && sma75.get(1) < ema50.get(1) - atr14.get(1)/5
            && ema50.get(1) - sma75.get(1) > ema50.get(2) - sma75.get(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(2).isBullish()

            && low(2).isGreaterThan(ema50)

            && cci20.get(1) < 100

            && cci3(1).isBullish()

            && macd12(1).isPositive()

            && dmi14.PDI(1).isGreaterThanIndex(5)

            && h1.dmi14(1).isPDIAboveMDI()
            && h1.dmi14.PDI(1).isBullish()
            && h1.dmi14.PDI(2).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyG01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyG01,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyH00 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, atr14, dmi14, obv}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /* -----------< OBV Crossover MA >----------- */
            && obv(1).isCrossover(obv.MA)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(2)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isGreaterThan(25)
            && dmi14.PDI(3).isGreaterThan(25)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyH00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyH00,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyH01 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, atr14, dmi14, obv}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /* -----------< OBV Crossover MA >----------- */
            && obv(2).isCrossover(obv.MA)
            && obv(1).isGreaterThan(obv.MA)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(0.5)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isGreaterThan(25)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyH01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyH01,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyM01 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, tenkanSen, kijunSen, atr14, kc2, cci5, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----------< TenkanSen Bullish >---------- */
            && tenkanSen(3).isGreaterThan(kijunSen.get(3) + atr14.get(1) / 40)
            && tenkanSen(2).isGreaterThan(kijunSen.get(2) + atr14.get(1) / 40)
            && tenkanSen(1).isGreaterThan(kijunSen.get(1) + atr14.get(1) / 40)
            && tenkanSen(0).isGreaterThan(kijunSen.get(0) + atr14.get(1) / 40)

            && tenkanSen(0).isBullish()
            && tenkanSen(1).isBullish()

            && kijunSen(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 3)

            && tenkanSen(1).isLessThan(ohlcs(1).min)
            && kijunSen(1).isGreaterThan(ohlcs(1).max - atr14.get(1) * 2)

            && cci5(1).isBullish()
            && cci20(1).isGreaterThanIndex(3)
            && cci20(1).isGreaterThanIndex(5)

            && high(1).isLessThan(kc2.UPPER)
    }
}

export class StrategyM01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM01,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyM02 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, open, low, close, kijunSen, atr14, cci5, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< KijunSen Crossover >---------- */
            && kijunSen(1).isGreaterThan(ohlcs(26).max)
            && kijunSen(2).isLessThan(close.get(27))
            && kijunSen(3).isLessThan(close.get(28))
            && kijunSen(4).isLessThan(close.get(29))
            && kijunSen(5).isLessThan(close.get(30))
            && kijunSen(6).isLessThan(close.get(31))

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(2)

            && open(1).isGreaterThan(kijunSen)
            && open(0).isLessThan(kijunSen.get(1) + atr14.get(1) * 2)

            && cci5(1).isBullish()
            && cci5(1).isLessThan(150)
            && cci5(1).isGreaterThanIndex(3)

            && kc2.UPPER(1).isGreaterThan(high)
    }
}

export class StrategyM02Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM02,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyM10 extends Strategy {
    takeProfit = 5.5;

    buy({ohlcs, high, low, dmi14, stoch14, ema20, ema50, senkouSpanMax, senkouSpanMin}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< OHLC Breakup Cloud >---------- */
            && ohlcs(1).isCrossover(senkouSpanMax.get(1))

            && ema20(1).isCrossover(ema50)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)

            && high(2).isLessThan(senkouSpanMax)

            && ema20(3).isLessThan(ema50)
            && ema20(4).isLessThan(ema50)
            && ema20(5).isLessThan(ema50)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM10Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM10,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyM11 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, open, close, volume, dmi14, tenkanSen, kijunSen, atr14, kc2, cci5, senkouSpanMax, senkouSpanMin}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< OHLC Breakup Cloud >---------- */
            && senkouSpanMax(1).isGreaterThan(open)
            && senkouSpanMax(1).isLessThan(close.get(1) + atr14.get(1)/5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(2)

            && volume(1).isLessThan(volume.get(2) * 2)

            && senkouSpanMax(1).isGreaterThan(senkouSpanMin.get(1) + atr14.get(1)/2)
            && senkouSpanMax(2).isGreaterThan(ohlcs(2).max)

            && dmi14.ADX(1).isBullish()
            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(1).isGreaterThanIndex(3)
            && dmi14(2).isPDIAboveMDI(3)
            && dmi14(3).isPDIAboveMDI(3)

            && tenkanSen(1).isLessThan(open)
            && tenkanSen(1).isGreaterThan(kijunSen)

            && cci5(1).isBullish()
            && cci5(2).isBullish()
            && cci5(2).isLessThan(100)
            && cci5(3).isLessThan(100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM11Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM11,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyM12 extends Strategy {
    takeProfit = 5.5;

    buy({ohlcs, open, high, close, low, dmi14, tenkanSen, kijunSen, atr14, kc2, cci5, senkouSpanMax, senkouSpanMin}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< OHLC Breakup Cloud >---------- */
            && ohlcs(1).isCrossover(senkouSpanMax.get(1))

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)
            && open(1).isGreaterThan(tenkanSen)
            && high(1).isLessThan(kc2.UPPER)

            && senkouSpanMax(2).isGreaterThan(ohlcs(2).max)
            && senkouSpanMax(3).isGreaterThan(ohlcs(3).max)
            && senkouSpanMax(4).isGreaterThan(ohlcs(4).max)
            && senkouSpanMax(5).isGreaterThan(ohlcs(5).max)

            && dmi14.PDI(1).isBullish()

            && tenkanSen(1).isBullish()
            && tenkanSen(0).isGreaterThan(kijunSen)
            && tenkanSen(1).isGreaterThan(kijunSen)
            && tenkanSen(2).isGreaterThan(kijunSen)

            && cci5(1).isBullish()
            && cci5(3).isLessThan(100)
            && cci5.get(1) - cci5.get(2) < 200
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM12Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM12,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM20 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, open, close, volume, emaVol, cci5, dmi14, tenkanSen}: AllIndicators): boolean {
        return 1
            && ohlcs(0).isFirstTrade

            /* ---------< ChikouSpan Crossover >--------- */
            && open(1).isLessThan(ohlcs(27).min)
            && open(1).isLessThan(ohlcs(26).min)
            && close(1).isGreaterThan(ohlcs(26).max)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)
            && close(1).isGreaterThan(tenkanSen)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && dmi14(1).isPDIAboveMDI()
            && dmi14.ADX(1).isBullish()
            && dmi14.ADX(2).isBullish()

            && cci5(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM20Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM20,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM21 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, open, close, volume, emaVol, cci5, tenkanSen}: AllIndicators): boolean {
        return 1
            && ohlcs(0).isFirstTrade

            /* ---------< ChikouSpan Crossover >--------- */
            && open(1).isLessThan(ohlcs(27).min)
            && open(1).isLessThan(ohlcs(26).min)
            && close(1).isGreaterThan(ohlcs(26).max)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)

            && close(1).isGreaterThan(tenkanSen)
            && close(1).isGreaterThan(ohlcs(25).max)
            && close(1).isGreaterThan(ohlcs(24).max)
            && close(1).isGreaterThan(ohlcs(23).max)
            && close(7).isLessThan(ohlcs(32).min)
            && close(8).isLessThan(ohlcs(33).min)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && cci5(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM21Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM21,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyM22 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, open, close, volume, emaVol, tenkanSen, kijunSen, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------< ChikouSpan Crossover >--------- */
            && open(1).isLessThan(ohlcs(27).min)
            && open(1).isLessThan(ohlcs(26).min)
            && close(1).isGreaterThan(ohlcs(26).max)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)
            && close(1).isGreaterThan(ohlcs(25).max)
            && close(1).isGreaterThan(ohlcs(24).max)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && tenkanSen(1).isLessThan(close)
            && tenkanSen(1).isGreaterThan(kijunSen)

            && stoch14.D(1).isBullish()
            && stoch14.K(1).isBullish()
            && stoch14.K(1).isLessThan(80)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM22Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM22,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM30 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, close, volume, tenkanSen, kijunSen, cci5, dmi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isCrossover(kijunSen)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(0.5)
            && close(1).isGreaterThan(tenkanSen)

            && volume(1).isLessThan(volume.get(2) * 2)
            && volume(1).isLessThan(emaVol.get(1) * 2)

            && cci5(1).isBullish()
            && cci5(1).isGreaterThanIndex(3)

            && dmi14.ADX(1).isBullish()
            && dmi14.PDI(1).isBullish()
            && dmi14(1).isPDIAboveMDI()
            && dmi14(2).isPDIAboveMDI()
            && dmi14(3).isPDIAboveMDI()
            && dmi14(4).isPDIAboveMDI()
            && dmi14(5).isPDIAboveMDI()

            && tenkanSen(3).isLessThan(kijunSen)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyM30Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM30,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM31 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, close, high, volume, tenkanSen, kijunSen, cci5, macd12, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isCrossover(kijunSen)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && cci5(1).isBullish()
            && cci5(1).isLessThan(100)
            && cci5(1).isGreaterThanIndex(3)

            && tenkanSen(0).isGreaterThan(kijunSen)
            && tenkanSen(3).isLessThan(kijunSen)
            && tenkanSen(4).isLessThan(kijunSen)

            && close(1).isGreaterThan(high.get(26))
            && close(1).isGreaterThan(high.get(25))
            && close(1).isGreaterThan(high.get(24))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyM31Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM31,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyM32 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, close,low, dmi14,tenkanSen, kijunSen, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isCrossover(kijunSen)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(1)

            && dmi14.ADX(1).isGreaterThan(25)
            && dmi14.PDI(1).isGreaterThan(25)

            && cci20(1).isLessThan(150)

            && tenkanSen(1).isLessThan(close)
            && tenkanSen(2).isLessThan(kijunSen)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyM32Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM32,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyM33 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, close, low, tenkanSen, kijunSen, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isCrossover(kijunSen)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)
            && close(1).isGreaterThan(tenkanSen)

            && tenkanSen(3).isLessThan(kijunSen)

            && stoch14.K(1).isCrossover(20)
    }
}

export class StrategyM33Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM33,
            timeIntervals: ['12h', '8h', '6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM40 extends Strategy {
    takeProfit = 4.5;

    buy({ohlcs, close, volume, tenkanSen, kijunSen, emaVol, dmi14, cci20, cci5, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ----------< TenkanSen Bullish >----------- */
            && tenkanSen(1).isBullish()
            && tenkanSen(2).isBullish()
            && tenkanSen(3).isBullish()

            && kijunSen(1).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(1)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()

            && tenkanSen(1).isGreaterThan(kijunSen)

            && cci20(1).isLessThan(200)

            && cci5(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {tenkanSen, kijunSen}: AllIndicators): boolean {

        return tenkanSen(1).isLessThan(kijunSen)
            || changes > this.takeProfit
    }
}

export class StrategyM40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM40,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM41 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, volume, tenkanSen, kijunSen, emaVol, macd12, dmi14, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isBullish()
            && tenkanSen(2).isBullish()
            && tenkanSen(3).isBullish()

            && kijunSen(1).isBullish()
            && kijunSen(2).isBullish()
            && kijunSen(3).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isNotHangingMan(2)

            && volume(1).isLessThan(emaVol)

            && tenkanSen(1).isGreaterThan(kijunSen)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()

            && macd12(1).isBullish()
            && macd12(2).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {tenkanSen, kijunSen}: AllIndicators): boolean {

        return tenkanSen(1).isLessThan(kijunSen)
            || changes > this.takeProfit
    }
}

export class StrategyM41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM41,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM42 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, tenkanSen, kijunSen, emaVol, macd12, dmi14, cci5}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isBullish()
            && tenkanSen(2).isBullish()
            && tenkanSen(3).isBullish()

            && kijunSen(1).isBullish()
            && kijunSen(2).isBullish()
            && kijunSen(3).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(0.75)
            && ohlcs(1).isNotHangingMan(2)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && tenkanSen(1).isGreaterThan(kijunSen)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()
            && dmi14.MDI(1).isGreaterThan(12)

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci5(1).isBullish()
            && cci5(1).isGreaterThanIndex(3)
            && cci5(1).isGreaterThanIndex(4)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {tenkanSen, kijunSen}: AllIndicators): boolean {

        return tenkanSen(1).isLessThan(kijunSen)
            || changes > this.takeProfit
    }
}

export class StrategyM42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM42,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyM43 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, tenkanSen, kijunSen, emaVol, macd12, dmi14, cci5}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -----< TenkanSen Crossover KijunSen >----- */
            && tenkanSen(1).isBullish()
            && tenkanSen(2).isBullish()
            && tenkanSen(3).isBullish()

            && kijunSen(1).isBullish()
            && kijunSen(2).isBullish()
            && kijunSen(3).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(1).isNotHangingMan(2)

            && volume(1).isLessThan(emaVol)

            && tenkanSen(1).isGreaterThan(kijunSen)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()

            && macd12(1).isBullish()
            && macd12(2).isBullish()

            && cci5(1).isBullish()
            && cci5(1).isGreaterThanIndex(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {tenkanSen, kijunSen}: AllIndicators): boolean {

        return tenkanSen(1).isLessThan(kijunSen)
            || changes > this.takeProfit
    }
}

export class StrategyM43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyM43,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyP00 extends LowRiskAtrRatioStrategy {
    _takeProfit = 2.5;
    _stopLoss = -15;
    _atrRatio = 1;

    buy({ohlcs, low, volume, rsi14, atr14, momentum, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< RSI Crossover >------------- */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/4)

            && volume(1).isGreaterThanMA(1.5)

            && rsi14(2).isLessThan(30)
            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)

            && momentum(1).isBullish()
    }
}

export class StrategyP00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP00,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP20 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, rsi14, atr14, macd12}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/10)

            && macd12(0).isPositive()

            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close, atr14}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low - atr14.get(1)/5)
            || changes > this.takeProfit
    }
}

export class StrategyP20Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP20,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP21 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, high, rsi14, atr14, macd12, kc, cci5}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)

            && macd12(0).isPositive()

            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)

            && high(1).isLessThan(kc.MID)

            && cci5(1).isLessThan(130)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close, atr14}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low - atr14.get(1)/5)
            || changes > this.takeProfit
    }
}

export class StrategyP21Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP21,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyP22 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, rsi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && momentum(1).isGreaterThan(0)
    }
}

export class StrategyP22Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP22,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyP23 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, rsi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isGreaterThanMA(1.5)

            && momentum(1).isBullish()
            && momentum(2).isBullish()
    }
}

export class StrategyP23Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP23,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyP24 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, atr14, rsi14, macd12, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && rsi14(1).isCrossover(rsi14.MA)
            && rsi14(3).isLessThan(30)

            && macd12(0).isPositive()
            && macd12(1).isPositive()

            && volume(1).isGreaterThan(emaVol)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP24Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP24,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyP25 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, volume, atr14, rsi14, macd12, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && rsi14(1).isCrossover(rsi14.MA)
            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)

            && macd12(0).isPositive()
            && macd12(1).isPositive()

            && volume(1).isGreaterThan(emaVol)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP25Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP25,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP26 extends Strategy {
    takeProfit = 2.0;

    buy({ohlcs, volume, rsi14, macd12, atr14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(emaVol)

            && rsi14(1).isCrossover(rsi14.MA)
            && rsi14(2).isLessThan(rsi14.MA)
            && rsi14(3).isLessThan(rsi14.MA)
            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)
            && rsi14(6).isLessThan(30)
            && rsi14(7).isLessThan(30)
            && rsi14(8).isLessThan(30)
            && rsi14(9).isLessThan(30)

            && macd12(0).isPositive()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP26Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP26,
            timeIntervals: ['4h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyP27 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -10;

    buy({ohlcs, low, volume, rsi14, atr14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isBullish()

            && rsi14(1).isCrossover(rsi14.MA)

            && momentum(1).isBullish()
            && momentum.value(1).isLessThan(0.9)
    }
}

export class StrategyP27Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP27,
            timeIntervals: ['2h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyP28 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, rsi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isGreaterThanMA()

            && momentum(1).isGreaterThan(0)
    }
}

export class StrategyP28Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP28,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyP29 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -10;

    buy({ohlcs, low, volume, rsi14, atr14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThanMA()

            && rsi14(1).isCrossover(rsi14.MA)

            && momentum.value(1).isLessThan(0.9)
    }
}

export class StrategyP29Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP29,
            timeIntervals: ['2h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyP30 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, rsi14, cci5}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(31)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)

            && cci5(1).isLessThan(-10)
            && cci5(2).isLessThan(-100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP30Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP30,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyP31 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, rsi14, cci5, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(31)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && volume(1).isGreaterThan(emaVol)

            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)

            && cci5(1).isLessThan(-10)
            && cci5(2).isLessThan(-100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP31Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP31,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyP32 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, rsi14, cci5}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(31)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && volume(1).isGreaterThanIndex(2)

            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)

            && cci5(1).isLessThan(-10)
            && cci5(2).isLessThan(-100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP32Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP32,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {BuyInterval, calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from "../../_indicators/all-indicators";

class StrategyP33 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, rsi14, cci5, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(33)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && rsi14(3).isLessThan(30)
            && rsi14(4).isLessThan(30)
            && rsi14(5).isLessThan(30)

            && cci5(1).isLessThan(-10)
            && cci5(2).isLessThan(-100)

            && dmi14.MDI(1).isGreaterThan(40)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP33Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP33,
            timeIntervals: ['4h', '2h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyP34 extends LowRiskAtrRatioStrategy {
    _takeProfit = 2.5;
    _stopLoss = -15;
    _atrRatio = 1;

    buy({ohlcs, low, rsi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && momentum(1).isBullish()
            && momentum(2).isBullish()
            && momentum.value(1).isLessThan(0.7)
    }
}

export class StrategyP34Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP34,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyP35 extends LowRiskAtrRatioStrategy {
    _takeProfit = 2.5;
    _stopLoss = -15;
    _atrRatio = 0.5;

    buy({ohlcs, low, volume, rsi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< RSI Crossover >------------ */
            && rsi14(1).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA()

            && momentum(1).isBullish()
            && momentum.value(1).isLessThan(0.7)

            && rsi14(3).isLessThan(30)
    }
}

export class StrategyP35Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP35,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP40 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, rsi14, atr14, macd12}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* -------------< RSI Crossover >------------ */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 5)
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isNotHammer(2)

            && volume(1).isGreaterThanIndex(2)

            && rsi14(2).isLessThan(30)

            && macd12(0).isPositive()
            && macd12(0).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP40,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP41 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, rsi14, atr14, cci5}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* -------------< RSI Crossover >------------ */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)

            && rsi14(1).isGreaterThan(rsi14.MA)
            && rsi14(2).isLessThan(30)

            && cci5(1).isBullish()
            && cci5(2).isBullish()
            && cci5(1).isLessThan(100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP41,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP42 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, rsi14, atr14, emaVol, cci5}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* -------------< RSI Crossover >------------ */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isNotHammer(1)

            && volume(1).isGreaterThan(emaVol)

            && rsi14(2).isLessThan(30)
            && rsi14(3).isLessThan(30)

            && cci5(1).isBullish()
            && cci5(2).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP42,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP43 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, rsi14, atr14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* -------------< RSI Crossover >------------ */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1))

            && volume(1).isGreaterThan(volume.get(2) * 2)

            && rsi14(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP43,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP44 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, rsi14, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* -------------< RSI Crossover >------------ */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isShadowsLessThan(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1))
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 5)

            && volume(1).isGreaterThanIndex(2)

            && rsi14(1).isBullish()
            && rsi14(2).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP44Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP44,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP45 extends Strategy {
    takeProfit = 3.0;

    buy({ohlcs, low, volume, atr14, rsi14, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* ------------< RSI Crossover >------------- */
            && rsi14(0).isCrossover(30)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(ohlcs(2).body)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 5)

            && volume(2).isGreaterThan(emaVol.get(2) * 2)
            && volume(1).isLessThanIndex(2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP45Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP45,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyP46 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, atr14, rsi14}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 20)

            /* ------------< RSI Crossover >------------- */
            && rsi14(0).isCrossover(30)

            /* ----------< Inverse Down Thrust >--------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1) / 3)

            && volume(1).isGreaterThan(volume.get(2) * 2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyP46Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyP46,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ00 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, atr14, dmi14, cci20, cci5}: AllIndicators): boolean {

        return ohlcs(0).isCloseEqualHigh
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< DMI Reverse >-------------- */
            && dmi14(0).isPDIBullish(2)
            && dmi14(0).isMDIBearish(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(0).isBodyLessThan(atr14.get(0)/2)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2.5)
            && ohlcs(2).isNotVolatilityHigh(atr14.get(2) * 2.5)
            && ohlcs(3).isNotVolatilityHigh(atr14.get(3) * 2.5)

            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()

            && cci20(0).isBullish()

            && cci5(1).isBullish()
    }
}

export class StrategyQ00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ00,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ01 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -15;

    buy({ohlcs, open, low, volume, dmi14, atr14, cci3, kc2, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< DMI Reverse >-------------- */
            && dmi14.MDI(1).isBearish()
            && dmi14.MDI(2).isBullish()

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isShadowsLessThan(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)

            && dmi14.MDI(2).isGreaterThan(35)

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThan(emaVol)

            && kc2.LOWER(1).isGreaterThan(open)
    }
}

export class StrategyQ01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ01,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ03 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, dmi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && cci20(1).isLessThan(-100)

            && dmi14.MDI(3).isBullish()
            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyQ03Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ03,
            timeIntervals: ['6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ04 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, dmi14, cci20, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(20)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && cci20(2).isLessThan(-250)

            && momentum(1).isBullish()
    }
}

export class StrategyQ04Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ04,
            timeIntervals: ['6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ05 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, dmi14, atr14, cci20, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)

            && cci20(1).isBullish()
            && cci20(1).isLessThan(-100)

            && momentum.value(1).isLessThan(0.7)
    }
}

export class StrategyQ05Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ05,
            timeIntervals: ['6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ06 extends LowRiskStrategyNew {
    _takeProfit = 2.0;
    _stopLoss = -15;

    buy({ohlcs, close, high, low, volume, dmi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && close(1).isGreaterThan(high.get(2))

            && volume(1).isGreaterThanMA(2)

            && cci20(1).isLessThan(-100)

            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyQ06Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ06,
            timeIntervals: ['8h', '6h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ07 extends LowRiskStrategyNew {
    _takeProfit = 2.0;
    _stopLoss = -15;

    buy({ohlcs, low, volume, dmi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && cci20(1).isLessThan(-100)

            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyQ07Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ07,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ08 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, dmi14, cci20, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(20)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && cci20(2).isLessThan(-200)

            && momentum(1).isBullish()
    }
}

export class StrategyQ08Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ08,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ09 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, dmi14, atr14, cci20, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/10)

            && cci20(1).isBullish()
            && cci20(1).isLessThan(-100)

            && momentum.value(1).isLessThan(0.65)
    }
}

export class StrategyQ09Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ09,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ10 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -15;

    buy({ohlcs, close, high, low, volume, dmi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && close(1).isGreaterThan(high.get(2))

            && volume(1).isGreaterThanMA(1.5)

            && cci20(1).isLessThan(-100)
    }
}

export class StrategyQ10Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ10,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ11 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -10;

    buy({ohlcs, low, volume, dmi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 7)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(15)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && cci20(1).isLessThan(-100)

            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyQ11Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ11,
            timeIntervals: ['8h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ12 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -10;

    buy({ohlcs, low, volume, dmi14, cci20, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 7)

            /* -------------< MDI Reverse >-------------- */
            && dmi14.PDI(1).isLessThan(20)
            && dmi14.MDI(2).isGreaterThan(35)
            && dmi14.MDI(2).isGreaterThanIndex(1)
            && dmi14.MDI(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && cci20(2).isLessThan(-200)

            && momentum(1).isBullish()
    }
}

export class StrategyQ12Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ12,
            timeIntervals: ['8h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ13 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, dmi14, atr14, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< PDI Crossover MDI >----------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)

            && dmi14.ADX(1).isBullish()
            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyQ13Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ13,
            timeIntervals: ['1d', '12h', '8h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ14 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, dmi14, macd12, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< PDI Crossover MDI >----------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isNotShootingStar(1)

            && macd12.MACD(1).isCrossover(0)

            && stoch14.K(1).isCrossover(20)
    }
}

export class StrategyQ14Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ14,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ15 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, dmi14, macd12, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< PDI Crossover MDI >----------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && macd12.MACD(1).isCrossover(0)
    }
}

export class StrategyQ15Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ15,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ16 extends LowRiskStrategyNew {
    _takeProfit = 3.0;
    _stopLoss = -15;

    buy({ohlcs, low, dmi14, macd12, atr14, emaVol, volume}: AllIndicators): boolean {

        return ohlcs(0).isCloseEqualHigh
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ----------< PDI Crossover MDI >----------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(1)

            && dmi14.PDI(2).isBullish()
            && dmi14.PDI(1).isGreaterThan(25)
            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyQ16Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ16,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ40 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, cci20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----------< PDI Crossover MDI >---------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)

            && cci20(1).isCrossover(150)
            && cci20(3).isLessThan(100)
            && cci20(4).isLessThan(100)

            && dmi14.ADX(1).isBullish()
            && dmi14(3).isPDIBelowMDI(1)
    }
}

export class StrategyQ40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ40,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ41 extends LowRiskStrategyNew {
    _takeProfit = 1.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, cci20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----------< PDI Crossover MDI >---------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)

            && cci20(1).isCrossover(100)
            && cci20(3).isLessThan(100)
            && cci20(4).isLessThan(100)

            && dmi14.ADX(1).isBullish()
            && dmi14(3).isPDIBelowMDI(1)
    }
}

export class StrategyQ41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ41,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ42 extends LowRiskStrategyNew {
    _takeProfit = 1.5;
    _stopLoss = -15;

    buy({ohlcs, low, atr14, volume, cci20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----------< PDI Crossover MDI >---------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)

            && cci20(1).isCrossover(50)
            && cci20(3).isLessThan(50)
            && cci20(4).isLessThan(50)

            && dmi14.ADX(1).isBullish()
            && dmi14(3).isPDIBelowMDI(1)
    }
}

export class StrategyQ42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ42,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyQ43 extends LowRiskStrategyNew {
    _takeProfit = 1.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, cci20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -----------< PDI Crossover MDI >---------- */
            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(0.5)

            && cci20(1).isCrossover(0)
            && cci20(3).isLessThan(0)
            && cci20(4).isLessThan(0)

            && dmi14.ADX(1).isBullish()
    }
}

export class StrategyQ43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyQ43,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW01 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* ------------< Selling Climax >------------ */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)
            && ohlcs(1).isNotHammer(0.5)

            && volume(1).isGreaterThan(volume.get(2) * 2)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThan(emaVol)

            && cci20(2).isLessThan(-150)
    }
}

export class StrategyW01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW01,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW02 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, cci20, emaVol, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* ----< Bearish Effort < Bearish Result >--- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            && volume(1).isLessThanIndex(2)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThan(emaVol)

            // && kc2.MID(1).isGreaterThan(high)
    }
}

export class StrategyW02Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW02,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW03 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, emaVol, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* ----< Bearish Effort > Bearish Result >--- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(ohlcs(2).body)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isShadowsLessThan(0.5)

            && volume(1).isGreaterThan(emaVol)

            && cci20(2).isLessThan(-150)

            && tenkanSen(1).isLessThan(kijunSen)
    }
}

export class StrategyW03Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW03,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW04 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2, cci5}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* ----------< Pseudo Down Thrust >---------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1)/3)

            && volume(1).isLessThanIndex(2)
            && volume(1).isLessThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBearish()

            && kc2.LOWER(1).isGreaterThan(low)

            && cci5(1).isBullish()
    }
}

export class StrategyW04Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW04,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW05 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* ----------< Inverse Down Thrust >--------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1)/3)

            && volume(1).isGreaterThan(volume.get(2) * 2)

            /* -------------< Confirmation >------------- */
            && tenkanSen(3).isLessThan(kijunSen)

            && kc2.LOWER(1).isGreaterThan(low)
    }
}

export class StrategyW05Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW05,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW06 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* -----< Failed Effort Selling Climax >----- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)
            && ohlcs(1).isLowerShadowLessThan(atr14.get(1))
            && ohlcs(1).isNotHammer(2)

            && volume(1).isGreaterThanIndex(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && kc2.LOWER(1).isGreaterThan(low)

            && cci20(3).isLessThan(-150)
    }
}

export class StrategyW06Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW06,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW07 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isCloseEqualHigh
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanMA(1.5)

            && cci20(1).isGreaterThanIndex(4)
            && cci20(1).isGreaterThanIndex(5)
            && cci20(1).isGreaterThanIndex(6)
    }
}

export class StrategyW07Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW07,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW08 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, cci5}: AllIndicators): boolean {

        return ohlcs(0).isCloseEqualHigh
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanMA(1.5)

            && cci20(1).isGreaterThanIndex(4)
            && cci20(1).isGreaterThanIndex(5)

            && cci5(0).isBullish()
            && cci5(1).isLessThan(-100)
    }
}

export class StrategyW08Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW08,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW13 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, cci20, atr14, emaVol, kc2, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* ----< Bearish Effort > Bearish Result >--- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyLessThan(ohlcs(3).body)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/7)
            && volume(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && volume(1).isGreaterThan(emaVol)

            && kc2.MID(3).isGreaterThan(high)

            && tenkanSen(2).isLessThan(kijunSen)
            && tenkanSen(4).isLessThan(kijunSen)
    }
}

export class StrategyW13Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW13,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW16 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, emaVol, atr14}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-150)

            /* -----< Failed Effort Selling Climax >----- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(3).body)
            && ohlcs(2).isLowerShadowLessThan(atr14.get(2))
            && ohlcs(2).isNotHammer(2)

            && volume(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1))

            && volume(1).isGreaterThan(emaVol)

            && cci20(3).isLessThan(-150)
    }
}

export class StrategyW16Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW16,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW20 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* -------------< Down Thrust >-------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(2).isHammer(1)
            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)

            && volume(2).isGreaterThan(volume.get(3) * 2)

            /* -------------< Confirmation >------------- */
            && kc2.LOWER(2).isGreaterThan(low)
    }
}

export class StrategyW20Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW20,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW21 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* ------------< Selling Climax >------------ */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))
            && ohlcs(2).isNotHammer(0.5)
            && volume(2).isGreaterThan(volume.get(3) * 2)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(2)
    }
}

export class StrategyW21Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW21,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW22 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* ----< Bearish Effort < Bearish Result >--- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/5)
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(3).body)

            && volume(2).isLessThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)

            && tenkanSen(1).isLessThan(kijunSen)
    }
}

export class StrategyW22Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW22,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW23 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* ----< Bearish Effort > Bearish Result >--- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyLessThan(ohlcs(3).body)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2) / 5)

            && volume(2).isGreaterThanIndex(3)

            /* -------------< Confirmation >------------- */
            && kc2.LOWER(2).isGreaterThan(low)

            && tenkanSen(1).isLessThan(kijunSen)
    }
}

export class StrategyW23Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW23,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW24 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* ----------< Pseudo Down Thrust >---------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)

            && volume(2).isLessThanIndex(3)
            && volume(2).isLessThanIndex(4)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && kc2.LOWER(2).isGreaterThan(low)
    }
}

export class StrategyW24Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW24,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW25 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* ----------< Inverse Down Thrust >--------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)

            && volume(2).isGreaterThan(volume.get(3) * 2)

            /* -------------< Confirmation >------------- */
            && kc2.MID(1).isGreaterThan(high)
            && kc2.LOWER(2).isGreaterThan(low)
    }
}

export class StrategyW25Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW25,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW27 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, atr14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1)/5)

            && cci20(2).isGreaterThanIndex(5)
            && cci20(2).isGreaterThanIndex(6)
            && cci20(2).isGreaterThanIndex(7)
    }
}

export class StrategyW27Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW27,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW30 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, cci20, atr14, emaVol, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* -------------< Down Thrust >-------------- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isHammer(1)
            && ohlcs(1).isBodyLessThan(atr14.get(1)/3)

            && volume(1).isGreaterThan(volume.get(2) * 2)

            /* -------------< Confirmation >------------- */
            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyW30Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW30,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW31 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, cci20, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* ------------< Selling Climax >------------ */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)
            && ohlcs(1).isNotHammer(0.5)

            && volume(1).isGreaterThan(volume.get(2) * 2)

            /* -------------< Confirmation >------------- */
            && cci20(2).isLessThan(-210)
    }
}

export class StrategyW31Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW31,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW32 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* ----< Bearish Effort < Bearish Result >--- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/5)
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            && volume(1).isLessThanIndex(2)

            /* -------------< Confirmation >------------- */
            && tenkanSen(3).isLessThan(kijunSen)

            && cci20(2).isLessThan(-200)
    }
}

export class StrategyW32Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW32,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW33 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, cci20, emaVol, atr14}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* ----< Bearish Effort > Bearish Result >--- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(ohlcs(2).body)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && volume(1).isGreaterThanIndex(2)

            /* -------------< Confirmation >------------- */
            && volume(2).isGreaterThan(emaVol)

            && cci20(2).isLessThan(-200)
    }
}

export class StrategyW33Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW33,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW35 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* ----------< Inverse Down Thrust >--------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1)/3)

            && volume(1).isGreaterThan(volume.get(2) * 2)

            /* -------------< Confirmation >------------- */
            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyW35Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW35,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW37 extends LowRiskStrategyNew {
    _takeProfit = 1.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, cci20, emaVol, kc2}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotHammer(2)

            && volume(1).isGreaterThan(emaVol)

            && cci20(1).isGreaterThanIndex(4)

            && kc2.MID(2).isGreaterThan(high)
    }
}

export class StrategyW37Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW37,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW38 extends LowRiskStrategyNew {
    _takeProfit = 1.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanIndex(2)

            && cci20(1).isGreaterThanIndex(3)
            && cci20(1).isGreaterThanIndex(4)
    }
}

export class StrategyW38Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW38,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW42 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, high, volume, emaVol, cci20, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(-200)

            /* ----< Bearish Effort < Bearish Result >--- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/5)
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(3).body)

            && volume(2).isLessThanIndex(3)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(2)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/4)

            && volume(1).isGreaterThan(emaVol)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyW42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW42,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW54 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, kc2}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* ----------< Pseudo Down Thrust >---------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)

            && volume(2).isLessThanIndex(3)
            && volume(2).isLessThanIndex(4)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && kc2.LOWER(2).isGreaterThan(low)
    }
}

export class StrategyW54Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW54,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyW55 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14, emaVol, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* ----------< Inverse Down Thrust >--------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyLessThan(atr14.get(2)/3)

            && volume(2).isGreaterThan(emaVol.get(2) * 2)

            /* -------------< Confirmation >------------- */
            && tenkanSen(3).isGreaterThan(kijunSen)
    }
}

export class StrategyW55Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyW55,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX00 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, low, volume, dmi14, cci20, cci5, cci3, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* -------------<      CCI     >------------- */
            && cci20(0).isCrossover(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(3)

            && volume(1).isLessThan(emaVol.get(1) * 1.5)
            // && volume(1).isLessThanIndex(2)
            // && volume(0).isLessThanIndex(2)

            && cci20(3).isGreaterThan(-100)
            && cci20(1).isGreaterThanIndex(5)
            && cci20(1).isGreaterThanIndex(6)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()

            && cci5(1).isGreaterThanIndex(3)
            && cci5(1).isGreaterThanIndex(4)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyX00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX00,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX01 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, cci20, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(0).isNotShootingStar(1)

            && tenkanSen(1).isCrossover(kijunSen)

            && stoch14.K(1).isCrossover(20)
            && stoch14.K(1).isCrossover(stoch14.D)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX01,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {IndicatorsData} from '../../models/data';
import {is_volatility_high} from '../conditions/is_volatility_high';

class StrategyX02 extends Strategy {
    takeProfit = 1.5;
    stopLoss = -15;

    buy({close, low, ohlcs, atr14, cci20, dmi14, emaVol}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<      CCI     >------------- */
            && cci20.get(0) > 100
            && cci20.get(1) > 100
            && cci20.get(2) < 100

            && h1.cci20.get(0) > -100
            && h1.cci20.get(1) < -100

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1)) // new
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isNotShootingStar(1)
            && ohlcs.get(2).isNotShootingStar(2)
            && !is_volatility_high(close, atr14, 1, 5)

            && cci20.get(3) < 100

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()
            && dmi14.get(1).isPDIAboveMDI(2)
            && dmi14.get(2).isPDIAboveMDI(2)

            && h1.cci20.get(2) < -100
            && h1.cci20.get(3) < -100
            && h1.cci20.get(4) < -100
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(0).low
            || changes > this.takeProfit
            || changes < this.stopLoss
    }
}

export class StrategyX02Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX02,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {IndicatorsData} from '../../models/data';

class StrategyX03 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, low, atr14, cci20, dmi14, tenkanSen}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h2 = indicatorsData.h2;

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /* -------------<      CCI     >------------- */
            && cci20(1).isCrossover(100)

            && h2.cci20(0).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(2).isNotShootingStar(2)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 4)

            && dmi14.PDI(1).isBullish()

            && tenkanSen(1).isBullish()

            && cci20(0).isGreaterThan(100)
            && cci20(3).isLessThan(200)

            && h2.cci20(2).isLessThan(-100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(0).low)
            || changes > this.takeProfit
    }
}

export class StrategyX03Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX03,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX04 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, cci5, cci3, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(3)

            && volume(0).isLessThanIndex(2)
            && volume(1).isLessThanIndex(2)

            && cci20(3).isGreaterThan(-100)
            && cci20(1).isGreaterThanIndex(5)

            && cci5(1).isGreaterThanIndex(3)
            && cci5(1).isGreaterThanIndex(4)

            && cci3(1).isBullish()

            && tenkanSen(1).isGreaterThan(kijunSen)
    }
}

export class StrategyX04Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX04,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX05 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, close, low, volume, cci20, emaVol, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(0).isNotShootingStar(1)

            && close(1).isGreaterThan(tenkanSen)

            && volume(1).isLessThan(emaVol)

            && tenkanSen(1).isCrossover(kijunSen)

            && stoch14.K(1).isLessThan(80)
            && stoch14.K(1).isCrossover(stoch14.D)

            && cci20(3).isLessThan(100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX05Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX05,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX06 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, dmi14, cci20, cci5, cci3}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<      CCI     >------------- */
            && cci20(0).isCrossover(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(3)

            && volume(1).isLessThanIndex(2)
            && volume(0).isLessThanIndex(2)

            && cci20(3).isGreaterThan(-100)
            && cci20(1).isGreaterThanIndex(5)
            && cci20(1).isGreaterThanIndex(6)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()

            && cci5(1).isGreaterThanIndex(3)
            && cci5(1).isGreaterThanIndex(4)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyX06Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX06,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX07 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, close, high, low, volume, cci20, emaVol, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isCloseEqualHigh
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------ */
            && cci20(0).isCrossover(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(0).isNotShootingStar(1)

            && close(1).isGreaterThan(tenkanSen)

            && high(0).isGreaterThanIndex(3)

            && volume(1).isLessThan(emaVol)

            && tenkanSen(1).isCrossover(kijunSen)

            && stoch14.K(1).isLessThan(80)
            && stoch14.K(1).isCrossover(stoch14.D)

            && cci20(3).isLessThan(100)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX07Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX07,
            timeIntervals: ['12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX08 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, cci20, emaVol, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(100)
            && cci20(3).isGreaterThan(0)
            && cci20(5).isGreaterThan(0)
            && cci20(6).isGreaterThan(0)
            && cci20(9).isGreaterThan(0)

            && cci20(3).isLessThan(100)
            && cci20(4).isLessThan(100)
            && cci20(5).isLessThan(100)
            && cci20(7).isLessThan(100)
            && cci20(8).isLessThan(100)
            && cci20(9).isLessThan(100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(.5)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && dmi14(2).isPDIAboveMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyX08Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX08,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX10 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, cci20, dmi14, kc2}: AllIndicators): boolean {

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > 150
            && cci20.get(1) < 150

            /* -------------< Confirmation >------------- */
            && ohlcs.get(0).isBodyLessThan(atr14.getLast())
            && ohlcs.get(0).isHighBelow(kc2.UPPER.get(0) - atr14.getLast() / 5)
            && ohlcs.get(1).isBullish()
            && ohlcs.get(1).isHighBelow(kc2.UPPER.get(1))
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isNotShootingStar(1.5)
            && ohlcs.get(1).isVolumeLessThan(ohlcs.get(2).volume) // new

            && cci20.get(3) > -80
            && cci20.get(1) > cci20.get(5)
            && cci20.get(1) > cci20.get(6)
            && cci20.get(1) > cci20.get(7)
            && cci20.get(1) > cci20.get(8)

            && cci20.get(7) < 100
            && cci20.get(8) < 100

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()

            && dmi14.get(1).isPDIAboveMDI()
            && dmi14.get(2).isPDIAboveMDI()
            && dmi14.get(3).isPDIAboveMDI()
            && dmi14.get(4).isPDIAboveMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX10Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX10,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";
import {IndicatorsData} from "../../models/data";

class StrategyX11 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, cci20, dmi14, emaVol}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > 150
            && cci20.get(1) < 150

            /* -------------< Confirmation >------------- */
            && ohlcs.get(0).isBodyLessThan(atr14.getLast()/2)
            && ohlcs.get(1).isBullish()
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isNotShootingStar(2)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1)) // new

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()
            && dmi14.get(1).isPDIAboveMDI()
            && dmi14.get(2).isPDIAboveMDI()
            && dmi14.get(3).isPDIAboveMDI()

            // --- Short term indicators
            && h1.cci20.get(1) < 100
            && h1.cci20.get(2) < 100
            && h1.cci20.get(2) > h1.cci20.get(3)
            && h1.cci20.get(3) < h1.cci20.get(1)
            && h1.cci20.get(4) < h1.cci20.get(1)
            && h1.cci20.get(5) < h1.cci20.get(1)
            && h1.cci20.get(6) < h1.cci20.get(1)
            && h1.cci20.get(7) < h1.cci20.get(1)

            && h1.ohlcs.get(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || changes > this.takeProfit
    }
}

export class StrategyX11Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX11,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX20 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, high, low, volume, atr14, cci20, dmi14, kc2, emaVol}: AllIndicators): boolean {

        return 1
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /* -------------<      CCI     >------------- */
            && cci20(0).isCrossover(200)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotHangingMan(2)
            && ohlcs(1).isNotShootingStar(1)
            && ohlcs(2).isNotShootingStar(2)

            && volume(1).isLessThan(emaVol.get(1) * 2)

            && high(0).isLessThan(kc2.UPPER)
            && high(1).isLessThan(kc2.UPPER)

            && dmi14.PDI(1).isBullish()
            && dmi14.PDI(2).isBullish()
            && dmi14(1).isPDIAboveMDI()
            && dmi14(2).isPDIAboveMDI()
            && dmi14(3).isPDIAboveMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX20Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX20,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";
import {IndicatorsData} from "../../models/data";

class StrategyX21 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, cci20, dmi14, kc2, emaVol}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > 200
            && cci20.get(1) < 200

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBullish()
            && ohlcs.get(1).isHighBelow(kc2.UPPER.get(1))
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isNotShootingStar(0.5)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1)) // new
            && ohlcs.get(0).isBodyLessThan(atr14.getLast())
            && ohlcs.get(0).isHighBelow(kc2.UPPER.get(0))


            && cci20.get(1) > 100
            && cci20.get(6) < 100
            && cci20.get(7) < 100
            && cci20.get(8) < 100
            && cci20.get(9) < 100
            && cci20.get(10) < 100
            && cci20.get(11) < 100
            && cci20.get(3) > -80
            && cci20.get(1) > cci20.get(5)
            && cci20.get(1) > cci20.get(6)
            && cci20.get(1) > cci20.get(7)
            && cci20.get(1) > cci20.get(8)

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()

            && dmi14.get(1).isPDIAboveMDI()
            && dmi14.get(2).isPDIAboveMDI()
            && dmi14.get(3).isPDIAboveMDI()
            && dmi14.get(4).isPDIAboveMDI()
            && dmi14.get(5).isPDIAboveMDI()
            && dmi14.get(6).isPDIAboveMDI()
            && dmi14.get(7).isPDIAboveMDI()
            && dmi14.get(8).isPDIAboveMDI()
            && dmi14.get(9).isPDIAboveMDI()

            // --- Short term indicators
            && h1.ohlcs.get(0).isHighBelow(h1.kc2.UPPER.get(0))
            && h1.ohlcs.get(1).isHighBelow(h1.kc2.UPPER.get(1))
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX21Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX21,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX30 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, cci20, dmi14, kc2, emaVol}: AllIndicators): boolean {

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > 250
            && cci20.get(1) < 250

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBullish()

            && ohlcs.get(0).isBodyLessThan(atr14.getLast()/1.5)
            && ohlcs.get(0).isHighBelow(kc2.UPPER.get(0))
            && ohlcs.get(1).isNotHangingMan(2)
            && ohlcs.get(1).isNotShootingStar(0.5)
            && ohlcs.get(1).isVolumeLessThan(emaVol.get(1)) // new

            && cci20.get(3) > -80
            && cci20.get(1) > cci20.get(5)
            && cci20.get(1) > cci20.get(6)
            && cci20.get(1) > cci20.get(7)
            && cci20.get(1) > cci20.get(8)

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()

            && dmi14.get(1).isPDIAboveMDI()
            && dmi14.get(2).isPDIAboveMDI()
            && dmi14.get(3).isPDIAboveMDI()
            && dmi14.get(4).isPDIAboveMDI()
            && dmi14.get(5).isPDIAboveMDI()
            && dmi14.get(6).isPDIAboveMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX30Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX30,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX31 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, emaVol, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-50)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && high(1).isLessThan(kijunSen)
            && high(4).isLessThan(kijunSen)

            && volume(1).isGreaterThan(emaVol.get(1) * 1.5)

            && stoch14.K(1).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyX31Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX31,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX40 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, cci20, dmi14, macd12}: AllIndicators): boolean {

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > -100
            && cci20.get(1) < -100

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1)/5)

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()

            && macd12.get(1).isPositive()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || changes > this.takeProfit
    }
}

export class StrategyX40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX40,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX41 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, atr14, cci20, dmi14, macd12}: AllIndicators): boolean {

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > -100
            && cci20.get(1) < -100

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1) / 5)

            && dmi14.get(1).isPDIBullish()
            && dmi14.get(2).isPDIBullish()

            && macd12.get(1).isPositive()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || changes > this.takeProfit
    }
}

export class StrategyX41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX41,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";
import {IndicatorsData} from "../../models/data";

class StrategyX42 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, cci20, dmi14, emaVol}: AllIndicators, indicatorsData: IndicatorsData): boolean {
        const h1 = indicatorsData.h1;

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > -100
            && cci20.get(1) < -100

            /* -------------< Confirmation >------------- */
            && ohlcs.get(0).isBullish()
            && ohlcs.get(1).isBullish()
            && ohlcs.get(1).isVolumeGreaterThan(ohlcs.get(2).volume)
            && ohlcs.get(1).isVolumeGreaterThan(ohlcs.get(3).volume)
            && ohlcs.get(1).isVolumeGreaterThan(emaVol.get(1))

            && dmi14.get(1).isPDIBullish()

            && h1.cci20.get(0) > -100
            && h1.cci20.get(1) < -100
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close.get(1) < buyInterval.ohlcs.get(1).low
            || changes > this.takeProfit
    }
}

export class StrategyX42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX42,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX43 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, volume, low, cci20, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs(1).isStopLossLessThan(low.get(1), 15)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && volume(1).isGreaterThanIndex(2)

            && cci20(1).isBullish()
            && cci20(2).isBullish()
            && cci20(3).isBullish()
            && cci20(4).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX43,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX44 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, high, volume, cci20, kc, cci5, cci3, atr14, emaVol}: AllIndicators): boolean {

        const min = Math.min(low.get(1), low.get(2));

        return 1
            && ohlcs(1).isStopLossLessThan(min, 15)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            // && ohlcs(1).isBullish()
            // && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            // && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && volume(1).isGreaterThan(emaVol)

            && cci20(1).isBullish()
            && cci20(2).isBullish()
            && cci20(3).isBullish()

            && cci5(1).isBullish()
            && cci5(1).isGreaterThan(cci5.MA)

            && cci3(1).isBullish()
            && cci3(1).isLessThan(95)

            && high(1).isLessThan(kc.LOWER)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.ohlcs.get(2).low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyX44Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX44,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX45 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, close, low, volume, emaVol, cci20, cci5, atr14, macd12, tenkanSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 7)

            /* ------------< CCI Crossover >------------- */
            && cci20(1).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)
            && volume(1).isGreaterThan(emaVol)

            && cci20(2).isBullish()
            && cci5(1).isLessThan(120)

            && macd12.MACD(1).isCrossover(0)
            && macd12(3).isNegative()
            && macd12(4).isNegative()

            && close(1).isGreaterThan(tenkanSen)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX45Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX45,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX46 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, high, close, cci20, ema20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(1).isCrossover(-100)

            && ohlcs(1).isCrossover(ema20.get(1))

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(0.5)

            && close(1).isGreaterThan(high.get(3))

            && dmi14.PDI(1).isCrossover(dmi14.MDI)

            && cci20(1).isLessThan(0)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX46Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX46,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX47 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, high, close, cci20, ema20, ema50, dmi14, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(1).isCrossover(-100)

            && ohlcs(1).isCrossover(ema20.get(1))

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotShootingStar(0.5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && close(1).isGreaterThan(high.get(3))

            && dmi14.PDI(1).isCrossover(dmi14.MDI)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI()
            && dmi14(6).isPDIBelowMDI()

            && cci20(1).isLessThan(0)

            && ema20(1).isGreaterThan(ema50)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX47Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX47,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX48 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, cci20, atr14, dmi14, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && stoch14.K(3).isLessThan(stoch14.D)

            && cci20(2).isLessThan(-100)
            && cci20(3).isLessThan(-100)
            && cci20(4).isLessThan(-100)
            && cci20(5).isLessThan(-100)
            && cci20(6).isLessThan(-100)

            && dmi14.ADX(1).isGreaterThan(25)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX48Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX48,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';

class StrategyX49 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, cci20, macd12}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && macd12.MACD(1).isCrossover(0)
            && macd12.MACD(3).isLessThan(0)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX49Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX49,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX50 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, atr14}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/2)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/3)

            && volume(1).isGreaterThanMA(3)

            && cci20(1).isBullish()
    }
}

export class StrategyX50Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX50,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX51 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, emaVol, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && high(1).isLessThan(kijunSen)
            && high(4).isLessThan(kijunSen)

            && volume(1).isGreaterThan(emaVol)

            && stoch14.K(1).isCrossover(20)
            && stoch14.K(3).isLessThan(20)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyX51Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX51,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX52 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, cci3, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-100)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && volume(1).isBullish()
            && volume(1).isGreaterThanMA(2)

            && stoch14.K(1).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)

            && cci3(3).isLessThan(90)
            && cci20(3).isLessThan(-100)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyX52Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX52,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX53 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -20;

    buy({ohlcs, low, volume, atr14, cci20, dmi14, emaVol, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* ------------< CCI Crossover >------------- */
            && cci20(0).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/4)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/4)

            && volume(1).isGreaterThan(emaVol)

            && cci20(1).isGreaterThanIndex(4)
            && cci20(1).isGreaterThanIndex(5)
            && cci20(1).isGreaterThanIndex(6)

            && dmi14(1).isMDIBearish()
            && dmi14(6).isPDIBelowMDI(3)
            && dmi14(7).isPDIBelowMDI(3)
            && dmi14(8).isPDIBelowMDI(3)
    }
}

export class StrategyX53Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX53,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX56 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, volume, emaVol, atr14, cci20, dmi14, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ------------< CCI Crossover >------------- */
            && cci20(1).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/4)
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/4)

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && stoch14.K(1).isCrossover(20)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX56Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX56,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX57 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, cci20, dmi14, stoch14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && volume(1).isGreaterThanMA(1.5)

            && stoch14.K(1).isCrossover(20)
            && stoch14.K(1).isCrossover(stoch14.D)

            && dmi14.ADX(1).isGreaterThan(25)

            && momentum.value(1).isLessThan(0.9)
    }
}

export class StrategyX57Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX57,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX58 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, emaVol, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && high(1).isLessThan(kijunSen)
            && high(4).isLessThan(kijunSen)

            && volume(1).isGreaterThan(emaVol.get(1) * 1.5)

            && stoch14.K(1).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
            && tenkanSen(5).isLessThan(kijunSen)
    }
}

export class StrategyX58Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX58,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX59 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-150)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && high(1).isLessThan(kijunSen)
            && high(4).isLessThan(kijunSen)

            && volume(1).isGreaterThanMA(1.5)

            && stoch14.K(1).isCrossover(20)
            && stoch14.K(1).isCrossover(stoch14.D)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyX59Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX59,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX60 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, emaVol, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && high(1).isLessThan(kijunSen)
            && high(4).isLessThan(kijunSen)

            && volume(1).isGreaterThan(emaVol.get(1) * 1.5)

            && stoch14.K(1).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyX60Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX60,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX61 extends Strategy {
    takeProfit = 3.5;

    buy({ohlcs, low, cci20, stoch14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(.5)

            && cci20(3).isLessThan(0)
            && cci20(4).isLessThan(0)
            && cci20(5).isLessThan(0)
            && cci20(6).isLessThan(0)
            && cci20(7).isLessThan(0)
            && cci20(8).isLessThan(0)

            && stoch14.K(1).isCrossover(20)
            && stoch14.K(1).isCrossover(stoch14.D)

            && dmi14.ADX(1).isGreaterThan(25)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX61Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX61,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX62 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, cci20, emaVol, dmi14, stoch14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)
            && ohlcs(2).isNotReverseHammer(2)

            && high(1).isLessThan(kijunSen)
            && high(4).isLessThan(kijunSen)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && stoch14.K(1).isCrossover(20)
            && stoch14.K(1).isCrossover(stoch14.D)

            && dmi14.ADX(1).isGreaterThan(25)

            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyX62Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX62,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {Strategy} from '../../models/strategy';
import {calcChangesInfo, StrategyRunner} from '../strategy-runner';

class StrategyX65 extends Strategy {
    takeProfit = 2.2;
    stopLoss = -15;

    buy({ohlcs, low, cci20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && cci20(1).isGreaterThanIndex(3)
            && cci20(3).isLessThan(-100)
            && cci20(3).isBullish()
            && cci20(4).isBullish()

            && dmi14.MDI(1).isGreaterThan(30)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
            || changes < this.stopLoss;
    }
}

export class StrategyX65Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX65,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX66 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, cci20, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-200)

            /* -------------< Confirmation >------------- */
            && cci20(3).isLessThan(-100)
            && cci20(3).isBullish()
            && cci20(4).isBullish()

            && dmi14.MDI(1).isGreaterThan(30)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyX66Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX66,
            timeIntervals: ['8h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX70 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, cci20, atr14, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1)/5)

            && cci20.get(0) > -250
            && cci20.get(1) < -250
            && cci20.get(3) < -100
            && cci20.get(4) < -100
            && cci20.get(5) < -100

            && dmi14.get(1).isPDIBelowMDI()
            && dmi14.get(2).isPDIBelowMDI()
            && dmi14.get(3).isPDIBelowMDI()
            && dmi14.get(4).isPDIBelowMDI(5)
            && dmi14.get(5).isPDIBelowMDI(5)
            && dmi14.get(6).isPDIBelowMDI(5)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX70Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX70,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX71 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, cci20, atr14, dmi14}: AllIndicators): boolean {

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > -250
            && cci20.get(1) < -250

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isVolumeGreaterThan(ohlcs.get(2).volume * 1.5)
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1) / 5)
            && ohlcs.get(2).isBodyLessThan(atr14.get(2))

            && cci20.get(3) < -100
            && cci20.get(4) < -100
            && cci20.get(5) < -100

            && dmi14.get(1).isPDIBelowMDI()
            && dmi14.get(2).isPDIBelowMDI()
            && dmi14.get(3).isPDIBelowMDI(2)
            && dmi14.get(4).isPDIBelowMDI(5)
            && dmi14.get(5).isPDIBelowMDI(5)
            && dmi14.get(6).isPDIBelowMDI(5)

            && dmi14.get(2).isMDIBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX71Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX71,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyX76 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 1;

    buy({ohlcs, low, volume, cci20, momentum, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-250)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isBullish()

            && momentum(1).isBullish()
            && momentum(2).isBullish()

            && cci20(4).isLessThan(-250)
    }
}

export class StrategyX76Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX76,
            timeIntervals: ['4h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyX78 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 1;

    buy({ohlcs, low, volume, cci20, momentum, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-250)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            && momentum(1).isBullish()
            && momentum(2).isBullish()

            && tenkanSen(1).isLessThan(kijunSen)
    }
}

export class StrategyX78Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX78,
            timeIntervals: ['12h', '8h', '6h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX81 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, cci20, dmi14}: AllIndicators): boolean {

        return 1
            /* -------------<      CCI     >------------- */
            && cci20.get(0) > -300
            && cci20.get(1) < -300

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isVolumeGreaterThan(ohlcs.get(2).volume * 2)

            && cci20.get(3) < -100

            && dmi14.get(1).isPDIBelowMDI()
            && dmi14.get(2).isPDIBelowMDI()
            && dmi14.get(3).isPDIBelowMDI(2)
            && dmi14.get(4).isPDIBelowMDI(2)
            && dmi14.get(5).isPDIBelowMDI(5)
            && dmi14.get(6).isPDIBelowMDI(5)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX81Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX81,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyX82 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -10;

    buy({ohlcs, low, volume, cci20, emaVol, dmi14, stoch14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-300)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && stoch14.K(1).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyX82Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX82,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}


import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX85 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, cci20, dmi14, macd12}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-300)

            /* -------------< Confirmation >------------- */
            && cci20(4).isLessThan(-100)

            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyX85Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX85,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX86 extends Strategy {
    takeProfit = 1.2;

    buy({ohlcs, volume, cci20}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-300)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanIndex(2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        const min = Math.min(buyInterval.ohlcs.get(1).low, buyInterval.tradeOhlc.low);

        return close(1).isLessThan(min)
            || changes > this.takeProfit
    }
}

export class StrategyX86Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX86,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX87 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, volume, atr14, cci20, dmi14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------< CCI Crossover >------------ */
            && cci20(1).isCrossover(-300)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/1.5)
            && volume(1).isGreaterThanIndex(2)

            && cci20(3).isLessThan(-100)
            && cci20(4).isLessThan(-100)

            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI(3)
            && dmi14(6).isPDIBelowMDI(3)
            && dmi14(7).isPDIBelowMDI(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX87Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX87,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from "../../_indicators/all-indicators";
import {Strategy} from "../../models/strategy";
import {BuyInterval, calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyX88 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, cci20, dmi14, atr14}: AllIndicators): boolean {

        return 1
            && ohlcs.getLast().isFirstTrade

            /* -------------<      CCI     >------------- */
            && cci20.get(1) > -300
            && cci20.get(2) < -300

            /* -------------< Confirmation >------------- */
            && ohlcs.get(1).isVolumeGreaterThan(ohlcs.get(2).volume)
            && ohlcs.get(1).isBodyGreaterThan(atr14.get(1)/5)

            && cci20.get(3) < -100
            && cci20.get(4) < -100

            && dmi14.get(1).isPDIBelowMDI()
            && dmi14.get(2).isPDIBelowMDI()
            && dmi14.get(3).isPDIBelowMDI()
            && dmi14.get(4).isPDIBelowMDI()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return (close.get(1) < buyInterval.ohlcs.get(1).low)
            || changes > this.takeProfit
    }
}

export class StrategyX88Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyX88,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY00 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -15;

    buy({ohlcs, open, low, volume, atr14, stoch14, ema50, ema20, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------------< Pullback >--------------- */
            && ema20(1).isGreaterThan(ema50)
            && ema20(5).isGreaterThan(ema50)
            && ema20(9).isGreaterThan(ema50)

            && low(1).isLessThan(ema20)
            && open(1).isGreaterThan(ema50)

            && stoch14.K(2).isLessThan(20)
            && stoch14.K(1).isCrossover(stoch14.D)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && volume(1).isGreaterThanMA()

            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyY00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY00,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY01 extends LowRiskStrategyNew {
    _takeProfit = 3.0;
    _stopLoss = -15;

    buy({ohlcs, open, low, volume, stoch14, ema50, ema20, dmi14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------------< Pullback >--------------- */
            && ema20(1).isGreaterThan(ema50)
            && ema20(5).isGreaterThan(ema50)
            && ema20(9).isGreaterThan(ema50)

            && low(1).isLessThan(ema20)
            && open(1).isGreaterThan(ema50)

            && stoch14.K(2).isLessThan(20)
            && stoch14.K(1).isCrossover(stoch14.D)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(2).isBearish()
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(1)

            && dmi14.ADX(1).isGreaterThan(25)

            && volume(1).isGreaterThanMA()

            && tenkanSen(1).isGreaterThan(kijunSen)
            && tenkanSen(0).isGreaterThan(kijunSen)
    }
}

export class StrategyY01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY01,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY10 extends LowRiskStrategyNew {
    _takeProfit = 5.5;
    _stopLoss = -20;

    buy({ohlcs, low, high, volume, emaVol, atr14, kc, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /* ----------------< Hammer >---------------- */
            && ohlcs(1).isHammer(3)
            && ohlcs(1).isBodyLessThan(ohlcs(2).body)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            /* -------------< Confirmation >------------- */
            && high(3).isLessThan(kc.MID)
            && high(2).isLessThan(kc.MID)

            && dmi14.PDI(1).isLessThan(20)
    }
}

export class StrategyY10Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY10,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyY40 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 0.5;

    buy({ohlcs, close, high, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body/4)
            && low(2).isLessThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body/3)

            /* -------------< Confirmation >------------- */
            && close(1).isGreaterThan(high.get(2))

            && volume(2).isBullish()

            && dmi14(1).isPDIBelowMDI()
            && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyY40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY40,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyY41 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 0.5;

    buy({ohlcs, low, atr14, dmi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body/5) // 4 >> 5
            && low(2).isLessThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body/3)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish() // new

            && dmi14(1).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI() // new
            && dmi14.ADX(1).isGreaterThan(25)

            && momentum(1).isBullish()
    }
}

export class StrategyY41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY41,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyY42 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 0.5;

    buy({ohlcs, low, volume, atr14, rsi14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body/5)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body/2)

            /* -------------< Confirmation >------------- */
            && volume(2).isBullish()

            && rsi14(1).isLessThan(40)

            // && dmi14.ADX(1).isGreaterThan(25)
    }
}

export class StrategyY42Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY42,
            timeIntervals: ['1d']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY43 extends LowRiskStrategyNew {
    _takeProfit = 4.5;
    _stopLoss = -10;

    buy({ohlcs, low, volume, emaVol, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3) / 2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body / 4)
            && low(2).isLessThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body / 3)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()

            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)

            && low(3).isLessThanIndex(4)
            && low(3).isLessThanIndex(5)
            && low(3).isLessThanIndex(6)

            && dmi14.get(1).isPDIBelowMDI()
    }
}

export class StrategyY43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY43,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY44 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, emaVol, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3) / 2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body / 4)
            && low(2).isLessThanIndex(3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body / 3)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)

            && low(3).isLessThanIndex(4)
            && low(3).isLessThanIndex(5)
            && low(3).isLessThanIndex(6)

            && dmi14.get(1).isPDIBelowMDI()
    }
}

export class StrategyY44Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY44,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY45 extends LowRiskStrategyNew {
    _takeProfit = 1.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3) / 2)

            && ohlcs(2).isBodyLessThan(atr14.get(2) / 3)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1) / 2)

            /* -------------< Confirmation >------------- */
            && low(2).isLessThanIndex(1)
            && low(2).isLessThanIndex(3)
            && low(3).isLessThanIndex(5)

            && volume(1).isGreaterThanIndex(2)

            && dmi14.PDI(1).isLessThan(20)
            && dmi14.MDI(1).isGreaterThan(25)
    }
}

export class StrategyY45Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY45,
            timeIntervals: ['12h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY46 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, emaVol, atr14, rsi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3)/2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body/4)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body/3)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)
            && volume(2).isGreaterThan(emaVol)

            && rsi14(1).isLessThan(40)
    }
}

export class StrategyY46Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY46,
            timeIntervals: ['12h', '8h']
        });
    }
}
import {StrategyRunner} from '../strategy-runner';
import {AllIndicators} from '../../_indicators/all-indicators';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY47 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, rsi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------< Morning Star >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3) / 2)

            && ohlcs(2).isBodyLessThan(ohlcs(3).body / 4)

            && ohlcs(1).isBullish()
            && ohlcs(1).isNotReverseHammer(0.5)
            && ohlcs(1).isBodyGreaterThan(ohlcs(3).body / 3)

            /* -------------< Confirmation >------------- */
            && volume(1).isGreaterThanIndex(2)
            && volume(1).isGreaterThanIndex(3)

            && rsi14(1).isLessThan(40)
    }
}

export class StrategyY47Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY47,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyY79 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 1;

    buy({ohlcs, low, volume, atr14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------------< Piercing >--------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/2)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotReverseHammer(2)

            && volume(1).isGreaterThanMA()

            && momentum(1).isBullish()
            && momentum(2).isBullish()

            && momentum.value(1).isLessThan(0.9)
    }
}

export class StrategyY79Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY79,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY80 extends LowRiskStrategyNew {
    _takeProfit = 5.5;
    _stopLoss = -20;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 15)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2) / 1.5)
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)
            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && dmi14.MDI(1).isGreaterThan(25)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
    }
}

export class StrategyY80Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY80,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY81 extends LowRiskStrategyNew {
    _takeProfit = 4.0;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, stoch14, emaVol, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2) / 2)
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)
            && volume(1).isGreaterThanIndex(2)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(2)

            && stoch14.K(1).isCrossover(20)

            && tenkanSen(1).isLessThan(kijunSen)

            && volume(1).isGreaterThan(emaVol.get(1)*1.5)
    }
}

export class StrategyY81Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY81,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskAtrRatioStrategy} from '../low-risk-atr-ratio-strategy';

class StrategyY82 extends LowRiskAtrRatioStrategy {
    _takeProfit = 3.5;
    _stopLoss = -15;
    _atrRatio = 1;

    buy({ohlcs, low, volume, atr14, stoch14, dmi14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------------< Piercing >--------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/2)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotReverseHammer(2)

            && volume(1).isGreaterThanMA(1.5)
            && volume(1).isGreaterThanIndex(2)

            && stoch14.K(1).isCrossover(20)

            && dmi14.ADX(1).isGreaterThan(25)

            && momentum.value(1).isLessThan(0.9)
    }
}

export class StrategyY82Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY82,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY83 extends LowRiskStrategyNew {
    _takeProfit = 2.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)
            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && dmi14.PDI(1).isLessThan(25)
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
    }
}

export class StrategyY83Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY83,
            timeIntervals: ['12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY84 extends LowRiskStrategyNew {
    _takeProfit = 2.0;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyBelow(ohlcs(2).max)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)

            && dmi14.PDI(1).isLessThan(25)
            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
    }
}

export class StrategyY84Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY84,
            timeIntervals: ['8h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY85 extends LowRiskStrategyNew {
    _takeProfit = 2;
    _stopLoss = -10;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 5)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/1.5)
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyBelow(ohlcs(2).max)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotReverseHammer(1)

            && dmi14.ADX(1).isGreaterThan(25)
            && dmi14.MDI(1).isGreaterThan(25)
    }
}

export class StrategyY85Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY85,
            timeIntervals: ['8h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY86 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyBelow(ohlcs(2).max)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()

            && low(1).isLessThanIndex(4)

            && dmi14.ADX(1).isGreaterThan(25)
            && dmi14.MDI(1).isGreaterThan(25)
    }
}

export class StrategyY86Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY86,
            timeIntervals: ['6h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY87 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyBelow(ohlcs(2).max)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()

            && dmi14.PDI(1).isLessThan(25)
            && dmi14(1).isPDIBelowMDI()
            && dmi14(2).isPDIBelowMDI()
            && dmi14(3).isPDIBelowMDI()
            && dmi14(4).isPDIBelowMDI()
            && dmi14(5).isPDIBelowMDI()
    }
}

export class StrategyY87Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY87,
            timeIntervals: ['6h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY88 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, close, volume, atr14, rsi14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))
            && ohlcs(2).isBearish()

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs.get(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()

            && rsi14(1).isLessThan(40)
    }
}

export class StrategyY88Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY88,
            timeIntervals: ['6h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY89 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyBelow(ohlcs(2).max)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotReverseHammer(1)

            && low(1).isLessThanIndex(4)

            && dmi14.ADX(1).isGreaterThan(25)
            && dmi14.MDI(1).isGreaterThan(25)
    }
}

export class StrategyY89Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY89,
            timeIntervals: ['4h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY90 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2)/2)

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyBelow(ohlcs(2).max)
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(1).isNotHammer(2)
            && ohlcs(1).isNotReverseHammer(1)

            && low(1).isLessThanIndex(4)

            && volume(1).isGreaterThan(emaVol.get(1) * 2)

            && dmi14.ADX(1).isGreaterThan(25)
            && dmi14.MDI(1).isGreaterThan(25)
    }
}

export class StrategyY90Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY90,
            timeIntervals: ['4h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY91 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, rsi14, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(2).isBearish()
            && ohlcs(2).isBodyGreaterThan(atr14.get(2))

            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(3).isBearish()

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            && rsi14(1).isLessThan(40)

            && cci20(0).isGreaterThan(-130)
    }
}

export class StrategyY91Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY91,
            timeIntervals: ['12h', '8h', '6h'],
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY92 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, rsi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3))

            && ohlcs(2).isBullish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(3).body/2)

            && volume(2).isGreaterThan(volume.get(3) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)

            && rsi14(2).isLessThan(40)
    }
}

export class StrategyY92Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY92,
            timeIntervals: ['1d', '12h', '8h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY93 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14, kijunSen, tenkanSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(3).isBodyGreaterThan(atr14.get(3))
            && ohlcs(3).isBearish()

            && ohlcs(2).isBullish()
            && ohlcs(2).isBodyGreaterThan(ohlcs.get(3).body/2)

            && volume(2).isGreaterThan(volume.get(3) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && dmi14.PDI(2).isLessThan(25)
    }
}

export class StrategyY93Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY93,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY94 extends LowRiskStrategyNew {
    _takeProfit = 1.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, dmi14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3))

            && ohlcs(2).isBullish()
            && ohlcs(2).isBodyGreaterThan(ohlcs.get(3).body/2)

            && volume(2).isGreaterThan(volume.get(3) * 1.5)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(1).isBullish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && volume(1).isGreaterThanIndex(3)

            && dmi14.PDI(2).isLessThan(25)
    }
}

export class StrategyY94Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY94,
            timeIntervals: ['8h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyY95 extends LowRiskStrategyNew {
    _takeProfit = 2.2;
    _stopLoss = -15;

    buy({ohlcs, low, volume, atr14, rsi14, emaVol, cci20}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* -------------<   Piercing   >------------- */
            && ohlcs(3).isBearish()
            && ohlcs(3).isBodyGreaterThan(atr14.get(3))

            && ohlcs(2).isBullish()
            && ohlcs(2).isBodyGreaterThan(ohlcs(3).body/2)

            /* -------------< Confirmation >------------- */
            && ohlcs(4).isBearish()
            && ohlcs(1).isBullish()
            && ohlcs(1).isNotShootingStar(1)

            && volume(2).isGreaterThan(emaVol)
            && volume(2).isGreaterThanIndex(1)

            && rsi14(2).isLessThan(45)

            && (cci20(2).isGreaterThan(-100) || cci20(2).isGreaterThan(cci20.MA))
    }
}

export class StrategyY95Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyY95,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ00 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, low, volume, atr14, kc3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)

            /* -------------< Down Thrust >-------------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1)/3)
            && ohlcs(1).isHammer(1)

            && volume(1).isGreaterThan(volume.get(2) * 2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ00Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ00,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyZ01 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, atr14, kc3, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)
            && kc3.MID(1).isGreaterThan(high)

            /* ------------< Selling Climax >------------ */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(atr14.get(1))

            && volume(1).isGreaterThan(volume.get(2) * 1.5)

            /* -------------< Confirmation >------------- */
            && momentum.value(1).isLessThan(0.7)
    }
}

export class StrategyZ01Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ01,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ02 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, low, volume, kc3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)

            /* ----< Bearish Effort < Bearish Result >--- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)
            && ohlcs(1).isHammer(0.5)

            && volume(1).isLessThanIndex(2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ02Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ02,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ03 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, low, volume, kc3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)

            /* ----< Bearish Effort > Bearish Result >--- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(ohlcs(2).body)
            && ohlcs(1).isHammer(0.5)

            && volume(1).isGreaterThanIndex(2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ03Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ03,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ04 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, high, low, volume, atr14, kc3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)
            && kc3.LOWER(2).isLessThan(high)

            /* ----------< Pseudo Down Thrust >---------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1)/5)

            && volume(1).isLessThanIndex(2)
            && volume(1).isLessThanIndex(3)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ04Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ04,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ05 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, low, volume, atr14, kc3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)

            /* ----------< Inverse Down Thrust >--------- */
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyLessThan(atr14.get(1)/3)

            && volume(1).isGreaterThan(volume.get(2) * 2)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ05Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ05,
            timeIntervals: ['1d']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyZ06 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, volume, kc3, atr14, momentum}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade
            && ohlcs(0).isStopLossLessThan(low.get(1), 10)

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)
            && kc3.MID(1).isGreaterThan(high)

            /* -----< Failed Effort Selling Climax >----- */
            && ohlcs(2).isBearish()
            && ohlcs(1).isBearish()
            && ohlcs(1).isBodyGreaterThan(ohlcs(2).body)

            && volume(1).isGreaterThanIndex(2)

            /* -------------< Confirmation >------------- */
            && momentum.value(1).isLessThan(0.7)
    }
}

export class StrategyZ06Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ06,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ07 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, open, low, atr14, kc3, kc2, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)
            && kc2.LOWER(0).isGreaterThan(open)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1))

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ07Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ07,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ08 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, open, low, atr14, kc3, kc2, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)
            && kc2.LOWER(0).isGreaterThan(open)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && cci3(1).isBullish()
            && cci3(1).isGreaterThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ08Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ08,
            timeIntervals: ['1d']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ40 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, high, low, kc6, cci3, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc6.LOWER(1).isGreaterThan(low)
            && kc6.MID(1).isGreaterThan(high)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 7)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ40Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ40,
            timeIntervals: ['8h', '6h', '4h', '2h', '1h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ41 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, high, low, kc5, cci3, atr14}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc5.LOWER(1).isGreaterThan(low)
            && kc5.MID(1).isGreaterThan(high)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isLowerShadowLessThan(atr14.get(1) * 3.5)
            && ohlcs(2).isNotVolatilityHigh(atr14.get(2) * 3)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ41Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ41,
            timeIntervals: ['12h', '8h', '6h', '4h']
        });
    }
}
import {AllIndicators} from '../../_indicators/all-indicators';
import {StrategyRunner} from '../strategy-runner';
import {LowRiskStrategyNew} from '../low-risk-strategy-new';

class StrategyZ43 extends LowRiskStrategyNew {
    _takeProfit = 3.5;
    _stopLoss = -15;

    buy({ohlcs, high, low, kc4, cci3, atr14, tenkanSen, kijunSen}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc4.LOWER(1).isGreaterThan(low)
            && kc4.MID(1).isGreaterThan(high)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isLowerShadowLessThan(atr14.get(1) * 3.5)

            && cci3(1).isBullish()

            && tenkanSen(1).isLessThan(kijunSen)
            && tenkanSen(3).isLessThan(kijunSen)
    }
}

export class StrategyZ43Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ43,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ46 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, low, atr14, kc3, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(low)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ46Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ46,
            timeIntervals: ['1d', '12h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ47 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, volume, atr14, kc3, cci3, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(ohlcs(1).min)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && volume(1).isGreaterThan(emaVol.get(1) * 1.5)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ47Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ47,
            timeIntervals: ['8h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ48 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, high, volume, atr14, kc3, cci3, emaVol}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(ohlcs(1).min)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isHammer(1)
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)
            && ohlcs(2).isNotVolatilityHigh(atr14.get(2) * 2)

            && volume(1).isGreaterThan(emaVol.get(1) * 1.5)

            && cci3(1).isBullish()
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ48Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ48,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ49 extends Strategy {
    takeProfit = 2.2;

    buy({ohlcs, low, atr14, kc3, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && low(1).isLessThan(kc3.LOWER)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 2)

            && cci3(1).isBullish()
            && cci3(1).isGreaterThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ49Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ49,
            timeIntervals: ['8h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ50 extends Strategy {
    takeProfit = 1.5;

    buy({ohlcs, low, atr14, kc3, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && low(1).isLessThan(kc3.LOWER)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)
            && ohlcs(1).isNotVolatilityHigh(atr14.get(1) * 1.5)
            && ohlcs(2).isNotVolatilityHigh(atr14.get(2) * 2)

            && cci3(1).isBullish()
            && cci3(1).isGreaterThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ50Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ50,
            timeIntervals: ['6h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ51 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, low, atr14, kc3, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc3.LOWER(1).isGreaterThan(ohlcs(1).min)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && cci3(1).isBullish()
            && cci3(1).isGreaterThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ51Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ51,
            timeIntervals: ['6h', '4h']
        });
    }
}
import {Strategy} from "../../models/strategy";
import {AllIndicators} from "../../_indicators/all-indicators";
import {calcChangesInfo, StrategyRunner} from "../strategy-runner";

class StrategyZ52 extends Strategy {
    takeProfit = 2.5;

    buy({ohlcs, low, atr14, kc4, cci3}: AllIndicators): boolean {

        return ohlcs(0).isFirstTrade

            /* ---------------< KC LOWER >--------------- */
            && kc4.LOWER(1).isGreaterThan(ohlcs(1).min)

            /* -------------< Confirmation >------------- */
            && ohlcs(1).isBodyGreaterThan(atr14.get(1)/5)

            && cci3(1).isBullish()
            // && cci3(1).isGreaterThan(cci3.MA)
    }

    @calcChangesInfo
    sell(changes, buyInterval, interval, {close}: AllIndicators): boolean {

        return close(1).isLessThan(buyInterval.ohlcs.get(1).low)
            || this.takeProfit < changes
    }
}

export class StrategyZ52Runner extends StrategyRunner {
    constructor() {
        super({
            strategy: StrategyZ52,
            timeIntervals: ['8h', '6h', '4h']
        });
    }
}
import {Ohlc} from '../models/ohlc';
import {Strategy} from '../models/strategy';
import {IndicatorsData} from '../models/data';
import {Jobs} from '../jobs';
import {OHLC} from '../_indicators/ohlc';
import {AllIndicators} from '../_indicators/all-indicators';
import {List} from '../_utils/list';
import {CONFIG} from '../config';
import {PadEnd} from '../logger/pad-end';
import {EventHandler} from '../event-handler/event-handler';
import {TimeInterval} from '../models/interval';
import {SellSignalLogger} from '../logger/logs/sell-signal-logger';

export class BuyInterval {
    applicationStartAt: number;
    ohlcs: List<Ohlc>;
    tradeOhlc: Ohlc;
    buyPrice: number;
    buyTime: number;
    stopPrice = 0;
    quantity: string;
    maxChanges = 0;
    minPrice = +Infinity;

    takeProfit = 0;
    stopLoss = 0;

    dalerCostAvg = 0;
}

export class StrategyConfig {
    strategy: any | Strategy;
    timeIntervals: TimeInterval[];
}

export class StrategyRunner {
    private readonly _strategy: Strategy;

    private readonly _strategyName: string;

    private readonly buyInterval: { [prop: string]: BuyInterval } = {};

    private totalProfit = 0;

    private totalLoss = 0;

    constructor(config: StrategyConfig) {
        this._strategy = new config.strategy();
        this._strategyName = config.strategy.name;

        config.timeIntervals.forEach(timeInterval => {
            this.buyInterval[timeInterval] = new BuyInterval();
        });
    }

    init(ohlcs: OHLC, indicators: IndicatorsData, interval) {
        const buyInterval = this.buyInterval[interval];
        if (!buyInterval) return;

        this._strategy.indicatorsData ||= indicators;
        const ohlc = ohlcs.getLast();
        const buyPrice = buyInterval.buyPrice;
        const sValues = indicators[interval];
        const lastCandleTime = ohlc.time;
        buyInterval.applicationStartAt ||= lastCandleTime;

        if (1
            && !buyPrice // IS_NOT_ALREADY_BOUGHT
            && buyInterval.applicationStartAt !== lastCandleTime // LAST_CANDLE_TIME_IS_NOT_EQUAL_WITH_APPLICATION_START_TIME
            && buyInterval.buyTime !== lastCandleTime // HAS_NOT_BEEN_BOUGHT_IN_THIS_CANDLE_BEFORE
            && !Jobs.shutdown
            && this._strategy.buy(sValues, indicators, interval) // IS_FOR_BUY;
        ) {
            buyInterval.ohlcs = ohlcs.clone(5);
            buyInterval.tradeOhlc = ohlc;
            buyInterval.buyPrice = ohlc.close;
            buyInterval.buyTime = ohlc.time;
            (buyInterval as any).tradeTime = ohlc.tradeTime;
            // lValues.lOhlcs[lValues.j].buyPrice = ohlc.close;

            EventHandler.buySignal.next({
                symbol: ohlc.symbol,
                price: ohlc.close,
                strategyName: this._strategyName,
                timeInterval: interval,
                time: ohlc.tradeTime,
                dalerCostAvg: 0
            });
        }

        if (
            buyPrice // IS_ALREADY_BOUGHT
            // && buyInterval.quantity // IS_REALLY_BOUGHT
            && this._strategy.sell(buyPrice, buyInterval, interval) // IS_FOR_SELL;
        ) {
            const changes = (ohlc.close * 100) / buyPrice - 100;
            const changesMin = (buyInterval.minPrice * 100) / buyPrice - 100;

            const signal = {
                symbol: ohlc.symbol,
                price: ohlc.close,
                strategyName: this._strategyName,
                timeInterval: interval,

                buyTime: (buyInterval as any).tradeTime,
                sellTime: ohlc.tradeTime,
                minChanges: changesMin,
                maxChanges: buyInterval.maxChanges,
                sellChanges: changes,

                dalerCostAvg: 0
            }
            EventHandler.sellSignal.next(signal);

            while (buyInterval.dalerCostAvg < 0) {
                signal.sellChanges++;
                signal.dalerCostAvg++;
                new SellSignalLogger(signal);
                buyInterval.dalerCostAvg++;
            }

            if (changes > 0) {
                this.totalProfit += changes - 0.15;
            } else {
                this.totalLoss += changes - 0.15;
            }

            if (CONFIG.IS_FOR_TEST) {
                console.log(
                    PadEnd.symbol(ohlc.symbol),
                    this.totalProfit ? '\x1b[32m' + this.totalProfit.toFixed(4) : 0,
                    this.totalLoss ? '\x1b[31m' + this.totalLoss.toFixed(4) : 0,
                    '\x1b[0m');
            }

            buyInterval.quantity = null;

            buyInterval.buyPrice = null;
            buyInterval.ohlcs = null;
            buyInterval.tradeOhlc = null;
            buyInterval.maxChanges = 0;
            buyInterval.minPrice = +Infinity;
            buyInterval.stopPrice = 0;
            buyInterval.stopLoss = 0;
            buyInterval.takeProfit = 0;
            buyInterval.dalerCostAvg = 0;

            (ohlc as any).buyPrice = null;
        }

        if (
            buyPrice
            && !Jobs.shutdown
        ) {
            if (buyInterval.dalerCostAvg <= CONFIG.DCA_LEVEL) {
                return;
            }

            const changesMin = (buyInterval.minPrice * 100) / buyPrice - 100;

            if (changesMin - buyInterval.dalerCostAvg < -1) {
                buyInterval.dalerCostAvg--;

                EventHandler.buySignal.next({
                    symbol: ohlc.symbol,
                    price: ohlc.close,
                    strategyName: this._strategyName,
                    timeInterval: interval,
                    time: ohlc.tradeTime,
                    dalerCostAvg: buyInterval.dalerCostAvg
                });
            }
        }
    }
}

export function calcChangesInfo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFn = target[propertyKey];
    descriptor.value = function (buyPrice: number, buyInterval: BuyInterval, interval) {
        const indicatorsData= this._indicators[interval];
        const {close}: AllIndicators = indicatorsData;

        const changes = ((close.getLast() * 100) / buyPrice - 100);
        buyInterval.maxChanges = Math.max(buyInterval.maxChanges, changes);
        buyInterval.minPrice = Math.min(buyInterval.minPrice, close.getLast());
        buyInterval.stopLoss ||= this.stopLoss;

        return originalFn.call(this, changes, buyInterval, interval, indicatorsData);
    };
}

export function sellBasedOnAtrRatio(atrRatio: number, ohlcsIndex: number = 1) {

    return function(constructor: Function) {
        constructor.prototype.sell = function (buyPrice: number, buyInterval: BuyInterval, interval) {
            const indicatorsData= this._indicators[interval];
            const {close, atr14}: AllIndicators = indicatorsData;

            const changes = ((close.getLast() * 100) / buyPrice - 100);
            buyInterval.maxChanges = Math.max(buyInterval.maxChanges, changes);
            buyInterval.minPrice = Math.min(buyInterval.minPrice, close.getLast());
            buyInterval.stopLoss ||= this.stopLoss;

            return close(1).isLessThan(buyInterval.ohlcs.get(ohlcsIndex).low)
                || (
                    buyInterval.buyPrice + atr14.get(1) * atrRatio < close.getLast()
                    && changes > this.takeProfit
                )
        };
    }
}
import {BuyInterval} from './strategy-runner';
import {AllIndicators} from '../_indicators/all-indicators';
import {IndicatorsData} from '../models/data';

export abstract class Strategy {
    protected abstract _takeProfit: number;

    protected abstract _stopLoss: number;

    protected _indicators: IndicatorsData;
    set indicatorsData(indicatorsData: IndicatorsData) {
        this._indicators = indicatorsData;
    }

    abstract buy(indicators?: AllIndicators, indicatorsData?: IndicatorsData, interval?: string): boolean;

    abstract sell(buyPrice: number, buyInterval?: BuyInterval, interval?: string, indicators?: AllIndicators): boolean;
}
import * as binance from "binance-api-node";
import {DailyStatsResult} from "binance-api-node";

export class SymbolsLastPrice {
    private static _lastPrices: {[symbol: string]: number} = {};

    static getPrices(symbol: string): number {
        return this._lastPrices[symbol] || 0;
    }

    static updatePrice(symbol: string, price: number): void {
        this._lastPrices[symbol] = price;
    }

    static async updateAll(symbols: string[]) {
        const dailyStats = await binance.default({}).dailyStats() as DailyStatsResult[];

        symbols.forEach(symbol => {
            const dailyStat = dailyStats.find(item => item.symbol === symbol);
            this._lastPrices[symbol] = +dailyStat.lastPrice;
        });
    }
}
import {Page} from "puppeteer";
import {readdir, readFileSync, unlink} from "fs";
import path from "path";
const puppeteer = require('puppeteer');
const SCREENSHOTS_DIR = 'screenshots';

(async () => {
    readdir(SCREENSHOTS_DIR, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            unlink(path.join(SCREENSHOTS_DIR, file), err => {
                if (err) throw err;
            });
        }
    });

    let data: any = readFileSync(process.env.NODE_ENV);
    data = data.toString();
    data = data.replace(/\x1B\[33m/g, '');
    data = data.replace(/\x1B\[35m/g, '');
    data = data.replace(/\x1B\[0m\r/g, '');
    data = data.split('\n');
    data = data.filter(row => row.includes('SELL'));
    data = data.sort((b, a) => {
        const nameA = +a.match(/:[0-9]{2}\s([\-0-9.]+)/)[1];
        const nameB = +b.match(/:[0-9]{2}\s([\-0-9.]+)/)[1];
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }

        return 0;
    })
    console.log(data);

    await setupChartPage(data);
})();


async function setupChartPage(data: string[]) {
    const browser = await puppeteer.launch({
        devtools: false,
        userDataDir: 'puppeteer',
        args: [`--window-size=1368,793`],
        defaultViewport: {
            width: 1368,
            height: 793
        }
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60 * 3 * 1000);
    await page.setDefaultTimeout(60 * 10 * 1000);
    await page.goto(`https://www.binance.com/en/trade/BTC_USDT?layout=pro&type=spot`);

    // Accept all cookies
    const acceptCookiesBtn = await page.$('#onetrust-accept-btn-handler');
    console.log('Accept all cookies');
    acceptCookiesBtn?.click();

    // Select TradingView chart type
    const [tradingViewBtn] = await page.$x("//div[contains(text(), 'TradingView')]");
    console.log('Select TradingView chart type');
    await tradingViewBtn.click();

    // Maximize Chart
    await page.waitForTimeout(2000);
    const maximizeChartBtn = await page.$("svg.css-y4lg06");
    console.log('Maximize Chart');
    await maximizeChartBtn.click();

    for (let i = 0; i < data.length; i++) {
        const [match, symbol, interval, date, hours, minutes] = data[i].match(/\s([0-9A-Z]+)\s+([0-9mh]+)\s+[0-9a-zA-Z]+\s+([0-9\-]+)T([0-9]+):([0-9]+)/);
        let hh;
        let mm;
        let timeInterval;

        switch (interval) {
            case '5m':
                hh = hours
                mm = (+minutes - +minutes % 5).toString().padStart(2, '0');
                timeInterval = interval;
                break;

            case '15m':
                hh = hours
                mm = (+minutes - +minutes % 15).toString().padStart(2, '0');
                timeInterval = interval;
                break;

            case '30m':
                hh = hours
                mm = (+minutes - +minutes % 30).toString().padStart(2, '0');
                timeInterval = interval;
                break;

            case '1h':
                hh = hours
                mm = '00';
                timeInterval = '1H';
                break;

            case '2h':
                hh = (+hours - +hours % 2).toString().padStart(2, '0');
                mm = '00';
                timeInterval = '2H';
                break;

            case '4h':
                hh = (+hours - +hours % 4).toString().padStart(2, '0');
                mm = '00';
                timeInterval = '4H';
                break;

            case '6h':
                hh = (+hours - +hours % 6).toString().padStart(2, '0');
                mm = '00';
                timeInterval = '6H';
                break;

            case '8h':
                hh = (+hours - +hours % 8).toString().padStart(2, '0');
                mm = '00';
                timeInterval = '8H';
                break;

            case '12h':
                hh = (+hours - +hours % 12).toString().padStart(2, '0');
                mm = '00';
                timeInterval = '12H';
                break;
        }
        await takeScreenshot(page, i+1, symbol, timeInterval, date, `${hh}:${mm}`);
    }

    await browser.close();
}

async function takeScreenshot(page: Page, index: number, symbol: string, interval: string, date: string, time: string) {
    console.log('---------------------------------------');
    console.log(symbol, interval, date, time);
    // Open symbol dropdown
    await page.waitForSelector('.css-1i6ydsq', {hidden: true});
    await page.waitForTimeout(1000);
    const symbolDropdown = await page.waitForSelector('.css-4h6mys');
    console.log('Open symbol dropdown');
    await symbolDropdown.click();

    // Search symbol
    const symbolSearchInput = await page.waitForSelector('.trade-widget-search');
    console.log('Search symbol');
    await symbolSearchInput.focus();
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await symbolSearchInput.type(symbol);

    // Select symbol
    await page.waitForTimeout(1000);
    try {
        await page.$eval('.tradeMarketColumnWrap a', elem => (elem as HTMLElement).click());
    } catch (e) {
        console.log('Not find symbol');
        return;
    }
    console.log('Select symbol');

    // Select time interval
    await page.waitForSelector('.css-1pj8e72');
    console.log('Select time interval');
    const [intervalBtn] = await page.$x(`//div[contains(text(), '${interval}')]`);
    await intervalBtn.click();

    // Wait for TradingView chart
    const elementHandle = await page.waitForSelector('#chart_spot-chart_spot-tradingview iframe');
    console.log('Wait for TradingView chart');
    const frame = await elementHandle.contentFrame();
    await frame.waitForSelector('[data-name="date-ranges-menu"]');

    // Open GoTo dialog box
    await page.waitForSelector('.css-1i6ydsq', {hidden: true});
    await page.evaluate(() => {
        const frame: any = document.querySelector('#chart_spot-chart_spot-tradingview iframe');
        frame.contentWindow.$('div[data-name="date-ranges-menu"]').click();
        frame.contentWindow.$('.label-3Xqxy756').click();
    });

    // Set date and time
    const dateInput = await frame.waitForSelector('.formRow-28Ldm-ki > div:first-child input');
    console.log('Set date and time');
    await dateInput.focus();
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(date);
    await page.keyboard.press('Tab');
    await page.keyboard.type(time);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await page.keyboard.press('Enter');

    // Wait for loading data
    await frame.waitForSelector('.formRow-28Ldm-ki > div:first-child input', {hidden: true});
    console.log('Wait for loading data');
    await (page as any)._client.send('Emulation.clearDeviceMetricsOverride');
    const fileName = `${SCREENSHOTS_DIR}/${index}-${interval}-${symbol}-${date}T${time.replace(':', '-')}.png`;
    await page.screenshot({path: fileName, fullPage: true});
    console.log(fileName);
}
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');
const path = require('path');
const downloadPath = path.resolve('./');
const fs = require('fs');

(async () => {
    // const oldProxyUrl = 'http://localhost:1080';
    // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
    // console.log(newProxyUrl);

    const files = await fs.readdirSync('../ocr/scans');

    for (let fileName of files) {
        try {
            const name = fileName.split('.jpg')[0];
            await scanFile(name + '_1.jpg');
            await scanFile(name + '_2.jpg');
            await scanFile(name + '_3.jpg');
            const col1 = await readTxt(name + '_1.jpg');
            const col2 = await readTxt(name + '_2.jpg');
            const col3 = await readTxt(name + '_3.jpg');
            await createFile(col1, col2, col3, name);
        } catch (e) {
            console.log('[ERROR]', fileName);
        }
        console.log('---------------------------');
    }
})();

async function scanFile(fileName: string) {
    const browser = await puppeteer.launch({
        devtools: false,
        userDataDir: 'puppeteer',
        // args: [`--window-size=1368,793 --proxy-server=${newProxyUrl}`],
        args: [`--window-size=1368,1793`],
        defaultViewport: {
            width: 1368,
            height: 1793
        }
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60 * 3 * 1000);
    await page.setDefaultTimeout(60 * 10 * 1000);
    // await page.goto(`https://cloud.google.com/vision`);
    await page.goto(`https://docsumo.com/free-tools/online-ocr-scanner`);
    console.log(fileName, 'Page Opened')

    await page.$('#pdf_button');
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click("#pdf_button")
    ]);
    await fileChooser.accept(['../ocr/croped/' + fileName]);

    await page.waitForTimeout(1000 * 40);
    await page.waitForSelector('.div-block-308');
    console.log(fileName, 'File Converted');
    await page.screenshot({path: '../ocr/croped/' + fileName + '.jpg', fullPage: true});

    page.on('response', response => {
        const url = response.request().url();
        const contentType = response.headers()['content-type'];
        if (url.includes('docsumo_')) {
            const convertedFileName = path.basename(response.request().url());
            // handle and rename file name (after making sure it's downloaded)
            setTimeout(() => {
                fs.rename(convertedFileName.split('?')[0], '../ocr/croped/' + fileName + '.txt', function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                    console.log(fileName, 'File Saved');
                });}, 1000 * 40);
        }
    });
    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });
    await page.click('.div-block-308');
    await page.waitForTimeout(1000 * 45);
    console.log(fileName, 'File Downloaded');
    await page.waitForTimeout(1000 * 60 * 4);
    await browser.close();
}

async function readTxt(fileName: string) {
    const file = await fs.readFileSync('../ocr/croped/' + fileName + '.txt');
    const col = file.toString().split(' ');
    console.log(col);
    return col;
}

async function createFile(col1, col2, col3, fileName) {
    let content = '';
    for (let i in col1) {
        content += col1[i] + ',' + col2[i] + ',' + col3[i] + '\n'
    }

    await fs.writeFileSync('../ocr/croped/' + fileName + '.csv', content);
    console.log(fileName, 'SCV created');
    console.log(content);
}
import * as fs from "fs";
import * as readline from "readline";
import {
    AVAILABLE_INTERVALS,
    INDICATORS_DATA,
    INTERVAL_TIME_PATTERN,
    INTERVALS_DATA, MAX_INTERVAL,
    MIN_INDICATORS_DATA_LENGTH, MIN_INTERVAL
} from "../config";
import {Data, IndicatorsData} from "../models/data";
import {OHLC} from "../_indicators/ohlc";
import {AllIndicators} from "../_indicators/all-indicators";
import { Ohlc } from "../models/ohlc";
import {IndicatorFn} from "../_indicators/indicator-fn";

class DataHandler {
    static tradeDataDir = '../trade-data/11';

    static readTradeStream(symbol: string, callback) {
        new DataStreamHandler(symbol, callback);
    }
}

class DataStreamHandler {
    private i = 0;

    constructor(private symbol: string, private callback) {
        this.readStream();
    }

    private readStream(): void {
        const streamDataFiles = this.getStreamDataFiles();

        this.readLine(streamDataFiles);
    }

    private getStreamDataFiles(): string[] {
        // const fileNamePattern = new RegExp(this.symbol + '-trades-2021-10.csv');
        const fileNamePattern = new RegExp(this.symbol + '-trades-[0-9\-]{7}.csv');

        return fs.readdirSync(DataHandler.tradeDataDir)
            .filter(fileName => fileName.search(fileNamePattern) > -1);
    }

    private readLine(fileNames: string[]): void {
        if (this.i === fileNames.length) {
            return;
        }

        const fileStream = fs.createReadStream(`${DataHandler.tradeDataDir}/${fileNames[this.i]}`, {
            encoding: 'ascii',
            // highWaterMark: 1024 * 1024 * 10
        })
        const ln = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        this.i++;

        ln.on('line', this.callback);
        ln.on('close', () => this.readLine(fileNames));
    }
}

export class OHLCDataStream {
    constructor(private symbol: string) {}

    async streamOhlc(callback: (TradeStream, indicators: IndicatorsData) => void) {
        const data: Data = INTERVALS_DATA;
        const indicators: IndicatorsData = INDICATORS_DATA;

        DataHandler.readTradeStream(this.symbol, (line) => {
            const [tradeId, price, quantity, q, tradeTime] = line.split(',');
            const lineData = {price: +price, quantity: +quantity, tradeTime: +tradeTime};

            const n = AVAILABLE_INTERVALS.length;
            for (let i = 0; i < n; i++) {
                const interval = AVAILABLE_INTERVALS[i];
                const ohlcs: IndicatorFn<OHLC, Ohlc> = data[interval];
                this.updateOhlcData(ohlcs, lineData, interval, indicators[interval]);
            }

            if (data[MAX_INTERVAL].getPointer() >= MIN_INDICATORS_DATA_LENGTH*2 && indicators[MIN_INTERVAL])
                 callback(data, indicators);
        });
    }

    private updateOhlcData(data: IndicatorFn<OHLC, Ohlc>, {price, quantity, tradeTime}, interval: string, indicators: AllIndicators) {
        const klineStartTime = tradeTime - (tradeTime % INTERVAL_TIME_PATTERN[interval]);

        if (data.getLast().time !== klineStartTime) {
            const ohlc = new Ohlc({
                isFirstTrade: true,
                symbol: this.symbol,
                time: klineStartTime,
                tradeTime: tradeTime,
                open: price,
                high: price,
                low: price,
                close: price,
                volume: quantity});

            data.next(ohlc);
            indicators.next(data);
        } else {
            const lastOhlc = data.getLast();
            data.update({
                tradeTime,
                open: lastOhlc.open,
                high: Math.max(price, lastOhlc.high),
                low: Math.min(price, lastOhlc.low),
                close: price,
                volume: lastOhlc.volume + quantity
            });
            indicators.update(data);
        }
    }
}

// https://github.com/binance/binance-public-data/
// https://data.binance.vision/data/spot/monthly/trades/LAICEUSDT/LAICEUSDT-trades-2021-06.zip
import {Ohlc} from "../models/ohlc";
import {IIchimoku} from "../models/iichimoku";
import {Intervals} from "../enums/intervals";
import {INDICATORS_DATA_DIR, INTERVAL_TIME_PATTERN, MIN_INDICATORS_DATA_LENGTH} from "../config";

const lineByLine = require('n-readlines');

export class StrategyIndicators {
    private readonly data: Ohlc[];
    private readonly close: number[];
    private ichimoku: IIchimoku;
    private sma3: number[];
    private sma21: number[];
    private rsi14: number[];
    private mfi14: number[];

    private static logger = {};
    private static indicator = {};
    private static klineStartTime;

    constructor(interval: Intervals, data: Ohlc[]) {
        if (data.length < MIN_INDICATORS_DATA_LENGTH) return;

        this.data = this.sliceOfData(data, MIN_INDICATORS_DATA_LENGTH);
        this.close = this.data.map(ohlc => ohlc.close);

        StrategyIndicators.indicator['sma3'] ||= new Array(100);
        StrategyIndicators.indicator['sma21'] ||= new Array(100);
        StrategyIndicators.indicator['rsi14'] ||= new Array(100);
        StrategyIndicators.indicator['mfi14'] ||= new Array(100);

        const sma3 = this.getIndicatorData(`${this.data[0].symbol}-${interval}-sma3`);
        const sma21 = this.getIndicatorData(`${this.data[0].symbol}-${interval}-sma21`);
        const rsi14 = this.getIndicatorData(`${this.data[0].symbol}-${interval}-rsi14`);
        const mfi14 = this.getIndicatorData(`${this.data[0].symbol}-${interval}-mfi14`);

        const sma3Value = sma3.next().toString();
        const sma21Value = sma21.next().toString();
        const rsi14Value = rsi14.next().toString();
        const mfi14Value = mfi14.next().toString();

        const i = this.data.length - 1;
        const tradeTime = this.data[i].tradeTime;
        const klineStartTime = tradeTime - (tradeTime % INTERVAL_TIME_PATTERN[interval]);

        this.sma3  = StrategyIndicators.indicator['sma3'];
        this.sma21 = StrategyIndicators.indicator['sma21'];
        this.rsi14 = StrategyIndicators.indicator['rsi14'];
        this.mfi14 = StrategyIndicators.indicator['mfi14'];

        if (StrategyIndicators.klineStartTime !== klineStartTime) {
            StrategyIndicators.klineStartTime = klineStartTime;

            this.sma3.shift();
            this.sma3.push(+sma3Value);

            this.sma21.shift();
            this.sma21.push(+sma21Value);

            this.rsi14.shift();
            this.rsi14.push(+rsi14Value);

            this.mfi14.shift();
            this.mfi14.push(+mfi14Value);
        } else {
            this.sma3[i] = +sma3Value;
            this.sma21[i] = +sma21Value;
            this.rsi14[i] = +rsi14Value;
            this.mfi14[i] = +mfi14Value;
        }
    }

    getData(): Ohlc[] {
        return this.data;
    }

    getIchimoku(): IIchimoku {
        return this.ichimoku;
    }

    getSma3(): number[] {
        return this.sma3;
    }

    getSma21(): number[] {
        return this.sma21;
    }

    getDataLastIndex(): number {
        return this.data.length - 1;
    }

    getRsi14(): number[] {
        return this.rsi14;
    }

    getMfi14(): number[] {
        return this.mfi14;
    }

    getClose(): number[] {
        return this.close
    }

    private sliceOfData(data: Ohlc[], length): Ohlc[] {
        const start = data.length - length;
        const end = data.length;

        return data.slice(start, end);
    }

    private getIndicatorData(file) {
        return StrategyIndicators.logger[file] ||= new lineByLine(`${INDICATORS_DATA_DIR}/${file}.csv`);
    }
}
import {Ohlc} from "../models/ohlc";
import {Intervals} from "../enums/intervals";
import {INDICATORS_DATA_DIR, MIN_INDICATORS_DATA_LENGTH} from "../config";
import {createWriteStream} from "fs";

const lineByLine = require('n-readlines');

export class StrategyIndicators2 {
    private static logger = {};
    private static loggers = {};

    constructor(interval: Intervals, data: Ohlc[]) {
        if (data.length < MIN_INDICATORS_DATA_LENGTH) return;

        const sma3 = this.getIndicatorData(`${data[0].symbol}-${interval}-sma3`);
        const sma21 = this.getIndicatorData(`${data[0].symbol}-${interval}-sma21`);
        const rsi14 = this.getIndicatorData(`${data[0].symbol}-${interval}-rsi14`);
        const mfi14 = this.getIndicatorData(`${data[0].symbol}-${interval}-mfi14`);

        const sma3Value = sma3.next().toString();
        const sma21Value = sma21.next().toString();
        const rsi14Value = rsi14.next().toString();
        const mfi14Value = mfi14.next().toString();

        this.indexIndicatorsData(
            data[0].symbol,
            interval,
            sma3Value,
            sma21Value,
            rsi14Value,
            mfi14Value
        );
    }

    private getIndicatorData(file) {
        return StrategyIndicators2.logger[file] ||= new lineByLine(`${INDICATORS_DATA_DIR}/${file}.csv`);
    }

    private logger(symbol: string, interval: Intervals, data: string) {
        const file = `${symbol}-${interval}`;

        if (!StrategyIndicators2.loggers[file]) {
            StrategyIndicators2.loggers[file] = createWriteStream(`${INDICATORS_DATA_DIR}/${file}.csv`, {
                flags: 'a' // 'a' means appending (old data will be preserved)
            });
        }

        StrategyIndicators2.loggers[file].write(data + '\n');
    }

    private indexIndicatorsData(symbol: string, interval: Intervals, ...args: string[]): void {
        this.logger(symbol, interval, args.join(','));
    }
}
import {createReadStream} from "fs";

const rs = createReadStream(`../trade-data/22/FTTUSDT-trades-2021-01.csv`);
const nl = '\n';
const tab = '\t'.charCodeAt(0);

async function parseline(line, start = 0) {
    const f0 = line.indexOf(tab, start);
    const f1 = line.indexOf(tab, f0 + 1);
    const data1 = line.slice(f0 + 1, f1).toString();

    console.log(data1.split(nl));
    await sleep();
}

(async function () {
    console.time(__filename);
    let remainder = '';
    for await (const buf of rs) {
        let start = 0;
        let end;
        while ((end = buf.indexOf(nl, start)) !== -1) {
            if (start == 0 && remainder.length > 0) {
                await parseline(remainder + buf.slice(0, end));
                remainder = '';
            } else
                await parseline(buf, start);
            start = end + 1;
        }
        remainder = buf.slice(start);
    }
    console.timeEnd(__filename);
})();


async function sleep(): Promise<any> {
    return new Promise(resolve => {
        setTimeout(() => resolve(null), 5000);
    })
}import {workerInit} from './worker';
import {CONFIG} from '../config';
import {LogHandler} from '../logger/log-handler';

const {Worker, isMainThread, parentPort} = require('worker_threads');
const os = require('os');

process.env.UV_THREADPOOL_SIZE = os.cpus().length;
CONFIG.IS_FOR_TEST = true;
LogHandler.init();

if (isMainThread) {
    const symbols = [
        'BTCUSDT',
        'SHIBUSDT',
        'MANAUSDT',
        'ETHUSDT',
        ////"BUSDUSDT",
        'DOGEUSDT',
        'STORJUSDT',
        'SANDUSDT',
        'SOLUSDT',
        'HOTUSDT',
        'XRPUSDT',
        'BNBUSDT',
        'ANKRUSDT',
        'CHZUSDT',
        'FILUSDT',
        'DOTUSDT',
        'FTMUSDT',
        'QTUMUSDT',
        'ADAUSDT',
        ////"BTTUSDT",
        'MATICUSDT',
        'COTIUSDT',
        'TRXUSDT',
        'DENTUSDT',
        'LRCUSDT',
        'OMGUSDT',
        'WINUSDT',
        'ZRXUSDT',
        'THETAUSDT',
        'DYDXUSDT',
        'AXSUSDT',
        'GRTUSDT',
        'ENJUSDT',
        'SLPUSDT',
        ////"USDCUSDT",
        'DGBUSDT',
        'LINKUSDT',
        // "KEYUSDT",
        'ONEUSDT',
        'BATUSDT',
        'ETCUSDT',
        ////"LUNAUSDT",
        'RUNEUSDT',
        'WAXPUSDT',
        'ALICEUSDT',
        'SCUSDT',
        'ICPUSDT',
        'TLMUSDT',
        'VETUSDT',
        'AVAXUSDT',
        'LTCUSDT',
        'NEARUSDT',
        ////"CVCUSDT",
        'ATOMUSDT',
        'EOSUSDT',
        'KAVAUSDT',
        'ZENUSDT',
        'CHRUSDT',
        'ZILUSDT',
        'ONTUSDT',
        'DODOUSDT',
        'COMPUSDT',
        ////"ARUSDT",
        'IOTAUSDT',
        'SXPUSDT',
        'XLMUSDT',
        'ZECUSDT',
        'GALAUSDT',
        'SUSHIUSDT',
        'CRVUSDT',
        'RVNUSDT',
        'ATAUSDT',
        'FETUSDT',
        'ALGOUSDT',
        'OCEANUSDT',
        'NEOUSDT',
        'KNCUSDT',
        'HBARUSDT',
        'CAKEUSDT',
        '1INCHUSDT',
        ////"EURUSDT",
        'REEFUSDT',
        'BCHUSDT',
        // "FTTUSDT",
        'SKLUSDT',
        'MASKUSDT',
        'RSRUSDT',
        'EGLDUSDT',
        'FORTHUSDT',
        'BETAUSDT',
        'CELRUSDT',
        'XTZUSDT',
        'C98USDT',
        'SUPERUSDT',
        'AAVEUSDT',
        //// "SRMUSDT",
        'IOSTUSDT',
        'BLZUSDT',
        'UNIUSDT',
        ////"AUDUSDT",
        'OGNUSDT',
        'FLOWUSDT',
        'ICXUSDT',
        'AUDIOUSDT',
        'STXUSDT',
        'BELUSDT',
        'XMRUSDT',
        'VTHOUSDT',
        'XEMUSDT',
        'CELOUSDT',
        'SNXUSDT',
        'ARPAUSDT',
        'MBOXUSDT',
        'ADXUSDT',
        'AKROUSDT',
        'CTSIUSDT',
        ////"TUSDUSDT",
        'DASHUSDT',
        'LINAUSDT',
        'XECUSDT',
        'MINAUSDT',
        'SFPUSDT',
        'JSTUSDT',
        'IOTXUSDT',
        'KSMUSDT',
        'BAKEUSDT',
        'LAZIOUSDT',
        'HARDUSDT',
        ////"BTCSTUSDT",
        'TWTUSDT',
        'FLMUSDT',
        ////"GTOUSDT",
        'YGGUSDT',
        'STMXUSDT',
        'BANDUSDT',
        'WRXUSDT',
        'SUNUSDT',
        ////"NUUSDT",
        ////"EPSUSDT",
        'NKNUSDT'
    ];

    symbols.forEach(symbol => {
        const worker = new Worker(__filename);
        worker.postMessage(symbol);
    })
} else {
    parentPort.once('message', async (symbol) => {
        await workerInit(symbol);
    });
}
import {OHLCDataStream} from './data-stream';
import {AVAILABLE_INTERVALS} from '../config';
import {Data, IndicatorsData} from '../models/data';
import {StrategyX86Runner} from '../strategies/strategies/strategy-X86';

export async function workerInit(symbol) {
    const strategies = [
        new StrategyX86Runner(),
    ];

    const ohlcDataStream = new OHLCDataStream(symbol);
    await ohlcDataStream.streamOhlc((data: Data, indicators: IndicatorsData) => {
        const n = AVAILABLE_INTERVALS.length;
        for (let i = 0; i < n; i++) {
            const interval = AVAILABLE_INTERVALS[i];
            strategies.forEach(strategy => strategy.init(data[interval], indicators, interval));
        }
    });
}
import prompts from "prompts";
import {Jobs} from "./jobs";
import {ExchangeInfo} from "./api/exchange-info";


(async function () {
    await ExchangeInfo.getExchangeInfo();
    new Jobs();

    const order = await prompts([
        {
            type: 'text',
            name: 'symbol',
            message: 'Symbol'
        },
        {
            type: 'text',
            name: 'side',
            message: 'Order Side',
            validate: value => (value === 'BUY' || value === 'SELL')
                ? true
                : `Order side should be BUY or SELL`
        },
        {
            type: 'text',
            name: 'quantity',
            message: 'Quantity'
        },
        {
            type: 'text',
            name: 'ready',
            message: 'Are you sure?',
            initial: 'Yes',
        }
    ]);

    if (order.ready === 'Yes') {
        for(let prop in Jobs.Users) {
            const user = Jobs.Users[prop];

            let quantity = (user as any)._userBalances
                .getBalanceFreeAmount(order.symbol.slice(0, -4));
            quantity = ExchangeInfo.fixQuantityByLotSize(order.symbol, quantity);

            if (!quantity) continue;

            user.client.order({
                type: 'MARKET',
                side: order.side,
                symbol: order.symbol,
                quantity: quantity/*: order.quantity*/
            })
                .then((resp) => {
                    console.log(
                        user.username,
                        order.side,
                        order.symbol,
                        '|', 'Quantity:', +quantity/*order.quantity*/,
                        '|', 'Price', +(+resp.fills[0].price).toFixed(6));
                })
                .catch(err => {
                    console.log(user.username, err);
                })
        }
    }
})();

process
    .on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at Promise', reason, promise);
    })
    .on('uncaughtException', err => {
        console.error('Uncaught Exception thrown', err);
        // process.exit(1);
    });
import {LogHandler} from "../logger/log-handler";
import {CredentialExpiredException} from "../exception/credential-expired-exception";

export class AccountCredentialHandler {
    private readonly _username: string;

    private _expirationTime: number;

    private _expirationDate: string;
    get expirationDate(): string { return this._expirationDate; }
    set expirationDate(expirationDate: string) {
        const preExpirationDate = this._expirationDate;
        this._expirationDate = expirationDate;
        this._expirationTime = new Date(expirationDate).getTime();

        if (preExpirationDate && preExpirationDate !== expirationDate) {
            LogHandler.info('Account expiration date updated until ' + this._expirationDate, this._username);
        }
    }

    constructor(username: string) {
        this._username = username;
    }

    checkCredentialExpiration(): void {
        const hasAccountExpired = this._expirationTime < new Date().getTime();

        if (hasAccountExpired) {
            throw new CredentialExpiredException(this._expirationDate);
        }
    }
}
import {StrategyInvestFactory} from './users-config';

export interface InitialUser {
    username: string;
    apiKey: string;
    apiSecret: string;
    accountExpirationDate: string;
    strategyInvestFactor: StrategyInvestFactory;
    isShutdown: boolean;
}
import {MyOrder} from "./my-order";
import {Binance} from "binance-api-node";
import {InsufficientBalanceException} from "../exception/Insufficient-balance-exception";
import {LotSizeException} from "../exception/lot-size-exception";
import {ExchangeInfo} from "../api/exchange-info";
import {OrderNotTradedException} from "../exception/order-not-traded-exception";

describe('MyOrder', () => {
    const api: any = {
        order() {},
        cancelOrder(){}
    };
    let myOrder: MyOrder;

    beforeEach(() => {
        myOrder = new MyOrder({
            api: (api as Binance),
            symbol: 'BTCUSDT',
            buyPrice: '10000',
            quantity: '100'
        });
    });

    it('If buy order is successful, #buy method should update orderId and return orderResponse', async () => {
        const ORDER_RESPONSE = {orderId: 123};

        jest.spyOn(api, 'order').mockResolvedValue(ORDER_RESPONSE);

        const buyOrder = await myOrder.buy();

        expect(buyOrder).toBe(ORDER_RESPONSE);
        expect(myOrder.orderId).toBe(ORDER_RESPONSE.orderId);
    });

    it('If in buy order user has insufficient balance, #buy method should throw InsufficientBalanceException', async () => {
        const ORDER_ERROR = {code: -2010};
        jest.spyOn(api, 'order').mockRejectedValue(ORDER_ERROR);

        try {
            await myOrder.buy();
        } catch (e) {
            expect(e instanceof InsufficientBalanceException).toBeTruthy();
        }
    });

    it('If buy order got LotSize exception, #buy method should throw LotSizeException', async () => {
        const ORDER_ERROR = {code: -1013};
        jest.spyOn(api, 'order').mockRejectedValue(ORDER_ERROR);
        jest.spyOn(ExchangeInfo, 'getExchangeInfo').mockResolvedValue([]);
        jest.spyOn(myOrder, 'buy');

        try {
            await myOrder.buy();
        } catch (e) {
            expect(e instanceof LotSizeException).toBeTruthy();
            expect(ExchangeInfo.getExchangeInfo).toHaveBeenCalledTimes(1);
            expect(myOrder.buy).toHaveBeenLastCalledWith(true);
            expect(myOrder.buy).toHaveBeenCalledTimes(2);
        }
    });

    it('If buy order got unknown exception, #buy method should throw it', async () => {
        const ORDER_ERROR = {code: 1};
        jest.spyOn(api, 'order').mockRejectedValue(ORDER_ERROR);

        try {
            await myOrder.buy();
        } catch (e) {
            expect(e).toBe(ORDER_ERROR);
        }
    });

    it('Sell order quantity should fixed by LotSize', async () => {
        myOrder.totalTradeQuantity = '100';
        jest.spyOn(ExchangeInfo, 'fixQuantityByLotSize').mockReturnValue('100.00');
        jest.spyOn(api, 'order').mockResolvedValue(null);

        await myOrder.sell();

        expect(api.order).toHaveBeenLastCalledWith({
            quantity: '100.00',
            side: 'SELL',
            symbol: 'BTCUSDT',
            type: 'MARKET'
        })
    });

    it('If sell order is successful, #sell method should return orderResponse', async () => {
        const ORDER_RESPONSE = {};
        myOrder.totalTradeQuantity = '100';
        jest.spyOn(ExchangeInfo, 'fixQuantityByLotSize').mockReturnValue('100.00');
        jest.spyOn(api, 'order').mockResolvedValue(ORDER_RESPONSE);

        const sellOrder = await myOrder.sell();

        expect(sellOrder).toBe(ORDER_RESPONSE);
    });

    it('If sell order got LotSize exception, #sell method should throw LotSizeException', async () => {
        const ORDER_ERROR = {code: -1013};
        myOrder.totalTradeQuantity = '100';
        jest.spyOn(ExchangeInfo, 'fixQuantityByLotSize').mockReturnValue('100.00');
        jest.spyOn(ExchangeInfo, 'getExchangeInfo').mockResolvedValue([]);
        jest.spyOn(api, 'order').mockRejectedValue(ORDER_ERROR);
        jest.spyOn(myOrder, 'sell');

        try {
            await myOrder.sell();
        } catch (e) {
            expect(e instanceof LotSizeException).toBeTruthy();
            expect(ExchangeInfo.getExchangeInfo).toHaveBeenCalledTimes(1);
            expect(myOrder.sell).toHaveBeenLastCalledWith(true);
            expect(myOrder.sell).toHaveBeenCalledTimes(2);
        }
    });

    it('If sell order got unknown exception, #sell method should throw it', async () => {
        const ORDER_ERROR = {code: 1};
        myOrder.totalTradeQuantity = '100';
        jest.spyOn(ExchangeInfo, 'fixQuantityByLotSize').mockReturnValue('100.00');
        jest.spyOn(ExchangeInfo, 'getExchangeInfo').mockResolvedValue([]);
        jest.spyOn(api, 'order').mockRejectedValue(ORDER_ERROR);

        try {
            await myOrder.sell();
        } catch (e) {
            expect(e).toBe(ORDER_ERROR);
        }
    });

    it('If order is not traded, #sell method should throw OrderNotTradedException', async () => {
        jest.spyOn(api, 'cancelOrder').mockResolvedValue(null);

        try {
            await myOrder.sell();
        } catch (e) {
            expect(e instanceof OrderNotTradedException).toBeTruthy();
        }
    });

    it('If order is filled, api.cancelOrder should not have been called', async () => {
        myOrder.totalTradeQuantity = '100';
        jest.spyOn(api, 'cancelOrder');

        try {
            await myOrder.sell();
        } catch (e) {}

        expect(api.cancelOrder).not.toHaveBeenCalled();
    });

    it('If order is not filled, api.cancelOrder should have been called', async () => {
        myOrder.totalTradeQuantity = '99';
        jest.spyOn(api, 'cancelOrder');

        try {
            await myOrder.sell();
        } catch (e) {}

        expect(api.cancelOrder).toHaveBeenCalled();
    });
});
import {Binance, CancelOrderResult, ErrorCodes, Order} from "binance-api-node";
import {OrderInfo} from "./order-info";
import {InsufficientBalanceException} from "../exception/Insufficient-balance-exception";
import {LotSizeException} from "../exception/lot-size-exception";
import {ExchangeInfo} from "../api/exchange-info";
import {OrderNotTradedException} from "../exception/order-not-traded-exception";
import {InvalidTimestampException} from "../exception/invalid-timestamp-exception";
import {EconnresetException} from "../exception/econnreset-exception";

export class MyOrder {
    private readonly _api: Binance;
    private readonly _symbol: string;

    private _orderId: number;
    get orderId(): number { return this._orderId; }

    private readonly _quantity: string;
    get quantity(): string { return this._quantity; }

    private readonly _buyPrice: string;
    get buyPrice(): string { return this._buyPrice; }

    private _totalTradeQuantity: string = '0';
    set totalTradeQuantity(value: string) {
        this._totalTradeQuantity = value;
    }

    constructor({api, buyPrice, quantity, symbol}: OrderInfo) {
        this._api = api;
        this._buyPrice = buyPrice;
        this._quantity = quantity;
        this._symbol = symbol;
    }

    async buy(retry: number = 0): Promise<Order> {
        return this._api
            .order({
                recvWindow: 30000,
                // type: 'LIMIT',
                type: 'MARKET',
                side: 'BUY',
                symbol: this._symbol,
                quantity: this._quantity,
                // price: this._buyPrice
            })
            .then(resp => {
                this._orderId = resp.orderId;
                return resp;
            })
            .catch(async e => {
                switch (e.code) {
                    case ErrorCodes.INSUFFICIENT_BALANCE:
                        throw new InsufficientBalanceException();

                    case ErrorCodes.INVALID_MESSAGE:
                        if (retry > 2) { throw new LotSizeException(this._symbol);}

                        await ExchangeInfo.getExchangeInfo();
                        retry++;
                        return this.buy(retry);

                    case ErrorCodes.INVALID_TIMESTAMP:
                        if (retry > 3) { throw new InvalidTimestampException(this._symbol);}

                        retry++;
                        return this.sell(retry);

                    case 'ECONNRESET':
                        if (retry > 2) { throw new EconnresetException(this._symbol);}

                        retry++;
                        return this.sell(retry);

                    default:
                        throw e;
                }
            });
    }

    async sell(retry: number = 0) {
        // await this._cancelOpenOrder();
        // this._checkOrderIsTraded();

        // const quantity = ExchangeInfo.fixQuantityByLotSize(this._symbol, +this._totalTradeQuantity);
        const quantity = this._quantity;

        return this._api
            .order({
                recvWindow: 30000,
                type: 'MARKET',
                side: 'SELL',
                symbol: this._symbol,
                quantity
            })
            .catch(async e => {
                switch (e.code) {
                    case ErrorCodes.INVALID_MESSAGE:
                        if (retry > 2) { throw new LotSizeException(this._symbol);}

                        await ExchangeInfo.getExchangeInfo();

                        retry++;
                        return this.sell(retry);

                    case ErrorCodes.INVALID_TIMESTAMP:
                        if (retry > 2) { throw new InvalidTimestampException(this._symbol);}

                        retry++;
                        return this.sell(retry);

                    case 'ECONNRESET':
                        if (retry > 2) { throw new EconnresetException(this._symbol);}

                        retry++;
                        return this.sell(retry);

                    default:
                        throw e;
                }
            });
    }

    private _cancelOpenOrder(): Promise<CancelOrderResult> {
        if (this._quantity === this._totalTradeQuantity) {
            return;
        }

        return this._api.cancelOrder({
            symbol: this._symbol,
            orderId: this._orderId
        })
            .catch(err => {
                if (err.code !== -2011) { throw err; }

                return null;
            });
    }

    private _checkOrderIsTraded() {
        if (+this._totalTradeQuantity === 0) {
            throw new OrderNotTradedException(this._symbol, null, null);
        }
    }
}
import {MyOrder} from "./my-order";

export type OrderBook = { [orderId: string]: MyOrder };
import {OrderBook} from "./order-book";
import {MyOrder} from "./my-order";
import {ExchangeInfo} from "../api/exchange-info";
import {MIN_USDT_AMOUNT_FOR_ORDER} from "../config";
import {InsufficientBalanceException} from "../exception/Insufficient-balance-exception";
import {Binance, ExecutionReport, Order} from "binance-api-node";
import {BuySignalEvent} from "../event-handler/events/buy-signal-event";
import {SellSignalEvent} from "../event-handler/events/sell-signal-event";
import {SignalEvent} from "../event-handler/events/signal-event";
import {DuplicateOrderException} from "../exception/duplicate-order-exception";
import {EventHandler} from "../event-handler/event-handler";
import {OrderNotTradedException} from "../exception/order-not-traded-exception";

export class OrderHandler {
    private readonly _api: Binance;
    private readonly _username: string;
    private readonly _orders: OrderBook = {};
    private readonly _dalerCostAvgOrders: {
        [orderId: string]: MyOrder[]
    } = {};

    get readyToShutdown(): boolean {
        for (let prop in this._orders) {
            if (prop) return false;
        }

        return true;
    }

    constructor(api: Binance, username: string) {
        this._api = api;
        this._username = username;
    }

    async buy(buySignalEvent: BuySignalEvent, amount: number): Promise<Order> {
        const orderBookId = this._getOrderBookId(buySignalEvent);
        if (!buySignalEvent.dalerCostAvg) {
            this._checkDuplicateOrder(buySignalEvent);
        } else if (!this._dalerCostAvgOrders[orderBookId]) {
            throw new DuplicateOrderException(buySignalEvent.symbol, buySignalEvent.timeInterval);
        }

        const {symbol, price, timeInterval, strategyName, time} = buySignalEvent;
        const initialQuantity = amount / price;
        const quantity = ExchangeInfo.fixQuantityByLotSize(symbol, initialQuantity);
        const finalPrice = ExchangeInfo.fixPriceByTickSize(symbol, price);

        this._checkOrderAmountExceedsMinPrice(quantity, finalPrice);

        const order = new MyOrder({
            api: this._api,
            symbol,
            buyPrice: finalPrice,
            quantity: quantity
        });

        if (!buySignalEvent.dalerCostAvg) {
            this._orders[orderBookId] = order;
        }
        const buyOrder = await order.buy();
        if (!buySignalEvent.dalerCostAvg) {
            this._dalerCostAvgOrders[orderBookId] = [];
        } else {
            this._dalerCostAvgOrders[orderBookId].push(order);
        }

        EventHandler.buyOrderEvent.next({
            symbol,
            timeInterval,
            strategyName,
            quantity,
            price: finalPrice,
            username: this._username
        });

        return buyOrder;
    }

    async sell(sellSignal: SellSignalEvent, retry: number = 0): Promise<Order> {
        const {symbol, strategyName, timeInterval} = sellSignal;
        const orderId = this._getOrderBookId(sellSignal);
        const finalOrder: MyOrder = this._orders[orderId];
        const finalDalerCostAvgOrder = this._dalerCostAvgOrders[orderId];

        if (!finalOrder) {
            if (retry < 3) {
                retry++;
                setTimeout(() => this.sell(sellSignal, retry), 3000);
            }

            return new Promise(() => {});
        }

        try {
            const sellOrder = await finalOrder.sell();
            EventHandler.sellOrderEvent.next({
                symbol,
                timeInterval,
                strategyName,
                quantity: finalOrder.quantity,
                price: sellOrder.fills[0].price,
                username: this._username
            });

            for(let order of finalDalerCostAvgOrder) {
                const sellOrder = await order.sell();
                EventHandler.sellOrderEvent.next({
                    symbol,
                    timeInterval,
                    strategyName,
                    quantity: order.quantity,
                    price: sellOrder.fills[0].price,
                    username: this._username
                });
            }

            delete this._orders[orderId];
            delete this._dalerCostAvgOrders[orderId];

            return sellOrder;
        } catch (e) {
            if (e instanceof OrderNotTradedException) {
                EventHandler.sellOrderEvent.next({
                    symbol,
                    timeInterval,
                    strategyName,
                    quantity: finalOrder.quantity,
                    price: finalOrder.buyPrice,
                    username: this._username
                });

                delete this._orders[orderId];
                delete this._dalerCostAvgOrders[orderId];

                throw new OrderNotTradedException(symbol, strategyName, timeInterval);
            } else {
                throw e;
            }
        }
    }

    updateOrderBook(resp: ExecutionReport): void {
        for (let prop in this._orders) {
            if (this._orders[prop].orderId === resp.orderId) {
                this._orders[prop].totalTradeQuantity = resp.totalTradeQuantity;
                break;
            }
        }
    }

    private _checkOrderAmountExceedsMinPrice(quantity: string, price: string): void {
        const finalAmount = +quantity * +price;

        if (finalAmount < MIN_USDT_AMOUNT_FOR_ORDER) {
            throw new InsufficientBalanceException();
        }
    }

    private _getOrderBookId(signalEvent: SignalEvent): string {
        return this._getOrderBookIdPrefix(signalEvent) + signalEvent.strategyName;
    }

    private _getOrderBookIdPrefix({timeInterval, symbol}: SignalEvent): string {
        return symbol + timeInterval;
    }

    private _checkDuplicateOrder(signalEvent: SignalEvent) {
        const orderBookIdPrefix = this._getOrderBookIdPrefix(signalEvent);

        for (let id in this._orders) {
            if (id.includes(orderBookIdPrefix)) {
                throw new DuplicateOrderException(signalEvent.symbol, signalEvent.timeInterval);
            }
        }
    }
}
import {Binance} from "binance-api-node";

export interface OrderInfo {
    api: Binance;
    symbol: string;
    buyPrice: string;
    quantity: string;
}
import {Account, AssetBalance, Binance, DailyStatsResult} from "binance-api-node";
import {LogHandler} from "../logger/log-handler";
import {jobInterval} from "../utils/utils";
import {substr} from "../utils/substr";
import {ConsoleColor} from "../logger/console-color";
import {FreeBalanceLog} from "../logger/free-balance-log";
import {TotalBalanceLog} from "../logger/total-balance-log";
import {SymbolsLastPrice} from "../symbols-last-price";

export class UserBalances {
    private readonly _client: Binance;

    private readonly _username: string;

    private _total: number = 0;
    get total(): number { return this._total; }

    private _balances: { [prop: string]: AssetBalance } = {
        'USDT': {free: '0', asset: 'USDT', locked: '0'},
        'BNB': {free: '0', asset: 'BNB', locked: '0'},
    };

    private _isLoggedInfo: boolean = false;

    get freeUSDT(): number {
        return +this._balances['USDT'].free;
    }
    set freeUSDT(value: number) {
        this._balances['USDT'].free = value.toString();
    }

    constructor(client: Binance, username: string) {
        this._client = client;
        this._username = username;

        const ONE_HOUR = 1000 * 60 * 60;
        jobInterval(this._updateUserAssets.bind(this), ONE_HOUR);
    }

    updateBalance(balance: AssetBalance): void {
        this._balances[balance.asset] = balance;
    }

    getBalanceFreeAmount(balanceName: string): number {
        return +this._balances[balanceName]?.free;
    }

    private _updateUserAssets(): void {
        this._client.accountInfo()
            .then(accountInfo => {
                this._calculateTotalBalance(accountInfo);

                if (!this._isLoggedInfo) {
                    this._logBalancesInfo();
                    this._isLoggedInfo = true;
                }
            })
            .catch(err => LogHandler.error(err, this._username));
    }

    private _calculateTotalBalance(accountInfo: Account): void {
        this._total = 0;

        accountInfo.balances.forEach(balance => {
            if (!this._hasAssetBalance(balance)) {
                return;
            }

            const lastPrice = SymbolsLastPrice.getPrices(balance.asset + 'USDT');
            const assetBalance = ((+balance.free || +balance.locked) * lastPrice) || 0;
            this._balances[balance.asset] = balance;
            this._balances[balance.asset]['USDT'] = assetBalance;
            this._total += assetBalance;
        });

        this._total += this.freeUSDT;
    }

    private _hasAssetBalance(balance: AssetBalance): boolean {
        return +balance.free > 0 || +balance.locked > 0;
    }

    private _logBalancesInfo(): void {
        for (let prop in this._balances) {
            const balance = this._balances[prop];

            if (balance['USDT'] < 5) {
                continue;
            }

            LogHandler.info(
                substr(balance.asset, 7) +
                ConsoleColor.YELLOW + (balance['USDT'] || 0) + ConsoleColor.RESET,
                this._username
            );
        }

        LogHandler.info(FreeBalanceLog(this.freeUSDT), this._username);
        LogHandler.info(TotalBalanceLog(this._total), this._username);
    }
}
import {User} from "./user";
import {InsufficientBalanceException} from "../exception/Insufficient-balance-exception";
import {LogHandler} from "../logger/log-handler";
import {CredentialExpiredException} from "../exception/credential-expired-exception";
import {StrategyPermitException} from "../exception/strategy-permit-exception";
import {EventHandler} from "../event-handler/event-handler";
import {BuySignalEvent} from "../event-handler/events/buy-signal-event";
import {SellSignalEvent} from "../event-handler/events/sell-signal-event";
import {AccountCredentialHandler} from "./account-credential-handler";
import {RetryOrderLogger} from "../logger/logs/retry-order-logger";
import {WarnLogger} from "../logger/logs/warn-logger";
import {UserBalances} from "./user-balances";

jest.mock('binance-api-node');
jest.mock('../logger/logs/retry-order-logger');
jest.mock('../logger/logs/warn-logger');
jest.mock('../exception/Insufficient-balance-exception');
jest.mock('./account-credential-handler');
jest.mock('../exception/credential-expired-exception');
jest.mock('./user-balances', () => ({
    UserBalances: jest.fn().mockImplementation(() => ({}))
}));

describe('USER', () => {
    let mockUser: User;
    let mockBuySignalEvent: BuySignalEvent;

    beforeAll(() => {
        mockBuySignalEvent = {
            symbol: 'BTCUSDT',
            strategyName: 'StrategyM00',
            price: 100,
            timeInterval: '1d',
            time: 1,
            dalerCostAvg: 0
        };
    });

    beforeEach(() => {
        (UserBalances as jest.Mock).mockClear();

        jest.spyOn(LogHandler, 'info').mockImplementation();
        jest.spyOn(LogHandler, 'warn').mockImplementation();
        jest.spyOn(LogHandler, 'error').mockImplementation();
    })

    afterEach(() => {
        (mockUser as any)._clientWsCloseHandler = () => {};
        mockUser.destroy();
    });

    it('The User should be created', () => {
        createMockUser();

        expect(mockUser).toBeTruthy();
    });

    xit('#_buy method should catch InsufficientBalanceException two times while freeUSDT is not exceed minimum investment amount', async () => {
        await createMockUser();

        const mockUserBalance = (UserBalances as jest.Mock).mock.results[0].value;
        mockUserBalance.freeUSDT = 10;
        mockUserBalance.total = 1000;

        await EventHandler.buySignal.next(mockBuySignalEvent);

        await new Promise((r) => setTimeout(r, 2500));

        expect(InsufficientBalanceException).toHaveBeenCalledTimes(2);
        expect(RetryOrderLogger).toHaveBeenCalledTimes(1);
        expect(WarnLogger).toHaveBeenCalledTimes(1);
    });

    it('#_buy method should catch InsufficientBalanceException one time while freeUSDT is exceed minimum investment amount after retry', async () => {
        await createMockUser();

        const mockUserBalance = (UserBalances as jest.Mock).mock.results[0].value;
        mockUserBalance.freeUSDT = 10;
        mockUserBalance.total = 1000;

        EventHandler.buySignal.next(mockBuySignalEvent);

        // Update freeUSDT before calling buy order again
        mockUserBalance.freeUSDT = 100;
        await new Promise((r) => setTimeout(r, 1500));

        expect(InsufficientBalanceException).toHaveBeenCalledTimes(1);
        expect(RetryOrderLogger).toHaveBeenCalledTimes(1);
        expect(WarnLogger).toHaveBeenCalledTimes(0);
    });

    xit('#_buy should catch CredentialExpiredException', async () => {
        const credentialExpiredException = new CredentialExpiredException('2022-01-01');
        jest.spyOn(AccountCredentialHandler.prototype, 'checkCredentialExpiration')
            .mockImplementation(() => { throw credentialExpiredException; });

        await createMockUser();

        await EventHandler.buySignal.next(mockBuySignalEvent);

        expect(CredentialExpiredException).toHaveBeenCalledTimes(1);
        expect(LogHandler.warn).toHaveBeenCalledTimes(1);
    });

    it('#buy should catch StrategyPermitException', function () {
        const strategyPermitException = new StrategyPermitException('StrategyM00');

        jest.spyOn(mockUser as any, '_tryToBuy')
            .mockImplementation(() => { throw strategyPermitException; });

        EventHandler.buySignal.next(null);

        expect(LogHandler.warn).toHaveBeenCalledWith(strategyPermitException.message, 'Mohammad Bayat');
    });

    it('#buy should catch Error', function () {
        const error = new Error();

        jest.spyOn(mockUser as any, '_tryToBuy')
            .mockImplementation(() => { throw error; });

        EventHandler.buySignal.next(null);

        expect(LogHandler.error).toHaveBeenCalledWith(error, 'Mohammad Bayat');
    });

    it('should subscribe on buySignalEvent', () => {
        expect(EventHandler.buySignal.observers.length).toEqual(1);
    });

    it('should unsubscribe on buySignalEvent when user is destroyed', () => {
        mockUser.destroy();
        expect(EventHandler.buySignal.observers.length).toEqual(0);
    });

    it('should subscribe on sellSignalEvent', () => {
        expect(EventHandler.sellSignal.observers.length).toEqual(1);
    });

    it('should unsubscribe on sellSignalEvent when user is destroyed', () => {
        mockUser.destroy();
        expect(EventHandler.sellSignal.observers.length).toEqual(0);
    });

    it('should call #_buy when new buySignalEvent is received', () => {
        jest.spyOn(User.prototype as any, '_buy').mockImplementation();
        mockUser = new User(null);

        const buySignalEvent = new BuySignalEvent();
        EventHandler.buySignal.next(buySignalEvent);

        expect((mockUser as any)._buy).toHaveBeenCalledWith(buySignalEvent);
    });

    it('should call #_sell when new sellSignalEvent is received', () => {
        jest.spyOn(User.prototype as any, '_sell').mockImplementation();
        mockUser = new User(null);

        const sellSignalEvent = new SellSignalEvent();
        EventHandler.sellSignal.next(sellSignalEvent);

        expect((mockUser as any)._sell).toHaveBeenCalledWith(sellSignalEvent);
    });

    it('Unsubscribe from BuySignalEvent once the shutdown changed to on', () => {
        jest.spyOn(User.prototype as any, '_buy').mockImplementation();

        createMockUser();

        EventHandler.buySignal.next();
        expect(EventHandler.buySignal.observers.length).toBe(1);

        mockUser.update({
            username: 'Mohammad Bayat',
            accountExpirationDate: '2030-01-01',
            isShutdown: true
        } as any);
        EventHandler.buySignal.next();
        expect(EventHandler.buySignal.observers.length).toBe(0);
        expect(LogHandler.info).toHaveBeenCalledWith('User is preparing to shutdown', expect.anything());
    });

    it('Subscribe on BuySignalEvent once the shutdown changed to off', () => {
        jest.spyOn(User.prototype as any, '_buy').mockImplementation();

        createMockUser();
        const user: any = mockUser;

        EventHandler.buySignal.next();
        expect(user._buy).toHaveBeenCalledTimes(1);

        user.isShutdown = true;
        EventHandler.buySignal.next();
        expect(user._buy).toHaveBeenCalledTimes(1);

        user.isShutdown = false;
        EventHandler.buySignal.next();
        expect(user._buy).toHaveBeenCalledTimes(2);
        expect(LogHandler.info).toHaveBeenCalledWith('Shutdown has been canceled', expect.anything());
    });

    it('Should call _destroy and _shutdown subjects once the user is destroyed', () => {
        createMockUser();
        const user: any = mockUser;

        jest.spyOn(user._destroy, 'next').mockImplementation();
        jest.spyOn(user._destroy, 'complete').mockImplementation();

        jest.spyOn(user._shutdown, 'next').mockImplementation();
        jest.spyOn(user._shutdown, 'complete').mockImplementation();

        (mockUser as any)._clientWsCloseHandler = () => {};
        mockUser.destroy();
        expect(user._destroy.next).toHaveBeenCalledTimes(1);
        expect(user._destroy.complete).toHaveBeenCalledTimes(1);

        expect(user._shutdown.next).toHaveBeenCalledTimes(1);
        expect(user._shutdown.complete).toHaveBeenCalledTimes(1);
    });

    it('Should call onDestroy method once the user is destroyed', () => {
        jest.spyOn(User.prototype, 'onDestroy').mockImplementation();
        createMockUser();

        (mockUser as any)._clientWsCloseHandler = () => {};
        mockUser.destroy();
        expect(mockUser.onDestroy).toHaveBeenCalled();
        expect(LogHandler.info).toHaveBeenCalledWith('User has been shutdown', expect.anything());
    })

    /* -------------< Common Functions >------------- */

    function createMockUser(): void {
        mockUser = new User({
            username: 'Mohammad Bayat',
            accountExpirationDate: '2030-01-01',
            strategyInvestFactor: {
                default: 0.2,
                StrategyW25: 0
            }
        } as any);
    }
});
import * as binance from 'binance-api-node';
import {
    Binance,
    DailyStatsResult,
    ExecutionReport,
    OutboundAccountPosition,
    ReconnectingWebSocketHandler
} from 'binance-api-node';
import {BINANCE_FEE, CONFIG, MIN_USDT_AMOUNT_FOR_ORDER, STRATEGY_INVEST_FACTOR} from '../config';
import {ExchangeInfo} from '../api/exchange-info';
import {LogHandler} from '../logger/log-handler';
import {FreeBalanceLog} from '../logger/free-balance-log';
import {UpdatedBnbAmountLog} from '../logger/updated-bnb-amount-log';
import {AccountCredentialHandler} from './account-credential-handler';
import {UserBalances} from './user-balances';
import {OrderHandler} from './order-handler';
import {InsufficientBalanceException} from '../exception/Insufficient-balance-exception';
import {CredentialExpiredException} from '../exception/credential-expired-exception';
import {StrategyPermitException} from '../exception/strategy-permit-exception';
import {EventHandler} from '../event-handler/event-handler';
import {BuySignalEvent} from '../event-handler/events/buy-signal-event';
import {SellSignalEvent} from '../event-handler/events/sell-signal-event';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {OrderNotTradedException} from '../exception/order-not-traded-exception';
import {RetryOrderLogger} from '../logger/logs/retry-order-logger';
import {WarnLogger} from '../logger/logs/warn-logger';
import {ExceptionCatch} from '../exception/exception-catch';
import {ValidationException} from '../exception/validation-exception';
import {InitialUser} from './initial-user';
import {ResponseException} from '../exception/response-exception';
import {StrategyInvestFactory} from './users-config';

export class User {
    // -------------< Properties >-------------*/
    private _username: string;
    get username(): string { return this._username; }

    private _apiKey: string;

    private _isShutdown: boolean;
    private set isShutdown(value: boolean) {
        if (this._isShutdown && !value) {
            LogHandler.info('Shutdown has been canceled', this._username);
            this._subscribeOnBuySignalEvents();
        } else if (!this._isShutdown && value) {
            LogHandler.info('User is preparing to shutdown', this._username);
            this._shutdown.next();
            this._checkForDestroyUser();
        }

        this._isShutdown = value;
    }

    private _apiSecret: string;

    private _strategyInvestFactor: StrategyInvestFactory;

    client: Binance;

    private _accountCredentialHandler: AccountCredentialHandler;

    private _userBalances: UserBalances;

    private readonly _orderLogsFileAddress: string;

    private _orderHandler: OrderHandler;

    private _destroy = new Subject();

    private _shutdown = new Subject();

    private _clientWsCloseHandler: ReconnectingWebSocketHandler;


    // -------------< Constructor >-------------*/
    constructor(user: InitialUser) {
        this._setUserInfo(user);
        this._initAccountCredentialHandler(user);
        this._setupBinanceAccount();
        this._subscribeOnSignalEvents();
        this._orderHandler = new OrderHandler(this.client, user.username);

        this._orderLogsFileAddress = `./logs/${user.username.replace(' ', '')}.log`;
    }


    // -------------< Order >-------------*/
    private async _buy(order: BuySignalEvent, isRetry?: boolean) {
        try {
            await this._tryToBuy(order);
        } catch (e) {
            new ExceptionCatch()
                .catch(e instanceof InsufficientBalanceException && isRetry, () => {
                    const error = new InsufficientBalanceException(order.symbol, order.timeInterval, order.strategyName);
                    new WarnLogger(error.message, this._username);
                })
                .catch(e instanceof InsufficientBalanceException, () => {
                    new RetryOrderLogger(order.symbol, this._username);
                    this._retryBuyOrder(order);
                })
                .catch(e instanceof CredentialExpiredException, () => {
                    LogHandler.warn(e.message, this._username);
                })
                .catch(e instanceof ValidationException, () => {
                    LogHandler.warn(e.message, this._username);
                })
                .catch(e instanceof ResponseException, () => {
                    LogHandler.error(e, this._username);
                })
                .catch(e, () => {
                    LogHandler.error(e, this._username);
                });
        }
    }

    private async _sell(order: SellSignalEvent) {
        try {
            await this._tryToSell(order);
            this._checkForDestroyUser();
        } catch (e) {
            new ExceptionCatch()
                .catch(e instanceof OrderNotTradedException, () => {
                    LogHandler.warn(e.message, this._username);
                })
                .catch(e instanceof ResponseException, () => {
                    LogHandler.error(e, this._username);
                })
                .catch(e, () => {
                    LogHandler.error(e, this._username);
                });
        }

    }

    private async _tryToBuy(order: BuySignalEvent) {
        this._accountCredentialHandler.checkCredentialExpiration();

        const investmentAmount = this._getInvestmentAmount(order.strategyName);
        // this._userBalances.freeUSDT = freeUSDT - investmentAmount + feeAmount;

        await this._orderHandler.buy(order, investmentAmount);
    }

    private async _tryToSell(order: SellSignalEvent) {
        await this._orderHandler.sell(order);
    }

    private _checkForDestroyUser() {
        if (this._isShutdown && this._orderHandler.readyToShutdown) {
            this.destroy();
        }
    }

    private _retryBuyOrder(order: BuySignalEvent): void {
        setTimeout(() => this._buy(order, true), 100);
    }

    private _subscribeOnSignalEvents(): void {
        this._subscribeOnBuySignalEvents();
        this._subscribeOnSellSignalEvents();
    }

    private _subscribeOnBuySignalEvents(): void {
        EventHandler.buySignal
            .pipe(
                takeUntil(this._destroy),
                takeUntil(this._shutdown)
            )
            .subscribe(this._buy.bind(this));
    }

    private _subscribeOnSellSignalEvents(): void {
        EventHandler.sellSignal
            .pipe(takeUntil(this._destroy))
            .subscribe(this._sell.bind(this));
    }

    private _getStrategyInvestFactor(strategyName: string): number {
        const strategyNotPermit = this._strategyInvestFactor[strategyName] === 0 || STRATEGY_INVEST_FACTOR[strategyName] === 0;
        const userNotPermit = this._strategyInvestFactor.default === 0 || STRATEGY_INVEST_FACTOR.default === 0;
        const strategyInvestFactor = this._strategyInvestFactor[strategyName] || STRATEGY_INVEST_FACTOR[strategyName];
        const defaultStrategyInvestFactor = this._strategyInvestFactor.default || STRATEGY_INVEST_FACTOR.default;

        const {minIndexValue, maxIndexValue, minPositionSize, maxPositionSize} = STRATEGY_INVEST_FACTOR;
        const positionSize = minPositionSize
            + (maxPositionSize - minPositionSize)
            * (CONFIG.FEAR_AND_GREED_INDEX - minIndexValue)
            / (maxIndexValue - minIndexValue);

        const strategyInvestFactorValue = strategyInvestFactor
            ? strategyInvestFactor
            : Math.min(defaultStrategyInvestFactor, positionSize);

        if (strategyNotPermit || userNotPermit) {
            throw new StrategyPermitException(strategyName);
        } else if (!strategyInvestFactorValue) {
            throw new StrategyPermitException('User');
        }

        return strategyInvestFactorValue;
    }

    private _getInvestmentAmount(strategyName: string): number {
        const strategyInvestFactor = this._getStrategyInvestFactor(strategyName);
        const strategyInvestmentAmount = this._userBalances.total * strategyInvestFactor;
        const freeAmount = this._userBalances.freeUSDT - MIN_USDT_AMOUNT_FOR_ORDER;
        const rawInvestmentAmount = Math.min(strategyInvestmentAmount, freeAmount);
        const feeAmount = rawInvestmentAmount * BINANCE_FEE * 10;

        const investmentAmount = rawInvestmentAmount - feeAmount;

        if (investmentAmount < feeAmount || investmentAmount < MIN_USDT_AMOUNT_FOR_ORDER) {
            throw new InsufficientBalanceException();
        }

        return investmentAmount;
    }


    // -------------< User >-------------*/
    destroy(): void {
        this._destroy.next();
        this._destroy.complete();

        this._shutdown.next();
        this._shutdown.complete();

        this._clientWsCloseHandler();

        this.onDestroy();

        LogHandler.info('User has been shutdown', this._username);
    }

    onDestroy(): void {}

    update(user: InitialUser): void {
        if (this._apiKey !== user.apiKey) {
            this._apiKey = user.apiKey;
            this._apiSecret = user.apiSecret;

            this._setupBinanceAccount();
        }

        if (this._accountCredentialHandler.expirationDate !== user.accountExpirationDate) {
            this._accountCredentialHandler.expirationDate = user.accountExpirationDate;
        }

        this._setUserInfo(user);
    }

    private _setUserInfo(user: InitialUser): void {
        this._username = user.username;
        this._apiKey = user.apiKey;
        this._apiSecret = user.apiSecret;
        this._strategyInvestFactor = user.strategyInvestFactor;
        this.isShutdown = user.isShutdown;
    }

    private _initAccountCredentialHandler(user: InitialUser) {
        this._accountCredentialHandler = new AccountCredentialHandler(user.username);
        this._accountCredentialHandler.expirationDate = user.accountExpirationDate;

        try {
            this._accountCredentialHandler.checkCredentialExpiration();
        } catch (e) {
            if (e instanceof CredentialExpiredException) {
                LogHandler.warn(e.message, this.username);
            } else {
                LogHandler.error(e, this.username);
            }
        }
    }

    private _initUserBalances(): void {
        this._userBalances = new UserBalances(this.client, this.username);
    }


    // -------------< API >-------------*/
    private _setupBinanceAccount(): void {
        this.client = binance.default({
            apiKey: this._apiKey,
            apiSecret: this._apiSecret,
        });

        this.client.ping()
            .then(async resp => {
                LogHandler.info('Connected to the Binance: ' + resp, this._username);
                this._subscribeUserEvents();
                this._initUserBalances();

                // TODO: the fallowing line should be change
                setTimeout(this.updateBNBAmount.bind(this), 60 * 1000);
            })
            .catch(error => LogHandler.error(error, this._username));
    }

    private _subscribeUserEvents() {
        this.client.ws.user(resp => {
            if (this[resp.eventType]) {
                this[resp.eventType](resp);
            }
        })
            .then(resp => {
                this._clientWsCloseHandler = resp;
                LogHandler.info('Subscribed on websocket', this.username)
            })
            .catch(error => LogHandler.error(error, this.username));
    }

    private outboundAccountPosition(resp: OutboundAccountPosition): void {
        const freeUSDT = this._userBalances.freeUSDT;

        resp.balances.forEach(balance => this._userBalances.updateBalance(balance));

        if (freeUSDT !== this._userBalances.freeUSDT) {
            LogHandler.info(FreeBalanceLog(this._userBalances.freeUSDT), this.username);
            this.updateBNBAmount();
        }
    }

    private executionReport(resp: ExecutionReport): void {
        this._orderHandler.updateOrderBook(resp);
    }

    private async updateBNBAmount() {
        if (this._userBalances.freeUSDT < 10) {
            LogHandler.info('Updated BNB amount >>> Account has an insufficient balance', this.username);
            return;
        }

        const bnbAmount = this._userBalances.getBalanceFreeAmount('BNB');
        const dailyStat = await this.client.dailyStats({symbol: 'BNBUSDT'}) as DailyStatsResult;
        const minUsdtFeeValue = this._userBalances.freeUSDT * (BINANCE_FEE * 5);

        if (+bnbAmount * +dailyStat.lastPrice > minUsdtFeeValue) {
            return;
        }

        const quantity = (minUsdtFeeValue > 10 ? minUsdtFeeValue : 11) / +dailyStat.lastPrice;
        this.client.order({
            type: 'MARKET',
            side: 'BUY',
            symbol: 'BNBUSDT',
            quantity: ExchangeInfo.fixQuantityByLotSize('BNBUSDT', quantity)
        })
            .then(order => {
                LogHandler.info(
                    UpdatedBnbAmountLog(order.fills[0].price, ExchangeInfo.fixQuantityByLotSize('BNBUSDT', quantity)),
                    this.username);
            })
            .catch(err => {
                LogHandler.error(err, this.username);
            })
    }
}
import {InitialUser} from "./initial-user";

export interface StrategyInvestFactory {
    default: number;
    minPositionSize: number;
    maxPositionSize: number;
    minIndexValue: number;
    maxIndexValue: number;
    [strategyName: string]: number;
}
export interface UsersConfig {
    users: InitialUser[];
    strategyInvestFactor: StrategyInvestFactory;
}
export const readJSON = (url) => {
    const xhr = new XMLHttpRequest();
    let json = null;

    xhr.open('GET', url, false);

    xhr.onload = (e) => {
        if (xhr.status === 200) {
            json = JSON.parse(xhr.responseText);
        } else {
            console.error('readJSON', url, xhr.statusText);
        }
    };

    xhr.onerror = (e) => {
        console.error('readJSON', url, xhr.statusText);
    };

    xhr.send(null);
    return json;
};

readJSON.base = '';
import {ConsoleColor} from "../logger/console-color";

export function substr(str, length, spaceChar = ' ', reversed = false): string {
    let space = '';
    const strLength = str?.toString().length || 0;
    for (let i = strLength; i < length; i++) {
        space += spaceChar;
    }

    if (spaceChar === ' ') {
        return reversed
            ? space + str
            : str + space;
    } else {
        return reversed
            ? ConsoleColor.DIM + ConsoleColor.WHITE + space + ConsoleColor.RESET + str
            : str + ConsoleColor.DIM + ConsoleColor.WHITE + space + ConsoleColor.RESET;
    }
}
export function jobInterval(callback: () => void, ms: number) {
    callback();

    setInterval(() => callback(), ms);
}

export function callAtBeginningOfDay(func, delay = 0) {
    const date = new Date();
    const now = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    const tomorrow = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1, 0, 0, 0, 0);
    const msUntilTomorrow = tomorrow - now;

    setTimeout(() => {
        func();
        setInterval(func, 24 * 60 * 60 * 1000); // Call the function every 24 hours after the initial call
    }, msUntilTomorrow + delay);
}

export function isBullish(preVal: number, currentVal: number): boolean {
    return currentVal > preVal;
}
