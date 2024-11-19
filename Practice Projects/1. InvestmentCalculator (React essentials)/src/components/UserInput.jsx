const UserInput = ({ userInput, onChangeHandler }) => {
    return (
        <div id="user-input">
            <div className="input-group">
                <p>
                    <label htmlFor="initialInvestment">Initial Investment</label>
                    <input
                        id="initialInvestment"
                        type="number"
                        value={userInput.initialInvestment}
                        onChange={(event) => onChangeHandler('initialInvestment', event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="annualInvestment">Anual Investment</label>
                    <input
                        id="annualInvestment"
                        type="number"
                        value={userInput.annualInvestment}
                        onChange={(event) => onChangeHandler('annualInvestment', event.target.value)}
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expectedReturn">Initial Investment</label>
                    <input
                        id="expectedReturn"
                        type="number"
                        value={userInput.expectedReturn}
                        onChange={(event) => onChangeHandler('expectedReturn', event.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="duration">Anual Investment</label>
                    <input
                        id="duration"
                        type="number"
                        value={userInput.duration}
                        onChange={(event) => onChangeHandler('duration', event.target.value)}
                    />
                </p>
            </div>
        </div>
    )
}

export default UserInput
