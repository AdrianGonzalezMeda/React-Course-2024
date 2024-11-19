import { calculateInvestmentResults, formatter } from '../util/investment.js';

// Esto causaria un bug que pasaria desapercibido en la consola pero haria que el array de resultados fuera
// cada vez mas y mas grande
const results = [];

export default function Results({ input }) {

  calculateInvestmentResults(input, results);

  // Solucion para evitar el error de acceder a una propiedad de un valor undefined. Ya que el problema esta en
  // que results no se rellena si la duracion es menor que 1, ya que no entra en el bucle for y no rellena los
  // resultados de los años
  if (results.length === 0) {
    return <p className='center'>Invalid input data provided</p>
  }

  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
