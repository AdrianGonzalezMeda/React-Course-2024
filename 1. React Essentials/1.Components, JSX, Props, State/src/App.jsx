import { useState } from 'react';
import CoreConcept from './components/CoreConcept/CoreConcept.jsx';
import Header from './components/Header/Header.jsx';
import TabButton from './components/TabButton/TabButton.jsx';
import { CORE_CONCEPTS, EXAMPLES } from './coreConceptsData.js';

const App = () => {
    const [selectedTopic, setSelectedTopic] = useState('');

    const handleClick = (selectedTab) => {
        setSelectedTopic(selectedTab);
    }

    return (
        <div>
            <Header />
            <main>
                <section id='core-concepts'>
                    <ul>
                        {CORE_CONCEPTS.map((concept, idx) => (
                            // Object literals y spread operator para pasarle las props de forma simplificada
                            <CoreConcept key={idx} {...concept} />
                        ))}
                    </ul>
                </section>
                <section id='examples'>
                    <h2>Examples</h2>
                    <menu>
                        {CORE_CONCEPTS.map((concept, idx) => (
                            <TabButton
                                key={idx}
                                isSelected={concept.title.toLowerCase() === selectedTopic}
                                handleClick={() => handleClick(concept.title.toLowerCase())}>
                                {concept.title}
                            </TabButton>
                        ))}
                    </menu>

                    {!selectedTopic && 'Please select a topic.'}
                    {selectedTopic && (
                        <div id='tab-content'>
                            <h3>{EXAMPLES[selectedTopic].title}</h3>
                            <p>{EXAMPLES[selectedTopic].description}</p>
                            <pre>
                                <code>
                                    {EXAMPLES[selectedTopic].code}
                                </code>
                            </pre>
                        </div>
                    )}

                </section>
            </main>
        </div>
    );
}

export default App;
