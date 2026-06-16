import { useState, useEffect, useRef } from 'react';
import './TvmCalculator.css';

type Mode = 'general' | 'car';
type SolveFor = 'n' | 'i' | 'pv' | 'pmt' | 'fv';
type PeriodUnit = 'monthly' | 'yearly';
type Timing = 'end' | 'begin';

interface GeneralResult {
  type: 'general';
  resultLabel: string;
  resultValue: string;
  resultUnit: string;
  n: number;
  iPct: number;
  pv: number;
  pmt: number;
  fv: number;
  totalContributed: number;
  totalGrowth: number;
  timingNote: string;
}

interface CarResult {
  type: 'car';
  price: number;
  down: number;
  loanAmount: number;
  pmt: number;
  n: number;
  ratePct: number;
  totalPaid: number;
  totalInterest: number;
}

type TvmResult = GeneralResult | CarResult;

// ---- math helpers (preserved verbatim from tvm-calculator_1.html) ----

function round(x: number, d: number): number {
  const f = Math.pow(10, d);
  return Math.round(x * f) / f;
}

function fmtMoney(x: number): string {
  const sign = x < 0 ? '-' : '';
  return sign + '$' + Math.abs(x).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function fmtPercent(x: number): string {
  return x.toFixed(3) + '%';
}

function fmtPeriods(x: number): string {
  return x.toFixed(2);
}

function fvFactor(i: number, n: number): number {
  return Math.pow(1 + i, n);
}

function annuityFactor(i: number, n: number): number {
  return i === 0 ? n : (Math.pow(1 + i, n) - 1) / i;
}

function effPmt(pmt: number, i: number, timing: Timing): number {
  return timing === 'begin' ? pmt * (1 + i) : pmt;
}

function solveI(n: number, pv: number, pmt: number, fv: number, timing: Timing): number | null {
  if (n === 0) return null;
  function f(iTry: number) {
    const ep = effPmt(pmt, iTry, timing);
    return pv * fvFactor(iTry, n) + ep * annuityFactor(iTry, n) - fv;
  }
  let lo = -0.99, hi = 5;
  let flo = f(lo), fhi = f(hi);
  if (Math.abs(flo) < 1e-9) return lo;
  if (Math.abs(fhi) < 1e-9) return hi;
  if ((flo > 0) === (fhi > 0)) return null;
  for (let k = 0; k < 100; k++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (Math.abs(fm) < 1e-9) return mid;
    if ((flo > 0) === (fm > 0)) { lo = mid; flo = fm; } else { hi = mid; }
  }
  return (lo + hi) / 2;
}

// ---- component ----

export default function TvmCalculator() {
  const [mode, setMode] = useState<Mode>('general');
  const [solveFor, setSolveFor] = useState<SolveFor>('fv');
  const [timing, setTiming] = useState<Timing>('end');
  const [periodUnit, setPeriodUnit] = useState<PeriodUnit>('monthly');
  const [nVal, setNVal] = useState('120');
  const [iVal, setIVal] = useState('0.5');
  const [pvVal, setPvVal] = useState('1000');
  const [pmtVal, setPmtVal] = useState('200');
  const [fvVal, setFvVal] = useState('0');
  // Car mode state
  const [carPeriodUnit, setCarPeriodUnit] = useState<PeriodUnit>('monthly');
  const [carPrice, setCarPrice] = useState('28000');
  const [downPayment, setDownPayment] = useState('3000');
  const [carTerm, setCarTerm] = useState('60');
  const [carRate, setCarRate] = useState('0.5');

  const [flash, setFlash] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevKey = useRef('');

  const periodWord = periodUnit === 'monthly' ? 'month' : 'year';
  const nUnitLabel = periodUnit === 'monthly' ? 'months' : 'years';
  const carPeriodWord = carPeriodUnit === 'monthly' ? 'month' : 'year';

  function handlePeriodChange(newUnit: PeriodUnit) {
    if (newUnit === periodUnit) return;
    let n = parseFloat(nVal) || 0;
    let i = parseFloat(iVal) || 0;
    let pmt = parseFloat(pmtVal) || 0;
    if (newUnit === 'yearly') {
      n = round(n / 12, 2);
      i = round(i * 12, 4);
      pmt = round(pmt * 12, 2);
    } else {
      n = round(n * 12, 2);
      i = round(i / 12, 4);
      pmt = round(pmt / 12, 2);
    }
    setNVal(String(n));
    setIVal(String(i));
    setPmtVal(String(pmt));
    setPeriodUnit(newUnit);
  }

  function handleCarPeriodChange(newUnit: PeriodUnit) {
    if (newUnit === carPeriodUnit) return;
    let term = parseFloat(carTerm) || 0;
    let rate = parseFloat(carRate) || 0;
    if (newUnit === 'yearly') {
      term = round(term / 12, 2);
      rate = round(rate * 12, 4);
    } else {
      term = round(term * 12, 2);
      rate = round(rate / 12, 4);
    }
    setCarTerm(String(term));
    setCarRate(String(rate));
    setCarPeriodUnit(newUnit);
  }

  function applyBenchmark(annualRate: number) {
    const rate = periodUnit === 'monthly' ? round(annualRate / 12, 4) : annualRate;
    setIVal(String(rate));
  }

  function getLearnContent(): { title: string; body: string } {
    if (mode === 'car') {
      return {
        title: 'Learn: Planning for a Car',
        body: "A car loan is a Present Value (PV) — the amount financed — paid off through equal Payments (PMT) over a Loan Term (N), at an Interest Rate (I/Y), until the balance reaches zero. A bigger down payment lowers the amount financed and the interest charged over the life of the loan. A longer term lowers the monthly payment but increases total interest paid. This tool fills in the monthly payment and shows both sides of that trade-off.",
      };
    }
    const copy: Record<SolveFor, { title: string; body: string }> = {
      fv: {
        title: 'Learn: Projecting a Future Value (FV)',
        body: "Projecting a Future Value (FV) starts with what you have today, what you'll add along the way, and a rate of growth — then asks where that lands after N periods. It's the question behind almost every retirement and savings projection.",
      },
      pv: {
        title: 'Learn: Looking Back at a Present Value (PV)',
        body: "Looking back at a Present Value (PV) runs the math in reverse: given a goal you want to hit in the future, or a payment you'll receive someday, what is that worth in today's dollars? This is the idea behind discounting, and it's how lump-sum payouts, lottery winnings, and pension buyouts get valued.",
      },
      pmt: {
        title: 'Learn: Planning a Payment (PMT)',
        body: "Solving for the Payment (PMT) answers a practical question: how much do I need to set aside each period to reach a goal, or how much would a fixed payment be on a loan of a given size? It turns a target into an action you can repeat.",
      },
      i: {
        title: 'Learn: Benchmarking an Interest Rate (I/Y)',
        body: "Solving for the Interest Rate (I/Y) asks what rate of return would actually be required to turn a starting amount and a set of contributions into a target ending amount. Comparing that number to a known benchmark, like the long-run stock market average below, is a quick way to sanity-check whether a goal is realistic.",
      },
      n: {
        title: 'Learn: Solving for Number of Periods (N)',
        body: "Solving for the Number of Periods (N) answers how long something will take — how long until a goal is reached at this rate, or how long until a loan with these payments is paid off.",
      },
    };
    return copy[solveFor] || copy.fv;
  }

  function computeGeneral(): GeneralResult | string {
    const inputs: Record<SolveFor, string> = { n: nVal, i: iVal, pv: pvVal, pmt: pmtVal, fv: fvVal };
    for (const [key, val] of Object.entries(inputs) as [SolveFor, string][]) {
      if (key === solveFor) continue;
      if (val.trim() === '' || isNaN(parseFloat(val))) {
        return 'Fill in all four fields to calculate.';
      }
    }

    let n = parseFloat(nVal);
    let iPct = parseFloat(iVal);
    let pv = parseFloat(pvVal);
    let pmt = parseFloat(pmtVal);
    let fv = parseFloat(fvVal);
    let i = iPct / 100;
    let resultLabel: string, resultValue: string, resultUnit: string;

    switch (solveFor) {
      case 'fv':
        fv = pv * fvFactor(i, n) + effPmt(pmt, i, timing) * annuityFactor(i, n);
        resultLabel = 'Future Value (FV)';
        resultValue = fmtMoney(fv);
        resultUnit = 'Future Value';
        break;
      case 'pv':
        pv = (fv - effPmt(pmt, i, timing) * annuityFactor(i, n)) / fvFactor(i, n);
        resultLabel = 'Present Value (PV)';
        resultValue = fmtMoney(pv);
        resultUnit = 'Present Value';
        break;
      case 'pmt': {
        const af = annuityFactor(i, n);
        if (af === 0) return "Can't solve for Payment (PMT) when N = 0.";
        const epSolved = (fv - pv * fvFactor(i, n)) / af;
        pmt = timing === 'begin' ? epSolved / (1 + i) : epSolved;
        resultLabel = 'Payment (PMT)';
        resultValue = fmtMoney(pmt);
        resultUnit = 'per ' + periodWord;
        break;
      }
      case 'n': {
        const ep = effPmt(pmt, i, timing);
        if (i === 0) {
          if (ep === 0) return 'Enter a non-zero interest rate or payment to solve for Number of Periods (N).';
          n = (fv - pv) / ep;
        } else {
          const denom = pv + ep / i;
          if (denom === 0) return 'No solution for Number of Periods (N) with these numbers — try different values.';
          const x = (fv + ep / i) / denom;
          if (x <= 0) return 'No solution for Number of Periods (N) with these numbers — try different values.';
          n = Math.log(x) / Math.log(1 + i);
        }
        if (n < 0 || !isFinite(n)) return 'No positive solution for Number of Periods (N) with these numbers.';
        resultLabel = 'Number of Periods (N)';
        resultValue = fmtPeriods(n);
        resultUnit = periodWord + (Math.abs(n - 1) < 0.005 ? '' : 's');
        break;
      }
      case 'i': {
        const solved = solveI(n, pv, pmt, fv, timing);
        if (solved === null) return 'No solution found for a reasonable interest rate — check your inputs.';
        i = solved;
        iPct = i * 100;
        resultLabel = 'Interest Rate (I/Y)';
        resultValue = fmtPercent(iPct);
        resultUnit = 'per ' + periodWord;
        break;
      }
      default:
        return 'Unknown solve target.';
    }

    const totalContributed = pv + pmt * n;
    const totalGrowth = fv - totalContributed;
    const timingNote = timing === 'begin'
      ? 'Assumes payments happen at the beginning of each period (an "annuity due").'
      : 'Assumes payments happen at the end of each period (an "ordinary annuity") — standard for savings, loans, and most retirement accounts.';

    return {
      type: 'general',
      resultLabel, resultValue, resultUnit,
      n, iPct, pv, pmt, fv,
      totalContributed, totalGrowth, timingNote,
    };
  }

  function computeCar(): CarResult | string {
    const price = parseFloat(carPrice);
    const down = parseFloat(downPayment);
    const term = parseFloat(carTerm);
    const ratePct = parseFloat(carRate);

    if ([price, down, term, ratePct].some(v => isNaN(v)) || price <= 0 || term <= 0) {
      return 'Fill in car price, down payment, loan term, and interest rate to calculate.';
    }

    const loanAmount = Math.max(price - down, 0);
    const i = ratePct / 100;
    const n = term;

    let pmt: number;
    if (i === 0) {
      pmt = loanAmount / n;
    } else {
      const denom = 1 - Math.pow(1 + i, -n);
      if (denom === 0) return 'Enter a valid loan term and interest rate.';
      pmt = (loanAmount * i) / denom;
    }

    const totalPaid = pmt * n + down;
    const totalInterest = pmt * n - loanAmount;

    return { type: 'car', price, down, loanAmount, pmt, n, ratePct, totalPaid, totalInterest };
  }

  function compute(): TvmResult | string {
    return mode === 'car' ? computeCar() : computeGeneral();
  }

  const result = compute();
  const resultKey = JSON.stringify(result);

  useEffect(() => {
    if (resultKey !== prevKey.current) {
      prevKey.current = resultKey;
      setFlash(true);
      if (flashTimeout.current) clearTimeout(flashTimeout.current);
      flashTimeout.current = setTimeout(() => setFlash(false), 400);
    }
  }, [resultKey]);

  const learn = getLearnContent();

  const solveOptions: { value: SolveFor; label: string }[] = [
    { value: 'n', label: 'Number of Periods (N)' },
    { value: 'i', label: 'Interest Rate (I/Y)' },
    { value: 'pv', label: 'Present Value (PV)' },
    { value: 'pmt', label: 'Payment (PMT)' },
    { value: 'fv', label: 'Future Value (FV)' },
  ];

  return (
    <div className="tvm-root">
      <div className="tvm-section">
        <div className="tvm-eyebrow">Time Value of Money</div>
        <h1 className="tvm-h1">Solve The Missing Number</h1>
        <p className="tvm-section-sub">
          Five numbers describe almost every savings, loan, or investment scenario: how long it runs,
          at what rate, how much you start with, how much you add or take out each period, and how much
          you end up with. Pick the one you don't know, fill in the rest, and this works it out — with
          a plain-language explanation of what you're actually solving, a stock market benchmark for the
          rate, and a dedicated mode for planning a car purchase.
        </p>

        <div className="tvm-calc-grid">

          {/* ---- FORM ---- */}
          <form className="tvm-calc-form" onSubmit={e => e.preventDefault()}>

            {/* Mode */}
            <div>
              <span className="tvm-field-label">What Are You Planning?</span>
              <div className="tvm-toggle-group tvm-wrap">
                {(['general', 'car'] as Mode[]).map(m => (
                  <button
                    key={m}
                    type="button"
                    className="tvm-toggle-btn"
                    data-active={mode === m ? 'true' : undefined}
                    onClick={() => setMode(m)}
                  >
                    {m === 'general' ? 'General Savings & Growth' : 'Plan for a Car'}
                  </button>
                ))}
              </div>
            </div>

            {/* Learn Box */}
            <div className="tvm-learn-box">
              <p className="tvm-learn-title">{learn.title}</p>
              <p className="tvm-learn-body">{learn.body}</p>
            </div>

            {/* General Fields */}
            {mode === 'general' && (
              <>
                {/* Solve For */}
                <div>
                  <span className="tvm-field-label">Solve For</span>
                  <div className="tvm-toggle-group tvm-wrap">
                    {solveOptions.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        className="tvm-toggle-btn"
                        data-active={solveFor === value ? 'true' : undefined}
                        onClick={() => setSolveFor(value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Timing */}
                <div>
                  <span className="tvm-field-label">Payment Timing</span>
                  <div className="tvm-toggle-group">
                    {(['end', 'begin'] as Timing[]).map(t => (
                      <button
                        key={t}
                        type="button"
                        className="tvm-toggle-btn"
                        data-active={timing === t ? 'true' : undefined}
                        onClick={() => setTiming(t)}
                      >
                        {t === 'end' ? 'End' : 'Beginning'}
                      </button>
                    ))}
                  </div>
                  <p className="tvm-field-caption">
                    "End" means each payment happens at the end of a period — standard for savings accounts,
                    retirement accounts, and most loans. "Beginning" is common for things paid in advance,
                    like rent or insurance premiums.
                  </p>
                </div>

                {/* Period */}
                <div>
                  <span className="tvm-field-label">Period</span>
                  <div className="tvm-toggle-group">
                    {(['monthly', 'yearly'] as PeriodUnit[]).map(unit => (
                      <button
                        key={unit}
                        type="button"
                        className="tvm-toggle-btn"
                        data-active={periodUnit === unit ? 'true' : undefined}
                        onClick={() => handlePeriodChange(unit)}
                      >
                        {unit === 'monthly' ? 'Monthly' : 'Yearly'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* N */}
                {solveFor !== 'n' && (
                  <div>
                    <label htmlFor="tvm-n" className="tvm-field-label">
                      Number of Periods (N) — {nUnitLabel}
                    </label>
                    <input
                      type="number"
                      id="tvm-n"
                      className="tvm-input"
                      value={nVal}
                      min={0}
                      step={1}
                      onChange={e => setNVal(e.target.value)}
                    />
                  </div>
                )}

                {/* I/Y */}
                {solveFor !== 'i' && (
                  <div>
                    <label htmlFor="tvm-i" className="tvm-field-label">
                      Interest Rate (I/Y) — % per {periodWord}
                    </label>
                    <input
                      type="number"
                      id="tvm-i"
                      className="tvm-input"
                      value={iVal}
                      step={0.01}
                      onChange={e => setIVal(e.target.value)}
                    />
                    <div className="tvm-benchmark-box">
                      <p className="tvm-benchmark-label">Benchmark: Stock Market Average</p>
                      <div className="tvm-toggle-group">
                        <button
                          type="button"
                          className="tvm-toggle-btn"
                          onClick={() => applyBenchmark(10)}
                        >
                          Nominal (~10%/yr)
                        </button>
                        <button
                          type="button"
                          className="tvm-toggle-btn"
                          onClick={() => applyBenchmark(7)}
                        >
                          After Inflation (~7%/yr)
                        </button>
                      </div>
                      <p className="tvm-field-caption">
                        Long-run average annual return of the S&amp;P 500 since 1926. Past performance
                        doesn't guarantee future results — treat this as a reference point, not a forecast.
                      </p>
                    </div>
                  </div>
                )}

                {/* PV */}
                {solveFor !== 'pv' && (
                  <div>
                    <label htmlFor="tvm-pv" className="tvm-field-label">
                      Present Value (PV) — Starting Amount ($)
                    </label>
                    <input
                      type="number"
                      id="tvm-pv"
                      className="tvm-input"
                      value={pvVal}
                      step={1}
                      onChange={e => setPvVal(e.target.value)}
                    />
                  </div>
                )}

                {/* PMT */}
                {solveFor !== 'pmt' && (
                  <div>
                    <label htmlFor="tvm-pmt" className="tvm-field-label">
                      Payment (PMT) — Regular Contribution ($)
                    </label>
                    <input
                      type="number"
                      id="tvm-pmt"
                      className="tvm-input"
                      value={pmtVal}
                      step={1}
                      onChange={e => setPmtVal(e.target.value)}
                    />
                    <p className="tvm-field-caption">Negative means a withdrawal or payment instead of a contribution.</p>
                  </div>
                )}

                {/* FV */}
                {solveFor !== 'fv' && (
                  <div>
                    <label htmlFor="tvm-fv" className="tvm-field-label">
                      Future Value (FV) — Ending Amount ($)
                    </label>
                    <input
                      type="number"
                      id="tvm-fv"
                      className="tvm-input"
                      value={fvVal}
                      step={1}
                      onChange={e => setFvVal(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            {/* Car Fields */}
            {mode === 'car' && (
              <>
                <div>
                  <label htmlFor="tvm-car-price" className="tvm-field-label">Car Price ($)</label>
                  <input
                    type="number"
                    id="tvm-car-price"
                    className="tvm-input"
                    value={carPrice}
                    min={0}
                    step={100}
                    onChange={e => setCarPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="tvm-down" className="tvm-field-label">Down Payment ($)</label>
                  <input
                    type="number"
                    id="tvm-down"
                    className="tvm-input"
                    value={downPayment}
                    min={0}
                    step={100}
                    onChange={e => setDownPayment(e.target.value)}
                  />
                </div>

                <div>
                  <span className="tvm-field-label">Term Unit</span>
                  <div className="tvm-toggle-group">
                    {(['monthly', 'yearly'] as PeriodUnit[]).map(unit => (
                      <button
                        key={unit}
                        type="button"
                        className="tvm-toggle-btn"
                        data-active={carPeriodUnit === unit ? 'true' : undefined}
                        onClick={() => handleCarPeriodChange(unit)}
                      >
                        {unit === 'monthly' ? 'Monthly' : 'Yearly'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="tvm-car-term" className="tvm-field-label">
                    Loan Term (N) — {carPeriodUnit === 'monthly' ? 'months' : 'years'}
                  </label>
                  <input
                    type="number"
                    id="tvm-car-term"
                    className="tvm-input"
                    value={carTerm}
                    min={1}
                    step={1}
                    onChange={e => setCarTerm(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="tvm-car-rate" className="tvm-field-label">
                    Interest Rate / APR (I/Y) — % per {carPeriodWord}
                  </label>
                  <input
                    type="number"
                    id="tvm-car-rate"
                    className="tvm-input"
                    value={carRate}
                    step={0.01}
                    onChange={e => setCarRate(e.target.value)}
                  />
                  <p className="tvm-field-caption">
                    Most lenders quote an APR as a yearly rate. Switch the term unit above to Yearly if
                    you'd rather enter the annual rate directly — this converts automatically either way.
                  </p>
                </div>
              </>
            )}
          </form>

          {/* ---- LABEL PANEL ---- */}
          <div className="tvm-sticky">
            <div className={`tvm-label-panel${flash ? ' tvm-updated' : ''}`}>
              {typeof result === 'string' ? (
                <>
                  <div className="tvm-label-title">Your Statement</div>
                  <div className="tvm-label-divider tvm-thick" />
                  <div className="tvm-label-footnote">{result}</div>
                </>
              ) : result.type === 'car' ? (
                <>
                  <div className="tvm-label-title">Your Car Plan</div>
                  <div className="tvm-label-row">
                    <span>Car Price</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.price)}</span>
                  </div>
                  <div className="tvm-label-row">
                    <span>Down Payment</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.down)}</span>
                  </div>
                  <div className="tvm-label-row tvm-solved">
                    <span>Loan Amount (Present Value, PV)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.loanAmount)}</span>
                  </div>
                  <div className="tvm-label-divider tvm-thick" />
                  <div className="tvm-result-display">
                    {fmtMoney(result.pmt)}
                    <span className="tvm-unit">per {carPeriodWord}</span>
                  </div>
                  <div className="tvm-label-divider" />
                  <div className="tvm-label-row">
                    <span>Loan Term (N)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{result.n} {carPeriodWord}{result.n === 1 ? '' : 's'}</span>
                  </div>
                  <div className="tvm-label-row">
                    <span>Interest Rate (I/Y)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{result.ratePct}% / {carPeriodWord}</span>
                  </div>
                  <div className="tvm-label-divider" />
                  <div className="tvm-label-row">
                    <span>Total Paid Over Loan</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.totalPaid)}</span>
                  </div>
                  <div className="tvm-label-row">
                    <span>Total Interest Paid</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.totalInterest)}</span>
                  </div>
                  <div className="tvm-label-divider tvm-thick" />
                  <div className="tvm-label-footnote">
                    Assumes a fixed-rate loan with equal payments at the end of each period — standard
                    for most auto loans. Doesn't include tax, title, registration, or insurance costs.
                    General guidance only, not financial advice.
                  </div>
                </>
              ) : (
                <>
                  <div className="tvm-label-title">Your Statement</div>
                  <div className="tvm-label-row">
                    <span>Solving For</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{result.resultLabel}</span>
                  </div>
                  <div className="tvm-label-divider tvm-thick" />
                  <div className="tvm-result-display">
                    {result.resultValue}
                    <span className="tvm-unit">{result.resultUnit}</span>
                  </div>
                  <div className="tvm-label-divider" />
                  <div className={`tvm-label-row${solveFor === 'n' ? ' tvm-solved' : ''}`}>
                    <span>Number of Periods (N)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">
                      {fmtPeriods(result.n)} {periodWord}{Math.abs(result.n - 1) < 0.005 ? '' : 's'}
                    </span>
                  </div>
                  <div className={`tvm-label-row${solveFor === 'i' ? ' tvm-solved' : ''}`}>
                    <span>Interest Rate (I/Y)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtPercent(result.iPct)} / {periodWord}</span>
                  </div>
                  <div className={`tvm-label-row${solveFor === 'pv' ? ' tvm-solved' : ''}`}>
                    <span>Present Value (PV)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.pv)}</span>
                  </div>
                  <div className={`tvm-label-row${solveFor === 'pmt' ? ' tvm-solved' : ''}`}>
                    <span>Payment (PMT)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.pmt)} / {periodWord}</span>
                  </div>
                  <div className={`tvm-label-row${solveFor === 'fv' ? ' tvm-solved' : ''}`}>
                    <span>Future Value (FV)</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.fv)}</span>
                  </div>
                  <div className="tvm-label-divider" />
                  <div className="tvm-label-row">
                    <span>Total Contributed</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.totalContributed)}</span>
                  </div>
                  <div className="tvm-label-row">
                    <span>Total Growth</span>
                    <span className="tvm-lr-dots" />
                    <span className="tvm-lr-value">{fmtMoney(result.totalGrowth)}</span>
                  </div>
                  <div className="tvm-label-divider tvm-thick" />
                  <div className="tvm-label-footnote">
                    {result.timingNote} Payment (PMT) can be negative for a withdrawal or payment
                    instead of a contribution. Switching between Monthly and Yearly changes how often
                    interest compounds, which can slightly change your results — that's a real effect
                    of compounding frequency, not a rounding error. General guidance only, not
                    financial advice.
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* ---- FOOTER NOTE ---- */}
        <div className="tvm-footer-note">
          <div className="tvm-barcode" aria-hidden="true" />
          <p>THE LEDGER — built on the standard time-value-of-money formula used in finance courses and financial calculators.</p>
          <p>General information only, not financial advice. Always do your own research or talk to a financial professional before making decisions.</p>
        </div>
      </div>
    </div>
  );
}
