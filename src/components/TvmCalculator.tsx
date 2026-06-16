import { useState, useEffect, useRef } from 'react';
import './TvmCalculator.css';

type SolveFor = 'n' | 'i' | 'pv' | 'pmt' | 'fv';
type PeriodUnit = 'monthly' | 'yearly';

interface TvmResult {
  resultLabel: string;
  resultValue: string;
  unitLabel: string;
  n: number;
  iPct: number;
  pv: number;
  pmt: number;
  fv: number;
  totalContributed: number;
  totalGrowth: number;
  error?: string;
}

// ---- math helpers (preserved verbatim from tvm-calculator.html) ----

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

function solveI(n: number, pv: number, pmt: number, fv: number): number | null {
  if (n === 0) return null;
  function f(i: number) { return pv * fvFactor(i, n) + pmt * annuityFactor(i, n) - fv; }
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
  const [solveFor, setSolveFor] = useState<SolveFor>('fv');
  const [periodUnit, setPeriodUnit] = useState<PeriodUnit>('monthly');
  const [nVal, setNVal] = useState('120');
  const [iVal, setIVal] = useState('0.5');
  const [pvVal, setPvVal] = useState('1000');
  const [pmtVal, setPmtVal] = useState('200');
  const [fvVal, setFvVal] = useState('0');
  const [flash, setFlash] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevKey = useRef('');

  const periodWord = periodUnit === 'monthly' ? 'month' : 'year';
  const nUnitLabel = periodUnit === 'monthly' ? 'months' : 'years';
  const iUnitLabel = periodWord;

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

  function compute(): TvmResult | string {
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
    let resultLabel: string, resultValue: string;

    switch (solveFor) {
      case 'fv':
        fv = pv * fvFactor(i, n) + pmt * annuityFactor(i, n);
        resultLabel = 'Future Value (FV)';
        resultValue = fmtMoney(fv);
        break;
      case 'pv':
        pv = (fv - pmt * annuityFactor(i, n)) / fvFactor(i, n);
        resultLabel = 'Present Value (PV)';
        resultValue = fmtMoney(pv);
        break;
      case 'pmt': {
        const af = annuityFactor(i, n);
        if (af === 0) return "Can't solve for PMT when N = 0.";
        pmt = (fv - pv * fvFactor(i, n)) / af;
        resultLabel = 'Payment (PMT)';
        resultValue = fmtMoney(pmt);
        break;
      }
      case 'n': {
        if (i === 0) {
          if (pmt === 0) return 'Enter a non-zero interest rate or payment to solve for N.';
          n = (fv - pv) / pmt;
        } else {
          const denom = pv + pmt / i;
          if (denom === 0) return 'No solution for N with these numbers — try different values.';
          const x = (fv + pmt / i) / denom;
          if (x <= 0) return 'No solution for N with these numbers — try different values.';
          n = Math.log(x) / Math.log(1 + i);
        }
        if (n < 0 || !isFinite(n)) return 'No positive solution for N with these numbers.';
        resultLabel = 'Number of Periods (N)';
        resultValue = fmtPeriods(n);
        break;
      }
      case 'i': {
        const solved = solveI(n, pv, pmt, fv);
        if (solved === null) return 'No solution found for a reasonable interest rate — check your inputs.';
        i = solved;
        iPct = i * 100;
        resultLabel = 'Interest Rate (I/Y)';
        resultValue = fmtPercent(iPct);
        break;
      }
      default:
        return 'Unknown solve target.';
    }

    const totalContributed = pv + pmt * n;
    const totalGrowth = fv - totalContributed;
    const unitMatch = resultLabel.match(/\(([^)]+)\)/);
    const unitLabel = unitMatch ? unitMatch[1] : '';

    return { resultLabel, resultValue, unitLabel, n, iPct, pv, pmt, fv, totalContributed, totalGrowth };
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

  const solveOptions: { value: SolveFor; label: string }[] = [
    { value: 'n', label: 'N' },
    { value: 'i', label: 'I/Y' },
    { value: 'pv', label: 'PV' },
    { value: 'pmt', label: 'PMT' },
    { value: 'fv', label: 'FV' },
  ];

  return (
    <div className="tvm-root">
      <div className="tvm-section">
        <div className="tvm-eyebrow">Time Value of Money</div>
        <h1 className="tvm-h1">Solve The Missing Number</h1>
        <p className="tvm-section-sub">
          Five numbers describe almost every savings, loan, or investment scenario: how long it runs (N),
          at what rate (I/Y), how much you start with (PV), how much you add or take out each period (PMT),
          and how much you end up with (FV). Pick the one you don't know, fill in the rest, and this works
          it out — plus shows how much of the result is your own money versus growth.
        </p>

        <div className="tvm-calc-grid">

          {/* ---- FORM ---- */}
          <form className="tvm-calc-form" onSubmit={e => e.preventDefault()}>

            {/* Solve For */}
            <div>
              <span id="tvm-solve-label" className="tvm-field-label">Solve For</span>
              <div className="tvm-toggle-group" role="group" aria-labelledby="tvm-solve-label">
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
              <p className="tvm-field-caption">
                N = Number of Periods · I/Y = Interest Rate per Period · PV = Present Value · PMT = Payment · FV = Future Value
              </p>
            </div>

            {/* Period */}
            <div>
              <span id="tvm-period-label" className="tvm-field-label">Period</span>
              <div className="tvm-toggle-group" role="group" aria-labelledby="tvm-period-label">
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
                  Interest Rate (I/Y) — % per {iUnitLabel}
                </label>
                <input
                  type="number"
                  id="tvm-i"
                  className="tvm-input"
                  value={iVal}
                  step={0.01}
                  onChange={e => setIVal(e.target.value)}
                />
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
                    <span className="tvm-unit">{result.unitLabel}</span>
                  </div>
                  <div className="tvm-label-divider" />
                  {([
                    ['N — Periods (' + periodWord + 's)', fmtPeriods(result.n), 'n'],
                    ['I/Y — Rate per ' + periodWord, fmtPercent(result.iPct), 'i'],
                    ['PV — Starting Amount', fmtMoney(result.pv), 'pv'],
                    ['PMT — Payment per ' + periodWord, fmtMoney(result.pmt), 'pmt'],
                    ['FV — Ending Amount', fmtMoney(result.fv), 'fv'],
                  ] as [string, string, SolveFor][]).map(([label, value, key]) => (
                    <div key={key} className={`tvm-label-row${solveFor === key ? ' tvm-solved' : ''}`}>
                      <span>{label}</span>
                      <span className="tvm-lr-dots" />
                      <span className="tvm-lr-value">{value}</span>
                    </div>
                  ))}
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
                    Assumes payments happen at the end of each period (an "ordinary annuity"), standard for
                    savings, loans, and most retirement accounts. PMT can be negative for a withdrawal or
                    payment instead of a contribution. Switching between Monthly and Yearly changes how often
                    interest compounds, which can slightly change your results — that's a real effect of
                    compounding frequency, not a rounding error.
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
