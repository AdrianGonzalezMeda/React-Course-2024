import { formatter, calculateInvestmentResults } from "../util/investment"

const Results = ({ userInput }) => {
    let resultsData = calculateInvestmentResults(userInput);
    const initialInvestment =
        resultsData[0].valueEndOfYear -
        resultsData[0].interest -
        resultsData[0].annualInvestment;

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
                {resultsData.map(result => {
                    const totalInterest =
                        result.valueEndOfYear -
                        result.annualInvestment * result.year -
                        initialInvestment;
                    const totalAmountInvested = result.valueEndOfYear - totalInterest;
                    
                    return <tr key={result.year}>
                        <th>{result.year}</th>
                        <th>{formatter.format(result.valueEndOfYear)}</th>
                        <th>{formatter.format(result.interest)}</th>
                        <th>{formatter.format(totalInterest)}</th>
                        <th>{formatter.format(totalAmountInvested)}</th>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default Results
