import React from 'react';
import CoreConcept from '../CoreConcept/CoreConcept.jsx';
import { CORE_CONCEPTS } from "../../coreConceptsData.js";
import Section from '../Section/Section.jsx';

const CoreConcepts = () => {
    return (
        <Section title='Core Concepts' id='core-concepts'>
            <ul>
                {CORE_CONCEPTS.map((concept, idx) => (
                    // Object literals y spread operator para pasarle las props de forma simplificada
                    <CoreConcept key={idx} {...concept} />
                ))}
            </ul>
        </Section>
    )
}

export default CoreConcepts
