"use client";

import { useMemo, useState } from "react";
import { calculateContractorQuote } from "@/lib/calculations";

const scopeItems = [
  "Materials or equipment are identified clearly",
  "Permits / inspections are addressed",
  "Removal and disposal are addressed",
  "Cleanup / property protection are addressed",
  "Start and completion timing are written down",
  "Workmanship warranty terms are written down",
];

type QuoteState = {
  name: string;
  quotedTotal: number;
  knownExtras: number;
  allowanceGap: number;
  depositPercent: number;
  warrantyYears: number;
  scope: boolean[];
};

type NumericQuoteField =
  | "quotedTotal"
  | "knownExtras"
  | "allowanceGap"
  | "depositPercent"
  | "warrantyYears";

const exampleQuotes: QuoteState[] = [
  {
    name: "Quote A",
    quotedTotal: 18000,
    knownExtras: 1800,
    allowanceGap: 1200,
    depositPercent: 30,
    warrantyYears: 1,
    scope: [true, true, false, false, true, true],
  },
  {
    name: "Quote B",
    quotedTotal: 20500,
    knownExtras: 0,
    allowanceGap: 0,
    depositPercent: 15,
    warrantyYears: 3,
    scope: [true, true, true, true, true, true],
  },
  {
    name: "Quote C",
    quotedTotal: 0,
    knownExtras: 0,
    allowanceGap: 0,
    depositPercent: 0,
    warrantyYears: 0,
    scope: [false, false, false, false, false, false],
  },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ContractorQuoteComparisonCalculator() {
  const [quotes, setQuotes] = useState<QuoteState[]>(exampleQuotes);

  const results = useMemo(
    () =>
      quotes.map((quote) =>
        calculateContractorQuote({
          quotedTotal: quote.quotedTotal,
          knownExtras: quote.knownExtras,
          allowanceGap: quote.allowanceGap,
          depositPercent: quote.depositPercent,
          warrantyYears: quote.warrantyYears,
          confirmedScopeItems: quote.scope.filter(Boolean).length,
          totalScopeItems: scopeItems.length,
        }),
      ),
    [quotes],
  );

  const active = results
    .map((result, index) => ({ result, index }))
    .filter(({ result }) => result.quotedTotal > 0);

  const lowestComparable =
    active.length > 0
      ? active.reduce((best, current) =>
          current.result.comparableTotal < best.result.comparableTotal ? current : best,
        )
      : null;

  const mostComplete =
    active.length > 0
      ? active.reduce((best, current) =>
          current.result.confirmedScopeItems > best.result.confirmedScopeItems ? current : best,
        )
      : null;

  const spread =
    active.length > 1
      ? Math.max(...active.map(({ result }) => result.comparableTotal)) -
        Math.min(...active.map(({ result }) => result.comparableTotal))
      : 0;

  function setNumber(index: number, field: NumericQuoteField, value: number) {
    setQuotes((current) =>
      current.map((quote, quoteIndex) =>
        quoteIndex === index ? { ...quote, [field]: Number.isFinite(value) ? value : 0 } : quote,
      ),
    );
  }

  function setName(index: number, name: string) {
    setQuotes((current) =>
      current.map((quote, quoteIndex) => (quoteIndex === index ? { ...quote, name } : quote)),
    );
  }

  function toggleScope(index: number, scopeIndex: number) {
    setQuotes((current) =>
      current.map((quote, quoteIndex) => {
        if (quoteIndex !== index) return quote;
        const scope = [...quote.scope];
        scope[scopeIndex] = !scope[scopeIndex];
        return { ...quote, scope };
      }),
    );
  }

  return (
    <section className="calculator-card" aria-labelledby="quote-comparison-title">
      <div className="calculator-heading">
        <p className="eyebrow">Contractor quote comparison</p>
        <h2 id="quote-comparison-title">Put competing bids on the same footing.</h2>
        <p>
          Add known exclusions and allowance gaps to each written quote, then compare the resulting
          cost alongside scope, deposit, and warranty details. Example values are loaded in A and B;
          replace them with your numbers. Leave Quote C at $0 if you only have two bids.
        </p>
      </div>

      <div className="quote-grid">
        {quotes.map((quote, index) => {
          const result = results[index];
          const deltaFromLowest =
            lowestComparable && result.quotedTotal > 0
              ? result.comparableTotal - lowestComparable.result.comparableTotal
              : 0;

          return (
            <article className="quote-card" key={index}>
              <label>
                Quote label
                <input
                  type="text"
                  value={quote.name}
                  onChange={(event) => setName(index, event.target.value)}
                  aria-label={`Quote ${index + 1} label`}
                />
              </label>

              <div className="quote-number-grid">
                <label>
                  Written quote total ($)
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={quote.quotedTotal}
                    onChange={(event) => setNumber(index, "quotedTotal", Number(event.target.value))}
                  />
                </label>
                <label>
                  Known excluded work ($)
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={quote.knownExtras}
                    onChange={(event) => setNumber(index, "knownExtras", Number(event.target.value))}
                  />
                </label>
                <label>
                  Allowance gap to common scope ($)
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={quote.allowanceGap}
                    onChange={(event) => setNumber(index, "allowanceGap", Number(event.target.value))}
                  />
                </label>
                <label>
                  Deposit requested (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={quote.depositPercent}
                    onChange={(event) =>
                      setNumber(index, "depositPercent", Number(event.target.value))
                    }
                  />
                </label>
                <label>
                  Workmanship warranty (years)
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={quote.warrantyYears}
                    onChange={(event) =>
                      setNumber(index, "warrantyYears", Number(event.target.value))
                    }
                  />
                </label>
              </div>

              <div className="scope-checklist" aria-label={`${quote.name} scope checklist`}>
                <strong>Confirmed in writing</strong>
                {scopeItems.map((item, scopeIndex) => (
                  <label className="scope-check" key={item}>
                    <input
                      type="checkbox"
                      checked={quote.scope[scopeIndex]}
                      onChange={() => toggleScope(index, scopeIndex)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              {result.quotedTotal > 0 ? (
                <div className="quote-result" aria-live="polite">
                  <span className="result-label">Comparable known cost</span>
                  <strong>{money.format(result.comparableTotal)}</strong>
                  <small>
                    {money.format(result.addedCost)} added to the written total for costs you entered
                    as excluded or under-allowed.
                  </small>
                  <div className="quote-result-row">
                    <span>Deposit at signing</span>
                    <strong>{money.format(result.depositAmount)}</strong>
                  </div>
                  <div className="quote-result-row">
                    <span>Scope items confirmed</span>
                    <strong>
                      {result.confirmedScopeItems}/{result.totalScopeItems}
                    </strong>
                  </div>
                  <div className="quote-result-row">
                    <span>Warranty entered</span>
                    <strong>{result.warrantyYears} years</strong>
                  </div>
                  {lowestComparable && (
                    <div className="quote-result-row">
                      <span>Above lowest comparable cost</span>
                      <strong>{money.format(deltaFromLowest)}</strong>
                    </div>
                  )}
                </div>
              ) : (
                <p className="quote-empty">Enter a written quote total to include this bid.</p>
              )}
            </article>
          );
        })}
      </div>

      {lowestComparable && mostComplete && (
        <div className="result quote-overview" aria-live="polite">
          <div>
            <span className="result-label">Lowest comparable known cost</span>
            <strong>{quotes[lowestComparable.index].name || `Quote ${lowestComparable.index + 1}`}</strong>
            <span>{money.format(lowestComparable.result.comparableTotal)}</span>
          </div>
          <div>
            <span className="result-label">Most scope items confirmed</span>
            <strong>{quotes[mostComplete.index].name || `Quote ${mostComplete.index + 1}`}</strong>
            <span>
              {mostComplete.result.confirmedScopeItems}/{mostComplete.result.totalScopeItems} checked
            </span>
          </div>
        </div>
      )}

      {active.length > 1 && (
        <div className="cost-breakdown">
          <div>
            <span>Comparable-cost spread across entered bids</span>
            <strong>{money.format(spread)}</strong>
          </div>
          <div>
            <span>What the calculator is deciding</span>
            <strong>Cost and documentation differences only</strong>
          </div>
        </div>
      )}

      <details>
        <summary>What counts as an allowance gap?</summary>
        <p>
          An allowance is a placeholder amount inside a quote for something not fully selected yet,
          such as tile, fixtures, appliances, or finish materials. If every contractor is supposed to
          price the same $4,000 material package but one quote carries only a $2,500 allowance, enter
          the $1,500 gap for that quote. Do not add a gap when the allowance already matches your
          common scope.
        </p>
      </details>
    </section>
  );
}
