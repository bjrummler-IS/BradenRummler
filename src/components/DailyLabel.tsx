import { useState, useEffect, useRef } from 'react';
import './DailyLabel.css';

interface LabelResult {
  calories: number;
  proteinG: number;
  proteinPct: number;
  carbG: number;
  carbPctOut: number;
  fatG: number;
  fatPctOut: number;
  waterOz: number;
  goalLabel: string;
  goalNote: string;
  methodNote: string;
  bodyFatPct: number | null;
  lbmLbs: number | null;
}

const zonesMale = [
  { max: 10, text: 'Competition lean — visible vascularity, sharply defined abs.' },
  { max: 14, text: 'Lean — visible muscle definition.' },
  { max: 20, text: 'Average build — some softness around the midsection.' },
  { max: 27, text: 'Above average — noticeably less muscle definition.' },
  { max: 45, text: 'Higher body fat — little visible muscle definition.' },
];

const zonesFemale = [
  { max: 17, text: 'Competition lean — visible muscle striations.' },
  { max: 24, text: 'Lean and toned — defined arms and abs.' },
  { max: 31, text: 'Average build — soft curves, some definition when flexed.' },
  { max: 39, text: 'Above average — noticeably less definition.' },
  { max: 45, text: 'Higher body fat.' },
];

const defaultBf = { male: 18, female: 28 };

function getBfDescription(sexVal: string, bf: number): string {
  const zones = sexVal === 'male' ? zonesMale : zonesFemale;
  for (const z of zones) {
    if (bf <= z.max) return z.text;
  }
  return zones[zones.length - 1].text;
}

export default function DailyLabel() {
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('22');
  const [weightLb, setWeightLb] = useState('170');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('10');
  const [activity, setActivity] = useState('1.55');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [bodyCompEnabled, setBodyCompEnabled] = useState(false);
  const [bodyFatPct, setBodyFatPct] = useState(18);
  const [bfTouched, setBfTouched] = useState(false);
  const [proteinHeavy, setProteinHeavy] = useState(false);
  const [flash, setFlash] = useState(false);
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevKey = useRef('');

  function compute(): LabelResult | null {
    const ageN = parseFloat(age);
    const weightN = parseFloat(weightLb);
    const ftN = parseFloat(heightFt) || 0;
    const inN = parseFloat(heightIn) || 0;
    const actN = parseFloat(activity);

    if (!ageN || ageN <= 0 || !weightN || weightN <= 0 || (ftN === 0 && inN === 0)) {
      return null;
    }

    const weightKg = weightN * 0.453592;
    const heightCm = (ftN * 12 + inN) * 2.54;

    let bmr: number;
    let lbmKg = 0;

    if (bodyCompEnabled) {
      lbmKg = weightKg * (1 - bodyFatPct / 100);
      bmr = 370 + 21.6 * lbmKg;
    } else {
      bmr = sex === 'male'
        ? 10 * weightKg + 6.25 * heightCm - 5 * ageN + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * ageN - 161;
    }

    const tdee = bmr * actN;

    let calories: number, proteinPerUnit: number, fatPct: number, goalLabel: string, goalNote: string;

    if (goal === 'lose') {
      calories = tdee * 0.8;
      proteinPerUnit = bodyCompEnabled ? 2.3 : 2.2;
      fatPct = 0.25;
      goalLabel = 'Fat Loss';
      goalNote = "About 20% below your estimated maintenance — a pace that's sustainable for most people.";
    } else if (goal === 'gain') {
      calories = tdee * 1.1;
      proteinPerUnit = bodyCompEnabled ? 2.0 : 1.8;
      fatPct = 0.25;
      goalLabel = 'Build Muscle';
      goalNote = 'About 10% above maintenance to support training adaptations without excess fat gain.';
    } else {
      calories = tdee;
      proteinPerUnit = bodyCompEnabled ? 2.0 : 1.8;
      fatPct = 0.28;
      goalLabel = 'Maintain';
      goalNote = 'Matches your estimated daily energy expenditure.';
    }

    const proteinBaseLbs = bodyCompEnabled ? lbmKg / 0.453592 : parseFloat(weightLb);
    const proteinG = proteinHeavy
      ? proteinBaseLbs
      : bodyCompEnabled ? proteinPerUnit * lbmKg : proteinPerUnit * weightKg;
    const proteinCal = proteinG * 4;
    const fatCal = calories * fatPct;
    const fatG = fatCal / 9;
    const carbCal = Math.max(calories - proteinCal - fatCal, 0);
    const carbG = carbCal / 4;

    const proteinPct = Math.round((proteinCal / calories) * 100);
    const fatPctOut = Math.round((fatCal / calories) * 100);
    const carbPctOut = Math.max(100 - proteinPct - fatPctOut, 0);

    const waterOz = Math.round(weightN * 0.6);

    const methodNote = bodyCompEnabled
      ? 'Calories use the Katch-McArdle formula based on your estimated lean mass, and protein is set per kilogram of lean mass rather than total weight.'
      : 'Based on the Mifflin-St Jeor equation, with protein set per kilogram of total bodyweight.';

    return {
      calories: Math.round(calories),
      proteinG: Math.round(proteinG),
      proteinPct,
      carbG: Math.round(carbG),
      carbPctOut,
      fatG: Math.round(fatG),
      fatPctOut,
      waterOz,
      goalLabel,
      goalNote,
      methodNote,
      bodyFatPct: bodyCompEnabled ? bodyFatPct : null,
      lbmLbs: bodyCompEnabled ? Math.round(lbmKg / 0.453592) : null,
    };
  }

  const result = compute();
  const resultKey = JSON.stringify(result);

  useEffect(() => {
    if (result && resultKey !== prevKey.current) {
      prevKey.current = resultKey;
      setFlash(true);
      if (flashTimeout.current) clearTimeout(flashTimeout.current);
      flashTimeout.current = setTimeout(() => setFlash(false), 400);
    }
  }, [resultKey]);

  function handleSexChange(newSex: 'male' | 'female') {
    setSex(newSex);
    if (bodyCompEnabled && !bfTouched) {
      setBodyFatPct(defaultBf[newSex]);
    }
  }

  function handleBodyCompToggle(checked: boolean) {
    setBodyCompEnabled(checked);
    if (checked && !bfTouched) {
      setBodyFatPct(defaultBf[sex]);
    }
  }

  return (
    <div className="dlp-root">
      <div className="dlp-section">
        <div className="dlp-eyebrow">Personal Calculator</div>
        <h1 className="dlp-h1">Build Your Daily Label</h1>
        <p className="dlp-section-sub">
          Enter your stats to generate a personal nutrition label — calorie and macro targets based on the
          Mifflin-St Jeor equation (or Katch-McArdle, if you refine with body composition) and
          evidence-based ranges for training and recovery.
        </p>

        <div className="dlp-calc-grid">

          {/* ---- FORM ---- */}
          <form className="dlp-calc-form" onSubmit={e => e.preventDefault()}>

            {/* Sex */}
            <div>
              <span id="dlp-sex-label" className="dlp-field-label">Sex</span>
              <div className="dlp-toggle-group" role="group" aria-labelledby="dlp-sex-label">
                {(['male', 'female'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    className="dlp-toggle-btn"
                    data-active={sex === s ? 'true' : undefined}
                    onClick={() => handleSexChange(s)}
                  >
                    {s === 'male' ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="dlp-age" className="dlp-field-label">Age (years)</label>
              <input
                type="number"
                id="dlp-age"
                className="dlp-input"
                value={age}
                min={14}
                max={100}
                onChange={e => setAge(e.target.value)}
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="dlp-weight" className="dlp-field-label">Weight (lbs)</label>
              <input
                type="number"
                id="dlp-weight"
                className="dlp-input"
                value={weightLb}
                min={60}
                max={500}
                onChange={e => setWeightLb(e.target.value)}
              />
            </div>

            {/* Height */}
            <div>
              <span className="dlp-field-label">Height</span>
              <div className="dlp-field-row">
                <input
                  type="number"
                  className="dlp-input"
                  value={heightFt}
                  min={3}
                  max={8}
                  aria-label="Height, feet"
                  onChange={e => setHeightFt(e.target.value)}
                />
                <input
                  type="number"
                  className="dlp-input"
                  value={heightIn}
                  min={0}
                  max={11}
                  aria-label="Height, inches"
                  onChange={e => setHeightIn(e.target.value)}
                />
              </div>
            </div>

            {/* Activity */}
            <div>
              <label htmlFor="dlp-activity" className="dlp-field-label">Activity Level</label>
              <select
                id="dlp-activity"
                className="dlp-select"
                value={activity}
                onChange={e => setActivity(e.target.value)}
              >
                <option value="1.2">Sedentary — little to no exercise</option>
                <option value="1.375">Lightly active — 1-3 days/week</option>
                <option value="1.55">Moderately active — 3-5 days/week</option>
                <option value="1.725">Very active — 6-7 days/week</option>
                <option value="1.9">Extra active — training plus physical job</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <span id="dlp-goal-label" className="dlp-field-label">Goal</span>
              <div className="dlp-toggle-group" role="group" aria-labelledby="dlp-goal-label">
                {([['lose', 'Lose Fat'], ['maintain', 'Maintain'], ['gain', 'Build Muscle']] as const).map(
                  ([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      className="dlp-toggle-btn"
                      data-active={goal === val ? 'true' : undefined}
                      onClick={() => setGoal(val)}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Protein Heavy */}
            <div>
              <span className="dlp-field-label">Protein Override</span>
              <div className="dlp-toggle-group">
                <button
                  type="button"
                  className="dlp-toggle-btn"
                  data-active={proteinHeavy ? 'true' : undefined}
                  onClick={() => setProteinHeavy(p => !p)}
                >
                  {proteinHeavy ? 'Protein Heavy ✓' : 'Go Protein Heavy'}
                </button>
              </div>
              {proteinHeavy && (
                <p className="dlp-bf-desc" style={{ marginTop: '10px' }}>
                  {bodyCompEnabled
                    ? 'Protein set to 1 g per lb of lean body mass. Carbs absorb the remaining calories after fat.'
                    : 'Protein set to 1 g per lb of lean body mass. Enable body composition above to calculate your lean mass — using total bodyweight as a fallback until then.'}
                </p>
              )}
            </div>

            {/* Body Composition */}
            <div>
              <label className="dlp-body-comp-toggle" htmlFor="dlp-body-comp">
                <input
                  type="checkbox"
                  id="dlp-body-comp"
                  checked={bodyCompEnabled}
                  onChange={e => handleBodyCompToggle(e.target.checked)}
                />
                <span className="dlp-bf-track"><span className="dlp-bf-thumb"></span></span>
                <span className="dlp-toggle-text">Refine with body composition (optional)</span>
              </label>

              {bodyCompEnabled && (
                <div className="dlp-body-comp-panel">
                  <div className="dlp-bf-head">
                    <label htmlFor="dlp-bf-slider" className="dlp-bf-label">Estimated Body Fat</label>
                    <span className="dlp-bf-readout">{bodyFatPct}%</span>
                  </div>
                  <input
                    type="range"
                    id="dlp-bf-slider"
                    className="dlp-range"
                    min={6}
                    max={45}
                    step={1}
                    value={bodyFatPct}
                    onChange={e => {
                      setBfTouched(true);
                      setBodyFatPct(parseInt(e.target.value));
                    }}
                  />
                  <div className="dlp-bf-anchors">
                    <span>Lean</span><span>Average</span><span>Higher</span>
                  </div>
                  <p className="dlp-bf-desc">{getBfDescription(sex, bodyFatPct)}</p>
                </div>
              )}
            </div>
          </form>

          {/* ---- LABEL PANEL ---- */}
          <div className="dlp-daily-label-sticky">
            <div className={`dlp-label-panel${flash ? ' dlp-updated' : ''}`}>
              {result ? (
                <>
                  <div className="dlp-label-title">Your Daily Label</div>
                  <div className="dlp-label-row">
                    <span>Serving Size</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">1 Day</span>
                  </div>
                  <div className="dlp-label-row">
                    <span>Goal</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.goalLabel}</span>
                  </div>
                  {result.bodyFatPct !== null && (
                    <>
                      <div className="dlp-label-row">
                        <span>Body Fat (est.)</span>
                        <span className="dlp-lr-dots" />
                        <span className="dlp-lr-value">{result.bodyFatPct}%</span>
                      </div>
                      <div className="dlp-label-row">
                        <span>Lean Mass</span>
                        <span className="dlp-lr-dots" />
                        <span className="dlp-lr-value">{result.lbmLbs} lbs</span>
                      </div>
                    </>
                  )}
                  <div className="dlp-label-divider dlp-thick" />
                  <div className="dlp-calorie-display">
                    {result.calories}<span className="dlp-unit">Calories</span>
                  </div>
                  <div className="dlp-label-divider" />
                  <div className="dlp-label-row">
                    <span>Protein</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.proteinG} g</span>
                  </div>
                  <div className="dlp-label-row dlp-sub">
                    <span>% of Calories</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.proteinPct}%</span>
                  </div>
                  <div className="dlp-label-row">
                    <span>Carbohydrates</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.carbG} g</span>
                  </div>
                  <div className="dlp-label-row dlp-sub">
                    <span>% of Calories</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.carbPctOut}%</span>
                  </div>
                  <div className="dlp-label-row">
                    <span>Fat</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.fatG} g</span>
                  </div>
                  <div className="dlp-label-row dlp-sub">
                    <span>% of Calories</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.fatPctOut}%</span>
                  </div>
                  <div className="dlp-label-divider" />
                  <div className="dlp-label-row">
                    <span>Water (suggested)</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">{result.waterOz} fl oz</span>
                  </div>
                  <div className="dlp-label-divider dlp-thick" />
                  <div className="dlp-label-footnote">
                    {result.goalNote} {result.methodNote} General guidance only, not medical advice.
                  </div>
                </>
              ) : (
                <>
                  <div className="dlp-label-title">Your Daily Label</div>
                  <div className="dlp-label-row">
                    <span>Serving Size</span>
                    <span className="dlp-lr-dots" />
                    <span className="dlp-lr-value">1 Day</span>
                  </div>
                  <div className="dlp-label-divider dlp-thick" />
                  <div className="dlp-label-footnote">
                    Enter your age, weight, and height to generate your label.
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* ---- FOOTER NOTE ---- */}
        <div className="dlp-footer-note">
          <div className="dlp-barcode" aria-hidden="true" />
          <p>THE DAILY VALUE — calorie and macro targets based on established formulas and evidence-based ranges.</p>
          <p>General information only, not medical advice. Always consider your own health history, and talk to a professional for personalized guidance.</p>
        </div>
      </div>
    </div>
  );
}
