import { useState } from "react";
import TabButton from "../TabButton/TabButton.jsx";
import Section from "../Section/Section.jsx";
import Tabs from "../Tabs/Tabs.jsx";
import { CORE_CONCEPTS, EXAMPLES } from "../../coreConceptsData.js";

const Examples = () => {
    const [selectedTopic, setSelectedTopic] = useState('');

    return (
        <Section title='Examples' id='examples'>
            <Tabs
                tabs={
                    CORE_CONCEPTS.map((concept, idx) => (
                        <TabButton
                            key={idx}
                            isSelected={concept.title.toLowerCase() === selectedTopic}
                            onClick={() => setSelectedTopic(concept.title.toLowerCase())}>
                            {concept.title}
                        </TabButton>
                    ))
                }>
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
            </Tabs>
        </Section>
    )
}

export default Examples
